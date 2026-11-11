import { useEffect } from 'react'
import MembershipNavItem from './features/site-navigation/MembershipNavItem.jsx'
import './features/international-care/international-care.css'
import './features/athletes/athletes.css'

const enquiryHref = '/enquire?type=Individual%20or%20family%20membership&focus=performance'

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

function AthletesHeader() {
  return (
    <header className="ic-header">
      <a className="ic-skip" href="#at-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => label === 'Membership'
          ? <MembershipNavItem key={label} current="athletes" />
          : <a key={label} href={href}>{label}</a>)}
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
            ? <MembershipNavItem key={label} mobile current="athletes" />
            : <a key={label} href={href}>{label}</a>)}
          <a href={enquiryHref}>Enquire</a>
        </nav>
      </details>
    </header>
  )
}

export default function AthletesPage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'Athletes — Velvet Compass Health'
    if (meta) meta.content = 'Personal medical oversight for athletes, from performance and recovery to health beyond sport.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="ic-page at-page">
      <AthletesHeader />
      <main id="at-main">
        <section className="at-hero" aria-labelledby="at-title">
          <div className="at-hero-copy">
            <p className="ic-eyebrow">Membership / Athletes</p>
            <h1 id="at-title">Protecting the player<br /><em>behind the game.</em></h1>
            <p>Personal medical oversight for athletes who want to perform now without losing sight of joint longevity, psychological wellbeing and the life that continues beyond sport.</p>
            <div className="ic-actions">
              <a className="ic-button" href={enquiryHref}>Discuss Athlete Membership</a>
            </div>
          </div>
          <figure className="at-hero-art">
            <img src="/vch-approved/athletes/football-preparation.jpg" alt="Footballer quietly fastening a boot beside his taped ankle before play" />
          </figure>
          <span className="at-hero-line" aria-hidden="true" />
        </section>

        <section className="at-career ic-flow" aria-labelledby="at-career-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="at-career-heading">
            <p className="ic-eyebrow">The longer view</p>
            <h2 id="at-career-title">The whole career,<br /><em>not only the next performance</em></h2>
          </div>
          <p>Elite sport is organised around the next match, selection and season. VCH keeps sight of the longer story: the injuries that accumulate, the recovery that changes, the identity behind performance and the health that must last beyond the game.</p>
          <svg className="at-pass-arc" viewBox="0 0 1100 170" preserveAspectRatio="none" aria-hidden="true"><path d="M0 143 C220 145 240 34 485 36 S790 164 1100 82" /></svg>
        </section>

        <section className="at-precision ic-flow" aria-labelledby="at-performance-title">
          <span className="ic-node" aria-hidden="true" />
          <figure className="at-polo-art">
            <img loading="lazy" src="/vch-approved/athletes/polo-preparation.jpg" alt="Polo athlete fastening a glove beside her mallet before play" />
          </figure>
          <div className="at-precision-copy">
            <div className="at-chapter">
              <p className="ic-eyebrow">Availability over time</p>
              <h2 id="at-performance-title">Performance that does not<br /><em>borrow from the future</em></h2>
              <p>VCH connects sleep, recovery, cardiovascular and metabolic health, nutrition, workload and wearable insight to build availability, resilience and a longer career.</p>
            </div>
            <div className="at-chapter" id="at-joints">
              <p className="ic-eyebrow">A coordinated strategy</p>
              <h2>Joint longevity<br /><em>and injury strategy</em></h2>
              <p>Sports medicine, physiotherapy, strength and conditioning, biomechanics, imaging, pain medicine and surgical opinion are brought around one strategy, with joint longevity at its centre.</p>
            </div>
          </div>
        </section>

        <section className="at-evidence ic-flow" aria-labelledby="at-evidence-title">
          <span className="ic-node" aria-hidden="true" />
          <p className="ic-eyebrow">Judgement before novelty</p>
          <div className="at-evidence-grid">
            <h2 id="at-evidence-title">Emerging and regenerative treatments,<br /><em>considered carefully</em></h2>
            <p>Orthobiologics, platelet-rich plasma and stem-cell treatments can sound like the future. VCH examines the evidence, regulation, provider quality and personal suitability, distinguishing genuine opportunity from noise.</p>
          </div>
        </section>

        <section className="at-person ic-flow" aria-labelledby="at-mind-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="at-person-intro">
            <p className="ic-eyebrow">The person beyond performance</p>
            <h2 id="at-mind-title">Mind, identity and<br /><em>confidential support</em></h2>
            <p>Behind performance sit pressure, injury, public scrutiny, relationships and identity. VCH coordinates discreet support across performance psychology, mental health, sleep, addiction and behavioural health.</p>
          </div>
          <figure className="at-person-art">
            <img loading="lazy" src="/vch-approved/athletes/identity-after-training.jpg" alt="Folded training jersey and worn football boots in an empty changing room" />
          </figure>
          <div className="at-nutrition" aria-labelledby="at-nutrition-title">
            <div>
              <p className="ic-eyebrow">A plan for real life</p>
              <h2 id="at-nutrition-title">Nutrition built around<br /><em>the athlete who exists</em></h2>
            </div>
            <p>A plan only works if the athlete can live with it. Nutrition and recovery support are shaped around training, travel, culture, faith, food preferences and real life.</p>
          </div>
        </section>

        <section className="at-continuity ic-flow" aria-labelledby="at-continuity-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="at-continuity-copy">
            <div>
              <p className="ic-eyebrow">A health story held together</p>
              <h2 id="at-continuity-title">Care across club, country<br /><em>and career stage</em></h2>
            </div>
            <p>Clubs change. Countries change. Careers change. VCH keeps the health story intact across teams, specialists and borders, so the athlete does not start again at every transition.</p>
          </div>
          <div className="at-continuity-route" aria-hidden="true">
            <svg viewBox="0 0 1000 130" preserveAspectRatio="none"><path d="M0 92 C170 92 195 28 345 37 S580 112 690 81 S845 36 1000 36" /><circle cx="110" cy="78" r="5" /><circle cx="505" cy="75" r="5" /><circle cx="900" cy="39" r="5" /></svg>
            <span>Club</span><span>Country</span><span>Career</span>
          </div>
        </section>

        <section className="at-beyond ic-flow" aria-labelledby="at-beyond-title">
          <span className="ic-node" aria-hidden="true" />
          <figure className="at-beyond-art"><img loading="lazy" src="/vch-approved/athletes/beyond-the-game.jpg" alt="An athlete sits in quiet reflection after training in a sunlit stone corridor" /></figure>
          <div className="at-beyond-copy">
            <p className="ic-eyebrow">Health beyond competition</p>
            <h2 id="at-beyond-title">Beyond<br /><em>the game</em></h2>
            <p>The strategy continues after competition, protecting cardiovascular health, cognition, mobility, fertility, hormonal health and identity. The career may be finite. The person is not.</p>
          </div>
        </section>

        <section className="at-close ic-flow" aria-labelledby="at-close-title">
          <span className="ic-end-node" aria-hidden="true" />
          <p className="ic-eyebrow">A private conversation</p>
          <h2 id="at-close-title">A longer view<br /><em>of the athlete.</em></h2>
          <a className="ic-button" href={enquiryHref}>Discuss Athlete Membership</a>
        </section>
      </main>
      <footer className="ic-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/membership">Membership</a><a href="/membership/athletes" aria-current="page">Athletes</a><a href="/how-it-works">How it works</a><a href="/clinical-network">Clinical Network</a><a href="/hotels">Hotels</a><a href="/enquire">Enquire</a></nav>
      </footer>
    </div>
  )
}
