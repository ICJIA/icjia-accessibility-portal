import { describe, it, expect } from 'vitest'
import searchConfig from '../../search.config.json'

/**
 * @fileoverview Unit tests for search configuration validation
 * @description Tests the search.config.json structure and values to ensure
 * Fuse.js search is properly configured for optimal relevance ranking
 */

describe('searchConfig', () => {
  describe('Fuse.js Configuration', () => {
    it('should have valid threshold value (0-1 range)', () => {
      expect(searchConfig.threshold).toBeGreaterThanOrEqual(0)
      expect(searchConfig.threshold).toBeLessThanOrEqual(1)
    })

    it('should have threshold set for balanced fuzzy matching', () => {
      // 0.25 is a good balance - not too strict, not too loose
      expect(searchConfig.threshold).toBe(0.25)
    })

    it('should have distance configured', () => {
      expect(searchConfig.distance).toBeTypeOf('number')
      expect(searchConfig.distance).toBeGreaterThan(0)
    })

    it('should have minMatchCharLength configured', () => {
      expect(searchConfig.minMatchCharLength).toBeTypeOf('number')
      expect(searchConfig.minMatchCharLength).toBeGreaterThanOrEqual(1)
    })

    it('should include score in results for ranking', () => {
      expect(searchConfig.includeScore).toBe(true)
    })

    it('should include matches for highlighting', () => {
      expect(searchConfig.includeMatches).toBe(true)
    })

    it('should enable sorting for proper rank order', () => {
      expect(searchConfig.shouldSort).toBe(true)
    })

    it('should ignore location for searching anywhere in text', () => {
      expect(searchConfig.ignoreLocation).toBe(true)
    })
  })

  describe('Search Keys Configuration', () => {
    it('should have keys array defined', () => {
      expect(searchConfig.keys).toBeDefined()
      expect(Array.isArray(searchConfig.keys)).toBe(true)
      expect(searchConfig.keys.length).toBeGreaterThan(0)
    })

    it('should search in question field with higher weight', () => {
      const questionKey = searchConfig.keys.find(k => k.name === 'question')
      expect(questionKey).toBeDefined()
      expect(questionKey?.weight).toBeGreaterThan(0)
    })

    it('should search in answer field with lower weight', () => {
      const answerKey = searchConfig.keys.find(k => k.name === 'answer')
      expect(answerKey).toBeDefined()
      expect(answerKey?.weight).toBeGreaterThan(0)
    })

    it('should prioritize question over answer (higher weight)', () => {
      const questionKey = searchConfig.keys.find(k => k.name === 'question')
      const answerKey = searchConfig.keys.find(k => k.name === 'answer')
      
      expect(questionKey?.weight).toBeGreaterThan(answerKey?.weight || 0)
    })

    it('should have weights that sum to approximately 1', () => {
      const totalWeight = searchConfig.keys.reduce((sum, key) => sum + key.weight, 0)
      expect(totalWeight).toBeCloseTo(1, 1) // Within 0.1 of 1
    })
  })

  describe('Relevance Labels Configuration', () => {
    it('should have relevance labels defined', () => {
      expect(searchConfig.relevanceLabels).toBeDefined()
    })

    it('should have excellent label with lowest threshold', () => {
      expect(searchConfig.relevanceLabels.excellent).toBeDefined()
      expect(searchConfig.relevanceLabels.excellent.maxScore).toBeLessThan(0.1)
      expect(searchConfig.relevanceLabels.excellent.color).toBe('success')
    })

    it('should have good label', () => {
      expect(searchConfig.relevanceLabels.good).toBeDefined()
      expect(searchConfig.relevanceLabels.good.maxScore).toBeGreaterThan(
        searchConfig.relevanceLabels.excellent.maxScore
      )
      expect(searchConfig.relevanceLabels.good.color).toBe('info')
    })

    it('should have fair label', () => {
      expect(searchConfig.relevanceLabels.fair).toBeDefined()
      expect(searchConfig.relevanceLabels.fair.maxScore).toBeGreaterThan(
        searchConfig.relevanceLabels.good.maxScore
      )
      expect(searchConfig.relevanceLabels.fair.color).toBe('warning')
    })

    it('should have partial label as catch-all', () => {
      expect(searchConfig.relevanceLabels.partial).toBeDefined()
      expect(searchConfig.relevanceLabels.partial.maxScore).toBe(1.0)
      expect(searchConfig.relevanceLabels.partial.color).toBe('grey')
    })

    it('should have ascending threshold order (excellent < good < fair < partial)', () => {
      const { excellent, good, fair, partial } = searchConfig.relevanceLabels
      
      expect(excellent.maxScore).toBeLessThan(good.maxScore)
      expect(good.maxScore).toBeLessThan(fair.maxScore)
      expect(fair.maxScore).toBeLessThan(partial.maxScore)
    })
  })

  describe('Display Configuration', () => {
    it('should have display settings defined', () => {
      expect(searchConfig.display).toBeDefined()
    })

    it('should have minimum search length', () => {
      expect(searchConfig.display.minSearchLength).toBeTypeOf('number')
      expect(searchConfig.display.minSearchLength).toBeGreaterThanOrEqual(1)
      expect(searchConfig.display.minSearchLength).toBeLessThanOrEqual(5)
    })

    it('should have answer preview length', () => {
      expect(searchConfig.display.answerPreviewLength).toBeTypeOf('number')
      expect(searchConfig.display.answerPreviewLength).toBeGreaterThan(50)
    })

    it('should have context before match', () => {
      expect(searchConfig.display.contextBefore).toBeTypeOf('number')
      expect(searchConfig.display.contextBefore).toBeGreaterThan(0)
    })

    it('should have context after match', () => {
      expect(searchConfig.display.contextAfter).toBeTypeOf('number')
      expect(searchConfig.display.contextAfter).toBeGreaterThan(0)
    })
  })

  describe('Score Interpretation', () => {
    // These tests verify the expected behavior documented in comments
    it('should understand that lower score = better match in Fuse.js', () => {
      // This is a documentation test to ensure understanding
      // In Fuse.js: score 0 = perfect match, score 1 = no match
      const excellentThreshold = searchConfig.relevanceLabels.excellent.maxScore
      
      // Excellent matches should have very low scores (close to 0)
      expect(excellentThreshold).toBeLessThan(0.1)
    })

    it('should have threshold that allows fuzzy matching', () => {
      // Threshold of 0.25 allows for typos and partial matches
      // but still requires reasonable similarity
      expect(searchConfig.threshold).toBeGreaterThan(0.1) // Not too strict
      expect(searchConfig.threshold).toBeLessThan(0.5) // Not too loose
    })
  })
})

