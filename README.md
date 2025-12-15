# ICJIA Accessibility Portal

A modern, accessible portal for the Illinois Criminal Justice Information Authority (ICJIA) providing accessibility resources, links, and FAQs.

## Tech Stack

- **Nuxt 4** - Vue.js framework with static site generation
- **Nuxt Content 3** - Markdown-based content management
- **Vuetify 3** - Material Design component library
- **Yarn** - Package manager

## Features

- WCAG 2.1 AA compliant design
- Dark mode by default with light/dark toggle
- Responsive design
- Skip navigation link for keyboard users
- Accessible color contrast ratios
- Static site generation for Netlify deployment

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
```

## Deployment

This site is configured for deployment on Netlify:

- **Build command**: `yarn generate`
- **Publish directory**: `.output/public`

## Project Structure

```
├── app/
│   ├── app.vue              # Root app component
│   ├── layouts/
│   │   └── default.vue      # Default layout with navbar and footer
│   ├── pages/
│   │   ├── index.vue        # Home page
│   │   ├── links.vue        # Accessibility links page
│   │   └── faqs.vue         # FAQs page
│   └── components/
│       ├── SkipLink.vue     # Skip to main content link
│       ├── AppNavbar.vue    # Navigation bar
│       ├── ThemeToggle.vue  # Light/dark mode toggle
│       └── AppFooter.vue    # Footer component
├── content/
│   ├── links.md             # Accessibility links content
│   └── faqs.md              # FAQ content
├── plugins/
│   └── vuetify.ts           # Vuetify plugin configuration
├── content.config.ts        # Nuxt Content configuration
└── nuxt.config.ts           # Nuxt configuration
```

## Accessibility

This site is designed to meet WCAG 2.1 AA standards:

- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Keyboard navigable interface
- Focus indicators on all interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Skip navigation link
- Reduced motion support

## License

Copyright © 2025 Illinois Criminal Justice Information Authority. All rights reserved.

