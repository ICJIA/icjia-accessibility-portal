# ICJIA Accessibility Portal

A modern, accessible portal for the Illinois Criminal Justice Information Authority (ICJIA) designed to keep all accessibility information in one place to meet the **ADA Title II April 24, 2026 guideline**. This portal consolidates accessibility resources including comprehensive FAQs and curated links to ensure compliance and provide a centralized resource for accessibility information.

[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.0.0+-00DC82)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.13+-42b883)](https://vuejs.org)

> 📚 **For Developers**: See **[ARCHITECTURE_GUIDE.md](markdown-documentation/ARCHITECTURE_GUIDE.md)** for complete technical documentation, implementation details, challenges & solutions, and best practices.

## Purpose

This accessibility portal serves as a centralized hub for all accessibility-related information to ensure compliance with the **ADA Title II April 24, 2026 guideline**. The portal includes:

- **FAQs**: Comprehensive frequently asked questions about accessibility requirements, compliance, and implementation
  - Dynamic countdown timer showing days until the April 24, 2026 deadline
  - "New" badge system for recently added questions (auto-expires after 10 days)
  - Searchable accordion interface with proper ARIA attributes
  - **Printer-friendly version** at `/faqs-print` - All FAQs in a clean, printable format with proper structure for printing or saving as PDF. Internal links are styled as bold text (non-clickable), while external links remain functional.
- **Links**: Curated collection of accessibility resources, tools, and related information organized by category

All accessibility information is organized in one place to facilitate easy access and ensure that ICJIA meets its accessibility obligations under ADA Title II.

## Quick Start

```bash
# Prerequisites: Node.js 22.14.0 (check .nvmrc)
nvm use

# Install dependencies
yarn install

# Start development server
yarn dev

# Visit http://localhost:3000
```

For production deployment:

```bash
# Generate static site
yarn generate

# Preview locally
yarn generate:serve

# Or deploy to Netlify automatically via Git push
```

## Tech Stack

### Core Framework

- **Nuxt 4** - Vue.js framework with static site generation and server-side rendering
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript with enhanced IDE support

### UI & Styling

- **Vuetify 3** - Material Design component library with comprehensive accessibility support
- **Sass** - CSS preprocessor for maintainable stylesheets
- **Material Design Icons (MDI)** - Extensive icon library with 7,000+ icons

### Content & Data

- **Nuxt Content 3** - File-based CMS with markdown support and query API
- **Zod** - TypeScript-first schema validation for content and configuration
- **better-sqlite3** - High-performance SQLite3 with synchronous API (used by Nuxt Content)

### Search & Discovery

- **Fuse.js** - Lightweight fuzzy-search library for client-side search

### Development Tools

- **Vite** - Next-generation frontend build tool (via Nuxt)
- **Yarn** - Fast, reliable package manager
- **Playwright** - End-to-end testing and browser automation
- **axe-core** - Accessibility testing engine (WCAG 2.1 AA compliance)

### Analytics

- **Plausible Analytics** - Privacy-friendly, GDPR-compliant web analytics

### Deployment

- **Netlify** - Static site hosting with automatic deployments, custom headers, and CDN

## Features

### Accessibility (WCAG 2.1 AA Compliant)

- **100% Accessible** - All pages verified with automated accessibility audits using **axe-core** (zero violations)
- **Skip Navigation** - Skip link for keyboard users to jump to main content
  - Reusable `SkipLink` component used in all layouts
  - Positioned off-screen (`top: -100px`) until focused
  - High z-index (10000) ensures visibility
  - Includes smooth scroll and respects reduced motion preferences
  - 100% pass rate in accessibility audits (12/12 skip links working)
- **ARIA Support**:
  - Live regions for dynamic content (countdown timer with `aria-live="polite"`)
  - `aria-describedby` relationships linking FAQ questions to answers
  - `aria-current="page"` on active navigation items
  - Proper ARIA labels on all interactive elements
  - Decorative icons marked with `aria-hidden="true"`
- **Keyboard Navigation** - Fully keyboard navigable with visible focus indicators
- **Screen Reader Friendly** - Semantic HTML with proper heading hierarchy
- **Color Contrast** - WCAG AA compliant contrast ratios throughout
- **Reduced Motion** - Respects `prefers-reduced-motion` user preference

### Content Features

- **Dynamic Countdown Timer** - Shows days remaining until April 24, 2026 deadline
- **"New" Badge System** - Automatically displays and expires badges for recent FAQ additions [[memory:12683417]]
  - Add `{new:YYYY-MM-DD}` after question heading in markdown
  - Badge auto-expires after 10 days (configurable)
- **Printer-Friendly FAQs** - Dedicated printer-friendly version at `/faqs-print`
  - Complete FAQ content in a clean, printable format
  - Internal links styled as bold text (non-clickable) - section references don't work when printed
  - External links remain functional with URLs appended for accessibility
  - Table of contents for easy navigation
  - Clear section headings and numbered questions
  - Optimized for printing or saving as PDF
  - Includes last-updated date for reference
  - Fully accessible with discernible link text and table headers
  - Links display URLs for printed versions
- **Markdown-based Content** - Easy content management via Nuxt Content
- **Dynamic Placeholders** - Auto-updating values like `{days_until_deadline}` in content

### Design & Performance

- **Responsive Design** - Mobile-first approach with proper breakpoints
- **Dark Theme** - Modern dark theme by default using Vuetify Material Design
- **Static Site Generation** - Optimized for fast loading and Netlify deployment
- **Performance Optimized** - Proper caching headers and optimized assets
- **SEO Ready** - Automated sitemap generation and proper meta tags

## Prerequisites

- **Node.js** 22.14.0 (see `.nvmrc` file)
- **Yarn** 1.22.22 or later

## Installation

```bash
# Install dependencies
yarn install
```

## Development

```bash
# Start development server (runs on http://localhost:3000)
yarn dev

# Run quick accessibility audit using axe-core (console output)
yarn audit:a11y

# Generate comprehensive accessibility report (HTML)
# Note: Requires a running server (dev, preview, or generate:serve)
yarn generate:accessibility
```

### Available Scripts

- `yarn dev` - Start development server with auto-reload
- `yarn build` - Build for production (SSR mode)
- `yarn generate` - Generate static site for deployment
- `yarn preview` - Preview production build locally (port 3000)
- `yarn generate:serve` - Generate and serve static site (port 5150)
- `yarn audit:a11y` - Quick accessibility check (console output)
- `yarn generate:routes` - Generate routes.json from pages/content
- `yarn generate:sitemap` - Generate sitemap.xml from routes

## Building

```bash
# Generate static site for production
yarn generate

# Build for production (SSR)
yarn build

# Preview generated static site locally
yarn preview

# Generate and serve static site on port 5150
yarn generate:serve
```

The build process will:

1. **Generate sitemap** - Automatically creates `sitemap.xml` with all public routes
2. **Generate static HTML files** - From Vue components
3. **Process markdown content** - From the `content/` directory
4. **Generate routes.json** - Lists all prerendered routes (used for sitemap generation)
5. **Regenerate sitemap** - Updates sitemap with discovered routes
6. **Optimize assets** - Creates production-ready files
7. **Copy public files** - Copies all files from `public/` directory (including `.well-known/` files)
8. **Output to `.output/public/`** - Directory ready for deployment

**Note**: The sitemap automatically excludes `/docs/` routes (documentation pages are public but not included in the sitemap for SEO purposes).

**Note**: The `.well-known/appspecific/com.chrome.devtools.json` file is included to prevent 404 errors when Chrome DevTools is open. This is a harmless Chrome DevTools request and the empty JSON file satisfies it.

## Deployment

This site is configured for deployment on Netlify with automatic builds and optimized performance.

### Deployment Configuration

- **Build command**: `yarn generate`
- **Publish directory**: `.output/public`
- **Node version**: 22.14.0 (specified in netlify.toml and .nvmrc)

### Security & Performance Headers

The `netlify.toml` file includes:

- **Security headers**:
  - X-Frame-Options: DENY (prevents clickjacking)
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
- **Cache headers** for static assets (1 year cache for immutable files)
- **SPA fallback** redirects for client-side routing
- **Custom 404 handling**

### Deployment Steps

#### Automatic Deployment (Recommended)

1. Push code to your Git repository (GitHub, GitLab, Bitbucket)
2. Connect the repository to Netlify
3. Netlify automatically detects the `netlify.toml` configuration
4. Site builds and deploys automatically on each push to main branch
5. Preview deployments created automatically for pull requests

#### Manual Deployment

```bash
# Generate the static site
yarn generate

# Deploy using Netlify CLI
netlify deploy --prod --dir=.output/public
```

### Build Process

The automated build process:

1. Ensures accessibility report placeholder exists
2. Generates `routes.json` from pages and content
3. Generates `sitemap.xml` from routes
4. Builds/generates the Nuxt application
5. Regenerates routes.json with Nuxt-discovered routes
6. Updates sitemap with final routes
7. Optimizes and outputs to `.output/public/`

**Note**: The sitemap automatically excludes `/docs/` routes (documentation pages are public but not indexed for SEO purposes).

## Project Structure

```
├── app/
│   ├── app.vue                 # Root app component
│   ├── layouts/
│   │   ├── default.vue         # Default layout with navbar and footer
│   │   └── print.vue           # Printer-friendly layout (no navbar/footer)
│   ├── pages/
│   │   ├── index.vue           # Home page with countdown timer and FAQs
│   │   ├── faqs.vue            # Dedicated FAQ page
│   │   ├── faqs-print.vue      # Printer-friendly FAQs page
│   │   └── links.vue           # Accessibility links page
│   ├── components/
│   │   ├── SkipLink.vue        # Skip to main content link
│   │   ├── AppNavbar.vue       # Navigation bar with aria-current support
│   │   ├── AppFooter.vue       # Footer with copyright, links, and navigation
│   │   ├── CountdownTimer.vue  # Countdown timer with aria-live
│   │   └── FaqAccordion.vue    # FAQ accordion with aria-describedby
│   ├── composables/
│   │   ├── useDeadlineCountdown.ts  # Composable for deadline timer
│   │   ├── useFaqCollapse.ts        # Composable for FAQ collapse state
│   │   └── useSlugify.ts            # Composable for creating URL slugs
│   ├── plugins/
│   │   ├── content-links.client.ts  # Plugin to add target="_blank" to content links
│   │   ├── ensure-accessibility-report.server.ts  # Server plugin for report placeholder
│   │   └── optimize-css.client.ts   # Client plugin for CSS optimization
│   ├── utils/
│   │   └── faqTransform.ts     # Utility to transform FAQ content and handle "new" badges
│   ├── router.options.ts       # Custom router configuration
│   └── error.vue               # Error page component
├── content/
│   ├── faqs.md                 # FAQ content (with "new" badge support)
│   └── links.md                # Accessibility links content
├── public/
│   ├── favicon.svg             # Site favicon
│   ├── icjia-logo.png          # ICJIA logo
│   ├── robots.txt              # Robots.txt (disallows all indexing)
│   ├── sitemap.xml             # Auto-generated sitemap (excludes /docs/ routes)
│   ├── .well-known/
│   │   └── appspecific/
│   │       └── com.chrome.devtools.json  # Chrome DevTools config (prevents 404)
│   └── docs/
│       ├── index.html          # Documentation portal index
│       ├── accessibility/
│       │   ├── index.html      # Accessibility audit report (generated)
│       │   ├── errors.json     # Accessibility errors data
│       │   └── violations.json # Accessibility violations data
├── scripts/
│   ├── generate-routes.js      # Routes generation script (scans pages and content) - Fully documented with JSDoc
│   ├── generate-sitemap.js     # Sitemap generation script - Fully documented with JSDoc
│   └── ensure-accessibility-report.js  # Ensures accessibility report placeholder exists - Fully documented with JSDoc
├── audit-accessibility.js      # Comprehensive accessibility audit script - Tests WCAG 2.1 AA compliance using axe-core
│                               # Fully documented with 1355-line guide (ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md)
│                               # Supports dev/prod testing, multi-viewport, multi-theme, dynamic rule configuration
├── markdown-documentation/     # Project documentation and audit results
│   ├── ARCHITECTURE_GUIDE.md       # Complete technical architecture guide (1300+ lines, with GitHub links)
│   ├── INDEX.md                    # Documentation index (all 23+ files organized by topic)
│   ├── FOOTER_REFACTOR.md          # Footer refactor documentation
│   ├── PROJECT_REVIEW.md           # Comprehensive project review
│   ├── FAQ_NEW_TAG_SYSTEM.md       # Documentation for "new" badge system
│   ├── PRINTER_FRIENDLY_FAQ.md     # Printer-friendly feature documentation
│   ├── ACCESSIBILITY_AUDIT_RESULTS.md  # Latest audit results
│   └── (20+ other documentation files)
├── audit-accessibility.js      # Accessibility audit script (console output)
├── content.config.ts           # Nuxt Content configuration
├── netlify.toml                # Netlify deployment configuration
├── nuxt.config.ts              # Nuxt configuration
└── routes.json                 # Auto-generated routes list (from Nuxt build)
```

## Accessibility

This site is designed and tested to meet **WCAG 2.1 AA standards**. All pages have been verified with automated accessibility audits using **axe-core** (via @axe-core/playwright).

### Accessibility Features

- **Color Contrast**: Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- **Keyboard Navigation**: Fully keyboard navigable interface with visible focus indicators
- **Screen Reader Support**:
  - ARIA live regions for dynamic content (countdown timer)
  - ARIA describedby relationships linking FAQ questions to answers
  - Proper ARIA labels on all interactive elements
  - Decorative icons marked with aria-hidden
- **Semantic HTML**: Proper heading hierarchy and semantic structure
- **Skip Navigation**: Skip link for keyboard users to jump to main content
- **Reduced Motion**: Respects user's prefers-reduced-motion preference
- **Active Navigation**: aria-current="page" indicates current page in navigation

### Accessibility Testing

This project includes comprehensive accessibility testing tools powered by **axe-core**. The audit script is fully documented and can be reused for any website.

#### 📚 Complete Documentation

**For detailed information about the accessibility audit script, see:**

- **[ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md](markdown-documentation/ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md)** - Complete guide to the audit script (1355 lines with challenges & solutions)
  - Script architecture and design
  - Configuration options
  - Testing modes (development/production)
  - Viewport and theme testing
  - Rule configuration
  - Report generation
  - Modal windows
  - Reusing the script for other projects
  - Troubleshooting guide
  - **Includes GitHub links to all code snippets**

#### 1. Quick Console Audit (`yarn audit:a11y`)

A lightweight script that runs accessibility checks and outputs results to the console. Useful for quick checks during development.

```bash
yarn audit:a11y
```

**Features:**

- Automatically starts the development server
- Tests all pages for WCAG 2.1 AA compliance
- Displays violation reports in the console
- Exits with error code if violations are found (useful for CI/CD)

#### 2. Comprehensive HTML Report (`yarn generate:accessibility`)

A full-featured accessibility report generator that creates a detailed HTML report for all pages in the sitemap.

```bash
# First, start a server (choose one):
yarn dev              # Development server (port 3000)
yarn preview          # Preview server (port 3000)
yarn generate:serve  # Generated site server (port 5150)

# Then, in another terminal, generate the report:
yarn generate:accessibility
```

**Features:**

- **Uses sitemap.xml** - Automatically tests all pages listed in the sitemap
- **Comprehensive testing** - Full WCAG 2.1 AA compliance audit using axe-core
- **Multi-viewport testing** - Tests desktop, tablet, and mobile viewports
- **Multi-theme testing** - Tests light/dark themes (if configured)
- **Skip link verification** - Validates skip link functionality
- **Dynamic rule configuration** - Enable/disable rules via boolean values
- **HTML report generation** - Creates a beautiful, dark-themed HTML report
- **Clickable page links** - All page URLs in the report are clickable and open in new tabs
- **Detailed violation information** - Includes violation IDs, descriptions, impact levels, affected elements, and remediation guidance
- **Interactive modals** - Additional information about rules, tests, and configuration
- **Report location** - Generated at `/public/docs/accessibility/index.html` and accessible at `/docs/accessibility`
- **Documentation portal** - Report is accessible via the documentation portal at `/docs`

**Report Contents:**

- Summary statistics (total pages, passed/failed counts, total violations)
- Violation breakdown by impact level (critical, serious, moderate, minor)
- Per-page results with pass/fail status
- Detailed violation information for each page
- **Configured rules status** - Shows enabled/disabled rules with descriptions
- Information about axe-core and why it's a trusted accessibility testing tool
- Interactive modal windows for additional context

**Requirements:**

- A server must be running (dev, preview, or generate:serve)
- The script will automatically detect the running server on common ports (3000, 5150, 4173, 3003)
- If no server is detected, the script will provide clear instructions

**Accessing the Report:**

- After generation, view the report at: `http://localhost:[port]/docs/accessibility`
- Or access via the documentation portal: `http://localhost:[port]/docs`
- The report is also available in the footer navigation (Accessibility Report link)

#### 3. Script Configuration

The audit script (`audit-accessibility.js`) is highly configurable:

**Key Configuration Options:**

- **Environment**: Test against development (`localhost`) or production
- **Viewports**: Customize desktop, tablet, and mobile sizes
- **Themes**: Configure single or multiple theme testing
- **Rules**: Enable/disable specific axe-core rules via booleans
- **Skip Links**: Configure skip link detection selectors
- **Exclusions**: Exclude framework-specific wrapper elements

**📁 Script Location**: [`audit-accessibility.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js)

**Configuration Section**: [Lines 23-299](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L23-L299)

#### 4. Reusing the Script

The audit script is designed to be reusable for any website:

1. **Copy the script** to your project root
2. **Install dependencies**: `npm install --save-dev puppeteer axe-core`
3. **Update configuration** (top of script) - Site info, URLs, paths
4. **Ensure sitemap.xml exists** - Script automatically reads URLs from sitemap
5. **Run the script**: `node audit-accessibility.js`

**For complete instructions, see**: [ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md - Reusing This Script](markdown-documentation/ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md#reusing-this-script)

## Content Management

### Adding New FAQ Questions

1. Edit `content/faqs.md`
2. Add your question as an H3 heading (`###`)
3. Add the "new" badge tag on the next line (optional):

```markdown
### Your New Question Here?

{new:2026-01-01}

**Quick answer:** Your answer here...
```

The "New" badge will:

- Display automatically for 10 days from the specified date
- Appear as a green chip next to the question
- Auto-expire without any manual cleanup needed

For more details, see `markdown-documentation/FAQ_NEW_TAG_SYSTEM.md`.

### Adding Links

1. Edit `content/links.md`
2. Add your link using markdown syntax:

```markdown
- [Link Title](https://example.com) - Description of the link
```

Links automatically open in new tabs with proper accessibility attributes.

### Dynamic Placeholders

Content can include dynamic placeholders that auto-update:

- `{days_until_deadline}` - Shows days remaining until April 24, 2026

Example:

```markdown
There are {days_until_deadline} days until the deadline.
```

This automatically updates without rebuilding the site.

#### Why axe-core?

**axe-core** is the industry-standard accessibility testing engine used by major tools and organizations worldwide. Here's why it's as effective as commercial solutions like SiteImprove:

##### **Industry Standard & Widely Adopted**

- **Used by SiteImprove** - SiteImprove's automated testing incorporates axe-core rules
- **Used by major companies** - Trusted by Microsoft, Google, Facebook, and thousands of other organizations
- **Open source and transparent** - Unlike proprietary tools, you can inspect and understand exactly what's being tested

##### **Comprehensive WCAG Coverage**

- **WCAG 2.1 AA compliance** - Tests against all WCAG 2.1 Level A and AA success criteria
- **57+ accessibility rules** - Covers color contrast, ARIA usage, keyboard navigation, semantic HTML, and more
- **Regular updates** - Actively maintained with new rules added as WCAG standards evolve
- **Accurate results** - Low false positive rate compared to other automated tools

##### **Technical Advantages**

- **Real browser testing** - Uses Playwright to test in actual Chromium browsers (not just static analysis)
- **Dynamic content support** - Waits for JavaScript to execute and tests fully rendered pages
- **Detailed reporting** - Provides specific violation information with exact HTML elements and remediation guidance
- **CI/CD integration** - Can be run in automated pipelines to catch accessibility issues before deployment

##### **Comparison to Other Tools**

| Feature              | axe-core     | SiteImprove |
| -------------------- | ------------ | ----------- |
| WCAG 2.1 AA Coverage | ✅ Full      | ✅ Full     |
| Open Source          | ✅ Yes       | ❌ No       |
| Cost                 | ✅ Free      | ❌ Paid     |
| CI/CD Integration    | ✅ Excellent | ⚠️ Limited  |
| Detailed Reporting   | ✅ Yes       | ✅ Yes      |
| Real Browser Testing | ✅ Yes       | ✅ Yes      |

**Conclusion**: axe-core provides the same level of WCAG 2.1 AA compliance testing as commercial tools like SiteImprove. By using axe-core directly, we get comprehensive testing with full transparency, no licensing costs, and better integration with our development workflow.

#### Current Audit Status

✅ **All pages currently pass with zero violations detected.**

Latest audit results:

- **Total Pages Tested**: 4 (/, /faqs, /faqs-print, /links)
- **WCAG 2.1 AA Violations**: 0
- **Accessibility Score**: 100%
- **Last Audited**: January 2026

The audit is run regularly during development to ensure ongoing compliance with WCAG 2.1 AA standards. Detailed audit results are available in `markdown-documentation/ACCESSIBILITY_AUDIT_RESULTS.md`.

#### Sitemap Generation

The project includes automated sitemap generation that runs during build, generate, and dev processes:

- **Automatic generation** - Sitemap is created/updated automatically
- **Route discovery** - Uses `routes.json` (generated by Nuxt) as the primary source
- **Fallback scanning** - Scans `app/pages` and `content/` directories if routes.json isn't available
- **Excludes documentation** - Automatically excludes `/docs/` routes from the sitemap
- **Configurable domain** - Site domain is configurable in `scripts/generate-sitemap.js`

The sitemap is generated at `public/sitemap.xml` and includes all public pages with proper priority and change frequency settings.

## Documentation

### 📚 Complete Architecture Guide

**NEW**: For a comprehensive understanding of this application's architecture, implementation details, and best practices, see:

**[ARCHITECTURE_GUIDE.md](markdown-documentation/ARCHITECTURE_GUIDE.md)** - Complete guide covering:

- Project architecture and design decisions
- Content management strategy (markdown parsing, FAQ structure)
- Accessibility implementation (skip links, ARIA, focus management)
- Build and deployment process
- Challenges faced and solutions found
- Best practices and patterns
- Testing and validation approach
- Tips for replicating similar applications

**[📑 Documentation Index](markdown-documentation/INDEX.md)** - Quick reference to all 11 documentation files organized by category

**This guide is essential reading for:**

- Developers new to the codebase
- LLMs working on this project
- Teams building similar accessibility-focused applications
- Anyone wanting to understand the full technical implementation

### Project Documentation

Comprehensive documentation is available in the `markdown-documentation/` folder **(consolidated from 24 to 12 files)**:

#### 📐 Core (3 files)

- **[ARCHITECTURE_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ARCHITECTURE_GUIDE.md)** ⭐ - **Complete technical guide** (1300+ lines with 30+ GitHub links to source files) - **Start here!**
- **[INDEX.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/INDEX.md)** - Documentation index and navigation hub
- **[PROJECT_REVIEW.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/PROJECT_REVIEW.md)** - Complete project review with improvement suggestions

#### 🎨 Features & Guides (6 files)

- **[PRINTER_FRIENDLY_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/PRINTER_FRIENDLY_GUIDE.md)** - Complete printer-friendly FAQ guide (overview, implementation, verification)
- **[ACCESSIBILITY_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ACCESSIBILITY_GUIDE.md)** - Complete accessibility documentation (audit results, skip links, testing)
- **[ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/ACCESSIBILITY_AUDIT_SCRIPT_GUIDE.md)** - Complete accessibility audit script guide (1355 lines with GitHub links) - Script architecture, configuration, testing modes, challenges & solutions, and reuse instructions
- **[FAQ_CONTENT_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/FAQ_CONTENT_GUIDE.md)** - FAQ management ("new" badge system, content guidelines, references)
- **[SEO_GUIDE.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/SEO_GUIDE.md)** - SEO optimization and verification
- **[CONFIGURATION_ABSTRACTION.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/CONFIGURATION_ABSTRACTION.md)** - Configuration management guide

#### 📅 History & Updates (3 files)

- **[CONTENT_MAINTENANCE_HISTORY.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/CONTENT_MAINTENANCE_HISTORY.md)** - Chronological log of content fixes and improvements
- **[FEATURE_UPDATES.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/FEATURE_UPDATES.md)** - Log of major feature additions and enhancements
- **[DOCUMENTATION_HISTORY.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/markdown-documentation/DOCUMENTATION_HISTORY.md)** - Meta-log of documentation updates

#### 🧪 Testing (1 file)

- **[test/E2E_TEST_PLAN.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/test/E2E_TEST_PLAN.md)** - Comprehensive E2E test implementation plan (coverage, strategy, examples)
- **[test/README.md](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/test/README.md)** - Complete test suite documentation (unit, Nuxt, E2E plans)

**Total**: 13 well-organized documentation files (includes accessibility audit script guide)

### Live Documentation Portal

The application includes a built-in documentation portal at `/docs/` with:

- **Accessibility Reports** (`/docs/accessibility/`) - Automated accessibility audit results
- **Test Reports** (`/docs/tests/`) - Visual HTML test results (generated by `yarn test`)
- **Portal Index** (`/docs/`) - Central hub for all documentation

Access the documentation portal:

- Development: `http://localhost:3000/docs`
- Production: `https://your-domain.com/docs`

### Audit Reports

Generate and view comprehensive audit reports:

```bash
# Start server first
yarn dev  # or yarn generate:serve

# Generate accessibility report
yarn generate:accessibility
```

Reports include:

- Summary statistics
- Detailed violation information
- Remediation guidance
- Historical comparisons
- Element-level details

## Project Status

**Current Status**: ✅ Production Ready

### Completed Features

- ✅ All pages pass WCAG 2.1 AA compliance (zero violations)
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark theme with proper contrast ratios
- ✅ Static site generation optimized for Netlify
- ✅ Comprehensive accessibility features:
  - Skip navigation link
  - ARIA live regions for dynamic content
  - Proper focus management
  - Keyboard navigation support
  - Screen reader optimized
- ✅ SEO optimized with automated sitemap generation
- ✅ "New" badge system for FAQ questions
- ✅ Dynamic countdown timer (April 24, 2026 deadline)
- ✅ Automated accessibility audits
- ✅ Documentation portal with audit reports
- ✅ Comprehensive JSDoc documentation throughout all JavaScript/TypeScript files

### Recent Updates (January 2026)

- **NEW**: Printer-friendly FAQs page (`/faqs-print`) for easy printing and offline reference
  - All FAQ content in clean, printable format
  - Table of contents with question counts
  - Professional business document styling
  - Optimized for print and PDF export
  - Includes clickable links (screen) and reference URLs (print)
  - Last-updated date for document tracking
  - Uses custom print layout (no navbar/footer)
  - 100% accessible (skip link, proper semantics)
- Enhanced FAQ system with auto-expiring "New" badges
- Improved accessibility with comprehensive ARIA support
- Implemented dynamic content placeholders
- Added comprehensive project documentation
- Optimized CSS and performance
- Enhanced content management system
- Navigation improvements (Print FAQs link added to navbar and footer)
- **Footer refactor** - Modern, centered design with clickable ICJIA copyright, GitHub repository, printer-friendly, and accessibility report links. Fully responsive and accessible with proper ARIA labels.

### Version Information

**Last Updated**: January 1, 2026

**Core Dependencies**:

- Node.js: 22.14.0
- Nuxt: 4.0.0+
- Vue: 3.5.13+
- Vuetify: 3.11.3+
- Nuxt Content: 3.9.0+

**Testing Tools**:

- **Vitest** - Fast unit and integration testing
- **@nuxt/test-utils** - Nuxt-specific testing utilities
- **@vue/test-utils** - Vue component testing
- **axe-core**: 4.11.0+ (accessibility testing)
- Playwright: 1.57.0+ (browser automation)

### Future Enhancements

Potential improvements documented in `markdown-documentation/PROJECT_REVIEW.md`:

**High Priority**:

- Enhanced meta tags for social sharing (Open Graph, Twitter Cards)
- Image optimization (WebP format)
- TypeScript type improvements

**Medium Priority**:

- Component documentation
- Visual regression testing
- E2E tests (see [`test/E2E_TEST_PLAN.md`](test/E2E_TEST_PLAN.md) for plan)

**Low Priority**:

- PWA support for offline access
- Internationalization (i18n)
- Advanced analytics

## Contributing

### Development Workflow

1. **Fork & Clone** the repository
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make changes** and test thoroughly
4. **Run tests**: `yarn test` to run all tests and generate reports
5. **Run audits**: `yarn audit:a11y` to ensure accessibility compliance
6. **Commit changes**: Use clear, descriptive commit messages
7. **Push to your fork**: `git push origin feature/your-feature-name`
8. **Submit a Pull Request** with detailed description

### Code Standards

- **Accessibility First**: All changes must maintain WCAG 2.1 AA compliance
- **TypeScript**: Use proper types, avoid `any` when possible
- **Vue 3 Composition API**: Use `<script setup>` syntax
- **Semantic HTML**: Use proper HTML5 semantic elements
- **ARIA Labels**: Include proper ARIA attributes for interactive elements
- **JSDoc Documentation**: All JavaScript/TypeScript files include comprehensive JSDoc comments
  - File-level `@fileoverview` tags with descriptions
  - Function documentation with `@param`, `@returns`, and `@example` tags
  - Type annotations for constants and variables
  - See existing files in `app/composables/`, `app/utils/`, `app/plugins/`, and `scripts/` for examples
- **Testing**: Run `yarn test` to ensure all tests pass before submitting
- **Accessibility**: Run `yarn audit:a11y` to ensure accessibility compliance

### Content Guidelines

When adding or updating content:

- Use clear, plain language (avoid jargon)
- Maintain consistent tone (professional but approachable)
- Check spelling and grammar
- Use markdown best practices
- Test with screen readers when possible

### Accessibility Testing

Before submitting changes:

```bash
# Run quick accessibility audit
yarn audit:a11y

# Generate full accessibility report
yarn dev  # in one terminal
yarn generate:accessibility  # in another terminal
```

Ensure zero violations on all pages.

## Support & Resources

### Getting Help

- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: See `markdown-documentation/` folder
- **WCAG Guidelines**: [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- **ADA Title II**: [ADA.gov Guidance](https://www.ada.gov/)

### Useful Links

- **Nuxt 4 Documentation**: https://nuxt.com/docs
- **Vuetify 3 Documentation**: https://vuetifyjs.com/
- **axe-core Rules**: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
- **WCAG Quick Reference**: https://www.w3.org/WAI/WCAG21/quickref/

## License

MIT License

Copyright (c) 2026 Illinois Criminal Justice Information Authority

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

See the [LICENSE](LICENSE) file for the complete license text.

---

**Built with accessibility in mind for the Illinois Criminal Justice Information Authority**

For questions or support, please open an issue on GitHub.
