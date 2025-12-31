# Configuration Abstraction Guide

This document identifies all site-specific values in `audit-accessibility.js` that should be moved to the developer configuration section.

## Values to Add to Developer Configuration Section

### 1. File Paths Configuration

**Current Location:** Lines 138-140  
**Current Values:**

```javascript
const SITEMAP_PATH = path.join(__dirname, "public", "sitemap.xml");
const OUTPUT_DIR = path.join(__dirname, "public", "docs", "accessibility");
const REPORT_FILE = path.join(OUTPUT_DIR, "index.html");
```

**Proposed Configuration:**

```javascript
/**
 * File Paths Configuration
 *
 * Configure where the script should look for the sitemap and where to save reports.
 * All paths are relative to the script's directory (__dirname).
 */
const SITEMAP_PATH = path.join(__dirname, "public", "sitemap.xml"); // Default: "public/sitemap.xml"
const OUTPUT_DIR = path.join(__dirname, "public", "docs", "accessibility"); // Default: "public/docs/accessibility"
const REPORT_FILE = path.join(OUTPUT_DIR, "index.html"); // Default: "index.html" (inside OUTPUT_DIR)
```

---

### 2. Viewport Configuration

**Current Location:** Lines 142-146  
**Current Values:**

```javascript
const VIEWPORTS = [
  { width: 1920, height: 1080, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
];
```

**Proposed Configuration:**

```javascript
/**
 * Viewport Configuration
 *
 * Define the viewport sizes to test. Each viewport will be tested for every URL.
 *
 * @example
 * // To test only desktop:
 * const VIEWPORTS = [{ width: 1920, height: 1080, name: "desktop" }];
 *
 * // To add a custom viewport:
 * const VIEWPORTS = [
 *   { width: 1920, height: 1080, name: "desktop" },
 *   { width: 1440, height: 900, name: "laptop" },
 * ];
 */
const VIEWPORTS = [
  { width: 1920, height: 1080, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
];
```

---

### 3. Theme Configuration

**Current Location:** Lines 148-150, 2045  
**Current Values:**

```javascript
const THEMES = [{ name: "dark", value: "dark" }];
// No theme switching needed - site is permanently dark mode
```

**Proposed Configuration:**

```javascript
/**
 * Theme Configuration
 *
 * Configure which themes to test and how to switch between them.
 * The script will automatically detect theme switching mechanisms, or you can configure them manually.
 *
 * @property {Array<{name: string, value: string}>} themes - List of themes to test
 * @property {Object} switching - Configuration for theme switching
 * @property {string} switching.mode - "auto" (detect automatically) or "manual" (use provided selectors)
 * @property {string} switching.toggleSelector - CSS selector for theme toggle element (for manual mode)
 * @property {string} switching.darkClass - CSS class added to body/html when dark theme is active
 * @property {string} switching.lightClass - CSS class added to body/html when light theme is active (optional)
 * @property {string} switching.localStorageKey - localStorage key for theme preference (optional, for manual mode)
 *
 * @example
 * // For a site with only dark mode (no switching):
 * const THEME_CONFIG = {
 *   themes: [{ name: "dark", value: "dark" }],
 *   switching: {
 *     mode: "none", // No theme switching
 *   },
 * };
 *
 * @example
 * // For a site with dark/light theme switching (automatic detection):
 * const THEME_CONFIG = {
 *   themes: [
 *     { name: "dark", value: "dark" },
 *     { name: "light", value: "light" },
 *   ],
 *   switching: {
 *     mode: "auto", // Automatically detect theme toggle switch
 *   },
 * };
 *
 * @example
 * // For a site with dark/light theme switching (manual configuration):
 * const THEME_CONFIG = {
 *   themes: [
 *     { name: "dark", value: "dark" },
 *     { name: "light", value: "light" },
 *   ],
 *   switching: {
 *     mode: "manual",
 *     toggleSelector: 'input[type="checkbox"][role="switch"]', // Vuetify theme switch
 *     darkClass: "v-theme--dark", // Class added to body when dark theme is active
 *     localStorageKey: "theme", // Optional: localStorage key for theme
 *   },
 * };
 *
 * @example
 * // For a site with custom theme switching:
 * const THEME_CONFIG = {
 *   themes: [
 *     { name: "dark", value: "dark" },
 *     { name: "light", value: "light" },
 *   ],
 *   switching: {
 *     mode: "manual",
 *     toggleSelector: "#theme-toggle-button", // Custom toggle button
 *     darkClass: "dark-mode",
 *     lightClass: "light-mode",
 *     localStorageKey: "app-theme",
 *   },
 * };
 */
const THEME_CONFIG = {
  themes: [{ name: "dark", value: "dark" }], // Default: dark mode only
  switching: {
    mode: "none", // Default: no theme switching (single theme site)
  },
};
```

**Code Changes Required:**

- Line 150: Replace `THEMES` constant with `THEME_CONFIG.themes`
- Line 2045: Replace "No theme switching needed" comment with theme switching logic
- Add theme switching function that:
  1. If `mode === "none"`: Skip theme switching (current behavior)
  2. If `mode === "auto"`: Automatically detect theme toggle (like [ipsumify script](https://raw.githubusercontent.com/ICJIA/ipsumify-2025/refs/heads/main/scripts/accessibility-audit.mjs))
     - Look for `input[type="checkbox"][role="switch"]` (Vuetify pattern)
     - Check current theme state via body classes (e.g., `document.body.classList.contains("v-theme--dark")`)
     - Click toggle if needed to switch to target theme
     - Wait for theme transition (500-800ms)
     - Fallback to localStorage and body class manipulation if toggle not found
  3. If `mode === "manual"`: Use provided selectors and configuration
     - Use `toggleSelector` to find toggle element
     - Use `darkClass`/`lightClass` to check current state
     - Use `localStorageKey` if provided
     - Click toggle or manipulate classes/localStorage as needed
- Update report generation to use `THEME_CONFIG.themes` instead of `THEMES`
- Update all references to `THEMES.length` to use `THEME_CONFIG.themes.length`

**Implementation Reference:**

The automatic theme switching logic should follow the pattern from the [ipsumify accessibility audit script](https://raw.githubusercontent.com/ICJIA/ipsumify-2025/refs/heads/main/scripts/accessibility-audit.mjs), which includes:

```javascript
// Set theme before testing by clicking the theme toggle switch
await page.evaluate(async (themeValue) => {
  // Find the theme toggle switch
  const themeSwitch = document.querySelector(
    'input[type="checkbox"][role="switch"]'
  );
  if (themeSwitch) {
    // Check current theme state
    const currentIsDark = document.body.classList.contains("v-theme--dark");
    const targetIsDark = themeValue === "dark";

    // Only toggle if needed
    if (currentIsDark !== targetIsDark) {
      themeSwitch.click();
      // Wait for theme transition
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  } else {
    // Fallback: try to set via localStorage and force a reload
    localStorage.setItem("theme", themeValue);
    // Force theme by manipulating body class
    if (themeValue === "dark") {
      document.body.classList.add("v-theme--dark");
    } else {
      document.body.classList.remove("v-theme--dark");
    }
  }
}, theme.value);

// Wait for theme to apply and any transitions
await new Promise((resolve) => setTimeout(resolve, 800));
```

---

### 4. Skip Link Configuration

**Current Location:** Lines 434-436, 447, 454, 470  
**Current Values:**

- Skip link selector: `'a[href="#main-content"], a.skip-link, a[class*="skip"]'`
- Skip link target: `"#main-content"`

**Proposed Configuration:**

```javascript
/**
 * Skip Link Configuration
 *
 * Configure how the script should detect and verify skip links on your site.
 *
 * @property {string} selector - CSS selector to find the skip link element
 * @property {string} targetId - The ID of the element the skip link should target (without the #)
 *
 * @example
 * // For a skip link targeting #main-content:
 * const SKIP_LINK_CONFIG = {
 *   selector: 'a[href="#main-content"], a.skip-link, a[class*="skip"]',
 *   targetId: "main-content",
 * };
 *
 * // For a skip link targeting #content:
 * const SKIP_LINK_CONFIG = {
 *   selector: 'a[href="#content"]',
 *   targetId: "content",
 * };
 */
const SKIP_LINK_CONFIG = {
  selector: 'a[href="#main-content"], a.skip-link, a[class*="skip"]',
  targetId: "main-content", // Without the # symbol
};
```

**Code Changes Required:**

- Line 434-436: Use `SKIP_LINK_CONFIG.selector`
- Line 447: Use `SKIP_LINK_CONFIG.targetId` (with # prefix)
- Line 454: Use `SKIP_LINK_CONFIG.targetId` (with # prefix)
- Line 450, 456, 470: Update error messages to use `SKIP_LINK_CONFIG.targetId`

---

### 5. Axe Exclude Selectors

**Current Location:** Line 411  
**Current Values:**

```javascript
exclude: [
  ["#__nuxt"], // Exclude Nuxt root container - it's a framework wrapper
],
```

**Proposed Configuration:**

```javascript
/**
 * Axe Exclude Selectors
 *
 * CSS selectors for elements that should be excluded from accessibility testing.
 * These are typically framework-specific wrapper elements that don't need to be tested.
 *
 * @example
 * // For Nuxt applications:
 * const AXE_EXCLUDE_SELECTORS = [["#__nuxt"]];
 *
 * // For React applications:
 * const AXE_EXCLUDE_SELECTORS = [["#root"]];
 *
 * // For multiple exclusions:
 * const AXE_EXCLUDE_SELECTORS = [["#__nuxt"], ["#some-other-wrapper"]];
 *
 * // For no exclusions:
 * const AXE_EXCLUDE_SELECTORS = [];
 */
const AXE_EXCLUDE_SELECTORS = [["#__nuxt"]]; // Default: Nuxt root container
```

**Code Changes Required:**

- Line 410-412: Replace hardcoded exclude array with `AXE_EXCLUDE_SELECTORS`

---

### 6. Dev Server Command

**Current Location:** Line 185  
**Current Values:**

```javascript
const devServer = spawn("npm", ["run", "dev"], {
```

**Proposed Configuration:**

```javascript
/**
 * Development Server Command
 *
 * The command to start the development server. This is used when TARGET_ENV is "development"
 * and the server is not already running.
 *
 * @example
 * // For npm:
 * const DEV_SERVER_COMMAND = { command: "npm", args: ["run", "dev"] };
 *
 * // For yarn:
 * const DEV_SERVER_COMMAND = { command: "yarn", args: ["dev"] };
 *
 * // For pnpm:
 * const DEV_SERVER_COMMAND = { command: "pnpm", args: ["dev"] };
 *
 * // For custom command:
 * const DEV_SERVER_COMMAND = { command: "node", args: ["server.js"] };
 */
const DEV_SERVER_COMMAND = { command: "npm", args: ["run", "dev"] }; // Default: npm run dev
```

**Code Changes Required:**

- Line 185: Replace `spawn("npm", ["run", "dev"],` with `spawn(DEV_SERVER_COMMAND.command, DEV_SERVER_COMMAND.args,`

---

### 7. Error Overlay Detection

**Current Location:** Lines 2048-2062  
**Current Values:**

- Checks for `vite-error-overlay` element
- Checks for Vite-specific error messages

**Decision: Keep Hardcoded (No Configuration Needed)**

The Vite error overlay detection should remain hardcoded as-is. This is a safety check that prevents running accessibility audits on broken pages. If a Vite error overlay is detected, the script should exit with a clear error message indicating that the application has errors that must be fixed before running the audit.

**Rationale:**

- This is a safety check, not a site-specific feature
- If there's an error overlay, the app is broken and needs fixing before auditing
- The current implementation already handles this correctly (throws error and exits)
- No need to make this configurable - it's a universal check that applies to all Vite-based applications

**Code Changes Required:**

- None - keep the current hardcoded Vite error overlay detection as-is
- The current error message is clear: "Application has errors - Vite error overlay detected. Please fix app errors first."

---

### 8. Site Information (for HTML Report)

**Current Location:** Multiple locations in HTML generation (lines 746, 1200, etc.)  
**Current Values:**

- Site name: Not explicitly set (uses generic "Accessibility Audit Report")
- Site description: Not set

**Proposed Configuration:**

```javascript
/**
 * Site Information Configuration
 *
 * Information about your site for display in the HTML report.
 *
 * @property {string} name - The name of your website/application
 * @property {string} description - Brief description of your site (optional, for report header)
 */
const SITE_INFO = {
  name: "ICJIA Accessibility Portal", // Default: Generic name
  description:
    "Accessibility compliance portal for Illinois Criminal Justice Information Authority", // Optional
};
```

**Code Changes Required:**

- Line 746: Use `SITE_INFO.name` in title
- Line 1200: Use `SITE_INFO.name` in h1
- Add description to meta section if provided

---

### 9. Compliance Standards Configuration

**Current Location:** Lines 1328-1354  
**Current Values:**

- Hardcoded IITAA (Illinois-specific) standards
- Generic WCAG 2.1 AA and ADA Title II

**Proposed Configuration:**

```javascript
/**
 * Compliance Standards Configuration
 *
 * Define which accessibility standards your site needs to comply with.
 * This information is displayed in the HTML report.
 *
 * @property {Array<{name: string, description: string, links: Array<{text: string, url: string}>}>} standards
 *
 * @example
 * // For Illinois state websites (IITAA):
 * const COMPLIANCE_STANDARDS = [
 *   {
 *     name: "IITAA Accessibility Standards for Illinois",
 *     description: "The Illinois Information Technology Accessibility (IITAA) standards require that all state websites and digital services be accessible to individuals with disabilities. These standards align with WCAG 2.1 Level AA and Section 508 requirements.",
 *     links: [
 *       { text: "IITAA Standards Documentation", url: "https://doit.illinois.gov/initiatives/accessibility/iitaa.html" },
 *       { text: "IITAA Accessibility Requirements", url: "https://doit.illinois.gov/initiatives/accessibility/iitaa.html" },
 *     ],
 *   },
 *   {
 *     name: "WCAG 2.1 Level AA Guidelines",
 *     description: "The Web Content Accessibility Guidelines (WCAG) 2.1 Level AA are internationally recognized standards for web accessibility.",
 *     links: [
 *       { text: "WCAG 2.1 Quick Reference", url: "https://www.w3.org/WAI/WCAG21/quickref/" },
 *       { text: "Understanding WCAG 2.1", url: "https://www.w3.org/WAI/WCAG21/Understanding/" },
 *     ],
 *   },
 *   {
 *     name: "ADA Title II Requirements",
 *     description: "Americans with Disabilities Act (ADA) Title II requires that state and local governments ensure their services, programs, and activities are accessible to people with disabilities.",
 *     links: [
 *       { text: "ADA Title II Overview", url: "https://www.ada.gov/topics/ada-state-and-local-governments/" },
 *     ],
 *   },
 * ];
 *
 * // For federal websites (Section 508):
 * const COMPLIANCE_STANDARDS = [
 *   {
 *     name: "Section 508 Standards",
 *     description: "Section 508 requires federal agencies to make their electronic and information technology accessible to people with disabilities.",
 *     links: [
 *       { text: "Section 508.gov", url: "https://www.section508.gov/" },
 *     ],
 *   },
 * ];
 *
 * // For general WCAG compliance:
 * const COMPLIANCE_STANDARDS = [
 *   {
 *     name: "WCAG 2.1 Level AA Guidelines",
 *     description: "The Web Content Accessibility Guidelines (WCAG) 2.1 Level AA are internationally recognized standards for web accessibility.",
 *     links: [
 *       { text: "WCAG 2.1 Quick Reference", url: "https://www.w3.org/WAI/WCAG21/quickref/" },
 *     ],
 *   },
 * ];
 */
const COMPLIANCE_STANDARDS = [
  {
    name: "IITAA Accessibility Standards for Illinois",
    description:
      "The Illinois Information Technology Accessibility (IITAA) standards require that all state websites and digital services be accessible to individuals with disabilities. These standards align with WCAG 2.1 Level AA and Section 508 requirements, ensuring that Illinois state websites are usable by all residents, including those using assistive technologies.",
    links: [
      {
        text: "IITAA Standards Documentation",
        url: "https://doit.illinois.gov/initiatives/accessibility/iitaa.html",
      },
      {
        text: "IITAA Accessibility Requirements",
        url: "https://doit.illinois.gov/initiatives/accessibility/iitaa.html",
      },
    ],
  },
  {
    name: "WCAG 2.1 Level AA Guidelines",
    description:
      "The Web Content Accessibility Guidelines (WCAG) 2.1 Level AA are internationally recognized standards for web accessibility. These guidelines provide a comprehensive framework for making web content accessible to people with disabilities, including those with visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.",
    links: [
      {
        text: "WCAG 2.1 Quick Reference",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
      },
      {
        text: "Understanding WCAG 2.1",
        url: "https://www.w3.org/WAI/WCAG21/Understanding/",
      },
      {
        text: "WCAG 2.1 Guidelines",
        url: "https://www.w3.org/WAI/WCAG21/guidelines/",
      },
    ],
  },
  {
    name: "ADA Title II Requirements",
    description:
      "Americans with Disabilities Act (ADA) Title II requires that state and local governments ensure their services, programs, and activities are accessible to people with disabilities. This includes websites and digital services. Title II applies to all state and local government entities, including public universities, libraries, and other government-operated websites.",
    links: [
      {
        text: "ADA Title II Overview",
        url: "https://www.ada.gov/topics/ada-state-and-local-governments/",
      },
      {
        text: "ADA Title II Web Rule",
        url: "https://www.ada.gov/resources/2024-03-08-web-rule/",
      },
      {
        text: "ADA Web Accessibility Requirements",
        url: "https://www.ada.gov/resources/2024-03-08-web-rule/",
      },
    ],
  },
];
```

**Code Changes Required:**

- Lines 1328-1354: Replace hardcoded HTML with dynamic generation from `COMPLIANCE_STANDARDS`

---

### 10. Framework Information Configuration

**Current Location:** Lines 1536-1554  
**Current Values:**

- Hardcoded mentions of "Nuxt" and "Vuetify"

**Proposed Configuration:**

```javascript
/**
 * Framework Information Configuration
 *
 * Information about the frameworks used in your application.
 * This is displayed in the HTML report to explain why certain rules may be disabled.
 *
 * @property {string} name - The name of your primary framework(s)
 * @property {string} description - Description of the framework(s) and why rules may conflict
 * @property {Array<{name: string, description: string}>} frameworks - List of frameworks with descriptions
 *
 * @example
 * // For Nuxt/Vuetify:
 * const FRAMEWORK_INFO = {
 *   name: "Nuxt and Vuetify",
 *   description: "This accessibility portal is built using Nuxt and Vuetify",
 *   frameworks: [
 *     {
 *       name: "Nuxt",
 *       description: "Nuxt is a Vue.js-based framework that provides server-side rendering, static site generation, and a powerful development experience for building modern web applications.",
 *     },
 *     {
 *       name: "Vuetify",
 *       description: "Vuetify is a Vue.js component framework that provides Material Design components and a comprehensive set of UI elements.",
 *     },
 *   ],
 * };
 *
 * // For React/Next.js:
 * const FRAMEWORK_INFO = {
 *   name: "Next.js",
 *   description: "This application is built using Next.js",
 *   frameworks: [
 *     {
 *       name: "Next.js",
 *       description: "Next.js is a React framework that provides server-side rendering, static site generation, and optimized performance.",
 *     },
 *   ],
 * };
 *
 * // For no framework (vanilla HTML/JS):
 * const FRAMEWORK_INFO = {
 *   name: "None",
 *   description: "This application uses vanilla HTML, CSS, and JavaScript",
 *   frameworks: [],
 * };
 */
const FRAMEWORK_INFO = {
  name: "Nuxt and Vuetify",
  description: "This accessibility portal is built using Nuxt and Vuetify",
  frameworks: [
    {
      name: "Nuxt",
      description:
        "Nuxt is a Vue.js-based framework that provides server-side rendering, static site generation, and a powerful development experience for building modern web applications.",
    },
    {
      name: "Vuetify",
      description:
        "Vuetify is a Vue.js component framework that provides Material Design components and a comprehensive set of UI elements.",
    },
  ],
};
```

**Code Changes Required:**

- Lines 1536-1554: Replace hardcoded HTML with dynamic generation from `FRAMEWORK_INFO`

---

### 11. Axe-core Version

**Current Location:** Line 738  
**Current Values:**

```javascript
const axeVersion = "4.11.0";
```

**Proposed Configuration:**

```javascript
/**
 * Axe-core Version
 *
 * The version of axe-core being used. This can be:
 * - A hardcoded version string
 * - Read from package.json (recommended)
 *
 * @example
 * // Hardcoded version:
 * const AXE_VERSION = "4.11.0";
 *
 * // Read from package.json (recommended):
 * const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
 * const AXE_VERSION = packageJson.devDependencies["axe-core"]?.replace(/[\^~]/, "") || "4.11.0";
 */
// Option 1: Read from package.json (recommended)
let AXE_VERSION = "4.11.0"; // Fallback
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
  );
  AXE_VERSION =
    packageJson.devDependencies?.["axe-core"]?.replace(/[\^~]/, "") ||
    packageJson.dependencies?.["axe-core"]?.replace(/[\^~]/, "") ||
    "4.11.0";
} catch (e) {
  // Use fallback
}

// Option 2: Hardcoded (if package.json reading fails or you want to override)
// const AXE_VERSION = "4.11.0";
```

**Code Changes Required:**

- Line 738: Replace hardcoded version with `AXE_VERSION` variable
- Note: This requires `fs` to be available, which it already is (line 122)

---

## Summary of All Configuration Values

Here's a complete list of all configuration values that should be in the developer configuration section:

1. ✅ `TARGET_ENV` - Already configurable (line 30)
2. ✅ `PRODUCTION_URL` - Already configurable (line 37)
3. ✅ `DEV_SERVER_PORT` - Already configurable (line 45)
4. ✅ `AXE_RULE_CONFIG` - Already configurable (line 61)
5. ⚠️ `SITEMAP_PATH` - Needs to be moved (line 138)
6. ⚠️ `OUTPUT_DIR` - Needs to be moved (line 139)
7. ⚠️ `VIEWPORTS` - Needs to be moved (line 142)
8. ⚠️ `THEME_CONFIG` - Needs to be added (replaces THEMES on line 150, adds theme switching config)
9. ⚠️ `SKIP_LINK_CONFIG` - Needs to be added (currently hardcoded in verifySkipLink function)
10. ⚠️ `AXE_EXCLUDE_SELECTORS` - Needs to be added (line 411)
11. ⚠️ `DEV_SERVER_COMMAND` - Needs to be added (line 185)
12. ✅ `ERROR_DETECTION` - Keep hardcoded (Vite overlay check - safety feature, no config needed)
13. ⚠️ `SITE_INFO` - Needs to be added (for HTML report)
14. ⚠️ `COMPLIANCE_STANDARDS` - Needs to be added (lines 1328-1354)
15. ⚠️ `FRAMEWORK_INFO` - Needs to be added (lines 1536-1554)
16. ⚠️ `AXE_VERSION` - Needs to be made configurable (line 738)

---

## Implementation Notes

1. **Order Matters**: Place all configuration values in the developer configuration section (lines 18-100) before the "END OF DEVELOPER CONFIGURATION" comment.

2. **Default Values**: All new configuration values should use the current hardcoded values as defaults so the script works immediately without changes.

3. **Documentation**: Each configuration value should have JSDoc comments explaining:
   - What it does
   - How to modify it
   - Example values for different scenarios

4. **Backward Compatibility**: The script should work exactly as it does now with the default values, so existing users don't need to make any changes.

5. **Type Safety**: Consider adding validation or at least clear documentation of expected types/structures for each configuration value.
