import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import InternationalStudentsPage from '../src/InternationalStudentsPage.jsx'
import MembershipPage from '../src/MembershipPage.jsx'
import MembershipNavItem from '../src/features/site-navigation/MembershipNavItem.jsx'
import { getProductLane } from '../src/route.js'

const source = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const pageSource = source.split(/^## International Students$/m)[1].split(/^## About VCH$/m)[0]
const markup = renderToStaticMarkup(createElement(InternationalStudentsPage))
const plain = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

describe('International Students membership page', () => {
  it('exposes the Membership child pages behind a visible mobile disclosure', () => {
    const menu = renderToStaticMarkup(createElement(MembershipNavItem, { mobile: true }))
    expect(menu).toContain('<summary aria-label="Membership submenu">')
    expect(menu).toContain('3 pages')
    expect(menu).toContain('href="/membership"')
    expect(menu).toContain('href="/membership/athletes"')
    expect(menu).toContain('href="/membership/international-students"')
  })

  it('has a dedicated route and is linked from Membership', () => {
    expect(getProductLane('/membership/international-students')).toBe('international-students')
    expect(getProductLane('/membership/international-students/')).toBe('international-students')
    expect(renderToStaticMarkup(createElement(MembershipPage))).toContain('href="/membership/international-students"')
    expect(markup).toContain('aria-current="page"')
  })

  it('retains the source journey and urgent-care boundary', () => {
    for (const heading of [
      'Assurance, not just insurance.',
      'Cover is only the beginning.',
      'Healthcare in a new country can be difficult to navigate',
      'What the membership is designed to provide',
      'When the student is well',
      'When something changes',
      'When care becomes more complex',
      'Peace of mind, wherever home is',
      'When urgent help is needed',
      'Begin with a family conversation',
    ]) {
      expect(pageSource).toContain(heading)
      expect(plain).toContain(heading)
    }
    expect(markup.match(/<li>/g)).toHaveLength(8)
    expect(plain).toContain('VCH is not an emergency service.')
    expect(plain).toContain('call 999 or attend the nearest emergency department')
    expect(markup).toContain('type=International%20Students')
  })
})
