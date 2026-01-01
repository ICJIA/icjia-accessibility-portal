#!/usr/bin/env node
/**
 * Comprehensive test runner that:
 * 1. Detects if E2E tests are enabled
 * 2. Starts dev server if E2E tests are enabled
 * 3. Runs all tests (unit, nuxt, e2e)
 * 4. Generates comprehensive reports (JSON + HTML)
 * 5. Cleans up dev server
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
import { execSync, spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const outputPath = join(__dirname, "failed-tests.json");
const fullResultsPath = join(__dirname, "test-results.json");
const htmlReportPath = join(rootDir, "public", "docs", "tests", "index.html");

console.log("🧪 Comprehensive Test Runner\n");
console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
);

// Check if E2E tests are enabled
const vitestConfigPath = join(rootDir, "vitest.config.ts");
const vitestConfig = readFileSync(vitestConfigPath, "utf-8");
const e2eEnabled = !vitestConfig.includes('//     name: "e2e"');

console.log(`📋 Test Configuration:`);
console.log(`   • Unit tests: ✅ Enabled`);
console.log(`   • Nuxt tests: ✅ Enabled`);
console.log(`   • E2E tests:  ${e2eEnabled ? "✅ Enabled" : "⏭️  Disabled"}\n`);

if (e2eEnabled) {
  console.log("⚠️  E2E tests are enabled - dev server will be started\n");
}

console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
);

// Delete old reports
if (existsSync(outputPath)) {
  try {
    unlinkSync(outputPath);
    console.log("🗑️  Deleted old failed-tests.json");
  } catch (error) {
    console.warn(
      `⚠️  Could not delete old failed-tests.json: ${error.message}`
    );
  }
}

if (existsSync(fullResultsPath)) {
  try {
    unlinkSync(fullResultsPath);
    console.log("🗑️  Deleted old test-results.json");
  } catch (error) {
    console.warn(
      `⚠️  Could not delete old test-results.json: ${error.message}`
    );
  }
}

console.log("");

let devServer = null;
let serverReady = false;

async function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log("🚀 Starting dev server for E2E tests...\n");

    devServer = spawn("npm", ["run", "dev"], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    let output = "";

    const onData = (data) => {
      const text = data.toString();
      output += text;

      // Check if server is ready
      if (text.includes("Local:") || text.includes("localhost:3000")) {
        serverReady = true;
        console.log("✅ Dev server is ready!\n");
        resolve();
      }
    };

    devServer.stdout.on("data", onData);
    devServer.stderr.on("data", onData);

    devServer.on("error", (error) => {
      console.error("❌ Failed to start dev server:", error.message);
      reject(error);
    });

    devServer.on("exit", (code) => {
      if (!serverReady) {
        console.error(`❌ Dev server exited with code ${code}`);
        reject(new Error(`Dev server exited with code ${code}`));
      }
    });

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!serverReady) {
        console.error("❌ Dev server failed to start within 60 seconds");
        reject(new Error("Dev server timeout"));
      }
    }, 60000);
  });
}

function stopDevServer() {
  if (devServer) {
    console.log("\n🛑 Stopping dev server...");
    devServer.kill("SIGTERM");

    // Force kill after 5 seconds if still running
    setTimeout(() => {
      if (devServer && !devServer.killed) {
        console.log("⚠️  Force killing dev server...");
        devServer.kill("SIGKILL");
      }
    }, 5000);
  }
}

async function runTests() {
  const tempJsonPath = join(__dirname, "vitest-results.json");

  console.log("🧪 Running all tests...\n");
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );

  try {
    execSync(
      `vitest run --reporter=json --reporter=verbose --outputFile=${tempJsonPath}`,
      {
        cwd: rootDir,
        encoding: "utf-8",
        stdio: "inherit",
      }
    );
  } catch (testError) {
    // Tests failed, but we still want to process the JSON
    // Exit code will be non-zero, which is expected if tests fail
  }

  return tempJsonPath;
}

function processTestResults(tempJsonPath) {
  console.log(
    "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );
  console.log("📊 Processing test results...\n");

  if (!existsSync(tempJsonPath)) {
    console.error("❌ Could not find test results JSON file");
    console.error("This might mean tests did not run or there was an error.");
    return null;
  }

  const jsonContent = readFileSync(tempJsonPath, "utf-8");
  const jsonData = JSON.parse(jsonContent);

  // Clean up temp file
  try {
    unlinkSync(tempJsonPath);
  } catch {
    // Ignore cleanup errors
  }

  // Create summary
  const summary = {
    totalTests: jsonData.numTotalTests || 0,
    passedTests: jsonData.numPassedTests || 0,
    failedTests: jsonData.numFailedTests || 0,
    skippedTests: jsonData.numSkippedTests || 0,
    duration: jsonData.startTime ? Date.now() - jsonData.startTime : 0,
    generatedAt: new Date().toISOString(),
  };

  // Process test results by project
  const projectStats = {};
  const failedTests = {
    summary,
    testResults: [],
  };

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

      // Track stats by project
      const fileName = testFile.name || "";
      let project = "unknown";
      if (fileName.includes("/test/unit/")) project = "unit";
      else if (fileName.includes("/test/nuxt/")) project = "nuxt";
      else if (fileName.includes("/test/e2e/")) project = "e2e";

      if (!projectStats[project]) {
        projectStats[project] = { passed: 0, failed: 0, total: 0 };
      }

      const testCount = testFile.assertionResults?.length || 0;
      projectStats[project].total += testCount;
      projectStats[project].passed += testCount - failedCases.length;
      projectStats[project].failed += failedCases.length;

      // Add to failed tests if there are failures
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

  // Create full test results
  const fullTestResults = {
    summary,
    projectStats,
    testResults: jsonData.testResults || [],
  };

  return { fullTestResults, failedTests };
}

function generateReports(fullTestResults, failedTests) {
  console.log("📝 Generating reports...\n");

  // Write full results JSON
  writeFileSync(
    fullResultsPath,
    JSON.stringify(fullTestResults, null, 2),
    "utf-8"
  );
  console.log(`   ✅ Full results: ${fullResultsPath}`);

  // Write failed tests JSON
  writeFileSync(outputPath, JSON.stringify(failedTests, null, 2), "utf-8");
  console.log(`   ✅ Failed tests: ${outputPath}`);

  // Generate HTML report
  generateHTMLReport(fullTestResults, htmlReportPath, rootDir);
  console.log(`   ✅ HTML report:  ${htmlReportPath}`);
}

function generateHTMLReport(testResults, outputPath, rootDir) {
  // Ensure directory exists
  const reportDir = dirname(outputPath);
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }

  const { summary, projectStats, testResults: results } = testResults;
  const passRate =
    summary.totalTests > 0
      ? ((summary.passedTests / summary.totalTests) * 100).toFixed(1)
      : 0;

  // Generate project breakdown HTML
  let projectBreakdownHTML = "";
  if (projectStats && Object.keys(projectStats).length > 0) {
    projectBreakdownHTML = `
    <div style="margin: 2rem 0; padding: 1.5rem; background: #1E293B; border: 1px solid #334155; border-radius: 8px;">
      <h2 style="color: #60A5FA; margin-bottom: 1rem;">Test Projects</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        ${Object.entries(projectStats)
          .map(
            ([project, stats]) => `
          <div style="background: #0F172A; padding: 1rem; border-radius: 4px; border-left: 3px solid ${
            stats.failed > 0 ? "#CF6679" : "#81C784"
          };">
            <h3 style="color: #F8FAFC; text-transform: capitalize; margin-bottom: 0.5rem;">${project}</h3>
            <p style="color: #94A3B8; font-size: 0.9rem;">
              ${stats.passed}/${stats.total} passed
              ${stats.failed > 0 ? `<span style="color: #CF6679;">(${stats.failed} failed)</span>` : ""}
            </p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>`;
  }

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
    h2 {
      color: #60A5FA;
      font-size: 1.5rem;
      margin-bottom: 1rem;
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

    ${projectBreakdownHTML}

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

// Main execution
async function main() {
  try {
    // Start dev server if E2E tests are enabled
    if (e2eEnabled) {
      await startDevServer();
    }

    // Run tests
    const tempJsonPath = await runTests();

    // Process results
    const results = processTestResults(tempJsonPath);
    if (!results) {
      process.exit(1);
    }

    const { fullTestResults, failedTests } = results;

    // Generate reports
    generateReports(fullTestResults, failedTests);

    console.log(
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    );

    // Print summary
    const { summary, projectStats } = fullTestResults;
    console.log("📊 Test Summary:\n");
    console.log(`   Total:   ${summary.totalTests}`);
    console.log(`   Passed:  ${summary.passedTests} ✅`);
    console.log(
      `   Failed:  ${summary.failedTests} ${summary.failedTests > 0 ? "❌" : ""}`
    );
    console.log(`   Skipped: ${summary.skippedTests}`);
    console.log(`   Duration: ${(summary.duration / 1000).toFixed(2)}s`);

    if (projectStats && Object.keys(projectStats).length > 0) {
      console.log("\n📋 By Project:\n");
      for (const [project, stats] of Object.entries(projectStats)) {
        const status = stats.failed > 0 ? "❌" : "✅";
        console.log(
          `   ${project.padEnd(6)}: ${stats.passed}/${stats.total} passed ${status}`
        );
      }
    }

    console.log(
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    );

    // Check for failures
    const hasFailures = failedTests.summary.failedTests > 0;

    if (hasFailures) {
      console.log(`❌ ${failedTests.summary.failedTests} test(s) failed\n`);
      console.log(
        `💡 Tip: Share ${outputPath} with an LLM for help fixing issues\n`
      );
      process.exit(1);
    } else {
      console.log("✅ All tests passed!\n");
      process.exit(0);
    }
  } catch (error) {
    console.error("\n❌ Error running tests:", error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Always stop dev server
    if (e2eEnabled) {
      stopDevServer();
    }
  }
}

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n\n⚠️  Test run interrupted by user");
  stopDevServer();
  process.exit(130);
});

process.on("SIGTERM", () => {
  console.log("\n\n⚠️  Test run terminated");
  stopDevServer();
  process.exit(143);
});

// Run main function
main();
