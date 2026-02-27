import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(254),
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

export function createApp({ db }) {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
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
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 20,
      standardHeaders: true,
      legacyHeaders: false,
    }),
    (req, res) => {
      const parsed = enquirySchema.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({ error: 'Please provide valid enquiry details.' })
      }

      const payload = parsed.data
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

      const insert = db.prepare(`
        INSERT INTO enquiries (
          name,
          full_name,
          primary_location,
          phone,
          email,
          interest,
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
          ip_address,
          user_agent
        )
        VALUES (
          @name,
          @full_name,
          @primary_location,
          @phone,
          @email,
          @interest,
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
          @ip_address,
          @user_agent
        )
      `)

      insert.run({
        name: payload.fullName,
        full_name: payload.fullName,
        primary_location: payload.location,
        phone: payload.phone,
        email: payload.email,
        interest: 'New Client Enquiry',
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
        message: '',
        emergency_confirmed: 1,
        ip_address: req.ip,
        user_agent: req.get('user-agent') ?? '',
      })

      return res.status(201).json({ success: true })
    },
  )

  app.use((err, _req, res, _next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON payload.' })
    }

    console.error(err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  })

  return app
}
