import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { getProductLane } from '../src/route.js'

const homepageSource = readFileSync(new URL('../src/HomePage.jsx', import.meta.url), 'utf8')
const headerSource = readFileSync(new URL('../src/components/SiteHeader.jsx', import.meta.url), 'utf8')
const stylesSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
const indexSource = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const composedSource = `${homepageSource}\n${headerSource}`

describe('public homepage milestone', () => {
  it('keeps the member area in its own product lane', () => {
    expect(getProductLane('/')).toBe('homepage')
    expect(getProductLane('/memberarea')).toBe('memberarea')
    expect(getProductLane('/memberarea/')).toBe('memberarea')
    expect(getProductLane('/membership')).toBe('homepage')
  })

  it('presents the approved proposition and public safety boundaries', () => {
    expect(homepageSource).toMatch(/A life, understood.*over time\./)
    expect(homepageSource).toContain('VCH is not an emergency service')
    expect(homepageSource).toMatch(/999\/112/)
    expect(homepageSource).toContain('does not replace your GP or specialist')
  })

  it('uses working homepage anchors and semantic landmarks', () => {
    for (const id of ['continuity', 'how-it-works', 'intelligence', 'international', 'medical-director', 'contact']) {
      expect(homepageSource).toContain(`id="${id}"`)
      expect(homepageSource).toContain(`href="#${id}"`)
    }

    expect(composedSource).toContain('<header')
    expect(composedSource).toContain('<nav')
    expect(composedSource).toContain('<main')
    expect(composedSource).toContain('<footer')
    expect(homepageSource).toContain('className="skip-link"')
  })

  it('uses the supplied art-directed media with a reduced-motion fallback contract', () => {
    expect(homepageSource).toContain('src="/media/vch-living-compass-desktop.webm" type="video/webm"')
    expect(homepageSource).toContain('/media/vch-living-compass-desktop.mp4')
    expect(homepageSource).toContain('/media/vch-living-compass-desktop.webp')
    expect(homepageSource).toContain('/media/vch-living-compass-mobile.webp')
    expect(homepageSource).toContain('media="(min-width: 769px) and (prefers-reduced-motion: no-preference)"')
    expect(homepageSource).toContain('preload="metadata"')
    expect(homepageSource).toContain('muted')
    expect(homepageSource).toContain('playsInline')
    expect(homepageSource).not.toMatch(/<video[^>]*\sposter=/)
    expect(stylesSource).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('discovers critical local fonts and viewport-specific hero art in initial HTML', () => {
    expect(indexSource).not.toMatch(/fonts\.(?:googleapis|gstatic)\.com/)

    for (const font of [
      '/fonts/playfair-display-latin.woff2',
      '/fonts/playfair-display-italic-latin.woff2',
      '/fonts/raleway-latin.woff2',
    ]) {
      expect(indexSource).toContain(`rel="preload" href="${font}" as="font" type="font/woff2" crossorigin`)
    }

    expect(indexSource).toContain('rel="preload" href="/media/vch-living-compass-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" fetchpriority="high"')
    expect(indexSource).toContain('rel="preload" href="/media/vch-living-compass-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" fetchpriority="high"')
    expect(indexSource).toContain('rel="preload" href="/logo-header.webp" as="image" type="image/webp"')
  })

  it('defines the locally hosted font families with swap rendering', () => {
    expect(stylesSource).toMatch(/@font-face\s*{[^}]*font-family:\s*"Playfair Display";[^}]*src:\s*url\("\/fonts\/playfair-display-latin\.woff2"\) format\("woff2"\);[^}]*font-style:\s*normal;[^}]*font-weight:\s*400 600;[^}]*font-display:\s*swap;/s)
    expect(stylesSource).toMatch(/@font-face\s*{[^}]*font-family:\s*"Playfair Display";[^}]*src:\s*url\("\/fonts\/playfair-display-italic-latin\.woff2"\) format\("woff2"\);[^}]*font-style:\s*italic;[^}]*font-weight:\s*400;[^}]*font-display:\s*swap;/s)
    expect(stylesSource).toMatch(/@font-face\s*{[^}]*font-family:\s*Raleway;[^}]*src:\s*url\("\/fonts\/raleway-latin\.woff2"\) format\("woff2"\);[^}]*font-style:\s*normal;[^}]*font-weight:\s*300 600;[^}]*font-display:\s*swap;/s)
  })

  it('uses optimized homepage logos without changing the member-area asset contract', () => {
    expect(headerSource).toContain('src="/logo-header.webp"')
    expect(homepageSource).toContain('src="/logo-footer.webp"')
    expect(composedSource).not.toMatch(/src="\/logo-(?:header|footer)\.png"/)
  })

  it('includes the visible scroll-cue text in its accessible name', () => {
    expect(homepageSource).toMatch(/className="scroll-cue"[^>]*aria-label="[^"]*Explore[^"]*"/)
  })

  it('does not expose the legacy clinical enquiry form on the homepage', () => {
    expect(homepageSource).not.toContain('/api/enquiries')
    expect(homepageSource).not.toContain('gpRegistered')
    expect(homepageSource).not.toContain('exclusions')
    expect(homepageSource).toContain('mailto:office@velvetcompasshealth.com')
  })

  it('uses dedicated accessible eyebrow colors on light and navy surfaces', () => {
    expect(stylesSource).toContain('--bronze-text: #825b32;')
    expect(stylesSource).toMatch(/\.eyebrow\s*\{[^}]*color:\s*var\(--bronze-text\)/)
    expect(stylesSource).toMatch(/\.intelligence-section \.eyebrow\s*\{[^}]*color:\s*#c49a6c/)
  })
})
