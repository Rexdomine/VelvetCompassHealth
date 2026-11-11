import { useEffect } from 'react'
import MembershipNavItem from './features/site-navigation/MembershipNavItem.jsx'
import './features/international-care/international-care.css'
import './features/about-vch/about-vch.css'

const enquiryHref = '/enquire'

const navigation = [
  ['Home', '/'],
  ['Membership', '/membership'],
  ['How it works', '/how-it-works'],
  ['Health Intelligence', '/health-intelligence'],
  ['Clinical Network', '/clinical-network'],
  ['International Care', '/international-care'],
  ['Hotels', '/hotels'],
  ['About VCH', '/about-vch'],
]

function AboutHeader() {
  return (
    <header className="ic-header">
      <a className="ic-skip" href="#av-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => label === 'Membership'
          ? <MembershipNavItem key={label} />
          : <a key={label} href={href} aria-current={label === 'About VCH' ? 'page' : undefined}>{label}</a>)}
        <a className="ic-nav-enquire" href={enquiryHref}>Enquire</a>
      </nav>
      <details className="ic-mobile-nav" onKeyDown={(event) => {
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

export default function AboutPage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'About VCH — Velvet Compass Health'
    if (meta) meta.content = 'A private members’ medical office built around the long view, clinical direction and continuity over time.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="ic-page av-page">
      <AboutHeader />
      <main id="av-main">
        <section className="av-hero" aria-labelledby="av-title">
          <img className="av-hero-art" src="/vch-approved/about-vch/long-view-hero.webp" alt="A visitor studies layered observations and one measured trajectory in a luminous gallery" />
          <div className="av-hero-wash" aria-hidden="true" />
          <div className="av-hero-copy">
            <p className="ic-eyebrow">About Velvet Compass Health</p>
            <h1 id="av-title">A private members’<br />medical office<br /><em>built around the long view.</em></h1>
            <p>Velvet Compass Health was created to manage health as a living, changing whole: with one doctor responsible for strategy, continuity and direction across time.</p>
            <div className="ic-actions">
              <a className="ic-button" href="#av-office">Understand the Model</a>
              <a className="ic-text-link" href={enquiryHref}>Enquire Privately</a>
            </div>
          </div>
          <span className="av-hero-line" aria-hidden="true" />
        </section>

        <section className="av-long-view ic-flow" aria-labelledby="av-long-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="av-long-copy">
            <p className="ic-eyebrow">Accumulated observation</p>
            <h2 id="av-long-title">The long view<br /><em>changes everything</em></h2>
            <p>Health does not begin with a symptom and end with an appointment. VCH keeps sight of what is changing, what matters now and what could shape the years ahead, so every decision remains connected to the life the member wants to lead.</p>
          </div>
          <figure className="av-long-art">
            <img loading="lazy" src="/vch-approved/about-vch/workshop-observation.webp" alt="An older hand lifts layered vellum studies to reveal earlier measured observations" />
          </figure>
        </section>

        <section className="av-office ic-flow" id="av-office" aria-labelledby="av-office-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="av-office-title">
            <p className="ic-eyebrow">The model</p>
            <h2 id="av-office-title">A private members’ medical office, <em>not a collection of appointments</em></h2>
          </div>
          <p>VCH provides an ongoing relationship with a doctor who understands the member’s wider health picture. The role is to interpret information, coordinate appropriate expertise, maintain follow-up and help the member make deliberate decisions over time.</p>
        </section>

        <section className="av-leadership ic-flow" aria-label="VCH leadership">
          <span className="ic-node" aria-hidden="true" />
          <div className="av-people-grid">
            <article className="av-person av-person--director" aria-labelledby="av-director-title">
              <figure className="av-person-art">
                <img loading="lazy" src="/vch-approved/about-vch/dr-ehizele-portrait-nov-2026.jpg" alt="Portrait of Dr Ehizele Ijeoma Joseph-Ebare" />
              </figure>
              <div className="av-person-copy">
                <p className="ic-eyebrow">Medical direction</p>
                <h2 id="av-director-title">Dr Ehizele Ijeoma<br /><em>Joseph-Ebare</em></h2>
                <p className="av-person-role">Medical Director</p>
                <p>Dr Joseph-Ebare is a medical doctor with years of experience in emergency medicine. Her work spans NHS and private care. A Barts and The London graduate with a BSc in Global and Public Health, she completed business studies at Harvard University. A published researcher, invited UK Parliament speaker and former COVID Medicines Delivery Unit lead clinician, she is Country Director for Professionals for Humanity. Her “portfolio manager for health” philosophy protects health as a lifelong asset through personal strategy and continuity.</p>
              </div>
            </article>
            <article className="av-person av-person--adel" aria-labelledby="av-adel-title">
              <figure className="av-person-art">
                <img loading="lazy" src="/vch-approved/about-vch/adel-samat.jpg" alt="Portrait of Adel Samat" />
              </figure>
              <div className="av-person-copy">
                <p className="ic-eyebrow">East Asia clientele</p>
                <h2 id="av-adel-title">Adel<br /><em>Samat</em></h2>
                <p className="av-person-role">Head of East Asia Clientele</p>
                <p>Adel advises ultra-high-net-worth clients on luxury assets and international opportunities, with experience spanning exceptional property, confidential transactions and relationships with private wealth teams. He also holds a medical degree completed in China. At VCH, he brings an understanding of discretion, personal service and the cultural expectations of our East Asia clientele to the asset that matters most: health, leading relationships with our East Asia members and their families.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="av-expertise ic-flow" aria-labelledby="av-expertise-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="av-expertise-inner">
            <p className="ic-eyebrow">The wider medical office</p>
            <h2 id="av-expertise-title">Expertise<br /><em>without borders</em></h2>
            <div className="av-expertise-copy">
              <p>VCH draws on trusted clinicians and providers across specialties, bringing the right expertise into one coordinated strategy around the member.</p>
              <a className="ic-text-link" href="/clinical-network">Explore the Clinical Network</a>
            </div>
          </div>
          <div className="av-expertise-rule" aria-hidden="true" />
        </section>

        <section className="av-discretion ic-flow" aria-labelledby="av-discretion-title">
          <span className="ic-node" aria-hidden="true" />
          <div>
            <p className="ic-eyebrow">A considered relationship</p>
            <h2 id="av-discretion-title">Discretion and<br /><em>limited membership</em></h2>
          </div>
          <p>VCH is designed as a limited-membership medical office so that the relationship can remain personal, considered and responsive. Information is handled discreetly and shared only through appropriate, consent-based clinical processes or where the law requires otherwise.</p>
        </section>

        <section className="av-belief ic-flow" aria-labelledby="av-belief-title">
          <span className="ic-node" aria-hidden="true" />
          <p className="ic-eyebrow">The VCH belief</p>
          <h2 id="av-belief-title">The truest wealth is the ability to live a long, functional life <em>with direction.</em></h2>
          <p>Health is an asset, but it is also a portfolio that must be managed. Even when nothing feels wrong, the body is changing across time. VCH believes the truest wealth is the ability to live a long, functional life with direction: not simply waiting to see where health takes you, but understanding its trajectory and navigating it deliberately.</p>
          <a className="ic-button" href={enquiryHref}>Enquire Privately</a>
          <span className="av-end-node" aria-hidden="true" />
        </section>
      </main>
      <footer className="ic-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/how-it-works">How it works</a><a href="/health-intelligence">Health Intelligence</a><a href="/clinical-network">Clinical Network</a><a href="/international-care">International Care</a><a href="/about-vch" aria-current="page">About VCH</a><a href="/hotels">Hotels</a><a href={enquiryHref}>Enquire</a></nav>
      </footer>
    </div>
  )
}
