/**
 * @fileoverview SEO composable for managing meta tags, Open Graph, Twitter Cards, and structured data
 * @description Provides a centralized way to set SEO metadata across all pages
 */

/**
 * Options for configuring SEO metadata.
 * 
 * @interface SeoOptions
 * @property {string} [title] - Page title (will be suffixed with site name)
 * @property {string} [description] - Meta description
 * @property {string} [image] - Open Graph/Twitter image URL
 * @property {string} [imageAlt] - Alt text for og:image and twitter:image (accessibility)
 * @property {string} [url] - Canonical URL (relative or absolute)
 * @property {'website'|'article'} [type] - Open Graph type (default: 'website')
 * @property {string[]} [keywords] - Meta keywords array
 * @property {string} [author] - Page author
 * @property {string} [publishedTime] - ISO date string for article published time
 * @property {string} [modifiedTime] - ISO date string for article modified time
 * @property {boolean} [noindex] - Whether to prevent indexing
 * @property {boolean} [nofollow] - Whether to prevent following links
 */
export interface SeoOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  url?: string
  type?: 'website' | 'article'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Default site URL for building absolute URLs.
 * 
 * @constant {string}
 * @default 'https://accessibility.icjia.app'
 */
const DEFAULT_SITE_URL = 'https://accessibility.icjia.app'

/**
 * Default site name for page titles and Open Graph.
 * Kept short for title tag (60 char limit): "Page Title | Site Name"
 *
 * @constant {string}
 */
const DEFAULT_SITE_NAME = 'ICJIA Accessibility Portal'

/**
 * Shorter site name for title tag suffix only (SEO best practice: title ≤60 chars).
 *
 * @constant {string}
 */
const TITLE_SITE_SUFFIX = 'ICJIA Accessibility'

/**
 * Default meta description for pages without a custom description.
 * Kept ≤160 chars for SEO/social preview best practice.
 *
 * @constant {string}
 */
const DEFAULT_DESCRIPTION = 'Your resource for WCAG 2.1 AA compliance, accessibility guidelines, and digital accessibility information for Illinois state agencies.'

/**
 * Default Open Graph/Twitter image path.
 * 
 * @constant {string}
 * @default '/icjia-logo.png'
 */
const DEFAULT_IMAGE = '/og-image.png'

/**
 * Default Twitter handle for Twitter Card metadata.
 * 
 * @constant {string}
 * @default '@ICJIA'
 */
const DEFAULT_TWITTER_HANDLE = '@ICJIA'

/** Default alt text for OG/Twitter image (accessibility). */
const DEFAULT_IMAGE_ALT = 'ICJIA Accessibility Portal - WCAG 2.1 AA compliance resources for Illinois state agencies'

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
  
  // Build title with site name suffix (≤60 chars for SEO/social preview)
  const titleSuffix = TITLE_SITE_SUFFIX
  const fullTitle = options.title 
    ? `${options.title} | ${titleSuffix}`
    : siteName
  
  // Use provided description or default
  const description = options.description || DEFAULT_DESCRIPTION
  
  // Build image URL (ensure no double slashes)
  const imagePath = options.image || DEFAULT_IMAGE
  const imageUrl = imagePath.startsWith('http')
    ? imagePath
    : `${siteUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
  const imageAlt = options.imageAlt || DEFAULT_IMAGE_ALT
  
  // Set basic meta tags
  useSeoMeta({
    title: fullTitle,
    description,
    keywords: options.keywords?.join(', ') || 'accessibility, WCAG, WCAG 2.1, AA compliance, digital accessibility, web accessibility, ADA, Section 508, Illinois, state agency, ICJIA',
    author: options.author || 'Illinois Criminal Justice Information Authority',
    robots: options.noindex 
      ? (options.nofollow ? 'noindex, nofollow' : 'noindex')
      : (options.nofollow ? 'nofollow' : 'index, follow'),
  })
  
  // Set Open Graph, Twitter Card, and article meta tags via useHead
  // (useSeoMeta doesn't support these properties directly)
  useHead({
    meta: [
      // Open Graph tags
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: options.type || 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'en_US' },
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: DEFAULT_TWITTER_HANDLE },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: imageAlt },
      // Article meta tags (if type is article)
      ...(options.type === 'article' ? [
        ...(options.publishedTime ? [{ property: 'article:published_time', content: options.publishedTime }] : []),
        ...(options.modifiedTime ? [{ property: 'article:modified_time', content: options.modifiedTime }] : []),
        ...(options.author ? [{ property: 'article:author', content: options.author }] : []),
      ] : []),
    ],
    link: [
      {
        rel: 'canonical',
        href: fullUrl,
      },
    ],
  })
  
  /**
   * Return value containing the computed SEO values.
   * 
   * @returns {Object} Object containing:
   * - `title`: Full page title with site name
   * - `description`: Meta description
   * - `url`: Full canonical URL
   * - `image`: Full image URL
   */
  return {
    title: fullTitle,
    description,
    url: fullUrl,
    image: imageUrl,
  }
}

