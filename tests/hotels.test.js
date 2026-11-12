import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import HotelsPage from '../src/HotelsPage.jsx'
import { getProductLane } from '../src/route.js'

const markup = renderToStaticMarkup(createElement(HotelsPage))

describe('Hotels page', () => {
  it('has its own route, hotel audience, artwork and partnership action', () => {
    expect(getProductLane('/hotels')).toBe('hotels')
    expect(markup).toContain('VCH for hotels')
    expect(markup).toContain('A doctor to the room,')
    expect(markup).toContain('/vch-approved/hotels/hotel-arrival.jpg')
    expect(markup).toContain('href="#hotel-partnership-form"')
    expect(markup).toContain('aria-current="page"')
  })

  it('preserves the four client-specified steps and price conditions', () => {
    for (const step of ['The concierge desk calls', 'The doctor comes to the room', 'Medicines delivered. Blood tests in the room.', 'The guest knows what follows']) {
      expect(markup).toContain(step)
    }
    expect(markup).toContain('£500')
    expect(markup).toContain('£600')
    expect(markup).toContain('Paid directly by the guest. No fee to the hotel.')
    expect(markup).toContain('Blood tests, medicines and delivery are charged separately')
    expect(markup).toContain('Day and night consultation hours to be confirmed')
    expect(markup).not.toContain('guaranteed arrival')
    expect(markup).not.toContain('specialist referrals')
  })

  it('limits the enquiry to the six partnership fields and enables submission', () => {
    for (const field of ['name', 'hotel', 'role', 'email', 'phone', 'message']) {
      expect(markup).toContain(`name="${field}"`)
    }
    expect(markup).toContain('This form is for partnership enquiries only, not individual guest-care requests.')
    expect(markup).toContain('type="submit"')
    expect(markup).not.toContain('type="submit" disabled=""')
    expect(markup).not.toContain('No enquiry will be sent.')
    expect(markup).toContain('For medical emergencies, contact the emergency services immediately.')
    expect(markup).not.toContain('href="tel:')
  })
})
