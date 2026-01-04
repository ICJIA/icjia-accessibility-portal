/**
 * Generate a Markdown (.md) version of the FAQs for download.
 *
 * Creates a self-contained Markdown file with proper formatting,
 * header, and footer that can be viewed in any Markdown viewer.
 *
 * Usage:
 *   node scripts/generate-faq-md.js --input content/faqs.md --out .output/public/ICJIA-Accessibility-FAQs.md
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
const outPath = getArg("--out", ".output/public/ICJIA-Accessibility-FAQs.md");

async function main() {
  console.log(`[generate-faq-md] Reading ${inputPath}...`);

  let markdown = await readFile(inputPath, "utf-8");

  // Get current date for header
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Remove existing YAML frontmatter
  markdown = markdown.replace(/^---[\s\S]*?---\n*/m, "");

  // Clean up {new:YYYY-MM-DD} tags - convert to visible badges
  markdown = markdown.replace(
    /\{new:\s*(\d{4}-\d{2}-\d{2})\}/g,
    "🆕 *New*"
  );

  // Create header
  const header = `# ICJIA Digital Accessibility FAQ

**Illinois Criminal Justice Information Authority**

---

| | |
|---|---|
| **Generated** | ${dateStr} |
| **Source** | [https://accessibility.icjia.app](https://accessibility.icjia.app) |
| **Compliance Deadline** | April 24, 2026 (ADA Title II) |

> **About this file**: This is a downloadable Markdown version of the ICJIA Accessibility FAQ.
> Markdown files can be viewed in any text editor, or rendered with formatting in:
> - GitHub, GitLab, Bitbucket
> - VS Code, Obsidian, Typora
> - Any Markdown viewer app
>
> For the interactive web version, visit: [https://accessibility.icjia.app](https://accessibility.icjia.app)

---

`;

  // Create footer
  const footer = `

---

## Document Information

| | |
|---|---|
| **Organization** | Illinois Criminal Justice Information Authority (ICJIA) |
| **Website** | [https://icjia.illinois.gov](https://icjia.illinois.gov) |
| **Accessibility Portal** | [https://accessibility.icjia.app](https://accessibility.icjia.app) |
| **Generated** | ${dateStr} |
| **Compliance Deadline** | April 24, 2026 |

---

*© ${now.getFullYear()} Illinois Criminal Justice Information Authority (ICJIA)*

*For questions about this document, contact your agency's accessibility coordinator or Illinois DoIT: DoIT.Accessibility@Illinois.gov*
`;

  // Combine all parts
  const output = header + markdown + footer;

  // Write output
  await writeFile(outPath, output, "utf-8");

  console.log(`[generate-faq-md] ✅ Markdown FAQ generated: ${outPath}`);
  console.log(`[generate-faq-md] File size: ${(output.length / 1024).toFixed(1)} KB`);
}

main().catch((e) => {
  console.error("[generate-faq-md] Failed:", e);
  process.exit(1);
});

