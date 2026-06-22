export const MEMBER_AREA_ROUTE = '/memberarea'
export const MEMBER_DEMO_PIN = '3672'

export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
]

export const emergencyProfile = {
  memberLabel: 'Emergency Medical Information',
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

export const emergencyProfileTranslations = {
  en: {
    languageLabel: 'Translate page',
    memberLabel: 'Emergency Medical Information',
    headerBadge: 'Emergency Profile',
    pin: {
      eyebrow: 'Member Emergency Access',
      title: 'Protected clinical summary',
      intro:
        'Enter the secure PIN printed on the member card to access their emergency clinical summary and coordination details.',
      label: 'Card PIN',
      submit: 'Unlock secure profile',
      footer:
        'Access is intended for authorised clinical review during urgent care. If you are not involved in this member’s care, please close this page and contact Velvet Compass Health.',
      error: 'The PIN entered does not match this member card.',
    },
    overviewPrefix: 'This page contains emergency medical information for this Velvet Compass Health member.',
    overview: emergencyProfile.overview,
    labels: {
      bloodGroup: 'Blood Group',
      allergies: 'Allergies',
      anticoagulants: 'Anticoagulants',
      currentlyOnAnticoagulants: 'Currently on anticoagulants',
      medicationSafetyFlag: 'Medication safety flag',
      organDonor: 'Organ donor',
      bloodTransfusionConsent: 'Blood transfusion consent',
      bloodProductsConsent: 'Blood products consent',
    },
    sections: {
      criticalAlerts: { eyebrow: 'Critical Alerts', title: 'Immediate safety information' },
      consent: { eyebrow: 'Consent Information', title: 'Treatment consent indicators' },
      contacts: { eyebrow: 'Emergency Contacts', title: 'Clinical and family contacts' },
      furtherInfo: { eyebrow: 'Further Medical Information', title: 'Velvet Compass Health coordination' },
    },
    values: { yes: 'Yes', no: 'No' },
    relationships: {
      personalPhysician: 'Personal Physician',
      brother: 'Brother',
      availableByPhoneAndWhatsApp: 'Available by phone and WhatsApp',
    },
    coordinationOffice: {
      description: 'Private Medical Office',
      service: 'Emergency Medical Coordination',
      call: 'Call coordination office',
    },
    furtherMedicalInformation: emergencyProfile.furtherMedicalInformation,
    medicationSafetyFlag: emergencyProfile.criticalAlerts.medicationSafetyFlag,
    call: 'Call',
  },
  fr: {
    languageLabel: 'Traduire la page',
    memberLabel: 'Informations médicales d’urgence',
    headerBadge: 'Profil d’urgence',
    pin: {
      eyebrow: 'Accès d’urgence membre',
      title: 'Résumé clinique protégé',
      intro:
        'Saisissez le code PIN sécurisé imprimé sur la carte membre pour accéder au résumé clinique d’urgence et aux coordonnées de coordination.',
      label: 'Code PIN de la carte',
      submit: 'Déverrouiller le profil sécurisé',
      footer:
        'Cet accès est destiné à l’examen clinique autorisé pendant les soins urgents. Si vous ne participez pas aux soins de ce membre, veuillez fermer cette page et contacter Velvet Compass Health.',
      error: 'Le code PIN saisi ne correspond pas à cette carte membre.',
    },
    overviewPrefix: 'Cette page contient les informations médicales d’urgence de ce membre Velvet Compass Health.',
    overview:
      'Si cette personne ne peut pas communiquer, utilisez les informations ci-dessous pour les soins urgents et contactez Velvet Compass Health pour la coordination médicale.',
    labels: {
      bloodGroup: 'Groupe sanguin',
      allergies: 'Allergies',
      anticoagulants: 'Anticoagulants',
      currentlyOnAnticoagulants: 'Actuellement sous anticoagulants',
      medicationSafetyFlag: 'Alerte de sécurité médicamenteuse',
      organDonor: 'Donneur d’organes',
      bloodTransfusionConsent: 'Consentement à la transfusion sanguine',
      bloodProductsConsent: 'Consentement aux produits sanguins',
    },
    sections: {
      criticalAlerts: { eyebrow: 'Alertes critiques', title: 'Informations de sécurité immédiates' },
      consent: { eyebrow: 'Informations de consentement', title: 'Indicateurs de consentement au traitement' },
      contacts: { eyebrow: 'Contacts d’urgence', title: 'Contacts cliniques et familiaux' },
      furtherInfo: { eyebrow: 'Informations médicales supplémentaires', title: 'Coordination Velvet Compass Health' },
    },
    values: { yes: 'Oui', no: 'Non' },
    relationships: {
      personalPhysician: 'Médecin personnel',
      brother: 'Frère',
      availableByPhoneAndWhatsApp: 'Disponible par téléphone et WhatsApp',
    },
    coordinationOffice: {
      description: 'Cabinet médical privé',
      service: 'Coordination médicale d’urgence',
      call: 'Appeler le bureau de coordination',
    },
    furtherMedicalInformation:
      'Pour des informations médicales plus détaillées, l’historique des médicaments, les courriers de spécialistes ou la coordination des soins, contactez directement Velvet Compass Health.',
    medicationSafetyFlag:
      'Éviter les quinolones si possible en raison du risque d’interaction avec le profil médicamenteux du patient.',
    call: 'Appeler',
  },
  es: {
    languageLabel: 'Traducir página',
    memberLabel: 'Información médica de emergencia',
    headerBadge: 'Perfil de emergencia',
    pin: {
      eyebrow: 'Acceso de emergencia del miembro',
      title: 'Resumen clínico protegido',
      intro:
        'Introduzca el PIN seguro impreso en la tarjeta del miembro para acceder a su resumen clínico de emergencia y datos de coordinación.',
      label: 'PIN de la tarjeta',
      submit: 'Desbloquear perfil seguro',
      footer:
        'Este acceso está destinado a revisión clínica autorizada durante atención urgente. Si no participa en la atención de este miembro, cierre esta página y contacte con Velvet Compass Health.',
      error: 'El PIN introducido no coincide con esta tarjeta de miembro.',
    },
    overviewPrefix: 'Esta página contiene información médica de emergencia de este miembro de Velvet Compass Health.',
    overview:
      'Si esta persona no puede comunicarse, utilice la información siguiente para atención médica urgente y contacte con Velvet Compass Health para coordinación médica.',
    labels: {
      bloodGroup: 'Grupo sanguíneo',
      allergies: 'Alergias',
      anticoagulants: 'Anticoagulantes',
      currentlyOnAnticoagulants: 'Actualmente con anticoagulantes',
      medicationSafetyFlag: 'Alerta de seguridad de medicamentos',
      organDonor: 'Donante de órganos',
      bloodTransfusionConsent: 'Consentimiento para transfusión de sangre',
      bloodProductsConsent: 'Consentimiento para productos sanguíneos',
    },
    sections: {
      criticalAlerts: { eyebrow: 'Alertas críticas', title: 'Información de seguridad inmediata' },
      consent: { eyebrow: 'Información de consentimiento', title: 'Indicadores de consentimiento para tratamiento' },
      contacts: { eyebrow: 'Contactos de emergencia', title: 'Contactos clínicos y familiares' },
      furtherInfo: { eyebrow: 'Información médica adicional', title: 'Coordinación de Velvet Compass Health' },
    },
    values: { yes: 'Sí', no: 'No' },
    relationships: {
      personalPhysician: 'Médico personal',
      brother: 'Hermano',
      availableByPhoneAndWhatsApp: 'Disponible por teléfono y WhatsApp',
    },
    coordinationOffice: {
      description: 'Consultorio médico privado',
      service: 'Coordinación médica de emergencia',
      call: 'Llamar a coordinación',
    },
    furtherMedicalInformation:
      'Para información médica más detallada, historial de medicamentos, cartas de especialistas o coordinación de cuidados, contacte directamente con Velvet Compass Health.',
    medicationSafetyFlag:
      'Evitar las quinolonas cuando sea posible por riesgo de interacción con el perfil de medicación del paciente.',
    call: 'Llamar',
  },
  ar: {
    languageLabel: 'ترجمة الصفحة',
    memberLabel: 'معلومات طبية طارئة',
    headerBadge: 'ملف الطوارئ',
    pin: {
      eyebrow: 'دخول طوارئ العضو',
      title: 'ملخص سريري محمي',
      intro: 'أدخل رقم التعريف الآمن المطبوع على بطاقة العضو لعرض ملخصه السريري الطارئ ومعلومات التنسيق.',
      label: 'رقم البطاقة السري',
      submit: 'فتح الملف الآمن',
      footer:
        'هذا الوصول مخصص للمراجعة الطبية المصرح بها أثناء الرعاية العاجلة. إذا لم تكن مشاركاً في رعاية هذا العضو، يرجى إغلاق الصفحة والتواصل مع Velvet Compass Health.',
      error: 'رقم التعريف المدخل لا يطابق بطاقة هذا العضو.',
    },
    overviewPrefix: 'تحتوي هذه الصفحة على المعلومات الطبية الطارئة لهذا العضو في Velvet Compass Health.',
    overview:
      'إذا كان هذا الشخص غير قادر على التواصل، يرجى استخدام المعلومات أدناه للرعاية الطبية العاجلة والتواصل مع Velvet Compass Health للتنسيق الطبي.',
    labels: {
      bloodGroup: 'فصيلة الدم',
      allergies: 'الحساسية',
      anticoagulants: 'مضادات التخثر',
      currentlyOnAnticoagulants: 'يتناول مضادات تخثر حالياً',
      medicationSafetyFlag: 'تنبيه سلامة الأدوية',
      organDonor: 'متبرع بالأعضاء',
      bloodTransfusionConsent: 'الموافقة على نقل الدم',
      bloodProductsConsent: 'الموافقة على منتجات الدم',
    },
    sections: {
      criticalAlerts: { eyebrow: 'تنبيهات حرجة', title: 'معلومات سلامة فورية' },
      consent: { eyebrow: 'معلومات الموافقة', title: 'مؤشرات الموافقة على العلاج' },
      contacts: { eyebrow: 'جهات اتصال الطوارئ', title: 'جهات الاتصال الطبية والعائلية' },
      furtherInfo: { eyebrow: 'معلومات طبية إضافية', title: 'تنسيق Velvet Compass Health' },
    },
    values: { yes: 'نعم', no: 'لا' },
    relationships: {
      personalPhysician: 'الطبيب الشخصي',
      brother: 'الأخ',
      availableByPhoneAndWhatsApp: 'متاح عبر الهاتف وواتساب',
    },
    coordinationOffice: {
      description: 'مكتب طبي خاص',
      service: 'تنسيق طبي للطوارئ',
      call: 'اتصل بمكتب التنسيق',
    },
    furtherMedicalInformation:
      'للحصول على معلومات طبية أكثر تفصيلاً أو تاريخ الأدوية أو خطابات الأخصائيين أو تنسيق الرعاية، يرجى التواصل مباشرة مع Velvet Compass Health.',
    medicationSafetyFlag:
      'تجنب الكينولونات قدر الإمكان بسبب خطر التفاعل مع ملف أدوية المريض.',
    call: 'اتصل',
  },
}

export function isSupportedLanguage(languageCode) {
  return languageOptions.some((option) => option.code === languageCode)
}

export function getEmergencyProfileCopy(languageCode = 'en') {
  return emergencyProfileTranslations[isSupportedLanguage(languageCode) ? languageCode : 'en']
}

export function isValidMemberPin(pin) {
  return pin.trim() === MEMBER_DEMO_PIN
}
