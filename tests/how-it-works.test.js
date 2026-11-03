import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import HowItWorksPage from '../src/HowItWorksPage.jsx'
import { getProductLane } from '../src/route.js'

const source = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const markup = renderToStaticMarkup(createElement(HowItWorksPage))
const journeySource = source.split('### The nine-part member journey')[1].split('### Urgent and emergency care')[0]
const sourceSteps = [...journeySource.matchAll(/### ([1-9])\. ([^\n]+)\n\n([^\n]+)/g)]

describe('VCH How it works page', () => {
  it('has its own route while preserving the homepage and member area', () => {
    expect(getProductLane('/how-it-works')).toBe('how-it-works')
    expect(getProductLane('/how-it-works/')).toBe('how-it-works')
    expect(getProductLane('/')).toBe('homepage')
    expect(getProductLane('/memberarea')).toBe('memberarea')
  })

  it('carries all nine client-written journey moments and their full supporting copy', () => {
    expect(sourceSteps).toHaveLength(9)
    expect(markup.match(/class="how-step"/g)).toHaveLength(9)
    sourceSteps.forEach(([, , heading, body]) => {
      expect(markup).toContain(heading)
      expect(markup).toContain(body)
    })
  })

  it('retains the top-of-page proposition, navigation explanation and emergency boundary', () => {
    expect(markup).toContain('Your own doctor.')
    expect(markup).toContain('A strategy that')
    expect(markup).toContain('The purpose of a compass is not to choose the destination for you.')
    expect(markup).toContain('VCH supports navigation and continuity but is not an emergency service.')
    expect(markup).toContain('appropriate local emergency services when abroad')
    expect(markup).toContain('href="/how-it-works"')
  })
})
