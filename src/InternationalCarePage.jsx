import { useEffect } from 'react'
import './features/international-care/international-care.css'

const privateEnquiryHref = '/enquire'
const internationalEnquiryHref = '/enquire'

const navigation = [
  ['Home', '/'],
  ['Membership', '/membership'],
  ['How it works', '/how-it-works'],
  ['Health Intelligence', '/health-intelligence'],
  ['Clinical Network', '/clinical-network'],
  ['International Care', '/international-care'],
  ['About VCH', '/about-vch'],
]

const careMoments = [
  {
    phase: 'Prepare',
    heading: 'Before care in another location',
    copy: 'Where appropriate, VCH can help clarify the purpose of the consultation or investigation, identify relevant records, prepare a concise clinical summary and support navigation towards an appropriate clinician or institution.',
  },
  {
    phase: 'Care delivered locally',
    heading: 'During the episode of care',
    copy: 'Diagnosis, prescribing, treatment and local clinical responsibility remain with appropriately licensed professionals in the country where care is delivered. VCH may support communication and continuity, but does not replace local medical assessment or local regulatory requirements.',
  },
  {
    phase: 'Continue',
    heading: 'After the appointment or treatment',
    copy: 'VCH can help the member understand the outcome, gather relevant reports, identify unresolved questions and coordinate appropriate follow-up with clinicians in the United Kingdom or another location.',
  },
]

function InternationalHeader() {
  return (
    <header className="ic-header">
      <a className="ic-skip" href="#ic-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <a key={label} href={href} aria-current={label === 'International Care' ? 'page' : undefined}>{label}</a>
        ))}
        <a className="ic-nav-enquire" href={privateEnquiryHref}>Enquire</a>
      </nav>
      <details className="ic-mobile-nav" onKeyDown={(event) => {
        if (event.key === 'Escape') event.currentTarget.open = false
      }}>
        <summary aria-label="Navigation menu"><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if (event.target.closest('a')) event.currentTarget.parentElement.open = false
        }}>
          {navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a href={privateEnquiryHref}>Enquire</a>
        </nav>
      </details>
    </header>
  )
}

export default function InternationalCarePage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'International Care — Velvet Compass Health'
    if (meta) meta.content = 'Medical continuity across locations, with care delivered by appropriately licensed clinicians in each jurisdiction.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="ic-page">
      <InternationalHeader />
      <main id="ic-main">
        <section className="ic-hero" aria-labelledby="ic-title">
          <img className="ic-hero-art" src="/vch-approved/international-care/portolan-gallery-v2.webp" alt="Portolan construction, longitude marks and one continuous route across translucent navigation sheets" />
          <div className="ic-hero-wash" aria-hidden="true" />
          <div className="ic-hero-copy">
            <p className="ic-eyebrow">International care</p>
            <h1 id="ic-title">One life.<br /><em>Many systems.</em><br />One coherent health story.</h1>
            <p>VCH helps members preserve medical context across locations, institutions and countries while care is delivered by appropriately licensed clinicians in each jurisdiction.</p>
            <div className="ic-actions">
              <a className="ic-button" href={internationalEnquiryHref}>Discuss International Care</a>
              <a className="ic-text-link" href={privateEnquiryHref}>Enquire Privately</a>
            </div>
          </div>
          <span className="ic-hero-line" aria-hidden="true" />
        </section>

        <section className="ic-continuity ic-flow" aria-labelledby="ic-continuity-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="ic-continuity-copy">
            <p className="ic-eyebrow">One continuous story</p>
            <h2 id="ic-continuity-title">Continuity<br /><em>across locations</em></h2>
            <p>Moving between countries can divide a health story into separate records, opinions and systems. VCH helps preserve context by organising relevant information, clarifying the question being asked and maintaining follow-up when care continues elsewhere.</p>
          </div>
          <figure className="ic-continuity-art">
            <img loading="lazy" src="/vch-approved/international-care/continuity-digital-folio-v3.webp" alt="An unbranded digital timeline brings distinct abstract record views together over an archival folio" />
          </figure>
        </section>

        <section className="ic-journey ic-flow" aria-labelledby="ic-journey-title">
          <div className="ic-journey-intro">
            <p className="ic-eyebrow">Care, connected</p>
            <h2 id="ic-journey-title">A clear thread<br /><em>through each moment.</em></h2>
          </div>
          <div className="ic-moments">
            {careMoments.map(({ phase, heading, copy }) => (
              <article className="ic-moment" key={heading}>
                <span className="ic-moment-node" aria-hidden="true" />
                <div className="ic-moment-title"><p className="ic-eyebrow">{phase}</p><h3>{heading}</h3></div>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ic-destinations ic-flow" aria-labelledby="ic-destinations-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="ic-destinations-inner">
            <p className="ic-eyebrow">A considered next step</p>
            <h2 id="ic-destinations-title">Care<br /><em>destinations</em></h2>
            <p>Depending on clinical need, acceptance, availability and access requirements, VCH may help members navigate care at suitable institutions. Naming an institution as a possible destination does not mean that it is a VCH partner, guarantees access or endorses VCH.</p>
          </div>
          <div className="ic-destinations-study" aria-hidden="true"><span /><span /><span /></div>
        </section>

        <section className="ic-close ic-flow" aria-labelledby="ic-close-title">
          <span className="ic-end-node" aria-hidden="true" />
          <p className="ic-eyebrow">A private conversation</p>
          <h2 id="ic-close-title">Keep the whole picture<br /><em>in view.</em></h2>
          <p>VCH helps members preserve medical context across locations, institutions and countries while care is delivered by appropriately licensed clinicians in each jurisdiction.</p>
          <a className="ic-button" href={internationalEnquiryHref}>Discuss International Care</a>
        </section>
      </main>
      <footer className="ic-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/how-it-works">How it works</a><a href="/health-intelligence">Health Intelligence</a><a href="/clinical-network">Clinical Network</a><a href="/international-care" aria-current="page">International Care</a><a href={privateEnquiryHref}>Enquire</a></nav>
      </footer>
    </div>
  )
}
