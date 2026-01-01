#!/usr/bin/env node
/**
 * Generates a JSON report containing only failed tests
 * This makes it easier to share test failures with LLMs
 */

import {
  writeFileSync,
  existsSync,
  readFileSync,
  unlinkSync,
  mkdirSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const outputPath = join(__dirname, "failed-tests.json");
const fullResultsPath = join(__dirname, "test-results.json");
const htmlReportPath = join(rootDir, "public", "docs", "tests", "index.html");

console.log("🧪 Running tests and generating test reports...\n");

// Delete old failed-tests.json if it exists
if (existsSync(outputPath)) {
  try {
    unlinkSync(outputPath);
    console.log("🗑️  Deleted old failed-tests.json\n");
  } catch (error) {
    console.warn(
      `⚠️  Could not delete old failed-tests.json: ${error.message}\n`
    );
  }
}

try {
  const tempJsonPath = join(__dirname, "vitest-results.json");

  // Run vitest with JSON reporter outputting to a file
  try {
    execSync(
      `vitest run --reporter=json --reporter=verbose --outputFile=${tempJsonPath}`,
      {
        cwd: rootDir,
        encoding: "utf-8",
        stdio: "inherit", // Show test output in console
      }
    );
  } catch (testError) {
    // Tests failed, but we still want to process the JSON
    // Exit code will be non-zero, which is expected if tests fail
  }

  // Read the JSON file
  let jsonData = null;
  if (existsSync(tempJsonPath)) {
    const jsonContent = readFileSync(tempJsonPath, "utf-8");
    jsonData = JSON.parse(jsonContent);
    // Clean up temp file
    try {
      unlinkSync(tempJsonPath);
    } catch {
      // Ignore cleanup errors
    }
  } else {
    console.error("❌ Could not find test results JSON file");
    console.error("This might mean tests did not run or there was an error.");
    process.exit(1);
  }

  // Filter to only failed tests
  const failedTests = {
    summary: {
      totalTests: jsonData.numTotalTests || 0,
      passedTests: jsonData.numPassedTests || 0,
      failedTests: jsonData.numFailedTests || 0,
      skippedTests: jsonData.numSkippedTests || 0,
      duration: jsonData.startTime ? Date.now() - jsonData.startTime : 0,
    },
    testResults: [],
  };

  // Process test results
  if (jsonData.testResults) {
    for (const testFile of jsonData.testResults) {
      const failedCases = [];

      if (testFile.assertionResults) {
        for (const assertion of testFile.assertionResults) {
          if (assertion.status === "failed") {
            failedCases.push({
              title: assertion.title,
              fullName: assertion.fullName,
              status: assertion.status,
              failureMessages: assertion.failureMessages || [],
              duration: assertion.duration,
            });
          }
        }
      }

      // Check for suite-level failures (when the entire test file failed to run)
      if (failedCases.length > 0 || testFile.status === "failed") {
        failedTests.testResults.push({
          file: testFile.name,
          status: testFile.status,
          message: testFile.message || "",
          failedCases,
        });
      }
    }
  }

  // Also check for unhandled errors or suite-level failures
  // These might not be in testResults but should be counted
  const hasSuiteFailures = failedTests.testResults.some(
    (result) => result.status === "failed" && result.failedCases.length === 0
  );

  // Create full test results (all tests, not just failures)
  const fullTestResults = {
    summary: {
      totalTests: jsonData.numTotalTests || 0,
      passedTests: jsonData.numPassedTests || 0,
      failedTests: jsonData.numFailedTests || 0,
      skippedTests: jsonData.numSkippedTests || 0,
      duration: jsonData.startTime ? Date.now() - jsonData.startTime : 0,
      generatedAt: new Date().toISOString(),
    },
    testResults: jsonData.testResults || [],
  };

  // Write full results JSON
  writeFileSync(
    fullResultsPath,
    JSON.stringify(fullTestResults, null, 2),
    "utf-8"
  );

  // Write the filtered JSON (failed tests only)
  writeFileSync(outputPath, JSON.stringify(failedTests, null, 2), "utf-8");

  // Generate HTML report
  generateHTMLReport(fullTestResults, htmlReportPath, rootDir);

  // Check if there are any failures (either in summary or in test results)
  const hasFailures =
    failedTests.summary.failedTests > 0 ||
    failedTests.testResults.length > 0 ||
    hasSuiteFailures;

  if (hasFailures) {
    const totalFailed =
      failedTests.summary.failedTests > 0
        ? failedTests.summary.failedTests
        : failedTests.testResults.length;
    console.log(`\n❌ Found ${totalFailed} failed test(s)`);
    console.log(`📄 Failed tests report saved to: ${outputPath}`);
    console.log(`📄 Full test results saved to: ${fullResultsPath}`);
    console.log(`📄 HTML report saved to: ${htmlReportPath}`);
    console.log(
      `\nYou can share the failed-tests.json file with an LLM for help fixing the issues.`
    );
    process.exit(1);
  } else {
    console.log(`\n✅ All tests passed!`);
    // Still write an empty report for consistency
    writeFileSync(
      outputPath,
      JSON.stringify(
        {
          summary: failedTests.summary,
          testResults: [],
          message: "All tests passed - no failures to report",
        },
        null,
        2
      ),
      "utf-8"
    );
    console.log(`📄 Failed tests report saved to: ${outputPath}`);
    console.log(`📄 Full test results saved to: ${fullResultsPath}`);
    console.log(`📄 HTML report saved to: ${htmlReportPath}`);
    process.exit(0);
  }
} catch (error) {
  console.error("❌ Error generating test reports:", error.message);
  console.error(error.stack);
  process.exit(1);
}

/**
 * Generates an HTML report from test results
 */
function generateHTMLReport(testResults, outputPath, rootDir) {
  // Ensure directory exists
  const reportDir = dirname(outputPath);
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }

  const { summary, testResults: results, projectStats } = testResults;
  const passRate =
    summary.totalTests > 0
      ? ((summary.passedTests / summary.totalTests) * 100).toFixed(1)
      : 0;
  
  const generatedDate = new Date(summary.generatedAt || Date.now());
  const formattedDate = generatedDate.toLocaleDateString();
  const formattedTime = generatedDate.toLocaleTimeString();

  // Generate project stats HTML
  let projectStatsHTML = "";
  if (projectStats && Object.keys(projectStats).length > 0) {
    projectStatsHTML = Object.entries(projectStats)
      .map(([project, stats]) => {
        const projectStatus = stats.failed > 0 ? "error" : "success";
        return `
        <tr>
          <td><strong>${project}</strong></td>
          <td>${stats.total}</td>
          <td class="status-pass">${stats.passed}</td>
          <td class="status-${projectStatus}">${stats.failed}</td>
          <td class="status-${stats.failed > 0 ? "fail" : "pass"}">${stats.failed > 0 ? "❌ Fail" : "✅ Pass"}</td>
        </tr>`;
      })
      .join("");
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Results Report - ${formattedDate}</title>
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
    
    .test-file {
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .test-file-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
    
    .test-file-name {
      font-weight: 600;
      color: #212529;
      font-size: 1.1rem;
    }
    
    .test-file-status {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .test-file-status.passed {
      background: #d1e7dd;
      color: #0f5132;
    }
    
    .test-file-status.failed {
      background: #f8d7da;
      color: #842029;
    }
    
    .test-file-status.skipped {
      background: #fff3cd;
      color: #856404;
    }
    
    .test-case {
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      background: #f8f9fa;
    }
    
    .test-case.passed {
      border-left: 3px solid #198754;
    }
    
    .test-case.failed {
      border-left: 3px solid #dc3545;
    }
    
    .test-case.skipped {
      border-left: 3px solid #ffc107;
    }
    
    .test-case-title {
      font-weight: 500;
      color: #212529;
      margin-bottom: 0.25rem;
    }
    
    .test-case-duration {
      font-size: 0.85rem;
      color: #6c757d;
    }
    
    .failure-message {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #f8d7da;
      border-radius: 4px;
      border-left: 3px solid #dc3545;
    }
    
    .failure-message pre {
      color: #842029;
      font-size: 0.85rem;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      background: #0d6efd;
      color: #fff;
      padding: 12px 24px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 0 0 4px 0;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5;
      clip: auto;
      clip-path: none;
      transition: top 0.2s ease-in-out;
    }
    
    .skip-link:focus {
      top: 0;
      left: 0;
      outline: 3px solid #0d6efd;
      outline-offset: 2px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    .skip-link:focus-visible {
      top: 0;
      left: 0;
      outline: 3px solid #0d6efd;
      outline-offset: 2px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    @media (prefers-reduced-motion: reduce) {
      .skip-link {
        transition: none;
      }
    }
    
    @media (max-width: 768px) {
      table {
        font-size: 0.875rem;
      }
      
      th, td {
        padding: 0.5rem;
      }
    }
    
    footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #dee2e6;
      text-align: center;
      color: #6c757d;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <!-- Skip Link -->
  <a
    href="#main-content"
    class="skip-link"
    id="skip-link"
  >
    Skip to main content
  </a>
  
  <div class="container">
    <main id="main-content" tabindex="-1">
    <h1>🧪 ICJIA Accessibility Portal - Test Results Report</h1>
    <p class="meta" style="margin-top: 0.5rem; margin-bottom: 1rem;">Comprehensive test results for unit, Nuxt, and E2E tests</p>
    <div class="meta">
      <p><strong>Generated:</strong> ${formattedDate}, ${formattedTime}</p>
      <p><strong>Total Tests:</strong> ${summary.totalTests}</p>
      <p><strong>Duration:</strong> ${(summary.duration / 1000).toFixed(2)} seconds</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card ${summary.failedTests > 0 ? "error" : "success"}">
        <div class="label">Total Tests</div>
        <div class="number">${summary.totalTests}</div>
      </div>
      <div class="stat-card success">
        <div class="label">Passed</div>
        <div class="number">${summary.passedTests}</div>
      </div>
      <div class="stat-card ${summary.failedTests > 0 ? "error" : "success"}">
        <div class="label">Failed</div>
        <div class="number">${summary.failedTests}</div>
      </div>
      <div class="stat-card ${summary.skippedTests > 0 ? "warning" : "success"}">
        <div class="label">Skipped</div>
        <div class="number">${summary.skippedTests}</div>
      </div>
      <div class="stat-card ${summary.failedTests > 0 ? "error" : "success"}">
        <div class="label">Pass Rate</div>
        <div class="number">${passRate}%</div>
      </div>
    </div>
    
    ${projectStatsHTML ? `
    <h2>📋 Test Results by Project</h2>
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Total Tests</th>
          <th>Passed</th>
          <th>Failed</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${projectStatsHTML}
      </tbody>
    </table>
    ` : ""}
    
    <h2>📋 All Test Files</h2>
    ${generateTestFilesHTML(results, rootDir)}
    
    <footer>
      <p>Generated on ${formattedDate}, ${formattedTime}</p>
      <p>Total duration: ${(summary.duration / 1000).toFixed(2)} seconds</p>
    </footer>
    </main>
  </div>
  
  <script>
    // Skip Link Handler
    (function() {
      const skipLink = document.getElementById('skip-link');
      if (skipLink) {
        const handleSkipLink = function(e) {
          e.preventDefault();
          const target = document.getElementById('main-content');
          if (target) {
            target.focus();
            const prefersReducedMotion = window.matchMedia(
              '(prefers-reduced-motion: reduce)'
            ).matches;
            target.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          }
        };
        
        skipLink.addEventListener('click', handleSkipLink);
        skipLink.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            handleSkipLink(e);
          }
        });
      }
    })();
  </script>
</body>
</html>`;

  writeFileSync(outputPath, html, "utf-8");
}

/**
 * Generates HTML for test files
 */
function generateTestFilesHTML(results, rootDir) {
  if (results.length === 0) {
    return '<div style="text-align: center; padding: 3rem; color: #6c757d;"><p>No test results available</p></div>';
  }

  return results
    .map((testFile) => {
      const status = testFile.status || "unknown";
      const statusClass = status.toLowerCase();
      const testCases = testFile.assertionResults || [];
      const fileName = testFile.name.replace(rootDir, "").replace(/\\/g, "/");

      // Count test cases by status
      const passedCount = testCases.filter((tc) => tc.status === "passed").length;
      const failedCount = testCases.filter((tc) => tc.status === "failed").length;
      const skippedCount = testCases.filter((tc) => tc.status === "skipped").length;

      let testCasesHTML = "";
      if (testCases.length === 0) {
        testCasesHTML =
          '<p style="color: #6c757d;">No test cases in this file</p>';
      } else {
        testCasesHTML = testCases
          .map((testCase) => {
            const caseStatus = testCase.status || "unknown";
            const caseClass = caseStatus.toLowerCase();
            const title = testCase.title || "Untitled Test";
            const duration = testCase.duration
              ? testCase.duration.toFixed(2) + "ms"
              : "N/A";

            let failureHTML = "";
            if (
              testCase.failureMessages &&
              testCase.failureMessages.length > 0
            ) {
              const failureText = testCase.failureMessages
                .join("\n")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
              failureHTML = `<div class="failure-message"><pre>${failureText}</pre></div>`;
            }

            const statusIcon = caseStatus === "passed" ? "✅" : caseStatus === "failed" ? "❌" : "⚠️";

            return `
      <div class="test-case ${caseClass}">
        <div class="test-case-title">${statusIcon} ${title}</div>
        <div class="test-case-duration">Duration: ${duration}</div>
        ${failureHTML}
      </div>`;
          })
          .join("");
      }

      return `
    <div class="test-file">
      <div class="test-file-header">
        <div class="test-file-name">${fileName}</div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="font-size: 0.85rem; color: #6c757d;">
            ${passedCount} passed, ${failedCount} failed, ${skippedCount} skipped
          </span>
          <span class="test-file-status ${statusClass}">${status.toUpperCase()}</span>
        </div>
      </div>
      ${testCasesHTML}
    </div>`;
    })
    .join("");
}
