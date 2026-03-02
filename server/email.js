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
  logoHeaderUrl,
  logoFooterUrl,
  supportFocus,
  supportFocusOther,
  exclusions,
  guidancePreference,
}) {
  const gpRegisteredLabel = enquiry.gpRegistered === 'yes' ? 'Yes' : 'No'
  const highRiskSummary = enquiry.exclusions.includes('none')
    ? 'No critical exclusions identified in preliminary scan.'
    : exclusions

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Access Application</title>
  </head>
  <body style="margin:0;padding:0;background:#EAE2D5;font-family:Arial,'Raleway',sans-serif;color:#272426;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EAE2D5;padding:24px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="850" style="max-width:850px;width:100%;background:#F2EBE0;border:1px solid #D8D0C4;box-shadow:0 20px 50px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="padding:40px 24px 24px 24px;">
                <img src="${escapeHtml(logoHeaderUrl)}" alt="Velvet Compass Health" width="110" style="display:block;width:110px;max-width:110px;height:auto;margin:0 auto 16px auto;" />
                <h1 style="margin:0 0 8px 0;font-family:Georgia,'Crimson Pro',serif;font-size:44px;line-height:1.15;font-weight:600;color:#272426;">New Access Application</h1>
                <p style="margin:0;font-size:10px;line-height:1.6;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#835816;">
                  A formal enquiry has been submitted through the portal.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="height:1px;background:#DDD5C9;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 28px;">
                <p style="margin:0 0 14px 0;font-size:10px;line-height:1.6;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#835816;">• Section 1 : Identity</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;width:34%;">Full Name</td>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:14px;font-weight:600;color:#272426;text-align:right;">${escapeHtml(enquiry.fullName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;">Location</td>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:14px;color:#272426;text-align:right;">${escapeHtml(enquiry.location)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;">Phone</td>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:14px;color:#272426;text-align:right;">${escapeHtml(enquiry.phone)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;">Email</td>
                    <td style="padding:10px 0;font-size:14px;color:#5A5A5A;text-align:right;font-style:italic;">${escapeHtml(enquiry.email)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="height:1px;background:#E6DED2;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 28px;">
                <p style="margin:0 0 14px 0;font-size:10px;line-height:1.6;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#835816;">• Section 2 : Focus of Support</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td valign="top" style="padding:16px;background:#EFE8DD;border-left:2px solid #835816;width:50%;">
                      <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9A7B4B;">Primary Focus</p>
                      <p style="margin:0;font-size:16px;line-height:1.4;font-weight:600;color:#272426;">${escapeHtml(supportFocus)}</p>
                    </td>
                    <td style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                    <td valign="top" style="padding:16px;background:#EFE8DD;border-left:2px solid #835816;width:50%;">
                      <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9A7B4B;">Support Level</p>
                      <p style="margin:0;font-size:16px;line-height:1.4;font-weight:600;color:#272426;">${escapeHtml(guidancePreference)}</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:12px 0 0 0;font-size:13px;line-height:1.6;color:#5F5A53;"><strong>Other details:</strong> ${escapeHtml(supportFocusOther)}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="height:1px;background:#E6DED2;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 28px;">
                <p style="margin:0 0 14px 0;font-size:10px;line-height:1.6;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#835816;">• Section 3 : Care Context</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;width:34%;">GP Registered</td>
                    <td style="padding:10px 0;border-bottom:1px solid #E5DDD1;font-size:14px;font-weight:600;color:#272426;text-align:right;">${escapeHtml(gpRegisteredLabel)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;">GP Details</td>
                    <td style="padding:10px 0;font-size:14px;color:#272426;text-align:right;">${escapeHtml(enquiry.gpDetails || 'N/A')}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="height:1px;background:#E6DED2;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 28px;">
                <p style="margin:0 0 14px 0;font-size:10px;line-height:1.6;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#835816;">• Section 4 : Exclusions &amp; Preferences</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EFE8DD;border:1px solid #E5DDD1;">
                  <tr>
                    <td style="padding:18px;">
                      <p style="margin:0 0 8px 0;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;">High-risk Indicators</p>
                      <p style="margin:0 0 14px 0;font-size:13px;line-height:1.6;color:#3A3A3A;">${escapeHtml(highRiskSummary)}</p>
                      <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9A7B4B;">Guidance Style Preference</p>
                      <p style="margin:0;font-size:13px;line-height:1.7;color:#4C4945;font-style:italic;">${escapeHtml(guidancePreference)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="height:1px;background:#E6DED2;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 28px;">
                <p style="margin:0 0 14px 0;font-size:10px;line-height:1.6;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#835816;">• Section 5 : Confirmation &amp; Audit</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Step 1 Emergency Confirmation:</strong> ${asYesNo(enquiry.emergencyConfirmed)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Not Emergency Service:</strong> ${asYesNo(enquiry.ackNotEmergencyService)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Urgent Escalation Understanding:</strong> ${asYesNo(enquiry.ackUrgentEscalation)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Invitation-only Understanding:</strong> ${asYesNo(enquiry.ackInvitationOnly)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Professional Boundaries Understanding:</strong> ${asYesNo(enquiry.ackProfessionalBoundaries)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Information Accuracy Confirmed:</strong> ${asYesNo(enquiry.ackInformationAccuracy)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>Submitted At:</strong> ${escapeHtml(enquiry.submittedAt)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:13px;line-height:1.6;color:#272426;"><strong>IP Address:</strong> ${escapeHtml(enquiry.ipAddress)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0 0 0;font-size:13px;line-height:1.6;color:#272426;"><strong>User Agent:</strong> ${escapeHtml(enquiry.userAgent)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="background:#EBE4D8;border-top:1px solid #DDD5C9;padding:28px 24px;">
                <p style="margin:0 0 12px 0;font-size:10px;line-height:1.6;letter-spacing:0.2em;text-transform:uppercase;color:#9A7B4B;font-weight:700;">
                  Confidential Internal Report. Not for public distribution.
                </p>
                <img src="${escapeHtml(logoFooterUrl)}" alt="Velvet Compass Health" width="72" style="display:block;width:72px;max-width:72px;height:auto;margin:0 auto 10px auto;" />
                <p style="margin:0;font-size:9px;line-height:1.8;text-transform:uppercase;letter-spacing:0.12em;color:#9A7B4B;">
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
      const baseUrl = normalizePublicSiteUrl(publicSiteUrl)
      const logoHeaderUrl = `${baseUrl}/logo-header.png`
      const logoFooterUrl = `${baseUrl}/logo-footer.png`
      const supportFocusOther = enquiry.supportFocusOther || 'N/A'

      const htmlContent = buildAdminEmailHtml({
        enquiry,
        logoHeaderUrl,
        logoFooterUrl,
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
