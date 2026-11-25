/**
 * @fileoverview Tests for the FAQ review history shown on /trust
 * @description The /trust page lists every full review of the FAQ. These tests
 * keep the list honest: dates are valid, newest first, and the newest review
 * is the same date the FAQ itself says it was last reviewed.
 */

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { REVIEW_HISTORY } from '../../app/utils/reviewHistory'

describe('REVIEW_HISTORY', () => {
  it('has at least one review', () => {
    expect(REVIEW_HISTORY.length).toBeGreaterThan(0)
  })

  it('uses YYYY-MM-DD dates and a summary for every review', () => {
    for (const review of REVIEW_HISTORY) {
      expect(review.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(review.date))).toBe(false)
      expect(review.summary.trim().length).toBeGreaterThan(20)
    }
  })

  it('is newest first, with no date twice', () => {
    const dates = REVIEW_HISTORY.map((r) => r.date)
    expect([...dates].sort().reverse()).toEqual(dates)
    expect(new Set(dates).size).toBe(dates.length)
  })

  it("starts with the FAQ's own lastReviewed date", () => {
    // If this fails, a review moved lastReviewed in content/faqs.md without
    // adding an entry to app/utils/reviewHistory.ts (or the other way round).
    const faqs = readFileSync(resolve(__dirname, '../../content/faqs.md'), 'utf-8')
    const match = /^lastReviewed:\s*(\d{4}-\d{2}-\d{2})\s*$/m.exec(faqs)
    expect(match).not.toBeNull()
    expect(REVIEW_HISTORY[0]!.date).toBe(match![1])
  })
})
