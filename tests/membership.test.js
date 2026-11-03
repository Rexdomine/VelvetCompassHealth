import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import MembershipPage from '../src/MembershipPage.jsx'
import HomePage from '../src/HomePage.jsx'
import { getProductLane } from '../src/route.js'

const source = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const membershipSource = source.split(/^## Membership$/m)[1].split(/^## How it works$/m)[0]
const markup = renderToStaticMarkup(createElement(MembershipPage))
const plain = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

describe('Membership page', () => {
  it('has a dedicated route reached from the homepage', () => {
    expect(getProductLane('/membership')).toBe('membership')
    expect(renderToStaticMarkup(createElement(HomePage))).toContain('href="/membership"')
    expect(markup).toContain('aria-current="page"')
  })

  it('preserves the three source tables and their qualifiers', () => {
    const tables = [...membershipSource.matchAll(/^\|(?:.*)\|$/gm)]
    expect(tables.length).toBeGreaterThan(25)
    for (const text of [
      'Who holds the whole picture?',
      'VCH preserves context with appropriately licensed local clinicians',
      'Medical Director’s Office',
      'Within 48 hours',
      'Within 24 hours',
      'Included where appropriate',
      'Included where required',
      'Separately commissioned',
      'Available within bespoke scope',
    ]) {
      expect(membershipSource).toContain(text)
      expect(plain).toContain(text)
    }
    expect(markup.match(/<table/g)).toHaveLength(3)
  })

  it('includes the page-specific still life and all main source sections', () => {
    for (const text of [
      'Protect the person behind everything you are building',
      'The shared VCH foundation',
      'The future of your health, brought into view',
      'The right intervention, not the most intervention',
      'A considered fit',
      'Explore Athletes',
      'Explore International Students',
    ]) expect(plain).toContain(text)
    expect(markup).toContain('/vch-approved/membership/proportionate-care-still-life.jpg')
    expect(markup).toContain('/vch-approved/membership/stewardship-life-v2.jpg')
    expect(markup).not.toContain('portfolio-folio')
  })
})
