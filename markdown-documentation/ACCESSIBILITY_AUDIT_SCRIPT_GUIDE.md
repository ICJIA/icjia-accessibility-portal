# Accessibility Audit Script Guide

**Last Updated**: January 2026  
**Script Version**: 1.0.0  
**axe-core Version**: 4.11.0+  
**GitHub Repository**: [ICJIA/icjia-accessibility-portal](https://github.com/ICJIA/icjia-accessibility-portal)  
**Script Location**: [`audit-accessibility.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js)

---

## Table of Contents

1. [Overview](#overview)
2. [Script Purpose & Design](#script-purpose--design)
3. [Configuration](#configuration)
4. [Testing Modes](#testing-modes)
5. [Viewport Testing](#viewport-testing)
6. [Theme Testing](#theme-testing)
7. [Rule Configuration](#rule-configuration)
8. [Report Generation](#report-generation)
9. [Modal Windows](#modal-windows)
10. [Reusing This Script](#reusing-this-script)
11. [Troubleshooting](#troubleshooting)

---

## Overview

**📁 Main Script**: [`audit-accessibility.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js)

The `audit-accessibility.js` script is a comprehensive accessibility testing tool that:

- **Tests websites against WCAG 2.1 Level AA standards** using axe-core
- **Automatically discovers pages** from `sitemap.xml`
- **Tests multiple viewports** (desktop, tablet, mobile)
- **Tests multiple themes** (if configured)
- **Generates detailed HTML and JSON reports**
- **Verifies skip link implementation**
- **Supports both development and production environments**

### Key Features

✅ **Automated Page Discovery** - Reads URLs from `sitemap.xml`  
✅ **Multi-Viewport Testing** - Tests desktop, tablet, and mobile sizes  
✅ **Multi-Theme Testing** - Tests light/dark themes (if configured)  
✅ **Skip Link Verification** - Validates skip link functionality  
✅ **Dynamic Rule Configuration** - Enable/disable rules via booleans  
✅ **Comprehensive Reporting** - HTML and JSON reports with detailed information  
✅ **Environment Flexibility** - Test against localhost or production  
✅ **Server Auto-Detection** - Automatically detects running servers

---

## Script Purpose & Design

### Core Concept

The script uses **Puppeteer** (headless Chrome) to:

1. Navigate to each page in your sitemap
2. Inject **axe-core** into the page
3. Run accessibility tests against WCAG 2.1 Level AA standards
4. Collect results and generate reports

### Architecture

**📁 Source**: [`audit-accessibility.js`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js)

```
┌─────────────────────────────────────────────────────────────┐
│                    audit-accessibility.js                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Configuration Section (Top of File)                      │
│     - Environment settings (dev/prod)                        │
│       [Lines 54-69](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L54-L69)
│     - Rule configuration (AXE_RULE_CONFIG)                    │
│       [Lines 85-115](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L85-L115)
│     - Viewport definitions                                    │
│       [Lines 133-137](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L133-L137)
│     - Theme configuration                                     │
│       [Lines 145-155](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L145-L155)
│     - Site information                                        │
│       [Lines 188-277](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L188-L277)
│                                                               │
│  2. Core Functions                                           │
│     - runAxeAudit() - Runs axe-core tests                     │
│       [Lines 497-633](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L497-L633)
│     - verifySkipLink() - Validates skip links                 │
│       [Lines 641-720](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L641-L720)
│     - generateHTMLReport() - Creates HTML report              │
│       [Lines 752-2262](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L752-L2262)
│     - runAudit() - Main orchestration function                │
│       [Lines 2280-2838](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2280-L2838)
│                                                               │
│  3. Server Management                                         │
│     - Detects running servers                                 │
│       [Lines 361-383](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L361-L383)
│     - Auto-starts dev server if needed                        │
│       [Lines 388-450](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L388-L450)
│     - Handles server lifecycle                                │
│       [Lines 2280-2400](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2280-L2400)
│                                                               │
│  4. Report Generation                                         │
│     - HTML report with modals                                 │
│       [Lines 752-2262](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L752-L2262)
│     - JSON reports (violations.json, errors.json)            │
│       [Lines 2716-2750](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2716-L2750)
│     - Summary statistics                                      │
│       [Lines 752-900](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L752-L900)
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
sitemap.xml → Parse URLs → For each URL:
  ├─→ For each viewport:
  │   ├─→ For each theme:
  │   │   ├─→ Navigate to page
  │   │   ├─→ Run axe-core audit
  │   │   ├─→ Verify skip link
  │   │   └─→ Collect results
  │   └─→ Aggregate viewport results
  └─→ Aggregate page results
      └─→ Generate HTML + JSON reports
```

---

## Configuration

### Location

All configuration is at the **top of the script** (lines 23-299), clearly marked with:

**📁 Source**: [`audit-accessibility.js` lines 23-299](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L23-L299)

```javascript
/**
 * ============================================================================
 * ⚙️ DEVELOPER CONFIGURATION - EDIT THIS SECTION
 * ============================================================================
 */
```

### Required Configuration

#### 1. Environment Settings

**📁 Source**: [`audit-accessibility.js` lines 54-69](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L54-L69)

```javascript
// Choose development or production
const TARGET_ENV = "development"; // or "production"
const PRODUCTION_URL = "https://your-site.com";
const DEV_SERVER_PORT = 3000;
```

**Development Mode:**

- Tests against `http://localhost:PORT`
- Auto-starts dev server if not running
- Detects server on common ports (3000, 5150, 4173, 3003)

**Production Mode:**

- Tests against `PRODUCTION_URL`
- No server management needed
- Useful for pre-deployment validation

#### 2. File Paths

**📁 Source**: [`audit-accessibility.js` lines 124-126](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L124-L126)

```javascript
const SITEMAP_PATH_CONFIG = "public/sitemap.xml";
const OUTPUT_DIR_CONFIG = "public/docs/accessibility";
const REPORT_FILE_NAME = "index.html";
```

**Important:** These paths are relative to the script's directory (`__dirname`).

#### 3. Viewport Configuration

**📁 Source**: [`audit-accessibility.js` lines 133-137](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L133-L137)

```javascript
const VIEWPORTS = [
  { width: 1920, height: 1080, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
];
```

Each viewport is tested for every URL. Add or modify viewports as needed.

#### 4. Theme Configuration

**📁 Source**: [`audit-accessibility.js` lines 145-155](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L145-L155)

```javascript
const THEME_CONFIG = {
  themes: [{ name: "dark", value: "dark" }],
  switching: {
    mode: "none", // "none", "auto", or "manual"
  },
};
```

**Modes:**

- `"none"` - Single theme (default)
- `"auto"` - Auto-detects Vuetify-style theme toggle
- `"manual"` - Custom theme switching (see script for details)

#### 5. Skip Link Configuration

**📁 Source**: [`audit-accessibility.js` lines 162-165](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L162-L165)

```javascript
const SKIP_LINK_CONFIG = {
  selector: 'a[href="#main-content"], a.skip-link, a[class*="skip"]',
  targetId: "main-content",
};
```

The script verifies skip links are:

- Present on the page
- Keyboard accessible
- Visible when focused
- Target exists

#### 6. Site Information

**📁 Source**: [`audit-accessibility.js` lines 188-277](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L188-L277)

```javascript
const SITE_INFO = {
  name: "Your Site Name",
  description: "Description of your site",
};

const FRAMEWORK_INFO = {
  name: "Your Framework",
  description: "Description of your framework",
  frameworks: [
    {
      name: "Framework Name",
      description: "Framework description",
    },
  ],
};
```

Used in the HTML report for context.

#### 7. Compliance Standards

```javascript
const COMPLIANCE_STANDARDS = [
  {
    name: "WCAG 2.1 Level AA",
    description: "Description...",
    links: [{ text: "Link Text", url: "https://..." }],
  },
];
```

Defines which accessibility standards your site complies with.

---

## Testing Modes

### Development Mode

**When to use:** Testing during development

```javascript
const TARGET_ENV = "development";
```

**Behavior:**

1. Checks for running server on common ports
2. If no server found, starts dev server automatically
3. Tests against `http://localhost:PORT`
4. Waits for server to be ready before testing

**Server Detection:**

- Checks ports: 3000, 5150, 4173, 3003
- Detects Nuxt, Vite, and other common dev servers
- Provides clear error messages if server not found

### Production Mode

**When to use:** Pre-deployment validation

```javascript
const TARGET_ENV = "production";
const PRODUCTION_URL = "https://your-site.com";
```

**Behavior:**

1. Tests against production URL directly
2. No server management
3. Tests live production site
4. Useful for CI/CD pipelines

---

## Viewport Testing

### Default Viewports

The script tests three viewports by default:

1. **Desktop**: 1920x1080
2. **Tablet**: 768x1024
3. **Mobile**: 375x812

### Customizing Viewports

**📁 Source**: [`audit-accessibility.js` lines 133-137](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L133-L137)

```javascript
const VIEWPORTS = [
  { width: 1920, height: 1080, name: "desktop" },
  { width: 1366, height: 768, name: "laptop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
  { width: 320, height: 568, name: "small-mobile" },
];
```

**Usage**: Viewports are used in the [`runAudit()` function](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2280-L2712) to test each page at different screen sizes.

**Important:** Each viewport is tested for **every URL** and **every theme**. This means:

- 3 URLs × 3 viewports × 1 theme = 9 tests
- 3 URLs × 3 viewports × 2 themes = 18 tests

### Viewport Testing Process

For each viewport:

1. Sets browser viewport size
2. Navigates to page
3. Waits for page load
4. Runs accessibility tests
5. Verifies skip link
6. Collects results

---

## Theme Testing

### Single Theme (Default)

**📁 Source**: [`audit-accessibility.js` lines 145-155](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L145-L155)

```javascript
const THEME_CONFIG = {
  themes: [{ name: "dark", value: "dark" }],
  switching: { mode: "none" },
};
```

Tests only one theme. Fastest option.

### Multiple Themes

**📁 Source**: [`audit-accessibility.js` lines 145-155](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L145-L155)

```javascript
const THEME_CONFIG = {
  themes: [
    { name: "light", value: "light" },
    { name: "dark", value: "dark" },
  ],
  switching: {
    mode: "auto", // Auto-detects Vuetify theme toggle
  },
};
```

**Theme Switching Logic**: See [`runAudit()` function](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2280-L2712) for theme switching implementation.

**Auto Mode:**

- Automatically finds theme toggle button
- Switches between themes
- Tests each theme for each viewport

**Manual Mode:**

- Configure custom selectors
- Custom theme switching logic
- See script for implementation details

---

## Rule Configuration

### Dynamic Rule Control

Rules are controlled via **boolean values** in `AXE_RULE_CONFIG`:

```javascript
const AXE_RULE_CONFIG = {
  "aria-allowed-role": true, // Enabled
  region: false, // Disabled
  "css-orientation-lock": true, // Enabled
};
```

### Available Rules

**Framework-Specific:**

- `aria-allowed-role` - ARIA role validation
- `scrollable-region-focusable` - Scrollable region accessibility

**Landmark Rules:**

- `landmark-banner-is-top-level`
- `landmark-contentinfo-is-top-level`
- `landmark-main-is-top-level`
- `landmark-unique`
- `region` - Often disabled for Vue/Nuxt

**WCAG 2.1 Level AA:**

- `css-orientation-lock` - WCAG 2.1 SC 1.3.4
- `no-autoplay-audio` - WCAG 2.1 SC 1.4.2
- `link-in-text-block` - WCAG 2.1 SC 1.4.1

**Focus & Navigation:**

- `focus-order-semantics`
- `identical-links-same-purpose`
- `page-has-heading-one`

**Content & Labeling:**

- `hidden-content`
- `label-content-name-mismatch`
- `presentation-role-conflict`

### Base WCAG Rules

The script also runs **all base WCAG rules** via tags:

- `wcag2a` - WCAG 2.0 Level A
- `wcag2aa` - WCAG 2.0 Level AA
- `wcag21a` - WCAG 2.1 Level A
- `wcag21aa` - WCAG 2.1 Level AA
- `best-practice` - Best practice rules

These are **always enabled** and cannot be disabled.

### Rule Status in Report

The HTML report shows:

- ✅ **Enabled Rules** - List of all enabled rules with descriptions
- ❌ **Disabled Rules** - List of disabled rules with explanations
- Clickable links to view detailed rule information

---

## Report Generation

### HTML Report

**Location:** `public/docs/accessibility/index.html`

**Contents:**

- Summary statistics (total pages, violations, passes)
- Violation breakdown by impact level
- Per-page results table
- Detailed violation information
- Rule configuration status
- Skip link verification results
- Information about axe-core and WCAG

**Features:**

- Dark-themed, accessible design
- Clickable page URLs (open in new tabs)
- Expandable violation details
- Modal windows for additional information
- Responsive layout

### JSON Reports

**Files Generated:**

- `violations.json` - All violations found
- `errors.json` - Same as violations.json (for compatibility)

**Format:**

```json
[
  {
    "url": "/",
    "viewport": "desktop",
    "theme": "dark",
    "violations": [
      {
        "id": "color-contrast",
        "description": "Ensures sufficient color contrast",
        "impact": "serious",
        "nodes": [...]
      }
    ]
  }
]
```

### Report Access

After generation:

- **Local:** `http://localhost:3000/docs/accessibility`
- **Production:** `https://your-site.com/docs/accessibility`

---

## Modal Windows

The HTML report includes several modal windows for additional information:

### 1. Configured Rules Modal

**Trigger:** Click "Enabled Rules" or "Disabled Rules" links in summary

**Content:**

- List of all enabled rules with descriptions
- List of all disabled rules with explanations
- Instructions for toggling rules
- Framework compatibility information

**Purpose:** Help users understand which rules are active and why some may be disabled.

### 2. Tests Performed Modal

**Trigger:** Click "Total Tests Run" number in summary

**Content:**

- Explanation of how test count is calculated
- List of all WCAG rules tested
- List of best practice rules
- List of experimental rules (if any)

**Purpose:** Transparency about what tests were performed.

### 3. Environment Modal

**Trigger:** Click environment indicator (Development/Production)

**Content:**

- Explanation of development vs production testing
- Base URL information
- Testing methodology

**Purpose:** Clarify which environment was tested.

### 4. Skip Links Modal

**Trigger:** Click skip link information in summary

**Content:**

- What skip links are
- Why they're important
- WCAG compliance requirements
- Implementation details

**Purpose:** Educate about skip link accessibility requirements.

### Modal Features

- **Keyboard Accessible:** All modals can be opened/closed with keyboard
- **Escape Key:** Closes any open modal
- **Click Outside:** Closes modal when clicking backdrop
- **Focus Management:** Proper focus trapping and restoration
- **ARIA Labels:** Proper ARIA attributes for screen readers

---

## Reusing This Script

### Quick Start for New Projects

1. **Copy the script** to your project root
2. **Install dependencies:**

   ```bash
   npm install --save-dev puppeteer axe-core
   ```

3. **Update configuration** (top of script):

   ```javascript
   // Environment
   const TARGET_ENV = "development";
   const PRODUCTION_URL = "https://your-site.com";
   const DEV_SERVER_PORT = 3000;

   // File paths
   const SITEMAP_PATH_CONFIG = "public/sitemap.xml";
   const OUTPUT_DIR_CONFIG = "public/docs/accessibility";

   // Site info
   const SITE_INFO = {
     name: "Your Site Name",
     description: "Your site description",
   };

   // Framework info
   const FRAMEWORK_INFO = {
     name: "Your Framework",
     description: "Framework description",
     frameworks: [...],
   };

   // Compliance standards
   const COMPLIANCE_STANDARDS = [...];
   ```

4. **Ensure sitemap.xml exists:**
   - Script automatically reads URLs from `public/sitemap.xml`
   - Sitemap should be in standard XML format
   - URLs should be absolute or relative to base URL

5. **Add npm script:**

   ```json
   {
     "scripts": {
       "audit:a11y": "node audit-accessibility.js"
     }
   }
   ```

6. **Run the script:**
   ```bash
   npm run audit:a11y
   ```

### Sitemap Requirements

The script expects a standard XML sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/about</loc>
  </url>
</urlset>
```

**URL Format:**

- Absolute URLs (https://...) - Used as-is
- Relative URLs (/about) - Combined with base URL

### Customization Points

**1. Rule Configuration:**

- Enable/disable rules via `AXE_RULE_CONFIG`
- Add rule descriptions to `ruleDescriptions` object
- Modify rule explanations in modal content

**2. Viewports:**

- Add/remove viewports in `VIEWPORTS` array
- Adjust dimensions as needed

**3. Themes:**

- Configure theme switching in `THEME_CONFIG`
- Add theme detection logic if needed

**4. Skip Links:**

- Update `SKIP_LINK_CONFIG` selector
- Modify skip link verification logic

**5. Exclusions:**

- Add selectors to `AXE_EXCLUDE_SELECTORS`
- Exclude framework-specific wrapper elements

**6. Report Styling:**

- Modify CSS in `generateHTMLReport()` function
- Update report structure and layout
- Add custom sections as needed

### Framework-Specific Notes

**Nuxt/Vue:**

- `region` rule often disabled (component structure conflicts)
- May need to exclude `#__nuxt` wrapper
- Theme switching may need custom logic

**React:**

- May need to exclude `#root` wrapper
- Theme switching typically via CSS classes
- Component structure may affect landmark rules

**Other Frameworks:**

- Adjust exclusions based on framework structure
- Update theme switching logic
- Test rule compatibility

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find sitemap.xml"

**Solution:**

- Ensure `sitemap.xml` exists at configured path
- Check path is relative to script directory
- Verify file permissions

#### 2. "Server not detected"

**Solution:**

- Start server manually before running script
- Check `DEV_SERVER_PORT` matches your server port
- Verify server is accessible at `http://localhost:PORT`

#### 3. "Puppeteer browser launch failed"

**Solution:**

- Ensure Puppeteer dependencies are installed
- Check system has required dependencies
- Try updating Puppeteer: `npm update puppeteer`

#### 4. "Timeout waiting for page load"

**Solution:**

- Increase timeout in script
- Check page load performance
- Verify network connectivity

#### 5. "Skip link not found"

**Solution:**

- Update `SKIP_LINK_CONFIG.selector`
- Verify skip link exists on pages
- Check selector matches your implementation

#### 6. "Theme switching not working"

**Solution:**

- Verify theme toggle selector
- Check theme switching mode (`auto` vs `manual`)
- Test theme switching manually in browser

### Debug Mode

Add console logging to debug issues:

```javascript
// In runAxeAudit function
console.log("Testing URL:", url);
console.log("Viewport:", viewport);
console.log("Theme:", theme);
```

### Performance Tips

1. **Reduce viewports** for faster testing during development
2. **Test single theme** if multiple themes aren't needed
3. **Exclude unnecessary pages** from sitemap
4. **Run in production mode** for final validation only

---

## Challenges & Solutions

This section documents real challenges encountered during development and how they were solved. This information is valuable for developers and LLMs working with or extending the script.

### Challenge 1: Dynamic Rule Configuration

**Problem:**  
Initially, rules were hardcoded in the `runAxeAudit()` function. Adding or removing rules required modifying the function code, making it difficult to maintain and reuse.

**Solution:**  
Created a dynamic rule configuration system using `AXE_RULE_CONFIG` object with boolean values. Rules are now processed in a loop, making the script easily configurable.

**📁 Implementation**: [`audit-accessibility.js` lines 509-515`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L509-L515)

```javascript
// Dynamically apply all rules from ruleConfig
// Each rule in AXE_RULE_CONFIG is a boolean that controls whether it's enabled
for (const [ruleName, enabled] of Object.entries(ruleConfig)) {
  if (typeof enabled === "boolean") {
    rulesConfig[ruleName] = { enabled: enabled };
  }
}
```

**Benefits:**

- Rules can be toggled without modifying function code
- Configuration is clearly separated at the top of the file
- Easy to document why rules are enabled/disabled
- Script is reusable across different projects

---

### Challenge 2: ES Module Path Resolution

**Problem:**  
The script uses ES modules (`import`/`export`), but `__dirname` and `__filename` are not available in ES modules. This caused issues when constructing file paths for sitemap and output directories.

**Solution:**  
Used `fileURLToPath` and `import.meta.url` to get the current file's directory, then constructed paths relative to that.

**📁 Implementation**: [`audit-accessibility.js` lines 327-333`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L327-L333)

```javascript
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct file paths from configuration
const SITEMAP_PATH = path.join(__dirname, ...SITEMAP_PATH_CONFIG.split("/"));
const OUTPUT_DIR = path.join(__dirname, ...OUTPUT_DIR_CONFIG.split("/"));
```

**Key Learning:**  
ES modules require different path resolution than CommonJS. Always use `import.meta.url` for file location in ES modules.

---

### Challenge 3: Server Detection and Auto-Start

**Problem:**  
The script needs to test against a running server, but users might forget to start it. Manual server management was error-prone and slowed down the workflow.

**Solution:**  
Implemented automatic server detection across common ports (3000, 5150, 4173, 3003) and auto-start functionality for development mode.

**📁 Implementation**:

- **Detection**: [`audit-accessibility.js` lines 361-383`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L361-L383)
- **Auto-start**: [`audit-accessibility.js` lines 388-450`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L388-L450)

```javascript
async function checkServer() {
  return new Promise((resolve) => {
    const url = new URL(BASE_URL);
    const client = url.protocol === "https:" ? https : http;

    const req = client.get(BASE_URL, (res) => {
      resolve(
        res.statusCode === 200 ||
          res.statusCode === 301 ||
          res.statusCode === 302
      );
    });

    req.on("error", () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}
```

**Key Features:**

- Checks multiple common ports
- Handles both HTTP and HTTPS
- 5-second timeout to avoid hanging
- Auto-starts dev server if not found (development mode only)
- Provides clear error messages if server not found

---

### Challenge 4: Sitemap URL Normalization

**Problem:**  
Sitemaps can contain absolute URLs (https://example.com/page) or relative URLs (/page). The script needed to handle both formats correctly, especially when testing against different environments (dev vs production).

**Solution:**  
Implemented URL normalization that:

1. Uses absolute URLs as-is
2. Combines relative URLs with the base URL
3. Handles both development and production environments

**📁 Implementation**: [`audit-accessibility.js` lines 461-492`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L461-L492)

```javascript
async function parseSitemap() {
  // ... parsing logic ...

  // Normalize URLs - handle both absolute and relative
  const urls = sitemapData.urlset.url.map((urlEntry) => {
    const loc = urlEntry.loc[0];
    if (loc.startsWith("http://") || loc.startsWith("https://")) {
      // Absolute URL - use as-is
      return loc;
    } else {
      // Relative URL - combine with base URL
      return new URL(loc, BASE_URL).href;
    }
  });
}
```

**Key Learning:**  
Always normalize URLs from sitemaps to handle different formats and environments consistently.

---

### Challenge 5: Puppeteer and axe-core Integration

**Problem:**  
axe-core needs to run in the browser context, but the script runs in Node.js. Passing configuration from Node.js to the browser context was complex, especially for dynamic rule configuration.

**Solution:**  
Used Puppeteer's `page.evaluate()` to inject axe-core and pass configuration as arguments. This allows the Node.js script to control what runs in the browser.

**📁 Implementation**: [`audit-accessibility.js` lines 497-558`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L497-L558)

```javascript
async function runAxeAudit(page) {
  await page.addScriptTag({ content: axeCore.source });

  // Pass configuration into browser context
  return await page.evaluate(
    async (ruleConfig, excludeSelectors) => {
      // Build rules object dynamically
      const rulesConfig = {};
      for (const [ruleName, enabled] of Object.entries(ruleConfig)) {
        if (typeof enabled === "boolean") {
          rulesConfig[ruleName] = { enabled: enabled };
        }
      }

      return await axe.run({
        exclude: excludeSelectors,
        rules: rulesConfig,
        tags: tags,
      });
    },
    AXE_RULE_CONFIG, // Passed as argument
    AXE_EXCLUDE_SELECTORS // Passed as argument
  );
}
```

**Key Learning:**  
`page.evaluate()` serializes arguments, so only serializable data can be passed. Functions and complex objects need to be handled differently.

---

### Challenge 6: Skip Link Verification Complexity

**Problem:**  
Skip links need multiple checks:

- Presence on page
- Correct href target
- Target element exists
- Keyboard accessibility
- Focus visibility

Implementing all checks in Puppeteer's browser context was challenging.

**Solution:**  
Created a comprehensive `verifySkipLink()` function that runs all checks in the browser context using `page.evaluate()`. The function returns a detailed object with all verification results.

**📁 Implementation**: [`audit-accessibility.js` lines 566-720`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L566-L720)

```javascript
async function verifySkipLink(page) {
  return await page.evaluate((skipLinkConfig) => {
    const issues = [];
    let exists = false;
    let hasTarget = false;
    let keyboardAccessible = false;
    let visibleOnFocus = false;

    // Find skip link
    const skipLink = document.querySelector(skipLinkConfig.selector);
    if (!skipLink) {
      issues.push("Skip link not found on page");
      return { exists, hasTarget, keyboardAccessible, visibleOnFocus, issues };
    }

    exists = true;

    // Check href
    const href = skipLink.getAttribute("href");
    const targetId = `#${skipLinkConfig.targetId}`;
    if (href === targetId) {
      hasTarget = true;
    } else {
      issues.push(`Skip link href is "${href}" but should be "${targetId}"`);
    }

    // Check target exists
    const mainContent = document.getElementById(skipLinkConfig.targetId);
    if (!mainContent) {
      issues.push(`Skip link target (${targetId}) not found on page`);
      hasTarget = false;
    }

    // Check keyboard accessibility
    const skipLinkTabIndex = skipLink.getAttribute("tabindex");
    if (skipLinkTabIndex === "-1") {
      issues.push("Skip link has tabindex='-1' which prevents keyboard access");
    } else {
      keyboardAccessible = true;
    }

    // Check focus visibility (simplified - checks CSS positioning)
    const computedStyle = window.getComputedStyle(skipLink);
    const isOffScreen =
      computedStyle.position === "absolute" &&
      (computedStyle.top === "-100px" || computedStyle.top.includes("-100"));

    if (isOffScreen || parseInt(computedStyle.zIndex) > 1000) {
      visibleOnFocus = true; // Assume visible when focused if properly positioned
    }

    return { exists, hasTarget, keyboardAccessible, visibleOnFocus, issues };
  }, SKIP_LINK_CONFIG);
}
```

**Key Learning:**  
Complex verification logic is easier to implement in the browser context where you have full DOM and CSS access. Use `page.evaluate()` for browser-side logic.

---

### Challenge 7: Framework-Specific Rule Conflicts

**Problem:**  
Some axe-core rules conflict with Vue/Nuxt component structure. For example, the `region` rule expects HTML5 landmark structure, but Vue components dynamically create regions that don't match this pattern, causing false positives.

**Solution:**  
Created a framework-aware configuration system that:

1. Documents which rules conflict with which frameworks
2. Allows rules to be disabled via boolean configuration
3. Explains why rules are disabled in the report
4. Provides rule descriptions for transparency

**📁 Implementation**:

- **Configuration**: [`audit-accessibility.js` lines 85-115`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L85-L115)
- **Rule Descriptions**: [`audit-accessibility.js` lines 903-920`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L903-L920)

```javascript
const AXE_RULE_CONFIG = {
  // ... other rules ...

  // ❌ DISABLED: Known incompatibility with Nuxt/Vue component structure
  // The 'region' rule has issues with Vue/Nuxt because components dynamically create
  // regions that don't match the expected HTML5 landmark structure
  region: false,
};
```

**Key Learning:**  
Not all accessibility rules work with all frameworks. Document framework-specific conflicts and provide clear explanations for why rules are disabled.

---

### Challenge 8: Multi-Viewport and Multi-Theme Testing Coordination

**Problem:**  
The script needs to test each URL in multiple viewports and multiple themes. The nested loop structure (URLs × viewports × themes) was complex to manage, and results needed to be properly aggregated.

**Solution:**  
Implemented a clear nested loop structure with proper result aggregation. Each combination (URL + viewport + theme) is tested independently, and results are collected in a structured format.

**📁 Implementation**: [`audit-accessibility.js` lines 2280-2712`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2280-L2712)

```javascript
for (const url of urls) {
  for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
      // Set viewport
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
      });

      // Navigate to page
      await page.goto(url, { waitUntil: "networkidle0" });

      // Switch theme if needed
      if (THEME_CONFIG.switching.mode === "auto") {
        // Auto-detect and switch theme
      }

      // Run audit
      const axeResults = await runAxeAudit(page);
      const skipLinkResults = await verifySkipLink(page);

      // Collect results
      results.push({
        url,
        viewport: viewport.name,
        theme: theme.name,
        violations: axeResults.violations,
        passes: axeResults.passes,
        // ... other results
      });
    }
  }
}
```

**Key Learning:**  
Nested loops for multi-dimensional testing require careful result tracking. Use structured objects to maintain context (URL, viewport, theme) for each test result.

---

### Challenge 9: HTML Report Generation with Modals

**Problem:**  
The HTML report needed to be comprehensive but also accessible. Including all information inline would create a very long page. Modal windows were needed for additional context, but they needed to be keyboard accessible and properly integrated.

**Solution:**  
Created a single-page HTML report with:

1. Summary statistics at the top
2. Detailed tables for results
3. Modal windows for additional information
4. Proper ARIA attributes for accessibility
5. Keyboard navigation support (Escape to close, click outside to close)

**📁 Implementation**:

- **Report Generation**: [`audit-accessibility.js` lines 752-2262`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L752-L2262)
- **Modal JavaScript**: [`audit-accessibility.js` lines 2080-2200`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L2080-L2200)

**Key Features:**

- Modals are keyboard accessible
- Escape key closes modals
- Click outside modal closes it
- Focus management (focus returns to trigger after closing)
- ARIA labels and roles for screen readers

**Key Learning:**  
Even accessibility reports need to be accessible! Always include keyboard navigation, ARIA attributes, and proper focus management in interactive elements.

---

### Challenge 10: Rule Status Display in Report

**Problem:**  
Users needed to see which rules were enabled/disabled, but this information needed to be:

1. Dynamically read from configuration
2. Displayed clearly in the report
3. Explained with context (why rules are disabled)

**Solution:**  
Created a `ruleDescriptions` object and `configuredRulesStatus` that dynamically reads from `AXE_RULE_CONFIG`. The report shows enabled/disabled rules with descriptions and explanations.

**📁 Implementation**:

- **Rule Status**: [`audit-accessibility.js` lines 891-900`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L891-L900)
- **Rule Descriptions**: [`audit-accessibility.js` lines 903-920`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L903-L920)
- **Report Display**: [`audit-accessibility.js` lines 1881-1924`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L1881-L1924)

```javascript
// Get list of enabled/disabled configured rules for reporting
const configuredRulesStatus = {
  enabled: Object.entries(AXE_RULE_CONFIG)
    .filter(([rule, enabled]) => enabled)
    .map(([rule]) => rule),
  disabled: Object.entries(AXE_RULE_CONFIG)
    .filter(([rule, enabled]) => !enabled)
    .map(([rule]) => rule),
};

// Rule descriptions for display in report
const ruleDescriptions = {
  "aria-allowed-role":
    "Ensures ARIA roles are used correctly and are allowed for the element",
  region:
    "Ensures all content is contained by a landmark region (disabled for Nuxt/Vue compatibility)",
  // ... more descriptions
};
```

**Key Learning:**  
Configuration should be self-documenting. Display configuration state in reports so users understand what was tested and why.

---

### Challenge 11: File Path Construction with ES Modules

**Problem:**  
Configuration uses relative paths (e.g., `"public/sitemap.xml"`), but these need to be resolved relative to the script's location, not the current working directory. This was especially tricky with ES modules.

**Solution:**  
Split the path string and use `path.join()` with `__dirname` to construct absolute paths correctly.

**📁 Implementation**: [`audit-accessibility.js` lines 330-333`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L330-L333)

```javascript
// Construct file paths from configuration
const SITEMAP_PATH = path.join(__dirname, ...SITEMAP_PATH_CONFIG.split("/"));
const OUTPUT_DIR = path.join(__dirname, ...OUTPUT_DIR_CONFIG.split("/"));
const REPORT_FILE = path.join(OUTPUT_DIR, REPORT_FILE_NAME);
```

**Key Learning:**  
When using relative paths in configuration, always resolve them relative to the script's location, not the current working directory. This ensures the script works regardless of where it's executed from.

---

### Challenge 12: axe-core Version Detection

**Problem:**  
The report should display the axe-core version, but hardcoding it would require manual updates. The version should be read from `package.json` automatically.

**Solution:**  
Read the version from `package.json` at runtime, with a fallback to a default value if reading fails.

**📁 Implementation**: [`audit-accessibility.js` lines 335-347`](https://github.com/ICJIA/icjia-accessibility-portal/blob/main/audit-accessibility.js#L335-L347)

```javascript
// Read axe-core version from package.json
let AXE_VERSION = AXE_VERSION_DEFAULT;
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
  );
  AXE_VERSION =
    packageJson.devDependencies?.["axe-core"]?.replace(/[\^~]/, "") ||
    packageJson.dependencies?.["axe-core"]?.replace(/[\^~]/, "") ||
    AXE_VERSION_DEFAULT;
} catch (e) {
  // Use fallback
}
```

**Key Learning:**  
Always provide fallback values when reading configuration from external files. This prevents the script from breaking if the file is missing or malformed.

---

## Best Practices

### 1. Regular Audits

Run audits regularly:

- After major changes
- Before releases
- During development sprints
- After dependency updates

### 2. Rule Management

- Start with all rules enabled
- Disable only rules that cause false positives
- Document why rules are disabled
- Re-test disabled rules periodically

### 3. Report Review

- Review HTML report for patterns
- Check JSON reports for automation
- Share reports with team
- Track violations over time

### 4. CI/CD Integration

```yaml
# Example GitHub Actions
- name: Run Accessibility Audit
  run: npm run audit:a11y
  continue-on-error: true
```

### 5. Documentation

- Document rule configuration decisions
- Keep compliance standards updated
- Update framework information
- Maintain troubleshooting notes

---

## Additional Resources

- **axe-core Documentation:** https://github.com/dequelabs/axe-core
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Puppeteer Documentation:** https://pptr.dev/
- **Sitemap Protocol:** https://www.sitemaps.org/protocol.html

---

## Support

For issues or questions:

1. Check troubleshooting section
2. Review script comments
3. Check axe-core documentation
4. Review WCAG guidelines

---

**Last Updated:** January 2026  
**Maintained by:** ICJIA Development Team
