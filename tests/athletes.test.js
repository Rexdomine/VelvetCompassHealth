import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import AthletesPage from '../src/AthletesPage.jsx'
import MembershipPage from '../src/MembershipPage.jsx'
import { getProductLane } from '../src/route.js'

const source = readFileSync(new URL('../docs/sources/client-written-brief.md', import.meta.url), 'utf8')
const athletesSource = source.split(/^## Athletes$/m)[1].split(/^## Clinical Network$/m)[0]
const markup = renderToStaticMarkup(createElement(AthletesPage))
const plain = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

describe('Athletes membership page', () => {
  it('is reachable from Membership and uses its own route', () => {
    expect(getProductLane('/membership/athletes')).toBe('athletes')
    expect(getProductLane('/membership/athletes/')).toBe('athletes')
    expect(renderToStaticMarkup(createElement(MembershipPage))).toContain('href="/membership/athletes"')
    expect(markup).toContain('aria-current="page"')
  })

  it('preserves the complete source story and careful treatment wording', () => {
    for (const heading of [
      'Protecting the player behind the game.',
      'The whole career, not only the next performance',
      'Performance that does not borrow from the future',
      'Joint longevity and injury strategy',
      'Emerging and regenerative treatments, considered carefully',
      'Mind, identity and confidential support',
      'Nutrition built around the athlete who exists',
      'Care across club, country and career stage',
      'Beyond the game',
    ]) {
      expect(athletesSource).toContain(heading)
      expect(plain).toContain(heading)
    }
    expect(plain).toContain('evidence, regulation, provider quality and personal suitability')
    expect(markup).toContain('/vch-approved/athletes/beyond-the-game.jpg')
  })

  it('uses one hero enquiry action with the relevant form focus preselected', () => {
    const heroActions = markup.match(/<div class="ic-actions">([\s\S]*?)<\/div>/)?.[1]
    expect(heroActions).toBeDefined()
    expect(heroActions.match(/<a /g)).toHaveLength(1)
    expect(heroActions).toContain('type=Individual%20or%20family%20membership&amp;focus=performance')
  })
})
