/**
 * @fileoverview Tests for the What's New entries and helpers
 * @description Guards the data behind the home-page banner and the /whats-new
 * page: entries are well-formed, newest first, and their internal FAQ links
 * point at questions that exist.
 */

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  WHATS_NEW_ENTRIES,
  getWhatsNewEntries,
  getLatestWhatsNew,
  formatWhatsNewDate,
  formatWhatsNewShortDate,
  isExternalWhatsNewLink,
} from '../../app/utils/whatsNew'
import { getQuestionId } from '../../app/composables/useSlugify'

describe('WHATS_NEW_ENTRIES', () => {
  it('has at least one entry', () => {
    expect(WHATS_NEW_ENTRIES.length).toBeGreaterThan(0)
  })

  it('gives every entry a unique id', () => {
    const ids = WHATS_NEW_ENTRIES.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses real YYYY-MM-DD dates', () => {
    for (const entry of WHATS_NEW_ENTRIES) {
      expect(entry.date, entry.id).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      const parsed = new Date(`${entry.date}T12:00:00Z`)
      expect(Number.isNaN(parsed.getTime()), entry.id).toBe(false)
      expect(parsed.toISOString().slice(0, 10), entry.id).toBe(entry.date)
    }
  })

  it('fills in every required field', () => {
    for (const entry of WHATS_NEW_ENTRIES) {
      expect(entry.badge.trim(), entry.id).not.toBe('')
      expect(entry.title.trim(), entry.id).not.toBe('')
      expect(entry.summary.trim(), entry.id).not.toBe('')
    }
  })

  it('is written newest first, so the source reads like the page', () => {
    const dates = WHATS_NEW_ENTRIES.map((e) => e.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('links only to FAQ questions that exist', () => {
    const faqs = readFileSync(resolve(__dirname, '../../content/faqs.md'), 'utf8')
    const ids = new Set<string>()
    let section = ''
    for (const line of faqs.split('\n')) {
      if (line.startsWith('## ')) section = line.slice(3).trim()
      else if (line.startsWith('### ') && section) ids.add(getQuestionId(section, line.slice(4).trim()))
    }
    for (const entry of WHATS_NEW_ENTRIES) {
      for (const link of entry.links ?? []) {
        if (!link.href.startsWith('/faqs#')) continue
        expect(ids.has(link.href.slice('/faqs#'.length)), `${entry.id}: ${link.href}`).toBe(true)
      }
    }
  })
})

describe('getWhatsNewEntries', () => {
  it('returns entries newest first', () => {
    const dates = getWhatsNewEntries().map((e) => e.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('returns a copy, not the source array', () => {
    expect(getWhatsNewEntries()).not.toBe(WHATS_NEW_ENTRIES)
  })
})

describe('getLatestWhatsNew', () => {
  it('returns the newest entry', () => {
    const newest = [...WHATS_NEW_ENTRIES].sort((a, b) => (a.date < b.date ? 1 : -1))[0]
    expect(getLatestWhatsNew()?.date).toBe(newest?.date)
  })
})

describe('formatWhatsNewDate', () => {
  it('formats a long date', () => {
    expect(formatWhatsNewDate('2026-11-06')).toBe('November 6, 2026')
    expect(formatWhatsNewDate('2025-12-15')).toBe('December 15, 2025')
  })

  it('returns anything else unchanged', () => {
    expect(formatWhatsNewDate('soon')).toBe('soon')
    expect(formatWhatsNewDate('2026-13-01')).toBe('2026-13-01')
  })
})

describe('formatWhatsNewShortDate', () => {
  it('formats a short date without leading zeros', () => {
    expect(formatWhatsNewShortDate('2026-04-20')).toBe('4/20/2026')
    expect(formatWhatsNewShortDate('2026-11-06')).toBe('11/6/2026')
  })
})

describe('isExternalWhatsNewLink', () => {
  it('tells external links from internal ones', () => {
    expect(isExternalWhatsNewLink('https://github.com/ICJIA/voicecap')).toBe(true)
    expect(isExternalWhatsNewLink('/faqs#x')).toBe(false)
  })
})
