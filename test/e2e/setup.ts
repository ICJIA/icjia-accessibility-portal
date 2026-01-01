/**
 * @fileoverview Common setup utilities for E2E tests
 * @description Provides shared configuration and utilities for all E2E test suites.
 */

import { fileURLToPath } from 'node:url'
import { setup as nuxtSetup } from '@nuxt/test-utils/e2e'
import type { TestOptions } from '@nuxt/test-utils/e2e'

/**
 * Default timeout for E2E test setup (3 minutes).
 * This allows time for Nuxt to build the application.
 */
export const DEFAULT_SETUP_TIMEOUT = 180000

/**
 * Default timeout for individual E2E tests (30 seconds).
 */
export const DEFAULT_TEST_TIMEOUT = 30000

/**
 * Gets the root directory of the project.
 * 
 * @returns Absolute path to project root
 */
export function getRootDir(): string {
  return fileURLToPath(new URL('../..', import.meta.url))
}

/**
 * Creates a standard E2E test setup configuration.
 * 
 * @param options - Additional options to merge with defaults
 * @returns Test options for Nuxt test utils
 * 
 * @example
 * ```ts
 * await setup(createTestSetup({
 *   nuxtConfig: {
 *     content: {
 *       database: dbPath
 *     }
 *   }
 * }))
 * ```
 */
export function createTestSetup(options: Partial<TestOptions> = {}): TestOptions {
  return {
    rootDir: getRootDir(),
    build: true,
    server: true,
    setupTimeout: DEFAULT_SETUP_TIMEOUT,
    ...options,
  }
}

/**
 * Sets up a Nuxt E2E test environment with database isolation.
 * 
 * @param suiteName - Unique name for the test suite
 * @param additionalOptions - Additional options to merge with defaults
 * 
 * @example
 * ```ts
 * import { setupWithDatabase } from './setup'
 * 
 * describe('Home Page', async () => {
 *   const cleanup = await setupWithDatabase('home-page')
 *   
 *   afterAll(cleanup)
 *   
 *   it('should render', async () => {
 *     // test code
 *   })
 * })
 * ```
 */
export async function setupWithDatabase(
  suiteName: string,
  additionalOptions: Partial<TestOptions> = {}
): Promise<() => Promise<void>> {
  const { isolateDatabase, cleanupDatabase } = await import('./helpers/database')
  
  const dbPath = await isolateDatabase(suiteName)
  
  await nuxtSetup(
    createTestSetup({
      ...additionalOptions,
      nuxtConfig: {
        ...additionalOptions.nuxtConfig,
        content: {
          database: {
            type: 'sqlite',
            filename: dbPath,
          },
        },
      },
    })
  )
  
  // Return cleanup function
  return async () => {
    await cleanupDatabase(dbPath)
  }
}

/**
 * Common viewport sizes for responsive testing.
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const

/**
 * Sets viewport size for responsive testing.
 * 
 * @param page - Playwright page object
 * @param viewport - Viewport name or custom size
 * 
 * @example
 * ```ts
 * await setViewport(page, 'mobile')
 * await setViewport(page, { width: 1024, height: 768 })
 * ```
 */
export async function setViewport(
  page: any,
  viewport: keyof typeof VIEWPORTS | { width: number; height: number }
): Promise<void> {
  const size = typeof viewport === 'string' ? VIEWPORTS[viewport] : viewport
  await page.setViewportSize(size)
}

/**
 * Waits for Nuxt hydration to complete.
 * 
 * This ensures that the client-side JavaScript has fully loaded
 * and the page is interactive.
 * 
 * @param page - Playwright page object
 */
export async function waitForHydration(page: any): Promise<void> {
  await page.waitForFunction(() => {
    return (window as any).__NUXT__?.isHydrating === false
  })
}

/**
 * Common test data for E2E tests.
 */
export const TEST_DATA = {
  siteName: 'ICJIA Accessibility Portal',
  deadline: 'April 24, 2026',
  baseUrl: 'https://accessibility.icjia.app',
} as const

