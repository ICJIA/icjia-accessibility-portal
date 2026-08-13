<template>
  <ClientOnly>
  <div class="print-container">
    <!-- Header Section -->
    <div class="print-header">
      <div class="print-logo-section">
        <img
          src="/icjia-logo-1x.png"
          srcset="/icjia-logo-1x.png 1x, /icjia-logo-2x.png 2x"
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
          <p v-if="lastReviewed" class="print-date">
            <strong>Last Reviewed:</strong> {{ lastReviewed }}
          </p>
          <p class="print-deadline">
            <strong>ADA Title II Compliance Deadline:</strong> April 26, 2027
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

    <!-- FAQ Disclaimer Section - dynamically rendered from frontmatter -->
    <div v-if="disclaimerItems.length > 0" class="print-disclaimer">
      <h2 class="print-disclaimer-title">About These FAQs</h2>
      <div class="print-disclaimer-content">
        <p v-for="(item, index) in disclaimerItems" :key="index" v-html="renderDisclaimerItem(item)"></p>
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
            <span v-if="item.isNew" class="print-new-badge">{{
              item.badgeKind === "new"
                ? `NEW ${formatBadgeDate(item.newDate)}`
                : `UPDATED ${formatBadgeDate(item.newDate)}`
            }}</span>
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
          Last Updated: {{ lastUpdated }}<template v-if="lastReviewed"> | Last Reviewed: {{ lastReviewed }}</template> | ADA Title II Compliance Deadline: April 26, 2027
        </p>
      </div>
    </div>
  </div>
  <template #fallback>
    <div class="print-container">
      <div class="print-loading" style="min-height: 50vh; display: flex; align-items: center; justify-content: center;">
        <p>Loading print-friendly version...</p>
      </div>
    </div>
  </template>
  </ClientOnly>
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
import {
  wrapTablesForResponsiveScroll,
  filterNewComments,
  extractTaggedInfo,
  isWithinNewWindow,
} from "../utils/faqTransform";
import type { FaqBadgeKind } from "../utils/faqTransform";

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
 * Format a YYYY-MM-DD tag date as mm/dd/yyyy for the printed chip
 */
function formatBadgeDate(dateStr?: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return dateStr;
  const [year, month, day] = parts;
  return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;
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
      newDate?: string;
      badgeKind?: FaqBadgeKind;
      answerContent?: any;
    }>;
  }> = [];
  let currentSection: {
    heading: string | null;
    items: Array<{
      question: string;
      answer: MiniMarkNode[];
      isNew?: boolean;
      newDate?: string;
      badgeKind?: FaqBadgeKind;
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
          // Check for a {new:}/{updated:} tag within the badge window
          const taggedInfo = extractTaggedInfo(answerNodes);
          const showBadge = taggedInfo
            ? isWithinNewWindow(taggedInfo.date)
            : false;
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
            isNew: showBadge,
            newDate: taggedInfo?.date,
            badgeKind: taggedInfo?.kind,
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

// Format ISO date string (YYYY-MM-DD) to long format without timezone issues
function formatIsoDateLong(dateStr: string): string {
  try {
    const parts = dateStr.split("-").map(Number);
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2])
      return dateStr;
    const [year, month, day] = parts;
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${months[month - 1]} ${day}, ${year}`;
  } catch {
    return dateStr;
  }
}

// Last updated date - dynamically from FAQ content frontmatter
const lastUpdated = computed(() => {
  const raw = page.value?.lastUpdated as string | undefined;
  if (!raw) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return formatIsoDateLong(raw);
});

// Last reviewed date - dynamically from FAQ content frontmatter
const lastReviewed = computed(() => {
  const raw = (page.value as any)?.lastReviewed as string | undefined;
  return raw ? formatIsoDateLong(raw) : "";
});

// Disclaimer items - dynamically from FAQ content frontmatter
const disclaimerItems = computed(() => {
  return page.value?.disclaimer || [];
});

// Render disclaimer item with markdown bold converted to HTML
function renderDisclaimerItem(item: { label: string; text: string }): string {
  const htmlText = item.text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return `<strong>${item.label}:</strong> ${htmlText}`;
}

// Base URL - use production URL for printer version
const baseUrl = "https://accessibility.icjia.app";

// Process links for print accessibility
usePrintLinks();

// SEO
useSeo({
  title: "Print FAQs",
  description:
    "Printer-friendly digital accessibility FAQs for Illinois state agencies. Covers WCAG 2.1 AA and ADA Title II compliance.",
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.92rem; /* 11pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 1.5rem; /* 18pt equivalent */
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.print-subtitle {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.92rem; /* 11pt equivalent */
  margin: 0 0 0.5rem 0;
  /* Accessibility: Avoid italicizing entire paragraphs/subtitles - use visual indicators instead */
  font-style: normal;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  color: #000;
}

.print-date,
.print-deadline {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.83rem; /* 10pt equivalent */
  margin: 0.25rem 0;
}

.print-notice {
  background: #f5f5f5;
  padding: 0.75rem;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  border-left: 4px solid #000;
  margin-top: 1rem;
}

.print-notice p {
  margin: 0;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
}

/* Disclaimer Section */
.print-disclaimer {
  margin: 2rem 0;
  padding: 1.5rem;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Ensure text on this background meets 7:1 */
  background: #fff;
  border: 2px solid #000;
  border-left: 6px solid #000;
  page-break-inside: avoid;
}

.print-disclaimer-title {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 1.17rem; /* 14pt equivalent */
  font-weight: bold;
  margin: 0 0 1rem 0;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Large text (14pt+ bold) needs 4.5:1 on #f0f7ff background */
  /* #0052a3 on #f0f7ff = ~3.2:1 (fails), use #000 for 7:1+ */
  color: #000;
}

.print-disclaimer-content {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.83rem; /* 10pt equivalent */
  line-height: 1.6;
}

.print-disclaimer-content p {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
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
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  color: #000;
}

.print-url {
  font-family: "Courier New", monospace;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
  word-break: break-all;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text, #0052a3 = 4.5:1 (fails), use #000 for AAA */
  color: #000;
  text-decoration: underline;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px clickable area */
  display: inline-block;
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  line-height: 1.5;
  vertical-align: middle;
  margin: 0.25rem 0;
}

/* Make links interactive on screen, but print-friendly */
@media screen {
  .print-url:hover {
    /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain 7:1 contrast on hover */
    color: #000;
    text-decoration: underline;
    opacity: 0.8;
  }
  
  .print-url:focus-visible {
    /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Focus indicator with good contrast */
    outline: 2px solid #000;
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 1rem; /* 12pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 1.17rem; /* 14pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.83rem; /* 10pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  color: #000;
  /* Accessibility: Avoid italicizing text - use opacity and smaller font size for visual distinction */
  font-style: normal;
  margin-left: 0.5rem;
  opacity: 0.7;
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
  margin: 0.75rem 0;
}

/* WCAG 2.5.5 Target Size (Enhanced) - AAA: Ensure all links in print intro meet 44x44px */
.print-intro :deep(a) {
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px clickable area */
  display: inline-block;
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  line-height: 1.5;
  vertical-align: middle;
  /* Ensure clickable area is at least 44x44px */
  margin: 0.25rem 0;
  /* Use flexbox to center content vertically if needed */
  align-items: center;
  justify-content: center;
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 1.33rem; /* 16pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 1rem; /* 12pt equivalent */
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  page-break-after: avoid;
}

.print-question-number {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  color: #000;
  margin-right: 0.5rem;
  opacity: 0.7;
}

.print-new-badge {
  display: inline-block;
  background: #000;
  color: #fff;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.67rem; /* 8pt equivalent */
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  margin-left: 0.5rem;
  font-weight: normal;
  vertical-align: middle;
}

.print-answer {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.83rem; /* 10pt equivalent */
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Base line-height for content */
  line-height: 1.5;
}

.print-answer :deep(p) {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
}

.print-answer :deep(a) {
  color: #000;
  text-decoration: underline;
  word-break: break-all;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px clickable area */
  display: inline-block;
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  line-height: 1.5;
  vertical-align: middle;
  /* Ensure clickable area is at least 44x44px */
  margin: 0.25rem 0;
  /* Use flexbox to center content vertically if needed */
  align-items: center;
  justify-content: center;
}

/* Internal links (section references) - converted to spans, bold, no underline */
.print-answer :deep(.print-internal-link),
.print-intro :deep(.print-internal-link),
.print-content :deep(.print-internal-link),
.print-answer :deep(a.print-internal-link),
.print-intro :deep(a.print-internal-link),
.print-content :deep(a.print-internal-link) {
  font-weight: bold;
  text-decoration: none;
  color: #000;
  cursor: default;
}

.print-answer :deep(.print-internal-link:hover),
.print-intro :deep(.print-internal-link:hover),
.print-content :deep(.print-internal-link:hover),
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
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px clickable area */
  display: inline-block !important;
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  line-height: 1.5;
  vertical-align: middle;
  /* Ensure clickable area is at least 44x44px */
  margin: 0.25rem 0;
  opacity: 1 !important;
  /* Use flexbox to center content vertically if needed */
  align-items: center;
  justify-content: center;
}

.print-answer :deep(code) {
  font-family: "Courier New", monospace;
  background: #f0f0f0;
  padding: 0.1rem 0.3rem;
  border: 1px solid #ddd;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
}

.print-answer :deep(pre) {
  background: #f5f5f5;
  padding: 0.75rem;
  border: 1px solid #ddd;
  white-space: pre-wrap;
  word-break: break-word;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
  margin: 0.75rem 0;
}

.print-answer :deep(blockquote) {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  border-left: 3px solid #000;
  padding-left: 1rem;
  margin: 0.75rem 0;
  /* Accessibility: Avoid italicizing entire paragraphs in blockquotes - use border and indentation instead */
  font-style: normal;
  color: #000;
}

/* Ensure paragraphs inside blockquotes are not italicized */
.print-answer :deep(blockquote p) {
  font-style: normal !important;
}

/* Ensure paragraphs are never italicized - only inline <em> tags should be italic */
.print-answer :deep(p),
.print-intro :deep(p),
.print-content :deep(p),
.print-disclaimer-content p {
  font-style: normal !important;
}

.print-answer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.75rem 0;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.92rem; /* 11pt equivalent */
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
  font-size: 0.75rem; /* 9pt equivalent */
  margin: 0.25rem 0;
  text-align: center;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  color: #000;
  opacity: 0.7;
}

/* ======================
   PRINT-SPECIFIC STYLES
   ====================== */

@media print {
  .print-container {
    padding: 0;
    /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
    font-size: 0.83rem; /* 10pt equivalent */
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
    /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Border color needs 3:1 for UI components */
    border: 2px solid #000;
    padding: 1rem;
    margin: -2rem -2rem 2rem -2rem;
    /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Use relative units (rem) instead of fixed (pt) */
    font-size: 0.92rem; /* 11pt equivalent */
    font-weight: bold;
    text-align: center;
    /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text on #fffbea background */
    color: #000;
  }

  /* TOC link is now a span (not a link) - no hover needed */
}
</style>

