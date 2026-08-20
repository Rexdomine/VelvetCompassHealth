import SiteHeader from './components/SiteHeader.jsx'
import SupportingMedia from './components/SupportingMedia.jsx'
import TrajectoryMark from './components/TrajectoryMark.jsx'

const journey = [
  ['01', 'Understand', 'One doctor holds the full picture—your history, priorities and the context in which decisions are made.'],
  ['02', 'Organise', 'Investigations, records and specialist opinions are brought into one clear, considered structure.'],
  ['03', 'Coordinate', 'Care is directed across NHS and private settings, disciplines and institutions, around your precise needs.'],
  ['04', 'Remain alongside', 'The relationship continues through decisions, transitions and change, reducing the friction of starting again.'],
]

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <div className="section-intro">{children}</div> : null}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <picture className="hero-still">
          <source media="(max-width: 768px)" srcSet="/media/vch-living-compass-mobile.webp" />
          <img src="/media/vch-living-compass-desktop.webp" alt="" fetchPriority="high" />
        </picture>
        <video autoPlay muted loop playsInline preload="metadata" tabIndex="-1">
          <source media="(min-width: 769px) and (prefers-reduced-motion: no-preference)" src="/media/vch-living-compass-desktop.webm" type="video/webm" />
          <source media="(min-width: 769px) and (prefers-reduced-motion: no-preference)" src="/media/vch-living-compass-desktop.mp4" type="video/mp4" />
        </video>
        <div className="hero-wash" />
      </div>
      <div className="hero-content page-shell">
        <p className="eyebrow">A private medical office</p>
        <h1 id="hero-title">A life, understood <em>over time.</em></h1>
        <p className="hero-copy">One consistent doctor holds the complete health picture—bringing clarity, continuity and considered coordination to complex lives.</p>
        <div className="hero-actions">
          <a className="button" href="#how-it-works">Discover how VCH works</a>
          <a className="text-link" href="#contact">Begin a private conversation <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <a className="scroll-cue" href="#continuity" aria-label="Explore — continue to the continuity section"><span />Explore</a>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <Hero />

        <section className="continuity-section page-section" id="continuity">
          <div className="page-shell continuity-grid">
            <SectionHeading eyebrow="Continuity, by design" title={<>Your health is not a series of <em>separate moments.</em></>}>
              <p>Velvet Compass Health operates as a private medical office structured to maintain clarity across time, transitions and complexity.</p>
            </SectionHeading>
            <div className="continuity-copy">
              <p className="large-copy">Healthcare can become fragmented precisely when the full picture matters most.</p>
              <p>The office brings coherence to investigations, specialist opinions and care pathways—aligning them within one defined structure. Decisions are considered early, not retrospectively.</p>
              <p>Clarity over confusion. Proportion over excess. Direction over drift.</p>
            </div>
          </div>
          <TrajectoryMark />
        </section>

        <section className="journey-section page-section" id="how-it-works">
          <div className="page-shell">
            <SectionHeading eyebrow="The VCH relationship" title={<>One clear point of care, <em>through every chapter.</em></>}>
              <p>A personal doctor remains accountable for the longitudinal relationship while specialist depth is selected and coordinated around you.</p>
            </SectionHeading>
            <ol className="journey-grid">
              {journey.map(([number, title, copy]) => (
                <li key={title}>
                  <span className="journey-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="intelligence-section page-section" id="intelligence">
          <div className="page-shell intelligence-grid">
            <SupportingMedia
              className="health-intelligence-media"
              poster="/media/vch-health-intelligence.webp"
              webm="/media/vch-health-intelligence.webm"
              mp4="/media/vch-health-intelligence.mp4"
            />
            <SectionHeading eyebrow="Health intelligence" title={<>Information becomes useful when it is <em>understood.</em></>}>
              <p>Investigations are interpreted in context, not isolation. The office considers each data point as part of your broader health narrative, helping to distinguish what matters from what merely creates noise.</p>
              <p>This is doctor-led interpretation: thoughtful, proportionate and connected to decisions over time.</p>
              <a className="text-link" href="#contact">Discuss your circumstances <span aria-hidden="true">↗</span></a>
            </SectionHeading>
          </div>
        </section>

        <section className="international-section page-section" id="international">
          <div className="page-shell international-grid">
            <SectionHeading eyebrow="International coordination" title={<>One relationship, when life moves <em>across borders.</em></>}>
              <p>For internationally mobile individuals and families, VCH can help coordinate care across disciplines, institutions and countries while keeping one consistent clinical view.</p>
              <p>Support is needs-led and may sit across NHS and private settings, with specialists selected around the precise circumstances rather than a fixed directory.</p>
            </SectionHeading>
            <SupportingMedia
              className="international-continuity-media"
              poster="/media/vch-international-continuity.webp"
              webm="/media/vch-international-continuity.webm"
              mp4="/media/vch-international-continuity.mp4"
            />
          </div>
        </section>

        <section className="expertise-section page-section" id="expertise">
          <div className="page-shell">
            <div className="expertise-intro">
              <p className="eyebrow">Accountable clinical leadership</p>
              <p>VCH is an established private medical office with doctor-led accountability at the centre of each member relationship.</p>
            </div>
            <div className="expertise-pair">
              <article className="expertise-proposition">
                <p className="proposition-number" aria-hidden="true">01</p>
                <h2>Selected clinical <em>expertise.</em></h2>
                <p>Specialist depth is selected according to need and coordinated around the member. Respiratory medicine, pain medicine, cardiology and nutrition are examples within a wider network—not a fixed or complete directory.</p>
              </article>
              <article className="expertise-proposition">
                <p className="proposition-number" aria-hidden="true">02</p>
                <h2>Health as an <em>asset.</em></h2>
                <p>Ongoing clarity and continuity support proportionate health decisions over time for people whose complex lives require a considered, connected clinical view.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="invitation-section" id="contact">
          <div className="page-shell invitation-inner">
            <p className="eyebrow">A discreet invitation</p>
            <h2>Begin with a private conversation.</h2>
            <p>Membership is intentionally limited to preserve continuity and discretion. Share only the contact details and brief context you are comfortable sending by email; please do not include sensitive medical information.</p>
            <a className="button button-light" href="mailto:office@velvetcompasshealth.com?subject=Private%20membership%20enquiry">Enquire confidentially</a>
            <p className="email-note">office@velvetcompasshealth.com</p>
          </div>
        </section>

        <section className="safety-section" aria-label="Important medical boundaries">
          <div className="page-shell safety-grid">
            <h2>Important medical boundaries</h2>
            <p><strong>VCH is not an emergency service.</strong> If you have urgent symptoms or believe there is an emergency, call 999/112 or attend A&amp;E.</p>
            <p>VCH operates alongside your existing clinicians and does not replace your GP or specialist.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <a className="footer-brand" href="#top" aria-label="Velvet Compass Health, back to top"><img src="/logo-footer.webp" alt="Velvet Compass Health" width="280" height="90" loading="lazy" /></a>
          <nav aria-label="Footer navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#intelligence">Health intelligence</a>
            <a href="#international">International</a>
            <a href="#expertise">Expertise</a>
            <a href="#contact">Enquire</a>
            <a href="/memberarea">Member sign in</a>
          </nav>
          <div className="footer-meta">
            <address>23 Harley Street<br />London W1G 9QN</address>
            <p>© {new Date().getFullYear()} Velvet Compass Health.<br />All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
