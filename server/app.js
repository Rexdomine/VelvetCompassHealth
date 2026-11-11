import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(40),
  email: z.string().trim().email().max(254),
  contactMethod: z.enum(['Email', 'Telephone']),
  enquiryType: z.enum([
    'Individual or family membership',
    'International Students',
    'Clinical network or professional collaboration',
    'Partnerships and organisations',
    'Media or speaking enquiry',
  ]),
  supportFocus: z
    .array(
      z.enum([
        'health-oversight',
        'performance',
        'fertility',
        'aesthetics',
        'decision-support',
        'other',
      ]),
    )
    .min(1),
  supportFocusOther: z.string().trim().max(500).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(2000),
  gpRegistered: z.enum(['yes', 'no']),
  gpDetails: z.string().trim().max(500).optional().or(z.literal('')),
  exclusions: z
    .array(
      z.enum(['chest-pain', 'breathlessness', 'neurological', 'abdominal-pain', 'self-harm', 'none']),
    )
    .min(1),
  guidancePreference: z.enum(['direct', 'options-led', 'collaborative']),
  ackNotEmergencyService: z.literal(true),
  ackUrgentEscalation: z.literal(true),
  ackInvitationOnly: z.literal(true),
  ackProfessionalBoundaries: z.literal(true),
  ackInformationAccuracy: z.literal(true),
  emergencyConfirmed: z.literal(true),
  privacyConsent: z.literal(true),
})

const hotelSchema = z.object({
  name: z.string().trim().min(2).max(120),
  hotel: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().min(1).max(2000),
})

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

function parseAllowedOrigins(originsEnv) {
  return originsEnv
    .split(',')
    .map((origin) => origin.trim().toLowerCase())
    .filter(Boolean)
    .flatMap((origin) => {
      if (origin.startsWith('http://') || origin.startsWith('https://')) {
        return [origin]
      }
      return [origin.startsWith('www.') ? `https://${origin.slice(4)}` : `https://${origin}`]
    })
}

export function createApp({ db, emailService = null }) {
  const app = express()

  app.disable('x-powered-by')
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          fontSrc: ["'self'", 'https:', 'data:'],
          formAction: ["'self'"],
          frameAncestors: ["'self'"],
          frameSrc: ["'self'", 'https://www.google.com', 'https://maps.google.com'],
          imgSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          scriptSrcAttr: ["'none'"],
          styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
          upgradeInsecureRequests: [],
        },
      },
    }),
  )
  app.use(express.json({ limit: '10kb' }))

  if (process.env.CORS_ORIGIN) {
    const allowedOrigins = parseAllowedOrigins(process.env.CORS_ORIGIN)
    app.use(
      cors({
        origin: allowedOrigins,
      }),
    )
  }

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.post(
    '/api/enquiries',
    enquiryLimiter,
    async (req, res) => {
      const parsed = enquirySchema.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({ error: 'Please provide valid enquiry details.' })
      }

      const payload = parsed.data
      if (payload.contactMethod === 'Telephone' && payload.phone.length < 7) {
        return res.status(400).json({ error: 'Please provide a telephone number for your preferred contact method.' })
      }
      if (payload.supportFocus.includes('other') && !payload.supportFocusOther?.trim()) {
        return res.status(400).json({ error: 'Please specify details for "Other".' })
      }
      if (payload.gpRegistered === 'yes' && !payload.gpDetails?.trim()) {
        return res.status(400).json({ error: 'Please provide your GP practice details.' })
      }
      if (payload.exclusions.includes('none') && payload.exclusions.length > 1) {
        return res
          .status(400)
          .json({ error: 'Select either "None of the above" or specific symptoms, not both.' })
      }
      if (!payload.exclusions.includes('none')) {
        return res
          .status(400)
          .json({ error: 'Urgent symptoms indicated. Please seek immediate emergency care.' })
      }

      const enquiryDetails = {
        ...payload,
        submittedAt: new Date().toISOString(),
      }

      if (!emailService) {
        return res.status(503).json({ error: 'Enquiry delivery is temporarily unavailable. Please try again later.' })
      }
      try {
        await emailService.sendEnquiryNotification(enquiryDetails)
      } catch {
        return res.status(502).json({ error: 'We could not send your enquiry. Please try again later.' })
      }

      try {
        const insert = db.prepare(`
        INSERT INTO enquiries (
          name,
          full_name,
          primary_location,
          phone,
          email,
          interest,
          enquiry_type,
          contact_method,
          support_focus_json,
          support_focus_other,
          gp_registered,
          gp_details,
          high_risk_exclusions_json,
          guidance_preference,
          ack_not_emergency_service,
          ack_urgent_escalation,
          ack_invitation_only,
          ack_professional_boundaries,
          ack_information_accuracy,
          message,
          emergency_confirmed,
          privacy_consent
        )
        VALUES (
          @name,
          @full_name,
          @primary_location,
          @phone,
          @email,
          @interest,
          @enquiry_type,
          @contact_method,
          @support_focus_json,
          @support_focus_other,
          @gp_registered,
          @gp_details,
          @high_risk_exclusions_json,
          @guidance_preference,
          @ack_not_emergency_service,
          @ack_urgent_escalation,
          @ack_invitation_only,
          @ack_professional_boundaries,
          @ack_information_accuracy,
          @message,
          @emergency_confirmed,
          @privacy_consent
        )
      `)
        insert.run({
          name: payload.fullName,
          full_name: payload.fullName,
          primary_location: payload.location,
          phone: payload.phone,
          email: payload.email,
          interest: payload.enquiryType,
          enquiry_type: payload.enquiryType,
          contact_method: payload.contactMethod,
          support_focus_json: JSON.stringify(payload.supportFocus),
          support_focus_other: payload.supportFocusOther?.trim() ?? '',
          gp_registered: payload.gpRegistered,
          gp_details: payload.gpDetails?.trim() ?? '',
          high_risk_exclusions_json: JSON.stringify(payload.exclusions),
          guidance_preference: payload.guidancePreference,
          ack_not_emergency_service: 1,
          ack_urgent_escalation: 1,
          ack_invitation_only: 1,
          ack_professional_boundaries: 1,
          ack_information_accuracy: 1,
          message: payload.message,
          emergency_confirmed: 1,
          privacy_consent: 1,
        })
      } catch {
        // The office has accepted the message; do not invite a duplicate submission.
        console.error('Could not store an enquiry after office email delivery.')
      }

      let receiptSent = true
      try {
        await emailService.sendEnquiryReceipt(enquiryDetails)
      } catch {
        receiptSent = false
      }
      return res.status(201).json({ success: true, receiptSent })
    },
  )

  app.post('/api/hotel-enquiries', enquiryLimiter, async (req, res) => {
    const parsed = hotelSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Please complete all partnership enquiry fields.' })
    }
    if (!emailService) {
      return res.status(503).json({ error: 'Enquiry delivery is temporarily unavailable. Please try again later.' })
    }
    const enquiry = { ...parsed.data, submittedAt: new Date().toISOString() }
    try {
      await emailService.sendHotelNotification(enquiry)
    } catch {
      return res.status(502).json({ error: 'We could not send your enquiry. Please try again later.' })
    }
    try {
      db.prepare(`INSERT INTO hotel_enquiries (name, hotel, role, email, phone, message)
        VALUES (@name, @hotel, @role, @email, @phone, @message)`).run(parsed.data)
    } catch {
      console.error('Could not store a hotel enquiry after office email delivery.')
    }
    let receiptSent = true
    try {
      await emailService.sendHotelReceipt(enquiry)
    } catch {
      receiptSent = false
    }
    return res.status(201).json({ success: true, receiptSent })
  })

  app.use((err, _req, res, _next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON payload.' })
    }

    console.error(err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  })

  return app
}
