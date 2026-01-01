import { describe, it, expect } from 'vitest'
import { slugify, getQuestionId, useSlugify } from '../../app/composables/useSlugify'

describe('useSlugify', () => {
  describe('slugify', () => {
    it('should convert text to lowercase', () => {
      expect(slugify('HELLO WORLD')).toBe('hello-world')
    })

    it('should replace non-alphanumeric characters with hyphens', () => {
      // The function replaces all non-alphanumeric with hyphens, so "2.1" becomes "2-1"
      expect(slugify('What is WCAG 2.1?')).toBe('what-is-wcag-2-1')
    })

    it('should remove leading and trailing hyphens', () => {
      expect(slugify('---hello---')).toBe('hello')
    })

    it('should truncate to maxLength', () => {
      const longText = 'a'.repeat(200)
      const result = slugify(longText, 50)
      expect(result.length).toBeLessThanOrEqual(50)
    })

    it('should remove trailing hyphens after truncation', () => {
      const text = 'hello-world-test'
      const result = slugify(text, 10)
      expect(result).not.toMatch(/-$/)
    })

    it('should handle empty string', () => {
      expect(slugify('')).toBe('')
    })

    it('should handle special characters', () => {
      expect(slugify('Test@#$%^&*()')).toBe('test')
    })

    it('should handle numbers', () => {
      // Numbers are kept separate with hyphens between them
      expect(slugify('WCAG 2.1 Level AA')).toBe('wcag-2-1-level-aa')
    })
  })

  describe('getQuestionId', () => {
    it('should combine section and question slugs', () => {
      const result = getQuestionId('Getting Started', 'What is accessibility?')
      expect(result).toBe('getting-started-what-is-accessibility')
    })

    it('should handle different sections with same question', () => {
      const result1 = getQuestionId('Section A', 'What is X?')
      const result2 = getQuestionId('Section B', 'What is X?')
      
      expect(result1).not.toBe(result2)
      expect(result1).toContain('section-a')
      expect(result2).toContain('section-b')
    })

    it('should handle special characters in section and question', () => {
      const result = getQuestionId('Section 1.0', 'What is WCAG 2.1?')
      expect(result).toMatch(/section-1-0.*what-is-wcag-2-1/)
    })

    it('should use default maxLength of 150', () => {
      const longSection = 'A'.repeat(100)
      const longQuestion = 'B'.repeat(100)
      const result = getQuestionId(longSection, longQuestion)
      expect(result.length).toBeLessThanOrEqual(150)
    })
  })

  describe('useSlugify composable', () => {
    it('should return slugify and getQuestionId functions', () => {
      const { slugify: slugifyFn, getQuestionId: getQuestionIdFn } = useSlugify()
      
      expect(typeof slugifyFn).toBe('function')
      expect(typeof getQuestionIdFn).toBe('function')
    })

    it('should work correctly when used as composable', () => {
      const { slugify: slugifyFn, getQuestionId: getQuestionIdFn } = useSlugify()
      
      expect(slugifyFn('Hello World')).toBe('hello-world')
      expect(getQuestionIdFn('Section', 'Question')).toBe('section-question')
    })
  })
})

