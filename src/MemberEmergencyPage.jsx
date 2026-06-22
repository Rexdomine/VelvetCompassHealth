import { useState } from 'react'
import {
  emergencyProfile,
  getEmergencyProfileCopy,
  isValidMemberPin,
  languageOptions,
} from './memberEmergencyProfile.js'

function LanguageSelector({ language, onLanguageChange, copy }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-charcoal/75">
      {copy.languageLabel}
      <select
        className="mt-3 w-full border border-secondary/70 bg-background-light px-4 py-3 text-sm normal-case tracking-normal text-charcoal outline-none transition focus:border-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        onChange={(event) => onLanguageChange(event.target.value)}
        value={language}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function DetailRow({ label, value, emphasis = false }) {
  return (
    <div className="border-b border-secondary/25 py-4 last:border-b-0">
      <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/75">{label}</dt>
      <dd className={`mt-2 text-base leading-relaxed ${emphasis ? 'font-semibold text-charcoal' : 'font-light text-charcoal/85'}`}>
        {value}
      </dd>
    </div>
  )
}

function ProfileSection({ eyebrow, title, children, urgent = false }) {
  return (
    <section className={`rounded-sm border bg-background-light/95 p-6 md:p-8 shadow-sm ${urgent ? 'border-secondary/60' : 'border-secondary/35'}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/75">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl md:text-3xl text-charcoal">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function PinGate({ copy, language, pin, error, onLanguageChange, onPinChange, onSubmit }) {
  const isRtl = language === 'ar'

  return (
    <main className="min-h-screen bg-background-light text-charcoal relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,226,160,0.65),transparent_34%),linear-gradient(135deg,rgba(252,226,160,0.28),transparent_46%)]" />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <section className="w-full max-w-xl border border-secondary/70 bg-background-light/95 backdrop-blur-sm p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <img
              alt="Velvet Compass Health logo"
              className="h-16 w-auto object-contain"
              decoding="async"
              src="/logo-header.png"
            />
            <div className="w-full sm:max-w-48">
              <LanguageSelector copy={copy} language={language} onLanguageChange={onLanguageChange} />
            </div>
          </div>

          <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.28em] text-charcoal/75">{copy.pin.eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl md:text-5xl leading-tight text-charcoal">
            {copy.pin.title}
          </h1>
          <p className="mt-6 text-sm md:text-base font-light leading-relaxed text-charcoal/85">
            {copy.pin.intro}
          </p>

          <form className="mt-10 space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-charcoal/75" htmlFor="member-pin">
                {copy.pin.label}
              </label>
              <input
                aria-describedby={error ? 'member-pin-error' : undefined}
                aria-invalid={Boolean(error)}
                autoComplete="one-time-code"
                className="mt-3 w-full border border-secondary/70 bg-white/35 px-5 py-4 text-2xl tracking-[0.6em] text-charcoal outline-none transition focus:border-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                id="member-pin"
                inputMode="numeric"
                maxLength="8"
                onChange={(event) => onPinChange(event.target.value)}
                placeholder="••••"
                type="password"
                value={pin}
              />
            </div>
            {error ? <p className="text-sm font-semibold text-primary" id="member-pin-error" role="alert">{error}</p> : null}
            <button
              className="w-full bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal transition hover:bg-background-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              type="submit"
            >
              {copy.pin.submit}
            </button>
          </form>

          <p className="mt-8 border-t border-secondary/45 pt-6 text-xs font-light leading-relaxed text-charcoal/70">
            {copy.pin.footer}
          </p>
        </section>
      </div>
    </main>
  )
}

function translateYesNo(copy, value) {
  return value === 'Yes' ? copy.values.yes : copy.values.no
}

function translateContact(copy, contact) {
  const relationshipByName = {
    'Dr Yin Lao': copy.relationships.personalPhysician,
    'Mr Onosenadia Joseph-Ebare': copy.relationships.brother,
  }

  return {
    ...contact,
    relationship: relationshipByName[contact.name] ?? contact.relationship,
    availability: contact.availability ? copy.relationships.availableByPhoneAndWhatsApp : undefined,
  }
}

function EmergencyProfile({ copy, language, onLanguageChange }) {
  const profile = emergencyProfile
  const isRtl = language === 'ar'
  const anticoagulantStatus = translateYesNo(copy, profile.criticalAlerts.currentlyOnAnticoagulants)

  return (
    <main className="min-h-screen bg-background-light text-charcoal" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="relative overflow-hidden bg-secondary/35 text-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,226,160,0.7),transparent_34%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8 md:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <img alt="Velvet Compass Health logo" className="h-12 md:h-14 w-auto object-contain" src="/logo-header.png" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <LanguageSelector copy={copy} language={language} onLanguageChange={onLanguageChange} />
              <span className="inline-flex border border-secondary/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-charcoal/75">
                {copy.headerBadge}
              </span>
            </div>
          </div>
          <div className="pt-14 md:pt-20">
            <div className="rounded-[2rem] border border-secondary/70 bg-background-light/90 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-5 md:gap-8">
                <div className="shrink-0 rounded-full border border-secondary/45 bg-background-alt p-1 shadow-xl">
                  <img
                    alt={`Profile portrait for ${profile.memberName}`}
                    className="h-20 w-20 md:h-36 md:w-36 rounded-full object-cover mix-blend-luminosity opacity-95"
                    src={profile.portraitSrc}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-charcoal/75">{copy.memberLabel}</p>
                  <h1 className="mt-3 font-display text-2xl md:text-5xl lg:text-6xl leading-tight text-charcoal">
                    {profile.memberName}
                  </h1>
                  <p className="mt-5 max-w-3xl text-base md:text-lg font-light leading-relaxed text-charcoal/82">
                    {copy.overviewPrefix} {copy.overview}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border border-secondary/70 bg-white/30 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/75">{copy.labels.bloodGroup}</p>
                  <p className="mt-2 text-3xl font-display text-charcoal">{profile.criticalAlerts.bloodGroup}</p>
                </div>
                <div className="border border-secondary/70 bg-white/30 p-4 md:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/75">{copy.labels.allergies}</p>
                  <p className="mt-2 text-base font-semibold text-charcoal">{profile.criticalAlerts.allergies.join(', ')}</p>
                </div>
                <div className="border border-secondary/70 bg-white/30 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/75">{copy.labels.anticoagulants}</p>
                  <p className="mt-2 text-2xl font-display text-charcoal">{anticoagulantStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16 space-y-8">
        <ProfileSection eyebrow={copy.sections.criticalAlerts.eyebrow} title={copy.sections.criticalAlerts.title} urgent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <DetailRow label={copy.labels.allergies} value={profile.criticalAlerts.allergies.join(', ')} emphasis />
            <DetailRow label={copy.labels.bloodGroup} value={profile.criticalAlerts.bloodGroup} emphasis />
            <DetailRow label={copy.labels.currentlyOnAnticoagulants} value={anticoagulantStatus} />
            <DetailRow label={copy.labels.medicationSafetyFlag} value={copy.medicationSafetyFlag ?? profile.criticalAlerts.medicationSafetyFlag} emphasis />
          </dl>
        </ProfileSection>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8">
          <ProfileSection eyebrow={copy.sections.consent.eyebrow} title={copy.sections.consent.title}>
            <dl>
              <DetailRow label={copy.labels.organDonor} value={translateYesNo(copy, profile.consent.organDonor)} />
              <DetailRow label={copy.labels.bloodTransfusionConsent} value={translateYesNo(copy, profile.consent.bloodTransfusionConsent)} emphasis />
              <DetailRow label={copy.labels.bloodProductsConsent} value={translateYesNo(copy, profile.consent.bloodProductsConsent)} emphasis />
            </dl>
          </ProfileSection>

          <ProfileSection eyebrow={copy.sections.contacts.eyebrow} title={copy.sections.contacts.title}>
            <div className="space-y-5">
              {profile.contacts.map((contact) => {
                const translatedContact = translateContact(copy, contact)
                return (
                  <article className="border border-secondary/35 bg-white/30 p-5" key={contact.name}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl text-charcoal">{contact.name}</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.14em] text-charcoal/75">
                          {[contact.organisation, translatedContact.relationship].filter(Boolean).join(' • ')}
                        </p>
                        {translatedContact.availability ? (
                          <p className="mt-3 text-sm font-light text-charcoal/75">{translatedContact.availability}</p>
                        ) : null}
                      </div>
                      <a
                        className="inline-flex shrink-0 items-center justify-center border border-secondary px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                        href={`tel:${contact.phone.replaceAll(' ', '')}`}
                      >
                        {copy.call} {contact.phone}
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </ProfileSection>
        </div>

        <ProfileSection eyebrow={copy.sections.furtherInfo.eyebrow} title={copy.sections.furtherInfo.title}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <p className="text-lg font-light leading-relaxed text-charcoal/82">{copy.furtherMedicalInformation}</p>
            <div className="border-l-2 border-secondary bg-background-alt/45 p-6">
              <p className="font-display text-2xl text-charcoal">{profile.coordinationOffice.name}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-charcoal/75">{copy.coordinationOffice.description}</p>
              <p className="mt-4 text-base font-semibold text-charcoal">{copy.coordinationOffice.service}</p>
              <a
                className="mt-6 inline-flex items-center justify-center border border-secondary px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                href={`tel:${profile.contacts[0].phone.replaceAll(' ', '')}`}
              >
                {copy.coordinationOffice.call}
              </a>
            </div>
          </div>
        </ProfileSection>
      </div>
    </main>
  )
}

export default function MemberEmergencyPage() {
  const [pin, setPin] = useState('')
  const [language, setLanguage] = useState('en')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')
  const copy = getEmergencyProfileCopy(language)

  const onLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage)
    setError('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (isValidMemberPin(pin)) {
      setUnlocked(true)
      setError('')
      return
    }

    setError(copy.pin.error)
  }

  if (!unlocked) {
    return (
      <PinGate
        copy={copy}
        error={error}
        language={language}
        onLanguageChange={onLanguageChange}
        onPinChange={setPin}
        onSubmit={onSubmit}
        pin={pin}
      />
    )
  }

  return <EmergencyProfile copy={copy} language={language} onLanguageChange={onLanguageChange} />
}
