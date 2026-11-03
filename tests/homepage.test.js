import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import HomePage from '../src/HomePage.jsx'
import { getProductLane } from '../src/route.js'

const markup = renderToStaticMarkup(createElement(HomePage))
const approvedMap = readFileSync(new URL('../public/vch-approved/vch-care-across-borders.png', import.meta.url))

describe('VCH homepage', () => {
  it('keeps the separate member area route intact', () => {
    expect(getProductLane('/')).toBe('homepage')
    expect(getProductLane('/memberarea')).toBe('memberarea')
  })

  it('uses the approved proposition, section sequence and medical boundary', () => {
    const ids = [...markup.matchAll(/<section[^>]*id="([^"]+)"/g)].map((match) => match[1])
    expect(ids).toEqual(['home', 'continuity', 'oversight', 'compass', 'membership', 'intelligence', 'borders', 'enquire'])
    expect(markup).toContain('The science of health strategy.')
    expect(markup).toContain('The art of medicine made personal.')
    expect(markup).toContain('Each member has their own designated physician')
    expect(markup).toContain('VCH is not an emergency service.')
    expect(markup).toContain('appropriate locally licensed clinicians')
  })

  it('retains the client-approved corrected map artwork', () => {
    const hash = createHash('sha256').update(approvedMap).digest('hex')
    expect(hash).toBe('b0cd71a8849984adafd2ff7575c384d9bebc855a3d656b573e8b27512834a599')
    expect(markup).toContain('/vch-approved/vch-care-across-borders.png')
    expect(markup).toContain('/vch-approved/vch-generations-folio.png')
  })

  it('provides usable local navigation and a direct private enquiry action', () => {
    expect(markup).toContain('aria-label="Primary navigation"')
    expect(markup).toContain('aria-label="Mobile navigation"')
    expect(markup).toContain('href="/membership"')
    expect(markup).toContain('href="/international-care"')
    expect(markup).toContain('href="/enquire"')
  })

  it('plays the supplied arrival film silently on a loop without visible playback controls or artwork captions', () => {
    expect(markup).toMatch(/<video[^>]*autoPlay[^>]*loop[^>]*muted[^>]*playsInline/)
    expect(markup).toContain('/vch-approved/vch-arrival-film.mp4')
    expect(markup).not.toContain('<figcaption')
    expect(markup).not.toContain('Pause film')
    expect(markup).not.toContain('Replay film')
  })
})
