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

        <!-- FAQs Section -->
        <div class="faq-section">
          <h2 class="text-h4 mb-6 faq-main-title">
            <v-icon class="mr-2" size="32"
              >mdi-frequently-asked-questions</v-icon
            >
            Frequently Asked Questions
          </h2>
          <div v-if="faqItems.length > 0">
            <!-- Render intro and section headings -->
            <div v-if="introContent" class="faq-intro">
              <ContentRenderer :value="introContent" />
            </div>
            <!-- Render FAQ accordion with sections -->
            <div
              v-for="(section, sectionIndex) in faqSections"
              :key="sectionIndex"
              class="faq-section-group"
            >
              <h2 v-if="section.heading" class="faq-section-heading">
                {{ section.heading }}
              </h2>

              <!-- Executive Summary - appears after first section heading only -->
              <v-expansion-panels
                v-if="sectionIndex === 0"
                class="tldr-panel mb-6"
                elevation="0"
              >
                <v-expansion-panel class="tldr-expansion" elevation="0">
                  <v-expansion-panel-title class="tldr-title-row">
                    <div class="tldr-header-wrapper">
                      <v-chip
                        size="x-small"
                        color="success"
                        variant="flat"
                        class="new-badge-summary"
                        aria-label="New section"
                      >
                        New
                      </v-chip>
                      <div class="tldr-header-content">
                        <span class="tldr-title">Executive Summary</span>
                        <v-chip
                          size="x-small"
                          color="primary"
                          variant="tonal"
                          class="ml-3"
                        >
                          1-minute read
                        </v-chip>
                      </div>
                    </div>
                    <template #actions>
                      <v-icon
                        icon="mdi-chevron-down"
                        class="tldr-chevron"
                        size="24"
                      />
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="tldr-content-panel">
                    <div class="tldr-content">
                      <p class="tldr-lead">
                        By April 24, 2026, all public-facing digital content
                        must meet
                        <a
                          href="https://www.w3.org/TR/WCAG21/"
                          target="_blank"
                          rel="noopener noreferrer"
                          >WCAG 2.1 Level AA</a
                        >
                        standards under the
                        <a
                          href="https://www.ada.gov/resources/2024-03-08-web-rule/"
                          target="_blank"
                          rel="noopener noreferrer"
                          >Americans with Disabilities Act (ADA) Title II</a
                        >. This is enforceable federal law, not optional.
                      </p>
                      <p class="tldr-intro">
                        <strong>Digital accessibility</strong> requires that
                        websites, documents, and digital content meet specific
                        technical standards: screen readers can read and
                        navigate the content, keyboard users can access all
                        functionality, images have descriptive text, documents
                        have proper structure (headings, not just bold text),
                        and color contrast meets standards. Content that "looks
                        fine" visually may still be inaccessible if it lacks
                        these technical elements. Illinois residents with
                        disabilities require accessible technology to access
                        government services — a requirement enforced by the
                        <a
                          href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          >Illinois Information Technology Accessibility Act
                          (IITAA)</a
                        >, which Illinois DoIT oversees.
                      </p>
                      <p class="tldr-key">
                        <strong>Why this requires organizational attention:</strong>
                        This deadline requires agency-wide buy-in — it's not just IT.
                        It's a fundamental shift for anyone who publishes
                        public-facing digital content. While digital content may be
                        associated with IT, accessibility is an agency-wide
                        responsibility that must start with leadership, not with
                        individual web developers or content creators. Accessibility is
                        the "A" in DEIA — it delivers equitable access by removing
                        systemic barriers.
                      </p>
                      <p class="tldr-consequences">
                        <strong>Failure to comply risks:</strong> Department of
                        Justice investigations, lawsuits, significant legal and
                        remediation costs, and reputational harm. Inaccessible
                        content excludes millions of Illinois residents from
                        accessing government services. For example,
                        <a
                          href="https://www.justice.gov/crt/case/service-oklahoma"
                          target="_blank"
                          rel="noopener noreferrer"
                        >Service Oklahoma, a state agency, faced a DOJ
                          investigation in 2024</a
                        >
                        after its mobile application was found inaccessible to
                        users with vision disabilities. The agency was required
                        to bring all digital services into WCAG 2.1 Level AA
                        compliance — all of which could have been prevented with
                        early accessibility planning.
                      </p>
                      <div class="tldr-actions">
                        <strong>Minimum viable actions:</strong>
                        <div class="tldr-columns">
                          <div class="tldr-column">
                            <span class="tldr-column-title"
                              >Web Accessibility</span
                            >
                            <ul>
                              <li>Keyboard navigation works</li>
                              <li>Images have alt text</li>
                              <li>Color contrast meets standards</li>
                              <li>Forms are properly labeled</li>
                            </ul>
                          </div>
                          <div class="tldr-column">
                            <span class="tldr-column-title"
                              >Document Accessibility</span
                            >
                            <ul>
                              <li>Use heading styles (not bold text)</li>
                              <li>Add alt text to images</li>
                              <li>Caption videos</li>
                              <li>Use accessible templates</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <p class="tldr-manual-work">
                        <strong>Important:</strong> There is no one-click fix for
                        accessibility. Each piece of digital content — web pages,
                        PDFs, Word files — usually needs manual remediation. The
                        good news: many accessibility checkers are available for
                        websites and content.
                      </p>
                      <p class="tldr-contact">
                        <strong>Questions?</strong> These requirements come from
                        federal law (
                        <a
                          href="https://www.ada.gov/resources/2024-03-08-web-rule/"
                          target="_blank"
                          rel="noopener noreferrer"
                          >ADA Title II</a
                        >) and Illinois law (the
                        <a
                          href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          >Illinois Information Technology Accessibility Act (IITAA)</a
                        >). Contact
                        <a href="mailto:DoIT.Accessibility@Illinois.gov"
                          >DoIT.Accessibility@Illinois.gov</a
                        >.
                      </p>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>

              <FaqAccordion
                :items="section.items"
                :section-id="slugify(section.heading || '')"
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
  extractNewDate,
  filterNewComments,
} from "../utils/faqTransform";
import { useDeadlineCountdown } from "../composables/useDeadlineCountdown";

/** @type {number} Target date timestamp for WCAG 2.1 AA compliance deadline (April 24, 2026) */
const targetDate = new Date("2026-04-24T00:00:00").getTime();

/** @type {string} Site creation date */
const siteCreated = "December 2025";

/** @type {string} Last update date - update when content is added or edited */
const lastUpdated = "December 29, 2025";

// Get deadline countdown information
const { daysRemaining, deadlinePassed, daysRemainingText, urgencyText } =
  useDeadlineCountdown();

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
  String(countdown.value.days).padStart(2, "0")
);

/**
 * Formatted countdown hours with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedHours = computed(() =>
  String(countdown.value.hours).padStart(2, "0")
);

/**
 * Formatted countdown minutes with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedMinutes = computed(() =>
  String(countdown.value.minutes).padStart(2, "0")
);

/**
 * Formatted countdown seconds with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedSeconds = computed(() =>
  String(countdown.value.seconds).padStart(2, "0")
);

/**
 * Computed aria-label for screen readers
 * @type {import('vue').ComputedRef<string>}
 */
const countdownAriaLabel = computed(() => {
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

/**
 * Generates a URL-friendly slug from text
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 30)
    .replace(/-$/, "");
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
          const newDate = extractNewDate(answerNodes);
          const filteredAnswer = filterNewComments(answerNodes);

          currentSection.items.push({
            question: questionText,
            answer: filteredAnswer.map(replaceDeadlineText),
            isNew: newDate !== null,
            newDate: newDate || undefined,
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

useSeoMeta({
  title: "ICJIA Accessibility Portal - Home",
  description: "Your resource for accessibility information and resources",
});
</script>

<style scoped>
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
}

.compliance-link {
  color: rgb(var(--v-theme-primary)) !important;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
}

.compliance-link:hover {
  opacity: 0.8;
  text-decoration: underline;
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
}

.date-item {
  display: inline-flex;
  align-items: center;
}

.date-separator {
  opacity: 0.5;
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
  opacity: 0.8;
  color: rgb(var(--v-theme-on-surface)) !important;
}

.countdown-separator {
  font-size: 3rem;
  font-weight: bold;
  opacity: 0.5;
  padding: 0 0.25rem;
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1;
  display: flex;
  align-items: center;
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

.faq-main-title {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  padding-bottom: 1rem;
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

/* TL;DR Executive Summary Panel */
.tldr-panel {
  margin-left: 25px;
}

.tldr-expansion {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.08) 0%,
    rgba(var(--v-theme-primary), 0.03) 100%
  ) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.25) !important;
  border-radius: 12px !important;
  overflow: hidden;
}

.tldr-expansion:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
}

.tldr-title-row {
  padding: 1.25rem 1.5rem !important;
  min-height: auto !important;
}

.tldr-header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex: 1;
}

.new-badge-summary {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 10px !important;
  height: 20px !important;
}

.tldr-header-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.tldr-title {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(var(--v-theme-primary));
}

.tldr-chevron {
  color: rgb(var(--v-theme-primary)) !important;
  transition: transform 200ms ease-in-out !important;
}

.tldr-expansion[aria-expanded="true"] .tldr-chevron {
  transform: rotate(180deg);
}

.tldr-content-panel {
  padding: 0 !important;
  background: rgba(var(--v-theme-surface), 0.5) !important;
}

.tldr-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
}

.tldr-content p {
  margin-bottom: 1rem;
}

.tldr-content p:last-child {
  margin-bottom: 0;
}

.tldr-intro {
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.tldr-lead {
  font-size: 1rem;
}

.tldr-key {
  margin: 1rem 0;
  line-height: 1.6;
}

.tldr-deia {
  margin: 1rem 0;
  line-height: 1.6;
}

.tldr-consequences {
  font-size: 0.95rem;
  margin: 1rem 0;
  line-height: 1.6;
  font-weight: 500;
}

.tldr-actions {
  margin: 1rem 0;
}

.tldr-columns {
  display: flex;
  gap: 2rem;
  margin-top: 0.75rem;
}

.tldr-column {
  flex: 1;
  background: rgba(var(--v-theme-surface), 0.3);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-primary), 0.15);
}

.tldr-column-title {
  display: block;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.tldr-column ul {
  margin: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.tldr-column li {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.tldr-actions ol {
  margin: 0.5rem 0 0 1.25rem;
  padding: 0;
}

.tldr-actions li {
  margin: 0.25rem 0;
}

.tldr-manual-work {
  font-size: 0.9rem;
  margin: 1rem 0;
  line-height: 1.6;
  font-style: italic;
  opacity: 0.9;
}

.tldr-note {
  font-size: 0.95rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(var(--v-theme-info), 0.1);
  border-left: 3px solid rgb(var(--v-theme-info));
  border-radius: 0 6px 6px 0;
}

.tldr-contact {
  font-size: 0.9rem;
  opacity: 0.9;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.1);
  padding-top: 1rem;
  margin-top: 1rem;
}

@media (max-width: 767px) {
  .tldr-panel {
    margin-left: 16px;
  }

  .tldr-title-row {
    padding: 1rem 1.25rem !important;
  }

  .tldr-content {
    padding: 0 1.25rem 1.25rem 1.25rem;
    font-size: 0.9rem;
  }

  .tldr-columns {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 400px) {
  .tldr-panel {
    margin-left: 12px;
  }

  .tldr-title-row {
    padding: 0.875rem 1rem !important;
  }

  .tldr-content {
    padding: 0 1rem 1rem 1rem;
  }
}
</style>
