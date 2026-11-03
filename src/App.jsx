import HomePage from './HomePage.jsx'
import HowItWorksPage from './HowItWorksPage.jsx'
import HealthIntelligencePage from './HealthIntelligencePage.jsx'
import ClinicalNetworkPage from './ClinicalNetworkPage.jsx'
import InternationalCarePage from './InternationalCarePage.jsx'
import AboutPage from './AboutPage.jsx'
import MembershipPage from './MembershipPage.jsx'
import EnquirePage from './EnquirePage.jsx'
import MemberEmergencyPage from './MemberEmergencyPage.jsx'
import { getProductLane } from './route.js'

function App() {
  const lane = getProductLane(window.location.pathname)
  if (lane === 'memberarea') return <MemberEmergencyPage />
  if (lane === 'how-it-works') return <HowItWorksPage />
  if (lane === 'health-intelligence') return <HealthIntelligencePage />
  if (lane === 'clinical-network') return <ClinicalNetworkPage />
  if (lane === 'international-care') return <InternationalCarePage />
  if (lane === 'about-vch') return <AboutPage />
  if (lane === 'membership') return <MembershipPage />
  if (lane === 'enquire') return <EnquirePage />
  return <HomePage />
}

export default App
