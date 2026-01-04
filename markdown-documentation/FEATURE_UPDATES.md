# Feature Updates & Enhancements

**Purpose**: Log of major feature additions and improvements  
**Last Updated**: January 4, 2026

---

## January 2026

### Documentation Portal Best Practices Guide ⭐ NEW

**Date**: January 4, 2026

**Overview**: Created comprehensive LLM-ready guide for creating documentation portals

**Purpose**:

- Step-by-step guide for LLMs and developers to replicate the entire `/docs/` structure
- Universal applicability for any Vue/Nuxt/Vuetify project
- Complete code snippets with direct GitHub links

**New File**: [`DOCUMENTATION_PORTAL_BEST_PRACTICES.md`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/DOCUMENTATION_PORTAL_BEST_PRACTICES.md)

**Contents**:

- Portal structure and directory organization
- Accessibility testing report generation (axe-core)
- Unit/E2E test report generation (Vitest)
- JSDoc/TypeDoc API documentation
- Architecture documentation
- Build automation and npm scripts
- Nuxt configuration for static docs

---

### Responsive Download Dialog ⭐ NEW

**Date**: January 4, 2026

**Overview**: Enhanced DownloadDialog component for full responsive support

**Changes**:

- Added fullscreen mode on mobile (< 600px) using Vuetify's `useDisplay` composable
- Comprehensive CSS media queries for all viewport sizes
- Touch-friendly minimum heights (60px) on mobile
- Landscape orientation optimizations
- High contrast mode support (forced-colors)
- Reduced motion preference support

**Technical Details**:

- Graceful fallback when Vuetify context is unavailable (test environments)
- 5 breakpoints: desktop, tablet, small tablet, mobile, very small
- Print mode hidden

---

### Chicago Timezone Handling ⭐ NEW

**Date**: January 4, 2026

**Overview**: All date calculations now use explicit Chicago timezone offsets

**Changes**:

- `useDeadlineCountdown.ts`: Uses `-05:00` (CDT) for April 2026 deadline
- `faqTransform.ts`: "New" badge comparisons in Chicago timezone
- All tests updated to use Chicago timezone offsets

**Why This Matters**:

- Illinois state agencies need consistent date display
- JavaScript `new Date()` uses local timezone (varies by environment)
- Explicit offsets ensure same behavior across servers and clients

---

### Expanded Test Descriptions ⭐ NEW

**Date**: January 4, 2026

**Overview**: All test cases now include detailed descriptions in HTML report

**Changes**:

- Added `TEST_DESCRIPTIONS` object in `test/run-all-tests.js`
- Each test has 2-4 sentence explanation covering:
  - What is being tested
  - Why it matters (accessibility, compliance, UX)
  - Technical implementation details
  - Expected outcomes

**Benefits**:

- Tests serve as living documentation
- New developers understand test purpose
- HTML reports are self-explanatory
- AI/LLM can understand testing requirements

---

### Accessible Document Downloads ⭐ NEW

**Date**: January 4, 2026

**Overview**: Replaced PDF download with fully accessible document formats (Word .docx and Plain Text .txt)

**Problem**:

- PDF files generated via browser print-to-PDF are not accessible to screen readers
- Playwright/Puppeteer's `page.pdf()` does not produce tagged PDFs
- Screen reader users could not navigate the PDF document structure
- Did not meet PDF/UA accessibility standards

**Solution**:

- Removed PDF generation entirely
- Added two accessible download formats:
  - **Word Document (.docx)**: Preserves heading structure, tables, links, and formatting
  - **Plain Text (.txt)**: Universal format readable by any device or assistive technology
- Created download format selection dialog with clear descriptions

**Changes**:

- **New Scripts**:
  - [`scripts/generate-faq-docx.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/scripts/generate-faq-docx.js) - Word document generator using `docx` package
  - [`scripts/generate-faq-txt.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/scripts/generate-faq-txt.js) - Plain text generator
- **New Component**: [`app/components/DownloadDialog.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/DownloadDialog.vue)
- **Updated Components**: `AppNavbar.vue`, `AppFooter.vue` - Download button now opens format selection dialog
- **Removed from sitemap**: `/faqs.pdf` route

**Technical Details**:

- Word document features:
  - Proper heading hierarchy (H1-H4)
  - Hyperlinks preserved
  - Tables with headers
  - Page numbers
  - Document metadata (title, subject, keywords)
- Plain text features:
  - Structured with visual separators
  - Header and footer with metadata
  - Links shown as `text (URL)` format
  - Universal compatibility

**Impact**:

- ✅ 100% accessible document downloads
- ✅ Screen reader users can navigate document structure
- ✅ Works with all assistive technologies
- ✅ Word format supports navigation via heading styles
- ✅ Plain text works on any device

**Documentation**: Updated SEO_GUIDE.md, PRINTER_FRIENDLY_GUIDE.md

---

### Netlify Deployment Fix: Prerender 404 Errors

**Date**: January 2, 2026

**Overview**: Fixed Netlify deployment failures caused by Nitro attempting to prerender static documentation routes

**Problem**:

- Build was failing with `[404] Page not found: /docs/architecture`
- Nitro's link crawling discovered links to `/docs/architecture` from multiple pages
- Attempted to prerender it as a Nuxt route, but it's a static HTML file in `public/`
- Build aborted with `Exiting due to prerender errors`

**Solution**:

- Added `/docs/architecture` to the prerender ignore list in `nuxt.config.ts`
- Static files in `public/` are automatically copied during build
- Ignoring them prevents Nitro from trying to prerender them as routes

**Changes**:

- **File**: [`nuxt.config.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/nuxt.config.ts)
- **Configuration**: `ignore: ['/docs/accessibility', '/docs/architecture']`
- Both routes are static HTML files, not Nuxt routes

**Impact**:

- ✅ Build completes successfully
- ✅ No 404 errors during prerendering
- ✅ Static documentation routes remain accessible
- ✅ Links to documentation work correctly

**Documentation**: [ARCHITECTURE_GUIDE.md - Challenge 8](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md#challenge-8-prerender-404-errors-for-static-documentation-routes)

---

### Footer Refactor

**Date**: January 1, 2026

**Overview**: Complete redesign of application footer with modern, centered layout

**Changes**:

- **Clickable Copyright**: ICJIA copyright now links to https://icjia.illinois.gov
- **Modern Design**: Centered layout with visual hierarchy
- **Enhanced Links**: GitHub, Print FAQs, Accessibility Report
- **Responsive**: 4 breakpoints (desktop → small mobile)
- **Accessible**: Proper ARIA labels, focus indicators

**Technical Details**:

- Component: [`app/components/AppFooter.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/AppFooter.vue)
- Structure: Vertical stacking, centered alignment
- Icons: Material Design Icons (16px)
- Separators: Bullet points (•) between links (hidden on small mobile)

**Accessibility**:

- ✅ `role="contentinfo"` on footer
- ✅ `<nav aria-label="Footer navigation">`
- ✅ Descriptive ARIA labels on all links
- ✅ `:focus-visible` for keyboard-only focus indicators
- ✅ 2px outline + background highlight on focus

**Documentation**: [FOOTER_REFACTOR.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/FOOTER_REFACTOR.md)

---

### GitHub Links in Architecture Guide

**Date**: January 1, 2026

**Overview**: Added 30+ direct GitHub links to source files in ARCHITECTURE_GUIDE.md

**Changes**:

- **30+ Links Added**: Every code snippet now has GitHub link
- **File Format**: `[filename.ext](github-url)` before each snippet
- **Benefits**: Click filename → view full source on GitHub
- **Note Added**: Banner at top explaining the links

**Impact**:

- ✅ Instant access to source code
- ✅ Always current (links to `main` branch)
- ✅ Better developer experience
- ✅ Easier code verification

**Link Format**:

```
https://github.com/ICJIA/icjia-accessibility-portal/blob/main/[file-path]
```

**Documentation**: [ARCHITECTURE_GUIDE_GITHUB_LINKS.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE_GITHUB_LINKS.md)

---

### Search Functionality ⭐ NEW

**Date**: January 3, 2026

**Overview**: Implemented full-text fuzzy search across all FAQs using Fuse.js

**Features**:

- ✅ **Fuzzy Search**: Tolerant matching for typos and partial words
- ✅ **Relevance Ranking**: Results sorted by match quality (Excellent → Good → Fair → Partial)
- ✅ **Match Highlighting**: Visual indicators showing where matches occurred
- ✅ **Configurable**: External `search.config.json` for easy tuning
- ✅ **Accessible**: Full keyboard navigation, ARIA labels, screen reader friendly
- ✅ **Responsive**: Works across all viewport sizes

**Technical Details**:

- Search engine: Fuse.js (lightweight, client-side fuzzy search)
- Configuration: [`search.config.json`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/search.config.json)
- Page: [`app/pages/search.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/pages/search.vue)
- Tests: `test/unit/searchConfig.test.ts`, `test/nuxt/search.test.ts`

**Search Configuration**:

- Threshold: 0.25 (balanced fuzzy matching)
- Keys: Question (weight 0.7), Answer (weight 0.3)
- Min search length: 2 characters
- Relevance labels with color-coded badges

**Documentation**: [ARCHITECTURE_GUIDE.md - Search Functionality](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md#search-functionality)

---

### JSDoc/TypeDoc API Documentation ⭐ NEW

**Date**: January 3, 2026

**Overview**: Comprehensive API documentation generated from JSDoc comments using TypeDoc

**Features**:

- ✅ **Composables Documentation**: All 6 composables fully documented
- ✅ **Utilities Documentation**: `faqTransform.ts` with all functions and types
- ✅ **Plugins Documentation**: All 7 client/server plugins documented
- ✅ **Vue Components**: All 5 components with extracted JSDoc
- ✅ **Vue Pages**: All 5 pages with extracted JSDoc
- ✅ **Interface Definitions**: TypeScript interfaces for all data types
- ✅ **Source Links**: Direct links to GitHub source files
- ✅ **Searchable**: Full-text search across all documentation

**Technical Details**:

- Generator: TypeDoc 0.28+
- Vue Script Extractor: Custom script to extract `<script setup>` from Vue SFCs
- Configuration: [`typedoc.json`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/typedoc.json)
- Output: `public/docs/jsdoc/`
- Command: `yarn generate:jsdoc`

**Documentation Coverage**:

- 6 composables with full JSDoc
- 1 utility file with 15+ functions
- 7 plugins with module documentation
- 5 Vue components with extracted documentation
- 5 Vue pages with extracted documentation
- 5+ interfaces and type definitions

**Documentation**: [Documentation Portal - API Docs](https://accessibility.icjia.app/docs/jsdoc/)

---

## Future Enhancements

### Planned

- Enhanced analytics integration
- Additional print templates

### Under Consideration

- PWA support for offline access
- Internationalization (i18n)
- Interactive FAQ wizard

---

**Maintained By**: ICJIA Development Team
