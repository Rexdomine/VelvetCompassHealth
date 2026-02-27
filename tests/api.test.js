import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApp } from '../server/app.js'
import { createDatabase } from '../server/db.js'

describe('API', () => {
  let db
  let app

  beforeAll(() => {
    db = createDatabase(':memory:')
    app = createApp({ db })
  })

  afterAll(() => {
    db.close()
  })

  it('returns health status', async () => {
    const response = await request(app).get('/api/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
  })

  it('creates a valid enquiry', async () => {
    const response = await request(app).post('/api/enquiries').send({
      fullName: 'Alex Doe',
      location: 'London, United Kingdom',
      phone: '+44 0000 000 000',
      email: 'alex@example.com',
      supportFocus: ['health-oversight', 'performance'],
      supportFocusOther: '',
      gpRegistered: 'yes',
      gpDetails: 'Mayfair Medical, London',
      exclusions: ['none'],
      guidancePreference: 'options-led',
      ackNotEmergencyService: true,
      ackUrgentEscalation: true,
      ackInvitationOnly: true,
      ackProfessionalBoundaries: true,
      ackInformationAccuracy: true,
      emergencyConfirmed: true,
    })

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })

  it('rejects invalid enquiry payload', async () => {
    const response = await request(app).post('/api/enquiries').send({
      fullName: 'A',
      location: '',
      phone: '123',
      email: 'not-an-email',
      supportFocus: [],
      supportFocusOther: '',
      gpRegistered: 'maybe',
      gpDetails: '',
      exclusions: ['chest-pain'],
      guidancePreference: 'invalid',
      ackNotEmergencyService: false,
      ackUrgentEscalation: false,
      ackInvitationOnly: false,
      ackProfessionalBoundaries: false,
      ackInformationAccuracy: false,
      emergencyConfirmed: false,
    })

    expect(response.status).toBe(400)
  })
})
