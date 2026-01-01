# ICJIA Accessibility Portal: Complete Architecture & Implementation Guide

**Last Updated**: January 2, 2026  
**For**: Future Developers, LLMs, and Technical Teams  
**Purpose**: Comprehensive guide to understanding, maintaining, and replicating this accessibility-focused Nuxt application

> 📌 **Note**: Code snippets throughout this guide include direct links to the source files in the [GitHub repository](https://github.com/ICJIA/icjia-accessibility-portal). Click the file path links to view the complete code.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Decisions](#architecture-decisions)
3. [Application Structure](#application-structure)
4. [Content Management Strategy](#content-management-strategy)
5. [Accessibility Implementation](#accessibility-implementation)
6. [Build & Deployment Process](#build--deployment-process)
7. [Challenges & Solutions](#challenges--solutions)
8. [Best Practices & Patterns](#best-practices--patterns)
9. [Testing & Validation](#testing--validation)
10. [Future Considerations](#future-considerations)

---

## Project Overview

### Purpose

The ICJIA Accessibility Portal is a **fully accessible**, **static-generated** web application designed to provide comprehensive accessibility guidance for Illinois state agency employees ahead of the **ADA Title II April 24, 2026 compliance deadline**.

### Key Requirements

1. **100% WCAG 2.1 AA Compliance** - Zero accessibility violations
2. **Static Site Generation** - Fast, cacheable, CDN-friendly
3. **Content-First** - Easy markdown-based content management
4. **Performance** - Lighthouse scores 90+
5. **Maintainability** - Clear patterns, good documentation
6. **Flexibility** - Support for dynamic content (countdown timer, "new" badges)

### Tech Stack Rationale

| Technology         | Why Chosen                                                     |
| ------------------ | -------------------------------------------------------------- |
| **Nuxt 4**         | Static generation, Vue 3 support, excellent DX, auto-imports   |
| **Vue 3**          | Modern reactive framework, composition API, TypeScript support |
| **Vuetify 3**      | Accessible Material Design components out of the box           |
| **Nuxt Content 3** | File-based CMS, markdown support, powerful query API           |
| **TypeScript**     | Type safety, better IDE support, catches errors early          |
| **Netlify**        | Simple deployment, CDN, custom headers support                 |
| **axe-core**       | Industry-standard accessibility testing engine                 |
| **Playwright**     | Reliable browser automation for testing                        |

---

## Architecture Decisions

### 1. Static Site Generation vs. SSR

**Decision**: Static Site Generation (SSG)

**Reasoning**:

- Content rarely changes (FAQ updates are infrequent)
- No user authentication or dynamic data
- Better performance (pre-rendered HTML)
- Lower hosting costs (just static files)
- CDN-friendly for fast global delivery
- Better SEO (fully rendered pages)

**Implementation**:

**File**: [`nuxt.config.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/nuxt.config.ts)

```typescript
// nuxt.config.ts
nitro: {
  preset: 'static',
  prerender: {
    crawlLinks: true,
    ignore: ['/docs/accessibility']
  }
}
```

### 2. Content Strategy: Markdown vs. Database

**Decision**: Markdown files with Nuxt Content

**Reasoning**:

- Content is primarily text with minimal structure
- Git-based workflow (version control, pull requests)
- No need for database infrastructure
- Easy for non-developers to edit
- Supports front matter for metadata
- Can be edited in any text editor

**Trade-offs**:

- Less flexible than database for complex queries
- Requires rebuild for content changes
- Not suitable for user-generated content

### 3. Component Library: Vuetify vs. Headless

**Decision**: Vuetify 3

**Reasoning**:

- Built-in accessibility features (ARIA, keyboard nav)
- Material Design = familiar UX patterns
- Dark theme support out of the box
- Reduces custom CSS/component development time
- Grid system and responsive utilities
- Icon library included (MDI)

**Challenges**:

- Larger bundle size (mitigated with tree-shaking)
- Some styling overrides needed for custom design
- Framework-specific patterns

### 4. Layouts: Multiple Layouts Strategy

**Decision**: Separate layouts for different page types

**Implementation**:

```
app/layouts/
  default.vue    # Standard pages (navbar + footer)
  print.vue      # Printer-friendly pages (no navigation)
```

**Reasoning**:

- Clean separation of concerns
- Printer layout removes navigation clutter
- Each layout can have specific components
- Easy to add new layout types (e.g., error pages)

---

## Application Structure

### Directory Organization

```
/
├── app/                          # Nuxt application code
│   ├── components/              # Reusable Vue components
│   │   ├── AppFooter.vue       # Footer with links
│   │   ├── AppNavbar.vue       # Navigation bar
│   │   ├── CountdownTimer.vue  # Deadline countdown
│   │   ├── FaqAccordion.vue    # FAQ display component
│   │   └── SkipLink.vue        # Accessibility skip link
│   ├── composables/            # Vue composables (reusable logic)
│   │   ├── useDeadlineCountdown.ts
│   │   ├── useFaqCollapse.ts
│   │   ├── useSeo.ts
│   │   ├── useSlugify.ts
│   │   └── useStructuredData.ts
│   ├── layouts/                # Page layouts
│   │   ├── default.vue         # Standard layout
│   │   └── print.vue           # Printer-friendly layout
│   ├── pages/                  # Route pages (file-based routing)
│   │   ├── index.vue           # Home page (FAQs)
│   │   ├── faqs.vue            # Dedicated FAQs page
│   │   ├── faqs-print.vue      # Printer-friendly FAQs
│   │   └── links.vue           # Resources page
│   ├── plugins/                # Nuxt plugins
│   │   ├── content-links.client.ts
│   │   ├── ensure-accessibility-report.server.ts
│   │   ├── optimize-css.client.ts
│   │   ├── optimize-fonts.client.ts
│   │   └── resource-hints.server.ts
│   ├── utils/                  # Utility functions
│   │   └── faqTransform.ts     # FAQ parsing and transformation
│   ├── app.vue                 # Root app component
│   └── router.options.ts       # Router configuration
├── content/                     # Markdown content files
│   ├── faqs.md                 # FAQ content (3000+ lines)
│   └── links.md                # Resource links
├── public/                      # Static assets
│   ├── docs/                   # Generated documentation
│   ├── favicon.svg             # Site icon
│   ├── icjia-logo-*.png        # Logo images
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # Auto-generated sitemap
├── scripts/                     # Build and utility scripts
│   ├── ensure-accessibility-report.js
│   ├── generate-routes.js
│   └── generate-sitemap.js
├── markdown-documentation/      # Project documentation
│   ├── ARCHITECTURE_GUIDE.md   # This file
│   ├── PRINTER_FRIENDLY_FAQ.md
│   └── [other docs]
├── audit-accessibility.js       # Custom axe-core audit script
├── nuxt.config.ts              # Nuxt configuration
├── content.config.ts           # Nuxt Content configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

### File-Based Routing

Nuxt automatically creates routes from files in `app/pages/`:

```
app/pages/index.vue       →  /
app/pages/faqs.vue        →  /faqs
app/pages/faqs-print.vue  →  /faqs-print
app/pages/links.vue       →  /links
```

**Benefits**:

- No manual route configuration
- Easy to understand URL structure
- Automatic code splitting per route

---

## Content Management Strategy

### Markdown Structure

**File**: `content/faqs.md` (3000+ lines) - [View on GitHub](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/content/faqs.md)

**Structure**:

```markdown
---
title: Frequently Asked Questions
description: Common questions about accessibility
---

# Main Title

Intro content...

---

## Section 1 (H2)

### Question 1 (H3)

{new:2026-01-01}

Answer content...

### Question 2 (H3)

Answer content...

## Section 2 (H2)

### Question 3 (H3)

Answer content...
```

### Content Parsing Logic

**File**: [`app/utils/faqTransform.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/utils/faqTransform.ts)

**Key Functions**:

1. **`extractNewDate()`** - Detects `{new:YYYY-MM-DD}` tags
2. **`filterNewComments()`** - Removes tags from display
3. **`isWithinNewWindow()`** - Checks if date is within 10 days
4. **`replaceDynamicPlaceholders()`** - Replaces `{days_until_deadline}`

**How it Works**:

```typescript
// 1. Parse markdown into MiniMark AST
const body = page.value.body; // type: minimark

// 2. Iterate through nodes
for (const node of body.value) {
  if (isH2(node)) {
    // Start new section
  } else if (isH3(node)) {
    // Start new question
    // Collect answer nodes until next H2/H3
  }
}

// 3. Check for "new" tag
const newDate = extractNewDate(answerNodes);
const isNew = newDate !== null;

// 4. Filter out tag from display
const cleanAnswer = filterNewComments(answerNodes);
```

### "New" Badge System

**Purpose**: Highlight recently added questions automatically

**Implementation**:

```markdown
### What is digital accessibility?

{new:2026-01-01}

Answer content...
```

**Features**:

- Badge shows for 10 days (configurable via `NEW_QUESTION_DAYS`)
- Auto-expires (no manual cleanup needed)
- Supports both `{new:DATE}` and `<!-- new:DATE -->` formats
- Curly braces survive markdown parsing better

**Display**:

- Green chip in FaqAccordion component
- "NEW" text badge in printer-friendly version
- Accessible (doesn't rely only on color)

---

## Accessibility Implementation

### Skip Links

**Critical Component for Keyboard Navigation**

**Challenge**: Users with keyboards need to skip repetitive navigation

**Solution**: Reusable SkipLink component used in all layouts

**Implementation**:

**File**: [`app/components/SkipLink.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/SkipLink.vue)

```vue
<!-- app/components/SkipLink.vue -->
<template>
  <a
    href="#main-content"
    class="skip-link"
    @click="handleClick"
    @keydown.enter="handleClick"
  >
    Skip to main content
  </a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100px; /* Off-screen until focused */
  left: 0;
  z-index: 10000; /* Above all content */
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  /* ... more styles ... */
}

.skip-link:focus {
  top: 0; /* Visible when focused */
}
</style>
```

**Key Details**:

- `top: -100px` (not `left: -9999px`) - audit script checks for this
- `z-index: 10000` - ensures it appears above everything
- Event handlers for smooth scroll to main content
- Respects `prefers-reduced-motion`

**Layout Integration**:

**File**: [`app/layouts/default.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/layouts/default.vue)

```vue
<!-- app/layouts/default.vue -->
<template>
  <div class="app-wrapper">
    <SkipLink />
    <AppNavbar />
    <v-main id="main-content" tabindex="-1">
      <slot />
    </v-main>
    <AppFooter />
  </div>
</template>
```

**File**: [`app/layouts/print.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/layouts/print.vue)

```vue
<!-- app/layouts/print.vue -->
<template>
  <div class="print-layout-wrapper">
    <SkipLink />
    <v-main id="main-content" tabindex="-1">
      <slot />
    </v-main>
  </div>
</template>
```

**Critical**:

- Main content MUST have `id="main-content"`
- Main content MUST have `tabindex="-1"` for programmatic focus
- Use the SAME component in all layouts for consistency

### ARIA Landmarks & Labels

**Navbar**:

**File**: [`app/components/AppNavbar.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/AppNavbar.vue)

```vue
<v-btn
  :aria-label="`Navigate to ${item.title}`"
  :aria-current="route.path === item.to ? 'page' : undefined"
>
```

**Countdown Timer**:

**File**: [`app/components/CountdownTimer.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/CountdownTimer.vue)

```vue
<div role="status" aria-live="polite" aria-atomic="false">
  <span class="sr-only">{{ countdownAriaLabel }}</span>
</div>
```

**FAQ Accordion**:

**File**: [`app/components/FaqAccordion.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/FaqAccordion.vue)

```vue
<v-expansion-panel :aria-describedby="`answer-${item.id}`">
  <v-expansion-panel-title :id="`question-${item.id}`">
    {{ item.question }}
  </v-expansion-panel-title>
  <v-expansion-panel-text :id="`answer-${item.id}`">
    <!-- Answer content -->
  </v-expansion-panel-text>
</v-expansion-panel>
```

### Focus Management

**Visible Focus Indicators**:

```css
*:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}
```

**Keyboard Navigation**:

- All interactive elements reachable via Tab
- Logical tab order (source order)
- No keyboard traps
- Enter/Space activate buttons

### Color Contrast

**Requirements**: WCAG 2.1 AA = 4.5:1 for normal text, 3:1 for large text

**Implementation**:

- Dark theme with carefully chosen colors
- Primary: `#60A5FA` (blue) on dark backgrounds
- Tested with browser devtools color contrast checker
- Links underlined (don't rely on color alone)

---

## Build & Deployment Process

### Build Pipeline

```bash
# 1. Install dependencies
yarn install

# 2. Pre-build steps (automatic)
- Generate routes.json (scan pages directory)
- Generate sitemap.xml (from routes.json)
- Ensure accessibility report exists

# 3. Generate static site
yarn generate

# 4. Output to .output/public/
- HTML files for each route
- JavaScript chunks (code-split)
- CSS files (optimized)
- Assets (images, fonts)
- sitemap.xml
- robots.txt
```

### Route Generation

**Challenge**: Need to know all routes for sitemap and static generation

**Solution**: Automatic route discovery

**Script**: `scripts/generate-routes.js` - [View on GitHub](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/scripts/generate-routes.js)

```javascript
// 1. Scan app/pages for .vue files
const pageFiles = findVueFiles("app/pages");

// 2. Convert to routes
const routes = pageFiles.map((file) => filePathToRoute(file));

// 3. Scan content/ for .md files (potential routes)
const mdFiles = findMarkdownFiles("content");
const contentRoutes = mdFiles.map((file) => markdownFileToRoute(file));

// 4. Combine and deduplicate
const allRoutes = [...new Set([...routes, ...contentRoutes])];

// 5. Write to routes.json
writeFileSync(
  "routes.json",
  JSON.stringify({
    generated: new Date().toISOString(),
    routes: allRoutes,
  })
);
```

### Sitemap Generation

**Script**: `scripts/generate-sitemap.js` - [View on GitHub](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/scripts/generate-sitemap.js)

```javascript
// 1. Read routes from routes.json
const routesData = JSON.parse(readFileSync("routes.json"));

// 2. Filter out excluded routes (/docs/*)
const publicRoutes = routesData.routes.filter(
  (route) => !route.startsWith("/docs")
);

// 3. Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${publicRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${route === "/" ? "1.0" : "0.8"}</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

// 4. Write to public/sitemap.xml
writeFileSync("public/sitemap.xml", xml);
```

### Deployment to Netlify

**Configuration**: `netlify.toml` - [View on GitHub](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/netlify.toml)

```toml
[build]
  command = "yarn generate"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Custom Headers**:

- Security headers (XSS protection, etc.)
- Cache control for assets
- CORS headers if needed

**Deployment Trigger**:

- Git push to main branch
- Automatic build and deploy
- Preview deployments for PRs

---

## Challenges & Solutions

### Challenge 1: Parsing 3000+ Line Markdown File

**Problem**: Single FAQ file with complex structure (H2 sections, H3 questions, mixed content)

**Initial Approach**: Try to use Nuxt Content's built-in features

**Issues**:

- Content renderer shows everything at once (no accordion)
- Need to extract structure for table of contents
- Need to support "new" badges and dynamic content

**Solution**: Custom parser using MiniMark AST

**File**: [`app/utils/faqTransform.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/utils/faqTransform.ts)

```typescript
// Parse markdown into AST
const body = page.value.body; // MiniMark format

// Manually walk the AST
function extractFaqStructure(nodes) {
  const sections = [];
  let currentSection = null;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (isH2(node)) {
      // New section
      currentSection = {
        heading: extractText(node),
        items: [],
      };
      sections.push(currentSection);
    } else if (isH3(node)) {
      // New question
      const question = extractText(node);
      const answer = collectAnswerNodes(nodes, i);
      currentSection.items.push({ question, answer });
    }
  }

  return sections;
}
```

**Key Learnings**:

- MiniMark is Nuxt Content's internal AST format
- Nodes are arrays: `['tagName', attributes, ...children]`
- Text nodes are strings
- Need to recursively extract text from nested structures

### Challenge 2: "New" Badge System

**Problem**: Want to mark questions as new, but don't want manual cleanup

**Requirements**:

- Automatic expiration after N days
- Easy to add (just add a date in markdown)
- Must not show the tag text in rendered output

**Solution 1 (Failed)**: HTML comments

```markdown
### Question?

<!-- new:2026-01-01 -->
```

**Issue**: Markdown parser sometimes strips HTML comments

**Solution 2 (Success)**: Curly brace syntax

```markdown
### Question?

{new:2026-01-01}
```

**Why it works**:

- Curly braces are treated as text in markdown
- Easy to detect with regex: `/\{new:(\d{4}-\d{2}-\d{2})\}/`
- Can be removed before display
- Survives markdown parsing reliably

**Implementation**:

**File**: [`app/utils/faqTransform.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/utils/faqTransform.ts)

```typescript
const NEW_TAG_PATTERN = /\{new:\s*(\d{4}-\d{2}-\d{2})\}/;

function extractNewDate(answerNodes) {
  for (const node of answerNodes) {
    const text = extractText(node);
    const match = text.match(NEW_TAG_PATTERN);
    if (match) {
      const dateStr = match[1];
      if (isWithinWindow(dateStr, 10)) {
        // 10 days
        return dateStr;
      }
    }
  }
  return null;
}

function filterNewComments(answerNodes) {
  return answerNodes
    .map((node) => {
      if (typeof node === "string") {
        return node.replace(/\{new:.*?\}/g, "").trim();
      }
      return node;
    })
    .filter((node) => node !== "");
}
```

### Challenge 3: Printer-Friendly Version

**Problem**: Users want to print all FAQs, but online version uses interactive accordion

**Requirements**:

- All content visible (no collapsed panels)
- Clean layout (no navigation)
- Professional appearance when printed
- Still accessible on screen

**Solution**: Separate route with custom layout

**Approach**:

1. Create `/faqs-print` route - [`app/pages/faqs-print.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/pages/faqs-print.vue)
2. Use same content source (`content/faqs.md`)
3. Create `print.vue` layout (no navbar/footer) - [`app/layouts/print.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/layouts/print.vue)
4. Style for both screen preview and print output

**CSS Strategy**:

```css
/* Screen view - simulate printed document */
@media screen {
  .print-container {
    max-width: 8.5in;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .print-url {
    color: #0066cc; /* Blue, clickable */
    text-decoration: underline;
  }
}

/* Print view - clean output */
@media print {
  .print-container {
    padding: 0;
  }

  .print-url {
    color: #000; /* Black for cost-effective printing */
    text-decoration: none;
  }

  .skip-link {
    display: none; /* No skip link needed in print */
  }

  .print-faq-item {
    page-break-inside: avoid; /* Don't split Q&A */
  }
}
```

**Key Decisions**:

- Use serif fonts (Georgia) for print
- Black and white (except section headers)
- Include table of contents for navigation
- Show URLs as text for reference
- Add last-updated date for context

### Challenge 4: Skip Link Audit Validation

**Problem**: Custom skip link in printer page failed audit (9/12 passing)

**Initial Approach**: Custom implementation in printer page

**Issues**:

- Audit script looks for specific CSS patterns
- `left: -9999px` vs `top: -100px` matters
- z-index must be high enough (10000+)
- CSS must match expectations exactly

**Failed Attempt**:

```css
.skip-link {
  left: -9999px; /* ❌ Audit expects top: -100px */
  z-index: 999; /* ❌ Too low */
}
```

**Successful Solution**: Reuse existing SkipLink component

**File**: [`app/layouts/print.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/layouts/print.vue)

```vue
<!-- app/layouts/print.vue -->
<template>
  <div class="print-layout-wrapper">
    <SkipLink />
    <!-- ✅ Proven component -->
    <v-main id="main-content" tabindex="-1">
      <slot />
    </v-main>
  </div>
</template>
```

**Why it works**:

- Component already tested and validated
- Consistent CSS across all pages
- DRY principle (don't repeat yourself)
- Single source of truth for skip link behavior

**Lesson Learned**: When you have a working, tested component, use it. Don't reinvent the wheel.

### Challenge 5: Countdown Timer State Management

**Problem**: Countdown needs to update every second without causing full page re-renders

**Solution**: Composable with reactive state

**File**: [`app/composables/useDeadlineCountdown.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useDeadlineCountdown.ts)

```typescript
// composables/useDeadlineCountdown.ts
export function useDeadlineCountdown() {
  const now = ref(Date.now());

  const daysRemaining = computed(() => {
    const distance = DEADLINE_DATE - now.value;
    return Math.floor(distance / (1000 * 60 * 60 * 24));
  });

  onMounted(() => {
    // Update every minute (not second - saves CPU)
    intervalId = setInterval(() => {
      now.value = Date.now();
    }, 60000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return { daysRemaining, deadlinePassed, urgencyText };
}
```

**Optimizations**:

- Update every minute (not every second for days counter)
- Use computed for derived values
- Clean up interval on unmount

### Challenge 6: Vuetify Console Logging in Development

**Problem**: Vuetify instance objects are logged to console (both command line and browser) during development, creating noise and warnings.

**Symptoms**:

- Large Vuetify object dumps in command line console
- Vuetify object dumps in browser DevTools console
- Warning: "Failed to stringify dev server logs. Received DevalueError: Cannot stringify a function."

**Root Cause**:

Vuetify + Nuxt 4 compatibility issue where Vuetify exposes functions in its configuration that can't be serialized by Nuxt's dev server logging system. The Vuetify instance object contains:
- `install` and `unmount` functions
- Reactive properties (RefImpl, ComputedRefImpl)
- Theme, icons, locale, display, and other configuration objects
- Functions that can't be JSON.stringify'd

**Solution**: Client-side and server-side plugins to suppress Vuetify logs

**Implementation**:

**File**: [`app/plugins/suppress-vuetify-logs.client.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/plugins/suppress-vuetify-logs.client.ts)

```typescript
// Client-side plugin (browser console)
export default defineNuxtPlugin(() => {
  if (process.server || !import.meta.dev) return;

  const originalLog = console.log;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  const filteredLog = (...args: any[]) => {
    if (!containsVuetifyInstanceOrConfig(args)) {
      originalLog.apply(console, args);
    }
  };

  console.log = filteredLog;
  console.info = filteredInfo;
  console.debug = filteredDebug;
});
```

**File**: [`app/plugins/suppress-vuetify-logs.server.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/plugins/suppress-vuetify-logs.server.ts)

```typescript
// Server-side plugin (command line console)
export default defineNuxtPlugin(() => {
  if (!process.server || !import.meta.dev) return;

  const originalLog = console.log;
  const originalWarn = console.warn;

  const filteredLog = (...args: any[]) => {
    // Suppress Vuetify instance objects
    if (containsVuetifyInstanceOrConfig(args)) return;
    
    // Suppress stringification warnings related to Vuetify
    const message = args[0]?.toString() || '';
    if (message.includes('Failed to stringify dev server logs')) return;
    
    originalLog.apply(console, args);
  };

  const filteredWarn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (message.includes('DevalueError') || 
        message.includes('Cannot stringify a function')) {
      return; // Suppress harmless Vuetify serialization warnings
    }
    originalWarn.apply(console, args);
  };

  console.log = filteredLog;
  console.warn = filteredWarn;
});
```

**Detection Logic**:

The plugins detect Vuetify instances by checking for:
- `install` and `unmount` functions (key indicators)
- Instance properties: `theme`, `icons`, `locale`, `defaults`, `display`, `date`, `goTo`
- Function properties (common in Vuetify objects)
- Constructor names containing "vuetify"

**Important**: The plugins specifically preserve:
- Vue component instances (have `$el`, `$props`, etc.)
- Error objects and strings (warnings/errors should be preserved)
- All other console output

**Key Details**:

- **Client-side plugin** (`.client.ts`): Only runs in browser, filters browser console
- **Server-side plugin** (`.server.ts`): Only runs on server, filters command line output
- **Development only**: Both plugins check `import.meta.dev` to only run in development
- **Non-invasive**: Doesn't modify Vuetify's functionality, only filters console output
- **Vuetify MCP compatible**: Doesn't interfere with Vuetify MCP server operations

**Configuration Note**:

**File**: [`nuxt.config.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/nuxt.config.ts)

```typescript
// Note: Vuetify configuration objects may appear in console logs (both command line and browser)
// due to Vuetify + Nuxt 4 compatibility where Vuetify exposes functions in its configuration
// that can't be serialized. This is a known harmless issue that doesn't affect functionality.
// Client-side console logs are suppressed by app/plugins/suppress-vuetify-logs.client.ts
// Server-side logs (command line) are from Nuxt's dev server and are harmless.
vuetify: {
  moduleOptions: {
    styles: true
  },
  vuetifyOptions: {
    // ... configuration
  }
}
```

**Verification**:

After implementing the plugins:
- ✅ No Vuetify object dumps in command line
- ✅ No Vuetify object dumps in browser console
- ✅ No "Failed to stringify dev server logs" warnings
- ✅ All other console output preserved (errors, warnings, etc.)
- ✅ Vuetify functionality unaffected

**Best Practices Compliance**:

- Follows Vuetify best practices (non-invasive, doesn't modify Vuetify)
- Compatible with Vuetify MCP server
- Preserves important debugging information
- Only suppresses configuration/instance object noise
- Properly documented with JSDoc comments

**Lesson Learned**: When working with frameworks that expose complex objects with functions, console logging can create noise. Intercepting console methods is a valid approach to clean up development output without affecting functionality.

---

## Best Practices & Patterns

### 1. Component Composition

**Pattern**: Small, focused components

```
CountdownTimer.vue       - Display only
  ↓ uses
useDeadlineCountdown.ts  - Logic and state
```

**Benefits**:

- Logic can be reused without UI
- Components stay simple and testable
- Easy to swap UI without changing logic

### 2. Composables for Shared Logic

**Examples**:

- `useSeo()` - Manage meta tags - [`app/composables/useSeo.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useSeo.ts)
- `useSlugify()` - Generate URL slugs - [`app/composables/useSlugify.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useSlugify.ts)
- `useFaqCollapse()` - Manage accordion state - [`app/composables/useFaqCollapse.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useFaqCollapse.ts)
- `useDeadlineCountdown()` - Countdown logic - [`app/composables/useDeadlineCountdown.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useDeadlineCountdown.ts)

**Pattern**:

```typescript
export function useComposableName() {
  // State
  const state = ref(initialValue);

  // Computed
  const derived = computed(() => transform(state.value));

  // Methods
  function doSomething() {
    state.value = newValue;
  }

  // Lifecycle
  onMounted(() => {
    /* setup */
  });
  onUnmounted(() => {
    /* cleanup */
  });

  // Return public API
  return { state, derived, doSomething };
}
```

### 3. Type Safety with TypeScript

**Benefits**:

- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Refactoring confidence

**Example**:

```typescript
interface FaqItem {
  question: string;
  answer: MiniMarkNode[];
  isNew?: boolean;
  newDate?: string;
}

interface FaqSection {
  heading: string | null;
  items: FaqItem[];
}

const faqSections = computed<FaqSection[]>(() => {
  // TypeScript ensures return type matches
  return parseFaqs(page.value);
});
```

### 4. SEO with Composable

**Pattern**: Centralized SEO management

**File**: [`app/composables/useSeo.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/composables/useSeo.ts)

```typescript
// composables/useSeo.ts
export function useSeo(options: SeoOptions) {
  useHead({
    title: options.title,
    meta: [
      { name: "description", content: options.description },
      { property: "og:title", content: options.title },
      { property: "og:description", content: options.description },
      { property: "og:url", content: `${baseUrl}${options.url}` },
      { property: "og:type", content: options.type || "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // ... more tags
    ],
    link: [{ rel: "canonical", href: `${baseUrl}${options.url}` }],
  });
}

// Usage in page
useSeo({
  title: "FAQs - Accessibility Portal",
  description: "Comprehensive FAQ about web accessibility...",
  url: "/faqs",
  keywords: ["accessibility", "WCAG", "ADA"],
});
```

### 5. Error Handling

**Strategy**: Graceful degradation

```vue
<template>
  <div v-if="page">
    <!-- Content -->
  </div>
  <div v-else-if="error">
    <h1>Error Loading Content</h1>
    <p>{{ error.message }}</p>
  </div>
  <div v-else>
    <v-progress-circular indeterminate />
    <p>Loading...</p>
  </div>
</template>
```

### 6. Responsive Design

**Strategy**: Mobile-first with breakpoints

```css
/* Mobile first (default) */
.element {
  font-size: 0.875rem;
  padding: 0.5rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    font-size: 1rem;
    padding: 1rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    font-size: 1.125rem;
    padding: 1.5rem;
  }
}
```

---

## Testing & Validation

### Accessibility Testing with axe-core

**Script**: `audit-accessibility.js` - [View on GitHub](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js)

**Features**:

- Tests all routes automatically (from sitemap.xml)
- Tests multiple viewports (desktop, tablet, mobile)
- Generates HTML report with detailed results
- Validates skip links specifically
- Zero tolerance for violations

**Configuration**:

```javascript
const VIEWPORTS = [
  { name: "desktop", width: 1920, height: 1080 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
];

const THEME = { name: "dark" };

const AXE_CONFIG = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  },
};
```

**Custom Rules**:

```javascript
// Enabled rules
axe.configure({
  rules: [
    { id: "aria-allowed-role", enabled: true },
    { id: "scrollable-region-focusable", enabled: true },
    { id: "landmark-banner-is-top-level", enabled: true },
    // ... more rules
  ],
});
```

**Skip Link Validation**:

```javascript
async function verifySkipLink(page) {
  return await page.evaluate((config) => {
    const skipLink = document.querySelector(config.selector);
    if (!skipLink) return { exists: false, issues: ["Not found"] };

    const target = document.getElementById(config.targetId);
    if (!target)
      return {
        exists: true,
        issues: ["Target not found"],
      };

    // Check if target is focusable
    const tabindex = target.getAttribute("tabindex");
    if (tabindex !== "-1" && tabindex !== "0") {
      return {
        exists: true,
        issues: ["Target not focusable"],
      };
    }

    // Check positioning
    const style = window.getComputedStyle(skipLink);
    if (style.position !== "absolute" || !style.top.includes("-100")) {
      return {
        exists: true,
        issues: ["Not properly positioned off-screen"],
      };
    }

    return { exists: true, working: true, issues: [] };
  }, SKIP_LINK_CONFIG);
}
```

**Running Tests**:

```bash
# Quick audit (console output)
yarn audit:a11y

# Full Lighthouse audit (requires running server)
yarn audit:lighthouse

# Both
yarn audit:full
```

### Performance Testing

**Lighthouse Integration**:

- Performance score
- Accessibility score (uses axe-core internally)
- Best practices
- SEO
- PWA (if applicable)

**Metrics Tracked**:

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)

---

## Future Considerations

### Potential Enhancements

1. **Search Functionality**
   - Full-text search across FAQs
   - Could use Fuse.js (client-side) or Algolia (server-side)
   - Would need search index generation

2. **Analytics**
   - Already has Plausible Analytics
   - Could add event tracking (FAQ opens, link clicks)
   - Privacy-friendly (no cookies)

3. **Internationalization (i18n)**
   - Multi-language support
   - Would need translated content files
   - Nuxt i18n module available

4. **CMS Integration**
   - Could integrate with Netlify CMS or Strapi
   - Would allow non-technical content updates
   - Trade-off: added complexity

5. **Progressive Web App (PWA)**
   - Offline support
   - Install to home screen
   - Would need service worker

### Scalability Considerations

**Current Scale**:

- 4 routes
- 1 large markdown file (3000 lines)
- ~50 FAQ questions
- Static generation works perfectly

**If Scaling to 100+ Routes**:

- Consider on-demand ISR (Incremental Static Regeneration)
- Split large markdown files into smaller ones
- Use database for dynamic content
- Implement caching strategy

**If Adding User Accounts**:

- Switch to SSR or hybrid rendering
- Add authentication (Auth0, Supabase, etc.)
- Consider edge functions for auth

### Maintenance Tips

1. **Content Updates**
   - Edit markdown files directly
   - Add `{new:YYYY-MM-DD}` for new questions
   - Badge expires automatically after 10 days

2. **Accessibility Audits**
   - Run `yarn audit:a11y` before each release
   - Must show 0 violations
   - Must show 12/12 skip links working

3. **Dependencies**
   - Update regularly: `yarn upgrade-interactive`
   - Test after updates
   - Check for breaking changes in major versions

4. **Performance Monitoring**
   - Run Lighthouse periodically
   - Monitor bundle size
   - Check Core Web Vitals

---

## Replicating This Application

### For Similar Projects

If you want to build a similar accessibility-focused, content-driven Nuxt application:

**Start With**:

1. Nuxt 4 + Nuxt Content 3
2. Component library (Vuetify or similar with accessibility features)
3. axe-core for testing
4. TypeScript for type safety

**Architecture Checklist**:

- ✅ Static generation for performance
- ✅ Skip links in layouts (not pages)
- ✅ Reusable SkipLink component
- ✅ Custom accessibility audit script
- ✅ Automated route and sitemap generation
- ✅ Multiple layouts for different page types
- ✅ Markdown-based content with custom parsing
- ✅ Composables for shared logic
- ✅ SEO optimization with structured data
- ✅ Responsive design (mobile-first)
- ✅ Dark theme with proper contrast

**Critical Success Factors**:

1. **Accessibility First** - Test early and often
2. **Keep It Simple** - Don't over-engineer
3. **Document Everything** - Future you will thank you
4. **Test Real Users** - Especially with assistive tech
5. **Performance Matters** - Static generation helps
6. **Content is King** - Make it easy to update

### For LLMs Working on This Codebase

**Key Files to Understand**:

1. [`nuxt.config.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/nuxt.config.ts) - Application configuration
2. [`app/utils/faqTransform.ts`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/utils/faqTransform.ts) - Content parsing logic
3. [`app/components/SkipLink.vue`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/app/components/SkipLink.vue) - Accessibility component
4. [`audit-accessibility.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js) - Testing implementation
5. [`content/faqs.md`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/content/faqs.md) - Content structure example

**Common Tasks**:

**Adding a New FAQ**:

```markdown
### Your Question Here?

{new:2026-01-15}

**Quick answer:** Brief answer.

**Full explanation:** Detailed answer...
```

**Adding a New Route**:

1. Create `app/pages/your-route.vue`
2. Run `yarn generate:routes` (or it runs automatically)
3. Check `routes.json` - your route should be there
4. Run `yarn generate:sitemap`
5. Check `public/sitemap.xml` - your route should be there

**Modifying Accessibility**:

- ALWAYS run `yarn audit:a11y` after changes
- Must show 0 violations and 12/12 skip links
- Test with keyboard navigation
- Test with screen reader if possible

**Debugging Tips**:

- Use Vue DevTools browser extension
- Check `routes.json` for route issues
- Look at `public/docs/accessibility/index.html` for audit details
- Check browser console for errors

---

## Conclusion

This application demonstrates that building a fully accessible, performant web application is achievable with modern tools and careful attention to detail. The key is:

1. **Choose the right tools** - Nuxt + Vuetify + axe-core
2. **Build accessibility in from the start** - Not an afterthought
3. **Test continuously** - Automated testing catches issues early
4. **Keep it simple** - Static generation over complex architectures
5. **Document everything** - Makes maintenance possible

The patterns and solutions in this guide can be applied to many different projects, not just accessibility portals. The principles of good component design, accessibility, and testing are universal.

---

**Questions or Issues?**

If you're working on this codebase and have questions:

1. Read this guide thoroughly
2. Check the other markdown documentation files
3. Look at the code comments (they're extensive)
4. Run the accessibility audit to validate changes
5. Test with real assistive technologies when possible

**Remember**: Accessibility is not optional. It's a legal requirement and the right thing to do.

---

_This guide was created January 1, 2026, for the ICJIA Accessibility Portal project._
