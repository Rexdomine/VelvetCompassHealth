import { MEMBER_AREA_ROUTE } from './memberEmergencyProfile.js'

export function getProductLane(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return path === MEMBER_AREA_ROUTE ? 'memberarea' : 'homepage'
}
