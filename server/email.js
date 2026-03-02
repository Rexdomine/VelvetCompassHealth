const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

const supportFocusLabels = {
  'health-oversight': 'Health oversight & continuity',
  performance: 'Performance / executive health',
  fertility: 'Fertility readiness or preconception planning',
  aesthetics: 'Aesthetics, cosmetic or hair concerns',
  'decision-support': 'Support around a specific decision or upcoming event',
  other: 'Other',
}

const exclusionLabels = {
  'chest-pain': 'Chest pain',
  breathlessness: 'Severe breathlessness',
  neurological: 'Sudden neurological symptoms',
  'abdominal-pain': 'Severe or worsening abdominal pain',
  'self-harm': 'Thoughts of self-harm or feeling unsafe',
  none: 'None of the above',
}

const guidanceLabels = {
  direct: 'Direct',
  'options-led': 'Options-led',
  collaborative: 'Collaborative',
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatList(values, labels) {
  return values.map((value) => labels[value] ?? value).join(', ')
}

export function createBrevoEmailService({ apiKey, adminEmail, senderEmail, senderName }) {
  if (!apiKey || !adminEmail || !senderEmail) {
    throw new Error('Brevo email service misconfigured: api key, admin email, and sender email are required.')
  }

  return {
    async sendEnquiryNotification(enquiry) {
      const supportFocus = formatList(enquiry.supportFocus, supportFocusLabels)
      const exclusions = formatList(enquiry.exclusions, exclusionLabels)
      const guidancePreference = guidanceLabels[enquiry.guidancePreference] ?? enquiry.guidancePreference

      const htmlContent = `
        <h2>New Velvet Compass Health Enquiry</h2>
        <p><strong>Submitted:</strong> ${escapeHtml(enquiry.submittedAt)}</p>
        <hr />
        <p><strong>Full name:</strong> ${escapeHtml(enquiry.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
        <p><strong>Location:</strong> ${escapeHtml(enquiry.location)}</p>
        <p><strong>Support focus:</strong> ${escapeHtml(supportFocus)}</p>
        <p><strong>Support focus (other):</strong> ${escapeHtml(enquiry.supportFocusOther || 'N/A')}</p>
        <p><strong>GP registered:</strong> ${escapeHtml(enquiry.gpRegistered)}</p>
        <p><strong>GP details:</strong> ${escapeHtml(enquiry.gpDetails || 'N/A')}</p>
        <p><strong>High-risk exclusions:</strong> ${escapeHtml(exclusions)}</p>
        <p><strong>Guidance preference:</strong> ${escapeHtml(guidancePreference)}</p>
        <hr />
        <p><strong>Acks:</strong></p>
        <ul>
          <li>Not emergency service: ${enquiry.ackNotEmergencyService ? 'Yes' : 'No'}</li>
          <li>Urgent escalation understanding: ${enquiry.ackUrgentEscalation ? 'Yes' : 'No'}</li>
          <li>Invitation-only understanding: ${enquiry.ackInvitationOnly ? 'Yes' : 'No'}</li>
          <li>Professional boundaries understanding: ${enquiry.ackProfessionalBoundaries ? 'Yes' : 'No'}</li>
          <li>Information accuracy confirmed: ${enquiry.ackInformationAccuracy ? 'Yes' : 'No'}</li>
        </ul>
        <hr />
        <p><strong>IP:</strong> ${escapeHtml(enquiry.ipAddress)}</p>
        <p><strong>User-Agent:</strong> ${escapeHtml(enquiry.userAgent)}</p>
      `

      const textContent = [
        'New Velvet Compass Health Enquiry',
        `Submitted: ${enquiry.submittedAt}`,
        '',
        `Full name: ${enquiry.fullName}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone}`,
        `Location: ${enquiry.location}`,
        `Support focus: ${supportFocus}`,
        `Support focus (other): ${enquiry.supportFocusOther || 'N/A'}`,
        `GP registered: ${enquiry.gpRegistered}`,
        `GP details: ${enquiry.gpDetails || 'N/A'}`,
        `High-risk exclusions: ${exclusions}`,
        `Guidance preference: ${guidancePreference}`,
        '',
        `Not emergency service: ${enquiry.ackNotEmergencyService ? 'Yes' : 'No'}`,
        `Urgent escalation understanding: ${enquiry.ackUrgentEscalation ? 'Yes' : 'No'}`,
        `Invitation-only understanding: ${enquiry.ackInvitationOnly ? 'Yes' : 'No'}`,
        `Professional boundaries understanding: ${enquiry.ackProfessionalBoundaries ? 'Yes' : 'No'}`,
        `Information accuracy confirmed: ${enquiry.ackInformationAccuracy ? 'Yes' : 'No'}`,
        '',
        `IP: ${enquiry.ipAddress}`,
        `User-Agent: ${enquiry.userAgent}`,
      ].join('\n')

      const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { email: senderEmail, name: senderName },
          to: [{ email: adminEmail }],
          replyTo: { email: enquiry.email, name: enquiry.fullName },
          subject: `New Intake Enquiry: ${enquiry.fullName}`,
          htmlContent,
          textContent,
        }),
      })

      if (!response.ok) {
        const detail = await response.text()
        throw new Error(`Brevo send failed (${response.status}): ${detail}`)
      }
    },
  }
}
