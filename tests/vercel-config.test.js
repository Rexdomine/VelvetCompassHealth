import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const vercelConfig = JSON.parse(
  readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'),
)

const headersForAllResponses = Object.fromEntries(
  vercelConfig.headers
    .find(({ source }) => source === '/(.*)')
    ?.headers.map(({ key, value }) => [key.toLowerCase(), value]) ?? [],
)

describe('Vercel hosted preview configuration', () => {
  it('rewrites only the exact member-area route forms to the SPA entry point', () => {
    expect(vercelConfig.rewrites).toEqual([
      { source: '/memberarea', destination: '/index.html' },
      { source: '/memberarea/', destination: '/index.html' },
    ])

    const rewriteSources = vercelConfig.rewrites.map(({ source }) => source)
    expect(rewriteSources).not.toContain('/memberarea/:path*')
    expect(rewriteSources).not.toContain('/(.*)')
    expect(rewriteSources).not.toContain('/api/:path*')
    expect(rewriteSources).not.toContain('/media/:path*')
  })

  it('prevents indexing and supplies static security headers on every response', () => {
    expect(headersForAllResponses).toMatchObject({
      'x-robots-tag': 'noindex, nofollow',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'permissions-policy': 'camera=(), microphone=(), geolocation=()',
    })

    expect(headersForAllResponses['content-security-policy']).toBe(
      "default-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    )
  })
})
