import { useEffect } from 'react'
import './features/how-it-works/how-it-works.css'

const enquiryHref = '/enquire'

const navigation = [
  ['Home', '/'],
  ['Membership', '/membership'],
  ['How it works', '/how-it-works'],
  ['Health Intelligence', '/health-intelligence'],
  ['Clinical Network', '/clinical-network'],
  ['International Care', '/international-care'],
  ['About VCH', '/about-vch'],
]

const journey = [
  {
    title: 'Understand the life',
    body: 'We begin with your concerns, priorities, history, responsibilities and the future you want your health to make possible. Good strategy starts with the person, not simply a list of conditions.',
  },
  {
    title: 'Establish the baseline',
    body: 'With permission, relevant records, results, medications, family history, previous opinions and active care are reviewed. We identify what is known, what remains uncertain and what has been lost between encounters.',
  },
  {
    title: 'Map the moving parts',
    body: 'We consider current health alongside the risks and functions that change over time: cardiovascular and metabolic health, cognition, sleep, recovery, mobility, hormones and other priorities relevant to the member.',
  },
  {
    title: 'Build the strategy',
    body: 'Information becomes an ordered plan: what needs attention now, what should be measured or clarified, what can be improved and what should be watched across the years ahead.',
  },
  {
    title: 'Coordinate expertise',
    body: 'Where specialist or diagnostic input is useful, VCH identifies an appropriate route, prepares the question and keeps sight of how the answer affects the wider strategy.',
  },
  {
    title: 'Interpret, do not simply collect',
    body: 'A test, scan, wearable trend or genomic result is considered in context. More information is not automatically more intelligence; the value lies in knowing what should change because of it.',
  },
  {
    title: 'Act and close the loop',
    body: 'VCH helps coordinate agreed actions, clarify responsibility, review outcomes and reduce the risk that recommendations disappear between appointments.',
  },
  {
    title: 'Recalibrate over time',
    body: 'Health never stands still. VCH reviews changes, new evidence, life events and developing priorities so that the strategy remains relevant.',
  },
  {
    title: 'Respond when something changes',
    body: 'When a new concern arises, the doctor already knows the context and can guide the appropriate next step, whether that is primary care, investigation, specialist review, urgent assessment or emergency care.',
  },
]

function HowHeader() {
  return (
    <header className="how-header">
      <a className="how-skip" href="#how-main">Skip to main content</a>
      <a className="how-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="how-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <a key={label} href={href} aria-current={label === 'How it works' ? 'page' : undefined}>{label}</a>
        ))}
        <a className="how-nav-enquire" href={enquiryHref}>Enquire</a>
      </nav>
      <details className="how-mobile-nav" onKeyDown={(event) => {
        if (event.key === 'Escape') event.currentTarget.open = false
      }}>
        <summary aria-label="Navigation menu"><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if (event.target.closest('a')) event.currentTarget.parentElement.open = false
        }}>
          {navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a href={enquiryHref}>Enquire</a>
        </nav>
      </details>
    </header>
  )
}

function JourneyStep({ step, index }) {
  return (
    <article className="how-step" id={`step-${index + 1}`}>
      <span className="how-step-node" aria-hidden="true" />
      <span className="how-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="how-step-copy">
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </div>
    </article>
  )
}

export default function HowItWorksPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'How it works — Velvet Compass Health'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div className="how-page">
      <HowHeader />
      <main id="how-main">
        <section className="how-hero" aria-labelledby="how-title">
          <img className="how-hero-art" src="/vch-approved/how-it-works/navigation-study.jpg" alt="A measured brass navigation instrument and a fine line across an ivory folio" />
          <div className="how-hero-wash" aria-hidden="true" />
          <div className="how-hero-copy">
            <p className="how-eyebrow">The member journey</p>
            <h1 id="how-title">Your own doctor.<br />The whole picture.<br /><em>A strategy that<br />moves with you.</em></h1>
            <p className="how-lead">VCH turns history, risk, data, appointments and specialist opinion into a coherent health strategy, then remains alongside you as that picture changes.</p>
            <a className="how-button" href={enquiryHref}>Enquire Privately</a>
          </div>
          <a className="how-scroll-cue" href="#navigation-art">Discover the approach</a>
        </section>

        <section className="how-navigation-art" id="navigation-art" aria-labelledby="navigation-title">
          <div className="how-navigation-copy">
            <p className="how-eyebrow">Direction through complexity</p>
            <h2 id="navigation-title">The art of<br /><em>navigation</em></h2>
            <p>The purpose of a compass is not to choose the destination for you. It is to preserve direction when the route becomes complicated. VCH combines medical science with the judgment required to navigate uncertainty, competing opinions and change over time.</p>
          </div>
          <div className="how-bearing" aria-hidden="true">
            <svg viewBox="0 0 560 560" preserveAspectRatio="xMidYMid meet">
              <circle cx="280" cy="280" r="210" />
              <circle cx="280" cy="280" r="160" />
              <circle cx="280" cy="280" r="86" />
              <path d="M280 18V542M18 280H542M94 94L466 466M466 94L94 466" />
              <path className="how-bearing-arc" d="M83 366A210 210 0 0 1 436 139" />
              <circle className="how-bearing-point" cx="436" cy="139" r="8" />
              <circle className="how-bearing-center" cx="280" cy="280" r="11" />
            </svg>
          </div>
        </section>

        <section className="how-journey" id="journey" aria-labelledby="journey-title">
          <div className="how-journey-intro">
            <p className="how-eyebrow">The nine-part member journey</p>
            <h2 id="journey-title">A clearer route,<br /><em>held over time.</em></h2>
            <p>The four-part VCH Compass on the homepage expresses what membership is designed to achieve. This page shows how the medical office delivers that promise in practice, from understanding the person to recalibrating the strategy over time.</p>
          </div>
          <div className="how-steps">
            {journey.map((step, index) => (
              <div key={step.title}>
                <JourneyStep step={step} index={index} />
                {index === 2 && (
                  <figure className="how-interlude how-interlude-medical">
                    <img loading="lazy" src="/vch-approved/how-it-works/medical-folio.jpg" alt="Layered anatomical folios gathered into one considered view" />
                  </figure>
                )}
                {index === 5 && (
                  <figure className="how-interlude how-interlude-recalibration">
                    <img loading="lazy" src="/vch-approved/how-it-works/recalibration.jpg" alt="An open folio with a continuous measured line and a living branch" />
                  </figure>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="how-urgent" aria-labelledby="urgent-title">
          <span className="how-urgent-end" aria-hidden="true" />
          <div>
            <p className="how-eyebrow">A clear boundary</p>
            <h2 id="urgent-title">Urgent and<br /><em>emergency care</em></h2>
          </div>
          <p>VCH supports navigation and continuity but is not an emergency service. Members should use 999 or the nearest emergency department for emergencies in the United Kingdom, and the appropriate local emergency services when abroad. Where it is safe and appropriate, VCH can help preserve continuity before or after an urgent episode.</p>
        </section>

        <section className="how-close" aria-labelledby="close-title">
          <p className="how-eyebrow">A private conversation</p>
          <h2 id="close-title">A strategy begins<br /><em>with understanding.</em></h2>
          <a className="how-button" href={enquiryHref}>Enquire Privately</a>
        </section>
      </main>
      <footer className="how-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/how-it-works" aria-current="page">How it works</a><a href="/membership">Membership</a><a href={enquiryHref}>Enquire</a></nav>
      </footer>
    </div>
  )
}
