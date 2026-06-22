import { useState } from 'react'
import { emergencyProfile, isValidMemberPin } from './memberEmergencyProfile.js'

function DetailRow({ label, value, emphasis = false }) {
  return (
    <div className="border-b border-primary/15 py-4 last:border-b-0">
      <dt className="text-[10px] font-bold uppercase tracking-[0.26em] text-primary/80">{label}</dt>
      <dd className={`mt-2 text-base leading-relaxed ${emphasis ? 'font-semibold text-charcoal' : 'font-light text-charcoal/80'}`}>
        {value}
      </dd>
    </div>
  )
}

function ProfileSection({ eyebrow, title, children, urgent = false }) {
  return (
    <section className={`rounded-sm border bg-background-light/95 p-6 md:p-8 shadow-sm ${urgent ? 'border-primary/40' : 'border-primary/15'}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/75">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl md:text-3xl text-charcoal">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function PinGate({ pin, error, onPinChange, onSubmit }) {
  return (
    <main className="min-h-screen bg-charcoal text-background-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,88,22,0.32),transparent_34%),linear-gradient(135deg,rgba(252,226,160,0.08),transparent_46%)]" />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <section className="w-full max-w-xl border border-primary/35 bg-background-light/[0.04] backdrop-blur-sm p-8 md:p-12 shadow-2xl">
          <img
            alt="Velvet Compass Health logo"
            className="h-16 w-auto object-contain mb-10"
            decoding="async"
            src="/logo-header.png"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-secondary/70">Member Emergency Access</p>
          <h1 className="mt-5 font-display text-4xl md:text-5xl leading-tight text-background-light">
            Protected clinical summary
          </h1>
          <p className="mt-6 text-sm md:text-base font-light leading-relaxed text-background-light/75">
            This proof-of-concept page represents the QR-code destination printed on a Velvet Compass Health member
            card. Enter the card PIN to view the demo emergency profile.
          </p>

          <form className="mt-10 space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.28em] text-secondary/70" htmlFor="member-pin">
                Card PIN
              </label>
              <input
                aria-describedby={error ? 'member-pin-error' : undefined}
                aria-invalid={Boolean(error)}
                autoComplete="one-time-code"
                className="mt-3 w-full border border-secondary/20 bg-transparent px-5 py-4 text-2xl tracking-[0.6em] text-secondary outline-none transition focus:border-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                id="member-pin"
                inputMode="numeric"
                maxLength="8"
                onChange={(event) => onPinChange(event.target.value)}
                placeholder="••••"
                type="password"
                value={pin}
              />
            </div>
            {error ? <p className="text-sm text-secondary" id="member-pin-error" role="alert">{error}</p> : null}
            <button
              className="w-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-secondary hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              type="submit"
            >
              Unlock Profile
            </button>
          </form>

          <p className="mt-8 border-t border-secondary/10 pt-6 text-xs font-light leading-relaxed text-background-light/55">
            In a live system this access layer would be server-side protected. This static demo intentionally keeps the
            flow simple for stakeholder review.
          </p>
        </section>
      </div>
    </main>
  )
}

function EmergencyProfile() {
  const profile = emergencyProfile

  return (
    <main className="min-h-screen bg-background-light text-charcoal">
      <header className="relative overflow-hidden bg-charcoal text-background-light">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,226,160,0.16),transparent_34%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8 md:py-10">
          <div className="flex items-center justify-between gap-6">
            <img alt="Velvet Compass Health logo" className="h-12 md:h-14 w-auto object-contain" src="/logo-header.png" />
            <span className="hidden sm:inline-flex border border-secondary/30 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-secondary/80">
              Emergency Profile
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-16 items-end pt-14 md:pt-20">
            <div className="relative max-w-sm">
              <div className="aspect-[4/5] overflow-hidden bg-background-alt">
                <img
                  alt={`Profile portrait for ${profile.memberName}`}
                  className="h-full w-full object-cover mix-blend-luminosity opacity-95"
                  src={profile.portraitSrc}
                />
              </div>
            </div>
            <div className="pb-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-secondary/75">{profile.memberLabel}</p>
              <h1 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-background-light">
                {profile.memberName}
              </h1>
              <p className="mt-8 max-w-3xl text-base md:text-lg font-light leading-relaxed text-background-light/82">
                This page contains emergency medical information for this Velvet Compass Health member. {profile.overview}
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border border-secondary/20 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary/70">Blood Group</p>
                  <p className="mt-2 text-3xl font-display text-secondary">{profile.criticalAlerts.bloodGroup}</p>
                </div>
                <div className="border border-secondary/20 p-4 md:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary/70">Allergies</p>
                  <p className="mt-2 text-base font-semibold text-background-light">{profile.criticalAlerts.allergies.join(', ')}</p>
                </div>
                <div className="border border-secondary/20 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary/70">Anticoagulants</p>
                  <p className="mt-2 text-2xl font-display text-secondary">{profile.criticalAlerts.currentlyOnAnticoagulants}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16 space-y-8">
        <ProfileSection eyebrow="Critical Alerts" title="Immediate safety information" urgent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <DetailRow label="Allergies" value={profile.criticalAlerts.allergies.join(', ')} emphasis />
            <DetailRow label="Blood Group" value={profile.criticalAlerts.bloodGroup} emphasis />
            <DetailRow label="Currently on anticoagulants" value={profile.criticalAlerts.currentlyOnAnticoagulants} />
            <DetailRow label="Medication safety flag" value={profile.criticalAlerts.medicationSafetyFlag} emphasis />
          </dl>
        </ProfileSection>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8">
          <ProfileSection eyebrow="Consent Information" title="Treatment consent indicators">
            <dl>
              <DetailRow label="Organ donor" value={profile.consent.organDonor} />
              <DetailRow label="Blood transfusion consent" value={profile.consent.bloodTransfusionConsent} emphasis />
              <DetailRow label="Blood products consent" value={profile.consent.bloodProductsConsent} emphasis />
            </dl>
          </ProfileSection>

          <ProfileSection eyebrow="Emergency Contacts" title="Clinical and family contacts">
            <div className="space-y-5">
              {profile.contacts.map((contact) => (
                <article className="border border-primary/15 bg-white/30 p-5" key={contact.name}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl text-charcoal">{contact.name}</h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-primary/75">
                        {[contact.organisation, contact.relationship].filter(Boolean).join(' • ')}
                      </p>
                      {contact.availability ? (
                        <p className="mt-3 text-sm font-light text-charcoal/70">{contact.availability}</p>
                      ) : null}
                    </div>
                    <a
                      className="inline-flex shrink-0 items-center justify-center border border-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      href={`tel:${contact.phone.replaceAll(' ', '')}`}
                    >
                      Call {contact.phone}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </ProfileSection>
        </div>

        <ProfileSection eyebrow="Further Medical Information" title="Velvet Compass Health coordination">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <p className="text-lg font-light leading-relaxed text-charcoal/78">{profile.furtherMedicalInformation}</p>
            <div className="border-l-2 border-primary bg-background-alt/45 p-6">
              <p className="font-display text-2xl text-charcoal">{profile.coordinationOffice.name}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.24em] text-primary/80">{profile.coordinationOffice.description}</p>
              <p className="mt-4 text-base font-semibold text-charcoal">{profile.coordinationOffice.service}</p>
              <a
                className="mt-6 inline-flex items-center justify-center border border-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                href={`tel:${profile.contacts[0].phone.replaceAll(' ', '')}`}
              >
                Call coordination office
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
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (isValidMemberPin(pin)) {
      setUnlocked(true)
      setError('')
      return
    }

    setError('The PIN entered does not match this demo member card.')
  }

  if (!unlocked) {
    return <PinGate error={error} onPinChange={setPin} onSubmit={onSubmit} pin={pin} />
  }

  return <EmergencyProfile />
}
