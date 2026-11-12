import { useEffect } from 'react'
import MembershipNavItem from './features/site-navigation/MembershipNavItem.jsx'
import './features/health-intelligence/health-intelligence.css'

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

const potentialSources = [
  ['Oura', 'Sleep, readiness, activity, stress and recovery patterns that may make subtle changes easier to see over time.'],
  ['WHOOP', 'Sleep, strain, recovery and physiological trends that can inform conversations about training, travel, workload and restoration.'],
  ['Apple Health', 'A member-controlled view of health, activity, cardiovascular, sleep and other information gathered from Apple devices and compatible apps.'],
]

const sourceMarks = [
  { name: 'Oura', image: '/vch-approved/health-intelligence/oura-logo-transparent.png', style: 'oura' },
  { name: 'WHOOP', image: '/vch-approved/health-intelligence/whoop-logo-transparent.png', style: 'whoop' },
  { name: 'Apple Health', image: '/vch-approved/health-intelligence/apple-logo.svg', style: 'apple' },
]

const domains = ['Sleep', 'Recovery', 'Cardiovascular health', 'Metabolism', 'Hormones', 'Mobility']

function HealthHeader() {
  return (
    <header className="hi-header">
      <a className="hi-skip" href="#hi-main">Skip to main content</a>
      <a className="hi-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="hi-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => label === 'Membership'
          ? <MembershipNavItem key={label} />
          : <a key={label} href={href} aria-current={label === 'Health Intelligence' ? 'page' : undefined}>{label}</a>)}
        <a className="hi-nav-enquire" href={enquiryHref}>Enquire</a>
      </nav>
      <details className="hi-mobile-nav" onKeyDown={(event) => {
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

export default function HealthIntelligencePage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'Health Intelligence — Velvet Compass Health'
    if (meta) meta.content = 'Medical interpretation of changing health signals over time, in the context of the whole person.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="hi-page">
      <HealthHeader />
      <main id="hi-main">
        <section className="hi-hero" aria-labelledby="hi-title">
          <img className="hi-hero-art" src="/vch-approved/health-intelligence/hero-study.jpg" alt="Translucent anatomical art with a fine gold trajectory on a luminous white field" />
          <div className="hi-hero-wash" aria-hidden="true" />
          <div className="hi-hero-copy">
            <p className="hi-eyebrow">Health intelligence</p>
            <h1 id="hi-title">Your body produces signals.<br /><em>Intelligence comes from knowing which ones matter.</em></h1>
            <p>VCH brings relevant clinical information, personal data and carefully selected advanced insight into one longitudinal view, interpreted by a doctor who understands the person behind it.</p>
            <div className="hi-actions">
              <a className="hi-button" href="#model">See the Model</a>
              <a className="hi-text-link" href="/membership">Discuss Membership</a>
            </div>
          </div>
        </section>

        <section className="hi-section hi-model" id="model" aria-labelledby="hi-model-title">
          <div className="hi-section-content">
            <p className="hi-eyebrow">Medical context</p>
            <h2 id="hi-model-title">From data<br /><em>to direction</em></h2>
            <p>Your health information lives across tests, appointments, reports and devices. VCH brings it together, follows what changes and turns it into a clearer next step.</p>
          </div>
          <div className="hi-model-study">
            <figure className="hi-model-image">
              <img loading="lazy" src="/vch-approved/health-intelligence/illustrative-display.jpg" alt="An unbranded desktop display with a restrained, fictional view of health trends over time" />
              <figcaption>Illustrative health data view</figcaption>
            </figure>
            <div className="hi-source-key" aria-label="Information sources considered in medical interpretation">
              <span>Clinical</span><span>Genomic</span><span>Member-entered</span><span>Device-generated</span>
            </div>
            <div className="hi-interpretation"><small>Medical interpretation</small><b>Direction</b></div>
          </div>
        </section>

        <section className="hi-section hi-signals" aria-labelledby="hi-signals-title">
          <div className="hi-signals-content">
            <p className="hi-eyebrow">Selected signals, with permission</p>
            <h2 id="hi-signals-title">Insights powered by Oura, WHOOP and Apple Health</h2>
            <p>With the member’s permission, VCH can bring selected wearable and health-platform data into the wider medical picture. The technology supplies the signals. VCH provides the medical context, interpretation and next steps.</p>
            <div className="hi-source-signatures" aria-label="Potential sources: Oura, WHOOP and Apple Health">
              {sourceMarks.map(({ name, image, style }) => <span className={`hi-source-signature hi-source-signature--${style}`} role="img" aria-label={`${name} logo`} key={name}>
                <img src={image} alt="" aria-hidden="true" />
                {style === 'apple' && <span>Apple Health</span>}
              </span>)}
            </div>
          </div>
          <figure className="hi-signals-art">
            <img loading="lazy" src="/vch-approved/health-intelligence/wearable-still-life-app.jpg" alt="An unbranded ring and recovery band beside a phone showing an illustrative health overview app on a sunlit stone table" />
          </figure>
          <div className="hi-source-panel" aria-label="Potential health data sources">
            <p className="hi-source-panel-label">Three sources, one medical picture</p>
            {potentialSources.map(([name, contribution]) => <div className="hi-source-item" key={name}>
              <div><h3>{name}</h3><p>{contribution}</p></div>
            </div>)}
          </div>
        </section>

        <section className="hi-section hi-women" aria-labelledby="hi-women-title">
          <div className="hi-section-content">
            <p className="hi-eyebrow">A wider picture</p>
            <h2 id="hi-women-title">A deeper<br /><em>women’s health layer</em></h2>
            <p>For women, Oova can add cycle, symptom and at-home hormone data to the wider health picture.</p>
          </div>
          <div className="hi-cycle-study" role="img" aria-label="Illustrative cycle of observations, without personal or clinical measurements">
            <span className="hi-cycle-orbit hi-cycle-orbit-one" /><span className="hi-cycle-orbit hi-cycle-orbit-two" /><span className="hi-cycle-orbit hi-cycle-orbit-three" />
            <span className="hi-cycle-point hi-cycle-point-one" /><span className="hi-cycle-point hi-cycle-point-two" /><span className="hi-cycle-point hi-cycle-point-three" />
            <span className="hi-cycle-center">Context<br />over time</span>
          </div>
        </section>

        <section className="hi-section hi-trends" aria-labelledby="hi-trends-title">
          <div className="hi-trends-intro">
            <p className="hi-eyebrow">Longitudinal view</p>
            <h2 id="hi-trends-title">See what is changing.<br /><em>Know what to do next.</em></h2>
            <p>Sleep. Recovery. Cardiovascular health. Metabolism. Hormones. Mobility. VCH follows the patterns that matter and turns change over time into earlier, more informed action.</p>
          </div>
          <figure className="hi-trends-art"><img loading="lazy" src="/vch-approved/health-intelligence/interpretation-conversation.jpg" alt="Two people considering a sparse illustrative health trend display in a warm gallery-like setting" /></figure>
          <div className="hi-domain-list" aria-label="Areas considered over time">
            {domains.map((domain) => <div className="hi-domain" key={domain}><span className="hi-domain-point" aria-hidden="true" /><span>{domain}</span></div>)}
          </div>
        </section>

        <section className="hi-section hi-biology" aria-labelledby="hi-biology-title">
          <figure className="hi-biology-art"><img loading="lazy" src="/vch-approved/health-intelligence/inheritance-dna-study.webp" alt="An archival drawing of a DNA strand above an open hand, with fine measured marks" /></figure>
          <div className="hi-biology-content">
            <p className="hi-eyebrow">Biology in context</p>
            <h2 id="hi-biology-title">Your biology,<br /><em>read in context</em></h2>
            <p>Genomics can reveal inherited tendencies before they become obvious. VCH interprets relevant findings alongside your history, environment and changing health, turning biological insight into more personal decisions about prevention, monitoring and care.</p>
          </div>
        </section>

        <section className="hi-section hi-medication" aria-labelledby="hi-medication-title">
          <div className="hi-medication-copy">
            <p className="hi-eyebrow">Pharmacogenomics</p>
            <h2 id="hi-medication-title">Medication,<br /><em>more personal</em></h2>
            <p>Pharmacogenomics can show how genetic variation may affect your response to certain medicines, helping inform choice, dose and tolerability. More precise prescribing, guided by your biology.</p>
          </div>
          <div className="hi-medication-drawing" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        </section>

        <section className="hi-section hi-longevity" aria-labelledby="hi-longevity-title">
          <p className="hi-eyebrow">The longer view</p>
          <h2 id="hi-longevity-title">Live longer.<br /><em>Function better.</em></h2>
          <p>Longevity means more than added years. VCH focuses on protecting cognition, mobility, cardiovascular and metabolic health, independence and quality of life.</p>
        </section>

        <section className="hi-section hi-decision" aria-labelledby="hi-decision-title">
          <span className="hi-line-end" aria-hidden="true" />
          <p className="hi-eyebrow">The physician’s judgment</p>
          <h2 id="hi-decision-title">Technology informs.<br /><em>Medicine decides.</em></h2>
          <p>Wearable data becomes more useful when it is interpreted alongside symptoms, clinical information and the wider health picture.</p>
          <a className="hi-button" href="/membership">Discuss Membership</a>
        </section>
      </main>
      <footer className="hi-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/how-it-works">How it works</a><a href="/health-intelligence" aria-current="page">Health Intelligence</a><a href="/hotels">Hotels</a><a href={enquiryHref}>Enquire</a></nav>
      </footer>
    </div>
  )
}
