/**
 * Generate an accessible plain text (.txt) version of the FAQs.
 *
 * Reads the faqs.md content and converts it to a well-formatted plain text file
 * that is fully accessible and universally readable.
 *
 * Usage:
 *   node scripts/generate-faq-txt.js --input content/faqs.md --out .output/public/ICJIA-Accessibility-FAQs.txt
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

function getArg(name, fallback = undefined) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  const value = process.argv[idx + 1];
  return value ?? fallback;
}

const inputPath = getArg("--input", "content/faqs.md");
const outPath = getArg("--out", ".output/public/ICJIA-Accessibility-FAQs.txt");

/**
 * Strip HTML tags from text
 */
function stripHtml(text) {
  return text
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, "$2 ($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Convert markdown to plain text
 */
function markdownToPlainText(markdown) {
  let text = markdown;

  // Remove YAML frontmatter
  text = text.replace(/^---[\s\S]*?---\n*/m, "");

  // Convert headers to uppercase with underlines
  text = text.replace(/^# (.+)$/gm, (_, title) => {
    const clean = stripHtml(title);
    return `\n${"=".repeat(70)}\n${clean.toUpperCase()}\n${"=".repeat(70)}\n`;
  });

  text = text.replace(/^## (.+)$/gm, (_, title) => {
    const clean = stripHtml(title);
    return `\n${"-".repeat(60)}\n${clean.toUpperCase()}\n${"-".repeat(60)}\n`;
  });

  text = text.replace(/^### (.+)$/gm, (_, title) => {
    const clean = stripHtml(title);
    return `\n${clean}\n${"~".repeat(clean.length)}\n`;
  });

  text = text.replace(/^#### (.+)$/gm, (_, title) => {
    const clean = stripHtml(title);
    return `\n${clean}:\n`;
  });

  // Convert bold and italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "$1");
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/\*(.+?)\*/g, "$1");
  text = text.replace(/___(.+?)___/g, "$1");
  text = text.replace(/__(.+?)__/g, "$1");
  text = text.replace(/_(.+?)_/g, "$1");

  // Convert inline code
  text = text.replace(/`([^`]+)`/g, '"$1"');

  // Convert links: [text](url) → text (url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  // Strip any remaining HTML
  text = stripHtml(text);

  // Convert blockquotes
  text = text.replace(/^> (.+)$/gm, "    $1");

  // Convert horizontal rules
  text = text.replace(/^---+$/gm, "\n" + "-".repeat(50) + "\n");

  // Convert tables to simple format
  text = text.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split("|").map((c) => c.trim());
    return cells.join("  |  ");
  });

  // Remove table separator rows
  text = text.replace(/^\|[-:\s|]+\|$/gm, "");

  // Clean up {new:YYYY-MM-DD} tags
  text = text.replace(/\{new:\s*\d{4}-\d{2}-\d{2}\}/g, "[NEW]");

  // Clean up multiple newlines
  text = text.replace(/\n{4,}/g, "\n\n\n");

  return text.trim();
}

async function main() {
  console.log(`[generate-faq-txt] Reading ${inputPath}...`);

  const markdown = await readFile(inputPath, "utf-8");

  // Get current date for header
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create header
  const header = `
${"=".repeat(70)}
ICJIA DIGITAL ACCESSIBILITY FAQ
Illinois Criminal Justice Information Authority
${"=".repeat(70)}

Generated: ${dateStr}
Source: https://accessibility.icjia.app
ADA Title II Compliance Deadline: April 24, 2026

This is an accessible plain text version of the ICJIA Accessibility FAQ.
For the interactive web version, visit: https://accessibility.icjia.app

${"=".repeat(70)}

`;

  // Create footer
  const footer = `

${"=".repeat(70)}
END OF DOCUMENT
${"=".repeat(70)}

© ${now.getFullYear()} Illinois Criminal Justice Information Authority (ICJIA)
Website: https://icjia.illinois.gov
Accessibility Portal: https://accessibility.icjia.app

For questions about this document, contact your agency's accessibility
coordinator or Illinois DoIT: DoIT.Accessibility@Illinois.gov

${"=".repeat(70)}
`;

  // Convert markdown to plain text
  const content = markdownToPlainText(markdown);

  // Combine all parts
  const output = header + content + footer;

  // Write output
  await writeFile(outPath, output, "utf-8");

  console.log(`[generate-faq-txt] ✅ Plain text FAQ generated: ${outPath}`);
  console.log(`[generate-faq-txt] File size: ${(output.length / 1024).toFixed(1)} KB`);
}

main().catch((e) => {
  console.error("[generate-faq-txt] Failed:", e);
  process.exit(1);
});

