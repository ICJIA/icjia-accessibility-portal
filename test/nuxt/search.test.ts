import { describe, it, expect, vi, beforeEach } from 'vitest'
import Fuse from 'fuse.js'
import searchConfig from '../../search.config.json'

/**
 * @fileoverview Nuxt environment tests for search functionality
 * @description Tests the Fuse.js search behavior with realistic FAQ data
 * to ensure proper relevance ranking and result ordering
 */

// Mock FAQ data that mirrors the structure used in the search page
interface FaqItem {
  question: string
  answer: string
  section: string | null
  isNew: boolean
}

const mockFaqItems: FaqItem[] = [
  {
    question: 'What is WCAG?',
    answer: 'WCAG (Web Content Accessibility Guidelines) are international standards that explain how to make digital content accessible to people with disabilities.',
    section: 'Common Concerns',
    isNew: false
  },
  {
    question: 'What does "WCAG 2.1 Level AA" mean?',
    answer: 'WCAG has three conformance levels: Level A — Minimum accessibility. Level AA — Standard accessibility. Level AAA — Enhanced accessibility.',
    section: 'Common Concerns',
    isNew: false
  },
  {
    question: 'What is the deadline for accessibility compliance?',
    answer: 'The deadline is April 24, 2026. All public-facing digital content must meet WCAG 2.1 Level AA standards by this date.',
    section: 'Getting Started',
    isNew: true
  },
  {
    question: 'How do I make a PDF accessible?',
    answer: 'To make PDFs accessible, use proper heading structure, add alt text to images, ensure reading order, and tag the document properly.',
    section: 'Content Accessibility',
    isNew: false
  },
  {
    question: 'What is alt text?',
    answer: 'Alt text (alternative text) is a description of an image that screen readers read aloud to users who cannot see the image.',
    section: 'Content Accessibility',
    isNew: false
  },
  {
    question: 'Do I need to caption all videos?',
    answer: 'Yes, for WCAG 2.1 Level AA compliance, pre-recorded video with audio requires synchronized captions.',
    section: 'Website Accessibility',
    isNew: false
  },
  {
    question: 'What color contrast ratio is required?',
    answer: 'For WCAG 2.1 Level AA: Normal text requires 4.5:1 contrast ratio. Large text requires 3:1 contrast ratio.',
    section: 'Website Accessibility',
    isNew: false
  },
  {
    question: 'How do I test my website for accessibility?',
    answer: 'Use automated tools like axe-core, WAVE, or ANDI. Also perform manual testing with keyboard navigation and screen readers.',
    section: 'Website Accessibility',
    isNew: false
  }
]

describe('Search Functionality', () => {
  let fuse: Fuse<FaqItem>

  beforeEach(() => {
    // Initialize Fuse.js with the same configuration as the search page
    fuse = new Fuse(mockFaqItems, {
      keys: searchConfig.keys,
      includeScore: searchConfig.includeScore,
      includeMatches: searchConfig.includeMatches,
      threshold: searchConfig.threshold,
      distance: searchConfig.distance,
      minMatchCharLength: searchConfig.minMatchCharLength,
      ignoreLocation: searchConfig.ignoreLocation,
      findAllMatches: searchConfig.findAllMatches,
      useExtendedSearch: searchConfig.useExtendedSearch,
      shouldSort: searchConfig.shouldSort
    })
  })

  describe('Basic Search', () => {
    it('should return results for exact match in question', () => {
      const results = fuse.search('WCAG')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].item.question).toContain('WCAG')
    })

    it('should return results for partial match', () => {
      const results = fuse.search('access')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should return empty array for no matches', () => {
      const results = fuse.search('xyzzynonexistent')
      expect(results.length).toBe(0)
    })

    it('should search in both question and answer fields', () => {
      // "screen readers" appears only in answer of alt text question
      const results = fuse.search('screen readers')
      expect(results.length).toBeGreaterThan(0)
      expect(results.some(r => r.item.question.includes('alt text'))).toBe(true)
    })
  })

  describe('Result Ranking (Descending Relevance)', () => {
    it('should return results sorted by score ascending (best match first)', () => {
      const results = fuse.search('WCAG')
      
      // Verify results are sorted by score (lower = better)
      for (let i = 1; i < results.length; i++) {
        const prevScore = results[i - 1].score || 0
        const currScore = results[i].score || 0
        expect(currScore).toBeGreaterThanOrEqual(prevScore)
      }
    })

    it('should rank exact question match highest', () => {
      const results = fuse.search('What is WCAG')
      
      // First result should be the exact match
      expect(results[0].item.question).toBe('What is WCAG?')
      expect(results[0].score).toBeLessThan(0.1) // Very good match
    })

    it('should rank question matches higher than answer-only matches', () => {
      const results = fuse.search('deadline')
      
      // The question containing "deadline" should rank higher
      // than items that only have related words in the answer
      expect(results[0].item.question.toLowerCase()).toContain('deadline')
    })

    it('should order results from closest to partial match', () => {
      const results = fuse.search('PDF')
      
      // Scores should increase (get worse) as we go down the list
      const scores = results.map(r => r.score || 0)
      const sortedScores = [...scores].sort((a, b) => a - b)
      
      expect(scores).toEqual(sortedScores)
    })
  })

  describe('Score Thresholds', () => {
    it('should include score in results', () => {
      const results = fuse.search('WCAG')
      
      results.forEach(result => {
        expect(result.score).toBeDefined()
        expect(typeof result.score).toBe('number')
      })
    })

    it('should have scores between 0 and 1', () => {
      const results = fuse.search('accessibility')
      
      results.forEach(result => {
        expect(result.score).toBeGreaterThanOrEqual(0)
        expect(result.score).toBeLessThanOrEqual(1)
      })
    })

    it('should return best matches with scores below threshold', () => {
      const results = fuse.search('WCAG')
      
      // Best matches (first results) should have low scores
      // Note: Fuse.js doesn't filter at threshold, it uses threshold to determine
      // what constitutes a "match" - scores can be above threshold for weaker matches
      expect(results.length).toBeGreaterThan(0)
      
      // The top result should be a good match (low score)
      expect(results[0].score).toBeLessThan(searchConfig.threshold)
    })
  })

  describe('Match Highlighting', () => {
    it('should include match indices in results', () => {
      const results = fuse.search('WCAG')
      
      expect(results[0].matches).toBeDefined()
      expect(Array.isArray(results[0].matches)).toBe(true)
    })

    it('should provide match positions for highlighting', () => {
      const results = fuse.search('WCAG')
      const firstMatch = results[0].matches?.[0]
      
      expect(firstMatch).toBeDefined()
      expect(firstMatch?.indices).toBeDefined()
      expect(Array.isArray(firstMatch?.indices)).toBe(true)
    })

    it('should identify which key matched', () => {
      const results = fuse.search('WCAG')
      const matches = results[0].matches || []
      
      const keys = matches.map(m => m.key)
      expect(keys.some(k => k === 'question' || k === 'answer')).toBe(true)
    })
  })

  describe('Fuzzy Matching', () => {
    it('should find results with typos', () => {
      // "WCGA" is a typo for "WCAG"
      const results = fuse.search('WCGA')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should find results with partial words', () => {
      const results = fuse.search('access')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should handle case-insensitive search', () => {
      const lowerResults = fuse.search('wcag')
      const upperResults = fuse.search('WCAG')
      
      expect(lowerResults.length).toBe(upperResults.length)
    })
  })

  describe('Relevance Label Mapping', () => {
    // Helper function matching the search page implementation
    function getRelevanceLabel(score?: number): string {
      if (score === undefined) return 'Match'
      const labels = searchConfig.relevanceLabels
      if (score < labels.excellent.maxScore) return 'Excellent'
      if (score < labels.good.maxScore) return 'Good'
      if (score < labels.fair.maxScore) return 'Fair'
      return 'Partial'
    }

    function getRelevanceColor(score?: number): string {
      if (score === undefined) return 'grey'
      const labels = searchConfig.relevanceLabels
      if (score < labels.excellent.maxScore) return labels.excellent.color
      if (score < labels.good.maxScore) return labels.good.color
      if (score < labels.fair.maxScore) return labels.fair.color
      return labels.partial.color
    }

    it('should label very close matches as Excellent', () => {
      // Score close to 0 should be excellent
      expect(getRelevanceLabel(0.01)).toBe('Excellent')
      expect(getRelevanceColor(0.01)).toBe('success')
    })

    it('should label good matches appropriately', () => {
      // Score between excellent and good thresholds
      expect(getRelevanceLabel(0.1)).toBe('Good')
      expect(getRelevanceColor(0.1)).toBe('info')
    })

    it('should label fair matches appropriately', () => {
      // Score between good and fair thresholds
      expect(getRelevanceLabel(0.2)).toBe('Fair')
      expect(getRelevanceColor(0.2)).toBe('warning')
    })

    it('should label weak matches as Partial', () => {
      // Score at or above fair threshold
      expect(getRelevanceLabel(0.3)).toBe('Partial')
      expect(getRelevanceColor(0.3)).toBe('grey')
    })

    it('should handle undefined score', () => {
      expect(getRelevanceLabel(undefined)).toBe('Match')
      expect(getRelevanceColor(undefined)).toBe('grey')
    })
  })

  describe('Search Performance', () => {
    it('should return results quickly for small datasets', () => {
      const start = performance.now()
      fuse.search('accessibility')
      const duration = performance.now() - start
      
      // Should complete in under 50ms for small datasets
      expect(duration).toBeLessThan(50)
    })

    it('should handle multiple sequential searches', () => {
      const queries = ['WCAG', 'PDF', 'deadline', 'contrast', 'video']
      
      queries.forEach(query => {
        const results = fuse.search(query)
        expect(results).toBeDefined()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty search query', () => {
      const results = fuse.search('')
      expect(results.length).toBe(0)
    })

    it('should handle single character search', () => {
      const results = fuse.search('a')
      // May or may not return results depending on minMatchCharLength
      expect(results).toBeDefined()
    })

    it('should handle special characters', () => {
      const results = fuse.search('2.1')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should handle very long search queries', () => {
      const longQuery = 'What is the deadline for WCAG 2.1 Level AA accessibility compliance'
      const results = fuse.search(longQuery)
      expect(results).toBeDefined()
    })

    it('should handle search with numbers', () => {
      const results = fuse.search('4.5:1')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].item.question.toLowerCase()).toContain('contrast')
    })
  })

  describe('Section Filtering', () => {
    it('should preserve section information in results', () => {
      const results = fuse.search('WCAG')
      
      results.forEach(result => {
        expect(result.item.section).toBeDefined()
      })
    })

    it('should include isNew flag in results', () => {
      const results = fuse.search('deadline')
      
      // The deadline question is marked as new
      const deadlineResult = results.find(r => 
        r.item.question.toLowerCase().includes('deadline')
      )
      
      expect(deadlineResult?.item.isNew).toBe(true)
    })
  })
})

