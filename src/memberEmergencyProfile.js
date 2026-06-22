export const MEMBER_AREA_ROUTE = '/memberarea'
export const MEMBER_DEMO_PIN = '3672'

export const emergencyProfile = {
  memberLabel: 'Velvet Compass Health Member',
  memberName: 'Dr Ehizele Ijeoma Joseph-Ebare',
  portraitSrc: '/images/founder-portrait-new.jpg',
  overview:
    'If this person is unable to communicate, please use the information below for urgent medical care and contact Velvet Compass Health for further medical coordination.',
  criticalAlerts: {
    allergies: ['Penicillin', 'rivaroxaban', 'nuts'],
    medicationSafetyFlag:
      'Avoid quinolones where possible due to interaction risk with the patient’s medication profile.',
    currentlyOnAnticoagulants: 'No',
    bloodGroup: 'O+',
  },
  consent: {
    organDonor: 'No',
    bloodTransfusionConsent: 'Yes',
    bloodProductsConsent: 'Yes',
  },
  contacts: [
    {
      name: 'Dr Yin Lao',
      organisation: 'Velvet Compass Health',
      relationship: 'Personal Physician',
      availability: 'Available by phone and WhatsApp',
      phone: '+44 7375 028886',
    },
    {
      name: 'Mr Onosenadia Joseph-Ebare',
      relationship: 'Brother',
      phone: '+44 7951 630300',
    },
  ],
  furtherMedicalInformation:
    'For more detailed medical information, medication history, specialist letters, or care coordination, please contact Velvet Compass Health directly.',
  coordinationOffice: {
    name: 'Velvet Compass Health',
    description: 'Private Medical Office',
    service: 'Emergency Medical Coordination',
  },
}

export function isValidMemberPin(pin) {
  return pin.trim() === MEMBER_DEMO_PIN
}
