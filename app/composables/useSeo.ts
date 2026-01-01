/**
 * @fileoverview SEO composable for managing meta tags, Open Graph, Twitter Cards, and structured data
 * @description Provides a centralized way to set SEO metadata across all pages
 */

export interface SeoOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  nofollow?: boolean
}

const DEFAULT_SITE_URL = 'https://accessibility.icjia.app'
const DEFAULT_SITE_NAME = 'ICJIA Accessibility Portal'
const DEFAULT_DESCRIPTION = 'Your resource for WCAG 2.1 AA compliance, accessibility guidelines, and digital accessibility information for Illinois state agencies.'
const DEFAULT_IMAGE = '/icjia-logo.png'
const DEFAULT_TWITTER_HANDLE = '@ICJIA'

/**
 * Composable for managing SEO metadata
 * Sets up comprehensive SEO including:
 * - Basic meta tags (title, description, keywords)
 * - Open Graph tags for social sharing
 * - Twitter Card metadata
 * - Canonical URLs
 * - Robots meta tags
 * 
 * @param options - SEO configuration options
 * @example
 * ```ts
 * useSeo({
 *   title: 'FAQs - Accessibility',
 *   description: 'Common questions about web accessibility',
 *   url: '/faqs'
 * })
 * ```
 */
export function useSeo(options: SeoOptions = {}) {
  const route = useRoute()
  const config = useRuntimeConfig()
  
  // Get base URL from config or use default
  const siteUrl = config.public?.siteUrl || DEFAULT_SITE_URL
  const siteName = config.public?.siteName || DEFAULT_SITE_NAME
  
  // Build full URL
  const fullUrl = options.url 
    ? `${siteUrl}${options.url.startsWith('/') ? options.url : `/${options.url}`}`
    : `${siteUrl}${route.path}`
  
  // Build title with site name suffix
  const fullTitle = options.title 
    ? `${options.title} | ${siteName}`
    : siteName
  
  // Use provided description or default
  const description = options.description || DEFAULT_DESCRIPTION
  
  // Build image URL
  const imageUrl = options.image?.startsWith('http')
    ? options.image
    : `${siteUrl}${options.image?.startsWith('/') ? options.image : `/${options.image || DEFAULT_IMAGE}`}`
  
  // Set basic meta tags
  useSeoMeta({
    title: fullTitle,
    description,
    keywords: options.keywords?.join(', ') || 'accessibility, WCAG, WCAG 2.1, AA compliance, digital accessibility, web accessibility, ADA, Section 508, Illinois, state agency, ICJIA',
    author: options.author || 'Illinois Criminal Justice Information Authority',
    robots: options.noindex 
      ? (options.nofollow ? 'noindex, nofollow' : 'noindex')
      : (options.nofollow ? 'nofollow' : 'index, follow'),
    'og:title': fullTitle,
    'og:description': description,
    'og:image': imageUrl,
    'og:url': fullUrl,
    'og:type': options.type || 'website',
    'og:site_name': siteName,
    'og:locale': 'en_US',
    'twitter:card': 'summary_large_image',
    'twitter:site': DEFAULT_TWITTER_HANDLE,
    'twitter:title': fullTitle,
    'twitter:description': description,
    'twitter:image': imageUrl,
  })
  
  // Set canonical URL
  useHead({
    link: [
      {
        rel: 'canonical',
        href: fullUrl,
      },
    ],
  })
  
  // Add article meta tags if type is article
  if (options.type === 'article') {
    useSeoMeta({
      'article:published_time': options.publishedTime,
      'article:modified_time': options.modifiedTime,
      'article:author': options.author,
    })
  }
  
  return {
    title: fullTitle,
    description,
    url: fullUrl,
    image: imageUrl,
  }
}

