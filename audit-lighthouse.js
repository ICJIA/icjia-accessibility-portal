#!/usr/bin/env node

/**
 * ============================================================================
 * ⚙️ DEVELOPER CONFIGURATION - EDIT THIS SECTION
 * ============================================================================
 *
 * You can safely modify the configuration below. This is the ONLY section
 * you should modify unless you know what you're doing.
 *
 * ⚠️ WARNING: Be careful with anything below this configuration section.
 *             Changes to the rest of the script may break the audit functionality.
 *
 * ============================================================================
 */

/**
 * Target Environment Configuration
 *
 * Choose whether to run the audit against the production server, generated static site, or development server.
 *
 * OPTIONS:
 * - "production" - Tests against the live production server (DEFAULT - recommended for real-world metrics)
 *                  Tests against: https://accessibility.icjia.app
 * - "generated" - Tests against the locally generated static site on port 5150
 *                 Requires running 'yarn generate' first. The script will start a local server
 *                 to serve the generated site from .output/public
 *                 Use this to test optimizations locally before deploying
 * - "development" - Tests against the local development server on port 3000
 *                   The script will start 'yarn dev' if not already running
 *
 * @example
 * // To test against production (default - recommended):
 * const TARGET_ENV = "production";
 *
 * // To test against generated static site (for testing optimizations locally):
 * //const TARGET_ENV = "generated";
 *
 * // To test against local dev server:
 * //const TARGET_ENV = "development";
 */
const TARGET_ENV = "production"; // Default: test against production URL (recommended)
//const TARGET_ENV = "generated"; // Uncomment to test against locally generated static site on port 5150
//const TARGET_ENV = "development"; // Uncomment to test against local dev server on port 3000

/**
 * Production URL Configuration
 *
 * The production URL to test against when TARGET_ENV is set to "production".
 */
const PRODUCTION_URL = "https://accessibility.icjia.app";

/**
 * Server Port Configuration
 *
 * The port number for local servers.
 * - Used for generated static site when TARGET_ENV is "generated" (default: 5150, matches yarn generate:serve port)
 * - Used for development server when TARGET_ENV is "development" (default: 3000)
 */
const LOCAL_SERVER_PORT = 5150; // Port for generated static site (matches yarn generate:serve)
const DEV_SERVER_PORT = 3000; // Port for development server

/**
 * File Paths Configuration
 *
 * Configure where the script should look for the sitemap and where to save reports.
 * All paths are relative to the script's directory (__dirname).
 * These will be constructed after imports are loaded.
 */
const SITEMAP_PATH_CONFIG = "public/sitemap.xml"; // Relative to script directory
const OUTPUT_DIR_CONFIG = "public/docs/lighthouse"; // Relative to script directory
const REPORT_FILE_NAME = "index.html"; // Filename in OUTPUT_DIR
const JSON_REPORT_FILE_NAME = "report.json"; // JSON report filename

/**
 * Lighthouse Configuration
 *
 * Configure which categories to test and other Lighthouse options.
 */
const LIGHTHOUSE_CONFIG = {
  // Categories to test
  categories: {
    performance: true,
    accessibility: true,
    "best-practices": true,
    seo: true,
  },
  // Lighthouse options
  options: {
    // Emulation settings
    emulatedFormFactor: "desktop", // Will be overridden for mobile tests
    // Throttling settings (set to null for no throttling, or use preset)
    throttling: null, // Use null for no throttling, or use Lighthouse presets
    // Other options
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    skipAudits: [], // Add audit IDs to skip if needed
  },
};

/**
 * Device Modes to Test
 *
 * Define which device modes to test. Each mode will be tested for every URL.
 */
const DEVICE_MODES = [
  { name: "desktop", emulatedFormFactor: "desktop" },
  { name: "mobile", emulatedFormFactor: "mobile" },
];

/**
 * Development Server Command
 *
 * The command to start the development server. This is used when TARGET_ENV is "development"
 * and the server is not already running.
 */
const DEV_SERVER_COMMAND = { command: "npm", args: ["run", "dev"] };

/**
 * Site Information Configuration
 *
 * Information about your site for display in the HTML report.
 */
const SITE_INFO = {
  name: "ICJIA Accessibility Portal",
  description:
    "Accessibility compliance portal for Illinois Criminal Justice Information Authority",
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
 * Lighthouse Audit Script
 *
 * This script performs a comprehensive Lighthouse audit:
 * - Configurable to test against development server (default) or production
 * - Automatically starts dev server if not running (when testing development)
 * - Reads URLs from sitemap.xml
 * - Tests each URL in desktop and mobile modes
 * - Tests Performance, Accessibility, Best Practices, and SEO
 * - Generates an HTML report in /public/docs/lighthouse/index.html
 *
 * Usage: npm run audit:lighthouse
 *
 * Configuration: Edit TARGET_ENV, PRODUCTION_URL, LOCAL_SERVER_PORT, and DEV_SERVER_PORT in the
 *                developer configuration section at the top of this file
 */

import lighthouse from "lighthouse";
import { launch as launchChrome } from "chrome-launcher";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import https from "https";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct file paths from configuration
const SITEMAP_PATH = path.join(__dirname, ...SITEMAP_PATH_CONFIG.split("/"));
const OUTPUT_DIR = path.join(__dirname, ...OUTPUT_DIR_CONFIG.split("/"));
const REPORT_FILE = path.join(OUTPUT_DIR, REPORT_FILE_NAME);
const JSON_REPORT_FILE = path.join(OUTPUT_DIR, JSON_REPORT_FILE_NAME);

// Determine base URL based on target environment
const BASE_URL =
  TARGET_ENV === "production"
    ? PRODUCTION_URL
    : TARGET_ENV === "generated"
      ? `http://localhost:${LOCAL_SERVER_PORT}`
      : `http://localhost:${DEV_SERVER_PORT}`;

/**
 * Check if the target server is accessible
 */
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

    req.on("error", () => {
      resolve(false);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Start a static file server for the generated site
 */
async function startGeneratedSiteServer() {
  return new Promise((resolve, reject) => {
    const generatedDir = path.join(__dirname, ".output", "public");

    // Check if generated directory exists
    if (!fs.existsSync(generatedDir)) {
      reject(
        new Error(
          `Generated site not found at ${generatedDir}. Please run 'yarn generate' first.`
        )
      );
      return;
    }

    // Use Node's built-in http server with a simple static file handler
    const server = http.createServer((req, res) => {
      let filePath = path.join(
        generatedDir,
        req.url === "/" ? "index.html" : req.url
      );

      // Handle directory requests
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        // Try index.html for SPA routing
        const indexPath = path.join(generatedDir, "index.html");
        if (fs.existsSync(indexPath)) {
          filePath = indexPath;
        } else {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }
      }

      // Determine content type
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".eot": "application/vnd.ms-fontobject",
      };
      const contentType = contentTypes[ext] || "application/octet-stream";

      // Read and serve file
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error reading file");
          return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
    });

    server.listen(LOCAL_SERVER_PORT, () => {
      resolve(server);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        reject(
          new Error(
            `Port ${LOCAL_SERVER_PORT} is already in use. Please stop the existing server or change LOCAL_SERVER_PORT.`
          )
        );
      } else {
        reject(error);
      }
    });
  });
}

/**
 * Start the development server
 */
async function startDevServer() {
  return new Promise((resolve, reject) => {
    // Spawn the dev server process using configured command
    const devServer = spawn(
      DEV_SERVER_COMMAND.command,
      DEV_SERVER_COMMAND.args,
      {
        cwd: __dirname,
        stdio: "pipe",
        shell: true,
      }
    );

    let serverReady = false;

    // Wait for server to be ready
    const checkReady = setInterval(() => {
      checkServer().then((isReady) => {
        if (isReady && !serverReady) {
          serverReady = true;
          clearInterval(checkReady);
          resolve(devServer);
        }
      });
    }, 1000);

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!serverReady) {
        clearInterval(checkReady);
        devServer.kill();
        reject(new Error("Dev server failed to start within 60 seconds"));
      }
    }, 60000);

    // Handle process output
    devServer.stdout.on("data", (data) => {
      const output = data.toString();
      // Check for common "ready" indicators
      if (
        output.includes("Local:") ||
        output.includes("ready") ||
        output.includes("listening")
      ) {
        // Server is starting, keep checking
      }
    });

    devServer.stderr.on("data", (data) => {
      // Log errors but don't fail immediately
      const error = data.toString();
      if (error.includes("EADDRINUSE")) {
        // Port already in use - might be another instance
        clearInterval(checkReady);
        devServer.kill();
        reject(
          new Error(
            `Port ${LOCAL_SERVER_PORT} is already in use. Please stop the existing server or change LOCAL_SERVER_PORT.`
          )
        );
      }
    });

    devServer.on("error", (error) => {
      clearInterval(checkReady);
      reject(error);
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

    // Convert URLs based on target environment
    return urls.map((url) => {
      try {
        const urlObj = new URL(url);
        if (TARGET_ENV === "production") {
          // Use production URLs as-is
          return url;
        } else {
          // Convert to localhost URLs for development
          return `${BASE_URL}${urlObj.pathname}${urlObj.search}`;
        }
      } catch (e) {
        // If URL parsing fails, assume it's already a path
        if (TARGET_ENV === "production") {
          // Try to construct full URL from path
          return `${BASE_URL}${url.startsWith("/") ? url : "/" + url}`;
        } else {
          return `${BASE_URL}${url.startsWith("/") ? url : "/" + url}`;
        }
      }
    });
  } catch (error) {
    console.error(`❌ Error parsing sitemap: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Run Lighthouse audit on a page
 */
async function runLighthouseAudit(url, deviceMode) {
  const chrome = await launchChrome({ chromeFlags: ["--headless"] });

  // Build options object - only include valid Lighthouse options
  const options = {
    port: chrome.port,
    onlyCategories: LIGHTHOUSE_CONFIG.options.onlyCategories,
    emulatedFormFactor: deviceMode.emulatedFormFactor,
  };

  // Only add optional options if they have valid values
  if (
    LIGHTHOUSE_CONFIG.options.throttling !== null &&
    LIGHTHOUSE_CONFIG.options.throttling !== undefined
  ) {
    options.throttling = LIGHTHOUSE_CONFIG.options.throttling;
  }

  if (
    LIGHTHOUSE_CONFIG.options.skipAudits &&
    LIGHTHOUSE_CONFIG.options.skipAudits.length > 0
  ) {
    options.skipAudits = LIGHTHOUSE_CONFIG.options.skipAudits;
  }

  try {
    const runnerResult = await lighthouse(url, options);

    // Validate the result before killing Chrome
    if (!runnerResult) {
      await chrome.kill();
      throw new Error("Lighthouse returned no result");
    }

    if (!runnerResult.lhr) {
      await chrome.kill();
      console.error("Lighthouse result structure:", Object.keys(runnerResult));
      throw new Error(
        "Lighthouse result missing lhr property. Result keys: " +
          Object.keys(runnerResult).join(", ")
      );
    }

    await chrome.kill();
    return runnerResult;
  } catch (error) {
    await chrome.kill();
    // Re-throw with more context
    if (error.message && !error.message.includes("Lighthouse")) {
      throw new Error(`Lighthouse audit failed: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Convert URL to relative path for display
 */
function urlToRelativePath(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname || "/";
  } catch (e) {
    // If parsing fails, try to extract path from URL
    return url.replace(/https?:\/\/[^\/]+/, "") || "/";
  }
}

/**
 * Get score color class based on score value
 */
function getScoreColorClass(score) {
  if (score === null || score === undefined) return "score-unknown";
  if (score >= 0.9) return "score-good";
  if (score >= 0.5) return "score-warning";
  return "score-bad";
}

/**
 * Get score label
 */
function getScoreLabel(score) {
  if (score === null || score === undefined) return "N/A";
  if (score >= 0.9) return "Good";
  if (score >= 0.5) return "Needs Improvement";
  return "Poor";
}

/**
 * Format score as percentage
 */
function formatScore(score) {
  if (score === null || score === undefined) return "N/A";
  return Math.round(score * 100);
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
 * Generate JSON report from audit results
 * This report is structured for LLM consumption and includes all Lighthouse data
 */
function generateJSONReport(results) {
  const timestamp = new Date().toISOString();

  // Get Lighthouse version from first valid result
  let lighthouseVersion = "Unknown";
  const firstValidResult = results.find((r) => r.lhr);
  if (firstValidResult && firstValidResult.lhr.lighthouseVersion) {
    lighthouseVersion = firstValidResult.lhr.lighthouseVersion;
  }

  // Process results into structured format
  const processedResults = results.map((result) => {
    if (result.error) {
      return {
        url: result.url,
        relativeUrl: urlToRelativePath(result.url),
        deviceMode: result.deviceMode,
        error: result.error,
        timestamp: timestamp,
      };
    }

    const lhr = result.lhr;

    // Extract category scores
    const categories = {
      performance: lhr.categories.performance
        ? {
            score: lhr.categories.performance.score,
            scorePercentage: Math.round(
              (lhr.categories.performance.score || 0) * 100
            ),
            title: lhr.categories.performance.title,
            description: lhr.categories.performance.description,
          }
        : null,
      accessibility: lhr.categories.accessibility
        ? {
            score: lhr.categories.accessibility.score,
            scorePercentage: Math.round(
              (lhr.categories.accessibility.score || 0) * 100
            ),
            title: lhr.categories.accessibility.title,
            description: lhr.categories.accessibility.description,
          }
        : null,
      "best-practices": lhr.categories["best-practices"]
        ? {
            score: lhr.categories["best-practices"].score,
            scorePercentage: Math.round(
              (lhr.categories["best-practices"].score || 0) * 100
            ),
            title: lhr.categories["best-practices"].title,
            description: lhr.categories["best-practices"].description,
          }
        : null,
      seo: lhr.categories.seo
        ? {
            score: lhr.categories.seo.score,
            scorePercentage: Math.round((lhr.categories.seo.score || 0) * 100),
            title: lhr.categories.seo.title,
            description: lhr.categories.seo.description,
          }
        : null,
    };

    // Extract performance metrics
    const metrics = {};
    if (lhr.audits) {
      const metricAudits = [
        "first-contentful-paint",
        "largest-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "speed-index",
        "interactive",
        "max-potential-fid",
      ];

      metricAudits.forEach((metricId) => {
        const audit = lhr.audits[metricId];
        if (audit) {
          metrics[metricId] = {
            title: audit.title,
            description: audit.description,
            score: audit.score,
            scorePercentage: audit.score ? Math.round(audit.score * 100) : null,
            value: audit.numericValue,
            displayValue: audit.displayValue,
            unit: audit.numericUnit,
          };
        }
      });
    }

    // Extract all audits with issues (score < 1)
    const issues = [];
    const recommendations = [];

    if (lhr.audits) {
      Object.entries(lhr.audits).forEach(([auditId, audit]) => {
        if (audit.score !== null && audit.score < 1) {
          const auditData = {
            id: auditId,
            title: audit.title,
            description: audit.description,
            score: audit.score,
            scorePercentage: Math.round(audit.score * 100),
            scoreDisplayMode: audit.scoreDisplayMode,
            impact: audit.impact || null,
            category: null, // Determine category from audit refs
          };

          // Determine which category this audit belongs to
          if (lhr.categories.performance?.auditRefs) {
            const perfRef = lhr.categories.performance.auditRefs.find(
              (ref) => ref.id === auditId
            );
            if (perfRef) auditData.category = "performance";
          }
          if (!auditData.category && lhr.categories.accessibility?.auditRefs) {
            const a11yRef = lhr.categories.accessibility.auditRefs.find(
              (ref) => ref.id === auditId
            );
            if (a11yRef) auditData.category = "accessibility";
          }
          if (
            !auditData.category &&
            lhr.categories["best-practices"]?.auditRefs
          ) {
            const bpRef = lhr.categories["best-practices"].auditRefs.find(
              (ref) => ref.id === auditId
            );
            if (bpRef) auditData.category = "best-practices";
          }
          if (!auditData.category && lhr.categories.seo?.auditRefs) {
            const seoRef = lhr.categories.seo.auditRefs.find(
              (ref) => ref.id === auditId
            );
            if (seoRef) auditData.category = "seo";
          }

          // Extract details for opportunities and diagnostics
          if (audit.details) {
            auditData.details = {
              type: audit.details.type,
              headings: audit.details.headings || null,
              items: audit.details.items || null,
              overallSavingsMs: audit.details.overallSavingsMs || null,
              overallSavingsBytes: audit.details.overallSavingsBytes || null,
            };
          }

          // Categorize as issue or recommendation
          if (audit.score === 0 || (audit.score < 0.5 && audit.impact)) {
            issues.push(auditData);
          } else {
            recommendations.push(auditData);
          }
        }
      });
    }

    return {
      url: result.url,
      relativeUrl: urlToRelativePath(result.url),
      deviceMode: result.deviceMode,
      timestamp: timestamp,
      categories: categories,
      metrics: metrics,
      issues: issues,
      recommendations: recommendations,
      summary: {
        totalIssues: issues.length,
        totalRecommendations: recommendations.length,
        hasCriticalIssues: issues.some((i) => i.score === 0),
        performanceScore: categories.performance?.scorePercentage || null,
        accessibilityScore: categories.accessibility?.scorePercentage || null,
        bestPracticesScore:
          categories["best-practices"]?.scorePercentage || null,
        seoScore: categories.seo?.scorePercentage || null,
      },
    };
  });

  // Calculate summary statistics
  const validResults = processedResults.filter((r) => !r.error);
  const summary = {
    totalPages: results.length,
    successfulAudits: validResults.length,
    failedAudits: results.length - validResults.length,
    averageScores: {
      performance:
        validResults.length > 0
          ? Math.round(
              (validResults.reduce(
                (sum, r) => sum + (r.categories?.performance?.score || 0),
                0
              ) /
                validResults.length) *
                100
            ) / 100
          : null,
      accessibility:
        validResults.length > 0
          ? Math.round(
              (validResults.reduce(
                (sum, r) => sum + (r.categories?.accessibility?.score || 0),
                0
              ) /
                validResults.length) *
                100
            ) / 100
          : null,
      bestPractices:
        validResults.length > 0
          ? Math.round(
              (validResults.reduce(
                (sum, r) =>
                  sum + (r.categories?.["best-practices"]?.score || 0),
                0
              ) /
                validResults.length) *
                100
            ) / 100
          : null,
      seo:
        validResults.length > 0
          ? Math.round(
              (validResults.reduce(
                (sum, r) => sum + (r.categories?.seo?.score || 0),
                0
              ) /
                validResults.length) *
                100
            ) / 100
          : null,
    },
    totalIssues: validResults.reduce(
      (sum, r) => sum + (r.issues?.length || 0),
      0
    ),
    totalRecommendations: validResults.reduce(
      (sum, r) => sum + (r.recommendations?.length || 0),
      0
    ),
    pagesWithIssues: validResults.filter((r) => (r.issues?.length || 0) > 0)
      .length,
  };

  return {
    metadata: {
      generatedAt: timestamp,
      lighthouseVersion: lighthouseVersion,
      environment: TARGET_ENV,
      baseUrl: BASE_URL,
      deviceModes: DEVICE_MODES.map((d) => d.name),
      categories: ["performance", "accessibility", "best-practices", "seo"],
    },
    summary: summary,
    results: processedResults,
  };
}

/**
 * Generate HTML report from audit results
 */
function generateHTMLReport(results) {
  const timestamp = new Date().toISOString();

  // Calculate summary statistics
  let totalPages = 0;
  const scoresByCategory = {
    performance: [],
    accessibility: [],
    "best-practices": [],
    seo: [],
  };
  const pagesWithIssues = [];

  results.forEach((result) => {
    if (result.error) return; // Skip error results for summary

    totalPages++;
    const lhr = result.lhr;

    // Collect scores
    if (lhr.categories.performance) {
      scoresByCategory.performance.push(lhr.categories.performance.score);
    }
    if (lhr.categories.accessibility) {
      scoresByCategory.accessibility.push(lhr.categories.accessibility.score);
    }
    if (lhr.categories["best-practices"]) {
      scoresByCategory["best-practices"].push(
        lhr.categories["best-practices"].score
      );
    }
    if (lhr.categories.seo) {
      scoresByCategory.seo.push(lhr.categories.seo.score);
    }

    // Check for issues (score < 0.9 or audits with errors)
    const hasIssues =
      (lhr.categories.performance?.score ?? 1) < 0.9 ||
      (lhr.categories.accessibility?.score ?? 1) < 0.9 ||
      (lhr.categories["best-practices"]?.score ?? 1) < 0.9 ||
      (lhr.categories.seo?.score ?? 1) < 0.9 ||
      (lhr.audits &&
        Object.values(lhr.audits).some(
          (audit) => audit.score !== null && audit.score < 1
        ));

    if (hasIssues) {
      pagesWithIssues.push({
        url: result.url,
        deviceMode: result.deviceMode,
        scores: {
          performance: lhr.categories.performance?.score,
          accessibility: lhr.categories.accessibility?.score,
          "best-practices": lhr.categories["best-practices"]?.score,
          seo: lhr.categories.seo?.score,
        },
        lhr: lhr,
      });
    }
  });

  // Calculate average scores
  const avgScores = {};
  Object.keys(scoresByCategory).forEach((category) => {
    const scores = scoresByCategory[category];
    if (scores.length > 0) {
      avgScores[category] =
        scores.reduce((sum, score) => sum + (score || 0), 0) / scores.length;
    } else {
      avgScores[category] = null;
    }
  });

  // Build table rows for all tested pages
  const tableRows = results.map((result) => {
    if (result.error) {
      return {
        url: urlToRelativePath(result.url),
        deviceMode: result.deviceMode,
        error: result.error,
        performance: "Error",
        accessibility: "Error",
        "best-practices": "Error",
        seo: "Error",
      };
    }

    const lhr = result.lhr;
    return {
      url: urlToRelativePath(result.url),
      deviceMode: result.deviceMode,
      performance: lhr.categories.performance?.score,
      accessibility: lhr.categories.accessibility?.score,
      "best-practices": lhr.categories["best-practices"]?.score,
      seo: lhr.categories.seo?.score,
      lhr: lhr,
    };
  });

  // Get Lighthouse version
  let lighthouseVersion = "Unknown";
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "node_modules", "lighthouse", "package.json"),
        "utf8"
      )
    );
    lighthouseVersion = packageJson.version;
  } catch (e) {
    // Use fallback
  }

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lighthouse Audit Report - ${new Date().toLocaleDateString()}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
      padding: 20px;
    }
    
    .container {
      max-width: 1400px;
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
    
    .stat-card.success {
      background: #d1e7dd;
      border-color: #badbcc;
      color: #0f5132;
    }
    
    .stat-card.warning {
      background: #fff3cd;
      border-color: #ffecb5;
      color: #856404;
    }
    
    .stat-card.error {
      background: #f8d7da;
      border-color: #f5c2c7;
      color: #842029;
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
    
    .score-good {
      color: #198754;
      font-weight: 600;
    }
    
    .score-warning {
      color: #856404;
      font-weight: 600;
    }
    
    .score-bad {
      color: #dc3545;
      font-weight: 600;
    }
    
    .score-unknown {
      color: #6c757d;
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
      max-width: 1200px;
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
    
    .audit-section {
      margin: 1.5rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      border-left: 3px solid #0d6efd;
    }
    
    .audit-item {
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: white;
      border-radius: 4px;
      border-left: 3px solid #0d6efd;
    }
    
    .audit-item.error {
      border-left-color: #dc3545;
    }
    
    .audit-item.warning {
      border-left-color: #ffc107;
    }
    
    .audit-item.pass {
      border-left-color: #198754;
    }
    
    .audit-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .audit-description {
      color: #495057;
      font-size: 0.9em;
      margin-bottom: 0.5rem;
    }
    
    .audit-details {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid #dee2e6;
      font-size: 0.85em;
      color: #6c757d;
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
    
    .info-block p {
      color: #495057;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .info-block ul {
      margin-left: 1.5rem;
      margin-top: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .info-block li {
      margin-bottom: 0.75rem;
      color: #495057;
      line-height: 1.6;
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
    <h1>🔍 ${SITE_INFO.name} - Lighthouse Audit Report</h1>
    ${SITE_INFO.description ? `<p class="meta" style="margin-top: 0.5rem; margin-bottom: 1rem;">${escapeHtml(SITE_INFO.description)}</p>` : ""}
    <div class="meta">
      <p><strong>Generated:</strong> ${new Date(timestamp).toLocaleString()}</p>
      <p><strong>Environment:</strong> ${TARGET_ENV === "production" ? "Production" : "Development"} (${BASE_URL})</p>
      <p><strong>Lighthouse version:</strong> ${lighthouseVersion}</p>
      <p><strong>Pages tested:</strong> ${totalPages}</p>
      <p><strong>Device modes tested:</strong> ${DEVICE_MODES.map((d) => d.name).join(", ")}</p>
      <p><strong>Categories tested:</strong> Performance, Accessibility, Best Practices, SEO</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card ${avgScores.performance >= 0.9 ? "success" : avgScores.performance >= 0.5 ? "warning" : "error"}">
        <div class="label">Performance</div>
        <div class="number">${formatScore(avgScores.performance)}</div>
        <div style="font-size: 0.75rem; margin-top: 0.5rem;">${getScoreLabel(avgScores.performance)}</div>
      </div>
      <div class="stat-card ${avgScores.accessibility >= 0.9 ? "success" : avgScores.accessibility >= 0.5 ? "warning" : "error"}">
        <div class="label">Accessibility</div>
        <div class="number">${formatScore(avgScores.accessibility)}</div>
        <div style="font-size: 0.75rem; margin-top: 0.5rem;">${getScoreLabel(avgScores.accessibility)}</div>
      </div>
      <div class="stat-card ${avgScores["best-practices"] >= 0.9 ? "success" : avgScores["best-practices"] >= 0.5 ? "warning" : "error"}">
        <div class="label">Best Practices</div>
        <div class="number">${formatScore(avgScores["best-practices"])}</div>
        <div style="font-size: 0.75rem; margin-top: 0.5rem;">${getScoreLabel(avgScores["best-practices"])}</div>
      </div>
      <div class="stat-card ${avgScores.seo >= 0.9 ? "success" : avgScores.seo >= 0.5 ? "warning" : "error"}">
        <div class="label">SEO</div>
        <div class="number">${formatScore(avgScores.seo)}</div>
        <div style="font-size: 0.75rem; margin-top: 0.5rem;">${getScoreLabel(avgScores.seo)}</div>
      </div>
      <div class="stat-card ${pagesWithIssues.length === 0 ? "success" : "warning"}">
        <div class="label">Pages with Issues</div>
        <div class="number">${pagesWithIssues.length}</div>
        <div style="font-size: 0.75rem; margin-top: 0.5rem;">of ${totalPages} tested</div>
      </div>
    </div>
    
    <h2>📋 All Tested Pages</h2>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Device Mode</th>
          <th>Performance</th>
          <th>Accessibility</th>
          <th>Best Practices</th>
          <th>SEO</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows
          .map(
            (row) => `
        <tr>
          <td>${escapeHtml(row.url)}</td>
          <td>${row.deviceMode}</td>
          ${
            row.error
              ? `<td colspan="4" class="score-unknown">Error: ${escapeHtml(row.error)}</td>`
              : `
          <td class="${getScoreColorClass(row.performance)}">${formatScore(row.performance)}</td>
          <td class="${getScoreColorClass(row.accessibility)}">${formatScore(row.accessibility)}</td>
          <td class="${getScoreColorClass(row["best-practices"])}">${formatScore(row["best-practices"])}</td>
          <td class="${getScoreColorClass(row.seo)}">${formatScore(row.seo)}</td>
          `
          }
          <td>${row.error ? "" : `<button onclick="openDetailsModal('${escapeHtml(row.url)}', '${row.deviceMode}')" style="padding: 0.25rem 0.75rem; background: #0d6efd; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem;">View Details</button>`}</td>
        </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    
    <div class="info-section">
      <div class="info-block">
        <h2>About Lighthouse</h2>
        <p><strong>Lighthouse</strong> is an open-source, automated tool for improving the quality of web pages. It audits web pages for performance, accessibility, progressive web apps, SEO, and more.</p>
        
        <h3>What does Lighthouse test for?</h3>
        <ul>
          <li><strong>Performance:</strong> Measures how fast your page loads and how quickly users can interact with it</li>
          <li><strong>Accessibility:</strong> Checks for common accessibility issues and ensures your site is usable by everyone</li>
          <li><strong>Best Practices:</strong> Validates modern web development best practices and security</li>
          <li><strong>SEO:</strong> Ensures your site follows search engine optimization best practices</li>
        </ul>
        
        <h3>Score Interpretation</h3>
        <ul>
          <li><strong>90-100 (Good):</strong> The page follows best practices and performs well</li>
          <li><strong>50-89 (Needs Improvement):</strong> The page has room for improvement</li>
          <li><strong>0-49 (Poor):</strong> The page needs significant improvements</li>
        </ul>
      </div>
    </div>
    
    <footer>
      <p>Generated by <strong>Lighthouse</strong> ${lighthouseVersion} on ${new Date(timestamp).toLocaleString()}</p>
      <p>For more information, visit <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer">https://developers.google.com/web/tools/lighthouse</a></p>
    </footer>
  </div>
  
  <!-- Modal for Page Details -->
  <div id="detailsModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Audit Details</h2>
        <button class="modal-close" onclick="closeDetailsModal()">&times;</button>
      </div>
      <div id="modalBody"></div>
    </div>
  </div>
  
  <script>
    const resultsData = ${JSON.stringify(
      results.map((r) => {
        // Convert URL to relative path on server side
        const relativeUrl = urlToRelativePath(r.url);
        return {
          url: relativeUrl, // Use relative path to match table display
          deviceMode: r.deviceMode,
          error: r.error || null,
          lhr: r.error
            ? null
            : {
                categories: r.lhr.categories,
                audits: Object.entries(r.lhr.audits)
                  .filter(
                    ([_, audit]) => audit.score !== null && audit.score < 1
                  )
                  .map(([id, audit]) => ({
                    id,
                    title: audit.title,
                    description: audit.description,
                    score: audit.score,
                    scoreDisplayMode: audit.scoreDisplayMode,
                    details: audit.details,
                  })),
              },
        };
      })
    )};
    
    function openDetailsModal(url, deviceMode) {
      const result = resultsData.find(
        (r) => r.url === url && r.deviceMode === deviceMode
      );
      
      if (!result || result.error) {
        document.getElementById("modalBody").innerHTML = 
          '<p>Error loading details for this page.</p>';
        document.getElementById("detailsModal").style.display = "block";
        return;
      }
      
      const lhr = result.lhr;
      if (!lhr) {
        document.getElementById("modalBody").innerHTML = 
          '<p>No data available for this page.</p>';
        document.getElementById("detailsModal").style.display = "block";
        return;
      }
      
      let html = '<div style="margin-bottom: 2rem;">';
      html += '<h3 style="margin-bottom: 1rem;">Scores</h3>';
      html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1rem;">';
      
      ['performance', 'accessibility', 'best-practices', 'seo'].forEach(category => {
        const categoryData = lhr.categories[category];
        if (categoryData) {
          const score = categoryData.score;
          html += \`<div style="padding: 1rem; background: #f8f9fa; border-radius: 4px; text-align: center;">
            <div style="font-size: 0.875rem; color: #6c757d; margin-bottom: 0.5rem;">\${categoryData.title}</div>
            <div style="font-size: 2rem; font-weight: bold; color: \${score >= 0.9 ? '#198754' : score >= 0.5 ? '#856404' : '#dc3545'};">\${Math.round(score * 100)}</div>
          </div>\`;
        }
      });
      
      html += '</div></div>';
      
      if (lhr.audits && lhr.audits.length > 0) {
        html += '<h3 style="margin-bottom: 1rem;">Issues Found</h3>';
        html += '<div class="audit-section">';
        
        lhr.audits.forEach(audit => {
          const scoreClass = audit.score === 0 ? 'error' : audit.score < 0.5 ? 'warning' : 'pass';
          html += \`<div class="audit-item \${scoreClass}">
            <div class="audit-title">\${escapeHtml(audit.title)}</div>
            <div class="audit-description">\${escapeHtml(audit.description || '')}</div>
            <div class="audit-details">
              Score: \${Math.round(audit.score * 100)}/100
              \${audit.details ? '<br>Details: ' + JSON.stringify(audit.details, null, 2) : ''}
            </div>
          </div>\`;
        });
        
        html += '</div>';
      } else {
        html += '<p style="padding: 1rem; background: #d1e7dd; border-radius: 4px; color: #0f5132;">✅ No issues found! All audits passed.</p>';
      }
      
      document.getElementById("modalBody").innerHTML = html;
      document.getElementById("detailsModal").style.display = "block";
    }
    
    function closeDetailsModal() {
      document.getElementById("detailsModal").style.display = "none";
    }
    
    function escapeHtml(str) {
      if (!str) return "";
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
      const modal = document.getElementById("detailsModal");
      if (event.target == modal) {
        closeDetailsModal();
      }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeDetailsModal();
      }
    });
  </script>
</body>
</html>`;

  return html;
}

/**
 * Main audit function
 */
async function runAudit() {
  let devServerProcess = null; // Track dev server process for cleanup
  let generatedSiteServer = null; // Track generated site server for cleanup

  console.log("=".repeat(80));
  console.log("LIGHTHOUSE AUDIT");
  console.log("=".repeat(80));
  console.log(
    "Tool: Lighthouse (Performance, Accessibility, Best Practices, SEO)"
  );
  console.log("");

  // Check if server is accessible
  if (TARGET_ENV === "production") {
    console.log(`Checking if production server is accessible...`);
    const serverRunning = await checkServer();
    if (!serverRunning) {
      console.error(`❌ Production server is not accessible!`);
      console.error(`   Please check if ${BASE_URL} is available.`);
      process.exit(1);
    }
    console.log(`✓ Production server is accessible`);
    console.log(`   URL: ${BASE_URL}`);
    console.log("");
  } else if (TARGET_ENV === "generated") {
    // Generated static site
    console.log(
      `Checking if generated site server is running on port ${LOCAL_SERVER_PORT}...`
    );
    let serverRunning = await checkServer();
    let serverWasAlreadyRunning = false;

    if (!serverRunning) {
      console.log(
        `   ⚠️  Generated site server not detected on port ${LOCAL_SERVER_PORT}`
      );
      console.log(`   🚀 Starting generated site server now...`);
      try {
        generatedSiteServer = await startGeneratedSiteServer();
        // Give it a moment to fully initialize
        await new Promise((resolve) => setTimeout(resolve, 1000));
        serverRunning = await checkServer();
        if (!serverRunning) {
          console.error(
            "❌ Generated site server started but is not responding!"
          );
          if (generatedSiteServer) {
            generatedSiteServer.close();
          }
          process.exit(1);
        }
        console.log(`   ✅ Generated site server started successfully`);
      } catch (error) {
        console.error(
          `❌ Failed to start generated site server: ${error.message}`
        );
        process.exit(1);
      }
    } else {
      serverWasAlreadyRunning = true;
      console.log(`   ✅ Generated site server detected (already running)`);
    }

    console.log("");
    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );
    console.log(`📍 Generated Site Server Status:`);
    console.log(`   Port: ${LOCAL_SERVER_PORT}`);
    console.log(
      `   Status: ${serverWasAlreadyRunning ? "Already running" : "Started by audit script"}`
    );
    console.log(`   URL: ${BASE_URL}`);
    console.log(`   Directory: .output/public`);
    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );
    console.log("");
  } else {
    // Development server
    console.log(
      `Checking if dev server is running on port ${DEV_SERVER_PORT}...`
    );
    let serverRunning = await checkServer();
    let serverWasAlreadyRunning = false;

    if (!serverRunning) {
      console.log(`   ⚠️  Dev server not detected on port ${DEV_SERVER_PORT}`);
      console.log(`   🚀 Starting dev server now...`);
      try {
        devServerProcess = await startDevServer();
        // Give it a moment to fully initialize
        await new Promise((resolve) => setTimeout(resolve, 2000));
        serverRunning = await checkServer();
        if (!serverRunning) {
          console.error("❌ Dev server started but is not responding!");
          if (devServerProcess) {
            devServerProcess.kill();
          }
          process.exit(1);
        }
        console.log(`   ✅ Dev server started successfully`);
      } catch (error) {
        console.error(`❌ Failed to start dev server: ${error.message}`);
        process.exit(1);
      }
    } else {
      serverWasAlreadyRunning = true;
      console.log(`   ✅ Dev server detected (already running)`);
    }

    console.log("");
    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );
    console.log(`📍 Dev Server Status:`);
    console.log(`   Port: ${DEV_SERVER_PORT}`);
    console.log(
      `   Status: ${serverWasAlreadyRunning ? "Already running" : "Started by audit script"}`
    );
    console.log(`   URL: ${BASE_URL}`);
    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );
    console.log("");
  }

  // Parse sitemap
  console.log("Reading sitemap.xml...");
  const urls = await parseSitemap();
  console.log(`✓ Found ${urls.length} URL(s) in sitemap`);
  console.log("");

  // Run audits
  const results = [];
  const totalTests = urls.length * DEVICE_MODES.length;
  let currentTest = 0;

  console.log(`Running ${totalTests} test(s)...`);
  console.log("");

  for (const url of urls) {
    for (const deviceMode of DEVICE_MODES) {
      currentTest++;
      try {
        console.log(
          `[${currentTest}/${totalTests}] Testing ${url} (${deviceMode.name})...`
        );

        const runnerResult = await runLighthouseAudit(url, deviceMode);

        // Check if runnerResult is valid
        if (!runnerResult) {
          throw new Error("Lighthouse returned no result");
        }

        // Lighthouse returns { lhr: {...}, report: '...' }
        const lhr = runnerResult.lhr;

        if (!lhr) {
          throw new Error("Lighthouse result missing lhr property");
        }

        if (!lhr.categories) {
          throw new Error("Lighthouse result missing categories");
        }

        results.push({
          url,
          deviceMode: deviceMode.name,
          lhr: lhr,
        });

        // Log scores
        const perfScore = lhr.categories.performance?.score;
        const a11yScore = lhr.categories.accessibility?.score;
        const bpScore = lhr.categories["best-practices"]?.score;
        const seoScore = lhr.categories.seo?.score;

        console.log(
          `   Performance: ${formatScore(perfScore)}, Accessibility: ${formatScore(a11yScore)}, Best Practices: ${formatScore(bpScore)}, SEO: ${formatScore(seoScore)}`
        );
      } catch (error) {
        console.error(
          `   ❌ Error testing ${url} (${deviceMode.name}): ${error.message}`
        );
        if (error.stack) {
          console.error(
            `   Stack: ${error.stack.split("\n").slice(0, 3).join("\n")}`
          );
        }
        results.push({
          url,
          deviceMode: deviceMode.name,
          error: error.message,
        });
      }
    }
  }

  // Cleanup servers if we started them
  if (devServerProcess) {
    console.log("\n🛑 Stopping dev server...");
    devServerProcess.kill();
    console.log("✓ Dev server stopped");
  }

  if (generatedSiteServer) {
    console.log("\n🛑 Stopping generated site server...");
    generatedSiteServer.close();
    console.log("✓ Generated site server stopped");
  }

  // Generate HTML report
  console.log("\n📝 Generating HTML report...");
  const htmlReport = generateHTMLReport(results);

  // Generate JSON report
  console.log("📝 Generating JSON report...");
  const jsonReport = generateJSONReport(results);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(REPORT_FILE, htmlReport);
  fs.writeFileSync(
    JSON_REPORT_FILE,
    JSON.stringify(jsonReport, null, 2),
    "utf8"
  );

  // Calculate summary
  const validResults = results.filter((r) => !r.error);
  const avgPerf =
    validResults.reduce(
      (sum, r) => sum + (r.lhr.categories.performance?.score || 0),
      0
    ) / validResults.length;
  const avgA11y =
    validResults.reduce(
      (sum, r) => sum + (r.lhr.categories.accessibility?.score || 0),
      0
    ) / validResults.length;
  const avgBP =
    validResults.reduce(
      (sum, r) => sum + (r.lhr.categories["best-practices"]?.score || 0),
      0
    ) / validResults.length;
  const avgSEO =
    validResults.reduce(
      (sum, r) => sum + (r.lhr.categories.seo?.score || 0),
      0
    ) / validResults.length;

  console.log("\n✅ Audit Complete!");
  console.log(`\n📊 Summary:`);
  console.log(`   Pages tested: ${urls.length}`);
  console.log(`   Device modes: ${DEVICE_MODES.length}`);
  console.log(`   Total tests: ${totalTests}`);
  console.log(`   Successful tests: ${validResults.length}`);
  console.log(`   Failed tests: ${results.length - validResults.length}`);
  console.log(`\n📈 Average Scores:`);
  console.log(`   Performance: ${formatScore(avgPerf)}`);
  console.log(`   Accessibility: ${formatScore(avgA11y)}`);
  console.log(`   Best Practices: ${formatScore(avgBP)}`);
  console.log(`   SEO: ${formatScore(avgSEO)}`);
  console.log(`\n📄 Reports saved:`);
  console.log(`   HTML: ${REPORT_FILE}`);
  console.log(`   JSON: ${JSON_REPORT_FILE}`);

  // Exit with error code if any tests failed
  if (results.length - validResults.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Run the audit
runAudit().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
