<template>
  <v-expansion-panels
    v-model="expandedPanels"
    class="faq-accordion"
    elevation="0"
    bg-color="transparent"
    :multiple="false"
  >
    <v-expansion-panel
      v-for="(item, index) in items"
      :key="index"
      :id="getQuestionId(item.question)"
      :value="index"
      class="faq-panel"
      elevation="0"
      bg-color="transparent"
    >
      <v-expansion-panel-title
        class="faq-question"
        :class="{ 'has-new-badge': item.isNew }"
      >
        <div class="faq-question-wrapper">
          <span
            v-if="item.isNew"
            class="new-badge"
            :class="{ 'new-badge--new': item.badgeKind === 'new' }"
          >
            <template v-if="item.badgeKind === 'new'"
              ><span aria-hidden="true">★&nbsp;</span>New on{{
                item.newDate ? ` ${formatDate(item.newDate)}` : ""
              }}</template
            >
            <template v-else
              >Updated on{{
                item.newDate ? ` ${formatDate(item.newDate)}` : ""
              }}</template
            >
          </span>
          <span class="faq-question-text">{{ item.question }}</span>
        </div>
        <template #actions>
          <!-- "Open +" / "Close –" cue, drawn by CSS from the panel state.
               Decorative: the button's aria-expanded carries the state. -->
          <span class="faq-cue" aria-hidden="true"></span>
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

/** @typedef {any} MiniMarkNode */

/**
 * FAQ item interface
 * @typedef {Object} FaqItem
 * @property {string} question - FAQ question text
 * @property {MiniMarkNode[]} answer - FAQ answer content as markdown nodes
 * @property {boolean} [isNew] - Whether this FAQ should display a chip (within 21 days of its tag date)
 * @property {string} [newDate] - Date from the FAQ's {new:}/{updated:} tag (YYYY-MM-DD format)
 * @property {('new'|'updated')} [badgeKind] - Chip kind: "new" (New chip) or "updated" (Updated-on chip)
 */
type MiniMarkNode = any;

interface FaqItem {
  question: string;
  answer: MiniMarkNode[];
  isNew?: boolean;
  newDate?: string;
  badgeKind?: "new" | "updated";
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
  // URLSearchParams.get() already returns the decoded value. Decoding it a
  // second time threw "URI malformed" for any search term containing "%"
  // (for example "50%"), which stopped this component's setup on that page.
  const params = new URLSearchParams(window.location.search);
  const term = params.get("highlight");
  return term || null;
}

/**
 * Apply yellow highlighting to matching text in the opened panel.
 *
 * The answer is not always ready when this is called. On a first page load
 * (which is how a search result opens: in a new tab) the answer may not be in
 * the page yet, and once it is, the FAQ list re-renders when the countdown
 * starts, which throws away any highlights already added. So this checks
 * several times over about four seconds and adds the highlights whenever the
 * answer is there without them. It scrolls to the first highlight once.
 */
function applyHighlighting(panelIndex: number) {
  const term = highlightTerm.value;
  if (!term) return;

  const item = props.items[panelIndex];
  if (!item) return;

  const panelId = getQuestionId(item.question);
  const answerId = `answer-${panelId}`;

  let attempts = 0;
  let scrolled = false;

  const tick = () => {
    attempts++;
    // Stop if the reader has since searched for something else
    if (highlightTerm.value !== term) return;

    const answerEl = document.getElementById(answerId);
    if (answerEl) {
      const hasMarks = !!answerEl.querySelector(".search-term-highlight");
      const sameTerm = answerEl.dataset.highlightTerm === term;
      if (!hasMarks || !sameTerm) {
        // Clear highlights left by an earlier term, then add this one's
        clearHighlights(answerEl);
        highlightTextInElement(answerEl, term);
        answerEl.dataset.highlightTerm = term;
      }

      const firstHighlight = answerEl.querySelector(".search-term-highlight");
      if (firstHighlight && !scrolled) {
        scrolled = true;
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (attempts < 14) setTimeout(tick, 300);
  };

  setTimeout(tick, 300); // Wait for panel animation
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
      
    }

    // Apply search term highlighting if present. This runs even when the
    // panel element was not found yet: applyHighlighting waits for it.
    if (highlightTerm.value) {
      applyHighlighting(panelIndex);
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

    // If the page was opened from a search result, highlight the search term
    // in this answer. Doing it here covers every way a question gets opened,
    // including a first page load, where the link plugin opens the question.
    // The term is read from the address again here rather than trusted from
    // mount time.
    highlightTerm.value = getHighlightTerm();
    if (highlightTerm.value) {
      applyHighlighting(newValue);
    }

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
 * Format date for display in the Updated-on chip
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} Formatted date like "08/13/2026" (mm/dd/yyyy)
 */
function formatDate(dateStr: string): string {
  try {
    // Parse date components directly to avoid timezone issues
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
      return dateStr;
    }
    const [year, month, day] = parts;
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${mm}/${dd}/${year}`;
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
/* Plakat look: questions are ruled rows, not cards. Each row is a line of
   heavy type with an "Open +" / "Close –" cue at the right. */
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-bottom: 2px solid var(--pk-border-alt);
}

.faq-panel {
  background: transparent !important;
  border-top: 2px solid var(--pk-border-alt);
  box-shadow: none !important;
  margin: 0 !important;
  overflow: hidden;
  scroll-margin-top: 80px; /* Account for fixed navbar */
}

/* Vuetify's own shadow layer and divider line are not part of this look. */
.faq-panel :deep(.v-expansion-panel__shadow) {
  display: none;
}

.faq-panel::after {
  display: none;
}

.faq-panel:focus-within {
  outline: 2px solid var(--pk-link);
  outline-offset: 2px;
}

.faq-question {
  font-size: 1.375rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--pk-heading) !important;
  /* Side padding keeps the text clear of the row's focus outline. */
  padding: 18px 20px !important;
  min-height: 64px !important;
  align-items: baseline;
  gap: 16px;
}

.faq-question:hover {
  background: var(--pk-hover);
}

/* The hover wash above replaces Vuetify's grey overlay. */
.faq-question :deep(.v-expansion-panel-title__overlay) {
  display: none;
}

.faq-question-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
}

.faq-question-text {
  display: block;
  flex: 1;
}

.faq-cue {
  flex-shrink: 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--pk-heading);
}

.faq-cue::after {
  content: "Open +";
}

.faq-question.v-expansion-panel-title--active .faq-cue::after {
  content: "Close \2013";
}

/* New / Updated labels: green on its own dark wash (9.5:1), square. */
.new-badge {
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  line-height: 1.25rem;
  padding: 1px 8px;
  background-color: var(--pk-green-wash);
  color: var(--pk-green);
  white-space: normal;
  overflow-wrap: break-word;
  max-width: 100%;
}

/* A brand-new question is marked with the cobalt block instead (white on
   cobalt: 5.7:1), so "New" and "Updated" differ by more than their wording. */
.new-badge--new {
  background-color: var(--pk-brand);
  color: var(--pk-brand-ink);
}

.faq-answer {
  padding: 0 !important;
  background: transparent !important;
}

.faq-answer :deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}

.faq-answer-content {
  max-width: 49rem;
  box-sizing: content-box;
  padding: 8px 20px 32px;
  font-size: 1.1875rem;
  font-weight: 400;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Base line-height for content */
  line-height: 1.55;
  color: var(--pk-text) !important;
}

.faq-answer-content :deep(div),
.faq-answer-content :deep(span) {
  line-height: inherit;
}

/* Content styling within answers */
.faq-answer-content :deep(p) {
  margin: 0 0 1rem 0;
  color: inherit;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.55 !important;
}

.faq-answer-content :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-answer-content :deep(h4),
.faq-answer-content :deep(h5) {
  margin: 1.75rem 0 0.5rem;
  font-size: 1.25rem;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--pk-heading);
}

.faq-answer-content :deep(ul),
.faq-answer-content :deep(ol) {
  margin: 0 0 1rem 0;
  padding-left: 1.625rem;
}

.faq-answer-content :deep(li) {
  margin: 0.5rem 0;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.55 !important;
}

.faq-answer-content :deep(strong) {
  font-weight: 700;
  color: var(--pk-heading);
}

/* Responsive table styling */
.faq-answer-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0; /* Margin handled by wrapper */
  font-size: 1rem;
  display: table;
  border-top: 4px solid var(--pk-heading);
}

.faq-answer-content :deep(th) {
  background: transparent;
  color: var(--pk-heading);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.75rem 1rem 0.75rem 0;
  text-align: left;
  vertical-align: bottom;
  border-bottom: 2px solid var(--pk-heading);
}

.faq-answer-content :deep(td) {
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 1px solid var(--pk-border-alt);
  background: transparent;
  vertical-align: top;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.faq-answer-content :deep(a) {
  color: var(--pk-link) !important;
  text-decoration: underline;
  text-underline-offset: 2px;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44px tap target height */
  display: inline;
  min-height: 44px !important;
  padding: 8px 2px;
  box-sizing: border-box;
  line-height: 1.5;
}

.faq-answer-content :deep(a:hover) {
  color: var(--pk-link-hover) !important;
  text-decoration-thickness: 2px;
}

/* Callouts: a quiet raised note with a heavy left edge. */
.faq-answer-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  background: var(--pk-raised);
  border: 1px solid var(--pk-border-alt);
  border-left: 4px solid var(--pk-heading);
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.55 !important;
}

.faq-answer-content :deep(blockquote p) {
  line-height: 1.55 !important;
}

.faq-answer-content :deep(.see-also-card) {
  background: transparent;
  border-top: 2px solid var(--pk-border-alt);
  padding: 0.875rem 0 0;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--pk-text-2);
}

.faq-answer-content :deep(.see-also-card p) {
  margin: 0.25rem 0;
  line-height: 1.6 !important;
}

.faq-answer-content :deep(code) {
  background: var(--pk-raised);
  border: 1px solid var(--pk-border-alt);
  padding: 0.1rem 0.375rem;
  font-size: 0.9em;
}

.faq-answer-content :deep(pre) {
  background: var(--pk-card);
  border: 1px solid var(--pk-border-alt);
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.faq-answer-content :deep(pre code) {
  background: transparent;
  border: 0;
  padding: 0;
}

.faq-answer-content :deep(hr) {
  border: none;
  border-top: 2px solid var(--pk-border-alt);
  margin: 1.5rem 0;
}

/* Responsive design */
@media (max-width: 767px) {
  .faq-question {
    padding: 16px 14px !important;
    font-size: 1.1875rem;
    line-height: 1.25;
  }

  .faq-answer-content {
    padding: 6px 14px 24px;
    font-size: 1.0625rem;
  }
}

/* Search term highlighting: dark ink on yellow (15:1). The <mark> elements
   are created by script, so they are reached with :deep(). */
.faq-answer-content :deep(.search-term-highlight),
.faq-question-text :deep(.search-term-highlight) {
  background: var(--pk-mark);
  color: var(--pk-mark-ink);
  padding: 0.05em 0.2em;
  font-weight: 700;
}
</style>
