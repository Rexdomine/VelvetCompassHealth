import { MEMBER_AREA_ROUTE } from './memberEmergencyProfile.js'

export function getProductLane(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === MEMBER_AREA_ROUTE) return 'memberarea'
  if (path === '/how-it-works') return 'how-it-works'
  if (path === '/health-intelligence') return 'health-intelligence'
  if (path === '/clinical-network') return 'clinical-network'
  if (path === '/international-care') return 'international-care'
  if (path === '/about-vch') return 'about-vch'
  if (path === '/membership') return 'membership'
  if (path === '/membership/athletes') return 'athletes'
  if (path === '/membership/international-students') return 'international-students'
  if (path === '/enquire') return 'enquire'
  return 'homepage'
}
