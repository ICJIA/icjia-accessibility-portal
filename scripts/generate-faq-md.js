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

## About These FAQs

**What these FAQs are:** These FAQs represent ICJIA's best effort to provide accurate, helpful information about digital accessibility compliance. They are based on questions ICJIA staff have asked over the past several months and reflect common concerns and misconceptions we've encountered.

**Why they exist:** Many people are new to accessibility requirements and don't know where to start. This FAQ attempts to provide general guidance and answer common questions in plain language. It is not intended to be a comprehensive legal guide or to replace consultation with legal counsel or accessibility experts. These FAQs represent ICJIA's commitment to Diversity, Equity, Inclusion, and Accessibility (DEIA) by ensuring all staff have the information they need to create accessible content that serves all Illinois residents.

**Who created them:** These FAQs were created by **ICJIA's IDS Unit (formerly 'ISU' unit)**. While ICJIA web developers have years of experience with accessibility work, creating comprehensive FAQs about accessibility compliance is new to ICJIA IT staff due to recent compliance requirements. This represents our best effort to translate the new ADA guidelines into practical guidance, and we recognize that we may make mistakes as we navigate this new territory. We welcome feedback and corrections.

**Accuracy and corrections:** These FAQs cannot cover every accessibility issue or scenario. If you find any information that is incorrect, incomplete, or needs clarification, **please immediately contact ICJIA's IDS Unit (formerly 'ISU' unit)** with specific corrections and accurate information. We are committed to keeping this resource as accurate and helpful as possible.

**ICJIA's commitment to transparency:** We believe in being forthright about accessibility requirements, compliance obligations, and the reality of enforcement. Some answers may be difficult to hear, particularly for managers facing resource constraints. However, hiding information doesn't help anyone — not the people who need accessible content, not the staff trying to do their jobs, and not the agency trying to meet its legal obligations. ICJIA's goal is to provide honest, practical information that helps ICJIA staff make informed decisions.

**Not legal advice:** This FAQ provides general guidance based on public information and common practices. It is not legal advice. For specific legal questions or interpretations, consult with your agency's legal counsel or Illinois DoIT's accessibility guidance.

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

