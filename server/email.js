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

function asYesNo(value) {
  return value ? 'Yes' : 'No'
}

function normalizePublicSiteUrl(value) {
  const fallback = 'https://velvetcompasshealth.com'
  const raw = (value ?? '').trim()
  if (!raw) {
    return fallback
  }

  const withProtocol = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`
  try {
    const url = new URL(withProtocol)
    return `${url.protocol}//${url.host}`
  } catch {
    return fallback
  }
}

function buildAdminEmailHtml({
  enquiry,
  logoUrl,
  supportFocus,
  supportFocusOther,
  exclusions,
  guidancePreference,
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Access Application</title>
  </head>
  <body style="margin:0;padding:0;background:#EAE2D5;font-family:Arial,'Raleway',sans-serif;color:#272426;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EAE2D5;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="850" style="max-width:850px;width:100%;background:#F2EBE0;border:1px solid rgba(131,88,22,0.12);box-shadow:0 20px 50px rgba(0,0,0,0.10);">
            <tr>
              <td align="center" style="padding:48px 24px 28px 24px;">
                <img src="${escapeHtml(logoUrl)}" alt="Velvet Compass Health" width="96" style="display:block;width:96px;max-width:96px;height:auto;margin:0 auto 16px auto;" />
                <h1 style="margin:0 0 10px 0;font-family:Georgia,'Crimson Pro',serif;font-size:44px;line-height:1.15;font-weight:600;color:#272426;">New Access Application</h1>
                <p style="margin:0;font-size:11px;line-height:1.6;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#835816;">
                  A formal enquiry has been submitted through the portal.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px;">
                <div style="height:1px;background:rgba(39,36,38,0.12);"></div>
              </td>
            </tr>

            <tr>
              <td style="padding:36px;">
                <h3 style="margin:0 0 16px 0;font-size:11px;line-height:1.6;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#835816;">Section 1: Identity</h3>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Full Name:</strong> ${escapeHtml(enquiry.fullName)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Location:</strong> ${escapeHtml(enquiry.location)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
                <p style="margin:0;font-size:14px;line-height:1.6;"><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px;">
                <div style="height:1px;background:rgba(39,36,38,0.08);"></div>
              </td>
            </tr>

            <tr>
              <td style="padding:36px;">
                <h3 style="margin:0 0 16px 0;font-size:11px;line-height:1.6;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#835816;">Section 2: Focus of Support</h3>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Selected Focus Areas:</strong> ${escapeHtml(supportFocus)}</p>
                <p style="margin:0;font-size:14px;line-height:1.6;"><strong>Other (if provided):</strong> ${escapeHtml(supportFocusOther)}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px;">
                <div style="height:1px;background:rgba(39,36,38,0.08);"></div>
              </td>
            </tr>

            <tr>
              <td style="padding:36px;">
                <h3 style="margin:0 0 16px 0;font-size:11px;line-height:1.6;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#835816;">Section 3: Care Context</h3>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Currently Registered With GP:</strong> ${escapeHtml(enquiry.gpRegistered)}</p>
                <p style="margin:0;font-size:14px;line-height:1.6;"><strong>GP Practice Details:</strong> ${escapeHtml(enquiry.gpDetails || 'N/A')}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px;">
                <div style="height:1px;background:rgba(39,36,38,0.08);"></div>
              </td>
            </tr>

            <tr>
              <td style="padding:36px;">
                <h3 style="margin:0 0 16px 0;font-size:11px;line-height:1.6;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#835816;">Section 4: Exclusions &amp; Preferences</h3>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>High-risk Exclusions:</strong> ${escapeHtml(exclusions)}</p>
                <p style="margin:0;font-size:14px;line-height:1.6;"><strong>Guidance Preference:</strong> ${escapeHtml(guidancePreference)}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px;">
                <div style="height:1px;background:rgba(39,36,38,0.08);"></div>
              </td>
            </tr>

            <tr>
              <td style="padding:36px;">
                <h3 style="margin:0 0 16px 0;font-size:11px;line-height:1.6;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#835816;">Section 5: Confirmation &amp; Audit</h3>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Step 1 Emergency Confirmation:</strong> ${asYesNo(enquiry.emergencyConfirmed)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Not Emergency Service:</strong> ${asYesNo(enquiry.ackNotEmergencyService)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Urgent Escalation Understanding:</strong> ${asYesNo(enquiry.ackUrgentEscalation)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Invitation-only Understanding:</strong> ${asYesNo(enquiry.ackInvitationOnly)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Professional Boundaries Understanding:</strong> ${asYesNo(enquiry.ackProfessionalBoundaries)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Information Accuracy Confirmed:</strong> ${asYesNo(enquiry.ackInformationAccuracy)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Submitted At:</strong> ${escapeHtml(enquiry.submittedAt)}</p>
                <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>IP Address:</strong> ${escapeHtml(enquiry.ipAddress)}</p>
                <p style="margin:0;font-size:14px;line-height:1.6;"><strong>User Agent:</strong> ${escapeHtml(enquiry.userAgent)}</p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background:#EBE4D8;border-top:1px solid rgba(131,88,22,0.12);padding:28px 24px;">
                <p style="margin:0 0 12px 0;font-size:10px;line-height:1.6;letter-spacing:0.2em;text-transform:uppercase;color:rgba(131,88,22,0.72);font-weight:700;">
                  Confidential Internal Report. Not for public distribution.
                </p>
                <img src="${escapeHtml(logoUrl)}" alt="Velvet Compass Health" width="44" style="display:block;width:44px;max-width:44px;height:auto;margin:0 auto 10px auto;" />
                <p style="margin:0;font-size:9px;line-height:1.8;text-transform:uppercase;letter-spacing:0.12em;color:rgba(131,88,22,0.65);">
                  Clinical Excellence • Discretion • Continuity
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function createBrevoEmailService({
  apiKey,
  adminEmail,
  senderEmail,
  senderName,
  publicSiteUrl,
}) {
  if (!apiKey || !adminEmail || !senderEmail) {
    throw new Error('Brevo email service misconfigured: api key, admin email, and sender email are required.')
  }

  return {
    async sendEnquiryNotification(enquiry) {
      const supportFocus = formatList(enquiry.supportFocus, supportFocusLabels)
      const exclusions = formatList(enquiry.exclusions, exclusionLabels)
      const guidancePreference = guidanceLabels[enquiry.guidancePreference] ?? enquiry.guidancePreference
      const logoUrl = `${normalizePublicSiteUrl(publicSiteUrl)}/Logo.svg`
      const supportFocusOther = enquiry.supportFocusOther || 'N/A'

      const htmlContent = buildAdminEmailHtml({
        enquiry,
        logoUrl,
        supportFocus,
        supportFocusOther,
        exclusions,
        guidancePreference,
      })

      const textContent = [
        'New Velvet Compass Health Enquiry',
        `Submitted: ${enquiry.submittedAt}`,
        '',
        `Full name: ${enquiry.fullName}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone}`,
        `Location: ${enquiry.location}`,
        `Support focus: ${supportFocus}`,
        `Support focus (other): ${supportFocusOther}`,
        `GP registered: ${enquiry.gpRegistered}`,
        `GP details: ${enquiry.gpDetails || 'N/A'}`,
        `High-risk exclusions: ${exclusions}`,
        `Guidance preference: ${guidancePreference}`,
        '',
        `Step 1 emergency confirmed: ${asYesNo(enquiry.emergencyConfirmed)}`,
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
