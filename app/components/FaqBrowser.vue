<template>
  <div>
    <!-- About These FAQs - dynamically rendered from frontmatter -->
    <section
      v-if="disclaimerItems.length > 0"
      class="about-faqs"
      aria-labelledby="about-faqs-heading"
    >
      <h2 id="about-faqs-heading" class="about-faqs-title">About These FAQs</h2>
      <div class="about-faqs-grid">
        <div
          v-for="(item, index) in disclaimerItems"
          :key="index"
          class="about-faqs-item"
        >
          <h3 class="about-faqs-label">{{ item.label }}</h3>
          <p class="about-faqs-text" v-html="renderDisclaimerItem(item)"></p>
        </div>
      </div>
    </section>

    <component
      :is="wrapInCard ? VCard : 'div'"
      :class="wrapInCard ? 'faq-card' : 'faq-section'"
      v-bind="wrapInCard ? { elevation: 0, color: 'transparent' } : {}"
    >
      <div
        class="faq-page-header"
        :class="titleTag === 'h1' ? 'pk-page-head' : 'faq-header-row'"
      >
        <div class="faq-title-block">
          <p v-if="titleTag === 'h1'" class="pk-label">Questions and answers</p>
          <component
            :is="titleTag"
            :class="titleTag === 'h1' ? 'pk-page-title' : 'faq-main-title'"
          >
            {{ page?.title || "Frequently Asked Questions" }}
          </component>
        </div>
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
      <p v-if="showDescription" class="pk-page-intro faq-description">
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
 * @description Renders the complete FAQ experience — frontmatter-driven "About These FAQs" notes,
 * title/sort header, review-status panel, intro content, and sectioned FaqAccordion with
 * New/Updated chips and sorting. Used by both the homepage and /faqs so the two routes
 * can never drift apart again (they previously duplicated all of this logic and did).
 */

import { computed, watchEffect, ref } from "vue";
import { VCard } from "vuetify/components/VCard";
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

// Render a disclaimer item's text with markdown bold converted to HTML.
// The label is rendered separately as a real <h3>: it looks like a heading,
// so it must be one (WCAG 1.3.1; axe DevTools heading-markup, 2026-11-26).
function renderDisclaimerItem(item: { label: string; text: string }): string {
  return item.text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
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
              wrapSeeAlsoLinks(filterNewComments(answerNodes)),
              questionText
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
      value: wrapTablesForResponsiveScroll(
        introNodes.map(replaceDeadlineText),
        "About these FAQs"
      ),
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
/* ------------------------------------------------------------------
   About These FAQs: three ruled notes side by side (one column on a
   reading page or a phone). Each note starts with its label on a line
   of its own.
   ------------------------------------------------------------------ */
.about-faqs {
  margin-top: 5.5rem;
}

.about-faqs-title {
  margin: 0 0 2.25rem;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  line-height: 0.94;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--pk-heading);
}

.about-faqs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: 2rem;
}

.about-faqs-item {
  margin: 0;
  border-top: 4px solid var(--pk-heading);
  padding-top: 1rem;
  font-size: 1rem;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: at least 1.5 */
  line-height: 1.55 !important;
  color: var(--pk-text-2);
}

.about-faqs-item :deep(strong) {
  color: var(--pk-heading);
  font-weight: 700;
}

/* Links in a note (the maintainer's email): underlined, so colour is not the
   only cue. --pk-link on the page is 7.6:1. */
.about-faqs-item :deep(a) {
  color: var(--pk-link);
  text-decoration: underline;
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.about-faqs-item :deep(a:hover) {
  color: var(--pk-link-hover);
  text-decoration-thickness: 2px;
}

/* The note's heading ("Created by"). */
.about-faqs-label {
  margin: 0 0 0.5rem;
  font-size: 1.1875rem;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--pk-heading);
}

.about-faqs-text {
  margin: 0;
}

/* On a reading page the notes are quieter and stack in one column. */
.pk-page .about-faqs {
  margin-top: 2.5rem;
}

.pk-page .about-faqs-title {
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.pk-page .about-faqs-grid {
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;
}

.pk-page .about-faqs-item {
  border-top-width: 2px;
  border-top-color: var(--pk-border-alt);
}

/* ------------------------------------------------------------------
   FAQ block
   ------------------------------------------------------------------ */
/* Plain-section wrapper (homepage embed) */
.faq-section {
  margin-top: 6rem;
}

/* Header row: title + sort control */
.faq-page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  flex-wrap: wrap;
}

.faq-title-block {
  flex: 1 1 20rem;
  min-width: 0;
}

/* On the reading page the title takes the full line; the sort sits under it. */
.pk-page-head .faq-title-block {
  flex-basis: 100%;
}

.faq-main-title {
  margin: 0;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  line-height: 0.94;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--pk-heading);
}

.faq-description {
  margin-bottom: 1.5rem !important;
}

.faq-sort-wrapper {
  display: flex;
  flex-direction: column;
  min-width: 13.75rem;
  max-width: 17.5rem;
}

.faq-sort {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  padding: 0 2.5rem 0 0.875rem;
  border: 2px solid var(--pk-heading);
  background-color: var(--pk-body);
  color: var(--pk-heading);
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  min-width: 44px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='square'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  cursor: pointer;
}

.faq-sort:hover {
  background-color: var(--pk-hover);
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

/* "Last reviewed / Last updated" line under the title. */
.review-status {
  margin: 1.25rem 0 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--pk-text-2);
}

.review-status strong {
  color: var(--pk-heading);
  font-weight: 700;
}

.review-status-note {
  display: block;
  margin-top: 2px;
}

/* Intro content styling */
.faq-intro {
  margin: 2rem 0;
  max-width: 49rem;
}

.faq-intro :deep(h1) {
  display: none;
}

.faq-intro :deep(p) {
  font-size: 1.1875rem;
  color: var(--pk-text);
  margin-bottom: 1.5rem;
  line-height: 1.55;
}

/* WCAG 2.5.5 Target Size (Enhanced) - AAA: Ensure all links in FAQ intro meet 44x44px */
.faq-intro :deep(a) {
  display: inline;
  min-height: 44px !important;
  padding: 8px 2px;
  box-sizing: border-box;
  line-height: 1.5;
  color: var(--pk-link) !important;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.faq-intro :deep(hr) {
  border: none;
  border-top: 2px solid var(--pk-border-alt);
  margin: 3rem 0;
}

/* Section headings: a heavy rule, then the section name. */
.faq-section-group {
  margin-bottom: 0;
}

.faq-section-heading {
  margin: 3.5rem 0 1.375rem;
  padding-top: 0.875rem;
  border-top: 4px solid var(--pk-heading);
  font-size: 1.875rem;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--pk-heading);
  /* Lands below the fixed bar when jumped to */
  scroll-margin-top: 80px;
}

/* Sorted views have no section headings: give the single list its own gap. */
.faq-section-group:first-child > .faq-accordion:first-child {
  margin-top: 2.5rem;
}

@media (max-width: 600px) {
  .about-faqs {
    margin-top: 3.5rem;
  }

  .faq-section {
    margin-top: 4rem;
  }

  .faq-section-heading {
    font-size: 1.5rem;
    margin-top: 2.75rem;
  }

  .faq-sort-wrapper {
    max-width: none;
    flex: 1 1 100%;
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
