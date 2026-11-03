export function validateStep(step, values) {
  if (step === 1 && !values.emergencyConfirmed) return 'Please confirm that this is not an emergency before continuing.'
  if (step === 2) {
    if (!values.fullName.trim() || !values.email.trim() || !values.location.trim() || !values.contactMethod) return 'Please complete your name, email, location and preferred contact method.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return 'Please enter a valid email address.'
    if (values.contactMethod === 'Telephone' && !values.phone.trim()) return 'Please provide a telephone number for your preferred contact method.'
  }
  if (step === 3) {
    if (!values.enquiryType || !values.supportFocus.length || !values.message.trim()) return 'Please select an enquiry type, a support focus and add a short message.'
    if (values.supportFocus.includes('other') && !values.supportFocusOther.trim()) return 'Please briefly describe the other support you have in mind.'
  }
  if (step === 4 && (!values.gpRegistered || (values.gpRegistered === 'yes' && !values.gpDetails.trim()))) return 'Please complete your current GP and care context.'
  if (step === 5) {
    if (!values.exclusions.length) return 'Please choose the option that applies today.'
    if (!values.exclusions.includes('none')) return 'Please seek urgent or emergency care now. This form is not monitored for urgent concerns.'
  }
  if (step === 6 && !values.guidancePreference) return 'Please choose the approach you prefer.'
  if (step === 7 && (!values.ackNotEmergencyService || !values.ackUrgentEscalation || !values.ackInvitationOnly || !values.ackProfessionalBoundaries || !values.ackInformationAccuracy || !values.privacyConsent)) return 'Please confirm the boundaries and privacy notice before requesting review.'
  return ''
}
