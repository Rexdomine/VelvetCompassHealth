import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import ClinicalNetworkPage from '../src/ClinicalNetworkPage.jsx'
import { getProductLane } from '../src/route.js'

const markup = renderToStaticMarkup(createElement(ClinicalNetworkPage))
const writtenBrief = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const clinicalBrief = writtenBrief.split('## Clinical Network')[1].split('## International Care')[0]
const rosterRows = [...clinicalBrief.matchAll(/^\| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)]
  .filter(([, area]) => area !== 'Area' && !area.startsWith('---'))

describe('VCH Clinical Network page', () => {
  it('has a dedicated route and leaves prior routes intact', () => {
    expect(getProductLane('/clinical-network')).toBe('clinical-network')
    expect(getProductLane('/clinical-network/')).toBe('clinical-network')
    expect(getProductLane('/health-intelligence')).toBe('health-intelligence')
    expect(getProductLane('/how-it-works')).toBe('how-it-works')
    expect(getProductLane('/')).toBe('homepage')
  })

  it('preserves the written headline and seven original draft roster identities', () => {
    expect(markup).toContain('World-class expertise,')
    expect(markup).toContain('VCH brings selected clinicians into the member’s care')
    expect(markup).toContain('Exceptional expertise.')
    expect(rosterRows).toHaveLength(7)
    rosterRows.forEach(([, , name]) => {
      expect(markup).toContain(name.trim() === 'Dr Mark Ridgwell' ? 'Dr Mark Ridgewell' : name.trim())
    })
  })

  it('uses the supplied deck write-ups and the added clinician portrait', () => {
    expect(markup).not.toContain('Clinical network preview.')
    expect(markup).toContain('Ranjan Suri')
    expect(markup).toContain('Great Ormond Street Hospital')
    expect(markup).toContain('President, European Society for Gynaecological Endoscopy')
    expect(markup).toContain('Former England cricket doctor')
    expect(markup).toContain('Dr Joseph Nunoo-Mensah')
    expect(markup).toContain('Colorectal &amp; robotic surgery')
    expect(markup).toContain('Head of Colorectal Surgery, King’s College Hospital')
    expect(markup.match(/class="cn-profile-portrait"/g)).toHaveLength(9)
    expect(markup.match(/\.webp" alt="Portrait of /g)).toHaveLength(9)
    expect(markup).toContain('/vch-approved/clinical-network/network-gallery-v2.webp')
    expect(markup).toContain('/vch-approved/clinical-network/bound-perspectives-v2.webp')
    expect(markup).not.toContain('institutional-logo')
  })
})
