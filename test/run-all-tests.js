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

/**
 * Test Descriptions
 * Maps test name patterns to human-readable descriptions explaining what each test verifies.
 * Used to generate expandable documentation in the HTML test report.
 */
const TEST_DESCRIPTIONS = {
  // FAQ Download Generators
  "should generate a plain text file from markdown": "Verifies the TXT generator script successfully converts Markdown source to a plain text file output.",
  "should include proper header with metadata": "Checks that generated files include the ICJIA header, generation date, and source URL metadata.",
  "should convert headings to uppercase with separators": "Ensures Markdown headings (H1, H2) are converted to uppercase text with ASCII separator lines for visual structure.",
  "should preserve links with URLs in parentheses": "Verifies that hyperlinks are converted to 'text (URL)' format for readability in plain text.",
  "should remove markdown formatting symbols": "Confirms that Markdown syntax like **bold** and *italic* markers are stripped from plain text output.",
  "should include footer with copyright": "Checks that generated documents include proper copyright and contact information footer.",
  "should handle {new:} tags appropriately": "Verifies that {new:YYYY-MM-DD} date tags are either removed or converted to visible badges.",
  "should be readable as plain ASCII text": "Ensures the output is valid text content that can be read by any text editor.",
  "should generate a markdown file from source": "Verifies the MD generator successfully creates a Markdown file with added header/footer.",
  "should remove original YAML frontmatter": "Ensures the source file's YAML frontmatter is stripped and replaced with new metadata.",
  "should preserve markdown formatting": "Confirms that Markdown syntax (headings, bold, italic, links) is preserved in the output.",
  "should preserve tables": "Verifies that Markdown tables are kept intact in the generated file.",
  "should convert {new:} tags to visible badges": "Checks that date tags are converted to visible emoji badges (🆕) in Markdown output.",
  "should include footer with document info": "Ensures the Markdown output includes a Document Information section with organization details.",
  "should generate a docx file from markdown": "Verifies the DOCX generator creates a valid Word document from Markdown source.",
  "should create a valid ZIP-based docx file": "Confirms the output is a valid Office Open XML file (starts with PK signature).",
  "should have reasonable file size": "Ensures the generated DOCX is within expected size bounds (5KB-1MB).",
  "should contain document content in XML format": "Verifies the DOCX contains the required word/document.xml structure.",
  
  // Download File Accessibility
  "should be readable without any special software": "Verifies plain text files can be opened and read by any basic text editor.",
  "should use clear visual structure with ASCII separators": "Checks that text files use = and - characters for visual section separation.",
  "should have proper heading hierarchy": "Ensures Markdown files have correct H1/H2 heading structure for accessibility.",
  "should be a valid Office Open XML file": "Confirms DOCX files follow the Office Open XML standard format.",
  "should contain structured content": "Verifies DOCX files include proper document structure and styles for accessibility.",
  
  // DownloadDialog Component
  "should render when modelValue is true": "Verifies the dialog component renders when its v-model is true.",
  "should not render dialog content when modelValue is false": "Confirms the dialog is hidden when v-model is false.",
  "should display dialog title": "Checks that the 'Download FAQs' title is visible in the dialog.",
  "should display description text": "Verifies the format selection description text is displayed.",
  "should display Word Document option": "Confirms the DOCX download option is present with correct description.",
  "should display Markdown option": "Confirms the MD download option is present with VS Code/GitHub mention.",
  "should display Plain Text option": "Confirms the TXT download option is present with screen reader mention.",
  "should have correct download links": "Verifies all three download links point to correct file paths.",
  "should have download attributes on links": "Checks that links have proper 'download' attributes for file download.",
  "should display accessibility notes for each format": "Verifies each format shows its accessibility benefit note.",
  "should have expandable Markdown explanation": "Confirms the 'What is Markdown?' expandable section exists.",
  "should explain what Markdown is": "Checks that the Markdown explanation text is present.",
  "should include Windows native options": "Verifies Windows-specific Markdown viewers (Notepad, WordPad) are listed.",
  "should include macOS native options": "Verifies macOS-specific Markdown viewers (TextEdit, Quick Look) are listed.",
  "should include cross-platform apps": "Confirms VS Code, Obsidian, Typora are listed as Markdown viewers.",
  "should include online viewers": "Verifies Dillinger.io and StackEdit.io are listed as online options.",
  "should have aria-labelledby for dialog": "Checks the dialog has proper ARIA labeling for screen readers.",
  "should have download options with role=\"list\"": "Verifies the download options container has list semantics.",
  "should have download options with role=\"listitem\"": "Confirms each download option has listitem semantics.",
  "should have cancel button with aria-label": "Checks the cancel button is accessible with proper labeling.",
  "should emit update:modelValue when cancel is clicked": "Verifies clicking cancel properly closes the dialog.",
  "should include tip for screen reader users": "Confirms the screen reader tip about Word format is displayed.",
  "should indicate Markdown is good for LLM input": "Verifies Markdown option mentions AI/LLM compatibility.",
  "should indicate Plain Text is good for LLM input": "Verifies Plain Text option mentions AI/LLM compatibility.",
  "should explain how to use with AI assistants": "Confirms instructions for using files with AI are present.",
  "should mention specific AI tools": "Checks that ChatGPT, Claude, Gemini, Copilot are mentioned.",
  
  // FaqAccordion Component
  "should render FAQ items": "Verifies the accordion component renders FAQ question/answer pairs.",
  "should display question text": "Confirms FAQ questions are visible in the accordion headers.",
  "should display new badge when isNew is true": "Verifies new questions show the 'New' badge indicator.",
  "should not display new badge when isNew is false": "Confirms older questions don't show the new badge.",
  "should generate question IDs correctly": "Checks that unique anchor IDs are generated for each question.",
  "should handle empty items array": "Verifies the component handles empty FAQ data gracefully.",
  "should use sectionId when provided": "Confirms section IDs are used in generated question anchors.",
  
  // Search Functionality
  "should return results for exact match in question": "Verifies exact text matches in questions return results.",
  "should return results for partial match": "Confirms partial word matches return relevant results.",
  "should return empty array for no matches": "Verifies searches with no matches return empty arrays.",
  "should search in both question and answer fields": "Confirms search looks in both question and answer content.",
  "should return results sorted by score ascending": "Verifies best matches (lowest score) appear first.",
  "should rank exact question match highest": "Confirms exact matches in questions rank above partial matches.",
  "should rank question matches higher than answer-only matches": "Verifies question matches are weighted higher than answer matches.",
  "should order results from closest to partial match": "Confirms results are ordered by relevance score.",
  "should include score in results": "Verifies Fuse.js score is included for ranking purposes.",
  "should have scores between 0 and 1": "Confirms scores are normalized to 0-1 range (0 = perfect match).",
  "should return best matches with scores below threshold": "Verifies threshold filtering works correctly.",
  "should include match indices in results": "Confirms match position data is available for highlighting.",
  "should provide match positions for highlighting": "Verifies exact character positions are provided for UI highlighting.",
  "should identify which key matched": "Confirms results indicate whether question or answer matched.",
  "should find results with typos": "Verifies fuzzy matching handles minor spelling errors.",
  "should find results with partial words": "Confirms partial word searches return relevant results.",
  "should handle case-insensitive search": "Verifies search is not case-sensitive.",
  "should label very close matches as Excellent": "Confirms scores < 0.1 are labeled as 'Excellent' match.",
  "should label good matches appropriately": "Verifies scores 0.1-0.3 are labeled as 'Good' match.",
  "should label fair matches appropriately": "Confirms scores 0.3-0.5 are labeled as 'Fair' match.",
  "should label weak matches as Partial": "Verifies scores > 0.5 are labeled as 'Partial' match.",
  "should handle undefined score": "Confirms graceful handling when score is not available.",
  "should return results quickly for small datasets": "Verifies search performance is acceptable.",
  "should handle multiple sequential searches": "Confirms rapid consecutive searches don't cause issues.",
  "should handle empty search query": "Verifies empty queries are handled gracefully.",
  "should handle single character search": "Confirms single-character searches work correctly.",
  "should handle special characters": "Verifies searches with symbols don't break the search.",
  "should handle very long search queries": "Confirms long query strings don't cause errors.",
  "should handle search with numbers": "Verifies numeric searches return appropriate results.",
  "should preserve section information in results": "Confirms section context is maintained in search results.",
  "should include isNew flag in results": "Verifies new question status is preserved in results.",
  
  // SEO and Structured Data
  "should set basic SEO meta tags with default values": "Verifies default SEO meta tags are applied correctly.",
  "should set custom title with site name suffix": "Confirms page titles include the site name suffix.",
  "should set custom description": "Verifies meta description can be customized per page.",
  "should build full URL from relative path": "Confirms relative URLs are converted to absolute URLs.",
  "should handle URL with leading slash": "Verifies URLs starting with / are handled correctly.",
  "should handle URL without leading slash": "Confirms URLs without / prefix work correctly.",
  "should build image URL from relative path": "Verifies OG image URLs are generated correctly.",
  "should use absolute image URL as-is": "Confirms absolute image URLs are not modified.",
  "should handle keywords array": "Verifies keyword meta tags are generated from arrays.",
  "should handle article type with published time": "Confirms article structured data includes publish date.",
  "should handle noindex and nofollow flags": "Verifies robots meta directives work correctly.",
  "should set custom author": "Confirms author meta tag can be customized.",
  "should handle all options together": "Verifies all SEO options work in combination.",
  
  // Structured Data
  "should handle empty FAQ array": "Verifies FAQ structured data handles empty arrays.",
  "should handle FAQ items": "Confirms FAQ schema is generated correctly from items.",
  "should handle single FAQ item": "Verifies single FAQ generates valid schema.",
  "should handle FAQ with special characters": "Confirms special characters in FAQs are escaped properly.",
  "should work with default values": "Verifies organization schema uses sensible defaults.",
  "should handle custom organization name": "Confirms organization name can be customized.",
  "should handle custom URL": "Verifies organization URL can be set.",
  "should handle custom logo": "Confirms logo URL is included in organization schema.",
  "should handle custom description": "Verifies organization description is customizable.",
  "should handle contact point": "Confirms contact information is included in schema.",
  "should handle all options together": "Verifies all structured data options combine correctly.",
  "should work without search URL": "Confirms website schema works without search action.",
  "should handle search URL with leading slash": "Verifies search action URLs are generated correctly.",
  "should handle empty breadcrumb array": "Confirms empty breadcrumbs don't cause errors.",
  "should handle single breadcrumb": "Verifies single breadcrumb generates valid schema.",
  "should handle multiple breadcrumbs": "Confirms breadcrumb trail is generated correctly.",
  
  // FAQ Collapse
  "should initialize with collapseSignal at 0": "Verifies collapse state starts at initial value.",
  "should initialize with openAccordion as null": "Confirms no accordion is open initially.",
  "should increment collapseSignal when collapseAll is called": "Verifies collapse all triggers signal update.",
  "should reset openAccordion when collapseAll is called": "Confirms collapse all closes any open accordion.",
  "should set open accordion correctly": "Verifies specific accordion can be opened.",
  "should close accordion when setOpenAccordion is called with undefined": "Confirms accordions can be closed.",
  "should check if panel is open correctly": "Verifies open state detection works.",
  "should get open panel index correctly": "Confirms correct panel index is returned.",
  "should return undefined when no panel is open": "Verifies null state is handled.",
  "should handle multiple accordions correctly": "Confirms only one accordion opens at a time.",
  
  // Countdown
  "should calculate days remaining correctly": "Verifies days until deadline are calculated accurately in Chicago timezone (America/Chicago).",
  "should return 0 days when deadline has passed": "Confirms past deadlines show 0 days.",
  "should use Chicago timezone (America/Chicago) for all calculations": "Verifies the deadline (April 24, 2026 midnight CDT) is correctly interpreted in Chicago timezone.",
  "should format days remaining text correctly": "Verifies pluralization of 'day/days' is correct.",
  "should format \"1 day\" correctly": "Confirms singular 'day' is used for 1 day remaining.",
  "should format \"less than 1 day\" when less than 24 hours remain": "Verifies sub-day formatting.",
  "should show deadline passed message when deadline has passed": "Confirms past deadline message is shown.",
  "should provide urgency text for different time ranges": "Verifies urgency levels change over time.",
  "should update deadlinePassed correctly": "Confirms deadline passed flag updates properly.",
  
  // Print Links
  "should append URL to external links": "Verifies external links show their URLs in print view.",
  "should handle links without text by using URL": "Confirms empty links show URL as text.",
  "should style internal links as bold text": "Verifies internal links are styled differently.",
  "should not duplicate URLs if already appended": "Confirms URLs aren't added twice.",
  "should add text to empty table headers": "Verifies empty th elements get accessible text.",
  "should handle headers with only HTML comments": "Confirms comment-only headers are handled.",
  "should add aria-label to table headers": "Verifies table headers get ARIA labels.",
  
  // Slugify
  "should convert text to lowercase": "Verifies slug generation lowercases all text.",
  "should replace non-alphanumeric characters with hyphens": "Confirms special chars become hyphens.",
  "should remove leading and trailing hyphens": "Verifies clean slug boundaries.",
  "should truncate to maxLength": "Confirms slugs respect maximum length.",
  "should remove trailing hyphens after truncation": "Verifies clean truncation.",
  "should handle empty string": "Confirms empty input is handled.",
  "should handle special characters": "Verifies symbols are properly converted.",
  "should handle numbers": "Confirms numbers are preserved in slugs.",
  "should combine section and question slugs": "Verifies question IDs include section context.",
  "should handle different sections with same question": "Confirms unique IDs across sections.",
  "should handle special characters in section and question": "Verifies complex text slugifies correctly.",
  "should use default maxLength of 150": "Confirms default slug length limit.",
  "should return slugify and getQuestionId functions": "Verifies composable exports expected functions.",
  "should work correctly when used as composable": "Confirms composable usage pattern works.",
  
  // FAQ Transform
  "should return true for dates within the new window": "Verifies recent dates are marked as new.",
  "should return false for dates outside the new window": "Confirms old dates aren't marked as new.",
  "should return true for today": "Verifies today's date is within new window.",
  "should return true for dates exactly 10 days ago": "Confirms window boundary handling.",
  "should handle date comparisons consistently in Chicago timezone context": "Verifies date string comparisons work correctly regardless of server timezone, using Illinois (Chicago) context.",
  "should extract new date from curly braces format when within window": "Verifies {new:} tag parsing.",
  "should extract new date from HTML comment format when within window": "Confirms comment format works.",
  "should return null if no new date found": "Verifies graceful handling of missing tags.",
  "should return null if date is outside new window": "Confirms expired dates return null.",
  "should extract tagged date even if outside new window": "Verifies date extraction regardless of window.",
  "should return null if no tag is present": "Confirms missing tags return null.",
  "should remove new tag from nodes": "Verifies new tags are stripped from rendered content.",
  "should replace dynamic placeholders": "Confirms placeholder text substitution works.",
  "should filter out empty nodes after removing new tag": "Verifies clean node structure.",
  "should handle mixed content with new tags and regular text": "Confirms complex content handling.",
  "should wrap H3 questions and answers in div.qa-card": "Verifies Q&A card wrapping.",
  "should stop wrapping at next H1, H2, H3, or HR": "Confirms proper section boundaries.",
  "should leave non-H3 nodes unchanged": "Verifies non-question content is preserved.",
  "should transform FAQ markdown AST to accordion data": "Confirms AST to accordion transformation.",
  "should extract multiple FAQs": "Verifies multiple questions are extracted.",
  "should stop at H1, H2, or HR": "Confirms section boundary detection.",
  "should handle FAQs without new tags": "Verifies graceful handling of untagged FAQs.",
  "should return empty array for non-array input": "Confirms type safety on invalid input.",
  
  // Search Config
  "should have valid threshold value (0-1 range)": "Verifies fuzzy search threshold is valid.",
  "should have threshold set for balanced fuzzy matching": "Confirms threshold allows reasonable fuzziness.",
  "should have distance configured": "Verifies Fuse.js distance setting exists.",
  "should have minMatchCharLength configured": "Confirms minimum match length is set.",
  "should include score in results for ranking": "Verifies score inclusion setting.",
  "should include matches for highlighting": "Confirms match data is returned.",
  "should enable sorting for proper rank order": "Verifies result sorting is enabled.",
  "should ignore location for searching anywhere in text": "Confirms location-independent search.",
  "should have keys array defined": "Verifies search fields are configured.",
  "should search in question field with higher weight": "Confirms question field priority.",
  "should search in answer field with lower weight": "Verifies answer field is included.",
  "should prioritize question over answer (higher weight)": "Confirms field weighting order.",
  "should have weights that sum to approximately 1": "Verifies normalized field weights.",
  "should have relevance labels defined": "Confirms label configuration exists.",
  "should have excellent label with lowest threshold": "Verifies 'Excellent' threshold value.",
  "should have good label": "Confirms 'Good' label configuration.",
  "should have fair label": "Verifies 'Fair' label configuration.",
  "should have partial label as catch-all": "Confirms 'Partial' is the fallback label.",
  "should have ascending threshold order": "Verifies label thresholds are ordered.",
  "should have display settings defined": "Confirms display configuration exists.",
  "should have minimum search length": "Verifies min search length is set.",
  "should have answer preview length": "Confirms preview length configuration.",
  "should have context before match": "Verifies context before setting.",
  "should have context after match": "Confirms context after setting.",
  "should understand that lower score = better match in Fuse.js": "Documents Fuse.js scoring behavior.",
  "should have threshold that allows fuzzy matching": "Confirms threshold enables fuzzy search.",
};

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
  
  const generatedDate = new Date(summary.generatedAt || Date.now());
  const formattedDate = generatedDate.toLocaleDateString();
  const formattedTime = generatedDate.toLocaleTimeString();

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
    
    .test-case-description {
      margin-top: 0.5rem;
    }
    
    .test-case-description summary {
      font-size: 0.8rem;
      color: #0d6efd;
      cursor: pointer;
      user-select: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .test-case-description summary:hover {
      text-decoration: underline;
    }
    
    .test-case-description summary::marker {
      content: '';
    }
    
    .test-case-description summary::before {
      content: '▶';
      font-size: 0.6rem;
      transition: transform 0.2s ease;
    }
    
    .test-case-description[open] summary::before {
      transform: rotate(90deg);
    }
    
    .test-case-description .description-content {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #e7f1ff;
      border-left: 3px solid #0d6efd;
      border-radius: 4px;
      font-size: 0.85rem;
      color: #0a58ca;
      line-height: 1.5;
    }
    
    .test-case-description .description-content p {
      margin: 0;
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
            
            // Look up description for this test
            const description = TEST_DESCRIPTIONS[title] || null;
            const descriptionHTML = description
              ? `<details class="test-case-description">
                  <summary>What does this test verify?</summary>
                  <div class="description-content">
                    <p>${description}</p>
                  </div>
                </details>`
              : "";

            return `
      <div class="test-case ${caseClass}">
        <div class="test-case-title">${statusIcon} ${title}</div>
        <div class="test-case-duration">Duration: ${duration}</div>
        ${descriptionHTML}
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
