import HomePage from './HomePage.jsx'
import MemberEmergencyPage from './MemberEmergencyPage.jsx'
import { getProductLane } from './route.js'

function App() {
  return getProductLane(window.location.pathname) === 'memberarea'
    ? <MemberEmergencyPage />
    : <HomePage />
}

export default App
