<template>
  <div>
    <!-- FAQ Disclaimer Card - dynamically rendered from frontmatter -->
    <v-card
      v-if="disclaimerItems.length > 0"
      class="pa-6 mb-6 disclaimer-card"
      elevation="4"
      color="warning"
      variant="tonal"
      border
    >
      <div class="d-flex align-start">
        <v-icon
          class="mr-3 mt-1"
          color="warning"
          size="24"
          aria-hidden="true"
          :icon="mdiInformation" />
        <div class="flex-grow-1">
          <h2 class="text-h6 mb-3">About These FAQs</h2>
          <div class="text-body-2">
            <p
              v-for="(item, index) in disclaimerItems"
              :key="index"
              :class="
                index === disclaimerItems.length - 1 ? 'mb-0' : 'mb-2'
              "
              v-html="renderDisclaimerItem(item)"
            ></p>
          </div>
        </div>
      </div>
    </v-card>

    <component
      :is="wrapInCard ? VCard : 'div'"
      :class="wrapInCard ? 'pa-8' : 'faq-section'"
      v-bind="wrapInCard ? { elevation: 0, color: 'surface' } : {}"
    >
      <div
        class="faq-page-header"
        :class="titleTag === 'h1' ? 'mb-4' : 'faq-header-row mb-6'"
      >
        <component
          :is="titleTag"
          :class="
            titleTag === 'h1'
              ? 'text-h3 d-flex align-center flex-wrap mb-0'
              : 'text-h4 faq-main-title'
          "
        >
          <v-icon
            :class="titleTag === 'h1' ? 'mr-3' : 'mr-2'"
            :size="titleTag === 'h1' ? undefined : 32"
            :color="titleTag === 'h1' ? 'primary' : undefined"
            aria-hidden="true"
            :icon="mdiFrequentlyAskedQuestions"
          />
          <span>{{ page?.title || "Frequently Asked Questions" }}</span>
        </component>
        <div class="faq-sort-wrapper">
          <label for="faq-sort-select" class="sr-only"
            >Sort Frequently Asked Questions</label
          >
          <select id="faq-sort-select" v-model="faqSort" class="faq-sort">
            <option
              v-for="option in faqSortOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.title }}
            </option>
          </select>
        </div>
      </div>
      <p
        v-if="showDescription"
        class="text-subtitle-1 text-medium-emphasis mb-6"
      >
        {{
          page?.description ||
          "Find answers to common questions about web accessibility, WCAG guidelines, and compliance requirements."
        }}
      </p>
      <div
        v-if="lastUpdatedLabel || lastReviewedLabel"
        class="review-status"
        role="note"
      >
        <v-icon
          class="review-status-icon"
          size="20"
          aria-hidden="true"
          :icon="mdiCalendarCheck"
        />
        <div>
          <span v-if="lastReviewedLabel">
            <strong>Last reviewed:</strong> {{ lastReviewedLabel }}
          </span>
          <span
            v-if="lastUpdatedLabel && lastReviewedLabel"
            aria-hidden="true"
          >
            ·
          </span>
          <span v-if="lastUpdatedLabel">
            <strong>Last updated:</strong> {{ lastUpdatedLabel }}
          </span>
          <span class="review-status-note">
            These FAQs are re-verified periodically against official sources.
          </span>
        </div>
      </div>

      <div v-if="faqSections.length > 0 || introContent">
        <!-- Render intro content -->
        <div v-if="introContent" class="faq-intro">
          <ContentRenderer :value="introContent" />
        </div>
        <!-- Render FAQ accordion with sections -->
        <div
          v-for="(section, sectionIndex) in displayFaqSections"
          :key="sectionIndex"
          class="faq-section-group"
        >
          <h2
            v-if="section.heading"
            :id="slugify(section.heading || '')"
            class="faq-section-heading"
          >
            {{ section.heading }}
          </h2>
          <FaqAccordion
            :items="section.items"
            :section-id="
              faqSort === 'original'
                ? slugify(section.heading || '')
                : 'all-faqs'
            "
          />
        </div>
      </div>
      <div v-else-if="page" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-4 text-body-1">Loading FAQs...</p>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Shared FAQ browser component
 * @description Renders the complete FAQ experience — frontmatter-driven disclaimer card,
 * title/sort header, review-status panel, intro content, and sectioned FaqAccordion with
 * New/Updated chips and sorting. Used by both the homepage and /faqs so the two routes
 * can never drift apart again (they previously duplicated all of this logic and did).
 */

import { computed, watchEffect, ref } from "vue";
import { VCard } from "vuetify/components/VCard";
import {
  mdiInformation,
  mdiFrequentlyAskedQuestions,
  mdiCalendarCheck,
} from "~/utils/icons";
import {
  wrapTablesForResponsiveScroll,
  wrapSeeAlsoLinks,
  extractTaggedInfo,
  filterNewComments,
  isWithinNewWindow,
} from "../utils/faqTransform";
import type { FaqBadgeKind } from "../utils/faqTransform";
import { useDeadlineCountdown } from "../composables/useDeadlineCountdown";
import { useFAQStructuredData } from "../composables/useStructuredData";
import { slugify } from "../composables/useSlugify";

const props = withDefaults(
  defineProps<{
    /** Heading tag for the FAQ title: h1 on /faqs, h2 when embedded on the homepage */
    titleTag?: "h1" | "h2";
    /** Show the description paragraph under the title (on /faqs; hidden on the homepage) */
    showDescription?: boolean;
    /** Wrap the FAQ block in a v-card (/faqs look) vs a plain section (homepage look) */
    wrapInCard?: boolean;
    /** Inject FAQPage structured data (enable on exactly one route: /faqs) */
    injectFaqSchema?: boolean;
  }>(),
  {
    titleTag: "h1",
    showDescription: true,
    wrapInCard: true,
    injectFaqSchema: false,
  }
);

/** @type {import('nuxt/app').AsyncData<import('@nuxt/content').ParsedContent>} FAQ page content */
const { data: page } = await useAsyncData("faqs", () => {
  return queryCollection("faqs").first();
});

// Deadline values used to keep in-content deadline phrasing current
const { daysRemaining, deadlinePassed, daysRemainingText } =
  useDeadlineCountdown();

function formatIsoDateLong(dateStr: string): string {
  try {
    const parts = dateStr.split("-").map(Number);
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2])
      return dateStr;
    const [year, month, day] = parts;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const lastUpdatedLabel = computed(() => {
  const raw = (page.value as any)?.lastUpdated as string | undefined;
  if (!raw) return "";
  return formatIsoDateLong(raw);
});

const lastReviewedLabel = computed(() => {
  const raw = (page.value as any)?.lastReviewed as string | undefined;
  if (!raw) return "";
  return formatIsoDateLong(raw);
});

// Disclaimer items - dynamically from FAQ content frontmatter
const disclaimerItems = computed(() => {
  return (page.value as any)?.disclaimer || [];
});

// Render disclaimer item with markdown bold converted to HTML
function renderDisclaimerItem(item: { label: string; text: string }): string {
  const htmlText = item.text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return `<strong>${item.label}:</strong> ${htmlText}`;
}

/** @typedef {any} MiniMarkNode */
type MiniMarkNode = any;

type FaqSortMode = "original" | "latest" | "alpha";
const faqSort = ref<FaqSortMode>("original");
const faqSortOptions = [
  { title: "Original order", value: "original" },
  { title: "Latest first", value: "latest" },
  { title: "A–Z (question)", value: "alpha" },
];

function dateSortValue(dateStr?: string): number {
  if (!dateStr) return Number.NEGATIVE_INFINITY;
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    return Number.NEGATIVE_INFINITY;
  }
  const [year, month, day] = parts;
  return Date.UTC(year, month - 1, day);
}

/**
 * Type guard to check if a node is an element node
 * @param {MiniMarkNode} node - Node to check
 * @returns {node is any[]} True if node is an element node
 */
function isElementNode(node: MiniMarkNode): node is any[] {
  return Array.isArray(node) && typeof node[0] === "string";
}

/**
 * Gets the tag name from an element node
 * @param {any[]} node - Element node
 * @returns {string} Tag name
 */
function tagName(node: any[]): string {
  return node[0];
}

/**
 * Extracts text content from a markdown node
 * @param {any} node - Markdown node to extract text from
 * @returns {string} Extracted text content
 */
function extractText(node: any): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node) && node.length > 2) {
    return node.slice(2).map(extractText).join("");
  }
  return "";
}

/**
 * Replaces static deadline phrasing in content with countdown-aware text
 * @param {any} node - Markdown node to process
 * @returns {any} Processed node with replaced text
 */
function replaceDeadlineText(node: any): any {
  if (typeof node === "string") {
    let text = node;
    const days = daysRemaining.value;
    const passed = deadlinePassed.value;
    const daysText = daysRemainingText.value;

    text = text.replace(
      /That's less than two years away, and achieving compliance requires systematic work across all digital content\. Organizations are realizing that this work needs to start now\./g,
      passed
        ? `The compliance deadline has passed. If your digital content isn't compliant yet, that work is now overdue — start it right away.`
        : `${days} days remain, and achieving compliance requires systematic work across all digital content. Organizations are realizing that this work needs to start now.`
    );

    text = text.replace(
      /just two years before the compliance deadline([^.]*)/g,
      passed
        ? `the compliance deadline has passed$1`
        : `${days} days before the compliance deadline$1`
    );

    text = text.replace(
      /less than two years away/g,
      passed ? "the deadline has passed" : daysText
    );

    text = text.replace(
      /(\d{4}) — just two years before the compliance deadline/g,
      passed
        ? `$1 — the compliance deadline has passed`
        : `$1 — ${days} days before the compliance deadline`
    );

    return text;
  }

  if (Array.isArray(node)) {
    if (node.length > 2) {
      return [node[0], node[1], ...node.slice(2).map(replaceDeadlineText)];
    }
    return node.map(replaceDeadlineText);
  }

  return node;
}

/**
 * Processed FAQ sections with headings and items
 * @type {import('vue').ComputedRef<Array<{heading: string | null, items: Array<{question: string, answer: MiniMarkNode[]}>}>>}
 */
const faqSections = computed(() => {
  // Depend on deadline countdown values so replaced text updates when days change
  const _ = daysRemaining.value;
  const __ = deadlinePassed.value;

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
          const taggedInfo = extractTaggedInfo(answerNodes);
          currentSection.items.push({
            question: questionText,
            answer: wrapTablesForResponsiveScroll(
              wrapSeeAlsoLinks(filterNewComments(answerNodes))
            ).map(replaceDeadlineText),
            isNew: taggedInfo ? isWithinNewWindow(taggedInfo.date) : false,
            newDate: taggedInfo?.date,
            badgeKind: taggedInfo?.kind,
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

const sortedFaqItems = computed(() => {
  let idx = 0;
  const itemsWithIndex = faqSections.value.flatMap((section) =>
    section.items.map((item) => ({ ...item, __originalIndex: idx++ }))
  );

  const items = itemsWithIndex.slice();

  if (faqSort.value === "alpha") {
    items.sort((a, b) => {
      const cmp = a.question.localeCompare(b.question, undefined, {
        sensitivity: "base",
      });
      if (cmp !== 0) return cmp;
      return a.__originalIndex - b.__originalIndex;
    });
  } else if (faqSort.value === "latest") {
    // Same-date ties rank brand-new questions above revised ones, so a batch of
    // additions and updates published together surfaces the new material first
    const kindRank = (item: { badgeKind?: FaqBadgeKind }) =>
      item.badgeKind === "new" ? 0 : 1;
    items.sort((a, b) => {
      const diff = dateSortValue(b.newDate) - dateSortValue(a.newDate);
      if (diff !== 0) return diff;
      const kindDiff = kindRank(a) - kindRank(b);
      if (kindDiff !== 0) return kindDiff;
      return a.__originalIndex - b.__originalIndex;
    });
  }

  return items.map(({ __originalIndex, ...rest }) => rest);
});

const displayFaqSections = computed(() => {
  if (faqSort.value === "original") return faqSections.value;
  return [{ heading: null, items: sortedFaqItems.value }];
});

// Extract intro content (content before first H2)
const introContent = computed(() => {
  // Depend on deadline countdown values so replaced text updates when days change
  const _ = daysRemaining.value;
  const __ = deadlinePassed.value;

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

  return {
    ...page.value,
    body: {
      ...body,
      value: wrapTablesForResponsiveScroll(introNodes.map(replaceDeadlineText)),
    },
  };
});

// Extract FAQ items for structured data (only when injectFaqSchema is set)
const faqItemsForSchema = computed(() => {
  if (!props.injectFaqSchema) return [];
  if (!faqSections.value || faqSections.value.length === 0) return [];
  const items: Array<{ question: string; answer: string }> = [];

  faqSections.value.forEach((section) => {
    section.items.forEach((item) => {
      let answerText = "";
      if (item.answer && Array.isArray(item.answer)) {
        answerText = item.answer.map(extractText).join(" ").substring(0, 300);
      }

      if (item.question && answerText) {
        items.push({
          question: item.question,
          answer: answerText + (answerText.length >= 300 ? "..." : ""),
        });
      }
    });
  });

  return items;
});

// Add FAQ structured data once when items are available
// Using a flag to prevent duplicate structured data injection
const faqSchemaInjected = ref(false);
watchEffect(() => {
  if (
    props.injectFaqSchema &&
    faqItemsForSchema.value.length > 0 &&
    !faqSchemaInjected.value
  ) {
    faqSchemaInjected.value = true;
    useFAQStructuredData(faqItemsForSchema.value);
  }
});
</script>

<style scoped>
.disclaimer-card {
  /* Make the disclaimer card stand out with a subtle but noticeable appearance */
  border-width: 2px !important;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 10px 25px -5px rgba(var(--v-theme-warning), 0.2),
    0 0 0 1px rgba(var(--v-theme-warning), 0.3) !important;
  transition: all 0.2s ease;
}

/* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Ensure all paragraphs in disclaimer have 1.5+ line-height */
.disclaimer-card :deep(p),
.disclaimer-card :deep(.text-body-2) {
  line-height: 1.5 !important;
}

.disclaimer-card:hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 12px 30px -5px rgba(var(--v-theme-warning), 0.25),
    0 0 0 1px rgba(var(--v-theme-warning), 0.4) !important;
}

/* Plain-section wrapper (homepage embed) */
.faq-section {
  padding: 2rem 0;
}

/* Header row: title + sort control */
.faq-page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Homepage-embed header variant: underlined divider */
.faq-header-row {
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  padding-bottom: 1rem;
}

.faq-main-title {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  margin: 0;
}

.faq-sort-wrapper {
  display: flex;
  flex-direction: column;
  min-width: 180px;
  max-width: 280px;
}

.faq-sort {
  font-size: 0.813rem;
  padding: 8px 12px;
  padding-right: 32px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.3);
  border-radius: 4px;
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  min-width: 44px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.faq-sort:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.faq-sort:focus {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-color: rgb(var(--v-theme-primary));
}

.faq-sort:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Review-status strip: prominent "Last reviewed / Last updated" panel.
   Mirrors .faq-section-heading's audited surface-variant + primary-border pattern. */
.review-status {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface-variant));
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
}

.review-status-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.review-status-note {
  display: block;
  margin-top: 2px;
  font-size: 0.85rem;
}

/* Intro content styling */
.faq-intro {
  margin-bottom: 2rem;
}

.faq-intro :deep(h1) {
  display: none;
}

.faq-intro :deep(p) {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.85;
  margin-bottom: 1.5rem;
  line-height: 1.75;
}

/* WCAG 2.5.5 Target Size (Enhanced) - AAA: Ensure all links in FAQ intro meet 44x44px */
.faq-intro :deep(a) {
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44px tap target height */
  display: inline;
  min-height: 44px !important;
  padding: 8px 2px;
  box-sizing: border-box;
  line-height: 1.5;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher contrast color */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .faq-intro :deep(a),
.v-theme--dark .faq-intro :deep(a) {
  color: #93C5FD !important; /* Lighter blue for 7:1+ contrast on dark background */
}

.faq-intro :deep(hr) {
  border: none;
  border-top: 2px solid rgba(var(--v-theme-primary), 0.2);
  margin: 3rem 0;
}

/* Section headings */
.faq-section-group {
  margin-bottom: 3rem;
}

.faq-section-heading {
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background: rgb(var(--v-theme-surface-variant));
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
}

@media (max-width: 960px) {
  .v-card {
    padding: 1.5rem !important;
  }
}

@media (max-width: 600px) {
  .v-card {
    padding: 1rem !important;
  }

  h1.text-h3 {
    font-size: 1.5rem !important;
  }

  .text-subtitle-1 {
    font-size: 0.9rem !important;
  }

  .faq-section-heading {
    font-size: 1.2rem;
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 400px) {
  h1.text-h3 {
    font-size: 1.25rem !important;
  }

  .faq-section-heading {
    font-size: 1.1rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>

<!-- Global styles -->
<style>
/* Add spacing after code blocks (visual aids) in FAQ content */
.faq-section-group pre,
.v-expansion-panel-text pre {
  margin-bottom: 1.5rem !important;
}
</style>
