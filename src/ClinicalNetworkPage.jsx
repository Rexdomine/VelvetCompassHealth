import { useEffect } from 'react'
import MembershipNavItem from './features/site-navigation/MembershipNavItem.jsx'
import './features/clinical-network/clinical-network.css'

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

const expertise = [
  { name: 'Professor Ertan Saridogan', specialty: 'Gynaecological surgery', detail: 'President, European Society for Gynaecological Endoscopy', portrait: 'ertan-saridogan' },
  { name: 'Dr Ernie Wong', specialty: 'Respiratory medicine', detail: 'Clinical Lead for Asthma, London Clinical Respiratory Network', portrait: 'ernie-wong' },
  { name: 'Professor David Gartry', specialty: 'Ophthalmic surgery', detail: 'Moorfields · UK laser-eye pioneer · Tatler Good Doctors Guide', portrait: 'david-gartry' },
  { name: 'Dr Arun Bhaskar', specialty: 'Pain medicine', detail: 'Immediate Past President, British Pain Society', portrait: 'arun-bhaskar' },
  { name: 'Dr Mark Ridgewell', specialty: 'Sport and exercise medicine', detail: 'Former England cricket doctor · English National Ballet School · rugby', portrait: 'mark-ridgewell' },
  { name: 'Dr Haytham Salem', specialty: 'Musculoskeletal & longevity medicine', detail: 'Premier League football · Everton FC and Burnley FC', portrait: 'haytham-salem' },
  { name: 'Dr Francesco Lo Monaco', specialty: 'Cardiology', detail: 'Founder, The National Heart Clinic', portrait: 'francesco-lo-monaco' },
  { name: 'Ranjan Suri', specialty: 'Paediatric respiratory medicine', detail: 'Great Ormond Street Hospital · Honorary Associate Professor, UCL', portrait: 'ranjan-suri' },
  { name: 'Dr Joseph Nunoo-Mensah', specialty: 'Colorectal & robotic surgery', detail: 'Cleveland Clinic London · Head of Colorectal Surgery, King’s College Hospital', portrait: 'joseph-nunoo-mensah' },
]

function ClinicalHeader() {
  return (
    <header className="cn-header">
      <a className="cn-skip" href="#cn-main">Skip to main content</a>
      <a className="cn-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="cn-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => label === 'Membership'
          ? <MembershipNavItem key={label} />
          : <a key={label} href={href} aria-current={label === 'Clinical Network' ? 'page' : undefined}>{label}</a>)}
        <a className="cn-nav-enquire" href={enquiryHref}>Enquire</a>
      </nav>
      <details className="cn-mobile-nav" onKeyDown={(event) => {
        if (event.key === 'Escape') event.currentTarget.open = false
      }}>
        <summary aria-label="Navigation menu"><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if (event.target.closest('a')) event.currentTarget.parentElement.open = false
        }}>
          {navigation.map(([label, href]) => label === 'Membership'
            ? <MembershipNavItem key={label} mobile />
            : <a key={label} href={href}>{label}</a>)}
          <a href={enquiryHref}>Enquire</a>
        </nav>
      </details>
    </header>
  )
}

export default function ClinicalNetworkPage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'Clinical Network — Velvet Compass Health'
    if (meta) meta.content = 'Selected clinical expertise integrated into one coherent health strategy at Velvet Compass Health.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="cn-page">
      <ClinicalHeader />
      <main id="cn-main">
        <section className="cn-hero" aria-labelledby="cn-title">
          <img className="cn-hero-art" src="/vch-approved/clinical-network/network-gallery-v2.webp" alt="A person standing at the centre of a luminous gallery of distinct abstract artworks" />
          <div className="cn-hero-wash" aria-hidden="true" />
          <div className="cn-hero-copy">
            <p className="cn-eyebrow">The clinical network</p>
            <h1 id="cn-title">World-class expertise,<br /><em>centred around you.</em></h1>
            <p>VCH brings selected clinicians into the member’s care, connects specialist insight and builds every opinion into one coherent health strategy.</p>
            <div className="cn-actions">
              <a className="cn-button" href="#areas">Explore Areas of Expertise</a>
              <a className="cn-text-link" href={enquiryHref}>Enquire Privately</a>
            </div>
          </div>
          <span className="cn-hero-line" aria-hidden="true" />
        </section>

        <section className="cn-intro cn-flow" aria-labelledby="cn-intro-title">
          <span className="cn-flow-node" aria-hidden="true" />
          <p className="cn-eyebrow">One considered view</p>
          <h2 id="cn-intro-title">Exceptional expertise.<br /><em>One coordinated strategy.</em></h2>
          <p>From preventive cardiology and reproductive medicine to complex pain, respiratory health, ophthalmology and musculoskeletal longevity, VCH brings the right expertise around the member at the right time.</p>
        </section>

        <section className="cn-atlas cn-flow" aria-label="The wider clinical picture">
          <div className="cn-atlas-copy">
            <span className="cn-atlas-rule" aria-hidden="true" />
            <p>The wider picture</p>
            <strong>Distinct expertise.<br />Held together.</strong>
          </div>
          <figure>
            <img loading="lazy" src="/vch-approved/clinical-network/bound-perspectives-v2.webp" alt="Distinct handmade folio leaves gathered into one refined brass binding" />
          </figure>
        </section>

        <section className="cn-roster cn-flow" id="areas" aria-labelledby="cn-areas-title">
          <div className="cn-roster-heading">
            <div>
              <p className="cn-eyebrow">A selection from our clinical network</p>
              <h2 id="cn-areas-title">Areas of <em>expertise</em></h2>
            </div>
            <p>Some of the specialist depth available through your medical office.</p>
          </div>
          <div className="cn-profile-grid">
            {expertise.map(({ name, specialty, detail, portrait }) => (
              <article className="cn-profile" key={name}>
                <img className="cn-profile-portrait" src={`/vch-approved/clinical-network/portraits/${portrait}.webp`} alt={`Portrait of ${name}`} loading="lazy" width="480" height="480" />
                <div className="cn-profile-copy">
                  <h3>{name}</h3>
                  <p className="cn-profile-area">{specialty}</p>
                  <p className="cn-profile-detail">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cn-close cn-flow" aria-labelledby="cn-close-title">
          <span className="cn-end-node" aria-hidden="true" />
          <p className="cn-eyebrow">A private conversation</p>
          <h2 id="cn-close-title">The right expertise,<br /><em>in the right context.</em></h2>
          <p>VCH brings selected clinicians into the member’s care, connects specialist insight and builds every opinion into one coherent health strategy.</p>
          <a className="cn-button" href={enquiryHref}>Enquire Privately</a>
        </section>
      </main>
      <footer className="cn-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/how-it-works">How it works</a><a href="/health-intelligence">Health Intelligence</a><a href="/clinical-network" aria-current="page">Clinical Network</a><a href={enquiryHref}>Enquire</a></nav>
      </footer>
    </div>
  )
}
