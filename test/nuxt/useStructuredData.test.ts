import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  useFAQStructuredData,
  useOrganizationStructuredData,
  useWebSiteStructuredData,
  useBreadcrumbStructuredData,
  type FAQItem
} from '../../app/composables/useStructuredData'

describe('useStructuredData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useFAQStructuredData', () => {
    it('should handle empty FAQ array', () => {
      // Should not throw error with empty array
      expect(() => useFAQStructuredData([])).not.toThrow()
    })

    it('should handle FAQ items', () => {
      const faqs: FAQItem[] = [
        { question: 'What is WCAG?', answer: 'Web Content Accessibility Guidelines' },
        { question: 'What is the deadline?', answer: 'April 24, 2026' }
      ]
      
      expect(() => useFAQStructuredData(faqs)).not.toThrow()
    })

    it('should handle single FAQ item', () => {
      const faqs: FAQItem[] = [
        { question: 'What is accessibility?', answer: 'Making content usable by everyone' }
      ]
      
      expect(() => useFAQStructuredData(faqs)).not.toThrow()
    })

    it('should handle FAQ with special characters', () => {
      const faqs: FAQItem[] = [
        { question: 'What is WCAG 2.1?', answer: 'Version 2.1 of the guidelines' }
      ]
      
      expect(() => useFAQStructuredData(faqs)).not.toThrow()
    })
  })

  describe('useOrganizationStructuredData', () => {
    it('should work with default values', () => {
      expect(() => useOrganizationStructuredData()).not.toThrow()
    })

    it('should handle custom organization name', () => {
      expect(() => useOrganizationStructuredData({
        name: 'Custom Organization'
      })).not.toThrow()
    })

    it('should handle custom URL', () => {
      expect(() => useOrganizationStructuredData({
        url: 'https://example.com'
      })).not.toThrow()
    })

    it('should handle custom logo', () => {
      expect(() => useOrganizationStructuredData({
        logo: '/custom-logo.png'
      })).not.toThrow()
    })

    it('should handle logo with leading slash', () => {
      expect(() => useOrganizationStructuredData({
        logo: '/logo.png'
      })).not.toThrow()
    })

    it('should handle logo without leading slash', () => {
      expect(() => useOrganizationStructuredData({
        logo: 'logo.png'
      })).not.toThrow()
    })

    it('should handle custom description', () => {
      expect(() => useOrganizationStructuredData({
        description: 'Custom description'
      })).not.toThrow()
    })

    it('should handle contact point', () => {
      expect(() => useOrganizationStructuredData({
        contactPoint: {
          contactType: 'Customer Service',
          email: 'test@example.com'
        }
      })).not.toThrow()
    })

    it('should handle all options together', () => {
      expect(() => useOrganizationStructuredData({
        name: 'Test Org',
        url: 'https://test.com',
        logo: '/test-logo.png',
        description: 'Test description',
        contactPoint: {
          contactType: 'Support',
          email: 'support@test.com'
        }
      })).not.toThrow()
    })
  })

  describe('useWebSiteStructuredData', () => {
    it('should work without search URL', () => {
      expect(() => useWebSiteStructuredData()).not.toThrow()
    })

    it('should handle search URL with leading slash', () => {
      expect(() => useWebSiteStructuredData('/search?q={search_term_string}')).not.toThrow()
    })

    it('should handle search URL without leading slash', () => {
      expect(() => useWebSiteStructuredData('search?q={search_term_string}')).not.toThrow()
    })
  })

  describe('useBreadcrumbStructuredData', () => {
    it('should handle empty breadcrumb array', () => {
      expect(() => useBreadcrumbStructuredData([])).not.toThrow()
    })

    it('should handle single breadcrumb', () => {
      const items = [
        { name: 'Home', url: '/' }
      ]
      
      expect(() => useBreadcrumbStructuredData(items)).not.toThrow()
    })

    it('should handle multiple breadcrumbs', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'FAQs', url: '/faqs' }
      ]
      
      expect(() => useBreadcrumbStructuredData(items)).not.toThrow()
    })

    it('should handle breadcrumbs with URLs with leading slash', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Links', url: '/links' }
      ]
      
      expect(() => useBreadcrumbStructuredData(items)).not.toThrow()
    })

    it('should handle breadcrumbs with URLs without leading slash', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'FAQs', url: 'faqs' }
      ]
      
      expect(() => useBreadcrumbStructuredData(items)).not.toThrow()
    })
  })
})

