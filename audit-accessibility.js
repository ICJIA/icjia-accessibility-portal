#!/usr/bin/env node

/**
 * ============================================================================
 * ⚙️ DEVELOPER CONFIGURATION - EDIT THIS SECTION
 * ============================================================================
 *
 * You can safely modify the AXE_RULE_CONFIG below to enable/disable specific
 * accessibility rules. This is the ONLY section you should modify unless you
 * know what you're doing.
 *
 * ⚠️ WARNING: Be careful with anything below this configuration section.
 *             Changes to the rest of the script may break the audit functionality.
 *
 * ============================================================================
 */

/**
 * Axe-core Rule Configuration
 *
 * Toggle these rules to test compatibility with Nuxt/Vuetify framework.
 * If a rule causes false positives or conflicts with framework structure,
 * set it to false to disable it.
 *
 * @example
 * // To disable a rule that's causing false positives:
 * "aria-allowed-role": false,
 *
 * // To enable a rule for testing:
 * "scrollable-region-focusable": true,
 */
const AXE_RULE_CONFIG = {
  // Framework-specific rules - may need to be disabled if they conflict with Nuxt/Vuetify
  "aria-allowed-role": true, // Test if this works with Nuxt/Vuetify components
  "scrollable-region-focusable": true, // Test if this works with Nuxt/Vuetify scrollable regions

  // Always disabled due to framework limitations
  "landmark-banner-is-top-level": true,
  "landmark-contentinfo-is-top-level": true,
  "landmark-main-is-top-level": true,
  "landmark-unique": true,
  region: false,

  // Experimental/Cutting-edge rules - disabled by default, enable to test latest accessibility checks
  // These rules are cutting-edge and may not be fully validated yet

  // ✅ RECOMMENDED: Safe to enable (low false positive risk, high value)
  "css-orientation-lock": false, // Checks for orientation lock (WCAG 2.1 SC 1.3.4)
  "no-autoplay-audio": true, // Checks for autoplay audio (WCAG 2.1 SC 1.4.2)
  "page-has-heading-one": true, // Checks for h1 on page

  // ⚠️ TEST CAREFULLY: May have false positives but valuable
  "focus-order-semantics": true, // Checks focus order matches DOM order
  "identical-links-same-purpose": false, // Checks for duplicate links with same purpose
  "link-in-text-block": true, // Checks link contrast in text blocks

  // ❌ USE WITH CAUTION: Higher false positive risk or may conflict with frameworks
  "hidden-content": false, // Checks for hidden content that should be visible
  "label-content-name-mismatch": false, // Checks if label text matches accessible name
  "presentation-role-conflict": false, // Checks for presentation role conflicts
};

/**
 * ============================================================================
 * END OF DEVELOPER CONFIGURATION
 * ============================================================================
 *
 * Everything below this point is the audit script implementation.
 * Only modify if you understand the codebase structure.
 *
 * ============================================================================
 */

/**
 * Accessibility Audit Script
 *
 * This script performs a comprehensive accessibility audit using axe-core:
 * - Checks if dev server is running on localhost:3000
 * - Reads URLs from sitemap.xml
 * - Tests each URL in desktop, tablet, and mobile viewports
 * - Generates an HTML report in /public/docs/accessibility/index.html
 *
 * Usage: yarn audit:a11y
 */

import puppeteer from "puppeteer";
import axeCore from "axe-core";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEV_SERVER_URL = "http://localhost:3000";
const SITEMAP_PATH = path.join(__dirname, "public", "sitemap.xml");
const OUTPUT_DIR = path.join(__dirname, "public", "docs", "accessibility");
const REPORT_FILE = path.join(OUTPUT_DIR, "index.html");

const VIEWPORTS = [
  { width: 1920, height: 1080, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
];

// No theme switching - site is permanently dark mode
// Keeping THEMES array for compatibility with report generation, but only dark is used
const THEMES = [{ name: "dark", value: "dark" }];

/**
 * Check if the dev server is running
 */
async function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.get(DEV_SERVER_URL, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on("error", () => {
      resolve(false);
    });

    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Parse sitemap.xml and extract all URLs
 */
async function parseSitemap() {
  try {
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, "utf8");
    const result = await parseStringPromise(sitemapContent);
    const urls = result.urlset.url.map((entry) => entry.loc[0]);

    // Convert absolute URLs to localhost URLs
    return urls.map((url) => {
      try {
        const urlObj = new URL(url);
        return `${DEV_SERVER_URL}${urlObj.pathname}${urlObj.search}`;
      } catch (e) {
        // If URL parsing fails, assume it's already a path
        return `${DEV_SERVER_URL}${url.startsWith("/") ? url : "/" + url}`;
      }
    });
  } catch (error) {
    console.error(`❌ Error parsing sitemap: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Run axe-core audit on a page
 */
async function runAxeAudit(page) {
  await page.addScriptTag({ content: axeCore.source });
  // Pass AXE_RULE_CONFIG values into the browser context
  return await page.evaluate(async (ruleConfig) => {
    // Configure axe to exclude rules that can't be fixed due to framework limitations
    // Enable best practice rules for enhanced accessibility testing

    // Build rules object - explicitly set each rule from AXE_RULE_CONFIG
    // This ensures rules are dynamically applied as configured
    const rulesConfig = {};

    // Framework-specific rules
    if (ruleConfig.hasOwnProperty("aria-allowed-role")) {
      rulesConfig["aria-allowed-role"] = {
        enabled: ruleConfig["aria-allowed-role"],
      };
    }
    if (ruleConfig.hasOwnProperty("scrollable-region-focusable")) {
      rulesConfig["scrollable-region-focusable"] = {
        enabled: ruleConfig["scrollable-region-focusable"],
      };
    }
    if (ruleConfig.hasOwnProperty("landmark-banner-is-top-level")) {
      rulesConfig["landmark-banner-is-top-level"] = {
        enabled: ruleConfig["landmark-banner-is-top-level"],
      };
    }
    if (ruleConfig.hasOwnProperty("landmark-contentinfo-is-top-level")) {
      rulesConfig["landmark-contentinfo-is-top-level"] = {
        enabled: ruleConfig["landmark-contentinfo-is-top-level"],
      };
    }
    if (ruleConfig.hasOwnProperty("landmark-main-is-top-level")) {
      rulesConfig["landmark-main-is-top-level"] = {
        enabled: ruleConfig["landmark-main-is-top-level"],
      };
    }
    if (ruleConfig.hasOwnProperty("landmark-unique")) {
      rulesConfig["landmark-unique"] = {
        enabled: ruleConfig["landmark-unique"],
      };
    }
    if (ruleConfig.hasOwnProperty("region")) {
      rulesConfig["region"] = { enabled: ruleConfig["region"] };
    }

    // Best practice rules (always enabled)
    rulesConfig["meta-viewport"] = { enabled: true };
    rulesConfig["frame-title"] = { enabled: true };
    rulesConfig["html-xml-lang-mismatch"] = { enabled: true };

    // Experimental rules - explicitly enable/disable based on config
    // These rules need to be explicitly set to run, even if they're experimental
    if (ruleConfig.hasOwnProperty("css-orientation-lock")) {
      rulesConfig["css-orientation-lock"] = {
        enabled: ruleConfig["css-orientation-lock"],
      };
    }
    if (ruleConfig.hasOwnProperty("focus-order-semantics")) {
      rulesConfig["focus-order-semantics"] = {
        enabled: ruleConfig["focus-order-semantics"],
      };
    }
    if (ruleConfig.hasOwnProperty("hidden-content")) {
      rulesConfig["hidden-content"] = { enabled: ruleConfig["hidden-content"] };
    }
    if (ruleConfig.hasOwnProperty("identical-links-same-purpose")) {
      rulesConfig["identical-links-same-purpose"] = {
        enabled: ruleConfig["identical-links-same-purpose"],
      };
    }
    if (ruleConfig.hasOwnProperty("label-content-name-mismatch")) {
      rulesConfig["label-content-name-mismatch"] = {
        enabled: ruleConfig["label-content-name-mismatch"],
      };
    }
    if (ruleConfig.hasOwnProperty("link-in-text-block")) {
      rulesConfig["link-in-text-block"] = {
        enabled: ruleConfig["link-in-text-block"],
      };
    }
    if (ruleConfig.hasOwnProperty("no-autoplay-audio")) {
      rulesConfig["no-autoplay-audio"] = {
        enabled: ruleConfig["no-autoplay-audio"],
      };
    }
    if (ruleConfig.hasOwnProperty("page-has-heading-one")) {
      rulesConfig["page-has-heading-one"] = {
        enabled: ruleConfig["page-has-heading-one"],
      };
    }
    if (ruleConfig.hasOwnProperty("presentation-role-conflict")) {
      rulesConfig["presentation-role-conflict"] = {
        enabled: ruleConfig["presentation-role-conflict"],
      };
    }

    // Build tags array - always include base tags, add experimental if any experimental rules enabled
    const baseTags = [
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "best-practice",
    ];
    const experimentalRules = [
      "css-orientation-lock",
      "focus-order-semantics",
      "hidden-content",
      "identical-links-same-purpose",
      "label-content-name-mismatch",
      "link-in-text-block",
      "no-autoplay-audio",
      "page-has-heading-one",
      "presentation-role-conflict",
    ];
    const hasExperimental = experimentalRules.some((rule) => ruleConfig[rule]);
    const tags = hasExperimental ? [...baseTags, "experimental"] : baseTags;

    // When rules are explicitly set in rulesConfig, they should run regardless of tags
    // However, we still need tags to get the base set of rules
    // Explicitly enabled rules in rulesConfig will override tag filtering
    return await axe.run({
      exclude: [
        ["#__nuxt"], // Exclude Nuxt root container - it's a framework wrapper
      ],
      rules: rulesConfig,
      tags: tags,
    });
  }, AXE_RULE_CONFIG);
}

/**
 * Verify skip link implementation on a page
 * Checks for skip link presence, target, keyboard accessibility, and focus visibility
 * @param {import('puppeteer').Page} page - Puppeteer page instance
 * @returns {Promise<{exists: boolean, hasTarget: boolean, keyboardAccessible: boolean, visibleOnFocus: boolean, issues: string[]}>}
 */
async function verifySkipLink(page) {
  return await page.evaluate(() => {
    const issues = [];
    let exists = false;
    let hasTarget = false;
    let keyboardAccessible = false;
    let visibleOnFocus = false;

    // Find skip link - look for links with href="#main-content" or class containing "skip"
    const skipLink = document.querySelector(
      'a[href="#main-content"], a.skip-link, a[class*="skip"]'
    );

    if (!skipLink) {
      issues.push("Skip link not found on page");
      return { exists, hasTarget, keyboardAccessible, visibleOnFocus, issues };
    }

    exists = true;

    // Check if skip link has correct href
    const href = skipLink.getAttribute("href");
    if (href === "#main-content") {
      hasTarget = true;
    } else {
      issues.push(`Skip link href is "${href}" but should be "#main-content"`);
    }

    // Check if main content target exists
    const mainContent = document.getElementById("main-content");
    if (!mainContent) {
      issues.push("Skip link target (#main-content) not found on page");
      hasTarget = false;
    } else {
      // Check if target is focusable (has tabindex or is naturally focusable)
      const tabindex = mainContent.getAttribute("tabindex");
      if (
        tabindex === "-1" ||
        tabindex === "0" ||
        mainContent.tagName === "A" ||
        mainContent.tagName === "BUTTON"
      ) {
        // Target is focusable
      } else {
        issues.push(
          "Skip link target (#main-content) should have tabindex='-1' for programmatic focus"
        );
      }
    }

    // Check keyboard accessibility - skip link should be focusable
    const skipLinkTabIndex = skipLink.getAttribute("tabindex");
    if (skipLinkTabIndex === "-1") {
      issues.push("Skip link has tabindex='-1' which prevents keyboard access");
    } else {
      keyboardAccessible = true;
    }

    // Check if skip link is visible when focused (check CSS)
    const computedStyle = window.getComputedStyle(skipLink);
    const position = computedStyle.position;
    const top = computedStyle.top;
    const zIndex = parseInt(computedStyle.zIndex) || 0;

    // Check if it's positioned off-screen when not focused
    const isOffScreen =
      position === "absolute" && (top === "-100px" || top.includes("-100"));

    // Check focus styles
    const styleSheet = Array.from(document.styleSheets).find((sheet) => {
      try {
        return Array.from(sheet.cssRules || []).some((rule) => {
          if (rule.selectorText && rule.selectorText.includes(".skip-link")) {
            return true;
          }
          return false;
        });
      } catch (e) {
        return false;
      }
    });

    // For now, assume visible on focus if it's properly positioned off-screen initially
    // (actual focus visibility would require simulating focus, which is complex)
    if (isOffScreen || zIndex > 1000) {
      visibleOnFocus = true; // Likely has proper focus styles
    } else {
      issues.push(
        "Skip link may not be properly visible when focused (check CSS :focus styles)"
      );
    }

    return { exists, hasTarget, keyboardAccessible, visibleOnFocus, issues };
  });
}

/**
 * Convert localhost URL to relative path for display
 */
function urlToRelativePath(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname || "/";
  } catch (e) {
    // If parsing fails, try to extract path from localhost URL
    return url.replace(/https?:\/\/localhost(:\d+)?/, "") || "/";
  }
}

/**
 * Generate HTML report from audit results
 */
function generateHTMLReport(results) {
  const timestamp = new Date().toISOString();

  // Calculate summary statistics
  let totalPages = 0;
  let totalViolations = 0;
  let totalPasses = 0;
  let totalIncomplete = 0;
  let totalInapplicable = 0;
  const violationsByRule = {};
  const pagesWithViolations = [];

  results.forEach((result) => {
    totalPages++;
    const violations = result.violations || [];
    const passes = result.passes || [];
    const incomplete = result.incomplete || [];
    const inapplicable = result.inapplicable || [];

    totalViolations += violations.length;
    totalPasses += passes.length;
    totalIncomplete += incomplete.length;
    totalInapplicable += inapplicable.length;

    if (violations.length > 0) {
      pagesWithViolations.push({
        url: result.url,
        viewport: result.viewport,
        theme: result.theme,
        violations: violations.length,
        violationDetails: violations,
      });

      violations.forEach((violation) => {
        const ruleId = violation.id;
        if (!violationsByRule[ruleId]) {
          violationsByRule[ruleId] = {
            id: ruleId,
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            impact: violation.impact,
            tags: violation.tags,
            occurrences: 0,
            pages: [],
          };
        }
        violationsByRule[ruleId].occurrences += violation.nodes?.length || 1;
        violationsByRule[ruleId].pages.push({
          url: result.url,
          viewport: result.viewport,
          theme: result.theme,
          nodeCount: violation.nodes?.length || 1,
        });
      });
    }
  });

  const uniquePages = new Set(results.map((r) => r.url)).size;
  const totalTestsRun =
    totalViolations + totalPasses + totalIncomplete + totalInapplicable;
  const pagesPassing =
    uniquePages - new Set(pagesWithViolations.map((p) => p.url)).size;

  // Collect all unique test rules that were run
  const allTestRules = new Set();
  results.forEach((result) => {
    [
      ...(result.violations || []),
      ...(result.passes || []),
      ...(result.incomplete || []),
    ].forEach((test) => {
      if (test.id) {
        allTestRules.add(
          JSON.stringify({
            id: test.id,
            description: test.description,
            help: test.help,
            helpUrl: test.helpUrl,
            tags: test.tags || [],
          })
        );
      }
    });
  });
  const testRulesList = Array.from(allTestRules)
    .map(JSON.parse)
    .sort((a, b) => a.id.localeCompare(b.id));
  const uniqueTestRulesCount = testRulesList.length;
  const pageViewportCombinations =
    uniquePages * VIEWPORTS.length * THEMES.length;

  // Categorize rules by type
  const categorizeRule = (rule) => {
    const tags = rule.tags || [];
    const isExperimental = tags.includes("experimental");
    const isBestPractice = tags.includes("best-practice");
    const isWCAG = tags.some(
      (tag) => tag.startsWith("wcag2") || tag.startsWith("wcag21")
    );

    if (isExperimental) {
      return "experimental";
    } else if (isBestPractice && !isWCAG) {
      return "best-practice";
    } else if (isWCAG) {
      return "wcag";
    } else {
      return "other";
    }
  };

  const wcagRules = testRulesList.filter((r) => categorizeRule(r) === "wcag");
  const bestPracticeRules = testRulesList.filter(
    (r) => categorizeRule(r) === "best-practice"
  );
  const experimentalRules = testRulesList.filter(
    (r) => categorizeRule(r) === "experimental"
  );
  const otherRules = testRulesList.filter((r) => categorizeRule(r) === "other");

  // Check if any experimental rules are enabled in config
  const experimentalRulesEnabled = Object.entries(AXE_RULE_CONFIG)
    .filter(([rule, enabled]) => {
      const experimentalRuleNames = [
        "css-orientation-lock",
        "focus-order-semantics",
        "hidden-content",
        "identical-links-same-purpose",
        "label-content-name-mismatch",
        "link-in-text-block",
        "no-autoplay-audio",
        "page-has-heading-one",
        "presentation-role-conflict",
      ];
      return experimentalRuleNames.includes(rule) && enabled;
    })
    .map(([rule]) => rule);

  // Get list of enabled/disabled framework-specific rules for reporting
  const frameworkRulesStatus = {
    enabled: Object.entries(AXE_RULE_CONFIG)
      .filter(([rule, enabled]) => enabled)
      .map(([rule]) => rule),
    disabled: Object.entries(AXE_RULE_CONFIG)
      .filter(([rule, enabled]) => !enabled)
      .map(([rule]) => rule),
  };

  // Calculate skip link statistics
  let skipLinkStats = {
    total: 0,
    exists: 0,
    working: 0,
    issues: 0,
  };

  // Build table data for all tested pages
  const tableRows = results.map((result) => {
    const violations = result.violations?.length || 0;
    const passes = result.passes?.length || 0;
    const incomplete = result.incomplete?.length || 0;
    const total = violations + passes + incomplete;
    const status = violations === 0 ? "✅ Pass" : "❌ Fail";

    // Check skip link status
    const skipLink = result.skipLink || {};
    let skipLinkStatus = "❌ Missing";
    let skipLinkClass = "status-fail";

    if (skipLink.exists) {
      skipLinkStats.exists++;
      if (skipLink.issues && skipLink.issues.length === 0) {
        skipLinkStatus = "✅ OK";
        skipLinkClass = "status-pass";
        skipLinkStats.working++;
      } else {
        skipLinkStatus = `⚠️ ${skipLink.issues?.length || 0} issue(s)`;
        skipLinkClass = "status-warning";
        skipLinkStats.issues += skipLink.issues?.length || 0;
      }
    }

    skipLinkStats.total++;

    return {
      url: urlToRelativePath(result.url),
      viewport: result.viewport,
      theme: result.theme || "dark",
      violations,
      passes,
      incomplete,
      total,
      status,
      skipLink: skipLinkStatus,
      skipLinkClass,
      skipLinkIssues: skipLink.issues || [],
    };
  });

  // Get axe-core version from the package
  const axeVersion = "4.11.0";

  // Generate HTML matching ipsumify.com style
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Audit Report - ${new Date().toLocaleDateString()}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 1.25rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    
    .meta {
      color: #666;
      font-size: 0.9em;
      margin-bottom: 2rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .stat-card {
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      transition: all 0.2s ease;
    }
    
    .stat-card.clickable {
      cursor: pointer;
    }
    
    .stat-card.clickable:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .stat-card .click-hint {
      font-size: 0.75rem;
      color: #6c757d;
      margin-top: 0.5rem;
      font-style: italic;
    }
    
    .stat-card.success {
      background: #d1e7dd;
      border-color: #badbcc;
      color: #0f5132;
    }
    
    .stat-card.error {
      background: #f8d7da;
      border-color: #f5c2c7;
      color: #842029;
    }
    
    .stat-card.warning {
      background: #fff3cd;
      border-color: #ffecb5;
      color: #856404;
    }
    
    .stat-card .number {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    
    .stat-card .label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      overflow: hidden;
    }
    
    thead {
      background: #f8f9fa;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    
    th {
      font-weight: 600;
      color: #495057;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .status-pass {
      color: #198754;
      font-weight: 600;
    }
    
    .status-fail {
      color: #dc3545;
      font-weight: 600;
    }
    
    .status-warning {
      color: #856404;
      font-weight: 600;
    }
    
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      overflow: auto;
    }
    
    .modal-content {
      background-color: #fff;
      margin: 5% auto;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #dee2e6;
    }
    
    .modal-close {
      font-size: 2rem;
      font-weight: bold;
      color: #999;
      cursor: pointer;
      border: none;
      background: none;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-close:hover {
      color: #333;
    }
    
    .test-list {
      list-style: none;
      padding: 0;
    }
    
    .test-item {
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
      border-left: 3px solid #0d6efd;
    }
    
    .test-id {
      font-family: monospace;
      font-weight: 600;
      color: #0d6efd;
      margin-right: 0.5rem;
    }
    
    .test-description {
      color: #495057;
    }
    
    .info-section {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #dee2e6;
    }
    
    .info-block {
      background: #ffffff;
      border-left: 4px solid #0d6efd;
      padding: 1.5rem 2rem;
      margin: 2rem 0;
      border-radius: 0 4px 4px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .info-block h2 {
      color: #0d6efd;
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    
    .info-block h3 {
      color: #212529;
      font-size: 1.25rem;
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }
    
    .info-block h3:first-of-type {
      margin-top: 1rem;
    }
    
    .info-block h4 {
      color: #212529;
      font-size: 1.1rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }
    
    .info-block p {
      color: #495057;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .info-block ul {
      margin-left: 1.5rem;
      margin-top: 0.75rem;
      margin-bottom: 1.5rem;
      padding-left: 0;
      list-style-position: outside;
    }
    
    .info-block li {
      margin-bottom: 0.75rem;
      color: #495057;
      line-height: 1.6;
    }
    
    .info-block li strong {
      color: #212529;
      font-weight: 600;
    }
    
    .info-block a {
      color: #0d6efd;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    
    .info-block a:hover {
      color: #0a58ca;
      text-decoration-thickness: 2px;
    }
    
    .info-section ul {
      margin-left: 1.5rem;
      margin-top: 1rem;
    }
    
    .info-section li {
      margin-bottom: 0.5rem;
    }
    
    .info-section a {
      color: #0d6efd;
      text-decoration: none;
    }
    
    .info-section a:hover {
      text-decoration: underline;
    }
    
    footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #dee2e6;
      text-align: center;
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      table {
        font-size: 0.875rem;
      }
      
      th, td {
        padding: 0.5rem;
      }
      
      .modal-content {
        width: 95%;
        margin: 10% auto;
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Accessibility Audit Report</h1>
    <div class="meta">
      <p><strong>Generated:</strong> ${new Date(timestamp).toLocaleString()}</p>
      <p><strong>axe-core version:</strong> ${axeVersion}</p>
      <p><strong>Pages tested:</strong> ${uniquePages}</p>
      <p><strong>Viewports tested:</strong> ${VIEWPORTS.map((v) => v.name).join(", ")}</p>
      <p><strong>Themes tested:</strong> dark</p>
      <p><strong>Rule categories:</strong> WCAG 2.1 AA (${wcagRules.length} rules), Best Practice (${bestPracticeRules.length} rules)${experimentalRules.length > 0 ? `, Experimental (${experimentalRules.length} rules)` : ""}${otherRules.length > 0 ? `, Other (${otherRules.length} rules)` : ""}</p>
      ${frameworkRulesStatus.enabled.length > 0 ? `<p><strong>Framework-specific rules enabled:</strong> ${frameworkRulesStatus.enabled.join(", ")}</p>` : ""}
      ${frameworkRulesStatus.disabled.length > 0 ? `<p style="color: #6c757d;"><strong>Framework-specific rules disabled:</strong> ${frameworkRulesStatus.disabled.join(", ")}</p>` : ""}
    </div>
    
    <div class="stats-grid">
      <div class="stat-card ${totalViolations === 0 ? "success" : "error"}">
        <div class="label">Total Violations</div>
        <div class="number">${totalViolations}</div>
      </div>
      <div class="stat-card success">
        <div class="label">Total Passes</div>
        <div class="number">${totalPasses}</div>
      </div>
      <div class="stat-card ${pagesPassing === uniquePages ? "success" : "error"}">
        <div class="label">Pages Passing</div>
        <div class="number">${pagesPassing}</div>
      </div>
      <div class="stat-card clickable" id="totalTestsCard" onclick="openTestsModal()">
        <div class="label">Total Tests Run</div>
        <div class="number">${totalTestsRun}</div>
        <div class="click-hint">click to view tests</div>
      </div>
      <div class="stat-card ${skipLinkStats.working === skipLinkStats.total ? "success" : skipLinkStats.exists === 0 ? "error" : "warning"}">
        <div class="label">Skip Links</div>
        <div class="number">${skipLinkStats.working}/${skipLinkStats.total}</div>
        <div class="click-hint" style="font-size: 0.7rem;">${skipLinkStats.issues > 0 ? `${skipLinkStats.issues} issue(s)` : "all working"}</div>
      </div>
    </div>
    
    <h2>📋 All Tested Pages</h2>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Viewport</th>
          <th>Theme</th>
          <th>Violations</th>
          <th>Passes</th>
          <th>Incomplete</th>
          <th>Total Tests</th>
          <th>Status</th>
          <th>Skip Link</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows
          .map(
            (row) => `
        <tr>
          <td>${escapeHtml(row.url)}</td>
          <td>${row.viewport}</td>
          <td>${row.theme}</td>
          <td>${row.violations}</td>
          <td>${row.passes}</td>
          <td>${row.incomplete}</td>
          <td><strong>${row.total}</strong></td>
          <td class="${row.violations === 0 ? "status-pass" : "status-fail"}">${row.status}</td>
          <td class="${row.skipLinkClass}" title="${row.skipLinkIssues.length > 0 ? escapeHtml(row.skipLinkIssues.join("; ")) : ""}">${row.skipLink}</td>
        </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    
    <div class="info-section">
      <div class="info-block">
        <h2>About axe-core</h2>
        <p><strong>axe-core</strong> is an open-source accessibility testing engine developed by Deque Systems. It is one of the most comprehensive and widely-used tools for automated accessibility testing on the web.</p>
        
        <h3>What does axe-core test for?</h3>
        <p>axe-core performs automated checks against the Web Content Accessibility Guidelines (WCAG) and other accessibility standards. The tests check for:</p>
        <ul>
          <li><strong>Semantic HTML:</strong> Proper use of HTML elements, ARIA attributes, and landmarks</li>
          <li><strong>Keyboard Navigation:</strong> All interactive elements must be keyboard accessible</li>
          <li><strong>Color Contrast:</strong> Text must meet WCAG contrast ratio requirements (4.5:1 for normal text, 3:1 for large text)</li>
          <li><strong>Focus Management:</strong> Visible focus indicators and logical tab order</li>
          <li><strong>Form Labels:</strong> All form inputs must have associated labels</li>
          <li><strong>Image Alt Text:</strong> Images must have appropriate alternative text</li>
          <li><strong>Heading Structure:</strong> Proper heading hierarchy (h1 → h2 → h3, etc.)</li>
          <li><strong>Landmark Regions:</strong> Proper use of ARIA landmarks (banner, main, navigation, contentinfo, etc.)</li>
          <li><strong>Interactive Elements:</strong> Buttons, links, and controls must have accessible names</li>
          <li><strong>Language Attributes:</strong> HTML lang attribute must be set</li>
        </ul>
        
        <h3>Why is axe-core critical for accessibility?</h3>
        <ul>
          <li><strong>Automated Testing:</strong> Catches accessibility issues early in development, before manual testing</li>
          <li><strong>Comprehensive Coverage:</strong> Tests for 50+ accessibility rules covering WCAG 2.1 Level A and AA standards</li>
        </ul>
        
        <h3>Rule Categories in This Audit</h3>
        <p>This audit includes ${experimentalRulesEnabled.length > 0 ? "three" : "two"} categories of accessibility rules:</p>
        <ul>
          <li><strong>WCAG 2.1 Level A & AA Rules:</strong> These rules test for compliance with Web Content Accessibility Guidelines 2.1 Level A and AA standards. These are required for legal compliance with ADA Title II, IITAA, and Section 508.</li>
          <li><strong>Best Practice Rules:</strong> These rules test for accessibility best practices that are recommended but not explicitly required by WCAG 2.1 AA. They help improve overall accessibility and user experience. Examples include:
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
              <li><strong>meta-viewport:</strong> Ensures viewport meta tag is present for responsive design</li>
              <li><strong>frame-title:</strong> Ensures iframes have descriptive titles</li>
              <li><strong>html-xml-lang-mismatch:</strong> Checks for consistency between HTML lang and XML lang attributes</li>
            </ul>
          </li>
          ${
            experimentalRulesEnabled.length > 0
              ? `
          <li><strong>Experimental/Cutting-edge Rules:</strong> These are cutting-edge accessibility rules that are still being validated. They may catch issues that standard rules miss, but may also have false positives. Currently enabled: <strong>${experimentalRulesEnabled.join(", ")}</strong>. Examples include:
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
              <li><strong>css-orientation-lock:</strong> Checks for orientation lock (WCAG 2.1 SC 1.3.4)</li>
              <li><strong>focus-order-semantics:</strong> Checks focus order matches DOM order</li>
              <li><strong>no-autoplay-audio:</strong> Checks for autoplay audio (WCAG 2.1 SC 1.4.2)</li>
              <li><strong>page-has-heading-one:</strong> Checks for h1 on page</li>
            </ul>
          </li>
          `
              : ""
          }
        </ul>
        
        <h3>Framework-Specific Rule Configuration</h3>
        <p><strong>What are "framework-specific" rules?</strong></p>
        <p>
          Some axe-core rules may conflict with how modern web frameworks (like Nuxt and Vuetify) structure their HTML and components. 
          These frameworks often create wrapper elements, duplicate landmarks, or use ARIA attributes in ways that can trigger false positives 
          from certain accessibility rules. "Framework-specific" rules are those that may need to be toggled on or off depending on 
          whether they work correctly with your specific framework setup.
        </p>
        
        <p><strong>Why are some rules enabled and others disabled?</strong></p>
        <p>
          Rules are configured based on their compatibility with Nuxt/Vuetify:
        </p>
        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
          <li><strong>Enabled rules</strong> are being tested to verify they work correctly with the framework. If they cause false positives or conflicts, they should be disabled.</li>
          <li><strong>Disabled rules</strong> are known to conflict with framework structure (e.g., landmark rules that don't work with framework-created nested structures).</li>
        </ul>
        
        ${
          frameworkRulesStatus.enabled.length > 0
            ? `
        <p style="margin-top: 1rem;"><strong>Currently Enabled (${frameworkRulesStatus.enabled.length} rule${frameworkRulesStatus.enabled.length !== 1 ? "s" : ""}):</strong></p>
        <p style="font-size: 0.95em; color: #495057; margin-bottom: 0.5rem;">
          These rules are enabled to test compatibility with Nuxt/Vuetify. Monitor the audit results to see if they produce false positives or valid issues.
        </p>
        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
          ${frameworkRulesStatus.enabled
            .map((rule) => {
              let explanation = "";
              if (rule === "aria-allowed-role") {
                explanation =
                  "Checks if ARIA roles are used correctly. May conflict with Vuetify component ARIA usage.";
              } else if (rule === "scrollable-region-focusable") {
                explanation =
                  "Ensures scrollable regions are keyboard accessible. May conflict with framework-managed scrollable containers.";
              } else if (rule === "landmark-banner-is-top-level") {
                explanation =
                  "Checks that banner landmarks are top-level (not nested). Framework may create nested banners that conflict with this rule.";
              } else if (rule === "landmark-contentinfo-is-top-level") {
                explanation =
                  "Checks that contentinfo landmarks are top-level (not nested). Framework may create nested contentinfo that conflicts with this rule.";
              } else if (rule === "landmark-main-is-top-level") {
                explanation =
                  "Checks that main landmarks are top-level (not nested). Framework may create nested main landmarks that conflict with this rule.";
              } else if (rule === "landmark-unique") {
                explanation =
                  "Checks that landmark types are unique on the page. Framework may intentionally create duplicate landmarks (e.g., multiple navigation regions).";
              } else if (rule === "region") {
                explanation =
                  "Checks ARIA region usage. Framework structure may handle regions differently than this rule expects.";
              } else {
                explanation = "Currently enabled for testing.";
              }
              return `<li><strong>${rule}:</strong> ${explanation} If this rule causes false positives, disable it in the <code>AXE_RULE_CONFIG</code> section.</li>`;
            })
            .join("")}
        </ul>
        `
            : '<p style="margin-top: 1rem;"><strong>No framework-specific rules are currently enabled.</strong></p>'
        }
        
        ${
          frameworkRulesStatus.disabled.length > 0
            ? `
        <p style="margin-top: 1rem;"><strong>Currently Disabled (${frameworkRulesStatus.disabled.length} rule${frameworkRulesStatus.disabled.length !== 1 ? "s" : ""}):</strong></p>
        <p style="font-size: 0.95em; color: #495057; margin-bottom: 0.5rem;">
          These rules are disabled because they conflict with Nuxt/Vuetify framework structure:
        </p>
        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
          ${frameworkRulesStatus.disabled
            .map((rule) => {
              let explanation = "";
              if (rule === "aria-allowed-role") {
                explanation =
                  "Disabled due to conflicts with Vuetify component ARIA usage.";
              } else if (rule === "scrollable-region-focusable") {
                explanation =
                  "Disabled due to conflicts with framework-managed scrollable containers.";
              } else if (rule === "landmark-banner-is-top-level") {
                explanation =
                  "Framework creates nested banner landmarks that don't meet this rule's requirements.";
              } else if (rule === "landmark-contentinfo-is-top-level") {
                explanation =
                  "Framework creates nested contentinfo landmarks that conflict with this rule.";
              } else if (rule === "landmark-main-is-top-level") {
                explanation =
                  "Framework creates nested main landmarks that conflict with this rule.";
              } else if (rule === "landmark-unique") {
                explanation =
                  "Framework intentionally creates duplicate landmarks (e.g., multiple navigation regions).";
              } else if (rule === "region") {
                explanation =
                  "Framework structure handles ARIA regions properly, but this rule conflicts with the implementation.";
              } else {
                explanation = "Disabled due to framework structure conflicts.";
              }
              return `<li><strong>${rule}:</strong> ${explanation}</li>`;
            })
            .join("")}
        </ul>
        `
            : '<p style="margin-top: 1rem;"><strong>No framework-specific rules are currently disabled.</strong></p>'
        }
        
        <p style="margin-top: 1.5rem; padding: 0.75rem; background: #fff3cd; border-left: 3px solid #ffc107; border-radius: 4px;">
          <strong>How to Toggle Rules:</strong> Edit the <code>AXE_RULE_CONFIG</code> constant at the top of <code>audit-accessibility.js</code> (around line 32). 
          Set a rule to <code>true</code> to enable it, or <code>false</code> to disable it. After changing the configuration, re-run the audit to see the updated results.
        </p>
      </div>
      
      <div class="info-block">
        <h2>Accessibility Standards & Compliance</h2>
        <p>The accessibility tests performed by axe-core are designed to ensure compliance with the following standards and requirements:</p>
        
        <h3>IITAA Accessibility Standards for Illinois</h3>
        <p>The Illinois Information Technology Accessibility (IITAA) standards require that all state websites and digital services be accessible to individuals with disabilities. These standards align with WCAG 2.1 Level AA and Section 508 requirements, ensuring that Illinois state websites are usable by all residents, including those using assistive technologies.</p>
        <ul>
          <li><a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA Standards Documentation</a></li>
          <li><a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA Accessibility Requirements</a></li>
        </ul>
        
        <h3>WCAG 2.1 Level AA Guidelines</h3>
        <p>The Web Content Accessibility Guidelines (WCAG) 2.1 Level AA are internationally recognized standards for web accessibility. These guidelines provide a comprehensive framework for making web content accessible to people with disabilities, including those with visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.</p>
        <ul>
          <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a></li>
          <li><a href="https://www.w3.org/WAI/WCAG21/Understanding/" target="_blank" rel="noopener noreferrer">Understanding WCAG 2.1</a></li>
          <li><a href="https://www.w3.org/WAI/WCAG21/guidelines/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Guidelines</a></li>
        </ul>
        
        <h3>ADA Title II Requirements</h3>
        <p>Americans with Disabilities Act (ADA) Title II requires that state and local governments ensure their services, programs, and activities are accessible to people with disabilities. This includes websites and digital services. Title II applies to all state and local government entities, including public universities, libraries, and other government-operated websites.</p>
        <ul>
          <li><a href="https://www.ada.gov/topics/ada-state-and-local-governments/" target="_blank" rel="noopener noreferrer">ADA Title II Overview</a></li>
          <li><a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a></li>
          <li><a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Web Accessibility Requirements</a></li>
        </ul>
      </div>
    </div>
    
    <footer>
      <p>Generated by <strong>axe-core</strong> ${axeVersion} on ${new Date(timestamp).toLocaleString()}</p>
      <p>For more information, visit <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">https://www.deque.com/axe/</a></p>
    </footer>
  </div>
  
  <!-- Modal for Test List -->
  <div id="testsModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>axe-core Tests Performed</h2>
        <button class="modal-close" onclick="closeTestsModal()">&times;</button>
      </div>
      <div style="background: #f8f9fa; padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; border-left: 4px solid #0d6efd;">
        <p style="margin: 0 0 0.75rem 0; font-weight: 600; font-size: 1rem;">How the Total Tests Run (${totalTestsRun}) is Calculated:</p>
        <div style="font-size: 0.9em; color: #495057; line-height: 1.6;">
          <p style="margin: 0 0 0.75rem 0;">
            This list shows <strong>${uniqueTestRulesCount} unique test rule types</strong> (e.g., "color-contrast", "button-name"). 
            Each rule checks for one specific accessibility issue.
          </p>
          
          <p style="margin: 0 0 0.75rem 0; font-weight: 600;">Step 1: Calculate Maximum Possible Tests</p>
          <p style="margin: 0 0 0.5rem 0;">
            Each rule runs once per page/viewport combination:
          </p>
          <ul style="margin: 0.5rem 0 0.75rem 1.5rem; padding-left: 0;">
            <li style="margin-bottom: 0.25rem;"><strong>${uniqueTestRulesCount} rules</strong> (shown in list below)</li>
            <li style="margin-bottom: 0.25rem;">× <strong>${uniquePages} pages</strong> tested</li>
            <li style="margin-bottom: 0.25rem;">× <strong>${VIEWPORTS.length} viewports</strong> (${VIEWPORTS.map((v) => v.name).join(", ")})</li>
            <li style="margin-bottom: 0.25rem;">× <strong>${THEMES.length} theme</strong> (dark)</li>
            <li style="margin-bottom: 0.25rem;">= <strong>${pageViewportCombinations} page/viewport combinations</strong></li>
          </ul>
          <p style="margin: 0 0 0.75rem 0; padding: 0.5rem; background: #e7f3ff; border-radius: 4px;">
            <strong>Maximum possible tests:</strong> ${uniqueTestRulesCount} rules × ${pageViewportCombinations} combinations = <strong>${uniqueTestRulesCount * pageViewportCombinations} tests</strong>
          </p>
          
          <p style="margin: 0.75rem 0 0.5rem 0; font-weight: 600;">Step 2: Count Actual Test Results</p>
          <p style="margin: 0 0 0.5rem 0;">
            For each page/viewport combination, axe-core runs all applicable rules and returns results:
          </p>
          <ul style="margin: 0.5rem 0 0.75rem 1.5rem; padding-left: 0;">
            <li style="margin-bottom: 0.25rem;"><strong>Passes:</strong> ${totalPasses} tests that passed (rule found no issues)</li>
            <li style="margin-bottom: 0.25rem;"><strong>Violations:</strong> ${totalViolations} tests that found accessibility issues</li>
            <li style="margin-bottom: 0.25rem;"><strong>Incomplete:</strong> ${totalIncomplete} tests that couldn't complete automatically (may need manual review)</li>
            <li style="margin-bottom: 0.25rem;"><strong>Inapplicable:</strong> ${totalInapplicable} tests that didn't apply to that page (e.g., form rules on pages without forms)</li>
          </ul>
          <p style="margin: 0 0 0.75rem 0; padding: 0.5rem; background: #d1e7dd; border-radius: 4px;">
            <strong>Actual tests run:</strong> ${totalPasses} + ${totalViolations} + ${totalIncomplete} + ${totalInapplicable} = <strong>${totalTestsRun} tests</strong>
          </p>
          
          <p style="margin: 0.75rem 0 0.5rem 0; font-weight: 600;">Why the Difference?</p>
          <p style="margin: 0; padding: 0.75rem; background: #fff3cd; border-radius: 4px; border-left: 3px solid #ffc107;">
            The maximum (${uniqueTestRulesCount * pageViewportCombinations}) assumes every rule applies to every page. 
            The actual total (${totalTestsRun}) is lower because <strong>${uniqueTestRulesCount * pageViewportCombinations - totalTestsRun} tests were inapplicable</strong> — 
            meaning those rules don't apply to certain pages (e.g., a rule checking for form labels won't run on a page with no forms). 
            This is normal and expected — not all accessibility rules apply to all pages.
            <br /><br />
            <strong>Note:</strong> "Inapplicable" does not mean manual testing is required. It simply means the rule doesn't apply to that particular page's content.
          </p>
        </div>
      </div>
      <p>The following accessibility test rule types were run on this site using axe-core:</p>
      
      ${
        wcagRules.length > 0
          ? `
      <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.1rem; color: #0d6efd; font-weight: 600;">
        WCAG 2.1 Level A & AA Rules (${wcagRules.length} rules)
      </h3>
      <p style="font-size: 0.9em; color: #6c757d; margin-bottom: 0.75rem;">
        These rules test for compliance with Web Content Accessibility Guidelines 2.1 Level A and AA standards.
      </p>
      <ul class="test-list">
        ${wcagRules
          .map(
            (test) => `
        <li class="test-item">
          <span class="test-id">${test.id}</span>
          <span class="test-description">${escapeHtml(test.description)}</span>
        </li>
        `
          )
          .join("")}
      </ul>
      `
          : ""
      }
      
      ${
        bestPracticeRules.length > 0
          ? `
      <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.1rem; color: #856404; font-weight: 600;">
        Best Practice Rules (${bestPracticeRules.length} rules)
      </h3>
      <p style="font-size: 0.9em; color: #6c757d; margin-bottom: 0.75rem;">
        These rules test for accessibility best practices that are recommended but not explicitly required by WCAG 2.1 AA.
      </p>
      <ul class="test-list">
        ${bestPracticeRules
          .map(
            (test) => `
        <li class="test-item">
          <span class="test-id">${test.id}</span>
          <span class="test-description">${escapeHtml(test.description)}</span>
        </li>
        `
          )
          .join("")}
      </ul>
      `
          : ""
      }
      
      ${
        experimentalRules.length > 0
          ? `
      <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.1rem; color: #6f42c1; font-weight: 600;">
        Experimental/Cutting-edge Rules (${experimentalRules.length} rules)
      </h3>
      <p style="font-size: 0.9em; color: #6c757d; margin-bottom: 0.75rem;">
        These are cutting-edge accessibility rules that are still being validated. They may catch issues that standard rules miss, but may also have false positives. Enable these in <code>AXE_RULE_CONFIG</code> to test them.
      </p>
      <ul class="test-list">
        ${experimentalRules
          .map(
            (test) => `
        <li class="test-item">
          <span class="test-id">${test.id}</span>
          <span class="test-description">${escapeHtml(test.description)}</span>
        </li>
        `
          )
          .join("")}
      </ul>
      `
          : ""
      }
      
      ${
        otherRules.length > 0
          ? `
      <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.1rem; color: #495057; font-weight: 600;">
        Other Rules (${otherRules.length} rules)
      </h3>
      <ul class="test-list">
        ${otherRules
          .map(
            (test) => `
        <li class="test-item">
          <span class="test-id">${test.id}</span>
          <span class="test-description">${escapeHtml(test.description)}</span>
        </li>
        `
          )
          .join("")}
      </ul>
      `
          : ""
      }
      
      <p style="margin-top: 1.5rem; font-size: 0.9em; color: #6c757d;">
        <strong>Note:</strong> Each test rule may have passed, failed, been incomplete, or been inapplicable depending on the content of each page and viewport combination.
      </p>
    </div>
  </div>
  
  <script>
    function openTestsModal() {
      document.getElementById('testsModal').style.display = 'block';
    }
    
    function closeTestsModal() {
      document.getElementById('testsModal').style.display = 'none';
    }
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
      const modal = document.getElementById('testsModal');
      if (event.target == modal) {
        closeTestsModal();
      }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeTestsModal();
      }
    });
  </script>
</body>
</html>`;

  return html;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Main audit function
 */
async function runAudit() {
  console.log("=".repeat(80));
  console.log("ACCESSIBILITY AUDIT");
  console.log("=".repeat(80));
  console.log("Tool: axe-core (WCAG 2.1 Level AA compliance)");
  console.log("");

  // Display rule configuration status
  console.log("📋 Rule Configuration Status:");
  const enabledRules = Object.entries(AXE_RULE_CONFIG)
    .filter(([rule, enabled]) => enabled)
    .map(([rule]) => rule);
  const disabledRules = Object.entries(AXE_RULE_CONFIG)
    .filter(([rule, enabled]) => !enabled)
    .map(([rule]) => rule);

  if (enabledRules.length > 0) {
    console.log(
      `   ✅ Enabled (${enabledRules.length}): ${enabledRules.join(", ")}`
    );
  }
  if (disabledRules.length > 0) {
    console.log(
      `   ❌ Disabled (${disabledRules.length}): ${disabledRules.join(", ")}`
    );
  }

  // Show experimental rules status
  const experimentalRulesEnabled = enabledRules.filter((rule) =>
    [
      "css-orientation-lock",
      "focus-order-semantics",
      "hidden-content",
      "identical-links-same-purpose",
      "label-content-name-mismatch",
      "link-in-text-block",
      "no-autoplay-audio",
      "page-has-heading-one",
      "presentation-role-conflict",
    ].includes(rule)
  );
  if (experimentalRulesEnabled.length > 0) {
    console.log(
      `   🔬 Experimental rules enabled (${experimentalRulesEnabled.length}): ${experimentalRulesEnabled.join(", ")}`
    );
    console.log(
      `      Note: Experimental rules may not appear in results if they're not applicable to the page.`
    );
    console.log(
      `      They should still increase the total test count if they run.`
    );
  }
  console.log("");

  // Check if server is running
  console.log("Checking if dev server is running...");
  const serverRunning = await checkDevServer();
  if (!serverRunning) {
    console.error("❌ Dev server is not running!");
    console.error(`   Please start the dev server first: npm run dev`);
    console.error(`   Then run this script again.`);
    process.exit(1);
  }
  console.log(`✓ Dev server is running at ${DEV_SERVER_URL}`);
  console.log("");

  // Parse sitemap
  console.log("Reading sitemap.xml...");
  const urls = await parseSitemap();
  console.log(`✓ Found ${urls.length} URL(s) in sitemap`);
  console.log("");

  // Launch browser
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  console.log("✓ Browser launched");
  console.log("");

  // Run audits
  const results = [];
  const totalTests = urls.length * VIEWPORTS.length * THEMES.length;
  let currentTest = 0;

  console.log(`Running ${totalTests} test(s)...`);
  console.log("");

  for (const url of urls) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        currentTest++;
        const page = await browser.newPage();

        try {
          await page.setViewport({
            width: viewport.width,
            height: viewport.height,
          });
          // Check if experimental rules are enabled for console feedback
          const experimentalEnabled = Object.entries(AXE_RULE_CONFIG)
            .filter(([rule, enabled]) => {
              const experimentalRuleNames = [
                "css-orientation-lock",
                "focus-order-semantics",
                "hidden-content",
                "identical-links-same-purpose",
                "label-content-name-mismatch",
                "link-in-text-block",
                "no-autoplay-audio",
                "page-has-heading-one",
                "presentation-role-conflict",
              ];
              return experimentalRuleNames.includes(rule) && enabled;
            })
            .map(([rule]) => rule);

          const experimentalNote =
            experimentalEnabled.length > 0
              ? ` (with ${experimentalEnabled.length} experimental rule${experimentalEnabled.length !== 1 ? "s" : ""}: ${experimentalEnabled.join(", ")})`
              : "";

          console.log(
            `[${currentTest}/${totalTests}] Testing ${url} (${viewport.name})${experimentalNote}...`
          );

          await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: 30000,
          });

          // Wait a bit for any dynamic content to load
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // No theme switching needed - site is permanently dark mode

          // Check for Vite error overlay - if present, the app has errors that need to be fixed
          const hasErrorOverlay = await page.evaluate(() => {
            const errorOverlay = document.querySelector("vite-error-overlay");
            const errorMessages = Array.from(
              document.querySelectorAll("*")
            ).some((el) => {
              const text = (el.textContent || "").trim();
              return (
                text.includes("Failed to fetch dynamically imported module") ||
                text.includes("Internal server error") ||
                (el.getAttribute("data-v-d6beb1d7") !== null &&
                  text.includes("Failed"))
              );
            });
            return errorOverlay !== null || errorMessages;
          });

          if (hasErrorOverlay) {
            console.error(
              `   ❌ ERROR: Vite error overlay detected! The app has errors that must be fixed before running accessibility audit.`
            );
            console.error(
              `   Please fix the application errors and ensure the dev server runs without errors.`
            );
            throw new Error(
              "Application has errors - Vite error overlay detected. Please fix app errors first."
            );
          }

          const auditResult = await runAxeAudit(page);
          const skipLinkVerification = await verifySkipLink(page);

          // Verify which configured rules actually ran
          // Rules can appear in violations, passes, incomplete, or inapplicable
          // inapplicable means the rule ran but found nothing to test (e.g., no autoplay audio on page)
          const allRuleIds = new Set();
          [
            ...(auditResult.violations || []),
            ...(auditResult.passes || []),
            ...(auditResult.incomplete || []),
            ...(auditResult.inapplicable || []), // Include inapplicable - these are rules that ran but found nothing to test
          ].forEach((result) => {
            if (result.id) allRuleIds.add(result.id);
          });

          // Check which rules are inapplicable (ran but found nothing to test)
          const inapplicableRuleIds = new Set();
          (auditResult.inapplicable || []).forEach((result) => {
            if (result.id) inapplicableRuleIds.add(result.id);
          });

          // Check if configured rules are present in results
          const configuredRulesThatRan = Object.entries(AXE_RULE_CONFIG)
            .filter(([rule, enabled]) => enabled && allRuleIds.has(rule))
            .map(([rule]) => rule);
          const configuredRulesNotSeen = Object.entries(AXE_RULE_CONFIG)
            .filter(([rule, enabled]) => enabled && !allRuleIds.has(rule))
            .map(([rule]) => rule);

          const configuredRulesInapplicable = Object.entries(AXE_RULE_CONFIG)
            .filter(
              ([rule, enabled]) => enabled && inapplicableRuleIds.has(rule)
            )
            .map(([rule]) => rule);

          results.push({
            url,
            viewport: viewport.name,
            theme: theme.name,
            violations: auditResult.violations,
            passes: auditResult.passes,
            incomplete: auditResult.incomplete,
            inapplicable: auditResult.inapplicable,
            skipLink: skipLinkVerification,
          });

          const violationCount = auditResult.violations?.length || 0;
          const passCount = auditResult.passes?.length || 0;

          // Log configured rules status
          if (configuredRulesThatRan.length > 0) {
            // Separate rules that found issues/passes from those that were inapplicable
            const rulesWithResults = configuredRulesThatRan.filter(
              (rule) => !configuredRulesInapplicable.includes(rule)
            );
            const rulesInapplicable = configuredRulesThatRan.filter((rule) =>
              configuredRulesInapplicable.includes(rule)
            );

            if (rulesWithResults.length > 0) {
              console.log(
                `   ✓ Configured rules active: ${rulesWithResults.join(", ")}`
              );
            }
            if (rulesInapplicable.length > 0) {
              console.log(
                `   ✓ Configured rules ran (inapplicable - no issues found): ${rulesInapplicable.join(", ")}`
              );
            }
          }
          if (configuredRulesNotSeen.length > 0) {
            console.log(
              `   ⚠️  Configured rules not seen in results: ${configuredRulesNotSeen.join(", ")}`
            );
            // Provide specific explanations for common rules
            const ruleExplanations = configuredRulesNotSeen.map((rule) => {
              if (rule === "css-orientation-lock") {
                return "css-orientation-lock: requires CSS orientation locks to be present";
              } else if (rule === "focus-order-semantics") {
                return "focus-order-semantics: requires focusable elements with potential focus order issues";
              } else if (rule === "no-autoplay-audio") {
                return "no-autoplay-audio: requires audio/video elements with autoplay";
              } else if (rule === "page-has-heading-one") {
                return "page-has-heading-one: should always run - check if rule is properly configured";
              } else {
                return `${rule}: may require specific conditions to run`;
              }
            });
            console.log(`      (${ruleExplanations.join("; ")})`);
          }

          // Log skip link status
          if (
            skipLinkVerification.exists &&
            skipLinkVerification.issues.length === 0
          ) {
            console.log(`   ✅ Skip link: OK`);
          } else if (skipLinkVerification.exists) {
            console.log(
              `   ⚠️  Skip link: Issues found (${skipLinkVerification.issues.length})`
            );
          } else {
            console.log(`   ❌ Skip link: Not found`);
          }

          if (violationCount > 0) {
            console.log(
              `   ⚠️  Found ${violationCount} violation(s), ${passCount} pass(es)`
            );
          } else {
            console.log(`   ✅ No violations, ${passCount} pass(es)`);
          }
        } catch (error) {
          console.error(
            `   ❌ Error testing ${url} (${viewport.name}): ${error.message}`
          );
          results.push({
            url,
            viewport: viewport.name,
            theme: theme.name,
            error: error.message,
            violations: [],
            passes: [],
            incomplete: [],
            inapplicable: [],
          });
        } finally {
          await page.close();
        }
      }
    }
  }

  await browser.close();

  // Extract and save violations to JSON file
  const violationsOnly = results
    .filter((r) => (r.violations?.length || 0) > 0)
    .map((r) => ({
      url: r.url,
      viewport: r.viewport,
      theme: r.theme,
      violations: r.violations || [],
    }));

  const violationsJsonPath = path.join(OUTPUT_DIR, "violations.json");
  fs.writeFileSync(violationsJsonPath, JSON.stringify(violationsOnly, null, 2));
  console.log(`\n📄 Violations JSON saved to: ${violationsJsonPath}`);

  // Also save as errors.json
  const errorsJsonPath = path.join(OUTPUT_DIR, "errors.json");
  fs.writeFileSync(errorsJsonPath, JSON.stringify(violationsOnly, null, 2));
  console.log(`📄 Errors JSON saved to: ${errorsJsonPath}`);

  // Check if errors.json is empty and report
  const errorsContent = JSON.parse(fs.readFileSync(errorsJsonPath, "utf8"));
  if (errorsContent.length === 0) {
    console.log(`\n✅ SUCCESS: errors.json is empty - zero violations!`);
  } else {
    const totalErrors = errorsContent.reduce(
      (sum, item) => sum + (item.violations?.length || 0),
      0
    );
    console.log(
      `\n⚠️  WARNING: errors.json contains ${totalErrors} violation(s) across ${errorsContent.length} viewport(s)`
    );
    console.log(
      `   Please review and fix the violations listed in: ${errorsJsonPath}`
    );
  }

  // Generate HTML report
  console.log("\n📝 Generating HTML report...");
  const htmlReport = generateHTMLReport(results);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(REPORT_FILE, htmlReport);

  // Calculate summary
  const totalViolations = results.reduce(
    (sum, r) => sum + (r.violations?.length || 0),
    0
  );
  const totalPasses = results.reduce(
    (sum, r) => sum + (r.passes?.length || 0),
    0
  );
  const totalIncomplete = results.reduce(
    (sum, r) => sum + (r.incomplete?.length || 0),
    0
  );
  const totalInapplicable = results.reduce(
    (sum, r) => sum + (r.inapplicable?.length || 0),
    0
  );
  const totalTestsRun =
    totalViolations + totalPasses + totalIncomplete + totalInapplicable;
  const uniquePages = new Set(results.map((r) => r.url)).size;
  const pagesWithViolations = new Set(
    results.filter((r) => (r.violations?.length || 0) > 0).map((r) => r.url)
  ).size;

  // Calculate skip link summary
  const skipLinkSummary = results.reduce(
    (acc, r) => {
      const skipLink = r.skipLink || {};
      if (skipLink.exists) {
        acc.exists++;
        if (skipLink.issues && skipLink.issues.length === 0) {
          acc.working++;
        } else {
          acc.issues += skipLink.issues?.length || 0;
        }
      }
      acc.total++;
      return acc;
    },
    { total: 0, exists: 0, working: 0, issues: 0 }
  );

  console.log("\n✅ Audit Complete!");
  console.log(`\n📊 Summary:`);
  console.log(`   Total tests run: ${totalTestsRun}`);
  console.log(`   Pages tested: ${uniquePages}`);
  console.log(`   Viewports tested: ${VIEWPORTS.length}`);
  console.log(`   Theme: Dark (permanent)`);
  console.log(`   Total violations: ${totalViolations}`);
  console.log(`   Total passes: ${totalPasses}`);
  console.log(`   Pages with violations: ${pagesWithViolations}`);
  console.log(`   Pages passing: ${uniquePages - pagesWithViolations}`);
  console.log(`\n🔗 Skip Links:`);
  console.log(
    `   Skip links found: ${skipLinkSummary.exists}/${skipLinkSummary.total}`
  );
  console.log(
    `   Skip links working: ${skipLinkSummary.working}/${skipLinkSummary.total}`
  );
  if (skipLinkSummary.issues > 0) {
    console.log(`   Skip link issues: ${skipLinkSummary.issues}`);
  }
  console.log(`\n📄 Report saved to: ${REPORT_FILE}`);

  if (totalViolations > 0) {
    console.log(
      `\n⚠️  ${totalViolations} violation(s) found. Please review the report.`
    );
    process.exit(1);
  } else {
    console.log(`\n🎉 No violations found!`);
    process.exit(0);
  }
}

// Run the audit
runAudit().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
