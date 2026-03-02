import { useState } from 'react'

const initialForm = {
  fullName: '',
  location: '',
  phone: '',
  email: '',
  supportFocus: [],
  supportFocusOther: '',
  gpRegistered: '',
  gpDetails: '',
  exclusions: [],
  guidancePreference: '',
  ackNotEmergencyService: false,
  ackUrgentEscalation: false,
  ackInvitationOnly: false,
  ackProfessionalBoundaries: false,
  ackInformationAccuracy: false,
}

const TOTAL_STEPS = 7
const focusOptions = [
  { value: 'health-oversight', label: 'Health oversight & continuity' },
  { value: 'performance', label: 'Performance / executive health' },
  { value: 'fertility', label: 'Fertility readiness or preconception planning' },
  { value: 'aesthetics', label: 'Aesthetics, cosmetic or hair concerns' },
  { value: 'decision-support', label: 'Support around a specific decision or upcoming event' },
  { value: 'other', label: 'Other (please specify)' },
]
const exclusionOptions = [
  { value: 'chest-pain', label: 'Chest pain' },
  { value: 'breathlessness', label: 'Severe breathlessness' },
  {
    value: 'neurological',
    label: 'Sudden neurological symptoms (e.g. weakness, speech or vision changes)',
  },
  { value: 'abdominal-pain', label: 'Severe or worsening abdominal pain' },
  { value: 'self-harm', label: 'Thoughts of self-harm or feeling unsafe' },
  { value: 'none', label: 'None of the above' },
]
const guidanceOptions = [
  {
    value: 'direct',
    title: 'Direct',
    icon: 'bolt',
    description: 'Clear recommendation and defined next steps',
  },
  {
    value: 'options-led',
    title: 'Options-led',
    icon: 'list_alt',
    description: 'Structured choices, detail, and space to decide',
  },
  {
    value: 'collaborative',
    title: 'Collaborative',
    icon: 'group',
    description: 'Discussion-based, shared decision-making',
  },
]

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [emergencyConfirmed, setEmergencyConfirmed] = useState(false)

  const onChange = (event) => {
    const { name, type, value, checked } = event.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const onFocusToggle = (event) => {
    const { checked, value } = event.target
    setFormData((prev) => {
      const nextValues = checked
        ? [...prev.supportFocus, value]
        : prev.supportFocus.filter((focus) => focus !== value)
      return { ...prev, supportFocus: nextValues }
    })
  }

  const onExclusionToggle = (event) => {
    const { checked, value } = event.target
    setFormData((prev) => {
      if (checked && value === 'none') {
        return { ...prev, exclusions: ['none'] }
      }
      if (checked) {
        const withoutNone = prev.exclusions.filter((item) => item !== 'none')
        return { ...prev, exclusions: [...withoutNone, value] }
      }
      return { ...prev, exclusions: prev.exclusions.filter((item) => item !== value) }
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'idle', message: '' })

    if (step === 1) {
      if (!emergencyConfirmed) {
        setStatus({
          type: 'error',
          message: 'Please confirm this is not an emergency before continuing.',
        })
        return
      }
      setStep(2)
      return
    }

    if (step === 2) {
      if (
        !formData.fullName.trim() ||
        !formData.location.trim() ||
        !formData.phone.trim() ||
        !formData.email.trim()
      ) {
        setStatus({ type: 'error', message: 'All identity fields are required.' })
        return
      }

      setStep(3)
      return
    }

    if (step === 3) {
      if (formData.supportFocus.length === 0) {
        setStatus({ type: 'error', message: 'Please select at least one focus area.' })
        return
      }

      if (formData.supportFocus.includes('other') && !formData.supportFocusOther.trim()) {
        setStatus({ type: 'error', message: 'Please specify details for "Other".' })
        return
      }

      setStep(4)
      return
    }

    if (!formData.gpRegistered) {
      setStatus({ type: 'error', message: 'Please select whether you are currently registered with a GP.' })
      return
    }

    if (formData.gpRegistered === 'yes' && !formData.gpDetails.trim()) {
      setStatus({ type: 'error', message: 'Please provide your GP practice details.' })
      return
    }

    if (step === 4) {
      setStep(5)
      return
    }

    if (step === 5) {
      if (formData.exclusions.length === 0) {
        setStatus({ type: 'error', message: 'Please select at least one option in high-risk exclusions.' })
        return
      }
      if (formData.exclusions.includes('none') && formData.exclusions.length > 1) {
        setStatus({
          type: 'error',
          message: 'Select either "None of the above" or specific symptoms, not both.',
        })
        return
      }
      if (!formData.exclusions.includes('none')) {
        setStatus({
          type: 'error',
          message: 'This indicates urgent symptoms. Please seek immediate care via emergency services.',
        })
        return
      }

      setStep(6)
      return
    }

    if (step === 6) {
      if (!formData.guidancePreference) {
        setStatus({ type: 'error', message: 'Please choose your guidance preference.' })
        return
      }

      setStep(7)
      return
    }

    if (
      !formData.ackNotEmergencyService ||
      !formData.ackUrgentEscalation ||
      !formData.ackInvitationOnly ||
      !formData.ackProfessionalBoundaries ||
      !formData.ackInformationAccuracy
    ) {
      setStatus({
        type: 'error',
        message: 'Please confirm all boundaries and final confirmation checkboxes.',
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          location: formData.location.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          supportFocus: formData.supportFocus,
          supportFocusOther: formData.supportFocusOther.trim(),
          gpRegistered: formData.gpRegistered,
          gpDetails: formData.gpDetails.trim(),
          exclusions: formData.exclusions,
          guidancePreference: formData.guidancePreference,
          ackNotEmergencyService: formData.ackNotEmergencyService,
          ackUrgentEscalation: formData.ackUrgentEscalation,
          ackInvitationOnly: formData.ackInvitationOnly,
          ackProfessionalBoundaries: formData.ackProfessionalBoundaries,
          ackInformationAccuracy: formData.ackInformationAccuracy,
          emergencyConfirmed: true,
        }),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to submit enquiry right now.')
      }

      setFormData(initialForm)
      setStep(1)
      setEmergencyConfirmed(false)
      setStatus({ type: 'idle', message: '' })
      setSubmitted(true)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background-dark text-secondary font-sans antialiased">
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
          <div className="max-w-2xl w-full flex flex-col items-center text-center">
            <div className="mb-12 text-primary">
              <span className="material-symbols-outlined text-6xl md:text-7xl font-extralight opacity-90">
                explore
              </span>
              <div className="-mt-8">
                <span className="material-symbols-outlined text-3xl md:text-4xl font-light">
                  medical_services
                </span>
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-secondary font-normal mb-10 tracking-wide">
              Enquiry Submitted
            </h1>
            <div className="space-y-8 mb-16">
              <p className="text-primary uppercase text-[11px] tracking-[0.32em] font-medium">Thank You</p>
              <p className="text-secondary/90 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto">
                Thank you for your interest in Velvet Compass Health. Your details have been received and will be
                reviewed with the discretion and clinical oversight they require.
              </p>
              <p className="text-secondary/70 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto italic">
                Due to our limited capacity and commitment to medical continuity, formal engagement proceeds following
                a thorough review of scope and suitability. You will be contacted via the details provided should we be
                able to progress your application.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <a
                className="group border border-primary text-secondary px-10 py-5 uppercase text-[11px] tracking-[0.4em] flex items-center gap-6 hover:bg-primary/10 transition-all duration-500 rounded-sm"
                href="/"
              >
                <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:-translate-x-1">
                  arrow_back
                </span>
                Return to Home
              </a>
            </div>
          </div>
        </main>
        <footer className="py-12 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-24 h-px bg-primary/20 mb-8" />
            <p className="text-[9px] text-secondary/40 tracking-[0.3em] text-center uppercase leading-loose max-w-2xl">
              Your data is handled with the highest level of clinical confidentiality and discretion.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <>
      <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-primary/20 dark:border-background-light/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center gap-4">
              <img
                alt="Velvet Compass Health logo"
                className="h-12 md:h-14 w-auto object-contain"
                loading="eager"
                src="/Logo.svg"
              />
            </div>
            <div className="hidden md:flex space-x-12 items-center">
              <a
                className="text-sm tracking-widest uppercase text-charcoal/70 dark:text-white/70 hover:text-primary dark:hover:text-secondary transition-colors"
                href="#office"
              >
                The Office
              </a>
              <a
                className="text-sm tracking-widest uppercase text-charcoal/70 dark:text-white/70 hover:text-primary dark:hover:text-secondary transition-colors"
                href="#how-it-works"
              >
                How It Works
              </a>
              <a
                className="text-sm tracking-widest uppercase text-charcoal/70 dark:text-white/70 hover:text-primary dark:hover:text-secondary transition-colors"
                href="#about"
              >
                About
              </a>
              <a
                className="px-6 py-2 border border-primary text-primary dark:text-secondary dark:border-secondary hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-charcoal transition-all text-sm tracking-widest uppercase"
                href="#access"
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Abstract architectural shadows on a minimal wall"
            className="w-full h-full object-cover opacity-80 dark:opacity-40 grayscale mix-blend-multiply dark:mix-blend-overlay"
            src="/images/header-hero.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-light/50 via-transparent to-background-light dark:from-background-dark/50 dark:to-background-dark" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-charcoal dark:text-white leading-tight mb-8">
            A Private <br /> <span className="italic text-primary dark:text-secondary">Medical Office</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-charcoal/90 dark:text-gray-200 mb-6 tracking-wide">
            Outsource medical complexity through ongoing clinical oversight.
          </h2>
          <div className="text-lg md:text-xl font-light text-charcoal/80 dark:text-gray-300 max-w-4xl mx-auto tracking-wide leading-relaxed mb-12 space-y-5">
            <p>
              Velvet Compass Health is a private medical office providing clear medical direction for individuals whose
              roles, visibility, and responsibilities leave no room for overcomplicated or fragmented care.
            </p>
            <p>
              The office assigns a dedicated personal doctor who holds the full picture, clinically and personally, and
              interprets investigations and specialist opinions, directing care with defined coordination across NHS and
              private settings. Clarity is established early, not retrospectively.
            </p>
          </div>
          <div>
            <a
              className="inline-block px-8 py-4 bg-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-charcoal transition-colors duration-300"
              href="#how-it-works"
            >
              How It Works
            </a>
          </div>
          <div className="mt-12">
            <div className="h-16 w-[1px] bg-primary mx-auto" />
          </div>
        </div>
      </header>

      <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark" id="office">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="w-full h-[600px] bg-background-alt dark:bg-surface-dark relative overflow-hidden">
              <img
                alt="Abstract beige texture representing calm structure"
                className="w-full h-full object-cover opacity-80 mix-blend-multiply dark:opacity-50"
                src="/images/office-texture.png"
              />
              <div className="absolute inset-4 border border-primary/30 dark:border-secondary/30" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase block mb-4">The Office</span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal dark:text-white mb-8">
              Clarity Over <span className="italic text-primary dark:text-secondary">Confusion</span>
            </h2>
            <div className="space-y-3 text-charcoal/80 dark:text-gray-300 font-light text-lg leading-relaxed">
              <p>
                Velvet Compass Health operates as a private medical office structured to maintain clarity across time,
                transitions, and complexity.
              </p>
              <p>
                The office brings coherence to investigations, specialist opinions, and care pathways - aligning them
                within a single defined structure. Decisions are considered early, not retrospectively.
              </p>
              <p>
                The mandate is simple: clarity over confusion, proportion over excess, direction over drift - all
                centred within one clear point of care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24 md:py-32 bg-background-alt/30 dark:bg-surface-dark/30 border-y border-primary/10 dark:border-white/5"
        id="how-it-works"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Service</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-charcoal dark:text-white">How It Works</h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl font-light text-charcoal/80 dark:text-gray-300 leading-relaxed tracking-wide">
              The office brings clarity where healthcare becomes unclear by centralising interpretation, coordination,
              and continuity within one defined framework.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-primary/20 dark:border-white/10 divide-y md:divide-y-0 md:divide-x divide-primary/20 dark:divide-white/10">
            <div className="group p-8 lg:p-10 hover:bg-background-alt dark:hover:bg-surface-dark transition-colors duration-500">
              <h3 className="font-display text-xl text-charcoal dark:text-white mb-4">Continuity Over Time</h3>
              <p className="font-light text-charcoal/70 dark:text-gray-400 leading-relaxed text-sm">
                A long-term relationship with a physician who understands your history, reducing the friction of
                repetitive explanations.
              </p>
            </div>
            <div className="group p-8 lg:p-10 hover:bg-background-alt dark:hover:bg-surface-dark transition-colors duration-500">
              <h3 className="font-display text-xl text-charcoal dark:text-white mb-4">Preparation In Advance</h3>
              <p className="font-light text-charcoal/70 dark:text-gray-400 leading-relaxed text-sm">
                Proactive planning for health events, ensuring all documentation and directives are in place before
                they are needed.
              </p>
            </div>
            <div className="group p-8 lg:p-10 hover:bg-background-alt dark:hover:bg-surface-dark transition-colors duration-500">
              <h3 className="font-display text-xl text-charcoal dark:text-white mb-4">Coordinated Care</h3>
              <p className="font-light text-charcoal/70 dark:text-gray-400 leading-relaxed text-sm">
                Seamless management across multiple specialists and institutions, bridging the gap between NHS and
                private sector provision.
              </p>
            </div>
            <div className="group p-8 lg:p-10 hover:bg-background-alt dark:hover:bg-surface-dark transition-colors duration-500">
              <h3 className="font-display text-xl text-charcoal dark:text-white mb-4">Contextual Interpretation</h3>
              <p className="font-light text-charcoal/70 dark:text-gray-400 leading-relaxed text-sm">
                Investigations interpreted in context, not isolation. We ensure data points are understood as part of
                your broader physiological narrative.
              </p>
            </div>
          </div>
          <div className="border-b border-primary/20 dark:border-white/10 w-full mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase text-charcoal dark:text-white mb-4">
                Suitability
              </h4>
              <div className="font-light text-charcoal/70 dark:text-gray-400 leading-relaxed text-sm space-y-4">
                <p>
                  The service is suited to individuals and families who value continuity over episodic care, whether
                  managing evolving medical circumstances, navigating demanding schedules, or whose roles and
                  visibility require discretion.
                </p>
                <p>
                  Engagement is by application and initial review. Formal engagement proceeds following consideration
                  of scope and suitability. Client numbers remain intentionally limited to preserve continuity and
                  discretion.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase text-charcoal dark:text-white mb-4">
                Scope
              </h4>
              <div className="font-light text-charcoal/70 dark:text-gray-400 leading-relaxed text-sm space-y-4">
                <p>
                  The office operates alongside existing clinicians. It does not replace a GP or specialist and does
                  not provide emergency services.
                </p>
                <p>
                  VCH is a private medical office providing clarity and continuity within defined professional
                  boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative order-1 lg:order-1">
              <div className="w-full aspect-[4/5] bg-background-alt dark:bg-surface-dark relative">
                <img
                  alt="Portrait of Dr. E I Joseph-Ebare"
                  className="w-full h-full object-cover grayscale mix-blend-multiply dark:mix-blend-normal opacity-90"
                  src="/images/founder-portrait.png"
                />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-primary/20 dark:border-white/10 z-0" />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/5 dark:bg-white/5 z-0" />
              </div>
            </div>
            <div className="flex flex-col justify-center h-full order-2 lg:order-2">
              <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase block mb-4">
                Clinical Lead
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal dark:text-white mb-8 leading-tight">
                Dr. Ehizele Ijeoma Joseph-Ebare
              </h2>
              <div className="space-y-8">
                <div className="space-y-3 text-charcoal/80 dark:text-gray-300 font-light text-lg leading-relaxed">
                  <p>
                    Dr E I Joseph-Ebare is a UK-trained medical doctor educated at Barts and The London School of
                    Medicine and Dentistry. Her clinical training has included cardiology, acute medicine, emergency
                    medicine and complex multi-morbidity across major London teaching hospitals, including Guy&apos;s and
                    St Thomas&apos; NHS Foundation Trust.
                  </p>
                  <p>
                    She worked on the frontline during the COVID-19 pandemic and has managed both high-acuity
                    presentations and longitudinal medical complexity. This breadth of exposure informs a clinical
                    approach that is structured, decisive, and resistant to both over-intervention and
                    under-recognition.
                  </p>
                  <p>
                    In addition to her medical training, Dr Joseph-Ebare holds a BSc in Global and Public Health and
                    has completed advanced business and financial principles training through Harvard Business School.
                    Her work extends into charitable and public health initiatives within the UK and internationally.
                  </p>
                  <p>
                    Velvet Compass Health was established to provide structured clinical oversight for individuals
                    navigating increasingly fragmented healthcare systems. The office reflects her professional
                    standard: precise, accountable, and resistant to both medical excess and medical neglect.
                  </p>
                  <p>
                    Dr Joseph-Ebare&apos;s philosophy is simple - clinical excellence and emotional intelligence are not
                    opposing forces. Decisive medicine requires both.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal text-background-light relative" id="access">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] text-background-light/50 uppercase block mb-4">
              Step {step} of {TOTAL_STEPS}
            </span>
            {step === 1 ? (
              <>
                <h2 className="text-xs md:text-sm font-sans font-medium tracking-[0.4em] uppercase text-background-light/60 mb-8">
                  Important Notice
                </h2>
                <h3 className="font-display text-4xl md:text-6xl text-background-light mb-10 font-normal leading-tight">
                  Emergency Disclaimer
                </h3>
                <div className="max-w-2xl mx-auto">
                  <p className="text-base md:text-lg font-light leading-relaxed text-background-light/90">
                    Velvet Compass Health is not an emergency service. If you are experiencing urgent symptoms,
                    including chest pain, severe breathlessness, sudden neurological symptoms, severe or worsening
                    abdominal pain, or thoughts of self-harm,{' '}
                    <span className="text-primary font-medium">
                      please seek immediate care via 999 / 112 or attend A&amp;E.
                    </span>
                  </p>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <h2 className="font-display text-4xl md:text-6xl text-background-light mb-6 font-normal leading-tight">
                  Identity
                </h2>
                <div className="w-12 h-px bg-primary/40 mx-auto mt-8" />
              </>
            ) : step === 3 ? (
              <>
                <h2 className="font-display text-4xl md:text-6xl text-background-light mb-6 font-normal leading-tight">
                  Focus of Support
                </h2>
                <p className="text-background-light/80 font-sans font-light text-sm md:text-base tracking-wide max-w-lg mx-auto">
                  What are you primarily seeking support with at this stage? (Select one or more)
                </p>
                <div className="w-12 h-px bg-primary/40 mx-auto mt-10" />
              </>
            ) : step === 4 ? (
              <>
                <h2 className="font-display text-4xl md:text-6xl text-background-light mb-6 font-normal leading-tight">
                  Current GP &amp; Care Context
                </h2>
                <div className="w-12 h-px bg-primary/40 mx-auto mt-10" />
              </>
            ) : step === 5 ? (
              <>
                <h2 className="font-display text-4xl md:text-6xl text-background-light mb-6 font-normal leading-tight">
                  High-risk Exclusions
                </h2>
                <p className="text-background-light/80 font-sans font-light text-sm md:text-base tracking-wide max-w-lg mx-auto leading-relaxed">
                  Please confirm that none of the following apply today:
                  <br />
                  <span className="text-[10px] uppercase tracking-widest opacity-60 mt-2 block">
                    (Select all that apply)
                  </span>
                </p>
                <div className="w-12 h-px bg-primary/40 mx-auto mt-10" />
              </>
            ) : step === 6 ? (
              <>
                <h2 className="font-display italic text-5xl md:text-6xl text-background-light mb-6 font-normal">
                  Guidance Preference
                </h2>
                <p className="text-background-light/80 text-base md:text-lg font-light tracking-wide">
                  Which approach best reflects how you like to work?
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl md:text-5xl text-background-light font-normal">
                  Boundaries &amp; Expectations
                </h2>
              </>
            )}
          </div>

          <form className="space-y-8" onSubmit={onSubmit}>
            {step === 1 ? (
              <>
                <div className="w-24 h-px bg-primary/30 mx-auto mb-8" />
                <div className="max-w-xl mx-auto">
                  <div className="flex items-start gap-5 p-6 md:p-8 border border-background-light/10 rounded-sm hover:border-primary/50 transition-all duration-500 bg-white/5 group">
                    <div className="flex items-center h-6">
                      <input
                        checked={emergencyConfirmed}
                        className="custom-checkbox"
                        id="emergency-confirm"
                        name="emergency-confirm"
                        onChange={(event) => setEmergencyConfirmed(event.target.checked)}
                        required
                        type="checkbox"
                      />
                    </div>
                    <div className="text-sm md:text-base leading-relaxed">
                      <label
                        className="font-light text-background-light/80 cursor-pointer select-none group-hover:text-background-light transition-colors"
                        htmlFor="emergency-confirm"
                      >
                        I confirm that this is not an emergency and that I am seeking non-urgent medical guidance.
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="grid grid-cols-1 gap-10">
                  <div className="input-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      className="form-input-minimal"
                      id="fullName"
                      name="fullName"
                      onChange={onChange}
                      placeholder="E.g. Alexander Sterling"
                      required
                      type="text"
                      value={formData.fullName}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="location">Primary Location (City &amp; Country)</label>
                    <input
                      className="form-input-minimal"
                      id="location"
                      name="location"
                      onChange={onChange}
                      placeholder="E.g. London, United Kingdom"
                      required
                      type="text"
                      value={formData.location}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="input-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        className="form-input-minimal"
                        id="phone"
                        name="phone"
                        onChange={onChange}
                        placeholder="+44 (0) 0000 000 000"
                        required
                        type="tel"
                        value={formData.phone}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input
                        className="form-input-minimal"
                        id="email"
                        name="email"
                        onChange={onChange}
                        placeholder="a.sterling@example.com"
                        required
                        type="email"
                        value={formData.email}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <div className="max-w-xl mx-auto space-y-8">
                <div className="space-y-6">
                  {focusOptions.map((option) => (
                    <label className="flex items-start gap-5 checkbox-group group" key={option.value}>
                      <input
                        checked={formData.supportFocus.includes(option.value)}
                        className="custom-checkbox-step3 mt-1"
                        name="supportFocus"
                        onChange={onFocusToggle}
                        type="checkbox"
                        value={option.value}
                      />
                      <span className="checkbox-label">{option.label}</span>
                    </label>
                  ))}
                  {formData.supportFocus.includes('other') ? (
                    <div className="pl-10">
                      <input
                        className="form-input-minimal text-sm"
                        id="supportFocusOther"
                        name="supportFocusOther"
                        onChange={onChange}
                        placeholder="Please elaborate briefly"
                        type="text"
                        value={formData.supportFocusOther}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="max-w-xl mx-auto space-y-8">
                <div className="space-y-6">
                  <p className="text-background-light font-sans font-light text-lg tracking-wide">
                    Are you currently registered with a GP?
                  </p>
                  <div className="flex gap-12">
                    <label className="flex items-center gap-4 radio-group group cursor-pointer">
                      <input
                        checked={formData.gpRegistered === 'yes'}
                        className="custom-radio"
                        name="gpRegistered"
                        onChange={onChange}
                        type="radio"
                        value="yes"
                      />
                      <span className="radio-label">Yes</span>
                    </label>
                    <label className="flex items-center gap-4 radio-group group cursor-pointer">
                      <input
                        checked={formData.gpRegistered === 'no'}
                        className="custom-radio"
                        name="gpRegistered"
                        onChange={onChange}
                        type="radio"
                        value="no"
                      />
                      <span className="radio-label">No</span>
                    </label>
                  </div>
                </div>
                <div className="pt-4">
                  <label
                    className="block text-background-light font-sans font-light text-sm md:text-base tracking-wide mb-2 opacity-80"
                    htmlFor="gpDetails"
                  >
                    If yes, please provide GP practice name and location
                  </label>
                  <textarea
                    className="form-input-minimal text-sm md:text-base"
                    id="gpDetails"
                    name="gpDetails"
                    onChange={onChange}
                    placeholder="Practice Name, City, Country"
                    rows="3"
                    value={formData.gpDetails}
                  />
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="max-w-xl mx-auto space-y-8">
                <div className="space-y-6">
                  {exclusionOptions.map((option) => (
                    <label
                      className={`flex items-start gap-5 checkbox-group-step5 group cursor-pointer ${
                        option.value === 'none' ? 'pt-4' : ''
                      }`}
                      key={option.value}
                    >
                      <input
                        checked={formData.exclusions.includes(option.value)}
                        className="custom-checkbox-step5"
                        name="exclusions"
                        onChange={onExclusionToggle}
                        type="checkbox"
                        value={option.value}
                      />
                      <span className={`checkbox-label ${option.value === 'none' ? 'font-medium' : ''}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 6 ? (
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
                  {guidanceOptions.map((option) => {
                    const isSelected = formData.guidancePreference === option.value
                    return (
                      <button
                        className={`p-12 rounded-sm flex flex-col items-center text-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-primary scale-105 z-10 shadow-2xl'
                            : 'border border-primary/40 bg-background-dark hover:border-primary'
                        }`}
                        key={option.value}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, guidancePreference: option.value }))
                        }
                        type="button"
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-10 ${
                            isSelected ? 'bg-black/10' : 'bg-white/5'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-3xl ${
                              isSelected ? 'text-cream' : 'text-primary'
                            }`}
                          >
                            {option.icon}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-cream mb-4 tracking-wide">{option.title}</h3>
                        <p
                          className={`text-sm leading-relaxed font-light ${
                            isSelected ? 'text-cream/90' : 'text-cream/60'
                          }`}
                        >
                          {option.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {step === 7 ? (
              <div className="max-w-2xl mx-auto w-full">
                <div className="space-y-6 mb-12">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      checked={formData.ackNotEmergencyService}
                      className="mt-1 h-4 w-4 rounded-sm transition-colors duration-200 bg-transparent border-primary/40 text-primary focus:ring-primary focus:ring-offset-background-dark"
                      name="ackNotEmergencyService"
                      onChange={onChange}
                      type="checkbox"
                    />
                    <span className="text-background-light/90 text-sm md:text-base font-light leading-relaxed group-hover:text-background-light transition-colors">
                      I understand this is not an emergency service
                    </span>
                  </label>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      checked={formData.ackUrgentEscalation}
                      className="mt-1 h-4 w-4 rounded-sm transition-colors duration-200 bg-transparent border-primary/40 text-primary focus:ring-primary focus:ring-offset-background-dark"
                      name="ackUrgentEscalation"
                      onChange={onChange}
                      type="checkbox"
                    />
                    <span className="text-background-light/90 text-sm md:text-base font-light leading-relaxed group-hover:text-background-light transition-colors">
                      I understand I may be advised to escalate to urgent or in-person care if clinically indicated
                    </span>
                  </label>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      checked={formData.ackInvitationOnly}
                      className="mt-1 h-4 w-4 rounded-sm transition-colors duration-200 bg-transparent border-primary/40 text-primary focus:ring-primary focus:ring-offset-background-dark"
                      name="ackInvitationOnly"
                      onChange={onChange}
                      type="checkbox"
                    />
                    <span className="text-background-light/90 text-sm md:text-base font-light leading-relaxed group-hover:text-background-light transition-colors">
                      I understand intake conversations are offered by invitation only
                    </span>
                  </label>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      checked={formData.ackProfessionalBoundaries}
                      className="mt-1 h-4 w-4 rounded-sm transition-colors duration-200 bg-transparent border-primary/40 text-primary focus:ring-primary focus:ring-offset-background-dark"
                      name="ackProfessionalBoundaries"
                      onChange={onChange}
                      type="checkbox"
                    />
                    <span className="text-background-light/90 text-sm md:text-base font-light leading-relaxed group-hover:text-background-light transition-colors">
                      I understand communication occurs within agreed professional boundaries and working hours
                    </span>
                  </label>
                </div>
                <div className="w-full h-px bg-white/10 mb-12" />
                <div className="mb-16">
                  <h2 className="font-display text-2xl text-background-light mb-8 font-normal">Final Confirmation</h2>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      checked={formData.ackInformationAccuracy}
                      className="mt-1 h-4 w-4 rounded-sm transition-colors duration-200 bg-transparent border-primary/40 text-primary focus:ring-primary focus:ring-offset-background-dark"
                      name="ackInformationAccuracy"
                      onChange={onChange}
                      type="checkbox"
                    />
                    <span className="text-background-light/90 text-sm md:text-base font-light leading-relaxed group-hover:text-background-light transition-colors">
                      I confirm that the information provided is accurate to the best of my knowledge.
                    </span>
                  </label>
                </div>
              </div>
            ) : null}

            {status.message ? (
              <p
                className={`text-sm ${
                  status.type === 'success' ? 'text-secondary' : 'text-red-300'
                }`}
                role="status"
              >
                {status.message}
              </p>
            ) : null}

            <div className="pt-8 text-center flex justify-center gap-4">
              {step > 1 ? (
                <button
                  className="group relative px-8 py-4 border border-background-light/30 text-background-light hover:bg-background-light hover:text-charcoal transition-all duration-300"
                  onClick={() => {
                    setStatus({ type: 'idle', message: '' })
                    setStep((prev) => Math.max(1, prev - 1))
                  }}
                  type="button"
                >
                  <span className="text-sm tracking-widest uppercase">Back</span>
                </button>
              ) : null}
              <button
                className="group relative inline-flex items-center justify-center px-12 py-4 border border-background-light text-background-light hover:bg-background-light hover:text-charcoal transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
                type="submit"
              >
                <span className="text-sm tracking-widest uppercase">
                  {step < 7 ? 'Next' : submitting ? 'Submitting...' : 'Request Intake Review'}
                </span>
                {step <= 7 ? (
                  <span className="ml-3 material-symbols-outlined text-base transition-transform duration-500 group-hover:translate-x-1">
                    arrow_right_alt
                  </span>
                ) : null}
              </button>
            </div>
          </form>
          <div className="mt-20 border-t border-background-light/10 pt-8 text-center">
            <p className="text-xs text-background-light/30 leading-relaxed max-w-lg mx-auto">
              DISCLAIMER: Velvet Compass Health is a private medical office providing oversight and coordination. We do
              not provide emergency medical services. In the event of a medical emergency, please dial 999 or your
              local emergency services immediately.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-background-light dark:bg-background-dark border-t border-primary/20 dark:border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <img
              alt="Velvet Compass Health logo"
              className="h-20 md:h-24 w-auto object-contain"
              loading="lazy"
              src="/Logo.svg"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <a
              className="text-xs uppercase tracking-widest text-charcoal/60 dark:text-gray-400 hover:text-primary transition-colors"
              href="#office"
            >
              The Office
            </a>
            <a
              className="text-xs uppercase tracking-widest text-charcoal/60 dark:text-gray-400 hover:text-primary transition-colors"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="text-xs uppercase tracking-widest text-charcoal/60 dark:text-gray-400 hover:text-primary transition-colors"
              href="#about"
            >
              About
            </a>
            <a
              className="text-xs uppercase tracking-widest text-charcoal/60 dark:text-gray-400 hover:text-primary transition-colors"
              href="#access"
            >
              Request Access
            </a>
          </div>
          <div className="text-[10px] text-charcoal/40 dark:text-gray-600 font-light tracking-widest text-center uppercase">
            © {new Date().getFullYear()} Velvet Compass Health. All rights reserved. Private Medical Family Office.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
