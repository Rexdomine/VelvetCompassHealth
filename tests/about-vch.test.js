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
      .filter(([, heading]) => heading !== 'Visual direction')
    expect(sections).toHaveLength(6)
    for (const [, heading, body] of sections) {
      expect(plain).toContain(heading)
      expect(plain).toContain(body)
    }
    expect(markup).toContain('A private members’')
    expect(markup).toContain('Velvet Compass Health was created to manage health as a living, changing whole')
  })

  it('uses the real VCH portrait and distinct page artwork', () => {
    expect(markup).toContain('/vch-approved/about-vch/dr-ehizele-joseph-ebare.webp')
    expect(markup).toContain('/vch-approved/about-vch/long-view-hero.webp')
    expect(markup).toContain('/vch-approved/about-vch/workshop-observation.webp')
    expect(markup).toContain('Information is handled discreetly and shared only through appropriate, consent-based clinical processes or where the law requires otherwise.')
  })
})
