/**
 * @fileoverview Structured data composable for JSON-LD schema markup
 * @description Provides functions to add structured data (FAQ, Organization, etc.) for better SEO
 * 
 * @module useStructuredData
 */

/**
 * Default site URL for building absolute URLs in structured data.
 * 
 * @constant {string}
 * @default 'https://accessibility.icjia.app'
 */
const DEFAULT_SITE_URL = 'https://accessibility.icjia.app'

/**
 * Default organization name for structured data.
 * 
 * @constant {string}
 * @default 'Illinois Criminal Justice Information Authority'
 */
const DEFAULT_ORG_NAME = 'Illinois Criminal Justice Information Authority'

/**
 * Default organization abbreviation for structured data.
 * 
 * @constant {string}
 * @default 'ICJIA'
 */
const DEFAULT_ORG_ABBREV = 'ICJIA'

/**
 * Interface for FAQ items used in structured data.
 * 
 * @interface FAQItem
 * @property {string} question - The FAQ question text
 * @property {string} answer - The FAQ answer text
 */
export interface FAQItem {
  question: string
  answer: string
}

/**
 * Interface for organization data used in structured data.
 * 
 * @interface OrganizationData
 * @property {string} [name] - Organization name (defaults to ICJIA)
 * @property {string} [url] - Organization URL (defaults to site URL)
 * @property {string} [logo] - Logo URL path (defaults to /icjia-logo.png)
 * @property {string} [description] - Organization description
 * @property {Object} [contactPoint] - Contact point information
 * @property {string} [contactPoint.contactType] - Type of contact (e.g., 'Customer Service')
 * @property {string} [contactPoint.email] - Contact email address
 */
export interface OrganizationData {
  name?: string
  url?: string
  logo?: string
  description?: string
  contactPoint?: {
    contactType?: string
    email?: string
  }
}

/**
 * Adds FAQ structured data (JSON-LD) to the page.
 * 
 * This helps search engines understand and potentially display FAQ content in rich results.
 * The structured data follows Schema.org FAQPage format.
 * 
 * @param {FAQItem[]} faqs - Array of FAQ items with question and answer
 * @returns {void}
 * 
 * @example
 * ```ts
 * useFAQStructuredData([
 *   { question: 'What is WCAG?', answer: 'Web Content Accessibility Guidelines' },
 *   { question: 'What is the deadline?', answer: 'April 24, 2026' }
 * ])
 * ```
 */
export function useFAQStructuredData(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData),
      },
    ],
  })
}

/**
 * Adds Organization structured data (JSON-LD) to the page.
 * 
 * This helps search engines understand the organization behind the site.
 * The structured data follows Schema.org GovernmentOrganization format.
 * 
 * @param {OrganizationData} [data={}] - Organization data (optional, uses defaults if not provided)
 * @returns {void}
 * 
 * @example
 * ```ts
 * useOrganizationStructuredData({
 *   name: 'ICJIA',
 *   url: 'https://accessibility.icjia.app',
 *   logo: '/icjia-logo.png'
 * })
 * ```
 */
export function useOrganizationStructuredData(data: OrganizationData = {}) {
  const config = useRuntimeConfig()
  const siteUrl = config.public?.siteUrl || DEFAULT_SITE_URL
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: data.name || DEFAULT_ORG_NAME,
    alternateName: DEFAULT_ORG_ABBREV,
    url: data.url || siteUrl,
    logo: data.logo ? `${siteUrl}${data.logo.startsWith('/') ? data.logo : `/${data.logo}`}` : `${siteUrl}/icjia-logo.png`,
    description: data.description || 'Illinois Criminal Justice Information Authority - Digital Accessibility Portal',
    ...(data.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: data.contactPoint.contactType || 'Customer Service',
        email: data.contactPoint.email || 'DoIT.Accessibility@Illinois.gov',
      },
    }),
  }
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData),
      },
    ],
  })
}

/**
 * Adds WebSite structured data with search action.
 * 
 * This enables Google's sitelinks search box feature, allowing users to search
 * directly from Google search results.
 * 
 * @param {string} [searchUrl] - URL pattern for search (e.g., '/search?q={search_term_string}')
 * @returns {void}
 * 
 * @example
 * ```ts
 * useWebSiteStructuredData('/search?q={search_term_string}')
 * ```
 */
export function useWebSiteStructuredData(searchUrl?: string) {
  const config = useRuntimeConfig()
  const siteUrl = config.public?.siteUrl || DEFAULT_SITE_URL
  
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ICJIA Accessibility Portal',
    url: siteUrl,
    description: 'Your resource for WCAG 2.1 AA compliance, accessibility guidelines, and digital accessibility information for Illinois state agencies.',
    publisher: {
      '@type': 'GovernmentOrganization',
      name: DEFAULT_ORG_NAME,
      alternateName: DEFAULT_ORG_ABBREV,
    },
  }
  
  if (searchUrl) {
    structuredData.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}${searchUrl.startsWith('/') ? searchUrl : `/${searchUrl}`}`,
      },
      'query-input': 'required name=search_term_string',
    }
  }
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData),
      },
    ],
  })
}

/**
 * Adds BreadcrumbList structured data.
 * 
 * Helps search engines understand the site hierarchy and can display breadcrumbs
 * in search results. The structured data follows Schema.org BreadcrumbList format.
 * 
 * @param {Array<{name: string, url: string}>} items - Array of breadcrumb items with name and url
 * @returns {void}
 * 
 * @example
 * ```ts
 * useBreadcrumbStructuredData([
 *   { name: 'Home', url: '/' },
 *   { name: 'FAQs', url: '/faqs' }
 * ])
 * ```
 */
export function useBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  if (!items || items.length === 0) return
  
  const config = useRuntimeConfig()
  const siteUrl = config.public?.siteUrl || DEFAULT_SITE_URL
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  }
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData),
      },
    ],
  })
}

