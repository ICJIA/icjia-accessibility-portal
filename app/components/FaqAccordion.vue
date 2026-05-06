<template>
  <v-expansion-panels
    v-model="expandedPanels"
    class="faq-accordion"
    elevation="0"
    color="surface"
    :multiple="false"
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
        :class="{ 'has-new-badge': item.isNew }"
      >
        <div class="faq-question-wrapper">
          <span
            v-if="item.isNew"
            class="new-badge"
          >
            Updated{{ item.newDate ? ` (${formatDate(item.newDate)})` : '' }}
          </span>
          <span class="faq-question-text">{{ item.question }}</span>
        </div>
        <template #actions>
          <v-icon
            :icon="mdiChevronDown"
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
 * URL hash support for deep linking, collapse functionality, and search term highlighting
 */

import { ref, watch, onMounted, onUnmounted, nextTick, computed } from "vue";
import { mdiChevronDown } from '~/utils/icons'

/** @typedef {any} MiniMarkNode */

/**
 * FAQ item interface
 * @typedef {Object} FaqItem
 * @property {string} question - FAQ question text
 * @property {MiniMarkNode[]} answer - FAQ answer content as markdown nodes
 * @property {boolean} [isNew] - Whether this FAQ was recently added (within 7 days)
 * @property {string} [newDate] - Date the FAQ was added (YYYY-MM-DD format)
 */
type MiniMarkNode = any;

interface FaqItem {
  question: string;
  answer: MiniMarkNode[];
  isNew?: boolean;
  newDate?: string;
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
 * Unique identifier for this accordion instance
 * Used to coordinate with other accordions on the page
 * Uses sectionId if provided, otherwise generates a unique ID
 * This is stable for the component instance lifetime (script setup runs once)
 */
const accordionId =
  props.sectionId || `accordion-${Math.random().toString(36).substring(2, 11)}`;

/**
 * Shared state for coordinating accordions across the page
 */
const { collapseSignal, openAccordion, setOpenAccordion, getOpenPanelIndex } =
  useFaqCollapse();

/**
 * Currently expanded panel index (synced with shared state)
 * @type {import('vue').Ref<number | undefined>}
 */
const expandedPanels = ref<number | undefined>(getOpenPanelIndex(accordionId));

/**
 * Watch for collapse signal from navbar logo click
 */
watch(collapseSignal, () => {
  // Collapse all panels when signal changes
  expandedPanels.value = undefined;
  setOpenAccordion(accordionId, undefined);
});

/**
 * Flag to prevent infinite loops when syncing with shared state
 */
let isSyncingFromShared = false;

/**
 * Watch shared state to sync when other accordions open/close
 */
watch(openAccordion, (newValue) => {
  isSyncingFromShared = true;
  if (newValue?.accordionId === accordionId) {
    // This accordion's panel is open
    expandedPanels.value = newValue.panelIndex;
  } else {
    // Another accordion is open, close this one
    expandedPanels.value = undefined;
  }
  // Reset flag after next tick to allow local changes to propagate
  nextTick(() => {
    isSyncingFromShared = false;
  });
});

/**
 * Watch local state changes and update shared state
 * This ensures only one accordion is open at a time
 */
watch(expandedPanels, (newValue) => {
  // Don't update shared state if this change came from shared state
  if (isSyncingFromShared) return;

  if (newValue !== undefined) {
    // A panel in this accordion was opened
    setOpenAccordion(accordionId, newValue);
  } else {
    // This accordion was closed
    // Only clear shared state if this accordion was the one that was open
    if (openAccordion.value?.accordionId === accordionId) {
      setOpenAccordion(accordionId, undefined);
    }
  }
});

const { slugify, getQuestionId: getQuestionIdUtil } = useSlugify();

/**
 * Current highlight search term from URL query parameter
 */
const highlightTerm = ref<string | null>(null);

/**
 * Gets the full ID for a question (with optional section prefix)
 * @param {string} question - Question text
 * @returns {string} Full question ID
 */
function getQuestionId(question: string): string {
  if (props.sectionId) {
    return getQuestionIdUtil(props.sectionId, question);
  }
  return slugify(question);
}

/**
 * Extract highlight term from URL query parameter
 */
function getHighlightTerm(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const term = params.get("highlight");
  return term ? decodeURIComponent(term) : null;
}

/**
 * Apply yellow highlighting to matching text in the opened panel
 */
function applyHighlighting(panelIndex: number) {
  if (!highlightTerm.value) return;
  
  const item = props.items[panelIndex];
  if (!item) return;
  
  const panelId = getQuestionId(item.question);
  const answerId = `answer-${panelId}`;
  
  // Wait for content to render
  setTimeout(() => {
    const answerEl = document.getElementById(answerId);
    if (!answerEl) return;
    
    // Clear any existing highlights first
    clearHighlights(answerEl);
    
    // Apply highlighting
    highlightTextInElement(answerEl, highlightTerm.value!);
    
    // Scroll the first highlight into view if needed
    const firstHighlight = answerEl.querySelector(".search-term-highlight");
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 300); // Wait for panel animation
}

/**
 * Clear existing highlights from an element
 */
function clearHighlights(element: HTMLElement) {
  const highlights = element.querySelectorAll(".search-term-highlight");
  highlights.forEach(highlight => {
    const parent = highlight.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(highlight.textContent || ""), highlight);
      parent.normalize();
    }
  });
}

/**
 * Recursively highlight matching text in an element
 */
function highlightTextInElement(element: HTMLElement, searchTerm: string) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  );
  
  const textNodes: Text[] = [];
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node);
  }
  
  const searchLower = searchTerm.toLowerCase();
  const words = searchTerm.split(/\s+/).filter(w => w.length >= 2);
  
  for (const textNode of textNodes) {
    const text = textNode.textContent || "";
    const textLower = text.toLowerCase();
    
    // Find all matches (both full phrase and individual words)
    const matches: Array<[number, number]> = [];
    
    // Check for full phrase match
    let index = textLower.indexOf(searchLower);
    while (index !== -1) {
      matches.push([index, index + searchTerm.length]);
      index = textLower.indexOf(searchLower, index + 1);
    }
    
    // Also check individual words
    for (const word of words) {
      const wordLower = word.toLowerCase();
      let wordIndex = textLower.indexOf(wordLower);
      while (wordIndex !== -1) {
        matches.push([wordIndex, wordIndex + word.length]);
        wordIndex = textLower.indexOf(wordLower, wordIndex + 1);
      }
    }
    
    if (matches.length === 0) continue;
    
    // Sort and merge overlapping matches
    matches.sort((a, b) => a[0] - b[0]);
    const merged: Array<[number, number]> = [];
    for (const [start, end] of matches) {
      if (merged.length === 0 || merged[merged.length - 1][1] < start) {
        merged.push([start, end]);
      } else {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
      }
    }
    
    // Create highlighted spans
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    
    for (const [start, end] of merged) {
      // Add text before match
      if (start > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
      }
      
      // Add highlighted match
      const mark = document.createElement("mark");
      mark.className = "search-term-highlight";
      mark.textContent = text.slice(start, end);
      fragment.appendChild(mark);
      
      lastIndex = end;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    
    // Replace the text node with the fragment
    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}

/**
 * Finds panel index by URL hash
 * @param {string} hash - URL hash (e.g., "#question-slug" or "#section-question-slug")
 * @returns {number} Panel index or -1 if not found
 */
function findPanelByHash(hash: string): number {
  const id = hash.replace("#", "");

  // 1. Try exact match (with current section prefix)
  let index = props.items.findIndex(
    (item) => getQuestionId(item.question) === id
  );
  if (index >= 0) return index;

  // 2. Try matching the question slug directly (ignoring whatever prefix the hash has)
  // This handles cross-prefix matching (e.g. "all-faqs-" vs "common-concerns-")
  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i];
    if (!item) continue;
    const questionSlug = slugify(item.question);
    // If the hash ends with the question slug, it's a match
    // Also try matching without hyphens to be extra resilient to manual link entries
    const cleanId = id.replace(/-/g, '');
    const cleanQuestionSlug = questionSlug.replace(/-/g, '');
    
    if (id === questionSlug || 
        id.endsWith("-" + questionSlug) || 
        cleanId.endsWith(cleanQuestionSlug)) {
      return i;
    }
  }

  return -1;
}

/**
 * Opens the panel referenced by a URL hash (if it exists in this accordion)
 * and scrolls it into view. Safe to call repeatedly.
 */
async function openPanelFromHash(hash: string) {
  if (typeof window === "undefined") return;
  if (!hash) return;

  const panelIndex = findPanelByHash(hash);
  if (panelIndex < 0) return;

  // This is a user-initiated navigation, not a shared-state sync
  isSyncingFromShared = false;
  expandedPanels.value = panelIndex;
  setOpenAccordion(accordionId, panelIndex);

  // Wait for DOM update then scroll
  await nextTick();
  setTimeout(() => {
    const hashId = hash.replace("#", "");
    // 1. Try to find the element by the hash ID directly
    let element = document.getElementById(hashId);

    // 2. If not found, try to find the actual element using the index we already found
    if (!element) {
      const item = props.items[panelIndex];
      const actualId = item ? getQuestionId(item.question) : null;
      element = actualId ? document.getElementById(actualId) : null;
    }

    // 3. Last resort: search for panels with IDs that end with the question slug
    if (!element) {
      const item = props.items[panelIndex];
      const qSlug = item ? slugify(item.question) : null;
      if (qSlug) {
        const allPanels = document.querySelectorAll<HTMLElement>(".faq-panel[id]");
        for (const panel of allPanels) {
          if (panel.id === qSlug || panel.id.endsWith("-" + qSlug)) {
            element = panel;
            break;
          }
        }
      }
    }

    if (element) {
      // Get navbar height to offset scroll position
      const navbar = document.querySelector("header");
      const navbarHeight = navbar ? navbar.offsetHeight : 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update hash to the actual ID (with section prefix) if different
      const actualId = element.id;
      if (actualId !== hashId && window.history.state) {
        window.history.replaceState(window.history.state, "", `#${actualId}`);
      }
      
      // Apply search term highlighting if present
      if (highlightTerm.value) {
        applyHighlighting(panelIndex);
      }
    }
  }, 100);
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
    // Update URL without triggering navigation (preserve history state for Vue Router)
    const currentState = window.history.state;
    window.history.replaceState(currentState, "", `#${id}`);

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

// Hash change handler for in-page navigation
const onHashChange = () => {
  highlightTerm.value = getHighlightTerm();
  openPanelFromHash(window.location.hash);
};

// On mount, check for hash and open corresponding panel
onMounted(async () => {
  if (typeof window === "undefined") return;

  // Extract highlight term from URL
  highlightTerm.value = getHighlightTerm();

  // Initial deep link (direct load)
  await openPanelFromHash(window.location.hash);

  // Support in-page navigation (clicking internal hash links)
  window.addEventListener("hashchange", onHashChange);
});

// Clean up event listener on unmount
onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("hashchange", onHashChange);
  }
});

/**
 * Format date for display in NEW badge
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} Formatted date like "Dec 30, 2025"
 */
function formatDate(dateStr: string): string {
  try {
    // Parse date components directly to avoid timezone issues
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
      return dateStr;
    }
    const [year, month, day] = parts;
    const date = new Date(year, month - 1, day); // month is 0-indexed
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    return `${monthName} ${day}, ${year}`;
  } catch {
    return dateStr;
  }
}

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

.faq-question-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex: 1;
}

.faq-question-text {
  display: block;
  flex: 1;
}

.new-badge {
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgb(var(--v-theme-success));
  color: rgb(var(--v-theme-on-success));
  min-height: 20px;
  height: auto;
  line-height: 1.2;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow: visible;
  max-width: 100%;
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Base line-height for content */
  line-height: 1.5;
  color: rgb(var(--v-theme-on-surface-variant)) !important;
}

/* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Ensure all text-containing elements in FAQ answers have minimum 1.5 line-height */
.faq-answer-content :deep(div),
.faq-answer-content :deep(span) {
  /* Only apply to elements that contain text, not structural elements */
  line-height: inherit;
}

/* Content styling within answers */
.faq-answer-content :deep(p) {
  margin: 0 0 1rem 0;
  color: inherit;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
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
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
}

/* Responsive table styling */
.faq-answer-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0; /* Margin handled by wrapper */
  font-size: 0.9rem;
  display: table;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.faq-answer-content :deep(tr:last-child td) {
  border-bottom: none;
}

.faq-answer-content :deep(a) {
  color: rgb(var(--v-theme-primary-darken-1));
  text-decoration: underline;
  text-underline-offset: 2px;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44px tap target height */
  display: inline;
  min-height: 44px !important;
  padding: 8px 2px;
  box-sizing: border-box;
  line-height: 1.5;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .faq-answer-content :deep(a),
.v-theme--dark .faq-answer-content :deep(a) {
  color: #93C5FD !important; /* Lighter blue for 7:1+ contrast on dark background */
}

.faq-answer-content :deep(a:hover) {
  text-decoration-thickness: 2px;
}

[data-v-theme="dark"] .faq-answer-content :deep(a:hover),
.v-theme--dark .faq-answer-content :deep(a:hover) {
  color: #93C5FD !important;
}

.faq-answer-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  background: rgba(var(--v-theme-primary), 0.08);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  font-style: italic;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
}

.faq-answer-content :deep(blockquote p) {
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
}

.faq-answer-content :deep(.see-also-card) {
  background: rgba(var(--v-theme-primary), 0.08);
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-left: 3px solid rgba(var(--v-theme-primary), 0.5);
  border-radius: 0 8px 8px 0;
  padding: 0.75rem 1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85em;
}

.faq-answer-content :deep(.see-also-card p) {
  margin: 0.25rem 0;
  line-height: 1.6;
}

[data-v-theme="dark"] .faq-answer-content :deep(.see-also-card),
.v-theme--dark .faq-answer-content :deep(.see-also-card) {
  background: rgba(var(--v-theme-primary), 0.1);
  border-color: rgba(var(--v-theme-primary), 0.3);
  border-left-color: rgba(var(--v-theme-primary), 0.6);
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

/* Link colors use theme primary - ensure AAA contrast and target size */
/* Note: This rule is overridden by the more specific rule above, but kept for consistency */

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .faq-answer-content :deep(a),
.v-theme--dark .faq-answer-content :deep(a) {
  color: #93C5FD !important; /* Lighter blue for 7:1+ contrast on dark background */
}

/* Search term highlighting */
.search-term-highlight {
  background: rgba(255, 235, 59, 0.7) !important;
  color: inherit !important;
  padding: 0.1em 0.15em;
  border-radius: 3px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: highlight-pulse 1s ease-in-out;
}

@keyframes highlight-pulse {
  0% {
    background: rgba(255, 235, 59, 1);
    box-shadow: 0 0 10px rgba(255, 235, 59, 0.8);
  }
  100% {
    background: rgba(255, 235, 59, 0.7);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

/* Also highlight in questions (for when opened from search) */
.faq-question-text :deep(.search-term-highlight),
.faq-question .search-term-highlight {
  background: rgba(255, 235, 59, 0.7) !important;
  color: inherit !important;
  padding: 0.1em 0.15em;
  border-radius: 3px;
  font-weight: 600;
}
</style>
