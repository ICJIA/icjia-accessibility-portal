/**
 * Generate an accessible Word document (.docx) version of the FAQs.
 *
 * Uses the 'docx' package to create a properly structured Word document
 * with heading styles, lists, and tables that maintains accessibility.
 *
 * Usage:
 *   node scripts/generate-faq-docx.js --input content/faqs.md --out .output/public/ICJIA-Accessibility-FAQs.docx
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ExternalHyperlink,
  Packer,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  TableOfContents,
  StyleLevel,
} from "docx";

function getArg(name, fallback = undefined) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  const value = process.argv[idx + 1];
  return value ?? fallback;
}

const inputPath = getArg("--input", "content/faqs.md");
const outPath = getArg(
  "--out",
  ".output/public/ICJIA-Accessibility-FAQs.docx"
);

/**
 * Strip HTML tags from text, preserving link info
 */
function stripHtml(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Extract links from HTML
 */
function extractLinks(text) {
  const links = [];
  const regex = /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push({ url: match[1], text: match[2] });
  }
  return links;
}

/**
 * Parse a markdown line into TextRun elements with formatting
 */
function parseInlineFormatting(text) {
  const runs = [];
  let remaining = text;

  // Simple approach: extract and create runs for formatted text
  // Handle bold **text**, italic *text*, code `text`, and links [text](url)

  // First, handle HTML links
  const linkPattern = /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
  remaining = remaining.replace(linkPattern, "[$2]($1)");

  // Parse the text character by character for markdown formatting
  let i = 0;
  let currentText = "";
  let isBold = false;
  let isItalic = false;

  while (i < remaining.length) {
    // Check for bold **
    if (remaining.slice(i, i + 2) === "**") {
      if (currentText) {
        runs.push(
          new TextRun({
            text: currentText,
            bold: isBold,
            italics: isItalic,
          })
        );
        currentText = "";
      }
      isBold = !isBold;
      i += 2;
      continue;
    }

    // Check for italic * (but not **)
    if (
      remaining[i] === "*" &&
      remaining[i + 1] !== "*" &&
      remaining[i - 1] !== "*"
    ) {
      if (currentText) {
        runs.push(
          new TextRun({
            text: currentText,
            bold: isBold,
            italics: isItalic,
          })
        );
        currentText = "";
      }
      isItalic = !isItalic;
      i++;
      continue;
    }

    // Check for inline code `
    if (remaining[i] === "`") {
      if (currentText) {
        runs.push(
          new TextRun({
            text: currentText,
            bold: isBold,
            italics: isItalic,
          })
        );
        currentText = "";
      }
      const endIndex = remaining.indexOf("`", i + 1);
      if (endIndex > i) {
        const codeText = remaining.slice(i + 1, endIndex);
        runs.push(
          new TextRun({
            text: codeText,
            font: "Courier New",
            shading: { fill: "E8E8E8" },
          })
        );
        i = endIndex + 1;
        continue;
      }
    }

    // Check for markdown links [text](url)
    if (remaining[i] === "[") {
      const closeText = remaining.indexOf("]", i);
      if (closeText > i && remaining[closeText + 1] === "(") {
        const closeUrl = remaining.indexOf(")", closeText);
        if (closeUrl > closeText) {
          if (currentText) {
            runs.push(
              new TextRun({
                text: currentText,
                bold: isBold,
                italics: isItalic,
              })
            );
            currentText = "";
          }
          const linkText = remaining.slice(i + 1, closeText);
          const linkUrl = remaining.slice(closeText + 2, closeUrl);
          runs.push(
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: linkText,
                  style: "Hyperlink",
                }),
              ],
              link: linkUrl,
            })
          );
          i = closeUrl + 1;
          continue;
        }
      }
    }

    currentText += remaining[i];
    i++;
  }

  if (currentText) {
    runs.push(
      new TextRun({
        text: stripHtml(currentText),
        bold: isBold,
        italics: isItalic,
      })
    );
  }

  return runs.length > 0
    ? runs
    : [new TextRun({ text: stripHtml(text) })];
}

/**
 * Parse markdown table into docx Table
 */
function parseTable(lines) {
  const rows = [];
  let isHeader = true;

  for (const line of lines) {
    // Skip separator lines
    if (/^\|[-:\s|]+\|$/.test(line)) {
      isHeader = false;
      continue;
    }

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());

    rows.push(
      new TableRow({
        children: cells.map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: parseInlineFormatting(cell),
                  alignment: AlignmentType.LEFT,
                }),
              ],
              shading: isHeader ? { fill: "E8E8E8" } : undefined,
            })
        ),
      })
    );
  }

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

/**
 * Convert markdown to docx paragraphs
 */
function markdownToDocxParagraphs(markdown) {
  const paragraphs = [];
  const lines = markdown.split("\n");

  let i = 0;
  let inBlockquote = false;
  let inList = false;
  let listItems = [];

  // Remove YAML frontmatter
  if (lines[0] === "---") {
    while (i < lines.length && lines[i] !== "---") {
      i++;
    }
    i++; // Skip closing ---
    if (lines[i] === "---") i++;
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Skip {new:YYYY-MM-DD} tags
    if (/^\{new:\s*\d{4}-\d{2}-\d{2}\}$/.test(trimmed)) {
      i++;
      continue;
    }

    // H1
    if (trimmed.startsWith("# ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(2)),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );
      i++;
      continue;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(3)),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 360, after: 160 },
        })
      );
      i++;
      continue;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(4)),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 280, after: 120 },
        })
      );
      i++;
      continue;
    }

    // H4
    if (trimmed.startsWith("#### ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(5)),
          heading: HeadingLevel.HEADING_4,
          spacing: { before: 240, after: 100 },
        })
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      paragraphs.push(
        new Paragraph({
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 6 },
          },
          spacing: { before: 200, after: 200 },
        })
      );
      i++;
      continue;
    }

    // Table
    if (trimmed.startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      paragraphs.push(parseTable(tableLines));
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(2)),
          indent: { left: 720 },
          border: {
            left: { style: BorderStyle.SINGLE, size: 12, color: "CCCCCC" },
          },
          spacing: { before: 120, after: 120 },
        })
      );
      i++;
      continue;
    }

    // Unordered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(2)),
          bullet: { level: 0 },
          spacing: { before: 60, after: 60 },
        })
      );
      i++;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s/, "");
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(content),
          numbering: { reference: "default-numbering", level: 0 },
          spacing: { before: 60, after: 60 },
        })
      );
      i++;
      continue;
    }

    // Regular paragraph
    paragraphs.push(
      new Paragraph({
        children: parseInlineFormatting(trimmed),
        spacing: { before: 120, after: 120 },
      })
    );
    i++;
  }

  return paragraphs;
}

async function main() {
  console.log(`[generate-faq-docx] Reading ${inputPath}...`);

  const markdown = await readFile(inputPath, "utf-8");

  // Get current date for header
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create document header paragraphs
  const headerParagraphs = [
    new Paragraph({
      children: [
        new TextRun({
          text: "ICJIA Digital Accessibility FAQ",
          bold: true,
          size: 48,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Illinois Criminal Justice Information Authority",
          size: 28,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated: ${dateStr}`,
          size: 22,
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "ADA Title II Compliance Deadline: April 24, 2026",
          size: 22,
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 12 },
      },
      spacing: { after: 400 },
    }),
  ];

  // Convert markdown to paragraphs
  const contentParagraphs = markdownToDocxParagraphs(markdown);

  // Create footer paragraphs
  const footerParagraphs = [
    new Paragraph({
      border: {
        top: { style: BorderStyle.SINGLE, size: 12 },
      },
      spacing: { before: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `© ${now.getFullYear()} Illinois Criminal Justice Information Authority (ICJIA)`,
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Website: ", size: 20 }),
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: "https://accessibility.icjia.app",
              style: "Hyperlink",
              size: 20,
            }),
          ],
          link: "https://accessibility.icjia.app",
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
  ];

  // Create the document
  const doc = new Document({
    title: "ICJIA Digital Accessibility FAQ",
    subject: "Comprehensive guide to digital accessibility compliance for ICJIA",
    creator: "Illinois Criminal Justice Information Authority",
    keywords: "accessibility, WCAG, ADA, IITAA, digital accessibility, compliance",
    description: "Accessible Word document version of the ICJIA Digital Accessibility FAQ",
    numbering: {
      config: [
        {
          reference: "default-numbering",
          levels: [
            {
              level: 0,
              format: NumberFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "ICJIA Digital Accessibility FAQ",
                    size: 18,
                    color: "666666",
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Page ",
                    size: 18,
                    color: "666666",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    color: "666666",
                  }),
                  new TextRun({
                    text: " of ",
                    size: 18,
                    color: "666666",
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 18,
                    color: "666666",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: [
          ...headerParagraphs,
          ...contentParagraphs,
          ...footerParagraphs,
        ],
      },
    ],
  });

  // Generate the document
  const buffer = await Packer.toBuffer(doc);
  await writeFile(outPath, buffer);

  console.log(`[generate-faq-docx] ✅ Word document generated: ${outPath}`);
  console.log(
    `[generate-faq-docx] File size: ${(buffer.length / 1024).toFixed(1)} KB`
  );
  console.log("[generate-faq-docx] Document features:");
  console.log("  • Proper heading hierarchy (H1-H4)");
  console.log("  • Hyperlinks preserved");
  console.log("  • Tables with headers");
  console.log("  • Page numbers");
  console.log("  • Document metadata (title, subject, keywords)");
}

main().catch((e) => {
  console.error("[generate-faq-docx] Failed:", e);
  process.exit(1);
});

