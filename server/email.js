const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

const supportLabels = {
  'health-oversight': 'Health oversight & continuity',
  performance: 'Performance / executive health',
  fertility: 'Fertility readiness or preconception planning',
  aesthetics: 'Aesthetics, cosmetic or hair concerns',
  'decision-support': 'Support around a specific decision or upcoming event',
  other: 'Other',
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function layout(title, content, siteUrl) {
  const logo = new URL('/vch-approved/vch-logo.png', siteUrl).toString()
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body style="margin:0;background:#f6f3ed;color:#2b201c;font-family:Arial,sans-serif">
      <table role="presentation" style="width:100%;border-collapse:collapse"><tr><td align="center" style="padding:36px 16px">
        <table role="presentation" style="max-width:640px;width:100%;border-collapse:collapse;background:#fff;border:1px solid #dfd5c7">
          <tr><td style="padding:35px 42px 25px"><img src="${escapeHtml(logo)}" alt="Velvet Compass Health" width="105" style="display:block;width:105px;height:auto"><p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#720e18;margin:28px 0 10px">Velvet Compass Health</p><h1 style="font:normal 36px/1.15 Georgia,serif;margin:0;color:#2b201c">${escapeHtml(title)}</h1></td></tr>
          <tr><td style="padding:8px 42px 34px;font-size:15px;line-height:1.7">${content}</td></tr>
          <tr><td style="padding:22px 42px;border-top:1px solid #dfd5c7;color:#695c51;font-size:12px">Private correspondence from Velvet Compass Health.</td></tr>
        </table>
      </td></tr></table>
    </body></html>`
}

function rowsHtml(rows) {
  return `<table role="presentation" style="width:100%;border-collapse:collapse">${rows.map(([label, value]) =>
    `<tr><th scope="row" style="padding:10px 12px 10px 0;border-bottom:1px solid #e9e2d8;text-align:left;vertical-align:top;font-weight:600;color:#720e18;width:34%">${escapeHtml(label)}</th><td style="padding:10px 0;border-bottom:1px solid #e9e2d8;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value || 'Not provided')}</td></tr>`,
  ).join('')}</table>`
}

function siteOrigin(value) {
  try {
    const url = new URL(value || 'https://velvetcompasshealth.com')
    return `${url.protocol}//${url.host}`
  } catch {
    return 'https://velvetcompasshealth.com'
  }
}

export function createBrevoEmailService({ apiKey, adminEmail, senderEmail, senderName, publicSiteUrl, fetchImpl = fetch }) {
  if (!apiKey || !adminEmail || !senderEmail) {
    throw new Error('Brevo email service requires an API key, admin address and verified sender address.')
  }
  const origin = siteOrigin(publicSiteUrl)
  const sender = { email: senderEmail, name: senderName || 'Velvet Compass Health' }

  async function send({ to, replyTo, subject, htmlContent, textContent }) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'api-key': apiKey },
      body: JSON.stringify({ sender, to: [{ email: to }], ...(replyTo ? { replyTo } : {}), subject, htmlContent, textContent }),
    }
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const response = await fetchImpl(BREVO_API_URL, options)
      if (response.ok) return
      // Retry only when Brevo explicitly rejects a request temporarily. A network
      // failure has uncertain delivery status and must not risk a duplicate receipt.
      const retryable = response.status === 429 || [502, 503, 504].includes(response.status)
      if (!retryable || attempt === 1) {
        // Provider error bodies may include submitted personal data.
        throw new Error(`Brevo rejected an email request (HTTP ${response.status}).`)
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  return {
    async sendEnquiryNotification(enquiry) {
      const rows = [
        ['Submitted', enquiry.submittedAt], ['Name', enquiry.fullName], ['Email', enquiry.email],
        ['Telephone', enquiry.phone], ['Country or time zone', enquiry.location],
        ['Preferred contact', enquiry.contactMethod], ['Enquiry type', enquiry.enquiryType],
        ['Support focus', enquiry.supportFocus.map((item) => supportLabels[item]).join(', ')],
        ['Other support', enquiry.supportFocusOther], ['Short message', enquiry.message],
        ['GP registered', enquiry.gpRegistered], ['GP practice', enquiry.gpDetails],
        ['Urgent screen', enquiry.exclusions.join(', ')], ['Guidance preference', enquiry.guidancePreference],
        ['Privacy consent', enquiry.privacyConsent ? 'Confirmed' : 'Not confirmed'],
      ]
      await send({
        to: adminEmail, replyTo: { email: enquiry.email, name: enquiry.fullName },
        subject: `New VCH enquiry: ${enquiry.fullName}`,
        htmlContent: layout('New private enquiry', rowsHtml(rows), origin),
        textContent: ['New private enquiry', ...rows.map(([label, value]) => `${label}: ${value || 'Not provided'}`)].join('\n'),
      })
    },
    async sendEnquiryReceipt(enquiry) {
      const content = `<p>Dear ${escapeHtml(enquiry.fullName)},</p><p>Your enquiry has been received. The VCH team will respond during normal business days using your preferred contact method.</p><p>A response does not establish a doctor-patient relationship or confirm membership.</p><p>If you need urgent medical help, please contact the appropriate local emergency service rather than waiting for a reply.</p>`
      await send({
        to: enquiry.email, subject: 'Your VCH enquiry has been received',
        htmlContent: layout('Your enquiry has been received', content, origin),
        textContent: `Dear ${enquiry.fullName},\n\nYour enquiry has been received. The VCH team will respond during normal business days using your preferred contact method. A response does not establish a doctor-patient relationship or confirm membership. For urgent medical help, contact the appropriate local emergency service rather than waiting for a reply.`,
      })
    },
    async sendHotelNotification(enquiry) {
      const rows = [['Submitted', enquiry.submittedAt], ['Name', enquiry.name], ['Hotel', enquiry.hotel],
        ['Role', enquiry.role], ['Email', enquiry.email], ['Telephone', enquiry.phone], ['Message', enquiry.message]]
      await send({
        to: adminEmail, replyTo: { email: enquiry.email, name: enquiry.name },
        subject: `New VCH hotel partnership enquiry: ${enquiry.hotel}`,
        htmlContent: layout('Hotel partnership enquiry', rowsHtml(rows), origin),
        textContent: ['Hotel partnership enquiry', ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n'),
      })
    },
    async sendHotelReceipt(enquiry) {
      const content = `<p>Dear ${escapeHtml(enquiry.name)},</p><p>Thank you for contacting Velvet Compass Health about a partnership with ${escapeHtml(enquiry.hotel)}. Your enquiry has been received, and our team will review it and respond during normal business days.</p><p>This form is for partnership enquiries and is not monitored for guest-care requests or medical emergencies.</p>`
      await send({
        to: enquiry.email, subject: 'Your VCH hotel partnership enquiry has been received',
        htmlContent: layout('Thank you for your enquiry', content, origin),
        textContent: `Dear ${enquiry.name},\n\nThank you for contacting Velvet Compass Health about a partnership with ${enquiry.hotel}. Your enquiry has been received, and our team will review it and respond during normal business days. This form is not monitored for guest-care requests or emergencies.`,
      })
    },
  }
}
