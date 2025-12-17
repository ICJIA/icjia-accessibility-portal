<template>
  <v-expansion-panels
    v-model="expandedPanels"
    class="faq-accordion"
    elevation="0"
    color="surface"
  >
    <v-expansion-panel
      v-for="(item, index) in items"
      :key="index"
      :id="getQuestionId(item.question)"
      :value="index"
      class="faq-panel"
      elevation="0"
      color="surface"
    >
      <v-expansion-panel-title
        class="faq-question"
        :aria-describedby="`answer-${getQuestionId(item.question)}`"
      >
        {{ item.question }}
        <template #actions>
          <v-icon
            icon="mdi-chevron-down"
            class="faq-chevron"
            size="24"
            aria-hidden="true"
          />
        </template>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="faq-answer">
        <div
          :id="`answer-${getQuestionId(item.question)}`"
          class="faq-answer-content"
        >
          <ContentRenderer
            v-if="item.answer"
            :value="createAnswerContent(item.answer)"
          />
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
/**
 * @fileoverview FAQ Accordion component with ARIA support
 * @description Displays FAQ items in an accordion format with proper ARIA relationships,
 * URL hash support for deep linking, and collapse functionality
 */

import { ref, watch, onMounted, nextTick } from "vue";

/** @typedef {any} MiniMarkNode */

/**
 * FAQ item interface
 * @typedef {Object} FaqItem
 * @property {string} question - FAQ question text
 * @property {MiniMarkNode[]} answer - FAQ answer content as markdown nodes
 */
type MiniMarkNode = any;

interface FaqItem {
  question: string;
  answer: MiniMarkNode[];
}

/**
 * Component props
 * @typedef {Object} FaqAccordionProps
 * @property {FaqItem[]} items - Array of FAQ items to display
 * @property {string} [sectionId] - Optional section ID prefix for question IDs
 */
const props = defineProps<{
  items: FaqItem[];
  sectionId?: string;
}>();

/**
 * Currently expanded panel index (only one panel can be open at a time)
 * @type {import('vue').Ref<number | undefined>}
 */
const expandedPanels = ref<number | undefined>(undefined);

/**
 * Watch for collapse signal from navbar logo click
 */
const { collapseSignal } = useFaqCollapse();
watch(collapseSignal, () => {
  // Collapse all panels when signal changes
  expandedPanels.value = undefined;
});

/**
 * Generates a URL-friendly slug from question text
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .substring(0, 50) // Limit length
    .replace(/-$/, ""); // Remove trailing hyphen
}

/**
 * Gets the full ID for a question (with optional section prefix)
 * @param {string} question - Question text
 * @returns {string} Full question ID
 */
function getQuestionId(question: string): string {
  const slug = slugify(question);
  return props.sectionId ? `${props.sectionId}-${slug}` : slug;
}

/**
 * Finds panel index by URL hash
 * @param {string} hash - URL hash (e.g., "#question-slug")
 * @returns {number} Panel index or -1 if not found
 */
function findPanelByHash(hash: string): number {
  const id = hash.replace("#", "");
  return props.items.findIndex((item) => getQuestionId(item.question) === id);
}

/**
 * Scrolls element to top of viewport (below navbar)
 * @param {string} elementId - Element ID to scroll to
 * @returns {void}
 */
function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const navbar = document.querySelector("header");
    const navbarHeight = navbar ? navbar.offsetHeight : 64;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight - 20;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
  }
}

// Update URL hash and scroll when panel changes
watch(expandedPanels, async (newValue, oldValue) => {
  if (typeof window === "undefined") return;

  if (
    newValue !== undefined &&
    newValue >= 0 &&
    newValue < props.items.length
  ) {
    const item = props.items[newValue];
    if (!item) return;
    const id = getQuestionId(item.question);
    // Update URL without triggering navigation
    window.history.replaceState(null, "", `#${id}`);

    // Wait for panel expansion animation to complete, then scroll
    await nextTick();
    // Use multiple timeouts to ensure scroll happens after animation
    setTimeout(() => {
      scrollToElement(id);
      // Second scroll after animation fully completes
      setTimeout(() => {
        scrollToElement(id);
      }, 200);
    }, 100);
  }
});

// On mount, check for hash and open corresponding panel
onMounted(async () => {
  if (typeof window === "undefined") return;

  const hash = window.location.hash;
  if (hash) {
    const panelIndex = findPanelByHash(hash);
    if (panelIndex >= 0) {
      // Open the panel
      expandedPanels.value = panelIndex;

      // Wait for DOM update then scroll
      await nextTick();
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          // Get navbar height to offset scroll position
          const navbar = document.querySelector("header");
          const navbarHeight = navbar ? navbar.offsetHeight : 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - navbarHeight - 16;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }
});

// Create a content structure that ContentRenderer can handle
function createAnswerContent(answerNodes: MiniMarkNode[]) {
  return {
    body: {
      type: "minimark",
      value: answerNodes,
    },
  };
}
</script>

<style scoped>
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 25px; /* Offset from section headings */
}

.faq-panel {
  background: rgb(var(--v-theme-surface)) !important;
  border: 1px solid;
  border-color: rgba(var(--v-theme-on-surface), 0.12) !important;
  border-radius: 8px !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  transition: all 150ms ease !important;
  overflow: hidden;
  scroll-margin-top: 80px; /* Account for fixed navbar */
}

.faq-panel:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  cursor: pointer;
}

.faq-panel:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
}

.faq-panel:focus-within {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.faq-question {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface)) !important;
  padding: 24px !important;
  min-height: auto !important;
}

.faq-chevron {
  color: rgb(var(--v-theme-on-surface-variant)) !important;
  transition: transform 200ms ease-in-out !important;
}

.faq-panel[aria-expanded="true"] .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 !important;
  background: rgb(var(--v-theme-surface-variant)) !important;
}

.faq-answer-content {
  padding: 0 24px 24px 24px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant)) !important;
}

/* Content styling within answers */
.faq-answer-content :deep(p) {
  margin: 0 0 1rem 0;
  color: inherit;
}

.faq-answer-content :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-answer-content :deep(ul),
.faq-answer-content :deep(ol) {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

.faq-answer-content :deep(li) {
  margin: 0.5rem 0;
}

.faq-answer-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.faq-answer-content :deep(th) {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
}

.faq-answer-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-surface-variant), 0.15);
}

.faq-answer-content :deep(tr:last-child td) {
  border-bottom: none;
}

.faq-answer-content :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 2px;
}

.faq-answer-content :deep(a:hover) {
  text-decoration-thickness: 2px;
}

.faq-answer-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  background: rgba(var(--v-theme-primary), 0.08);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.faq-answer-content :deep(code) {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.faq-answer-content :deep(strong) {
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 1023px) {
  .faq-question {
    padding: 20px !important;
    font-size: 17px;
  }

  .faq-answer-content {
    padding: 0 20px 20px 20px;
  }
}

@media (max-width: 767px) {
  .faq-accordion {
    gap: 20px;
    margin-left: 16px; /* Reduced indentation on mobile for better space usage */
  }

  .faq-question {
    padding: 16px !important;
    font-size: 16px;
    line-height: 1.5; /* Slightly tighter line height for better readability on small screens */
  }

  .faq-answer-content {
    padding: 0 16px 16px 16px;
    font-size: 15px;
  }

  .faq-chevron {
    min-width: 44px;
    min-height: 44px;
  }
}

@media (max-width: 400px) {
  .faq-accordion {
    margin-left: 12px; /* Further reduced on very small screens */
  }

  .faq-question {
    font-size: 15px; /* Slightly smaller on very small screens but still readable */
    padding: 14px !important;
  }

  .faq-answer-content {
    padding: 0 14px 14px 14px;
    font-size: 14px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .faq-panel,
  .faq-chevron {
    transition: none !important;
  }

  .faq-panel[aria-expanded="true"] .faq-chevron {
    transform: rotate(180deg);
  }
}

/* Link colors use theme primary */
.faq-answer-content :deep(a) {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
