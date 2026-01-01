/**
 * @fileoverview Database isolation helpers for E2E tests
 * @description Provides utilities to create isolated SQLite databases for each test suite
 * to prevent conflicts when running tests in parallel.
 */

import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

/**
 * Creates an isolated database path for a test suite.
 * 
 * Each test suite gets its own unique database file to prevent conflicts
 * when running tests in parallel.
 * 
 * @param suiteName - Unique name for the test suite (e.g., 'home-page', 'faqs')
 * @returns Path to the isolated database file
 * 
 * @example
 * ```ts
 * const dbPath = await isolateDatabase('home-page')
 * // Returns: '/tmp/nuxt-content-test-home-page-1234567890.db'
 * ```
 */
export async function isolateDatabase(suiteName: string): Promise<string> {
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(7)
  const dbName = `nuxt-content-test-${suiteName}-${timestamp}-${randomId}.db`
  const dbPath = join(tmpdir(), dbName)
  
  // Ensure the directory exists
  await fs.mkdir(tmpdir(), { recursive: true })
  
  return dbPath
}

/**
 * Cleans up an isolated database file after tests complete.
 * 
 * Removes the database file and any associated files (e.g., .db-shm, .db-wal)
 * created by SQLite.
 * 
 * @param dbPath - Path to the database file to clean up
 * 
 * @example
 * ```ts
 * await cleanupDatabase('/tmp/nuxt-content-test-home-page-1234567890.db')
 * ```
 */
export async function cleanupDatabase(dbPath: string): Promise<void> {
  try {
    // Remove main database file
    await fs.unlink(dbPath).catch(() => {
      // Ignore if file doesn't exist
    })
    
    // Remove SQLite WAL (Write-Ahead Logging) file
    await fs.unlink(`${dbPath}-wal`).catch(() => {
      // Ignore if file doesn't exist
    })
    
    // Remove SQLite SHM (Shared Memory) file
    await fs.unlink(`${dbPath}-shm`).catch(() => {
      // Ignore if file doesn't exist
    })
  } catch (error) {
    console.warn(`Failed to cleanup database at ${dbPath}:`, error)
  }
}

/**
 * Checks if a database file exists.
 * 
 * @param dbPath - Path to the database file
 * @returns True if the database file exists, false otherwise
 */
export async function databaseExists(dbPath: string): Promise<boolean> {
  try {
    await fs.access(dbPath)
    return true
  } catch {
    return false
  }
}

/**
 * Gets the size of a database file in bytes.
 * 
 * @param dbPath - Path to the database file
 * @returns Size in bytes, or 0 if file doesn't exist
 */
export async function getDatabaseSize(dbPath: string): Promise<number> {
  try {
    const stats = await fs.stat(dbPath)
    return stats.size
  } catch {
    return 0
  }
}

/**
 * Creates a test database configuration for Nuxt Content.
 * 
 * @param suiteName - Unique name for the test suite
 * @returns Configuration object for Nuxt Content
 * 
 * @example
 * ```ts
 * const config = await createTestDatabaseConfig('home-page')
 * await setup({
 *   nuxtConfig: {
 *     content: config
 *   }
 * })
 * ```
 */
export async function createTestDatabaseConfig(suiteName: string) {
  const dbPath = await isolateDatabase(suiteName)
  
  return {
    database: {
      type: 'sqlite' as const,
      filename: dbPath
    }
  }
}

