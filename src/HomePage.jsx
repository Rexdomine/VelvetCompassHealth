import './features/homepage/homepage.css'

export default function HomePage() {
  return (
<main className="homepage" id="main-content">
      <svg className="trajectory" viewBox="0 0 1440 8400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M40 1060 C40 1370 40 1660 40 1948 L1390 1948 L1390 2968 L40 2968 L40 3840 C40 3930 240 3970 360 3970 L520 3970 C600 3970 600 4030 680 4030 L800 4030 C880 4030 880 3970 960 3970 L1120 3970 C1220 3970 1220 3288 1324 3288 L1324 5138 L92 5138 L92 6148 L1324 6148 L1324 7270 L110 7270 L110 7860 C110 8020 310 8058 684 8058" />
        <g className="compass-nodes">
          <circle cx="360" cy="3970" r="6" />
          <circle cx="600" cy="4008" r="6" />
          <circle cx="880" cy="4008" r="6" />
          <circle cx="1120" cy="3970" r="6" />
        </g>
        <circle className="end-node" cx="684" cy="8058" r="7" />
      </svg>

      <section className="review-sheet hero" id="home">
        <header className="site-header">
          <a className="skip-link" href="#continuity">Skip to main content</a>
          <a className="brand" href="#home" aria-label="Velvet Compass Health home">
            <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="/membership">Membership</a>
            <a href="/how-it-works">How it works</a>
            <a href="/health-intelligence">Health Intelligence</a>
            <a href="/clinical-network">Clinical Network</a>
            <a href="/international-care">International Care</a>
            <a href="/about-vch">About VCH</a>
            <a className="nav-enquire" href="/enquire">Enquire</a>
          </nav>

          <details className="mobile-navigation" onKeyDown={(event) => {
            if (event.key === 'Escape') event.currentTarget.open = false
          }}>
            <summary aria-label="Navigation menu"><span></span><span></span><span></span><b>Menu</b></summary>
            <nav aria-label="Mobile navigation" onClick={(event) => {
              if (event.target.closest('a')) event.currentTarget.parentElement.open = false
            }}>
              <a href="#home">Home</a><a href="/membership">Membership</a><a href="/how-it-works">How it works</a><a href="/health-intelligence">Health Intelligence</a><a href="/clinical-network">Clinical Network</a><a href="/international-care">International Care</a><a href="/about-vch">About VCH</a><a href="/enquire">Enquire</a>
            </nav>
          </details>
        </header>
        <div className="hero-still" role="img" aria-label="Illustrative arrival scene at a private entrance"></div>
        <video
          className="hero-film"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/vch-approved/vch-cinematic-arrival-hero.png"
          aria-label="Cinematic arrival at a private medical office"
        >
          <source src="/vch-approved/vch-arrival-film.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
        </video>
        <div className="hero-veil"></div>
        <div className="hero-copy">
          <p className="eyebrow light">Private members’ medical office</p>
          <h1>The science of health strategy.<br /><em>The art of medicine made personal.</em></h1>
          <p>Velvet Compass Health is a private members’ medical office. Each member has their own designated physician to oversee the whole health picture over time, bringing together prevention, longevity, specialist expertise and care across borders.</p>
          <div className="actions">
            <a className="button button-light" href="/membership">Explore Membership</a>
            <a className="button button-ghost" href="/enquire">Enquire Privately</a>
          </div>
        </div>
      </section>

      <section className="review-sheet continuity" id="continuity">
        <div className="sheet-index"><span>01</span><span>The longer view</span></div>
        <div className="continuity-title">
          <p className="eyebrow">Your own doctor. The whole picture. Over time.</p>
          <h2>Your own doctor.<br />The whole picture.<br /><em>Over time.</em></h2>
        </div>
        <div className="continuity-copy">
          <p>Most healthcare is organised around moments: a symptom, a test, an appointment or a diagnosis. Your health is not. It is changing quietly between those moments.</p>
          <p>Every VCH member has a designated physician responsible for the longer view, supported by the wider medical office and its network. We understand your baseline, follow the direction of change, bring in the right expertise and keep each decision connected to the life you want your health to support.</p>
        </div>
        <figure className="artwork artwork-continuity">
          <img loading="lazy" src="/vch-approved/vch-gallery-continuity.png" alt="A silver-haired woman walks past an anatomy-inspired artwork in a sunlit gallery setting" />
        </figure>
      </section>

      <section className="review-sheet oversight" id="oversight">
        <div className="sheet-index"><span>02</span><span>Risk and oversight</span></div>
        <figure className="artwork artwork-anatomy">
          <img loading="lazy" src="/vch-approved/vch-anatomical-oversight.png" alt="Conceptual anatomical art study of the shoulder and upper back" />
        </figure>
        <div className="risk-copy">
          <p className="eyebrow">The risk you cannot see</p>
          <h2>The risk you cannot see<br /><em>is still moving</em></h2>
          <p>Feeling well does not mean that nothing is changing. Ageing, metabolism, cardiovascular risk, cognition, bone and joint health, sleep, recovery and hormonal health can all move long before they become an obvious problem.</p>
          <p>VCH is designed to make those moving parts visible. We look beyond a single annual screen to patterns, risk, function and direction over time, then turn what matters into a considered health strategy.</p>
        </div>
        <div className="access-copy">
          <p className="eyebrow">Access is not the same as oversight</p>
          <h3>Access is not the same as oversight</h3>
          <div className="access-columns">
            <p>Modern healthcare can offer exceptional doctors, hospitals and diagnostics, yet still leave the individual carrying the burden of connecting them. Each clinician may answer their part of the question while nobody remains responsible for the whole.</p>
            <p>VCH provides that responsibility. Information is not merely accumulated. It is interpreted, connected, acted upon and reviewed.</p>
          </div>
          <div className="oversight-sequence" aria-label="VCH interprets, connects, acts and reviews">
            <span>Interpret</span><i></i><span>Connect</span><i></i><span>Act</span><i></i><span>Review</span>
          </div>
        </div>
      </section>

      <section className="review-sheet compass" id="compass">
        <div className="compass-art" role="img" aria-label="An original Renaissance-inspired folio about medicine, direction and the long view"></div>
        <div className="compass-wash"></div>
        <div className="sheet-index"><span>03</span><span>The VCH Compass</span></div>
        <div className="compass-heading">
          <p className="eyebrow">The VCH Compass</p>
          <h2>The VCH<br /><em>Compass</em></h2>
          <p>A four-part approach with one purpose: to protect the health that carries your life forward.</p>
        </div>
        <div className="compass-points">
          <article><span>I</span><h3>Look ahead</h3><p>Bring developing risk, relevant advances and what comes next into view.</p></article>
          <article><span>II</span><h3>Build health</h3><p>Turn insight into a personal strategy for greater strength, function, energy and healthy longevity.</p></article>
          <article><span>III</span><h3>Carry the complexity</h3><p>Coordinate records, clinicians, tests, decisions and follow-up so the member does not have to.</p></article>
          <article><span>IV</span><h3>Protect the future</h3><p>Safeguard the person behind the responsibilities, achievements and life still being built.</p></article>
        </div>
        <a className="text-link" href="/how-it-works">Member journey</a>
      </section>

      <section className="review-sheet membership" id="membership">
        <div className="sheet-index"><span>04</span><span>Membership</span></div>
        <div className="membership-heading">
          <p className="script-accent">Membership</p>
          <h2>For people who think in generations,<br /><em>not appointments.</em></h2>
        </div>
        <div className="membership-copy">
          <p>Membership is an ongoing medical relationship, not a collection of disconnected encounters. Gold, Executive, Medical Director’s Office and International Students offer different levels of access, proactivity and oversight around the same principle: someone remains responsible for the whole picture.</p>
          <a className="text-link" href="/membership">Explore Membership</a>
        </div>
        <div className="membership-levels" aria-label="Membership levels">
          <span><b>01</b>Gold</span>
          <span><b>02</b>Executive</span>
          <span><b>03</b>Medical Director’s Office</span>
          <span><b>04</b>International Students</span>
        </div>
        <figure className="artwork artwork-generations">
          <img loading="lazy" src="/vch-approved/vch-generations-folio.png" alt="A continuous medical-art life study progressing from childhood through middle age to older age" />
        </figure>
      </section>

      <section className="review-sheet intelligence" id="intelligence">
        <div className="sheet-index"><span>05</span><span>Health intelligence</span></div>
        <figure className="artwork artwork-intelligence">
          <img loading="lazy" src="/vch-approved/vch-health-intelligence-sculpture.png" alt="A conceptual paper sculpture joining anatomy, botany and measured lines" />
        </figure>
        <div className="intelligence-panel">
          <p className="eyebrow">Prevention, longevity and health intelligence</p>
          <h2>Prevention, longevity<br /><em>and health intelligence</em></h2>
          <p>VCH brings together relevant history, investigations, specialist opinion and selected health data to understand risk and function over time. Where clinically appropriate and available through suitable providers, this may include advanced diagnostics, genomics or pharmacogenomic insight. The purpose is not more testing. It is better decisions, made with context.</p>
          <div className="evidence-line"><span>Relevant history</span><span>Investigations</span><span>Specialist opinion</span><span>Selected health data</span></div>
          <a className="text-link" href="/health-intelligence">Explore Health Intelligence</a>
        </div>
      </section>

      <section className="review-sheet borders" id="borders">
        <div className="sheet-index"><span>06</span><span>Continuity across locations</span></div>
        <figure className="artwork artwork-borders">
          <img loading="lazy" src="/vch-approved/vch-care-across-borders.png" alt="A silver-haired traveler studies a pinned medical-art navigation map beside an unbranded ribbed travel case" />
        </figure>
        <div className="borders-panel">
          <p className="eyebrow">Continuity across locations</p>
          <h2>Care across borders</h2>
          <p>When care moves between doctors, institutions or countries, the wider picture can be lost. VCH helps members prepare, coordinate records, identify appropriate locally licensed clinicians and maintain follow-up across borders.</p>
          <div className="border-sequence" aria-label="Prepare, coordinate records and maintain follow-up">
            <span><b>01</b>Prepare</span><i></i><span><b>02</b>Coordinate records</span><i></i><span><b>03</b>Maintain follow-up</span>
          </div>
          <a className="text-link" href="/international-care">Explore International Care</a>
        </div>
      </section>

      <section className="review-sheet invitation" id="enquire">
        <div className="sheet-index"><span>07</span><span>A private invitation</span></div>
        <div className="invitation-copy">
          <p className="script-accent">A private invitation</p>
          <h2>A private invitation</h2>
          <p>Membership begins with a confidential conversation about the support required, whether VCH is suitable and which level of membership best fits the individual or family.</p>
          <a className="button button-burgundy" href="/enquire">Enquire Privately</a>
        </div>
        <div className="closing-mark" aria-hidden="true"><span>N</span><i></i><span>Long view</span></div>
        <footer>
          <img src="/vch-approved/vch-logo.png" alt="Velvet Compass Health" />
          <p>VCH is not an emergency service. In the United Kingdom, call 999 or attend the nearest emergency department for an emergency. Outside the United Kingdom, contact the local emergency services.</p>
          <nav aria-label="Footer navigation"><a href="#home">Home</a><a href="/membership">Membership</a><a href="/health-intelligence">Health Intelligence</a><a href="/enquire">Enquire</a></nav>
        </footer>
      </section>
    </main>
  )
}
