/**
 * @fileoverview Structured data composable for JSON-LD schema markup
 * @description Provides functions to add structured data (FAQ, Organization, etc.) for better SEO
 */

const DEFAULT_SITE_URL = 'https://accessibility.icjia.app'
const DEFAULT_ORG_NAME = 'Illinois Criminal Justice Information Authority'
const DEFAULT_ORG_ABBREV = 'ICJIA'

export interface FAQItem {
  question: string
  answer: string
}

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
 * Adds FAQ structured data (JSON-LD) to the page
 * This helps search engines understand and potentially display FAQ content in rich results
 * 
 * @param faqs - Array of FAQ items with question and answer
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
        children: JSON.stringify(structuredData),
      },
    ],
  })
}

/**
 * Adds Organization structured data (JSON-LD) to the page
 * This helps search engines understand the organization behind the site
 * 
 * @param data - Organization data (optional, uses defaults if not provided)
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
        children: JSON.stringify(structuredData),
      },
    ],
  })
}

/**
 * Adds WebSite structured data with search action
 * This enables Google's sitelinks search box feature
 * 
 * @param searchUrl - URL pattern for search (e.g., '/search?q={search_term_string}')
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
        children: JSON.stringify(structuredData),
      },
    ],
  })
}

/**
 * Adds BreadcrumbList structured data
 * Helps search engines understand the site hierarchy
 * 
 * @param items - Array of breadcrumb items with name and url
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
        children: JSON.stringify(structuredData),
      },
    ],
  })
}

