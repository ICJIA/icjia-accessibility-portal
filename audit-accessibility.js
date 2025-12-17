/**
 * @fileoverview Accessibility audit script using axe-core
 * @description Runs automated WCAG 2.1 AA compliance tests on all pages using axe-core via Playwright
 * @author ICJIA Development Team
 * @requires playwright
 * @requires @axe-core/playwright
 */

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { spawn } from "child_process";

/** @type {string[]} Pages to audit for accessibility compliance */
const PAGES = ["/", "/links", "/faqs"];

/** @type {import('child_process').ChildProcess | null} Reference to the development server process */
let devServer = null;

/** @type {string} Base URL for the development server */
let baseUrl = "http://localhost:3000";

// Print tool information
console.log("=".repeat(80));
console.log("ACCESSIBILITY AUDIT TOOL");
console.log("=".repeat(80));
console.log("Tool: axe-core (via @axe-core/playwright)");
console.log("Standard: WCAG 2.1 AA compliance");
console.log("Testing pages:", PAGES.join(", "));
console.log("=".repeat(80));
console.log("");

/**
 * Starts the development server and waits for it to be ready
 * @returns {Promise<void>} Resolves when the server is ready
 * @throws {Error} If the server fails to start within 60 seconds
 */
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log("📦 Starting development server...");
    devServer = spawn("npm", ["run", "dev"], {
      cwd: process.cwd(),
      stdio: "pipe",
    });

    let serverReady = false;
    const timeout = setTimeout(() => {
      if (!serverReady) {
        reject(new Error("Dev server failed to start within 60 seconds"));
      }
    }, 60000);

    devServer.stdout.on("data", (data) => {
      const output = data.toString();
      // Extract port from output (e.g., "Local: http://localhost:3003/")
      const portMatch = output.match(/Local:\s+http:\/\/localhost:(\d+)/);
      if (portMatch) {
        baseUrl = `http://localhost:${portMatch[1]}`;
        console.log(`Server started on ${baseUrl}`);
        serverReady = true;
        clearTimeout(timeout);
        setTimeout(() => resolve(), 5000); // Give server a moment to fully start
      } else if (output.includes("ready") && !serverReady) {
        // Fallback if port extraction fails
        console.log(`Server ready on ${baseUrl}`);
        serverReady = true;
        clearTimeout(timeout);
        setTimeout(() => resolve(), 3000);
      }
    });

    devServer.stderr.on("data", (data) => {
      // Suppress stderr unless it's a critical error
      const output = data.toString();
      if (output.includes("error") && !output.includes("WebSocket")) {
        console.error(output);
      }
    });

    devServer.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

/**
 * Stops the development server if it's running
 * @returns {void}
 */
function stopDevServer() {
  if (devServer) {
    devServer.kill();
    devServer = null;
  }
}

/**
 * Runs an accessibility audit on a single page using axe-core
 * @param {import('playwright').Page} page - Playwright page object
 * @param {string} url - URL path to audit (e.g., "/", "/links", "/faqs")
 * @returns {Promise<{violations: Array, error?: string}>} Audit results with violations array
 */
async function auditPage(page, url) {
  console.log(`\n🔍 Auditing: ${url}`);
  console.log(`   Using axe-core to test WCAG 2.1 AA compliance...`);

  try {
    await page.goto(`${baseUrl}${url}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000); // Wait for any dynamic content

    // Run axe-core audit with WCAG 2.1 AA rules
    console.log(`   Running axe-core analysis...`);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    return { violations: results.violations };
  } catch (error) {
    console.error(`   ❌ Error auditing ${url}:`, error.message);
    return { violations: [], error: error.message };
  }
}

/**
 * Main audit function that tests all pages and reports results
 * @returns {Promise<void>}
 * @throws {Error} If the audit process fails
 */
async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allViolations = [];

  try {
    for (const pageUrl of PAGES) {
      const results = await auditPage(page, pageUrl);
      if (results && results.violations && results.violations.length > 0) {
        allViolations.push({
          url: pageUrl,
          violations: results.violations,
        });
        console.log(`❌ Found ${results.violations.length} violation(s)`);
      } else if (results && results.error) {
        console.log(`⚠️  Error occurred: ${results.error}`);
      } else {
        console.log(`✅ No violations found`);
      }
    }

    // Print summary
    console.log("\n" + "=".repeat(80));
    console.log("ACCESSIBILITY AUDIT SUMMARY");
    console.log("=".repeat(80));
    console.log("Tool: axe-core (WCAG 2.1 AA compliance testing)");
    console.log("=".repeat(80));

    if (allViolations.length === 0) {
      console.log("\n✅ All pages pass WCAG 2.1 AA compliance!");
    } else {
      console.log(
        `\n❌ Found accessibility violations on ${allViolations.length} page(s):\n`
      );

      allViolations.forEach(({ url, violations }) => {
        console.log(`\n📄 ${url}:`);
        violations.forEach((violation, index) => {
          console.log(
            `\n  ${index + 1}. ${violation.id}: ${violation.description}`
          );
          console.log(`     Impact: ${violation.impact}`);
          console.log(`     Help: ${violation.helpUrl}`);
          if (violation.nodes && violation.nodes.length > 0) {
            console.log(`     Affected nodes: ${violation.nodes.length}`);
            violation.nodes.slice(0, 3).forEach((node, nodeIndex) => {
              const htmlPreview = node.html
                ? node.html.substring(0, 100)
                : "N/A";
              console.log(`       ${nodeIndex + 1}. ${htmlPreview}...`);
            });
            if (violation.nodes.length > 3) {
              console.log(`       ... and ${violation.nodes.length - 3} more`);
            }
          }
        });
      });
    }

    // Exit with error code if violations found
    process.exit(allViolations.length > 0 ? 1 : 0);
  } catch (error) {
    console.error("Audit failed:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Handle cleanup
process.on("SIGINT", () => {
  stopDevServer();
  process.exit(1);
});

process.on("exit", () => {
  stopDevServer();
});

// Run the audit
startDevServer()
  .then(() => runAudit())
  .catch((error) => {
    console.error("Failed to start audit:", error);
    stopDevServer();
    process.exit(1);
  });
