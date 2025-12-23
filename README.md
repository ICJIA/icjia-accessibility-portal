# ICJIA Accessibility Portal

A modern, accessible portal for the Illinois Criminal Justice Information Authority (ICJIA) designed to keep all accessibility information in one place to meet the **ADA Title II April 24, 2026 guideline**. This portal consolidates accessibility resources including FAQs and Links to ensure compliance and provide a centralized resource for accessibility information.

## Purpose

This accessibility portal serves as a centralized hub for all accessibility-related information to ensure compliance with the **ADA Title II April 24, 2026 guideline**. The portal includes:

- **FAQs**: Frequently asked questions about accessibility requirements and compliance
- **Links**: Curated collection of accessibility resources and related information

All accessibility information is organized in one place to facilitate easy access and ensure that ICJIA meets its accessibility obligations under ADA Title II.

## Tech Stack

### Core Framework

- **Nuxt 4** - Vue.js framework with static site generation
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript

### UI & Styling

- **Vuetify 3** - Material Design component library
- **Sass** - CSS preprocessor
- **Material Design Icons (MDI)** - Icon library

### Content & Data

- **Nuxt Content 3** - Markdown-based content management
- **Zod** - TypeScript-first schema validation

### Development Tools

- **Vite** - Next-generation frontend build tool (via Nuxt)
- **Yarn** - Package manager
- **Playwright** - End-to-end testing framework
- **axe-core** - Accessibility testing engine

### Analytics

- **Plausible Analytics** - Privacy-friendly web analytics

### Deployment

- **Netlify** - Static site hosting and deployment

## Features

- **WCAG 2.1 AA Compliant** - Verified with automated accessibility audits using **axe-core** (all pages pass)
- **Accessibility Enhancements**:
  - Skip navigation link for keyboard users
  - ARIA live regions for dynamic content (countdown timer)
  - ARIA describedby relationships for FAQ accordions
  - Proper ARIA labels on all interactive elements
  - aria-current="page" on active navigation items
  - Decorative icons properly marked with aria-hidden
- **Responsive Design** - Mobile-first approach with proper breakpoints
- **Dark Theme** - Dark theme by default
- **Static Site Generation** - Optimized for Netlify deployment
- **Automated Testing** - Accessibility audits using **axe-core** (WCAG 2.1 AA compliance)
- **Content Management** - Markdown-based content via Nuxt Content
- **Performance** - Optimized static generation with proper caching headers

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

# Run accessibility audit using axe-core (WCAG 2.1 AA compliance check)
yarn audit:a11y

# Generate comprehensive accessibility report (HTML)
# Note: Requires a running server (dev, preview, or generate:serve)
yarn generate:accessibility
```

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
7. **Output to `.output/public/`** - Directory ready for deployment

**Note**: The sitemap automatically excludes `/docs/` routes (documentation pages are public but not included in the sitemap for SEO purposes).

## Deployment

This site is configured for deployment on Netlify:

- **Build command**: `yarn generate`
- **Publish directory**: `.output/public`
- **Node version**: 22.14.0 (specified in netlify.toml)

The `netlify.toml` file includes:

- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Cache headers for static assets
- SPA fallback redirects for client-side routing

To deploy:

1. Push code to your Git repository
2. Connect the repository to Netlify
3. Netlify will automatically detect the `netlify.toml` configuration
4. The site will build and deploy automatically on each push

## Project Structure

```
├── app/
│   ├── app.vue              # Root app component
│   ├── layouts/
│   │   └── default.vue      # Default layout with navbar and footer
│   ├── pages/
│   │   ├── index.vue        # Home page with countdown timer and FAQs
│   │   └── links.vue        # Accessibility links page
│   ├── components/
│   │   ├── SkipLink.vue     # Skip to main content link
│   │   ├── AppNavbar.vue    # Navigation bar with aria-current support
│   │   ├── AppFooter.vue    # Footer component
│   │   ├── CountdownTimer.vue  # Countdown timer with aria-live
│   │   └── FaqAccordion.vue    # FAQ accordion with aria-describedby
│   ├── composables/
│   │   └── useFaqCollapse.ts  # Composable for FAQ collapse state
│   ├── plugins/
│   │   ├── content-links.client.ts  # Plugin to add target="_blank" to content links
│   │   └── ensure-accessibility-report.server.ts  # Server plugin to ensure report exists
│   ├── utils/
│   │   └── faqTransform.ts  # Utility to transform FAQ content
│   └── error.vue            # Error page component
├── content/
│   ├── links.md             # Accessibility links content
│   └── faqs.md              # FAQ content
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── icjia-logo.png       # ICJIA logo
│   ├── robots.txt           # Robots.txt (disallows all indexing)
│   ├── sitemap.xml          # Auto-generated sitemap (excludes /docs/ routes)
│   └── docs/
│       ├── index.html       # Documentation portal index
│       └── accessibility/
│           └── index.html   # Accessibility audit report (generated)
├── scripts/
│   ├── generate-routes.js  # Routes generation script (scans pages and content)
│   ├── generate-sitemap.js  # Sitemap generation script
│   ├── generate-accessibility-report.js  # Accessibility report generator
│   └── ensure-accessibility-report.js  # Ensures accessibility report placeholder exists
├── audit-accessibility.js   # Legacy accessibility audit script (console output)
├── content.config.ts        # Nuxt Content configuration
├── LICENSE                  # MIT License
├── netlify.toml            # Netlify deployment configuration
├── nuxt.config.ts          # Nuxt configuration
└── routes.json             # Auto-generated routes list (from Nuxt build)
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

This project includes two accessibility testing tools:

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
- **HTML report generation** - Creates a beautiful, dark-themed HTML report
- **Clickable page links** - All page URLs in the report are clickable and open in new tabs
- **Detailed violation information** - Includes violation IDs, descriptions, impact levels, affected elements, and remediation guidance
- **Report location** - Generated at `/public/docs/accessibility/index.html` and accessible at `/docs/accessibility`
- **Documentation portal** - Report is accessible via the documentation portal at `/docs`

**Report Contents:**

- Summary statistics (total pages, passed/failed counts, total violations)
- Violation breakdown by impact level (critical, serious, moderate, minor)
- Per-page results with pass/fail status
- Detailed violation information for each page
- Information about axe-core and why it's a trusted accessibility testing tool

**Requirements:**

- A server must be running (dev, preview, or generate:serve)
- The script will automatically detect the running server on common ports (3000, 5150, 4173, 3003)
- If no server is detected, the script will provide clear instructions

**Accessing the Report:**

- After generation, view the report at: `http://localhost:[port]/docs/accessibility`
- Or access via the documentation portal: `http://localhost:[port]/docs`
- The report is also available in the footer navigation (Accessibility Report link)

#### Why axe-core?

**axe-core** is the industry-standard accessibility testing engine used by major tools and organizations worldwide. Here's why it's as effective as commercial solutions like SiteImprove or Google Lighthouse:

##### **Industry Standard & Widely Adopted**

- **Used by Google Lighthouse** - Lighthouse's accessibility audit is powered by axe-core
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

| Feature              | axe-core     | SiteImprove | Google Lighthouse       |
| -------------------- | ------------ | ----------- | ----------------------- |
| WCAG 2.1 AA Coverage | ✅ Full      | ✅ Full     | ✅ Full (uses axe-core) |
| Open Source          | ✅ Yes       | ❌ No       | ✅ Yes                  |
| Cost                 | ✅ Free      | ❌ Paid     | ✅ Free                 |
| CI/CD Integration    | ✅ Excellent | ⚠️ Limited  | ✅ Good                 |
| Detailed Reporting   | ✅ Yes       | ✅ Yes      | ⚠️ Basic                |
| Real Browser Testing | ✅ Yes       | ✅ Yes      | ✅ Yes                  |

**Conclusion**: axe-core provides the same level of WCAG 2.1 AA compliance testing as commercial tools like SiteImprove, and it's actually the engine that powers Google Lighthouse's accessibility audits. By using axe-core directly, we get the same comprehensive testing with full transparency, no licensing costs, and better integration with our development workflow.

#### Current Audit Status

All pages currently pass with **no violations** detected. The audit is run regularly during development to ensure ongoing compliance with WCAG 2.1 AA standards.

#### Sitemap Generation

The project includes automated sitemap generation that runs during build, generate, and dev processes:

- **Automatic generation** - Sitemap is created/updated automatically
- **Route discovery** - Uses `routes.json` (generated by Nuxt) as the primary source
- **Fallback scanning** - Scans `app/pages` and `content/` directories if routes.json isn't available
- **Excludes documentation** - Automatically excludes `/docs/` routes from the sitemap
- **Configurable domain** - Site domain is configurable in `scripts/generate-sitemap.js`

The sitemap is generated at `public/sitemap.xml` and includes all public pages with proper priority and change frequency settings.

## Project Status

**Current Status**: ✅ Production Ready

- ✅ All pages pass WCAG 2.1 AA compliance
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark theme (default)
- ✅ Static site generation optimized
- ✅ Accessibility features implemented and tested
- ✅ SEO optimized with proper meta tags

**Last Updated**: December 23, 2025

**Node Version**: 22.14.0  
**Nuxt Version**: 4.0.0+  
**Vue Version**: 3.5.13+  
**Vuetify Version**: 3.11.3+

## License

This project is licensed under the MIT License.

Copyright (c) 2025 Illinois Criminal Justice Information Authority

See the [LICENSE](LICENSE) file for the full license text.
