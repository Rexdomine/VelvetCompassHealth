import { useEffect, useRef, useState } from 'react'
import { validateStep } from './features/enquire/validation.js'
import './features/international-care/international-care.css'
import './features/enquire/enquire.css'

const navigation = [
  ['Home', '/'],
  ['Membership', '/membership'],
  ['How it works', '/how-it-works'],
  ['Health Intelligence', '/health-intelligence'],
  ['Clinical Network', '/clinical-network'],
  ['International Care', '/international-care'],
  ['About VCH', '/about-vch'],
]

const enquiryTypes = [
  'Individual or family membership',
  'International Students',
  'Clinical network or professional collaboration',
  'Partnerships and organisations',
  'Media or speaking enquiry',
]

const supportOptions = [
  ['health-oversight', 'Health oversight & continuity'],
  ['performance', 'Performance / executive health'],
  ['fertility', 'Fertility readiness or preconception planning'],
  ['aesthetics', 'Aesthetics, cosmetic or hair concerns'],
  ['decision-support', 'Support around a specific decision or upcoming event'],
  ['other', 'Other (please specify)'],
]

const urgentOptions = [
  ['chest-pain', 'Chest pain'],
  ['breathlessness', 'Severe breathlessness'],
  ['neurological', 'Sudden neurological symptoms, such as weakness or changes in speech or vision'],
  ['abdominal-pain', 'Severe or worsening abdominal pain'],
  ['self-harm', 'Thoughts of self-harm or feeling unsafe'],
  ['none', 'None of the above'],
]

const guidanceOptions = [
  ['direct', 'Direct', 'Clear recommendation and defined next steps'],
  ['options-led', 'Options-led', 'Structured choices, detail, and space to decide'],
  ['collaborative', 'Collaborative', 'Discussion-based, shared decision-making'],
]

const initialValues = {
  emergencyConfirmed: false,
  fullName: '',
  email: '',
  phone: '',
  location: '',
  contactMethod: '',
  enquiryType: '',
  supportFocus: [],
  supportFocusOther: '',
  message: '',
  gpRegistered: '',
  gpDetails: '',
  exclusions: [],
  guidancePreference: '',
  ackNotEmergencyService: false,
  ackUrgentEscalation: false,
  ackInvitationOnly: false,
  ackProfessionalBoundaries: false,
  ackInformationAccuracy: false,
  privacyConsent: false,
}

const stepTitles = [
  'Before we begin',
  'Your details',
  'What brings you here',
  'Your care context',
  'Urgent concerns',
  'How you prefer guidance',
  'A clear understanding',
]

function EnquireHeader() {
  return (
    <header className="ic-header">
      <a className="ic-skip" href="#eq-main">Skip to main content</a>
      <a className="ic-brand" href="/" aria-label="Velvet Compass Health home"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" /></a>
      <nav className="ic-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        <a className="ic-nav-enquire" href="/enquire" aria-current="page">Enquire</a>
      </nav>
      <details className="ic-mobile-nav" onKeyDown={(event) => {
        if (event.key === 'Escape') event.currentTarget.open = false
      }}>
        <summary aria-label="Navigation menu"><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if (event.target.closest('a')) event.currentTarget.parentElement.open = false
        }}>
          {navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a href="/enquire" aria-current="page">Enquire</a>
        </nav>
      </details>
    </header>
  )
}

function Choice({ name, value, checked, onChange, children, type = 'checkbox' }) {
  return (
    <label className={`eq-choice${checked ? ' is-selected' : ''}`}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span className="eq-choice-mark" aria-hidden="true" />
      <span>{children}</span>
    </label>
  )
}

export default function EnquirePage() {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState(() => {
    if (typeof window === 'undefined') return initialValues
    const params = new URLSearchParams(window.location.search)
    const requestedType = params.get('type')
    const requestedFocus = params.get('focus')
    return {
      ...initialValues,
      enquiryType: enquiryTypes.includes(requestedType) ? requestedType : '',
      supportFocus: supportOptions.some(([value]) => value === requestedFocus) ? [requestedFocus] : [],
    }
  })
  const [error, setError] = useState('')
  const stepHeadingRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'Enquire — Velvet Compass Health'
    if (meta) meta.content = 'Begin a private conversation with Velvet Compass Health about medical oversight and the care you want your health to support.'
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  useEffect(() => {
    if (step > 1) stepHeadingRef.current?.focus()
  }, [step])

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const toggleList = (field, value) => {
    setValues((current) => {
      if (field === 'exclusions' && value === 'none') return { ...current, exclusions: current.exclusions.includes('none') ? [] : ['none'] }
      const base = field === 'exclusions' ? current.exclusions.filter((item) => item !== 'none') : current[field]
      return { ...current, [field]: base.includes(value) ? base.filter((item) => item !== value) : [...base, value] }
    })
    setError('')
  }

  const advance = (event) => {
    event.preventDefault()
    if (step === 7) return
    const nextError = validateStep(step, values)
    if (nextError) return setError(nextError)
    setError('')
    setStep((current) => current + 1)
  }

  return (
    <div className="ic-page eq-page">
      <EnquireHeader />
      <main id="eq-main">
        <section className="eq-intro" aria-labelledby="eq-title">
          <p className="ic-eyebrow">A private first conversation</p>
          <h1 id="eq-title">Your health deserves more than appointments.<br /><em>It deserves direction.</em></h1>
          <p>Begin with a private conversation about what you want your health to support, where the current picture feels fragmented and which level of medical oversight may be appropriate.</p>
          <a className="ic-text-link" href="#request-access">Submit an Enquiry</a>
          <span className="eq-intro-line" aria-hidden="true" />
        </section>

        <section className="eq-form-section" id="request-access" aria-labelledby="request-access-title">
          <div className="eq-form-heading">
            <p className="ic-eyebrow">Request access</p>
            <h2 id="request-access-title">Begin <em>privately.</em></h2>
            <p>We ask only for what helps us understand the nature of your enquiry. Please leave medical records and detailed clinical history out of this form.</p>
          </div>

          <form className="eq-form" onSubmit={advance} noValidate>
            <div className="eq-progress" aria-label={`Step ${step} of 7`}>
              <span>Step {String(step).padStart(2, '0')} <i>/</i> 07</span>
              <div className="eq-progress-track" role="progressbar" aria-label="Enquiry progress" aria-valuenow={step} aria-valuemin="1" aria-valuemax="7"><span style={{ width: `${step / 7 * 100}%` }} /></div>
            </div>

            <div className="eq-step" key={step}>
              <h3 id="eq-step-title" ref={stepHeadingRef} tabIndex="-1">{stepTitles[step - 1]}</h3>

              {step === 1 && <div className="eq-step-content">
                <p className="eq-lead">Velvet Compass Health is not an emergency service.</p>
                <p>If you are in the United Kingdom and require emergency medical help, call 999 or attend the nearest emergency department. If you are outside the United Kingdom, contact the local emergency services.</p>
                <p>Do not wait for a response to this form if your concern is urgent.</p>
                <Choice name="emergencyConfirmed" value="yes" checked={values.emergencyConfirmed} onChange={(event) => setField('emergencyConfirmed', event.target.checked)}>I confirm that this is not an emergency and that I am seeking non-urgent medical guidance.</Choice>
              </div>}

              {step === 2 && <div className="eq-fields">
                <label className="eq-field">Full name <span>Required</span><input autoComplete="name" value={values.fullName} onChange={(event) => setField('fullName', event.target.value)} /></label>
                <label className="eq-field">Email address <span>Required</span><input type="email" autoComplete="email" value={values.email} onChange={(event) => setField('email', event.target.value)} /></label>
                <label className="eq-field">Telephone <span>Required if telephone is preferred</span><input type="tel" autoComplete="tel" value={values.phone} onChange={(event) => setField('phone', event.target.value)} /></label>
                <label className="eq-field">Country or time zone <span>Required</span><input autoComplete="country-name" value={values.location} onChange={(event) => setField('location', event.target.value)} /></label>
                <fieldset className="eq-fieldset"><legend>Preferred contact method</legend>
                  <div className="eq-choices eq-choices-inline">{['Email', 'Telephone'].map((method) => <Choice key={method} type="radio" name="contactMethod" value={method} checked={values.contactMethod === method} onChange={() => setField('contactMethod', method)}>{method}</Choice>)}</div>
                </fieldset>
              </div>}

              {step === 3 && <div className="eq-fields">
                <fieldset className="eq-fieldset"><legend>Choose an enquiry type</legend>
                  <div className="eq-choices">{enquiryTypes.map((type) => <Choice key={type} type="radio" name="enquiryType" value={type} checked={values.enquiryType === type} onChange={() => setField('enquiryType', type)}>{type}</Choice>)}</div>
                </fieldset>
                <fieldset className="eq-fieldset"><legend>What are you primarily seeking support with?</legend><p className="eq-hint">Select one or more.</p>
                  <div className="eq-choices">{supportOptions.map(([value, label]) => <Choice key={value} name="supportFocus" value={value} checked={values.supportFocus.includes(value)} onChange={() => toggleList('supportFocus', value)}>{label}</Choice>)}</div>
                </fieldset>
                {values.supportFocus.includes('other') && <label className="eq-field">Please specify briefly<input value={values.supportFocusOther} onChange={(event) => setField('supportFocusOther', event.target.value)} /></label>}
                <label className="eq-field">Short message <span>Required</span><textarea rows="4" value={values.message} onChange={(event) => setField('message', event.target.value)} aria-describedby="eq-message-hint" /></label>
                <p className="eq-hint" id="eq-message-hint">Please do not include detailed medical information, reports or urgent clinical concerns.</p>
              </div>}

              {step === 4 && <div className="eq-fields">
                <fieldset className="eq-fieldset"><legend>Are you currently registered with a GP?</legend>
                  <div className="eq-choices eq-choices-inline">{[['yes', 'Yes'], ['no', 'No']].map(([value, label]) => <Choice key={value} type="radio" name="gpRegistered" value={value} checked={values.gpRegistered === value} onChange={() => setField('gpRegistered', value)}>{label}</Choice>)}</div>
                </fieldset>
                {values.gpRegistered === 'yes' && <label className="eq-field">GP practice name and location <span>Required if registered</span><textarea rows="3" value={values.gpDetails} onChange={(event) => setField('gpDetails', event.target.value)} /></label>}
              </div>}

              {step === 5 && <div className="eq-fields">
                <p className="eq-lead">Please confirm whether any of the following apply today.</p>
                <div className="eq-choices">{urgentOptions.map(([value, label]) => <Choice key={value} name="exclusions" value={value} checked={values.exclusions.includes(value)} onChange={() => toggleList('exclusions', value)}>{label}</Choice>)}</div>
                <p className="eq-hint">If any urgent symptom applies, please seek immediate local care. This form cannot be used to request urgent advice.</p>
              </div>}

              {step === 6 && <div className="eq-fields">
                <p className="eq-lead">Which approach best reflects how you like to work?</p>
                <div className="eq-guidance">{guidanceOptions.map(([value, title, description]) => <Choice key={value} type="radio" name="guidancePreference" value={value} checked={values.guidancePreference === value} onChange={() => setField('guidancePreference', value)}><strong>{title}</strong><small>{description}</small></Choice>)}</div>
              </div>}

              {step === 7 && <div className="eq-fields">
                <p className="eq-lead">Before requesting a review, please confirm the following.</p>
                <div className="eq-choices">
                  <Choice name="ackNotEmergencyService" value="yes" checked={values.ackNotEmergencyService} onChange={(event) => setField('ackNotEmergencyService', event.target.checked)}>I understand this is not an emergency service.</Choice>
                  <Choice name="ackUrgentEscalation" value="yes" checked={values.ackUrgentEscalation} onChange={(event) => setField('ackUrgentEscalation', event.target.checked)}>I understand I may be advised to seek urgent or in-person care if clinically indicated.</Choice>
                  <Choice name="ackInvitationOnly" value="yes" checked={values.ackInvitationOnly} onChange={(event) => setField('ackInvitationOnly', event.target.checked)}>I understand intake conversations are offered by invitation only.</Choice>
                  <Choice name="ackProfessionalBoundaries" value="yes" checked={values.ackProfessionalBoundaries} onChange={(event) => setField('ackProfessionalBoundaries', event.target.checked)}>I understand communication occurs within agreed professional boundaries and working hours.</Choice>
                  <Choice name="ackInformationAccuracy" value="yes" checked={values.ackInformationAccuracy} onChange={(event) => setField('ackInformationAccuracy', event.target.checked)}>I confirm that the information provided is accurate to the best of my knowledge.</Choice>
                </div>
                <p className="eq-privacy">By submitting this form, you agree that Velvet Compass Health may use the information provided to respond to your enquiry in accordance with its Privacy Notice. Please do not include detailed medical information, reports or urgent clinical concerns in this form.</p>
                <Choice name="privacyConsent" value="yes" checked={values.privacyConsent} onChange={(event) => setField('privacyConsent', event.target.checked)}>I understand how my enquiry information will be used.</Choice>
                <p className="eq-hint">We will respond during normal business days using your preferred contact method. A response does not establish a doctor-patient relationship or confirm membership.</p>
              </div>}
            </div>

            {error && <p className="eq-error" role="alert">{error}</p>}
            <div className="eq-controls">
              {step > 1 && <button className="eq-back" type="button" onClick={() => { setError(''); setStep((current) => current - 1) }}>Back</button>}
              {step < 7 ? <button className="ic-button eq-next" type="submit">Continue</button> : <button className="ic-button eq-next" type="button" disabled aria-describedby="eq-unavailable">Request Intake Review</button>}
            </div>
            {step === 7 && <p className="eq-unavailable" id="eq-unavailable" role="status">This form is available for design review. Enquiries cannot be submitted until the private delivery service is connected.</p>}
          </form>
          <span className="eq-endpoint" aria-hidden="true" />
        </section>

        <aside className="eq-aftercare" aria-label="Urgent care guidance">
          <p className="ic-eyebrow">When you need urgent help</p>
          <p>This form is not monitored as an emergency service. If you are in the United Kingdom and require emergency medical help, call 999 or attend the nearest emergency department. If you are outside the United Kingdom, contact the local emergency services.</p>
        </aside>
      </main>
      <footer className="ic-footer">
        <a href="/" aria-label="Velvet Compass Health home"><img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" /></a>
        <nav aria-label="Footer navigation"><a href="/">Home</a><a href="/membership">Membership</a><a href="/how-it-works">How it works</a><a href="/about-vch">About VCH</a><a href="/enquire" aria-current="page">Enquire</a></nav>
      </footer>
    </div>
  )
}
