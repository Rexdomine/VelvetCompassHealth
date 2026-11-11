import request from 'supertest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp } from '../server/app.js'
import { createDatabase } from '../server/db.js'
import { createBrevoEmailService } from '../server/email.js'

const memberEnquiry = {
  fullName: 'Alex Doe',
  location: 'London, United Kingdom',
  phone: '',
  email: 'alex@example.com',
  contactMethod: 'Email',
  enquiryType: 'Individual or family membership',
  supportFocus: ['health-oversight', 'performance'],
  supportFocusOther: '',
  message: 'I would like to understand the membership model.',
  gpRegistered: 'no',
  gpDetails: '',
  exclusions: ['none'],
  guidancePreference: 'options-led',
  ackNotEmergencyService: true,
  ackUrgentEscalation: true,
  ackInvitationOnly: true,
  ackProfessionalBoundaries: true,
  ackInformationAccuracy: true,
  emergencyConfirmed: true,
  privacyConsent: true,
}

const hotelEnquiry = {
  name: 'Morgan Lee',
  hotel: 'Example Hotel',
  role: 'Concierge Manager',
  email: 'morgan@example.com',
  phone: '+44 0000 000 000',
  message: 'Please tell us about a partnership.',
}

const databases = []
function testApp(emailService) {
  const db = createDatabase(':memory:')
  databases.push(db)
  return { app: createApp({ db, emailService }), db }
}

afterEach(() => {
  for (const db of databases) db.close()
  databases.length = 0
})

describe('public form API', () => {
  it('returns health status', async () => {
    const { app } = testApp(null)
    const response = await request(app).get('/api/health')
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
  })

  it('accepts the current seven-step enquiry, notifies the office and sends a visitor receipt', async () => {
    const emailService = {
      sendEnquiryNotification: vi.fn().mockResolvedValue(),
      sendEnquiryReceipt: vi.fn().mockResolvedValue(),
    }
    const { app, db } = testApp(emailService)
    const response = await request(app).post('/api/enquiries').send(memberEnquiry)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({ success: true, receiptSent: true })
    expect(emailService.sendEnquiryNotification).toHaveBeenCalledOnce()
    expect(emailService.sendEnquiryReceipt).toHaveBeenCalledOnce()
    expect(db.prepare('SELECT enquiry_type, contact_method, message, privacy_consent FROM enquiries').get())
      .toMatchObject({ enquiry_type: memberEnquiry.enquiryType, contact_method: 'Email', message: memberEnquiry.message, privacy_consent: 1 })
  })

  it('does not claim delivery when email is unavailable or rejected', async () => {
    const unavailable = testApp(null)
    expect((await request(unavailable.app).post('/api/enquiries').send(memberEnquiry)).status).toBe(503)
    expect(unavailable.db.prepare('SELECT COUNT(*) AS count FROM enquiries').get().count).toBe(0)

    const emailService = { sendEnquiryNotification: vi.fn().mockRejectedValue(new Error('provider failure')) }
    const rejected = testApp(emailService)
    expect((await request(rejected.app).post('/api/enquiries').send(memberEnquiry)).status).toBe(502)
    expect(rejected.db.prepare('SELECT COUNT(*) AS count FROM enquiries').get().count).toBe(0)
  })

  it('tells the visitor when the office received an enquiry but the receipt failed', async () => {
    const emailService = {
      sendEnquiryNotification: vi.fn().mockResolvedValue(),
      sendEnquiryReceipt: vi.fn().mockRejectedValue(new Error('provider failure')),
    }
    const { app, db } = testApp(emailService)
    const response = await request(app).post('/api/enquiries').send(memberEnquiry)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({ success: true, receiptSent: false })
    expect(db.prepare('SELECT COUNT(*) AS count FROM enquiries').get().count).toBe(1)
  })

  it('rejects urgent indicators, absent consent and invalid contact details', async () => {
    const { app } = testApp({ sendEnquiryNotification: vi.fn() })
    expect((await request(app).post('/api/enquiries').send({ ...memberEnquiry, exclusions: ['chest-pain'] })).status).toBe(400)
    expect((await request(app).post('/api/enquiries').send({ ...memberEnquiry, privacyConsent: false })).status).toBe(400)
    expect((await request(app).post('/api/enquiries').send({ ...memberEnquiry, contactMethod: 'Telephone', phone: '' })).status).toBe(400)
  })

  it('accepts a hotel partnership enquiry with separate office and visitor messages', async () => {
    const emailService = { sendHotelNotification: vi.fn().mockResolvedValue(), sendHotelReceipt: vi.fn().mockResolvedValue() }
    const { app, db } = testApp(emailService)
    const response = await request(app).post('/api/hotel-enquiries').send(hotelEnquiry)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({ success: true, receiptSent: true })
    expect(emailService.sendHotelNotification).toHaveBeenCalledOnce()
    expect(emailService.sendHotelReceipt).toHaveBeenCalledOnce()
    expect(db.prepare('SELECT hotel, role FROM hotel_enquiries').get()).toMatchObject({ hotel: hotelEnquiry.hotel, role: hotelEnquiry.role })
  })

  it('does not store an unsent hotel enquiry', async () => {
    const { app, db } = testApp({ sendHotelNotification: vi.fn().mockRejectedValue(new Error('provider failure')) })
    const response = await request(app).post('/api/hotel-enquiries').send(hotelEnquiry)
    expect(response.status).toBe(502)
    expect(db.prepare('SELECT COUNT(*) AS count FROM hotel_enquiries').get().count).toBe(0)
  })
})

describe('Brevo message builder', () => {
  it('escapes visitor text and addresses admin and visitor separately', async () => {
    const requests = []
    const service = createBrevoEmailService({
      apiKey: 'test-only',
      adminEmail: 'office@example.com',
      senderEmail: 'sender@example.com',
      publicSiteUrl: 'https://example.com',
      fetchImpl: async (_url, options) => {
        requests.push(JSON.parse(options.body))
        return { ok: true }
      },
    })
    const enquiry = { ...hotelEnquiry, hotel: '<script>alert(1)</script>', submittedAt: 'today' }
    await service.sendHotelNotification(enquiry)
    await service.sendHotelReceipt(enquiry)
    expect(requests.map((item) => item.to[0].email)).toEqual(['office@example.com', 'morgan@example.com'])
    expect(requests[0].htmlContent).toContain('&lt;script&gt;')
    expect(requests[0].htmlContent).not.toContain('<script>')
    expect(requests[1].htmlContent).toContain('&lt;script&gt;')
  })

  it('retries an explicitly rejected transient email without duplicating the form submission', async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, status: 201 })
    const service = createBrevoEmailService({
      apiKey: 'test-only',
      adminEmail: 'office@example.com',
      senderEmail: 'sender@example.com',
      fetchImpl,
    })
    await service.sendHotelReceipt(hotelEnquiry)
    expect(fetchImpl).toHaveBeenCalledTimes(2)
    expect(fetchImpl.mock.calls[0][1].body).toBe(fetchImpl.mock.calls[1][1].body)
  })
})
