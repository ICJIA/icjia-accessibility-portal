# SEO Guide

**Last Updated**: January 4, 2026

---

## Overview

This guide covers the SEO implementation for the ICJIA Accessibility Portal and recommended external actions to improve search visibility.

## Current Implementation

**Sitemap**: Auto-generated at `public/sitemap.xml`  
**Robots.txt**: Configured at `public/robots.txt`  
**Meta Tags**: Implemented via `useSeo` composable  
**Structured Data**: JSON-LD via `useStructuredData` composable

### Technical SEO Features

| Feature                               | Status | Implementation                 |
| ------------------------------------- | ------ | ------------------------------ |
| Static site generation (SSG)          | ✅     | Nuxt generate                  |
| Automatic sitemap generation          | ✅     | `scripts/generate-sitemap.js`  |
| Google Search Console verified        | ✅     | `google0bc0c1c6e02aa032.html`  |
| Proper meta tags (title, description) | ✅     | `useSeo` composable            |
| Open Graph tags                       | ✅     | `useSeo` composable            |
| Twitter Card tags                     | ✅     | `useSeo` composable            |
| Canonical URLs                        | ✅     | `useSeo` composable            |
| Structured Data (JSON-LD)             | ✅     | `useStructuredData` composable |
| Semantic HTML5 structure              | ✅     | Vue templates                  |
| Mobile-responsive design              | ✅     | Vuetify + CSS                  |
| `lang="en"` attribute                 | ✅     | `nuxt.config.ts`               |
| Theme color meta                      | ✅     | `nuxt.config.ts`               |
| Privacy-friendly analytics            | ✅     | Plausible                      |

### Content SEO Features

- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Descriptive page titles with brand suffix
- ✅ Alt text for images
- ✅ Internal linking structure
- ✅ Downloadable PDF version of FAQs

---

## Sitemap Configuration

**File**: [`scripts/generate-sitemap.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/scripts/generate-sitemap.js)

**Included Routes**:
| Route | Priority | Description |
|-------|----------|-------------|
| `/` | 1.0 | Homepage with countdown + FAQs |
| `/faqs` | 0.8 | Full FAQ page |
| `/faqs-print` | 0.8 | Printer-friendly FAQs |
| `/links` | 0.8 | Accessibility resources |
| `/search` | 0.8 | FAQ search |
| `/faqs.pdf` | 0.8 | Downloadable PDF |

**Excluded**: `/docs/*` routes (internal documentation)

**Generation**: Automatic during `yarn generate`

### Meta Tags

**Implementation**: [`app/composables/useSeo.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useSeo.ts)

**Includes**:

- Title and description
- Open Graph tags
- Twitter Card tags
- Canonical URL

**Example Usage**:

```typescript
useSeo({
  title: "FAQs - Accessibility Portal",
  description: "Comprehensive FAQ about web accessibility...",
  url: "/faqs",
  keywords: ["accessibility", "WCAG", "ADA"],
});
```

---

## Structured Data (JSON-LD)

The site implements multiple structured data schemas for rich search results:

### Homepage (`/`)

- `GovernmentOrganization` — Identifies ICJIA as a government organization
- `WebSite` — Enables sitelinks search box potential

### FAQs Page (`/faqs`)

- `FAQPage` — 93 FAQ items for potential rich FAQ snippets in Google
- `BreadcrumbList` — Navigation hierarchy

### Links Page (`/links`)

- `BreadcrumbList` — Navigation hierarchy

---

## External Actions to Increase SEO

Beyond the on-site implementation, here are external actions you can take:

### 1. Google Search Console (Already Done ✅)

- Site verified via `google0bc0c1c6e02aa032.html`
- Sitemap submitted

### 2. Bing Webmaster Tools

- **Action**: Submit your site at [Bing Webmaster Tools](https://www.bing.com/webmasters/)
- Add a similar verification file or DNS TXT record
- Submit your sitemap: `https://accessibility.icjia.app/sitemap.xml`

### 3. Request Indexing for Key Pages

- In Google Search Console → URL Inspection → Request indexing for:
  - `https://accessibility.icjia.app/`
  - `https://accessibility.icjia.app/faqs`
  - `https://accessibility.icjia.app/links`

### 4. Monitor Core Web Vitals

- In Google Search Console → Experience → Core Web Vitals
- Current site is static and should score well
- Use [PageSpeed Insights](https://pagespeed.web.dev/) for detailed analysis

### 5. Build Backlinks (Government/Accessibility Community)

- Request links from:
  - Illinois.gov accessibility resources
  - Other state agency accessibility pages
  - WebAIM, W3C WAI community pages
  - Government IT newsletters or blogs

### 6. Social Sharing

- Share key pages on:
  - LinkedIn (ICJIA official page)
  - Twitter/X (@ICJIA handle referenced in meta tags)
  - Government accessibility communities

### 7. Monitor Rich Results

- Use [Google Rich Results Test](https://search.google.com/test/rich-results) to verify:
  - FAQPage schema renders correctly
  - Organization schema is valid

### 8. Schema Markup Validation

- Test structured data at [Schema.org Validator](https://validator.schema.org/)
- Enter URL: `https://accessibility.icjia.app/faqs`

---

## Verification Checklist

| Check                            | Status |
| -------------------------------- | ------ |
| All pages have proper meta tags  | ✅     |
| Sitemap generated and accessible | ✅     |
| Robots.txt configured correctly  | ✅     |
| Canonical URLs set               | ✅     |
| Mobile-responsive verified       | ✅     |
| Google Search Console verified   | ✅     |
| Structured data valid            | ✅     |
| PDF included in sitemap          | ✅     |

---

## Related Documentation

- [ARCHITECTURE_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md) - Section 8: Best Practices
- [DOCUMENTATION_PORTAL.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/DOCUMENTATION_PORTAL.md) - Documentation portal guide

---

**Maintained By**: ICJIA Development Team
