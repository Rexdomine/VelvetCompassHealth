import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import InternationalCarePage from '../src/InternationalCarePage.jsx'
import { getProductLane } from '../src/route.js'

const markup = renderToStaticMarkup(createElement(InternationalCarePage))

describe('International Care', () => {
  it('has a dedicated route and navigation', () => {
    expect(getProductLane('/international-care')).toBe('international-care')
    expect(markup).toContain('aria-current="page"')
    expect(markup).toContain('href="/international-care"')
  })

  it('preserves the client journey and local clinical responsibility', () => {
    for (const heading of ['Before care in another location', 'During the episode of care', 'After the appointment or treatment']) {
      expect(markup).toContain(heading)
    }
    expect(markup).toContain('local clinical responsibility remain with appropriately licensed professionals')
    expect(markup).toContain('does not replace local medical assessment or local regulatory requirements')
    expect(markup).toContain('does not mean that it is a VCH partner, guarantees access or endorses VCH')
  })

  it('uses distinct page-specific artwork', () => {
    expect(markup).toContain('/vch-approved/international-care/portolan-gallery-v2.webp')
    expect(markup).toContain('/vch-approved/international-care/continuity-digital-folio-v3.webp')
    expect(markup).not.toContain('vch-care-across-borders.png')
  })
})
