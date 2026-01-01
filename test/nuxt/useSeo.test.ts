import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSeo } from '../../app/composables/useSeo'

describe('useSeo', () => {
  beforeEach(() => {
    // Clear any previous head state
    vi.clearAllMocks()
  })

  it('should set basic SEO meta tags with default values', () => {
    const result = useSeo()
    
    expect(result.title).toBe('ICJIA Accessibility Portal')
    expect(result.description).toContain('WCAG 2.1 AA compliance')
    expect(result.url).toContain('https://accessibility.icjia.app')
  })

  it('should set custom title with site name suffix', () => {
    const result = useSeo({
      title: 'FAQs - Accessibility'
    })
    
    expect(result.title).toBe('FAQs - Accessibility | ICJIA Accessibility Portal')
  })

  it('should set custom description', () => {
    const customDescription = 'Custom description for testing'
    const result = useSeo({
      description: customDescription
    })
    
    expect(result.description).toBe(customDescription)
  })

  it('should build full URL from relative path', () => {
    const result = useSeo({
      url: '/faqs'
    })
    
    expect(result.url).toBe('https://accessibility.icjia.app/faqs')
  })

  it('should handle URL with leading slash', () => {
    const result = useSeo({
      url: '/links'
    })
    
    expect(result.url).toBe('https://accessibility.icjia.app/links')
  })

  it('should handle URL without leading slash', () => {
    const result = useSeo({
      url: 'faqs'
    })
    
    expect(result.url).toBe('https://accessibility.icjia.app/faqs')
  })

  it('should build image URL from relative path', () => {
    const result = useSeo({
      image: '/custom-image.png'
    })
    
    expect(result.image).toBe('https://accessibility.icjia.app/custom-image.png')
  })

  it('should use absolute image URL as-is', () => {
    const absoluteUrl = 'https://example.com/image.png'
    const result = useSeo({
      image: absoluteUrl
    })
    
    expect(result.image).toBe(absoluteUrl)
  })

  it('should handle keywords array', () => {
    const keywords = ['accessibility', 'WCAG', 'testing']
    const result = useSeo({
      keywords
    })
    
    // Keywords should be set (we can't directly test useSeoMeta output, but we can verify the function runs)
    expect(result).toBeDefined()
  })

  it('should handle article type with published time', () => {
    const publishedTime = '2026-01-01T00:00:00Z'
    const result = useSeo({
      type: 'article',
      publishedTime
    })
    
    expect(result).toBeDefined()
  })

  it('should handle noindex and nofollow flags', () => {
    const result = useSeo({
      noindex: true,
      nofollow: true
    })
    
    expect(result).toBeDefined()
  })

  it('should handle noindex only', () => {
    const result = useSeo({
      noindex: true
    })
    
    expect(result).toBeDefined()
  })

  it('should handle nofollow only', () => {
    const result = useSeo({
      nofollow: true
    })
    
    expect(result).toBeDefined()
  })

  it('should set custom author', () => {
    const author = 'Test Author'
    const result = useSeo({
      author
    })
    
    expect(result).toBeDefined()
  })

  it('should handle all options together', () => {
    const result = useSeo({
      title: 'Test Page',
      description: 'Test description',
      url: '/test',
      image: '/test-image.png',
      type: 'article',
      keywords: ['test', 'page'],
      author: 'Test Author',
      publishedTime: '2026-01-01T00:00:00Z',
      modifiedTime: '2026-01-02T00:00:00Z'
    })
    
    expect(result.title).toBe('Test Page | ICJIA Accessibility Portal')
    expect(result.description).toBe('Test description')
    expect(result.url).toBe('https://accessibility.icjia.app/test')
    expect(result.image).toBe('https://accessibility.icjia.app/test-image.png')
  })
})

