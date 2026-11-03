import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import HomePage from '../src/HomePage.jsx'
import MembershipPage from '../src/MembershipPage.jsx'
import HowItWorksPage from '../src/HowItWorksPage.jsx'
import HealthIntelligencePage from '../src/HealthIntelligencePage.jsx'
import ClinicalNetworkPage from '../src/ClinicalNetworkPage.jsx'
import InternationalCarePage from '../src/InternationalCarePage.jsx'
import AboutPage from '../src/AboutPage.jsx'
import EnquirePage from '../src/EnquirePage.jsx'

const pages = [HomePage, MembershipPage, HowItWorksPage, HealthIntelligencePage, ClinicalNetworkPage, InternationalCarePage, AboutPage, EnquirePage]

describe('site navigation', () => {
  it('keeps Insights out of desktop and mobile menus until the editorial capability exists', () => {
    for (const Page of pages) {
      const markup = renderToStaticMarkup(createElement(Page))
      const primary = markup.match(/<nav[^>]*aria-label="Primary navigation"[^>]*>(.*?)<\/nav>/s)?.[1]
      const mobile = markup.match(/<nav[^>]*aria-label="Mobile navigation"[^>]*>(.*?)<\/nav>/s)?.[1]
      expect(primary, Page.name).toBeDefined()
      expect(mobile, Page.name).toBeDefined()
      expect(primary).not.toMatch(/>Insights</)
      expect(mobile).not.toMatch(/>Insights</)
    }
  })
})
