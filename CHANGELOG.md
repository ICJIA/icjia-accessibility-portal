# Changelog

All notable changes to the ICJIA Accessibility Portal are documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.1.0] - 2026-03-26

### Security (Red/Blue Team Audit)

A comprehensive red/blue team security audit was conducted on 2026-03-26. The following findings were identified and remediated:

#### Red Team Findings

| # | Severity | Finding | Category | Status |
|---|----------|---------|----------|--------|
| 1 | **MEDIUM** | Missing Content-Security-Policy (CSP) header | OWASP A05 – Misconfiguration | **Fixed** |
| 2 | **MEDIUM** | Missing Strict-Transport-Security (HSTS) header | OWASP A05 – Misconfiguration | **Fixed** |
| 3 | **HIGH** | Transitive dependency vulnerabilities (basic-ftp path traversal, devalue prototype pollution, axios DoS) | OWASP A06 – Vulnerable Components | **Acknowledged** (dev-only, transitive) |
| 4 | **HIGH** (Conditional) | `v-html` usage in FAQ disclaimer rendering (`faqs.vue:44`) | OWASP A03 – Injection | **Low risk** (content is controlled frontmatter, not user input) |
| 5 | **MODERATE** | ReDoS in `ajv` (netlify-cli transitive dep) | OWASP A05 – Misconfiguration | **Dev-only** |
| 6 | **MODERATE** | esbuild dev server XSS (dev-only) | OWASP A03 – Injection | **Dev-only** |
| 7 | **MODERATE** | jsdiff DoS in parsePatch (build-time only) | OWASP A05 – Misconfiguration | **Build-only** |

#### Blue Team Strengths (Positive Findings)

- **No `eval()`, `Function()`, or `innerHTML` with user data** — zero dangerous patterns in application code
- **Proper XSS escaping** in search page (`escapeHtml()` applied before `v-html` rendering)
- **External links** use `rel="noopener noreferrer"` and `window.open()` with `noopener,noreferrer`
- **Zod schema validation** on all content frontmatter
- **No exposed secrets** — `.env` is gitignored, no API keys in source
- **Static site generation** eliminates server-side attack surface (no sessions, no auth, no DB)
- **Privacy-first analytics** via self-hosted Plausible (no cookies, GDPR compliant)
- **Input validation** on search (minimum 2 characters, escaped output)
- **Safe build scripts** — `path.join()` for all file paths, no shell injection vectors
- **X-Frame-Options: DENY** prevents clickjacking
- **X-Content-Type-Options: nosniff** prevents MIME type sniffing
- **Permissions-Policy** blocks geolocation, microphone, camera

#### Remediations Applied

- **Added Content-Security-Policy header** — restricts script/style/font/image sources to `'self'` and `plausible.icjia.cloud`; blocks `frame-ancestors`, `base-uri`, `form-action` to `'self'`/`'none'`
- **Added Strict-Transport-Security header** — `max-age=31536000; includeSubDomains; preload` enforces HTTPS
- **Version bumped to 1.1.0** to reflect security hardening
- **CHANGELOG.md created** to document all project milestones and security audit trail

#### Recommendations (Not Yet Applied)

- Run `npm audit fix` periodically to patch transitive dev dependency vulnerabilities
- Upgrade `netlify-cli` to latest when available
- Consider replacing `v-html` in FAQ disclaimer with Vue template directives + `DOMPurify` if untrusted content sources are ever added
- Monitor Nuxt releases for `devalue` prototype pollution patches

### Accessibility

- **Full axe-core audit completed** (2026-03-26): **0 violations** across all 5 pages, 3 viewports, 1,335 total checks
- Skip link verification: 15/15 passing
- WCAG 2.1 AA compliance: 100%

### Added

- `CHANGELOG.md` — project changelog with milestone history and security audit documentation
- Version badge in README
- Security audit section in README

### Changed

- Version bumped from `1.0.0` to `1.1.0` in `package.json`
- `netlify.toml` — added CSP and HSTS security headers

---

## [1.0.0] - 2025-12-15 to 2026-03-10

### Initial Release & Iterative Development

The 1.0.0 release encompasses the full initial development of the ICJIA Accessibility Portal from first commit through production stabilization.

### Milestones

#### 2025-12-15 — Project Genesis

- Initial commit: Nuxt 4 + Vue 3 + Vuetify 3 scaffolding
- Core pages: Home (countdown timer), FAQs (accordion), Links (resource cards)
- Netlify deployment configuration
- Dark theme with Material Design
- Basic FAQ content and link resources

#### 2025-12-16 — Content & Accessibility Foundation

- Plausible Analytics integration (privacy-friendly, self-hosted)
- FAQ accordion behavior (one-at-a-time expand)
- Scroll-to-top links per FAQ question
- Countdown timer added to all pages
- Additional FAQ content (alt text, captions, complex images, web vs. content accessibility)
- Last-updated dates and scrolling link navigation

#### 2025-12-17 — Production Hardening

- SSR hydration error fixes (favicon, footer)
- Plausible `apiHost` configuration
- Accessibility violation fixes
- FAQ content updates and refinements

#### 2026-01-01 to 2026-01-04 — Feature Expansion

- **Fuzzy search** (`/search`) with Fuse.js — relevance ranking, match highlighting, badges
- **PDF download** feature (later replaced with accessible alternatives)
- **Sitemap generation** automation
- **Documentation portal** (`/docs/`) with accessibility reports
- **E2E test suite** with Playwright
- **FAQ sorting** (original, latest, alphabetical)
- **Fiscal year info** and OGC-specific questions added

#### 2026-01-05 to 2026-01-08 — Content Quality & Testing

- FAQ content accuracy review and 25% condensation
- Dynamic `{days_until_deadline}` placeholder support
- **Printer-friendly FAQs** (`/faqs-print`) with table of contents
- **Accessible FAQ downloads** — Word (.docx), Markdown (.md), Plain Text (.txt) replacing inaccessible PDF
- Comprehensive test suite with axe-core accessibility audits
- Disclaimer system with legal/informational notices
- DVFR accessibility report added

#### 2026-01-09 to 2026-01-27 — Content Maturity

- WCAG AAA enhancements where possible
- New FAQ topics: exceptions, "don't make this accessible" scenarios, "too busy" questions
- Internal link system for cross-referencing FAQs
- `CLAUDE.md` added for AI assistant guidance
- Content editing for tone, accuracy, and concision

#### 2026-02-09 to 2026-02-11 — SSR & SEO Fixes

- **SSR hydration mismatch resolution** — all pages zero console errors
  - `AppNavbar.vue`: CSS media queries replace JavaScript `useDisplay()`
  - `faqs.vue`: Fixed `useAsyncData` cache invalidation
  - Documented Vuetify SSR layout behavior (`opacity:NaN` is intentional)
- SEO improvements: `og:image`, structured data, meta tags
- Responsive navigation fix (hamburger menu on small screens only)
- Lighthouse scores: 100% Accessibility, 100% Best Practices, 100% SEO on all pages
- Homepage and `faqs-print` accessibility fixes

#### 2026-03-10 — Latest Content Update

- PDF accessibility checker FAQ (https://audit.icjia.app)
- "Check PDF" link added to footer navigation
- "See Also" card styling for cross-referenced answers
- Content clarity and redundancy cleanup
- All app-level dates updated to March 10, 2026

### Technical Summary (v1.0.0)

| Metric | Value |
|--------|-------|
| Pages | 5 (Home, FAQs, FAQs-Print, Links, Search) |
| WCAG 2.1 AA Violations | 0 |
| axe-core Tests | 1,335 |
| Lighthouse Accessibility | 100% |
| Lighthouse Best Practices | 100% |
| Lighthouse SEO | 100% |
| Hydration Errors | 0 |
| Skip Links | 15/15 passing |
| Node.js | 22.14.0 |
| Nuxt | 4.2.2 |
| Vue | 3.5.26 |
| Vuetify | 3.11.6 |

---

[1.1.0]: https://github.com/ICJIA/icjia-accessibility-portal/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ICJIA/icjia-accessibility-portal/releases/tag/v1.0.0
