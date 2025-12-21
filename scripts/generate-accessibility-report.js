#!/usr/bin/env node
/**
 * @fileoverview Accessibility audit report generator
 * @description Reads sitemap.xml, runs axe-core accessibility checks on all pages,
 * and generates an HTML report with WCAG 2.1 AA compliance status
 *
 * Configuration:
 * - Set SITE_URL environment variable to override base URL
 * - Set SERVER_PORT environment variable to override server port to check
 * - Modify CONFIG object below to change sitemap path or output path
 *
 * Note: This script requires a server to be running. Start the server first with:
 *   - npm run generate:serve (for generated static site)
 *   - npm run preview (for preview server)
 *   - npm run dev (for development server)
 *
 * @author ICJIA
 */

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

/**
 * Configuration - can be customized per site
 * @type {Object}
 */
const CONFIG = {
  // Path to sitemap.xml (relative to project root)
  sitemapPath: join(projectRoot, "public", "sitemap.xml"),
  // Output path for HTML report (relative to project root)
  outputPath: join(
    projectRoot,
    "public",
    "docs",
    "accessibility",
    "index.html"
  ),
  // Base URL for the site (will be extracted from sitemap or detected from running server)
  baseUrl: process.env.SITE_URL || "http://localhost:3000",
  // Server port to check (will also try common ports if this one doesn't work)
  serverPort: process.env.SERVER_PORT || "3000",
  // Wait time for page load (ms)
  pageLoadTimeout: 5000,
};

/**
 * Parse sitemap.xml and extract all URLs
 * @returns {Promise<string[]>} Array of URL paths
 */
async function parseSitemap() {
  const sitemapPath = CONFIG.sitemapPath;

  if (!existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found at ${sitemapPath}`);
  }

  const sitemapContent = readFileSync(sitemapPath, "utf-8");
  const urls = [];

  // Extract URLs from sitemap.xml
  const urlMatches = sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g);
  for (const match of urlMatches) {
    const fullUrl = match[1];
    // Extract path from full URL (ignore the domain, we'll use the detected server)
    try {
      const url = new URL(fullUrl);
      urls.push(url.pathname || "/");
    } catch {
      // If it's already a path, use it directly
      urls.push(fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`);
    }
  }

  // Don't extract base URL from sitemap - we'll use the detected running server
  // The baseUrl will be set by verifyServerRunning() before this is called

  return [...new Set(urls)].sort(); // Remove duplicates and sort
}

/**
 * Check if server is already running
 * @param {string} url - URL to test
 * @returns {Promise<boolean>}
 */
async function checkServerRunning(url) {
  try {
    const http = await import("http");
    return new Promise((resolve) => {
      const req = http.get(url, { timeout: 2000 }, () => {
        resolve(true);
      });
      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
    });
  } catch {
    return false;
  }
}

/**
 * Verify server is running and get the base URL
 * Prioritizes dev server (port 3000) first, then checks other common ports
 * @returns {Promise<string>} Base URL of the running server
 * @throws {Error} If server is not running
 */
async function verifyServerRunning() {
  // Prioritize dev server (port 3000) first, then check other ports
  const portsToCheck = ["3000", "5150", "4173", "3003"];

  // Remove the configured port from the list if it's already there, we'll check it in order
  const uniquePorts = [...new Set([...portsToCheck, CONFIG.serverPort])];

  console.log("Checking for running server...");

  for (const port of uniquePorts) {
    const url = `http://localhost:${port}`;
    const running = await checkServerRunning(url);
    if (running) {
      console.log(`✓ Server is running at ${url}`);
      return url;
    }
  }

  // Server not running - error out
  throw new Error(
    `\n❌ Server is not running!\n\n` +
      `Please start the server first:\n` +
      `  • For dev server: yarn dev (port 3000)\n` +
      `  • For generated site: yarn generate:serve (port 5150)\n` +
      `  • For preview: yarn preview (port 3000)\n\n` +
      `Then run the accessibility report again.\n`
  );
}

/**
 * Run accessibility audit on a single page
 * @param {import('playwright').Page} page - Playwright page object
 * @param {string} path - URL path to audit
 * @returns {Promise<{path: string, violations: Array, passed: boolean, error?: string}>}
 */
async function auditPage(page, path) {
  const url = `${CONFIG.baseUrl}${path === "/" ? "" : path}`;
  console.log(`  🔍 Auditing: ${path} (${url})`);

  try {
    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: CONFIG.pageLoadTimeout,
    });

    // Check if we got redirected
    const finalUrl = page.url();
    if (finalUrl !== url) {
      console.log(`  ⚠️  Redirected from ${url} to ${finalUrl}`);
    }

    // Check response status
    if (response) {
      const status = response.status();
      console.log(`  📊 Response status: ${status}`);
      if (status === 404) {
        console.log(`  ❌ Page not found (404) - route may not exist`);
        console.log(
          `  💡 Try accessing ${url} manually in your browser to verify it works.`
        );
        return {
          path,
          url,
          violations: [],
          passed: false,
          error:
            "Page not found (404) - route may not exist. Try restarting the dev server.",
          timestamp: new Date().toISOString(),
        };
      }
      if (status !== 200) {
        console.log(`  ⚠️  Warning: Non-200 status code: ${status}`);
      }
    } else {
      console.log(`  ⚠️  Warning: No response object received`);
    }

    await page.waitForTimeout(2000); // Wait for dynamic content

    // Wait a bit more for Vue to fully render
    await page.waitForTimeout(1000);

    // Run axe-core analysis
    let axeBuilder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
    ]);

    const results = await axeBuilder.analyze();

    const passed = results.violations.length === 0;
    console.log(
      `  ${passed ? "✅" : "❌"} ${passed ? "Passed" : `Found ${results.violations.length} violation(s)`}`
    );

    return {
      path,
      url,
      violations: results.violations,
      passed,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return {
      path,
      url,
      violations: [],
      passed: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Generate HTML report from audit results
 * @param {Array} results - Array of audit results
 * @param {Date} reportDate - Date when report was generated
 * @returns {string} HTML content
 */
function generateHTMLReport(results, reportDate) {
  const totalPages = results.length;
  const passedPages = results.filter((r) => r.passed).length;
  const failedPages = totalPages - passedPages;
  const totalViolations = results.reduce(
    (sum, r) => sum + r.violations.length,
    0
  );
  const allPassed = failedPages === 0;

  // Calculate violation counts by impact
  const violationsByImpact = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
  };

  results.forEach((result) => {
    result.violations.forEach((violation) => {
      const impact = violation.impact || "minor";
      if (violationsByImpact[impact] !== undefined) {
        violationsByImpact[impact]++;
      }
    });
  });

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date);
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Audit Report - WCAG 2.1 AA Compliance</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-primary: #0F172A;
      --bg-surface: #1E293B;
      --bg-surface-variant: #1A2332;
      --text-primary: #F8FAFC;
      --text-secondary: #CBD5E1;
      --accent: #60A5FA;
      --accent-dark: #3B82F6;
      --success: #81C784;
      --error: #CF6679;
      --warning: #FFB74D;
      --border: rgba(96, 165, 250, 0.2);
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      padding: 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      background: var(--bg-surface);
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 1px solid var(--border);
    }

    h1 {
      color: var(--accent);
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .timestamp {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .summary-card {
      background: var(--bg-surface);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .summary-card h3 {
      font-size: 0.9rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .summary-card .value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--text-primary);
    }

    .summary-card.success .value {
      color: var(--success);
    }

    .summary-card.error .value {
      color: var(--error);
    }

    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    .status-badge.passed {
      background: rgba(129, 199, 132, 0.2);
      color: var(--success);
      border: 1px solid var(--success);
    }

    .status-badge.failed {
      background: rgba(207, 102, 121, 0.2);
      color: var(--error);
      border: 1px solid var(--error);
    }

    .pages-section {
      background: var(--bg-surface);
      padding: 2rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      margin-bottom: 2rem;
    }

    .pages-section h2 {
      color: var(--accent);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .page-result {
      background: var(--bg-surface-variant);
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      border-left: 4px solid var(--border);
    }

    .page-result.passed {
      border-left-color: var(--success);
    }

    .page-result.failed {
      border-left-color: var(--error);
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .page-path {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .page-url {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-family: monospace;
      margin-top: 0.25rem;
    }

    .page-url a {
      color: var(--accent);
      text-decoration: none;
      transition: opacity 0.2s ease;
    }

    .page-url a:hover {
      opacity: 0.8;
      text-decoration: underline;
    }

    .page-url a:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
      border-radius: 4px;
    }

    .violations-list {
      margin-top: 1rem;
    }

    .violation {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      border: 1px solid var(--border);
    }

    .violation-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.5rem;
    }

    .violation-id {
      font-weight: 600;
      color: var(--accent);
      font-family: monospace;
    }

    .violation-impact {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .violation-impact.critical {
      background: rgba(207, 102, 121, 0.3);
      color: var(--error);
    }

    .violation-impact.serious {
      background: rgba(255, 183, 77, 0.3);
      color: var(--warning);
    }

    .violation-impact.moderate {
      background: rgba(255, 183, 77, 0.2);
      color: var(--warning);
    }

    .violation-impact.minor {
      background: rgba(96, 165, 250, 0.2);
      color: var(--accent);
    }

    .violation-description {
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .violation-help {
      margin-top: 0.5rem;
    }

    .violation-help a {
      color: var(--accent);
      text-decoration: none;
    }

    .violation-help a:hover {
      text-decoration: underline;
    }

    .violation-nodes {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
    }

    .violation-node {
      background: var(--bg-surface);
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      font-family: monospace;
      font-size: 0.85rem;
      color: var(--text-secondary);
      overflow-x: auto;
    }

    .error-message {
      background: rgba(207, 102, 121, 0.2);
      border: 1px solid var(--error);
      color: var(--error);
      padding: 1rem;
      border-radius: 6px;
      margin-top: 1rem;
    }

    footer {
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
    }

    .tool-info {
      background: var(--bg-surface);
      padding: 2rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .tool-info h3 {
      color: var(--accent);
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .tool-info p {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .tool-info a {
      color: var(--accent);
      text-decoration: none;
    }

    .tool-info a:hover {
      text-decoration: underline;
    }

    .tool-info ul {
      text-align: left;
      max-width: 800px;
      margin: 1rem auto;
      color: var(--text-secondary);
      line-height: 1.8;
      padding-left: 2rem;
    }

    .tool-info li {
      margin-bottom: 0.75rem;
    }

    .tool-info li strong {
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }

      .summary {
        grid-template-columns: 1fr;
      }

      .page-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 Accessibility Audit Report</h1>
      <p class="subtitle">WCAG 2.1 AA Compliance Testing</p>
      <div class="timestamp">Generated: ${formatDate(reportDate)}</div>
      <div class="status-badge ${allPassed ? "passed" : "failed"}">
        ${allPassed ? "✅ All Pages Pass WCAG 2.1 AA" : "❌ Accessibility Issues Found"}
      </div>
    </header>

    <div class="summary">
      <div class="summary-card">
        <h3>Total Pages</h3>
        <div class="value">${totalPages}</div>
      </div>
      <div class="summary-card success">
        <h3>Pages Passed</h3>
        <div class="value">${passedPages}</div>
      </div>
      <div class="summary-card ${failedPages > 0 ? "error" : ""}">
        <h3>Pages Failed</h3>
        <div class="value">${failedPages}</div>
      </div>
      <div class="summary-card ${totalViolations > 0 ? "error" : ""}">
        <h3>Total Violations</h3>
        <div class="value">${totalViolations}</div>
      </div>
    </div>

    ${
      totalViolations > 0
        ? `
    <div class="summary">
      <div class="summary-card ${violationsByImpact.critical > 0 ? "error" : ""}">
        <h3>Critical</h3>
        <div class="value">${violationsByImpact.critical}</div>
      </div>
      <div class="summary-card ${violationsByImpact.serious > 0 ? "error" : ""}">
        <h3>Serious</h3>
        <div class="value">${violationsByImpact.serious}</div>
      </div>
      <div class="summary-card ${violationsByImpact.moderate > 0 ? "" : ""}">
        <h3>Moderate</h3>
        <div class="value">${violationsByImpact.moderate}</div>
      </div>
      <div class="summary-card">
        <h3>Minor</h3>
        <div class="value">${violationsByImpact.minor}</div>
      </div>
    </div>
    `
        : ""
    }

    <div class="pages-section">
      <h2>Page Results</h2>
      ${results
        .map(
          (result) => `
      <div class="page-result ${result.passed ? "passed" : "failed"}">
        <div class="page-header">
          <div>
            <div class="page-path">${result.passed ? "✅" : "❌"} ${escapeHtml(result.path)}</div>
            <div class="page-url">
              <a href="${escapeHtml(result.path)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(result.path)} in new tab">
                ${escapeHtml(result.path)}
              </a>
            </div>
          </div>
          <div class="status-badge ${result.passed ? "passed" : "failed"}">
            ${result.passed ? "Passed" : `${result.violations.length} violation(s)`}
          </div>
        </div>
        ${
          result.error
            ? `
        <div class="error-message">
          <strong>Error:</strong> ${result.error}
        </div>
        `
            : ""
        }
        ${
          result.violations.length > 0
            ? `
        <div class="violations-list">
          ${result.violations
            .map(
              (violation) => `
          <div class="violation">
            <div class="violation-header">
              <span class="violation-id">${violation.id}</span>
              <span class="violation-impact ${violation.impact || "minor"}">${(violation.impact || "minor").toUpperCase()}</span>
            </div>
            <div class="violation-description">${violation.description}</div>
            <div class="violation-help">
              <a href="${violation.helpUrl}" target="_blank" rel="noopener noreferrer">Learn more →</a>
            </div>
            ${
              violation.nodes && violation.nodes.length > 0
                ? `
            <div class="violation-nodes">
              <strong>Affected Elements (${violation.nodes.length}):</strong>
              ${violation.nodes
                .slice(0, 5)
                .map(
                  (node) => `
              <div class="violation-node">${escapeHtml(node.html || node.target?.join(" ") || "N/A")}</div>
              `
                )
                .join("")}
              ${violation.nodes.length > 5 ? `<div class="violation-node">... and ${violation.nodes.length - 5} more</div>` : ""}
            </div>
            `
                : ""
            }
          </div>
          `
            )
            .join("")}
        </div>
        `
            : result.passed
              ? `
        <div style="color: var(--success); margin-top: 1rem;">
          ✓ This page passes all WCAG 2.1 AA accessibility checks.
        </div>
        `
              : ""
        }
      </div>
      `
        )
        .join("")}
    </div>

    <div class="tool-info">
      <h3>About axe-core</h3>
      <p>
        This accessibility audit was generated using <strong>axe-core</strong>, 
        one of the most comprehensive and trusted accessibility testing tools available. 
        axe-core is developed by Deque Systems and is used by major organizations worldwide 
        to ensure web accessibility compliance.
      </p>
      <p>
        <strong>Why axe-core is considered one of the best accessibility checkers:</strong>
      </p>
      <ul>
        <li><strong>Comprehensive Coverage:</strong> Tests against WCAG 2.1 Level A and AA guidelines, covering over 50 accessibility rules</li>
        <li><strong>Industry Standard:</strong> Used by Google, Microsoft, and thousands of organizations worldwide</li>
        <li><strong>Open Source:</strong> Free, open-source tool with active community support and continuous improvements</li>
        <li><strong>Accurate Results:</strong> Low false-positive rate with detailed, actionable violation reports</li>
        <li><strong>Automated Testing:</strong> Integrates seamlessly with CI/CD pipelines and development workflows</li>
        <li><strong>Browser Integration:</strong> Works with all major browsers and testing frameworks</li>
      </ul>
      <p style="margin-top: 1rem;">
        <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">Learn more about axe-core →</a> | 
        <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer">GitHub Repository →</a>
      </p>
    </div>

    <footer>
      <p>Generated by <strong>axe-core</strong> accessibility testing tool</p>
      <p>WCAG 2.1 AA Compliance Standard</p>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
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
 * Main function
 */
async function main() {
  console.log("");
  console.log("┌" + "─".repeat(78) + "┐");
  console.log(
    "│" +
      " ".repeat(10) +
      "ACCESSIBILITY AUDIT REPORT GENERATOR" +
      " ".repeat(30) +
      "│"
  );
  console.log("└" + "─".repeat(78) + "┘");
  console.log("Tool: axe-core (WCAG 2.1 AA compliance)");
  console.log("");

  try {
    // Verify server is running first (before parsing sitemap)
    const baseUrl = await verifyServerRunning();
    CONFIG.baseUrl = baseUrl;
    console.log(`📍 Using server URL: ${baseUrl}`);
    console.log("");

    // Parse sitemap
    console.log("📄 Reading sitemap.xml...");
    const urls = await parseSitemap();
    console.log(`✓ Found ${urls.length} page(s) in sitemap:`);
    urls.forEach((url) => console.log(`   - ${url}`));
    console.log(
      `   (Will be accessed at: ${baseUrl}${urls[0] || ""}, ${baseUrl}${urls[1] || ""}, etc.)`
    );
    console.log("");

    // Run audits
    console.log("🔍 Running accessibility audits...");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const results = [];
    for (const urlPath of urls) {
      const result = await auditPage(page, urlPath);
      results.push(result);
    }

    await browser.close();
    console.log("");

    // Generate HTML report
    console.log("📝 Generating HTML report...");
    const reportDate = new Date();
    const htmlReport = generateHTMLReport(results, reportDate);

    // Write to public directory (for source and future builds)
    const outputDir = dirname(CONFIG.outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    writeFileSync(CONFIG.outputPath, htmlReport, "utf-8");
    console.log(`✓ Report generated: ${CONFIG.outputPath}`);

    // Also write to .output/public if it exists (for immediate serving)
    // This ensures the report is available when running generate:serve or preview
    const outputPublicPath = join(
      projectRoot,
      ".output",
      "public",
      "docs",
      "accessibility",
      "index.html"
    );
    const outputPublicDir = dirname(outputPublicPath);
    const outputPublicBase = join(projectRoot, ".output", "public");

    if (existsSync(outputPublicBase)) {
      if (!existsSync(outputPublicDir)) {
        mkdirSync(outputPublicDir, { recursive: true });
      }
      writeFileSync(outputPublicPath, htmlReport, "utf-8");
      console.log(`✓ Report also copied to: ${outputPublicPath}`);

      // Also ensure docs/index.html is in output (if it exists in public)
      const docsIndexSource = join(projectRoot, "public", "docs", "index.html");
      const docsIndexOutput = join(
        projectRoot,
        ".output",
        "public",
        "docs",
        "index.html"
      );
      if (existsSync(docsIndexSource)) {
        const docsIndexOutputDir = dirname(docsIndexOutput);
        if (!existsSync(docsIndexOutputDir)) {
          mkdirSync(docsIndexOutputDir, { recursive: true });
        }
        const docsIndexContent = readFileSync(docsIndexSource, "utf-8");
        writeFileSync(docsIndexOutput, docsIndexContent, "utf-8");
      }
    }

    console.log("");

    // Summary
    const passed = results.filter((r) => r.passed).length;
    const failed = results.length - passed;
    const totalViolations = results.reduce(
      (sum, r) => sum + r.violations.length,
      0
    );

    console.log("");
    console.log("┌" + "─".repeat(78) + "┐");
    console.log("│" + " ".repeat(30) + "SUMMARY" + " ".repeat(40) + "│");
    console.log("└" + "─".repeat(78) + "┘");
    console.log(`📊 Total Pages: ${results.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Total Violations: ${totalViolations}`);
    console.log("");

    if (failed === 0) {
      console.log("✅ All pages pass WCAG 2.1 AA compliance!");
    } else {
      console.log(`❌ ${failed} page(s) have accessibility issues.`);
      console.log(`   📄 See report: ${CONFIG.outputPath}`);
    }
    console.log("");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

// Handle cleanup
process.on("SIGINT", () => {
  process.exit(1);
});

main();
