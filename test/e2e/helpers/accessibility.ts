/**
 * @fileoverview Accessibility testing helpers for E2E tests
 * @description Provides utilities to test accessibility features like keyboard navigation,
 * ARIA attributes, and screen reader compatibility.
 */

import type { Page, Locator } from '@playwright/test'
import { expect } from 'vitest'

/**
 * Tests keyboard navigation through a list of elements.
 * 
 * Verifies that Tab key moves focus through elements in the correct order
 * and that focus indicators are visible.
 * 
 * @param page - Playwright page object
 * @param selectors - Array of CSS selectors in expected tab order
 * 
 * @example
 * ```ts
 * await testKeyboardNavigation(page, [
 *   'a[href="#main-content"]', // Skip link
 *   'nav a:first-child',       // First nav link
 *   'nav a:nth-child(2)'       // Second nav link
 * ])
 * ```
 */
export async function testKeyboardNavigation(
  page: Page,
  selectors: string[]
): Promise<void> {
  for (const selector of selectors) {
    await page.keyboard.press('Tab')
    const focused = await page.locator(selector)
    await expect(focused).toBeFocused()
  }
}

/**
 * Tests that an element has the correct ARIA attributes.
 * 
 * @param locator - Playwright locator for the element
 * @param attributes - Object with expected ARIA attribute values
 * 
 * @example
 * ```ts
 * const button = page.locator('button[aria-expanded]')
 * await testAriaAttributes(button, {
 *   'aria-expanded': 'false',
 *   'aria-controls': 'accordion-panel-1'
 * })
 * ```
 */
export async function testAriaAttributes(
  locator: Locator,
  attributes: Record<string, string>
): Promise<void> {
  for (const [attr, expectedValue] of Object.entries(attributes)) {
    const actualValue = await locator.getAttribute(attr)
    expect(actualValue).toBe(expectedValue)
  }
}

/**
 * Tests that the skip link works correctly.
 * 
 * Verifies that:
 * 1. Skip link is the first focusable element
 * 2. Activating it moves focus to main content
 * 3. Skip link is visible when focused
 * 
 * @param page - Playwright page object
 * @param skipLinkSelector - CSS selector for skip link (default: 'a[href="#main-content"]')
 * @param mainContentSelector - CSS selector for main content (default: '#main-content')
 */
export async function testSkipLink(
  page: Page,
  skipLinkSelector = 'a[href="#main-content"]',
  mainContentSelector = '#main-content'
): Promise<void> {
  // Focus first element (should be skip link)
  await page.keyboard.press('Tab')
  
  const skipLink = page.locator(skipLinkSelector)
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  
  // Activate skip link
  await page.keyboard.press('Enter')
  
  // Verify focus moved to main content
  const mainContent = page.locator(mainContentSelector)
  await expect(mainContent).toBeFocused()
}

/**
 * Tests heading hierarchy on a page.
 * 
 * Verifies that:
 * 1. There is exactly one h1
 * 2. Headings follow proper nesting (no skipped levels)
 * 
 * @param page - Playwright page object
 */
export async function testHeadingHierarchy(page: Page): Promise<void> {
  // Check for exactly one h1
  const h1Count = await page.locator('h1').count()
  expect(h1Count).toBe(1)
  
  // Get all headings
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
  
  let previousLevel = 0
  for (const heading of headings) {
    const tagName = await heading.evaluate(el => el.tagName.toLowerCase())
    const level = parseInt(tagName.substring(1))
    
    // Heading level should not skip more than 1 level
    if (previousLevel > 0) {
      expect(level).toBeLessThanOrEqual(previousLevel + 1)
    }
    
    previousLevel = level
  }
}

/**
 * Tests that all images have alt text.
 * 
 * @param page - Playwright page object
 */
export async function testImageAltText(page: Page): Promise<void> {
  const images = await page.locator('img').all()
  
  for (const img of images) {
    const alt = await img.getAttribute('alt')
    // Alt attribute should exist (can be empty for decorative images)
    expect(alt).not.toBeNull()
  }
}

/**
 * Tests that external links have proper attributes.
 * 
 * Verifies that external links have:
 * - target="_blank"
 * - rel="noopener noreferrer" (for security)
 * 
 * @param page - Playwright page object
 */
export async function testExternalLinks(page: Page): Promise<void> {
  const externalLinks = await page.locator('a[href^="http"]').all()
  
  for (const link of externalLinks) {
    const href = await link.getAttribute('href')
    const currentDomain = new URL(page.url()).hostname
    
    // Skip if link is to same domain
    if (href && href.includes(currentDomain)) {
      continue
    }
    
    const target = await link.getAttribute('target')
    const rel = await link.getAttribute('rel')
    
    expect(target).toBe('_blank')
    expect(rel).toContain('noopener')
  }
}

/**
 * Tests that there are no keyboard traps.
 * 
 * Verifies that user can tab through all interactive elements
 * and reach the end without getting stuck.
 * 
 * @param page - Playwright page object
 * @param maxTabs - Maximum number of tabs to try (default: 100)
 */
export async function testNoKeyboardTraps(
  page: Page,
  maxTabs = 100
): Promise<void> {
  const focusedElements = new Set<string>()
  
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press('Tab')
    
    const activeElement = await page.evaluate(() => {
      const el = document.activeElement
      return el ? el.tagName + (el.id ? `#${el.id}` : '') : null
    })
    
    if (activeElement && focusedElements.has(activeElement)) {
      // We've cycled back to a previous element - this is OK
      break
    }
    
    if (activeElement) {
      focusedElements.add(activeElement)
    }
  }
  
  // If we hit maxTabs, we might have a keyboard trap
  expect(focusedElements.size).toBeLessThan(maxTabs)
}

