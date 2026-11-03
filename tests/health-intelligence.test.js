import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import HealthIntelligencePage from '../src/HealthIntelligencePage.jsx'
import { getProductLane } from '../src/route.js'

const markup = renderToStaticMarkup(createElement(HealthIntelligencePage))
const writtenBrief = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const healthBrief = writtenBrief.split('## Health Intelligence')[1].split('## Athletes')[0]
const contentSections = [...healthBrief.matchAll(/### ([^\n]+)\n\n([^\n]+)/g)]
  .filter(([, heading]) => heading !== 'Visual direction')

describe('VCH Health Intelligence page', () => {
  it('has a dedicated route without changing the existing routes', () => {
    expect(getProductLane('/health-intelligence')).toBe('health-intelligence')
    expect(getProductLane('/health-intelligence/')).toBe('health-intelligence')
    expect(getProductLane('/how-it-works')).toBe('how-it-works')
    expect(getProductLane('/memberarea')).toBe('memberarea')
    expect(getProductLane('/')).toBe('homepage')
  })

  it('preserves the client-written supporting copy for every section', () => {
    expect(contentSections).toHaveLength(8)
    contentSections.forEach(([, , body]) => expect(markup).toContain(body))
    expect(markup).toContain('Intelligence comes from knowing which ones matter.')
    expect(markup).toContain('VCH brings relevant clinical information, personal data')
  })

  it('labels proposed sources and uses distinct contextual artwork without platform logos', () => {
    expect(markup).toContain('Potential source')
    expect(markup).toContain('require confirmation before launch')
    expect(markup).toContain('/vch-approved/health-intelligence/hero-study.jpg')
    expect(markup).toContain('/vch-approved/health-intelligence/signal-study.jpg')
    expect(markup).toContain('/vch-approved/health-intelligence/inheritance-dna-study.webp')
    expect(markup).not.toContain('<img alt="Oura')
  })
})
