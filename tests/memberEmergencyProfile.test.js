import { describe, expect, it } from 'vitest'
import {
  MEMBER_AREA_ROUTE,
  MEMBER_DEMO_PIN,
  emergencyProfile,
  getEmergencyProfileCopy,
  isSupportedLanguage,
  isValidMemberPin,
  languageOptions,
} from '../src/memberEmergencyProfile.js'

describe('member emergency profile POC data', () => {
  it('defines the requested static member route and demo PIN', () => {
    expect(MEMBER_AREA_ROUTE).toBe('/memberarea')
    expect(MEMBER_DEMO_PIN).toBe('3672')
    expect(isValidMemberPin('3672')).toBe(true)
    expect(isValidMemberPin(' 3672 ')).toBe(true)
    expect(isValidMemberPin('0000')).toBe(false)
  })

  it('contains the emergency details medical practitioners need after unlock', () => {
    expect(emergencyProfile.memberName).toBe('Dr Ehizele Ijeoma Joseph-Ebare')
    expect(emergencyProfile.memberLabel).toBe('Emergency Medical Information')
    expect(emergencyProfile.criticalAlerts.allergies).toEqual(['Penicillin', 'rivaroxaban', 'nuts'])
    expect(emergencyProfile.criticalAlerts.bloodGroup).toBe('O+')
    expect(emergencyProfile.criticalAlerts.currentlyOnAnticoagulants).toBe('No')
    expect(emergencyProfile.consent.bloodTransfusionConsent).toBe('Yes')
    expect(emergencyProfile.contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Dr Yin Lao', phone: '+44 7375 028886' }),
        expect.objectContaining({ name: 'Mr Onosenadia Joseph-Ebare', phone: '+44 7951 630300' }),
      ]),
    )
  })

  it('offers lightweight translated copy for the emergency profile demo', () => {
    expect(languageOptions.map((option) => option.code)).toEqual(['en', 'fr', 'es', 'ar'])
    expect(isSupportedLanguage('fr')).toBe(true)
    expect(isSupportedLanguage('de')).toBe(false)

    const frenchCopy = getEmergencyProfileCopy('fr')
    expect(frenchCopy.memberLabel).toBe('Informations médicales d’urgence')
    expect(frenchCopy.pin.submit).toBe('Déverrouiller le profil sécurisé')
    expect(frenchCopy.sections.criticalAlerts.title).toBe('Informations de sécurité immédiates')
    expect(frenchCopy.values.yes).toBe('Oui')
    expect(frenchCopy.values.no).toBe('Non')

    const fallbackCopy = getEmergencyProfileCopy('unsupported')
    expect(fallbackCopy.memberLabel).toBe('Emergency Medical Information')
  })
})
