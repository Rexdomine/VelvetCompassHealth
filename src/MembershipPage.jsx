import { useEffect } from 'react'
import './features/international-care/international-care.css'
import './features/membership/membership.css'

const enquiryHref = '/enquire?type=Individual%20or%20family%20membership'

const navigation = [
  ['Home', '/'],
  ['Membership', '/membership'],
  ['How it works', '/how-it-works'],
  ['Health Intelligence', '/health-intelligence'],
  ['Clinical Network', '/clinical-network'],
  ['International Care', '/international-care'],
  ['About VCH', '/about-vch'],
]

const foundation = [
  'A designated physician who understands the member’s baseline, priorities and wider health picture over time.',
  'A personal strategy for prevention, longevity and health intelligence, shaped around risk, function and the life the member wants to protect.',
  'Coordination of appropriate specialists, investigations, second opinions and follow-up across providers, hospitals and countries.',
  'Discreet, practical support that respects the member’s culture, preferences and daily life, including nutrition, movement, sleep and recovery where relevant.',
]

const comparison = [
  ['Who holds the whole picture?', 'Continuity depends on the practice and appointment', 'No clinician is responsible for the health story', 'A designated physician, supported by the medical office'],
  ['What happens while you are well?', 'Routine, age-appropriate prevention', 'Benefits depend on the policy', 'Risk, function and direction are actively reviewed'],
  ['Who finds specialists and closes the loop?', 'Refers when clinically appropriate', 'May authorise access under policy terms', 'Identifies, briefs, coordinates and follows through'],
  ['Who tracks change across years?', 'Records may provide continuity', 'Not the insurer’s clinical role', 'VCH interprets change against a longitudinal baseline'],
  ['Who coordinates across borders?', 'Usually operates within the local system', 'Cover depends on territory and policy', 'VCH preserves context with appropriately licensed local clinicians'],
  ['Best understood as', 'Primary care', 'Funding eligible care', 'Medical stewardship'],
]

const tiers = [
  {
    name: 'Gold',
    for: 'Individuals and families seeking a trusted medical anchor and a structured preventive foundation.',
    difference: 'Longitudinal oversight, health strategy, regular checkpoints and coordination when needs arise.',
    access: 'Within 48 hours',
  },
  {
    name: 'Executive',
    for: 'Members with demanding schedules, more active health goals or several moving parts to manage.',
    difference: 'Everything in Gold, with a more proactive review rhythm, enhanced coordination and advanced longevity and preventive input.',
    access: 'Within 24 hours',
  },
  {
    name: 'Medical Director’s Office',
    for: 'Individuals and families requiring the highest level of direct oversight, discretion and international coordination.',
    difference: 'Everything in Executive, with a dedicated personal doctor, direct access and a bespoke scope shaped around the member’s life.',
    access: 'Direct access',
  },
]

const serviceRows = [
  ['Longitudinal physician oversight', 'Included', 'Included', 'Dedicated personal doctor'],
  ['Personal health strategy', 'Structured annual strategy', 'More active preventive strategy', 'Bespoke senior-led strategy'],
  ['Health checkpoints', 'Quarterly', 'Ongoing', 'Ongoing and bespoke'],
  ['Clinical access target', 'Within 48 hours', 'Within 24 hours', 'Direct access'],
  ['24/7 GP telemedicine pathway', 'Included', 'Included', 'Included'],
  ['Specialist and second-opinion coordination', 'Core coordination', 'Enhanced coordination', 'Highest-touch coordination'],
  ['International care coordination', 'Included', 'Enhanced', 'Bespoke global oversight'],
  ['Pharmacogenomic review', 'Not included as standard', 'Included where appropriate', 'Included where appropriate'],
  ['Cognitive performance assessment', 'Not included as standard', 'Included', 'Included'],
  ['Medical evacuation and repatriation coordination', 'Not included as standard', 'Not included as standard', 'Included where required'],
  ['Event or medical travel presence', 'Separately commissioned', 'Separately commissioned', 'Available within bespoke scope'],
]

function MembershipHeader() {
  return (
    <header className="ic-header">
      <a className="ic-skip" href="#mb-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <a key={label} href={href} aria-current={label === 'Membership' ? 'page' : undefined}>{label}</a>
        ))}
        <a className="ic-nav-enquire" href={enquiryHref}>Enquire</a>
      </nav>
      <details className="ic-mobile-nav" onKeyDown={(event) => {
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

function ComparisonTable({ rows, headings, caption, className = '' }) {
  return (
    <>
    <p className="mb-scroll-cue">Swipe across to compare all columns</p>
    <div className="mb-table-scroll" role="region" aria-label={caption} tabIndex="0">
      <table className={className}>
        <caption className="sr-only">{caption}</caption>
        <thead><tr>{headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
        <tbody>{rows.map(([label, ...values]) => (
          <tr key={label}><th scope="row">{label}</th>{values.map((value, index) => <td key={index}>{value}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
    </>
  )
}

export default function MembershipPage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'Membership — Velvet Compass Health'
    if (meta) meta.content = 'Explore VCH membership: designated physician oversight, a personal health strategy and three levels of coordinated care.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="ic-page mb-page">
      <MembershipHeader />
      <main id="mb-main">
        <section className="mb-hero" aria-labelledby="mb-title">
          <div className="mb-hero-copy">
            <p className="ic-eyebrow">Membership at Velvet Compass Health</p>
            <h1 id="mb-title">Your health is your most important asset.<br /><em>It deserves active management.</em></h1>
            <p>Modern wealth is having the health, time and capacity to enjoy what you have built. VCH protects the person behind the wealth, the achievement and the life still being created.</p>
            <div className="ic-actions">
              <a className="ic-button" href="#mb-tiers">Compare Memberships</a>
              <a className="ic-text-link" href={enquiryHref}>Arrange a Suitability Conversation</a>
            </div>
          </div>
          <div className="mb-hero-study" aria-hidden="true"><span /><span /><span /></div>
          <span className="mb-hero-line" aria-hidden="true" />
        </section>

        <section className="mb-stewardship ic-flow" aria-labelledby="mb-stewardship-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="mb-stewardship-intro">
            <p className="ic-eyebrow">The person behind the portfolio</p>
            <h2 id="mb-stewardship-title">Protect the person behind <em>everything you are building</em></h2>
            <p>VCH brings the discipline of active stewardship to health. Your designated physician understands the whole portfolio, watches the moving parts, brings in specialist expertise and adjusts the strategy as conditions change—with the wider medical office behind them.</p>
          </div>
          <figure className="mb-stewardship-art">
            <img loading="lazy" src="/vch-approved/membership/stewardship-life-v2.jpg" alt="A member walks through a sunlit stone colonnade beside a garden" />
          </figure>
          <div className="mb-why">
            <div className="mb-why-heading">
              <p className="ic-eyebrow">Continuity over time</p>
              <h3>Why membership exists</h3>
            </div>
            <div className="mb-why-copy">
              <p>Wealth becomes complex enough to require active management long before it is in crisis. Health is no different. Even when you feel well, the portfolio is moving: cardiovascular risk, metabolic health, sleep, cognition, hormones, mobility, recovery and family history continue to change.</p>
              <p>A series of excellent appointments cannot, by itself, provide stewardship. VCH provides the person who remains responsible for noticing patterns, asking what is missing, deciding what deserves attention and keeping the plan moving.</p>
            </div>
          </div>
        </section>

        <section className="mb-foundation ic-flow" aria-labelledby="mb-foundation-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="mb-section-intro">
            <p className="ic-eyebrow">One medical office</p>
            <h2 id="mb-foundation-title">The shared VCH <em>foundation</em></h2>
          </div>
          <ol className="mb-foundation-list">
            {foundation.map((item, index) => <li key={item}><span aria-hidden="true">0{index + 1}</span><p>{item}</p></li>)}
          </ol>
        </section>

        <section className="mb-comparison ic-flow" aria-labelledby="mb-comparison-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="mb-section-intro">
            <p className="ic-eyebrow">A different kind of responsibility</p>
            <h2 id="mb-comparison-title">Beyond access. <em>Ongoing oversight.</em></h2>
          </div>
          <ComparisonTable
            caption="How standard GP care, private medical insurance and VCH membership differ"
            headings={['Question', 'Standard GP', 'Private medical insurance', 'VCH membership']}
            rows={comparison}
            className="mb-comparison-table"
          />
        </section>

        <section className="mb-tiers ic-flow" id="mb-tiers" aria-labelledby="mb-tiers-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="mb-section-intro">
            <p className="ic-eyebrow">Three levels of medical stewardship</p>
            <h2 id="mb-tiers-title">Membership <em>at a glance</em></h2>
          </div>
          <p className="mb-scroll-cue">Swipe across to compare all columns</p>
          <div className="mb-table-scroll mb-glance-table" role="region" aria-label="Membership at a glance table" tabIndex="0">
            <table>
              <caption className="sr-only">Membership at a glance</caption>
              <thead><tr><th scope="col">Membership</th><th scope="col">Designed for</th><th scope="col">Meaningful difference</th><th scope="col">Clinical access</th></tr></thead>
              <tbody>{tiers.map((tier) => <tr key={tier.name}><th scope="row">{tier.name}</th><td>{tier.for}</td><td>{tier.difference}</td><td>{tier.access}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="mb-matrix ic-flow" aria-labelledby="mb-matrix-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="mb-section-intro">
            <p className="ic-eyebrow">The detailed comparison</p>
            <h2 id="mb-matrix-title">Meaningful differences <em>between membership levels</em></h2>
          </div>
          <ComparisonTable
            caption="Service dimensions by membership level"
            headings={['Service dimension', 'Gold', 'Executive', 'Medical Director’s Office']}
            rows={serviceRows}
            className="mb-service-table"
          />
        </section>

        <section className="mb-future ic-flow" aria-labelledby="mb-future-title">
          <span className="ic-node" aria-hidden="true" />
          <div>
            <p className="ic-eyebrow">Healthspan over time</p>
            <h2 id="mb-future-title">The future of your health, <em>brought into view</em></h2>
          </div>
          <p>VCH combines established medicine with relevant advances in diagnostics, genomics, pharmacogenomics, wearables and longevity science. We focus on what can improve decisions now and protect healthspan over time.</p>
        </section>

        <section className="mb-intervention ic-flow" aria-labelledby="mb-intervention-title">
          <span className="ic-node" aria-hidden="true" />
          <figure className="mb-still-life">
            <img loading="lazy" src="/vch-approved/membership/proportionate-care-still-life.jpg" alt="Fresh produce, herbs, linen and water arranged in natural light" />
          </figure>
          <div className="mb-intervention-copy">
            <p className="ic-eyebrow">Medicine in proportion</p>
            <h2 id="mb-intervention-title">The right intervention, <em>not the most intervention</em></h2>
            <p>VCH does not confuse more medicine with better medicine. Some members want the most comprehensive route available. Others want the lightest effective intervention. The strategy should reflect the person, the evidence and the level of risk, not a fixed longevity formula.</p>
            <p>Where clinically appropriate, the first plan may centre on culturally relevant nutrition, physiotherapy, movement, sleep, recovery, watchful review or the least invasive treatment option. If surgery, medication or more intensive care is needed, VCH helps the member understand why and coordinates the right route.</p>
            <p>This is medicine in proportion: personal enough to respect how the member wants to live, and medically responsible enough to know when a more decisive intervention is necessary.</p>
          </div>
        </section>

        <section className="mb-fit ic-flow" aria-labelledby="mb-fit-title">
          <span className="ic-node" aria-hidden="true" />
          <p className="ic-eyebrow">A private conversation</p>
          <h2 id="mb-fit-title">A <em>considered fit</em></h2>
          <p>VCH intentionally works with a limited number of members so that the medical relationship remains personal and responsive. A suitability conversation considers what the member wants to protect, the level of oversight required and whether VCH is the right model.</p>
          <a className="ic-button" href={enquiryHref}>Arrange a Suitability Conversation</a>
        </section>

        <section className="mb-paths ic-flow" aria-label="Membership paths">
          <span className="ic-node" aria-hidden="true" />
          <div className="mb-paths-intro">
            <p className="ic-eyebrow">Further paths</p>
            <h2>Care shaped around <em>the life ahead</em></h2>
          </div>
          <article id="athletes">
            <p className="ic-eyebrow">Athletes</p>
            <h3>Protecting the player <em>behind the game.</em></h3>
            <p>VCH offers personal medical oversight beyond immediate performance, connecting recovery, joint longevity, specialist care, psychological wellbeing and life after sport.</p>
            <details className="mb-path-detail">
              <summary className="ic-text-link">Explore Athletes</summary>
              <p>Elite sport is organised around the next match, selection and season. VCH keeps sight of the longer story: the injuries that accumulate, the recovery that changes, the identity behind performance and the health that must last beyond the game.</p>
              <a className="ic-text-link" href="/enquire?type=Individual%20or%20family%20membership&focus=performance">Discuss Athlete Membership</a>
            </details>
          </article>
          <article id="international-students">
            <p className="ic-eyebrow">International Students</p>
            <h3>Assurance, <em>not just insurance.</em></h3>
            <p>Doctor-led support for students abroad, giving parents confidence that trusted medical guidance is always within reach.</p>
            <details className="mb-path-detail">
              <summary className="ic-text-link">Explore International Students</summary>
              <p>Insurance may help meet the cost of eligible care. VCH gives your child a doctor who understands their history, knows how UK healthcare works and can guide what happens next throughout the academic year.</p>
              <a className="ic-text-link" href="/enquire?type=International%20Students">Enquire for a Student</a>
            </details>
          </article>
        </section>
      </main>
      <footer className="ic-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/membership" aria-current="page">Membership</a><a href="/how-it-works">How it works</a><a href="/health-intelligence">Health Intelligence</a><a href="/clinical-network">Clinical Network</a><a href="/international-care">International Care</a><a href="/about-vch">About VCH</a><a href={enquiryHref}>Enquire</a></nav>
      </footer>
    </div>
  )
}
