<template>
  <div class="print-container">
    <!-- Header Section -->
    <div class="print-header">
      <div class="print-logo-section">
        <img
          src="/icjia-logo-1x.png"
          alt="Illinois Criminal Justice Information Authority"
          class="print-logo"
          width="57"
          height="40"
        />
        <div class="print-title-block">
          <h1 class="print-main-title">
            Digital Accessibility FAQ for the Illinois Criminal Justice Information Authority
          </h1>
          <p class="print-subtitle">
            A comprehensive guide to digital accessibility compliance for ICJIA.
          </p>
          <p class="print-date">
            <strong>Last Updated:</strong> {{ lastUpdated }}
          </p>
          <p class="print-deadline">
            <strong>ADA Title II Compliance Deadline:</strong> April 24, 2026
          </p>
        </div>
      </div>
      <div class="print-notice">
        <p>
          <strong>Note:</strong> This is a printer-friendly version of all FAQs.
          For the interactive online version, visit: <a 
            :href="baseUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="print-url"
          >{{ baseUrl }}</a>
        </p>
      </div>
    </div>

    <!-- FAQ Disclaimer Section -->
    <div class="print-disclaimer">
      <h2 class="print-disclaimer-title">About These FAQs</h2>
      <div class="print-disclaimer-content">
        <p><strong>What these FAQs are:</strong> These FAQs represent ICJIA's best effort to provide accurate, helpful information about digital accessibility compliance. They are based on questions ICJIA staff have asked over the past several months and reflect common concerns and misconceptions we've encountered.</p>
        
        <p><strong>Why they exist:</strong> Many people are new to accessibility requirements and don't know where to start. This FAQ attempts to provide general guidance and answer common questions in plain language. It is not intended to be a comprehensive legal guide or to replace consultation with legal counsel or accessibility experts. These FAQs represent ICJIA's commitment to Diversity, Equity, Inclusion, and Accessibility (DEIA) by ensuring all staff have the information they need to create accessible content that serves all Illinois residents.</p>
        
        <p><strong>Who created them:</strong> These FAQs were created by <strong>ICJIA's IDS Unit</strong>. While ICJIA web developers have years of experience with accessibility work, creating comprehensive FAQs about accessibility compliance is new to ICJIA IT staff due to recent compliance requirements. This represents our best effort to translate the new ADA guidelines into practical guidance, and we recognize that we may make mistakes as we navigate this new territory. We welcome feedback and corrections.</p>
        
        <p><strong>Accuracy and corrections:</strong> These FAQs cannot cover every accessibility issue or scenario. If you find any information that is incorrect, incomplete, or needs clarification, <strong>please immediately contact ICJIA's IDS Unit</strong> with specific corrections and accurate information. We are committed to keeping this resource as accurate and helpful as possible.</p>
        
        <p><strong>ICJIA's commitment to transparency:</strong> We believe in being forthright about accessibility requirements, compliance obligations, and the reality of enforcement. Some answers may be difficult to hear, particularly for managers facing resource constraints. However, hiding information doesn't help anyone — not the people who need accessible content, not the staff trying to do their jobs, and not the agency trying to meet its legal obligations. ICJIA's goal is to provide honest, practical information that helps ICJIA staff make informed decisions.</p>
        
        <p><strong>Not legal advice:</strong> This FAQ provides general guidance based on public information and common practices. It is not legal advice. For specific legal questions or interpretations, consult with ICJIA's legal counsel or Illinois DoIT's accessibility guidance.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!page" class="print-loading">
      <p>Loading FAQs...</p>
    </div>

    <!-- Content Sections -->
    <div v-else class="print-content">
      <!-- Render intro content if present -->
      <div v-if="introContent" class="print-intro">
        <ContentRenderer :value="introContent" />
      </div>

      <!-- Table of Contents -->
      <div class="print-toc">
        <h2 class="print-toc-title">Table of Contents</h2>
        <ol class="print-toc-list">
          <li
            v-for="(section, sectionIndex) in faqSections"
            :key="sectionIndex"
          >
            <span class="print-toc-link print-internal-link">
              {{ section.heading || `Section ${sectionIndex + 1}` }}
            </span>
            <span class="print-toc-count"
              >({{ section.items.length }} question{{
                section.items.length !== 1 ? "s" : ""
              }})</span
            >
          </li>
        </ol>
      </div>

      <!-- FAQ Sections -->
      <div
        v-for="(section, sectionIndex) in faqSections"
        :key="sectionIndex"
        class="print-section"
      >
        <h2
          v-if="section.heading"
          :id="`section-${sectionIndex}`"
          class="print-section-heading"
        >
          {{ section.heading }}
        </h2>

        <!-- FAQ Items -->
        <div
          v-for="(item, itemIndex) in section.items"
          :key="itemIndex"
          class="print-faq-item"
        >
          <h3 class="print-question">
            <span class="print-question-number"
              >Q{{ itemIndex + 1 }}:</span
            >
            {{ item.question }}
            <span v-if="item.isNew" class="print-new-badge">NEW</span>
          </h3>
          <div class="print-answer">
            <ContentRenderer
              v-if="item.answerContent"
              :value="item.answerContent"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="print-footer-content">
        <hr class="print-divider" />
        <p class="print-footer-text">
          © {{ currentYear }} Illinois Criminal Justice Information Authority
          (ICJIA)
        </p>
        <p class="print-footer-text">
          For more information, visit: 
          <a 
            :href="baseUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="print-url"
          >{{ baseUrl }}</a>
        </p>
        <p class="print-footer-text">
          Accessibility Report:
          <a 
            :href="`${baseUrl}/docs/accessibility/`" 
            target="_blank" 
            rel="noopener noreferrer"
            class="print-url"
          >{{ baseUrl }}/docs/accessibility/</a>
        </p>
        <p class="print-footer-text">
          Last Updated: {{ lastUpdated }} | ADA Title II Compliance Deadline: April 24, 2026
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Printer-friendly FAQs page
 * @description Displays all FAQs in a clean, printable format with proper structure
 */

// Use print layout (no navbar/footer)
definePageMeta({
  layout: "print",
});

import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { usePrintLinks } from "../composables/usePrintLinks";
import { wrapTablesForResponsiveScroll, filterNewComments } from "../utils/faqTransform";

/** @type {import('nuxt/app').AsyncData<import('@nuxt/content').ParsedContent>} FAQ page content */
const { data: page } = await useAsyncData("faqs-print", () => {
  return queryCollection("faqs").first();
}, {
  // Disable caching to always fetch fresh content
  getCachedData: () => undefined,
});

/** @typedef {any} MiniMarkNode */
type MiniMarkNode = any;

/**
 * Type guard to check if a node is an element node
 */
function isElementNode(node: MiniMarkNode): node is any[] {
  return Array.isArray(node) && typeof node[0] === "string";
}

/**
 * Gets the tag name from an element node
 */
function tagName(node: any[]): string {
  return node[0];
}

/**
 * Extracts text content from a markdown node
 */
function extractText(node: any): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node) && node.length > 2) {
    return node.slice(2).map(extractText).join("");
  }
  return "";
}

/**
 * Check if a date string is within the "new" window (10 days)
 */
function isWithinNewWindow(dateStr: string): boolean {
  const addedDate = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - addedDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 10;
}

/**
 * Pattern to match the new tag
 */
const NEW_TAG_PATTERN =
  /(?:\{new:\s*(\d{4}-\d{2}-\d{2})\}|<!--\s*new:\s*(\d{4}-\d{2}-\d{2})\s*-->)/;

/**
 * Extract the "new" date from answer nodes if present
 */
function extractNewDate(answerNodes: MiniMarkNode[]): string | null {
  for (const node of answerNodes) {
    if (typeof node === "string") {
      const match = node.match(NEW_TAG_PATTERN);
      if (match) {
        const dateStr = match[1] || match[2];
        if (dateStr && isWithinNewWindow(dateStr)) {
          return dateStr;
        }
      }
    }
    // Check inside paragraph nodes
    if (isElementNode(node) && tagName(node) === "p") {
      const text = extractText(node);
      const match = text.match(NEW_TAG_PATTERN);
      if (match) {
        const dateStr = match[1] || match[2];
        if (dateStr && isWithinNewWindow(dateStr)) {
          return dateStr;
        }
      }
    }
  }
  return null;
}

/**
 * Processed FAQ sections with headings and items
 */
const faqSections = computed(() => {
  if (!page.value) return [];
  const body = page.value.body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return [];

  const nodes = body.value;
  const sections: Array<{
    heading: string | null;
    items: Array<{
      question: string;
      answer: MiniMarkNode[];
      isNew?: boolean;
      answerContent?: any;
    }>;
  }> = [];
  let currentSection: {
    heading: string | null;
    items: Array<{
      question: string;
      answer: MiniMarkNode[];
      isNew?: boolean;
      answerContent?: any;
    }>;
  } | null = null;
  let i = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    if (isElementNode(node)) {
      const tag = tagName(node);

      if (tag === "h2") {
        // Start new section
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          heading: extractText(node),
          items: [],
        };
        i++;
        continue;
      } else if (tag === "h3") {
        // Extract FAQ item
        if (!currentSection) {
          currentSection = { heading: null, items: [] };
        }
        const questionText = extractText(node);
        const answerNodes: MiniMarkNode[] = [];
        i++;

        while (i < nodes.length) {
          const next = nodes[i];
          if (isElementNode(next)) {
            const t = tagName(next);
            if (t === "h1" || t === "h2" || t === "h3" || t === "hr") break;
          }
          answerNodes.push(next);
          i++;
        }

        if (questionText) {
          // Check for "new" date
          const newDate = extractNewDate(answerNodes);
          const filteredAnswer = filterNewComments(answerNodes);
          const responsiveAnswer = wrapTablesForResponsiveScroll(filteredAnswer);

          // Create content object for rendering
          const answerContent = page.value
            ? {
                ...page.value,
                body: {
                  ...body,
                  value: responsiveAnswer,
                },
              }
            : null;

          currentSection.items.push({
            question: questionText,
            answer: responsiveAnswer,
            isNew: newDate !== null,
            answerContent: answerContent,
          });
        }
        continue;
      }
    }

    i++;
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
});

// Extract intro content (content before first H2)
const introContent = computed(() => {
  if (!page.value) return null;
  const body = page.value.body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return null;

  const nodes = body.value;
  const introNodes: MiniMarkNode[] = [];

  for (const node of nodes) {
    if (
      isElementNode(node) &&
      (tagName(node) === "h2" || tagName(node) === "h1")
    ) {
      break;
    }
    introNodes.push(node);
  }

  if (introNodes.length === 0) return null;

  // Process intro nodes to replace dynamic placeholders like {days_until_deadline}
  const processedIntroNodes = wrapTablesForResponsiveScroll(
    filterNewComments(introNodes)
  );

  return {
    ...page.value,
    body: {
      ...body,
      value: processedIntroNodes,
    },
  };
});

// Current year for copyright
const currentYear = new Date().getFullYear();

// Last updated date - dynamically from FAQ content frontmatter
const lastUpdated = computed(() => {
  if (page.value?.lastUpdated) {
    const date = new Date(page.value.lastUpdated);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Chicago",
    });
  }
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
});

// Base URL - use production URL for printer version
const baseUrl = "https://accessibility.icjia.app";

// Process links for print accessibility
usePrintLinks();

// SEO
useSeo({
  title: "Printer-Friendly FAQs - Digital Accessibility FAQ",
  description:
    "Printer-friendly version of all digital accessibility FAQs for Illinois state agency employees. Comprehensive guide covering WCAG 2.1 AA compliance, ADA Title II requirements, and accessibility best practices.",
  url: "/faqs-print",
  type: "article",
  keywords: [
    "accessibility FAQ printable",
    "WCAG 2.1 AA compliance guide",
    "digital accessibility reference",
    "ADA compliance handbook",
    "accessibility best practices",
  ],
});
</script>

<style scoped>
/* ======================
   PRINT-FRIENDLY STYLES
   ====================== */

.print-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #000;
  background: #fff;
}

/* Header */
.print-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #000;
}

.print-logo-section {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.print-logo {
  width: 57px;
  height: 40px;
  flex-shrink: 0;
}

.print-title-block {
  flex: 1;
}

.print-main-title {
  font-size: 18pt;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.print-subtitle {
  font-size: 11pt;
  margin: 0 0 0.5rem 0;
  font-style: italic;
  color: #333;
}

.print-date,
.print-deadline {
  font-size: 10pt;
  margin: 0.25rem 0;
}

.print-notice {
  background: #f5f5f5;
  padding: 0.75rem;
  border-left: 4px solid #666;
  margin-top: 1rem;
}

.print-notice p {
  margin: 0;
  font-size: 9pt;
}

/* Disclaimer Section */
.print-disclaimer {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f0f7ff;
  border: 2px solid #0066cc;
  border-left: 6px solid #0066cc;
  page-break-inside: avoid;
}

.print-disclaimer-title {
  font-size: 14pt;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #0066cc;
}

.print-disclaimer-content {
  font-size: 10pt;
  line-height: 1.6;
}

.print-disclaimer-content p {
  margin: 0.75rem 0;
}

.print-disclaimer-content p:first-child {
  margin-top: 0;
}

.print-disclaimer-content p:last-child {
  margin-bottom: 0;
}

.print-disclaimer-content strong {
  font-weight: bold;
  color: #004499;
}

.print-url {
  font-family: "Courier New", monospace;
  font-size: 9pt;
  word-break: break-all;
  color: #0066cc;
  text-decoration: underline;
}

/* Make links interactive on screen, but print-friendly */
@media screen {
  .print-url:hover {
    color: #0052a3;
    text-decoration: underline;
  }
  
  .print-url:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
    border-radius: 2px;
  }
}

@media print {
  .print-url {
    color: #000;
    text-decoration: none;
  }
}

/* Loading State */
.print-loading {
  text-align: center;
  padding: 2rem;
  font-size: 12pt;
}

/* Table of Contents */
.print-toc {
  margin: 2rem 0;
  padding: 1rem;
  background: #f9f9f9;
  border: 2px solid #ddd;
  page-break-inside: avoid;
}

.print-toc-title {
  font-size: 14pt;
  font-weight: bold;
  margin: 0 0 1rem 0;
  text-align: center;
}

.print-toc-list {
  margin: 0;
  padding-left: 2rem;
  list-style: decimal;
}

.print-toc-list li {
  margin: 0.5rem 0;
  font-size: 10pt;
}

.print-toc-link {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

/* Internal link styling - bold, no underline */
.print-internal-link {
  font-weight: bold;
  text-decoration: none;
  color: #000;
}

.print-toc-count {
  font-size: 9pt;
  color: #666;
  font-style: italic;
  margin-left: 0.5rem;
}

/* Intro Content */
.print-intro {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

.print-intro :deep(h1) {
  display: none;
}

.print-intro :deep(p) {
  margin: 0.75rem 0;
}

.print-intro :deep(hr) {
  border: none;
  border-top: 1px solid #ddd;
  margin: 1.5rem 0;
}

/* Section Styles */
.print-section {
  margin: 2rem 0 3rem 0;
  page-break-inside: avoid;
}

.print-section-heading {
  font-size: 16pt;
  font-weight: bold;
  margin: 2rem 0 1rem 0;
  padding: 0.5rem 0.75rem;
  background: #000;
  color: #fff;
  page-break-after: avoid;
}

/* FAQ Item Styles */
.print-faq-item {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  background: #fafafa;
  page-break-inside: avoid;
}

.print-question {
  font-size: 12pt;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  page-break-after: avoid;
}

.print-question-number {
  color: #666;
  margin-right: 0.5rem;
}

.print-new-badge {
  display: inline-block;
  background: #000;
  color: #fff;
  font-size: 8pt;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  margin-left: 0.5rem;
  font-weight: normal;
  vertical-align: middle;
}

.print-answer {
  font-size: 10pt;
  line-height: 1.7;
}

.print-answer :deep(p) {
  margin: 0.5rem 0;
}

.print-answer :deep(p:first-child) {
  margin-top: 0;
}

.print-answer :deep(strong) {
  font-weight: bold;
}

.print-answer :deep(em) {
  font-style: italic;
}

.print-answer :deep(ul),
.print-answer :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 2rem;
}

.print-answer :deep(li) {
  margin: 0.25rem 0;
}

.print-answer :deep(a) {
  color: #000;
  text-decoration: underline;
  word-break: break-all;
}

/* Internal links (section references) - bold, no underline */
.print-answer :deep(a.print-internal-link),
.print-intro :deep(a.print-internal-link),
.print-content :deep(a.print-internal-link) {
  font-weight: bold;
  text-decoration: none;
  color: #000;
  cursor: default;
}

.print-answer :deep(a.print-internal-link:hover),
.print-intro :deep(a.print-internal-link:hover),
.print-content :deep(a.print-internal-link:hover) {
  text-decoration: none;
  color: #000;
}

/* Ensure links always have visible text - never hide link content */
.print-answer :deep(a),
.print-intro :deep(a),
.print-content :deep(a) {
  /* Ensure link text is always visible */
  visibility: visible !important;
  display: inline !important;
  opacity: 1 !important;
}

.print-answer :deep(code) {
  font-family: "Courier New", monospace;
  background: #f0f0f0;
  padding: 0.1rem 0.3rem;
  border: 1px solid #ddd;
  font-size: 9pt;
}

.print-answer :deep(pre) {
  background: #f5f5f5;
  padding: 0.75rem;
  border: 1px solid #ddd;
  overflow-x: auto;
  font-size: 9pt;
  margin: 0.75rem 0;
}

.print-answer :deep(blockquote) {
  border-left: 3px solid #666;
  padding-left: 1rem;
  margin: 0.75rem 0;
  font-style: italic;
  color: #333;
}

.print-answer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.75rem 0;
  font-size: 9pt;
}

.print-answer :deep(th),
.print-answer :deep(td) {
  border: 1px solid #ddd;
  padding: 0.4rem;
  text-align: left;
}

.print-answer :deep(th) {
  background: #f0f0f0;
  font-weight: bold;
}

.print-answer :deep(h4) {
  font-size: 11pt;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

/* Footer */
.print-footer-content {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 2px solid #000;
  page-break-inside: avoid;
}

.print-divider {
  display: none;
}

.print-footer-text {
  font-size: 9pt;
  margin: 0.25rem 0;
  text-align: center;
  color: #666;
}

/* ======================
   PRINT-SPECIFIC STYLES
   ====================== */

@media print {
  .print-container {
    padding: 0;
    font-size: 10pt;
  }

  .print-header {
    page-break-after: avoid;
  }

  .print-toc {
    page-break-after: always;
  }

  .print-section {
    page-break-before: auto;
  }

  .print-section-heading {
    page-break-after: avoid;
    page-break-inside: avoid;
  }

  .print-faq-item {
    page-break-inside: avoid;
    page-break-before: auto;
  }

  .print-question {
    page-break-after: avoid;
  }

  .print-answer :deep(ul),
  .print-answer :deep(ol),
  .print-answer :deep(table) {
    page-break-inside: avoid;
  }

  .print-footer-content {
    page-break-before: auto;
  }

  /* Remove interactive elements for print */
  .print-toc-link {
    text-decoration: none;
  }

  /* Ensure good contrast for print */
  .print-section-heading {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .print-new-badge {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* ======================
   SCREEN-ONLY STYLES
   ====================== */

@media screen {
  .print-container {
    max-width: 8.5in;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  /* Add print button hint */
  .print-container::before {
    content: "📄 Use your browser's print function (Ctrl/Cmd + P) to print or save as PDF";
    display: block;
    background: #fffbea;
    border: 2px solid #f59e0b;
    padding: 1rem;
    margin: -2rem -2rem 2rem -2rem;
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    color: #92400e;
  }

  /* TOC link is now a span (not a link) - no hover needed */
}
</style>

