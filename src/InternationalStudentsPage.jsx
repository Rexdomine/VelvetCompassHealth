import { useEffect } from 'react'
import MembershipNavItem from './features/site-navigation/MembershipNavItem.jsx'
import './features/international-care/international-care.css'
import './features/international-students/international-students.css'

const studentEnquiryHref = '/enquire?type=International%20Students'

const navigation = [
  ['Home', '/'],
  ['Membership', '/membership'],
  ['How it works', '/how-it-works'],
  ['Health Intelligence', '/health-intelligence'],
  ['Clinical Network', '/clinical-network'],
  ['International Care', '/international-care'],
  ['About VCH', '/about-vch'],
]

const supportAreas = [
  'An initial review of relevant medical history, current needs and important ongoing care.',
  'Guidance on the appropriate part of the UK healthcare system to use.',
  'Clinical triage and support in identifying the appropriate next step.',
  'Coordination of specialist care, investigations and follow-up where required.',
  'Help maintaining continuity between existing clinicians at home and care in the United Kingdom, where appropriate.',
  'Support with medical records, appropriate documentation and prescription pathways.',
  'A consistent medical point of contact across the academic year.',
  'A clear family communication plan from the outset.',
]

const moments = [
  {
    heading: 'When the student is well',
    copy: 'The relationship begins before anything goes wrong. VCH understands the student’s history, medication, ongoing care and local arrangements from the outset.',
  },
  {
    heading: 'When something changes',
    copy: 'The student has a doctor-led point of contact who can understand the concern, place it in context and guide the appropriate route. The aim is to replace late-night uncertainty and fragmented searching with a clear next step.',
  },
  {
    heading: 'When care becomes more complex',
    copy: 'If specialist review, investigation, hospital care or communication with an existing clinician at home is required, VCH helps connect the parts and maintain follow-up.',
  },
]

function InternationalStudentsHeader() {
  return (
    <header className="ic-header">
      <a className="ic-skip" href="#st-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => label === 'Membership'
          ? <MembershipNavItem key={label} current="international-students" />
          : <a key={label} href={href}>{label}</a>)}
        <a className="ic-nav-enquire" href={studentEnquiryHref}>Enquire</a>
      </nav>
      <details className="ic-mobile-nav" onKeyDown={(event) => {
        if (event.key === 'Escape') event.currentTarget.open = false
      }}>
        <summary aria-label="Navigation menu"><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if (event.target.closest('a')) event.currentTarget.parentElement.open = false
        }}>
          {navigation.map(([label, href]) => label === 'Membership'
            ? <MembershipNavItem key={label} mobile current="international-students" />
            : <a key={label} href={href}>{label}</a>)}
          <a href={studentEnquiryHref}>Enquire</a>
        </nav>
      </details>
    </header>
  )
}

export default function InternationalStudentsPage() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'International Students — Velvet Compass Health'
    if (meta) meta.content = 'Doctor-led support for students abroad, with guidance through UK healthcare and continuity with home.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="ic-page st-page">
      <InternationalStudentsHeader />
      <main id="st-main">
        <section className="st-hero" aria-labelledby="st-title">
          <div className="st-hero-copy">
            <p className="ic-eyebrow">Membership / International Students</p>
            <h1 id="st-title">Assurance,<br /><em>not just insurance.</em></h1>
            <p>Doctor-led support for students abroad, giving parents confidence that their child has trusted medical guidance and a clear route through UK healthcare.</p>
            <div className="ic-actions">
              <a className="ic-button" href={studentEnquiryHref}>Enquire for a Student</a>
              <a className="ic-text-link" href={studentEnquiryHref}>Speak to VCH</a>
            </div>
          </div>
          <figure className="st-hero-art">
            <img src="/vch-approved/international-students/arrival-threshold.jpg" alt="Young adult arriving at a sunlit residential doorway with a travel case" />
          </figure>
          <span className="st-hero-line" aria-hidden="true" />
        </section>

        <section className="st-cover ic-flow" aria-labelledby="st-cover-title">
          <span className="ic-node" aria-hidden="true" />
          <p className="ic-eyebrow">A relationship through the academic year</p>
          <h2 id="st-cover-title">Cover is only<br /><em>the beginning.</em></h2>
          <p>Insurance may help meet the cost of eligible care. VCH gives your child a doctor who understands their history, knows how UK healthcare works and can guide what happens next throughout the academic year.</p>
        </section>

        <section className="st-orientation ic-flow" aria-labelledby="st-orientation-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="st-orientation-study" aria-hidden="true">
            <svg viewBox="0 0 600 620" preserveAspectRatio="xMidYMid meet">
              <g className="st-grid-home"><path d="M75 80V480 M160 80V480 M245 80V480 M30 135H290 M30 220H290 M30 305H290 M30 390H290" /></g>
              <g className="st-grid-uk"><path d="M310 160V560 M400 160V560 M490 160V560 M275 210H565 M275 300H565 M275 390H565 M275 480H565" /></g>
              <path className="st-route" d="M105 390 C160 270 210 390 280 335 S390 190 500 300" />
              <circle className="st-origin" cx="105" cy="390" r="7" /><circle className="st-destination" cx="500" cy="300" r="7" />
              <text x="67" y="525">HOME</text><text x="390" y="600">UNITED KINGDOM</text>
            </svg>
          </div>
          <div className="st-orientation-copy">
            <p className="ic-eyebrow">Finding one’s bearings</p>
            <h2 id="st-orientation-title">Healthcare in a new country<br /><em>can be difficult to navigate</em></h2>
            <p>A student may be living independently for the first time while also learning how general practice, NHS 111, urgent treatment centres, private care, specialists and emergency services fit together. VCH provides a consistent point of guidance so that the student does not have to work it out alone when they are unwell.</p>
          </div>
        </section>

        <section className="st-support ic-flow" aria-labelledby="st-support-title">
          <span className="ic-node" aria-hidden="true" />
          <div className="st-support-heading">
            <p className="ic-eyebrow">Doctor-led, throughout the year</p>
            <h2 id="st-support-title">What the membership<br /><em>is designed to provide</em></h2>
          </div>
          <ul className="st-support-list">
            {supportAreas.map((area) => <li key={area}>{area}</li>)}
          </ul>
        </section>

        <section className="st-moments ic-flow" aria-label="Support through changing needs">
          <div className="st-moments-line" aria-hidden="true" />
          {moments.map(({ heading, copy }) => (
            <article className="st-moment" key={heading}>
              <span className="st-moment-point" aria-hidden="true" />
              <h2>{heading}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </section>

        <section className="st-peace ic-flow" aria-labelledby="st-peace-title">
          <span className="ic-node" aria-hidden="true" />
          <p className="ic-eyebrow">One clear point of contact</p>
          <h2 id="st-peace-title">Peace of mind,<br /><em>wherever home is</em></h2>
          <p>Families are not left wondering what is happening or what comes next. VCH provides a trusted medical point of contact and agrees a clear communication plan from the beginning.</p>
        </section>

        <section className="st-urgent ic-flow" aria-labelledby="st-urgent-title">
          <span className="ic-node" aria-hidden="true" />
          <h2 id="st-urgent-title">When urgent help is needed</h2>
          <p>VCH is not an emergency service. For an emergency in the United Kingdom, call 999 or attend the nearest emergency department. NHS 111 may provide urgent guidance when the situation is not life-threatening. VCH can help preserve continuity before or after an urgent episode when it is safe to do so.</p>
        </section>

        <section className="st-close ic-flow" aria-labelledby="st-close-title">
          <span className="ic-end-node" aria-hidden="true" />
          <p className="ic-eyebrow">A private conversation</p>
          <h2 id="st-close-title">Begin with a<br /><em>family conversation</em></h2>
          <p>A confidential introductory conversation allows VCH to understand the student’s health needs, location, existing care, family expectations and whether the service is suitable.</p>
          <a className="ic-button" href={studentEnquiryHref}>Enquire for a Student</a>
        </section>
      </main>
      <footer className="ic-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/membership">Membership</a><a href="/membership/athletes">Athletes</a><a href="/membership/international-students" aria-current="page">International Students</a><a href="/how-it-works">How it works</a><a href="/enquire">Enquire</a></nav>
      </footer>
    </div>
  )
}
