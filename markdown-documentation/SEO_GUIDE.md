# SEO Guide

**Last Updated**: January 1, 2026

---

## Optimization Recommendations

### Current Implementation

**Sitemap**: Auto-generated at `public/sitemap.xml`  
**Robots.txt**: Configured at `public/robots.txt`  
**Meta Tags**: Implemented via `useSeo` composable

### Key SEO Features

**Technical SEO**:
- ✅ Static site generation (fast, crawlable)
- ✅ Automatic sitemap generation
- ✅ Proper meta tags (title, description)
- ✅ Canonical URLs
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design

**Content SEO**:
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Descriptive page titles
- ✅ Alt text for images
- ✅ Internal linking structure

---

## Implementation & Verification

### Sitemap Configuration

**File**: [`scripts/generate-sitemap.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/scripts/generate-sitemap.js)

**Includes**:
- `/` (priority: 1.0)
- `/faqs` (priority: 0.8)
- `/faqs-print` (priority: 0.8)
- `/links` (priority: 0.8)

**Excludes**: `/docs/*` routes

**Generation**: Automatic during build

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
  keywords: ["accessibility", "WCAG", "ADA"]
});
```

### Verification Status

✅ All pages have proper meta tags  
✅ Sitemap generated and accessible  
✅ Robots.txt configured  
✅ Canonical URLs set  
✅ Mobile-responsive verified  

---

## Related Documentation

- [ARCHITECTURE_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md) - Section 8: Best Practices

---

**Maintained By**: ICJIA Development Team

