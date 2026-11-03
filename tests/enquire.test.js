import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import EnquirePage from '../src/EnquirePage.jsx'
import { validateStep } from '../src/features/enquire/validation.js'
import { getProductLane } from '../src/route.js'

describe('Enquire page', () => {
  it('has a dedicated route and presents the client opening with the emergency boundary', () => {
    expect(getProductLane('/enquire')).toBe('enquire')
    const markup = renderToStaticMarkup(createElement(EnquirePage))
    expect(markup).toContain('Your health deserves more than appointments.')
    expect(markup).toContain('Step 01')
    expect(markup).toContain('Velvet Compass Health is not an emergency service.')
    expect(markup).toContain('I confirm that this is not an emergency')
  })

  it('keeps contact details, enquiry purpose, message and urgent screening required for progression', () => {
    const values = {
      emergencyConfirmed: true,
      fullName: 'Example Visitor',
      email: 'example@example.com',
      location: 'London',
      contactMethod: 'Telephone',
      phone: '',
      enquiryType: 'Individual or family membership',
      supportFocus: ['health-oversight'],
      message: 'I would like to understand the membership model.',
      gpRegistered: 'no',
      exclusions: ['none'],
      guidancePreference: 'direct',
    }
    expect(validateStep(2, values)).toContain('telephone number')
    values.phone = '07000000000'
    expect(validateStep(2, values)).toBe('')
    values.message = ''
    expect(validateStep(3, values)).toContain('short message')
    values.message = 'I would like to understand the membership model.'
    values.exclusions = ['chest-pain']
    expect(validateStep(5, values)).toContain('urgent or emergency care')
  })
})
