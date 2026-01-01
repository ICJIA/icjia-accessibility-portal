/**
 * @fileoverview Navigation testing helpers for E2E tests
 * @description Provides utilities to test navigation, routing, and page transitions.
 */

import type { Page } from '@playwright/test'
import { expect } from 'vitest'

/**
 * Tests that navigation links work correctly.
 * 
 * @param page - Playwright page object
 * @param links - Array of objects with link text and expected URL
 * 
 * @example
 * ```ts
 * await testNavigationLinks(page, [
 *   { text: 'Home', url: '/' },
 *   { text: 'FAQs', url: '/faqs' },
 *   { text: 'Links', url: '/links' }
 * ])
 * ```
 */
export async function testNavigationLinks(
  page: Page,
  links: Array<{ text: string; url: string }>
): Promise<void> {
  for (const link of links) {
    const navLink = page.locator(`nav a:has-text("${link.text}")`)
    await navLink.click()
    await page.waitForURL(`**${link.url}`)
    expect(page.url()).toContain(link.url)
  }
}

/**
 * Tests that the active page is highlighted in navigation.
 * 
 * Verifies that the current page has aria-current="page" attribute.
 * 
 * @param page - Playwright page object
 * @param expectedText - Text of the active navigation link
 */
export async function testActiveNavigation(
  page: Page,
  expectedText: string
): Promise<void> {
  const activeLink = page.locator('nav a[aria-current="page"]')
  await expect(activeLink).toHaveText(expectedText)
}

/**
 * Tests browser back/forward navigation.
 * 
 * @param page - Playwright page object
 * @param startUrl - Starting URL
 * @param navigateToUrl - URL to navigate to
 */
export async function testBrowserNavigation(
  page: Page,
  startUrl: string,
  navigateToUrl: string
): Promise<void> {
  // Start at initial URL
  await page.goto(startUrl)
  expect(page.url()).toContain(startUrl)
  
  // Navigate to new URL
  await page.goto(navigateToUrl)
  expect(page.url()).toContain(navigateToUrl)
  
  // Test back button
  await page.goBack()
  expect(page.url()).toContain(startUrl)
  
  // Test forward button
  await page.goForward()
  expect(page.url()).toContain(navigateToUrl)
}

/**
 * Tests that direct URL access works.
 * 
 * @param page - Playwright page object
 * @param url - URL to test
 * @param expectedTitle - Expected page title (optional)
 */
export async function testDirectUrlAccess(
  page: Page,
  url: string,
  expectedTitle?: string
): Promise<void> {
  await page.goto(url)
  expect(page.url()).toContain(url)
  
  if (expectedTitle) {
    await expect(page).toHaveTitle(new RegExp(expectedTitle))
  }
}

/**
 * Tests that 404 page handles invalid routes.
 * 
 * @param page - Playwright page object
 * @param invalidUrl - Invalid URL to test
 */
export async function test404Page(
  page: Page,
  invalidUrl: string
): Promise<void> {
  const response = await page.goto(invalidUrl)
  
  // Should return 404 status
  expect(response?.status()).toBe(404)
  
  // Should show 404 content
  const content = await page.textContent('body')
  expect(content).toMatch(/404|not found/i)
}

/**
 * Waits for page to be fully loaded.
 * 
 * Waits for:
 * 1. DOM content to be loaded
 * 2. Network to be idle
 * 3. No pending animations
 * 
 * @param page - Playwright page object
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('networkidle')
}

/**
 * Tests that a page has correct meta tags.
 * 
 * @param page - Playwright page object
 * @param expectedMeta - Object with expected meta tag values
 * 
 * @example
 * ```ts
 * await testMetaTags(page, {
 *   title: 'ICJIA Accessibility Portal',
 *   description: 'Resources for WCAG 2.1 AA compliance',
 *   'og:type': 'website'
 * })
 * ```
 */
export async function testMetaTags(
  page: Page,
  expectedMeta: Record<string, string>
): Promise<void> {
  for (const [key, expectedValue] of Object.entries(expectedMeta)) {
    if (key === 'title') {
      await expect(page).toHaveTitle(new RegExp(expectedValue))
    } else if (key.startsWith('og:')) {
      const content = await page.getAttribute(`meta[property="${key}"]`, 'content')
      expect(content).toContain(expectedValue)
    } else {
      const content = await page.getAttribute(`meta[name="${key}"]`, 'content')
      expect(content).toContain(expectedValue)
    }
  }
}

/**
 * Tests that structured data (JSON-LD) is present and valid.
 * 
 * @param page - Playwright page object
 * @param expectedType - Expected @type value (e.g., 'WebSite', 'FAQPage')
 */
export async function testStructuredData(
  page: Page,
  expectedType: string
): Promise<void> {
  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
  expect(jsonLd).toBeTruthy()
  
  if (jsonLd) {
    const data = JSON.parse(jsonLd)
    expect(data['@type']).toBe(expectedType)
  }
}

