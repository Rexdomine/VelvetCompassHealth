import { useEffect, useState } from 'react'
import MembershipNavItem from './features/site-navigation/MembershipNavItem.jsx'
import './features/international-care/international-care.css'
import './features/hotels/hotels.css'

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

const journey = [
  {
    title: 'The concierge desk calls',
    copy: 'Your dedicated VCH concierge confirms the request, fee and expected arrival time.',
  },
  {
    title: 'The doctor comes to the room',
    copy: 'A GMC-registered doctor visits the guest in the privacy of their hotel room.',
  },
  {
    title: 'Medicines delivered. Blood tests in the room.',
    copy: 'Prescribed medicines are delivered to the hotel room. Blood samples can also be collected there.',
  },
  {
    title: 'The guest knows what follows',
    copy: 'Clear care instructions and a contact for follow-up.',
  },
]

const services = [
  'A GMC-registered doctor’s consultation.',
  'Prescribed medicines dispensed by a pharmacy and delivered to the room.',
  'Blood samples collected in the room.',
  'Fit-to-fly and travel certificates, following medical assessment.',
]

function HotelsHeader() {
  return (
    <header className="ic-header ht-header">
      <a className="ic-skip" href="#ht-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home">
        <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
      </a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => label === 'Membership'
          ? <MembershipNavItem key={label} />
          : <a key={label} href={href} aria-current={label === 'Hotels' ? 'page' : undefined}>{label}</a>)}
        <a className="ic-nav-enquire" href="/enquire">Enquire</a>
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
            : <a key={label} href={href} aria-current={label === 'Hotels' ? 'page' : undefined}>{label}</a>)}
          <a href="/enquire">Enquire</a>
        </nav>
      </details>
    </header>
  )
}

export default function HotelsPage() {
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [receiptSent, setReceiptSent] = useState(true)
  const [error, setError] = useState('')

  async function submitPartnership(event) {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setError('')
    try {
      const values = Object.fromEntries(new FormData(event.currentTarget).entries())
      const response = await fetch('/api/hotel-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Your enquiry could not be sent. Please try again.')
      setReceiptSent(result.receiptSent !== false)
      setSubmitted(true)
    } catch (submissionError) {
      setError(submissionError.message || 'Your enquiry could not be sent. Please try again.')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'Hotels — Velvet Compass Health'
    if (meta) meta.content = 'Personal medical support for hotel guests, coordinated through your concierge team.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <div className="ht-page">
      <HotelsHeader />
      <main id="ht-main">
        <section className="ht-hero" aria-labelledby="ht-title">
          <img className="ht-hero-image" src="/vch-approved/hotels/hotel-arrival.jpg" alt="Illustrative warm hotel interior with a person walking toward a sunlit suite" />
          <div className="ht-hero-shade" aria-hidden="true" />
          <div className="ht-hero-copy">
            <p className="ht-eyebrow">VCH for hotels</p>
            <h1 id="ht-title">A doctor to the room,<br /><em>day or night.</em></h1>
            <p>Personal medical support for your guests, without leaving their room.</p>
          </div>
          <div className="ht-concierge-panel">
            <p className="ht-eyebrow">For your concierge team</p>
            <p>One dedicated line, answered by your VCH concierge.</p>
            <a className="ht-button" href="#hotel-partnership-form">Explore a hotel partnership</a>
          </div>
        </section>

        <section className="ht-journey" aria-labelledby="ht-journey-title">
          <div className="ht-section-intro">
            <p className="ht-eyebrow">The guest journey</p>
            <h2 id="ht-journey-title">From your desk<br /><em>to their bedside.</em></h2>
          </div>
          <ol className="ht-steps">
            {journey.map(({ title, copy }, index) => (
              <li className="ht-step" key={title}>
                <span className="ht-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ht-fees" aria-labelledby="ht-fees-title">
          <div className="ht-fees-heading">
            <p className="ht-eyebrow">Consultation fees</p>
            <h2 id="ht-fees-title">Clear from<br /><em>the outset.</em></h2>
          </div>
          <div className="ht-fees-detail">
            <div className="ht-fee"><strong>£400</strong><span>Day consultation</span></div>
            <div className="ht-fee"><strong>£600</strong><span>Night consultation</span></div>
            <p className="ht-fee-principle">Paid directly by the guest. No fee to the hotel.</p>
            <p className="ht-fee-note">Blood tests, medicines and delivery are charged separately, with costs confirmed before proceeding.</p>
            <p className="ht-fee-hours">Day and night consultation hours to be confirmed before publication.</p>
          </div>
        </section>

        <section className="ht-services" aria-labelledby="ht-services-title">
          <div className="ht-services-heading">
            <p className="ht-eyebrow">Services</p>
            <h2 id="ht-services-title">Care without<br /><em>leaving the room.</em></h2>
          </div>
          <ul className="ht-service-list">
            {services.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </section>

        <section className="ht-language" aria-labelledby="ht-language-title">
          <p className="ht-eyebrow">Language support</p>
          <h2 id="ht-language-title">Understood, in your<br /><em>preferred language.</em></h2>
          <p>Professional interpreting and translation arranged for your guests, from explaining their concerns to understanding their care.</p>
        </section>

        <section className="ht-partnership" aria-labelledby="ht-partnership-title">
          <div>
            <p className="ht-eyebrow">Hotel partnerships</p>
            <h2 id="ht-partnership-title">A personal contact<br /><em>for your hotel.</em></h2>
          </div>
          <div className="ht-partnership-copy">
            <p>Your team has a dedicated VCH concierge to coordinate guest requests. No joining fee or charges to the hotel. Guests receive clear fees and settle directly.</p>
            <p className="ht-member-note">Hotel doctor visits are included for VCH members, subject to their membership terms and service availability.</p>
            <a className="ht-button" href="#hotel-partnership-form">Explore a hotel partnership</a>
          </div>
        </section>

        <section className="ht-enquiry" id="hotel-partnership-form" aria-labelledby="ht-enquiry-title">
          <div className="ht-enquiry-intro">
            <p className="ht-eyebrow">A private introduction</p>
            <h2 id="ht-enquiry-title">Explore a<br /><em>hotel partnership.</em></h2>
            <p>For hotel management and concierge teams. This form is for partnership enquiries only, not individual guest-care requests.</p>
          </div>
          {submitted ? <div className="ht-form-confirmation" role="status">
            <h3>Your enquiry has been received.</h3>
            <p>Thank you. The VCH team will review your partnership enquiry and respond during normal business days.</p>
            {!receiptSent && <p>The email confirmation could not be sent. Your enquiry has still reached us; please do not submit it again.</p>}
          </div> : <form className="ht-form" aria-label="Hotel partnership enquiry" onSubmit={submitPartnership}>
            <label>Name<input name="name" type="text" autoComplete="name" required /></label>
            <label>Hotel<input name="hotel" type="text" autoComplete="organization" required /></label>
            <label>Role<input name="role" type="text" autoComplete="organization-title" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Telephone number<input name="phone" type="tel" autoComplete="tel" required /></label>
            <label className="ht-form-message">Message<textarea name="message" rows="4" required /></label>
            <div className="ht-form-end">
              <button className="ht-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send partnership enquiry'}</button>
              {error && <p role="alert">{error}</p>}
            </div>
          </form>}
        </section>
      </main>
      <footer className="ic-footer ht-footer">
        <a href="/"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health home" /></a>
        <div>
          <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/membership">Membership</a><a href="/international-care">International Care</a><a href="/hotels" aria-current="page">Hotels</a><a href="/about-vch">About VCH</a><a href="/enquire">Enquire</a></nav>
          <p>For medical emergencies, contact the emergency services immediately.</p>
        </div>
      </footer>
    </div>
  )
}
