import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import AboutPage from '../src/AboutPage.jsx'
import HomePage from '../src/HomePage.jsx'
import { getProductLane } from '../src/route.js'

const source = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const aboutSource = source.split('## About VCH')[1].split('## Insights')[0]
const markup = renderToStaticMarkup(createElement(AboutPage))
const plain = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

describe('About VCH page', () => {
  it('opens as a dedicated route from the homepage', () => {
    expect(getProductLane('/about-vch')).toBe('about-vch')
    expect(renderToStaticMarkup(createElement(HomePage))).toContain('href="/about-vch"')
    expect(markup).toContain('aria-current="page"')
  })

  it('retains all client-written sections and full supporting copy', () => {
    const sections = [...aboutSource.matchAll(/### ([^\n]+)\n\n([^\n]+)/g)]
      .filter(([, heading]) => heading !== 'Visual direction' && heading !== 'Medical direction')
    expect(sections).toHaveLength(5)
    for (const [, heading, body] of sections) {
      expect(plain).toContain(heading)
      expect(plain).toContain(body)
    }
    expect(markup).toContain('A private members’')
    expect(markup).toContain('Velvet Compass Health was created to manage health as a living, changing whole')
  })

  it('keeps the updated biographies with Rex’s latest director portrait and Adel portrait', () => {
    expect(markup).toContain('/vch-approved/about-vch/dr-ehizele-portrait-nov-2026.jpg')
    expect(markup).toContain('/vch-approved/about-vch/adel-samat.jpg')
    expect(markup).toContain('class="av-person av-person--director"')
    expect(markup).toContain('class="av-person av-person--adel"')
    expect(plain).toContain('Dr Ehizele Ijeoma Joseph-Ebare Medical Director')
    expect(plain).toContain('A published researcher, invited UK Parliament speaker and former COVID Medicines Delivery Unit lead clinician')
    expect(plain).toContain('Adel Samat Head of East Asia Clientele')
    expect(plain).toContain('He also holds a medical degree completed in China.')
    expect(markup).toContain('/vch-approved/about-vch/long-view-hero.webp')
    expect(markup).toContain('/vch-approved/about-vch/workshop-observation.webp')
    expect(markup).toContain('Information is handled discreetly and shared only through appropriate, consent-based clinical processes or where the law requires otherwise.')
  })
})
