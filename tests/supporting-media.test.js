import { statSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const homepageSource = readFileSync(new URL('../src/HomePage.jsx', import.meta.url), 'utf8')
const mediaSource = readFileSync(new URL('../src/components/SupportingMedia.jsx', import.meta.url), 'utf8')

const moments = [
  {
    name: 'health intelligence',
    asset: 'vch-health-intelligence',
  },
  {
    name: 'international continuity',
    asset: 'vch-international-continuity',
  },
]

describe('homepage supporting media contract', () => {
  it.each(moments)('keeps an optimized poster and WebM/MP4 sources for $name', ({ asset }) => {
    const poster = statSync(new URL(`../public/media/${asset}.webp`, import.meta.url))
    const webm = statSync(new URL(`../public/media/${asset}.webm`, import.meta.url))
    const mp4 = statSync(new URL(`../public/media/${asset}.mp4`, import.meta.url))

    expect(poster.size).toBeLessThan(100 * 1024)
    expect(webm.size).toBeLessThan(1024 * 1024)
    expect(mp4.size).toBeLessThan(1024 * 1024)
    expect(homepageSource).toContain(`poster="/media/${asset}.webp"`)
    expect(homepageSource).toContain(`webm="/media/${asset}.webm"`)
    expect(homepageSource).toContain(`mp4="/media/${asset}.mp4"`)
  })

  it('renders the poster independently of video activation', () => {
    expect(mediaSource).toMatch(/<img[^>]+src=\{poster\}[^>]+alt=""/s)
    expect(mediaSource).toContain('aria-hidden="true"')
    expect(mediaSource).toMatch(/\{isActive \? \([\s\S]*<video/)
  })

  it('activates only for desktop users without reduced motion near the viewport', () => {
    expect(mediaSource).toContain("const DESKTOP_MOTION_QUERY = '(min-width: 769px) and (prefers-reduced-motion: no-preference)'")
    expect(mediaSource).toContain('matchMedia(DESKTOP_MOTION_QUERY)')
    expect(mediaSource).toContain('new IntersectionObserver')
    expect(mediaSource).toMatch(/entry\.isIntersecting/)
    expect(mediaSource).toContain("rootMargin: '100% 0px'")
    expect(mediaSource).toContain('const shouldActivate = mediaQuery.matches && isIntersecting')
    expect(mediaSource).toContain('setIsActive(shouldActivate)')
    expect(mediaSource).not.toMatch(/IntersectionObserver[^]*setIsActive\(true\)/)
  })

  it('keeps the poster visible until the activated video is ready to play', () => {
    expect(mediaSource).toContain('const [isVideoReady, setIsVideoReady] = useState(false)')
    expect(mediaSource).toMatch(/<video[^>]+className=\{`supporting-media__video \$\{isVideoReady \? 'is-ready' : ''\}`\.trim\(\)\}/s)
    expect(mediaSource).toMatch(/<video[^>]+onCanPlay=\{\(\) => setIsVideoReady\(true\)\}/s)
    expect(mediaSource).toMatch(/if \(!shouldActivate\) setIsVideoReady\(false\)/)
    expect(mediaSource).toMatch(/<img[\s\S]*\{isActive \? \([\s\S]*<video/)
  })

  it('mounts no video or sources until activated and tears them down after exit', () => {
    expect(mediaSource).toMatch(/\{isActive \? \([\s\S]*<video[\s\S]*<source src=\{webm\} type="video\/webm"[\s\S]*<source src=\{mp4\} type="video\/mp4"/)
    expect(mediaSource).toMatch(/<video[^>]*autoPlay[^>]*muted[^>]*loop[^>]*playsInline[^>]*preload="none"[^>]*tabIndex="-1"/s)
    expect(mediaSource).toContain(': null}')
  })

  it('replaces both legacy CSS-only panel structures', () => {
    expect(homepageSource).not.toContain('className="signal-panel"')
    expect(homepageSource).not.toContain('className="compass-graphic"')
    expect(homepageSource.match(/<SupportingMedia/g)).toHaveLength(2)
  })
})
