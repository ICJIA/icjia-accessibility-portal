<template>
  <v-container>
    <div class="pk-page">
      <div class="pk-page-inner">
        <div class="search-page">
          <!-- Header -->
          <div class="search-header pk-page-head">
            <p class="pk-label">Find an answer</p>
            <h1 class="pk-page-title">Search FAQs</h1>
            <p class="pk-page-intro">
              Search ICJIA accessibility FAQs for WCAG compliance, the compliance deadline, and state agency requirements.
            </p>
          </div>

          <!-- Search Input -->
          <div class="search-input-wrapper mb-6">
            <v-text-field
              v-model="searchQuery"
              ref="searchInputRef"
              label="Search FAQs"
              :prepend-inner-icon="mdiMagnify"
              variant="outlined"
              clearable
              autofocus
              hide-details
              density="comfortable"
              class="search-input"
              aria-label="Search FAQs"
              @keydown.enter="handleEnterKey"
            />
            <p v-if="searchQuery" class="text-caption text-medium-emphasis mt-2">
              {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }} found
              <span v-if="searchQuery.length < minSearchLength" class="ml-2">(type at least {{ minSearchLength }} characters)</span>
            </p>
          </div>

          <!-- Results -->
          <div v-if="searchQuery && searchQuery.length >= minSearchLength" class="search-results">
            <TransitionGroup name="fade" tag="div" class="results-list">
              <div
                v-for="(result, index) in searchResults"
                :key="result.item.question"
                class="result-card"
                :class="{ 'result-new': result.item.isNew }"
                role="article"
                tabindex="0"
                @click="openFaqInNewWindow(result)"
                @keydown.enter="openFaqInNewWindow(result)"
              >
                <!-- Relevance indicator -->
                <div class="relevance-indicator">
                  <v-chip
                    size="x-small"
                    :color="getRelevanceColor(result.score)"
                    variant="flat"
                    class="relevance-chip"
                  >
                    {{ getRelevanceLabel(result.score) }}
                  </v-chip>
                  <span class="result-number text-caption text-medium-emphasis">
                    #{{ index + 1 }}
                  </span>
                </div>

                <!-- Question with highlighted matches -->
                <h2 class="result-question">
                  <span
                    v-if="result.item.isNew"
                    class="new-badge mr-2"
                  >
                    UPDATED
                  </span>
                  <span v-html="highlightMatches(result.item.question, result)"></span>
                </h2>

                <!-- Section badge -->
                <div v-if="result.item.section" class="result-section">
                  <v-chip size="x-small" variant="outlined" color="primary">
                    {{ result.item.section }}
                  </v-chip>
                </div>

                <!-- Answer preview with highlighted matches -->
                <p class="result-preview" v-html="getAnswerPreview(result)"></p>

                <!-- Open indicator -->
                <div class="open-indicator">
                  <v-icon size="small" color="primary" :icon="mdiOpenInNew" />
                  <span class="text-caption text-primary">Opens in new tab</span>
                </div>
              </div>
            </TransitionGroup>

            <!-- No results message -->
            <div v-if="searchResults.length === 0" class="no-results">
              <v-icon size="64" color="grey-lighten-1" class="mb-4" :icon="mdiFileSearchOutline" />
              <h2 class="text-h6 text-medium-emphasis mb-2">No results found</h2>
              <p class="text-body-2 text-medium-emphasis">
                Try different or broader keywords.
              </p>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else-if="!searchQuery" class="empty-state">
            <v-icon size="80" color="grey-lighten-1" class="mb-4" :icon="mdiTextSearch" />
            <h2 class="text-h6 text-medium-emphasis mb-2">Start typing to search</h2>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Search across all FAQ questions and answers instantly.
            </p>
            <div class="search-tips">
              <p class="text-caption text-medium-emphasis mb-1">
                <strong>Tips:</strong>
              </p>
              <ul class="text-caption text-medium-emphasis">
                <li>Use keywords like "WCAG", "deadline", "PDF", "alt text"</li>
                <li>Fuzzy search handles typos and partial matches</li>
                <li>Results are ranked by relevance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Search page with Fuse.js fuzzy search for FAQs
 * @description Provides instant fuzzy search across all FAQs with relevance ranking
 */

import { ref, computed, watch, onMounted } from "vue";
import { mdiMagnify, mdiOpenInNew, mdiFileSearchOutline, mdiTextSearch } from '~/utils/icons';
import Fuse from "fuse.js";
import {
  extractTaggedDate,
  isWithinNewWindow,
  filterNewComments,
  type MarkdownNode,
} from "../utils/faqTransform";
import { useSeo } from "../composables/useSeo";
import { slugify } from "../composables/useSlugify";
import searchConfig from "../../search.config.json";

// SEO
useSeo({
  title: "Search FAQs",
  description: "Search Illinois accessibility FAQs. Find answers about WCAG 2.1 AA compliance, ADA requirements, and digital accessibility.",
  url: "/search",
});

// Types
interface FaqItem {
  question: string;
  answer: string;
  answerNodes: MarkdownNode[];
  section: string | null;
  sectionSlug: string | null;
  isNew: boolean;
  newDate?: string;
}

interface FuseResult {
  item: FaqItem;
  score?: number;
  matches?: Array<{
    indices: ReadonlyArray<[number, number]>;
    key?: string;
    value?: string;
  }>;
}

// Config values
const minSearchLength = searchConfig.display.minSearchLength;

// Refs
const searchQuery = ref("");
const searchInputRef = ref<HTMLInputElement | null>(null);
const faqItems = ref<FaqItem[]>([]);
const fuse = ref<Fuse<FaqItem> | null>(null);

// Load FAQ data
const { data: page } = await useAsyncData("faqs-search", () => {
  return queryCollection("faqs").first();
});

/**
 * Type guard for element nodes
 */
function isElementNode(node: MarkdownNode): node is [string, Record<string, unknown>, ...MarkdownNode[]] {
  return Array.isArray(node) && typeof node[0] === "string";
}

/**
 * Get tag name from element node
 */
function tagName(node: [string, Record<string, unknown>, ...MarkdownNode[]]): string {
  return node[0];
}

/**
 * Extract text from markdown node
 */
function extractText(node: MarkdownNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node) && node.length > 2) {
    return node.slice(2).map(extractText).join("");
  }
  return "";
}

/**
 * Parse FAQ data from page content
 */
function parseFaqData() {
  if (!page.value) return;

  const body = page.value.body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value)) return;

  const nodes = body.value;
  const items: FaqItem[] = [];
  let currentSection: string | null = null;
  let i = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    if (isElementNode(node)) {
      const tag = tagName(node);

      if (tag === "h2") {
        currentSection = extractText(node);
        i++;
        continue;
      }

      if (tag === "h3") {
        const questionText = extractText(node);
        const answerNodes: MarkdownNode[] = [];
        i++;

        // Collect answer nodes
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
          const taggedDate = extractTaggedDate(answerNodes);
          const filteredNodes = filterNewComments(answerNodes);
          const answerText = filteredNodes.map(extractText).join(" ").trim();

          items.push({
            question: questionText,
            answer: answerText,
            answerNodes: filteredNodes,
            section: currentSection,
            sectionSlug: currentSection ? slugify(currentSection) : null,
            isNew: taggedDate ? isWithinNewWindow(taggedDate) : false,
            newDate: taggedDate || undefined,
          });
        }
        continue;
      }
    }
    i++;
  }

  faqItems.value = items;

  // Initialize Fuse.js with settings from search.config.json
  fuse.value = new Fuse(items, {
    keys: searchConfig.keys,
    includeScore: searchConfig.includeScore,
    includeMatches: searchConfig.includeMatches,
    threshold: searchConfig.threshold,
    distance: searchConfig.distance,
    minMatchCharLength: searchConfig.minMatchCharLength,
    ignoreLocation: searchConfig.ignoreLocation,
    findAllMatches: searchConfig.findAllMatches,
    useExtendedSearch: searchConfig.useExtendedSearch,
    shouldSort: searchConfig.shouldSort,
  });
}

// Parse FAQ data on mount
onMounted(() => {
  parseFaqData();
});

// Also parse when page data changes
watch(page, () => {
  parseFaqData();
}, { immediate: true });

/**
 * Search results computed from Fuse.js
 */
const searchResults = computed<FuseResult[]>(() => {
  if (!fuse.value || !searchQuery.value || searchQuery.value.length < minSearchLength) {
    return [];
  }
  return fuse.value.search(searchQuery.value);
});

/**
 * Get relevance color based on score (uses search.config.json)
 */
function getRelevanceColor(score?: number): string {
  if (score === undefined) return "grey";
  const labels = searchConfig.relevanceLabels;
  if (score < labels.excellent.maxScore) return labels.excellent.color;
  if (score < labels.good.maxScore) return labels.good.color;
  if (score < labels.fair.maxScore) return labels.fair.color;
  return labels.partial.color;
}

/**
 * Get relevance label based on score (uses search.config.json)
 */
function getRelevanceLabel(score?: number): string {
  if (score === undefined) return "Match";
  const labels = searchConfig.relevanceLabels;
  if (score < labels.excellent.maxScore) return "Excellent";
  if (score < labels.good.maxScore) return "Good";
  if (score < labels.fair.maxScore) return "Fair";
  return "Partial";
}

/**
 * Highlight matched text in the result
 */
function highlightMatches(text: string, result: FuseResult): string {
  const questionMatches = result.matches?.filter(m => m.key === "question") || [];
  
  if (questionMatches.length === 0) {
    return escapeHtml(text);
  }

  // Collect all highlight ranges
  const ranges: Array<[number, number]> = [];
  for (const match of questionMatches) {
    for (const [start, end] of match.indices) {
      ranges.push([start, end + 1]);
    }
  }

  // Sort and merge overlapping ranges
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const [start, end] of ranges) {
    if (merged.length === 0 || merged[merged.length - 1][1] < start) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
    }
  }

  // Build highlighted string
  let result_text = "";
  let lastIndex = 0;
  for (const [start, end] of merged) {
    result_text += escapeHtml(text.slice(lastIndex, start));
    result_text += `<mark class="search-highlight">${escapeHtml(text.slice(start, end))}</mark>`;
    lastIndex = end;
  }
  result_text += escapeHtml(text.slice(lastIndex));

  return result_text;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Get answer preview with highlighted matches (uses search.config.json)
 */
function getAnswerPreview(result: FuseResult): string {
  const answerMatches = result.matches?.filter(m => m.key === "answer") || [];
  const answer = result.item.answer;
  const maxLength = searchConfig.display.answerPreviewLength;

  if (answerMatches.length === 0 || answerMatches[0].indices.length === 0) {
    // No matches in answer, return beginning
    const preview = answer.slice(0, maxLength);
    return escapeHtml(preview) + (answer.length > maxLength ? "..." : "");
  }

  // Find first match position and create context around it
  const firstMatch = answerMatches[0].indices[0];
  const matchStart = firstMatch[0];
  const matchEnd = firstMatch[1] + 1;

  // Calculate window around match (uses search.config.json)
  const contextBefore = searchConfig.display.contextBefore;
  const contextAfter = searchConfig.display.contextAfter;
  const start = Math.max(0, matchStart - contextBefore);
  const end = Math.min(answer.length, matchEnd + contextAfter);

  let preview = answer.slice(start, end);
  let prefix = start > 0 ? "..." : "";
  let suffix = end < answer.length ? "..." : "";

  // Highlight the match within the preview
  const highlightStart = matchStart - start;
  const highlightEnd = matchEnd - start;
  
  const beforeMatch = escapeHtml(preview.slice(0, highlightStart));
  const match = escapeHtml(preview.slice(highlightStart, highlightEnd));
  const afterMatch = escapeHtml(preview.slice(highlightEnd));

  return `${prefix}${beforeMatch}<mark class="search-highlight">${match}</mark>${afterMatch}${suffix}`;
}

/**
 * Generate FAQ ID for URL
 */
function getFaqId(item: FaqItem): string {
  if (item.sectionSlug) {
    const combined = `${item.sectionSlug}-${slugify(item.question)}`;
    return slugify(combined);
  }
  return slugify(item.question);
}

/**
 * Open FAQ in new window with search term highlighted
 */
function openFaqInNewWindow(result: FuseResult) {
  const item = result.item;
  const id = getFaqId(item);
  const query = encodeURIComponent(searchQuery.value);
  
  // Open in new tab with highlight query parameter (query before hash)
  const url = `/?highlight=${query}#${id}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Handle enter key to open first result
 */
function handleEnterKey() {
  if (searchResults.value.length > 0) {
    openFaqInNewWindow(searchResults.value[0]);
  }
}
</script>

<style scoped>
/* Plakat look: a heavy outlined search box, and results as bordered panels
   on --pk-card. */
.search-header {
  text-align: left;
}

.search-input-wrapper {
  position: sticky;
  top: 64px;
  background: var(--pk-body);
  padding: 1rem 0;
  z-index: 10;
}

.search-input {
  font-size: 1.1875rem;
}

.search-input :deep(.v-field__input) {
  font-size: 1.1875rem;
  color: var(--pk-heading);
}

/* A 2px white outline instead of Vuetify's hairline. */
.search-input :deep(.v-field__outline) {
  --v-field-border-width: 2px;
  --v-field-border-opacity: 1;
  color: var(--pk-heading);
}

.search-input :deep(.v-field-label) {
  color: var(--pk-text-2);
  opacity: 1;
}

.search-input-wrapper .text-caption {
  color: var(--pk-text-2) !important;
  font-size: 0.9375rem !important;
}

/* Results list */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-card {
  background: var(--pk-card);
  border: 1px solid var(--pk-border-alt);
  padding: 1.25rem 1.375rem;
  cursor: pointer;
}

.result-card:hover {
  border-color: var(--pk-heading);
  background: var(--pk-hover);
}

.result-card:focus {
  outline: 3px solid var(--pk-link);
  outline-offset: 2px;
}

.result-card.result-new {
  border-top: 4px solid var(--pk-brand-text);
}

.relevance-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.relevance-chip {
  font-size: 0.75rem !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* The lowest relevance level uses Vuetify's grey, which gives white text on
   #9e9e9e (2.7:1). Draw it on a dark surface instead: white on #333 is 12.6:1. */
.relevance-chip.bg-grey {
  background: var(--pk-border-input) !important;
  color: var(--pk-heading) !important;
}

.result-section :deep(.v-chip) {
  font-size: 0.75rem;
}

.result-number {
  font-weight: 600;
  color: var(--pk-text-2) !important;
  opacity: 1 !important;
}

.result-question {
  font-size: 1.375rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--pk-heading);
  margin-bottom: 0.625rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.new-badge {
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  line-height: 1.25rem;
  padding: 1px 8px;
  background-color: var(--pk-accent-wash);
  color: var(--pk-accent);
  flex-shrink: 0;
  white-space: normal;
  overflow-wrap: break-word;
  max-width: 100%;
}

/* Fix text clipping when zoomed to 200% - WCAG 1.4.4 Resize Text */
.relevance-chip :deep(.v-chip__content),
.result-section :deep(.v-chip__content) {
  overflow: visible !important;
  white-space: normal !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  max-width: 100% !important;
  padding: 4px 8px !important;
  line-height: 1.2 !important;
}

.result-section {
  margin-bottom: 0.75rem;
}

.result-preview {
  font-size: 1.0625rem;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.55 !important;
  color: var(--pk-text);
  margin-bottom: 0.75rem;
}

/* Ensure all paragraphs in search result previews meet AAA line-height */
.result-preview :deep(p) {
  line-height: 1.55 !important;
}

.open-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

/* Search highlights: dark ink on yellow (15:1). */
:deep(.search-highlight) {
  background: var(--pk-mark);
  color: var(--pk-mark-ink);
  padding: 0.05em 0.2em;
  font-weight: 700;
}

/* Empty/no results states */
.empty-state,
.no-results {
  text-align: left;
  padding: 2rem 0 1rem;
  border-top: 2px solid var(--pk-border-alt);
}

.empty-state .v-icon,
.no-results .v-icon {
  display: none;
}

.empty-state h2,
.no-results h2 {
  font-size: 1.5rem !important;
  font-weight: 800 !important;
  letter-spacing: -0.03em !important;
  line-height: 1.15 !important;
  color: var(--pk-heading) !important;
  opacity: 1 !important;
}

.empty-state p,
.no-results p,
.search-tips li {
  font-size: 1.0625rem !important;
  color: var(--pk-text) !important;
  opacity: 1 !important;
}

.search-tips {
  background: var(--pk-card);
  border: 1px solid var(--pk-border-alt);
  padding: 1rem 1.25rem;
  text-align: left;
  display: block;
}

.search-tips ul {
  margin: 0;
  padding-left: 1.25rem;
}

.search-tips li {
  margin: 0.25rem 0;
  line-height: 1.5;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-move {
  transition: transform 0.3s ease;
}

@media (max-width: 600px) {
  .result-card {
    padding: 1rem;
  }

  .result-question {
    font-size: 1.1875rem;
  }
}
</style>
