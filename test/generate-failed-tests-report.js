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

  const { summary, testResults: results } = testResults;
  const passRate =
    summary.totalTests > 0
      ? ((summary.passedTests / summary.totalTests) * 100).toFixed(1)
      : 0;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Results - ICJIA Accessibility Portal</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0F172A;
      color: #E2E8F0;
      line-height: 1.6;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #334155;
    }
    h1 {
      color: #60A5FA;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .summary-card {
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }
    .summary-card.passed {
      border-color: #81C784;
    }
    .summary-card.failed {
      border-color: #CF6679;
    }
    .summary-card.skipped {
      border-color: #FFB74D;
    }
    .summary-card.total {
      border-color: #60A5FA;
    }
    .summary-card h3 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .summary-card.passed h3 {
      color: #81C784;
    }
    .summary-card.failed h3 {
      color: #CF6679;
    }
    .summary-card.skipped h3 {
      color: #FFB74D;
    }
    .summary-card.total h3 {
      color: #60A5FA;
    }
    .summary-card p {
      color: #CBD5E1;
      font-size: 0.9rem;
    }
    .test-file {
      background: #1E293B;
      border: 1px solid #334155;
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
      border-bottom: 1px solid #334155;
    }
    .test-file-name {
      font-weight: 600;
      color: #F8FAFC;
      font-size: 1.1rem;
    }
    .test-file-status {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .test-file-status.passed {
      background: #81C784;
      color: #0F172A;
    }
    .test-file-status.failed {
      background: #CF6679;
      color: #0F172A;
    }
    .test-file-status.skipped {
      background: #FFB74D;
      color: #0F172A;
    }
    .test-case {
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      background: #0F172A;
    }
    .test-case.passed {
      border-left: 3px solid #81C784;
    }
    .test-case.failed {
      border-left: 3px solid #CF6679;
    }
    .test-case.skipped {
      border-left: 3px solid #FFB74D;
    }
    .test-case-title {
      font-weight: 500;
      color: #F8FAFC;
      margin-bottom: 0.25rem;
    }
    .test-case-duration {
      font-size: 0.85rem;
      color: #94A3B8;
    }
    .failure-message {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #1E293B;
      border-radius: 4px;
      border-left: 3px solid #CF6679;
    }
    .failure-message pre {
      color: #FCA5A5;
      font-size: 0.85rem;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .meta {
      color: #94A3B8;
      font-size: 0.9rem;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #334155;
    }
    .no-tests {
      text-align: center;
      padding: 3rem;
      color: #94A3B8;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🧪 Test Results</h1>
      <p class="meta">Generated: ${new Date(summary.generatedAt || Date.now()).toLocaleString()}</p>
    </header>

    <div class="summary">
      <div class="summary-card total">
        <h3>${summary.totalTests}</h3>
        <p>Total Tests</p>
      </div>
      <div class="summary-card passed">
        <h3>${summary.passedTests}</h3>
        <p>Passed</p>
      </div>
      <div class="summary-card failed">
        <h3>${summary.failedTests}</h3>
        <p>Failed</p>
      </div>
      <div class="summary-card skipped">
        <h3>${summary.skippedTests}</h3>
        <p>Skipped</p>
      </div>
      <div class="summary-card">
        <h3>${passRate}%</h3>
        <p>Pass Rate</p>
      </div>
      <div class="summary-card">
        <h3>${(summary.duration / 1000).toFixed(2)}s</h3>
        <p>Duration</p>
      </div>
    </div>

    ${generateTestFilesHTML(results, rootDir)}

    <div class="meta">
      <p>Test execution completed at ${new Date().toLocaleString()}</p>
      <p>Total duration: ${(summary.duration / 1000).toFixed(2)} seconds</p>
    </div>
  </div>
</body>
</html>`;

  writeFileSync(outputPath, html, "utf-8");
}

/**
 * Generates HTML for test files
 */
function generateTestFilesHTML(results, rootDir) {
  if (results.length === 0) {
    return '<div class="no-tests"><p>No test results available</p></div>';
  }

  return results
    .map((testFile) => {
      const status = testFile.status || "unknown";
      const statusClass = status.toLowerCase();
      const testCases = testFile.assertionResults || [];
      const fileName = testFile.name.replace(rootDir, "");

      let testCasesHTML = "";
      if (testCases.length === 0) {
        testCasesHTML =
          '<p style="color: #94A3B8;">No test cases in this file</p>';
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

            return `
      <div class="test-case ${caseClass}">
        <div class="test-case-title">${title}</div>
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
        <span class="test-file-status ${statusClass}">${status.toUpperCase()}</span>
      </div>
      ${testCasesHTML}
    </div>`;
    })
    .join("");
}
