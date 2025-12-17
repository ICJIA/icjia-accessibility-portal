# ICJIA Accessibility Portal

A modern, accessible portal for the Illinois Criminal Justice Information Authority (ICJIA) designed to keep all accessibility information in one place to meet the **ADA Title II April 24, 2026 guideline**. This portal consolidates accessibility resources including FAQs and Links to ensure compliance and provide a centralized resource for accessibility information.

## Purpose

This accessibility portal serves as a centralized hub for all accessibility-related information to ensure compliance with the **ADA Title II April 24, 2026 guideline**. The portal includes:

- **FAQs**: Frequently asked questions about accessibility requirements and compliance
- **Links**: Curated collection of accessibility resources and related information

All accessibility information is organized in one place to facilitate easy access and ensure that ICJIA meets its accessibility obligations under ADA Title II.

## Tech Stack

- **Nuxt 4** - Vue.js framework with static site generation
- **Nuxt Content 3** - Markdown-based content management
- **Vuetify 3** - Material Design component library
- **Yarn** - Package manager

## Features

- **WCAG 2.1 AA Compliant** - Verified with automated accessibility audits (all pages pass)
- **Accessibility Enhancements**:
  - Skip navigation link for keyboard users
  - ARIA live regions for dynamic content (countdown timer)
  - ARIA describedby relationships for FAQ accordions
  - Proper ARIA labels on all interactive elements
  - aria-current="page" on active navigation items
  - Decorative icons properly marked with aria-hidden
- **Responsive Design** - Mobile-first approach with proper breakpoints
- **Dark Mode** - Dark theme by default with light/dark toggle support
- **Static Site Generation** - Optimized for Netlify deployment
- **Automated Testing** - Accessibility audits with axe-core (WCAG 2.1 AA)
- **Content Management** - Markdown-based content via Nuxt Content
- **Performance** - Optimized static generation with proper caching headers

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Generate static site
yarn generate

# Preview generated site
yarn preview

# Run accessibility audit (WCAG 2.1 AA compliance check)
yarn audit:a11y
```

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
│   │   ├── index.vue        # Home page with countdown timer
│   │   ├── links.vue        # Accessibility links page
│   │   └── faqs.vue         # FAQs page
│   ├── components/
│   │   ├── SkipLink.vue     # Skip to main content link
│   │   ├── AppNavbar.vue    # Navigation bar with aria-current support
│   │   ├── AppFooter.vue    # Footer component
│   │   ├── CountdownTimer.vue  # Countdown timer with aria-live
│   │   └── FaqAccordion.vue    # FAQ accordion with aria-describedby
│   ├── composables/
│   │   └── useFaqCollapse.ts  # Composable for FAQ collapse state
│   ├── plugins/
│   │   └── content-links.client.ts  # Plugin to add target="_blank" to content links
│   ├── utils/
│   │   └── faqTransform.ts  # Utility to transform FAQ content
│   └── error.vue            # Error page component
├── content/
│   ├── links.md             # Accessibility links content
│   └── faqs.md              # FAQ content
├── public/
│   ├── robots.txt           # Robots.txt (disallows all indexing)
│   └── icjia-logo.png       # ICJIA logo
├── audit-accessibility.js   # Accessibility audit script
├── content.config.ts        # Nuxt Content configuration
├── netlify.toml            # Netlify deployment configuration
└── nuxt.config.ts          # Nuxt configuration
```

## Accessibility

This site is designed and tested to meet **WCAG 2.1 AA standards**. All pages have been verified with automated accessibility audits using axe-core.

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

Run the automated accessibility audit:

```bash
npm run audit:a11y
```

This will test all pages for WCAG 2.1 AA compliance. All pages currently pass with no violations.

## Status

**Current Status**: ✅ All pages pass WCAG 2.1 AA compliance  
**Last Updated**: December 17, 2025  
**Last Accessibility Audit**: December 2025 - All pages passed with no violations

## License

Copyright © 2025 Illinois Criminal Justice Information Authority. All rights reserved.
