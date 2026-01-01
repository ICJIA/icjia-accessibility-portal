/**
 * @fileoverview E2E tests for the home page
 * @description Tests critical user flows and accessibility features on the home page.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { $fetch, createPage } from '@nuxt/test-utils/e2e'
import { setupWithDatabase, TEST_DATA } from '../setup'
import {
  testSkipLink,
  testHeadingHierarchy,
  testImageAltText,
} from '../helpers/accessibility'
import {
  testMetaTags,
  testStructuredData,
  waitForPageLoad,
} from '../helpers/navigation'

describe('Home Page', async () => {
  let cleanup: () => Promise<void>

  beforeAll(async () => {
    cleanup = await setupWithDatabase('home-page')
  }, 180000)

  afterAll(async () => {
    if (cleanup) {
      await cleanup()
    }
  })

  it('should render the home page with correct content', async () => {
    const html = await $fetch('/')
    
    expect(html).toContain(TEST_DATA.siteName)
    expect(html).toContain('Countdown to WCAG 2.1 AA Compliance')
    expect(html).toContain(TEST_DATA.deadline)
  })

  it('should have correct meta tags', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    await testMetaTags(page, {
      title: TEST_DATA.siteName,
      description: 'WCAG 2.1 AA compliance',
    })
    
    await page.close()
  })

  it('should have valid structured data', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    await testStructuredData(page, 'WebSite')
    
    await page.close()
  })

  it('should have working skip link', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    await testSkipLink(page)
    
    await page.close()
  })

  it('should have proper heading hierarchy', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    await testHeadingHierarchy(page)
    
    await page.close()
  })

  it('should have alt text on all images', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    await testImageAltText(page)
    
    await page.close()
  })

  it('should display countdown timer', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    const timer = page.locator('[aria-live="polite"]')
    await expect(timer).toBeVisible()
    
    // Timer should contain numbers
    const timerText = await timer.textContent()
    expect(timerText).toMatch(/\d+/)
    
    await page.close()
  })

  it('should display FAQ section', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    // Check for FAQ heading
    const faqHeading = page.locator('h2:has-text("Frequently Asked Questions")')
    await expect(faqHeading).toBeVisible()
    
    // Check for at least one FAQ item
    const faqItems = page.locator('[role="button"][aria-expanded]')
    const count = await faqItems.count()
    expect(count).toBeGreaterThan(0)
    
    await page.close()
  })

  it('should have functional navigation links', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    // Check that navigation exists
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    // Check for expected links
    const homeLink = page.locator('nav a:has-text("Home")')
    const faqsLink = page.locator('nav a:has-text("FAQs")')
    const linksLink = page.locator('nav a:has-text("Links")')
    
    await expect(homeLink).toBeVisible()
    await expect(faqsLink).toBeVisible()
    await expect(linksLink).toBeVisible()
    
    // Home should be marked as current page
    const currentLink = page.locator('nav a[aria-current="page"]')
    await expect(currentLink).toHaveText(/Home/i)
    
    await page.close()
  })

  it('should expand/collapse FAQ accordions', async () => {
    const page = await createPage('/')
    await waitForPageLoad(page)
    
    // Find first FAQ button
    const firstFaq = page.locator('[role="button"][aria-expanded]').first()
    
    // Should start collapsed
    const initialState = await firstFaq.getAttribute('aria-expanded')
    expect(initialState).toBe('false')
    
    // Click to expand
    await firstFaq.click()
    
    // Should now be expanded
    const expandedState = await firstFaq.getAttribute('aria-expanded')
    expect(expandedState).toBe('true')
    
    // Click to collapse
    await firstFaq.click()
    
    // Should be collapsed again
    const collapsedState = await firstFaq.getAttribute('aria-expanded')
    expect(collapsedState).toBe('false')
    
    await page.close()
  })
})

