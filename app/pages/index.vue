<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Clock Section -->
        <v-card class="pa-8 mb-8 countdown-card" elevation="4" color="surface">
          <div class="text-center">
            <h1 class="text-h3 mb-4">ICJIA Accessibility Portal</h1>
            <p class="text-h6 mb-6 text-medium-emphasis">
              Countdown to WCAG 2.1 AA Compliance
            </p>
            <ClientOnly>
              <div
                class="countdown-display"
                role="status"
                aria-live="polite"
                aria-atomic="false"
              >
                <span class="sr-only">{{ countdownAriaLabel }}</span>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedDays }}</div>
                  <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-separator" aria-hidden="true">:</div>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedHours }}</div>
                  <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-separator" aria-hidden="true">:</div>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedMinutes }}</div>
                  <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-separator" aria-hidden="true">:</div>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedSeconds }}</div>
                  <div class="countdown-label">Seconds</div>
                </div>
              </div>
              <template #fallback>
                <div class="countdown-display">
                  <div class="countdown-loader">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="48"
                      width="4"
                      aria-label="Loading countdown timer"
                    />
                  </div>
                </div>
              </template>
            </ClientOnly>
            <p class="text-body-2 mt-4">
              <NuxtLink
                href="https://www.ada.gov/resources/2024-03-08-web-rule/"
                target="_blank"
                rel="noopener noreferrer"
                class="compliance-link"
              >
                <v-icon size="16" class="mr-1" aria-hidden="true"
                  >mdi-open-in-new</v-icon
                >
                ADA Title II Digital Accessibility Compliance Deadline: April
                24, 2026
              </NuxtLink>
            </p>
            <p class="text-caption mt-3 text-medium-emphasis site-dates">
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true"
                  >mdi-creation</v-icon
                >
                Created: {{ siteCreated }}
              </span>
              <span class="date-separator" aria-hidden="true">•</span>
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true"
                  >mdi-update</v-icon
                >
                Updated: {{ lastUpdated }}
              </span>
            </p>
          </div>
        </v-card>

        <!-- FAQ Disclaimer Card -->
        <v-card class="pa-6 mb-6 disclaimer-card" elevation="4" color="warning" variant="tonal" border>
          <div class="d-flex align-start">
            <v-icon class="mr-3 mt-1" color="warning" size="24" aria-hidden="true">mdi-information</v-icon>
            <div class="flex-grow-1">
              <h2 class="text-h6 mb-3">About These FAQs</h2>
              <div class="text-body-2">
                <p class="mb-2">
                  <strong>Created by:</strong> These FAQs were created by
                  <strong>ICJIA's IDS Unit</strong> as a best-effort translation
                  of new ADA guidelines into practical guidance.
                </p>
                <p class="mb-2">
                  <strong>Corrections:</strong> We make mistakes. We welcome feedback. If you find any incorrect or
                  incomplete information,
                  <strong>please immediately contact ICJIA's IDS Unit</strong>
                  with specific corrections.
                </p>
                <p class="mb-0">
                  <strong>Not legal advice:</strong> This FAQ provides general
                  guidance based on public information and common practices. It
                  is not legal advice. For specific legal questions or
                  interpretations, consult with ICJIA's legal counsel or
                  Illinois DoIT's accessibility guidance.
                </p>
              </div>
            </div>
          </div>
        </v-card>

        <!-- FAQs Section -->
        <div class="faq-section">
          <div class="faq-header-row mb-6">
            <h2 class="text-h4 faq-main-title">
              <v-icon class="mr-2" size="32"
                >mdi-frequently-asked-questions</v-icon
              >
              Frequently Asked Questions
            </h2>
            <div class="faq-sort-wrapper">
              <label for="faq-sort-select-home" class="sr-only">Sort Frequently Asked Questions</label>
              <select
                id="faq-sort-select-home"
                v-model="faqSort"
                class="faq-sort"
              >
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
          <div v-if="faqItems.length > 0">
            <!-- Render intro and section headings -->
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
          <div v-else>
            <p class="text-body-1">FAQs content loading...</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Home page component with countdown timer and FAQ sections
 * @description Displays the ICJIA Accessibility Portal homepage with a countdown timer
 * to the WCAG 2.1 AA compliance deadline and FAQ sections
 */

import { ref, onMounted, onUnmounted, computed } from "vue";
import {
  transformFaqsToAccordionData,
  extractTaggedDate,
  filterNewComments,
  isWithinNewWindow,
} from "../utils/faqTransform";
import { useDeadlineCountdown } from "../composables/useDeadlineCountdown";
import { useSeo } from "../composables/useSeo";
import {
  useOrganizationStructuredData,
  useWebSiteStructuredData,
} from "../composables/useStructuredData";

/** @type {number} Target date timestamp for WCAG 2.1 AA compliance deadline (April 24, 2026) */
const targetDate = new Date("2026-04-24T00:00:00").getTime();

/** @type {string} Site creation date */
const siteCreated = "December 2025";

/** @type {string} Last update date - update when content is added or edited */
const lastUpdated = "March 10, 2026";

// Get deadline countdown information
const { daysRemaining, deadlinePassed, daysRemainingText, urgencyText } =
  useDeadlineCountdown();

/** @type {import('vue').Ref<boolean>} Whether component has mounted on client */
const isMounted = ref(false);

/**
 * @type {import('vue').Ref<{days: number, hours: number, minutes: number, seconds: number}>}
 * Countdown timer state
 */
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

/**
 * Formatted countdown days with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedDays = computed(() =>
  isMounted.value ? String(countdown.value.days).padStart(2, "0") : "00"
);

/**
 * Formatted countdown hours with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedHours = computed(() =>
  isMounted.value ? String(countdown.value.hours).padStart(2, "0") : "00"
);

/**
 * Formatted countdown minutes with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedMinutes = computed(() =>
  isMounted.value ? String(countdown.value.minutes).padStart(2, "0") : "00"
);

/**
 * Formatted countdown seconds with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedSeconds = computed(() =>
  isMounted.value ? String(countdown.value.seconds).padStart(2, "0") : "00"
);

/**
 * Computed aria-label for screen readers
 * @type {import('vue').ComputedRef<string>}
 */
const countdownAriaLabel = computed(() => {
  if (!isMounted.value) {
    return "Countdown timer loading";
  }
  return `Countdown: ${countdown.value.days} days, ${countdown.value.hours} hours, ${countdown.value.minutes} minutes, ${countdown.value.seconds} seconds remaining until WCAG 2.1 AA compliance deadline`;
});

/**
 * Updates the countdown timer values based on the time remaining until target date
 * @returns {void}
 */
const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance > 0) {
    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

/** @type {ReturnType<typeof setInterval> | null} Interval reference for countdown updates */
let countdownInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Initialize countdown only on client-side to avoid hydration mismatches
 * Sets up the countdown timer and starts the update interval
 */
onMounted(() => {
  // Mark as mounted first to ensure computed properties return consistent values
  isMounted.value = true;
  // Initialize countdown immediately on client
  updateCountdown();
  // Start interval to update every second
  countdownInterval = setInterval(updateCountdown, 1000);
});

/**
 * Cleanup function to clear the countdown interval when component is unmounted
 */
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

// Fetch FAQs content
const { data: faqsPage } = await useAsyncData("faqs", () => {
  // TS sometimes resolves an overload requiring 2 args; extra undefined is harmless at runtime.
  return (queryCollection as any)("faqs", undefined).first();
});

/** @typedef {any} MiniMarkNode */
type MiniMarkNode = any;

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
 * Replaces text patterns in a node with dynamic deadline values
 * @param {any} node - Markdown node to process
 * @returns {any} Processed node with replaced text
 */
function replaceDeadlineText(node: any): any {
  if (typeof node === "string") {
    // Replace static text patterns with dynamic values
    let text = node;
    const days = daysRemaining.value;
    const passed = deadlinePassed.value;
    const daysText = daysRemainingText.value;

    // Replace the specific pattern the user mentioned (exact match)
    text = text.replace(
      /That's less than two years away, and achieving compliance requires systematic work across all digital content\. Organizations are realizing that this work needs to start now\./g,
      passed
        ? `The compliance deadline has passed. Immediate action is required to achieve compliance.`
        : `${days} days remain, and achieving compliance requires systematic work across all digital content. Organizations are realizing that this work needs to start now.`
    );

    // Replace "just two years before the compliance deadline" (with optional trailing text)
    text = text.replace(
      /just two years before the compliance deadline([^.]*)/g,
      passed
        ? `the compliance deadline has passed$1`
        : `${days} days before the compliance deadline$1`
    );

    // Replace "less than two years away" (standalone or in context)
    text = text.replace(
      /less than two years away/g,
      passed ? "the deadline has passed" : daysText
    );

    // Replace "two years" when it appears in deadline context (be careful with context)
    // Only replace when it's clearly about time until deadline, not historical references
    text = text.replace(
      /(\d{4}) — just two years before the compliance deadline/g,
      passed
        ? `$1 — the compliance deadline has passed`
        : `$1 — ${days} days before the compliance deadline`
    );

    return text;
  }

  if (Array.isArray(node)) {
    // Process array nodes (elements)
    if (node.length > 2) {
      // Element node: [tag, attrs, ...children]
      return [node[0], node[1], ...node.slice(2).map(replaceDeadlineText)];
    }
    return node.map(replaceDeadlineText);
  }

  return node;
}

const { slugify, getQuestionId: getQuestionIdFromComposable } = useSlugify();

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
 * Processed FAQ items from markdown content
 * @type {import('vue').ComputedRef<Array<{question: string, answer: MiniMarkNode[]}>>}
 */
const faqItems = computed(() => {
  if (!faqsPage.value) return [];
  const body = (faqsPage.value as any).body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return [];

  return transformFaqsToAccordionData(body.value);
});

/**
 * Processed FAQ sections with headings and items
 * @type {import('vue').ComputedRef<Array<{heading: string | null, items: Array<{question: string, answer: MiniMarkNode[], isNew?: boolean, newDate?: string}>}>>}
 */
const faqSections = computed(() => {
  // Make this computed depend on deadline countdown values so it updates when days change
  const _ = daysRemaining.value; // Access to make computed reactive
  const __ = deadlinePassed.value; // Access to make computed reactive

  if (!faqsPage.value) return [];
  const body = (faqsPage.value as any).body;
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
    }>;
  }> = [];
  let currentSection: {
    heading: string | null;
    items: Array<{
      question: string;
      answer: MiniMarkNode[];
      isNew?: boolean;
      newDate?: string;
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
          // Check for "new" date and filter comments
          const taggedDate = extractTaggedDate(answerNodes);
          const filteredAnswer = filterNewComments(answerNodes);

          currentSection.items.push({
            question: questionText,
            answer: filteredAnswer.map(replaceDeadlineText),
            isNew: taggedDate ? isWithinNewWindow(taggedDate) : false,
            newDate: taggedDate || undefined,
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
  // Flatten, keeping stable original order for tie-breaks
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
    items.sort((a, b) => {
      const diff = dateSortValue(b.newDate) - dateSortValue(a.newDate);
      if (diff !== 0) return diff;
      return a.__originalIndex - b.__originalIndex;
    });
  }

  return items.map(({ __originalIndex, ...rest }) => rest);
});

const displayFaqSections = computed(() => {
  if (faqSort.value === "original") return faqSections.value;
  return [{ heading: null, items: sortedFaqItems.value }];
});

/**
 * Intro content from markdown (content before first H2 heading)
 * @type {import('vue').ComputedRef<any | null>}
 */
const introContent = computed(() => {
  // Make this computed depend on deadline countdown values so it updates when days change
  const _ = daysRemaining.value; // Access to make computed reactive
  const __ = deadlinePassed.value; // Access to make computed reactive

  if (!faqsPage.value) return null;
  const body = (faqsPage.value as any).body;
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
    ...faqsPage.value,
    body: {
      ...body,
      value: introNodes.map(replaceDeadlineText),
    },
  };
});

// Enhanced SEO with Open Graph, Twitter Cards, and structured data
useSeo({
  title: "Home - WCAG 2.1 AA Portal",
  description:
    "Countdown to WCAG 2.1 AA deadline (April 24, 2026). Resources, FAQs, and guidance for Illinois state agencies on digital accessibility and ADA Title II.",
  url: "/",
  keywords: [
    "WCAG 2.1 AA compliance",
    "digital accessibility",
    "ADA Title II",
    "web accessibility",
    "Illinois state agency",
    "accessibility deadline",
    "WCAG compliance",
    "accessibility resources",
    "Section 508",
    "IITAA",
  ],
});

// Add Organization structured data
useOrganizationStructuredData({
  name: "Illinois Criminal Justice Information Authority",
  url: "https://accessibility.icjia.app",
  logo: "/icjia-logo.png",
  description:
    "Illinois Criminal Justice Information Authority - Digital Accessibility Portal providing resources for WCAG 2.1 AA compliance",
  contactPoint: {
    contactType: "Accessibility Support",
    email: "DoIT.Accessibility@Illinois.gov",
  },
});

// Add WebSite structured data
useWebSiteStructuredData();
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

.countdown-card {
  background: rgb(var(--v-theme-surface)) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 10px 25px -5px rgba(var(--v-theme-primary), 0.15) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.countdown-card :deep(h1),
.countdown-card :deep(p),
.countdown-card :deep(.text-h3),
.countdown-card :deep(.text-h6),
.countdown-card :deep(.text-body-2) {
  color: rgb(var(--v-theme-on-surface)) !important;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
}

.compliance-link {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  /* Use black for maximum contrast on light background (21:1) */
  color: #000000 !important;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 8px 12px;
  box-sizing: border-box;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .compliance-link,
.v-theme--dark .compliance-link {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text on dark background */
  color: #BFDBFE !important; /* Lighter blue (#BFDBFE) for 7:1+ contrast on dark background */
}

.compliance-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Don't reduce opacity, maintain full contrast */
  opacity: 1 !important;
  text-decoration: underline;
  /* Maintain AAA contrast on hover */
  color: #000000 !important;
}

/* Dark theme: use lighter color for AAA contrast on hover */
[data-v-theme="dark"] .compliance-link:hover,
.v-theme--dark .compliance-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain 7:1 contrast on hover */
  color: #BFDBFE !important; /* Lighter blue for 7:1+ contrast on dark background */
}

.compliance-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 4px;
}

.site-dates {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Override text-medium-emphasis for better contrast */
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for site dates */
[data-v-theme="dark"] .site-dates,
.v-theme--dark .site-dates {
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.date-item {
  display: inline-flex;
  align-items: center;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Ensure text meets AAA contrast */
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for date items */
[data-v-theme="dark"] .date-item,
.v-theme--dark .date-item {
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.date-separator {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.7 !important;
  color: rgb(var(--v-theme-on-surface));
}

/* Dark theme: ensure AAA contrast for date separators */
[data-v-theme="dark"] .date-separator,
.v-theme--dark .date-separator {
  opacity: 0.7 !important;
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  min-height: 120px;
  flex-wrap: wrap;
  width: 100%;
}

.countdown-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  flex: 0 0 auto;
}

.countdown-value {
  font-size: 4.5rem;
  font-weight: bold;
  line-height: 1;
  color: rgb(var(--v-theme-primary));
}

.countdown-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.9 !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for countdown labels */
[data-v-theme="dark"] .countdown-label,
.v-theme--dark .countdown-label {
  opacity: 1 !important;
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.countdown-separator {
  font-size: 3rem;
  font-weight: bold;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.7 !important;
  padding: 0 0.25rem;
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1;
  display: flex;
  align-items: center;
}

/* Dark theme: ensure AAA contrast for countdown separators */
[data-v-theme="dark"] .countdown-separator,
.v-theme--dark .countdown-separator {
  opacity: 0.8 !important;
  color: rgb(248, 250, 252) !important; /* Higher contrast on dark background */
}

/* Screen reader only text - visually hidden but available to assistive technologies */
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

@media (max-width: 960px) {
  .countdown-card {
    padding: 1.5rem !important;
  }

  .countdown-value {
    font-size: 3.5rem;
  }

  .countdown-separator {
    font-size: 2.5rem;
    padding: 0 0.2rem;
  }
}

@media (max-width: 600px) {
  .countdown-card {
    padding: 1rem !important;
  }

  .countdown-display {
    gap: 0.25rem;
    margin: 1.5rem 0;
    min-height: 100px;
  }

  .countdown-value {
    font-size: 2.5rem;
  }

  .countdown-item {
    min-width: 55px;
  }

  .countdown-separator {
    font-size: 1.75rem;
    padding: 0 0.15rem;
  }

  .countdown-label {
    font-size: 0.7rem;
    margin-top: 0.25rem;
  }

  h1.text-h3 {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 400px) {
  .countdown-display {
    gap: 0.2rem;
    margin: 1rem 0;
    min-height: 90px;
  }

  .countdown-value {
    font-size: 2rem;
  }

  .countdown-item {
    min-width: 45px;
  }

  .countdown-separator {
    font-size: 1.5rem;
    padding: 0 0.1rem;
  }

  .countdown-label {
    font-size: 0.65rem;
    margin-top: 0.2rem;
  }
}

/* FAQ Section Styles */
.faq-section {
  padding: 2rem 0;
}

.faq-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  padding-bottom: 1rem;
}

.faq-sort-wrapper {
  display: flex;
  flex-direction: column;
  min-width: 220px;
  max-width: 320px;
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

.faq-main-title {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  margin: 0;
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
</style>
