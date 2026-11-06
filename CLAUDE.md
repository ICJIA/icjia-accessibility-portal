# CLAUDE.md - AI Assistant Guide for ICJIA Accessibility Portal

This document provides essential context for AI assistants working on this codebase.

## Project Overview

**ICJIA Accessibility Portal** is a Nuxt 4/Vue 3 static site for the Illinois Criminal Justice Information Authority (ICJIA). It provides accessibility resources, FAQs, and a countdown timer for the **ADA Title II April 26, 2027 compliance deadline**.

**Live site**: https://accessibility.icjia.app

### Purpose
- Centralized accessibility information hub for Illinois state agencies
- Comprehensive FAQ system about WCAG 2.1 AA compliance
- Countdown timer to the April 26, 2027 deadline
- Curated accessibility resource links

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | **Nuxt 4** (Vue 3 + TypeScript) |
| UI Library | **Vuetify 3** (Material Design) |
| Content | **Nuxt Content 3** (Markdown-based) |
| Search | **Fuse.js** (client-side fuzzy search) |
| Testing | **Vitest** (unit/integration), **Playwright** (E2E), **axe-core** (accessibility) |
| Analytics | **Plausible** (privacy-friendly) |
| Deployment | **Netlify** (static hosting) |
| Node | **22.23.4** (see `.nvmrc`) |
| Package Manager | **Yarn** (preferred) |

## Project Structure

```
app/
├── pages/           # Route pages (index.vue, faqs.vue, faqs-print.vue, links.vue, search.vue, whats-new.vue)
├── components/      # Vue components (FaqAccordion, CountdownTimer, SkipLink, etc.)
├── composables/     # Reusable logic (useDeadlineCountdown, useFaqCollapse, useSlugify, useSeo)
├── layouts/         # Page layouts (default.vue, print.vue)
├── plugins/         # Nuxt plugins (client/server)
├── utils/           # Utility functions (faqTransform.ts)
└── error.vue        # Error page

content/
├── faqs.md          # FAQ content (Markdown with frontmatter)
└── links.md         # Links/resources content

scripts/
├── generate-routes.js          # Route generation for sitemap
├── generate-sitemap.js         # Sitemap generator
├── generate-og-image.js        # OG image generator (serif font to match icjia-logo)
├── generate-faq-docx.js        # Word document generator
├── generate-faq-md.js          # Markdown export generator
├── generate-faq-txt.js         # Plain text export generator
└── ensure-accessibility-report.js

test/
├── unit/            # Unit tests (pure functions)
├── nuxt/            # Nuxt component tests
└── e2e/             # End-to-end tests (Playwright)

public/
├── docs/            # Documentation portal (static HTML)
│   ├── accessibility/   # Accessibility audit reports
│   ├── architecture/    # Architecture docs
│   └── jsdoc/           # API documentation
└── sitemap.xml      # Auto-generated sitemap

markdown-documentation/  # Project documentation (22+ files)
```

## Essential Commands

```bash
# Development
yarn dev              # Start dev server (http://localhost:3000)
yarn build            # Build for production (SSR)
yarn generate         # Generate static site (.output/public/)
yarn preview          # Preview production build
yarn generate:serve   # Generate + serve static site (port 5150)

# Testing
yarn test             # Run all tests + generate HTML report
yarn test:run         # Run tests (no watch)
yarn test:unit        # Unit tests only
yarn test:nuxt        # Nuxt component tests only
yarn test:watch       # Watch mode

# Accessibility Audits
yarn audit:a11y       # Quick console accessibility check (axe-core)
# For full HTML report: start server first, then run audit-accessibility.js

# Documentation Generation
yarn generate:jsdoc   # Generate API docs from JSDoc comments
yarn generate:routes  # Generate routes.json
yarn generate:sitemap # Generate sitemap.xml
yarn generate:og-image # Regenerate og-image.png (serif font matching icjia-logo)
```

## Key Conventions

### 1. Accessibility First (WCAG 2.1 AA)

This is an **accessibility-focused project**. All code must maintain WCAG 2.1 AA compliance:

- **All pages must pass axe-core audits** (zero violations)
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- Include proper ARIA attributes on interactive elements
- Ensure keyboard navigation works (visible focus indicators)
- Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text
- Add `alt` text to images (or `aria-hidden="true"` for decorative)
- Use `aria-live` regions for dynamic content updates
- Include skip links for keyboard navigation

### 2. Vue 3 Composition API

Always use `<script setup lang="ts">` syntax:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### 3. TypeScript

- Use proper types, avoid `any` when possible
- Interfaces go in the same file or a dedicated types file
- All composables and utilities should have JSDoc comments

### 4. JSDoc Documentation

All JavaScript/TypeScript files include comprehensive JSDoc:

```typescript
/**
 * @fileoverview Brief description of the file
 * @description Longer description with details
 * @module moduleName
 */

/**
 * Function description.
 * @param {string} input - Parameter description
 * @returns {number} Return value description
 * @example
 * ```ts
 * const result = myFunction('test')
 * ```
 */
```

### 5. Chicago Timezone for Dates

All deadline calculations use Chicago timezone (Central Time):

```typescript
// April 26, 2027 at midnight in Chicago (CDT = UTC-5)
const DEADLINE_DATE = new Date('2027-04-26T00:00:00-05:00').getTime()
```

## Content Management

### Adding/Editing FAQ Questions

FAQs are in `content/faqs.md`. Structure:

```markdown
## Section Heading

### Question text here?

{updated:2026-01-15}   <!-- Optional: Shows "UPDATED" badge for 10 days -->

**Quick answer:** Brief answer...

Detailed explanation...
```

**Key patterns:**
- H2 (`##`) = Section headings
- H3 (`###`) = Questions
- `{new:YYYY-MM-DD}` = "New" chip for brand-new questions (auto-expires after 21 days)
- `{updated:YYYY-MM-DD}` = "Updated on mm/dd/yyyy" chip for revised questions (auto-expires after 21 days)
- `{days_until_deadline}` = Dynamic placeholder replaced with actual days

### Internal Links in FAQs

Use the `useSlugify` composable pattern for internal FAQ links:
- Slugs are limited to 150 characters
- Format: `#section-heading-question-text-here`

## Testing

### Test Organization

| Type | Directory | Command | Description |
|------|-----------|---------|-------------|
| Unit | `test/unit/` | `yarn test:unit` | Pure function tests |
| Nuxt | `test/nuxt/` | `yarn test:nuxt` | Component tests with Nuxt context |
| E2E | `test/e2e/` | `yarn test:e2e` | End-to-end browser tests |

### Running Tests

```bash
yarn test              # All tests + HTML report
yarn test:run          # Quick test run
yarn test:coverage     # With coverage report
```

### Accessibility Testing

```bash
yarn audit:a11y        # Quick axe-core audit

# For comprehensive HTML report:
yarn dev               # Terminal 1: Start server
node audit-accessibility.js  # Terminal 2: Run audit
# Report at: public/docs/accessibility/index.html
```

## Build & Deployment

### Build Process

`yarn generate` performs:
1. Ensures accessibility report placeholder exists
2. Generates routes.json
3. Generates sitemap.xml
4. Runs Nuxt static generation
5. Generates FAQ downloads (DOCX, MD, TXT)
6. Outputs to `.output/public/`

### Netlify Deployment

- **Branch**: Push to main triggers auto-deploy
- **Build**: `npx playwright install chromium && yarn generate`
- **Publish**: `.output/public`
- **Headers**: Security headers configured in `netlify.toml`

## Important Files Reference

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Nuxt configuration, Vuetify theme, modules |
| `content.config.ts` | Nuxt Content collections with Zod schemas |
| `vitest.config.ts` | Test configuration (unit + nuxt projects) |
| `netlify.toml` | Deployment config, security headers, caching |
| `search.config.json` | Fuse.js search configuration |
| `audit-accessibility.js` | Comprehensive accessibility audit script |
| `scripts/generate-og-image.js` | OG image generator (serif font to match icjia-logo) |
| `app/utils/faqTransform.ts` | FAQ markdown AST transformation |
| `app/composables/useDeadlineCountdown.ts` | Countdown timer logic |

## Common Tasks

### Adding a New Page

1. Create `app/pages/[pagename].vue`
2. Use proper layout (`default` or `print`)
3. Include `useSeo()` for meta tags
4. Add accessibility features (skip link, proper headings)
5. Run `yarn audit:a11y` to verify

### Adding a New Component

1. Create `app/components/[ComponentName].vue`
2. Use `<script setup lang="ts">`
3. Include JSDoc file header
4. Ensure ARIA compliance
5. Add to test suite if complex

### Adding a What's New Entry

Every release that changes what readers see gets a What's New entry. Entries live in `app/utils/whatsNew.ts` (`WHATS_NEW_ENTRIES`); add the new one at the **top** (newest first; a unit test enforces the order). The newest entry is the banner at the top of the countdown card (`WhatsNewBanner.vue`, on `/`, `/faqs`, and `/links`); `/whats-new` lists them all. Write for readers, not developers: a short `title`, a one- or two-sentence `summary` (the banner shows it), optional `details` bullets, and optional `links` (`/faqs#…` anchors are checked by `test/unit/whatsNew.test.ts`). Dates are `YYYY-MM-DD` strings.

### Modifying FAQ Content

1. Edit `content/faqs.md`
2. Add `{updated:YYYY-MM-DD}` for new or updated questions
3. Run `yarn dev` to preview
4. Run `yarn test` to verify transformations
5. Run `yarn audit:a11y` to check accessibility

## Gotchas & Tips

1. **Hydration mismatches**: Use `<ClientOnly>` for client-dependent content (countdown timer)

2. **Static docs in public/**: The `/docs/` directory contains static HTML. Nuxt prerendering ignores these paths (`nitro.prerender.ignore`).

3. **FAQ "New"/"Updated" chips**: Auto-expire after 21 days. Configure in `app/utils/faqTransform.ts` (`NEW_QUESTION_DAYS`).

4. **Timezone handling**: Always use explicit timezone offsets for deadline calculations.

5. **Vuetify console logs**: Suppressed by `app/plugins/suppress-vuetify-logs.client.ts` - known Nuxt 4 compatibility issue.

6. **PDF generation removed**: Previously used Playwright for PDF, but it lacks PDF/UA accessibility. Now generates Word, MD, and TXT formats.

## Documentation Resources

- **Architecture Guide**: `markdown-documentation/ARCHITECTURE_GUIDE.md` (comprehensive technical guide)
- **FAQ Content Guide**: `markdown-documentation/FAQ_CONTENT_GUIDE.md`
- **Accessibility Guide**: `markdown-documentation/ACCESSIBILITY_GUIDE.md`
- **Documentation Index**: `markdown-documentation/INDEX.md`

## Quick Reference: Project Status

- **WCAG Compliance**: 100% (0 violations)
- **Test Coverage**: 236/236 tests passing (unit + Nuxt)
- **Node Version**: 22.23.4
- **Last Major Update**: October 2026
- **Deadline**: April 26, 2027
