<template>
  <v-container>
    <div class="pk-page">
      <div class="pk-page-inner">
        <!-- Countdown Timer - ClientOnly to avoid hydration mismatch (timer differs server vs client) -->
        <ClientOnly>
          <CountdownTimer compact />
          <template #fallback>
            <div class="countdown-fallback">
              <p class="pk-label">Countdown to WCAG 2.1 AA Compliance</p>
              <v-progress-circular indeterminate color="white" size="32" width="3" aria-label="Loading countdown" />
            </div>
          </template>
        </ClientOnly>

        <div class="links-page">
          <div class="pk-page-head">
            <p class="pk-label">Resources</p>
            <h1 class="pk-page-title">
              {{ page?.title || "Accessibility Links" }}
            </h1>
            <p class="pk-page-intro">
              {{
                page?.description ||
                "A collection of helpful accessibility resources and links."
              }}
            </p>
          </div>

          <div v-if="renderedPage" class="links-content">
            <ContentRenderer :value="renderedPage" />
          </div>
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading links...</p>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Links page component
 * @description Displays accessibility resources and links from markdown content
 */

import { computed } from "vue";
import { wrapFaqQuestionsIntoCards } from "../utils/faqTransform";
import { useSeo } from "../composables/useSeo";
import { useBreadcrumbStructuredData } from "../composables/useStructuredData";

/** @type {import('nuxt/app').AsyncData<import('@nuxt/content').ParsedContent>} Links page content */
const { data: page } = await useAsyncData("links", () => {
  return queryCollection("links").first();
});

/**
 * Rendered page content with transformed markdown
 * @type {import('vue').ComputedRef<import('@nuxt/content').ParsedContent | null>}
 */
const renderedPage = computed(() => {
  if (!page.value) return null;
  const body = page.value.body;

  // If body exists and is minimark format with content, transform it
  if (
    body &&
    body.type === "minimark" &&
    Array.isArray(body.value) &&
    body.value.length > 0
  ) {
    return {
      ...page.value,
      body: {
        ...body,
        value: wrapFaqQuestionsIntoCards(body.value),
      },
    };
  }

  // Return page as-is (handles empty body or non-minimark format)
  return page.value;
});

// Enhanced SEO with Open Graph, Twitter Cards, and structured data
const pageTitle = page.value?.title || "Accessibility Links";
const pageDescription = page.value?.description || 
  "Curated accessibility resources, tools, and guidelines for WCAG 2.1 AA. Find checkers, training, and best practices for Illinois state agencies.";

useSeo({
  title: "Links - Resources",
  description: pageDescription,
  url: "/links",
  keywords: [
    "accessibility resources",
    "accessibility tools",
    "WCAG resources",
    "accessibility links",
    "accessibility checkers",
    "accessibility training",
    "digital accessibility resources",
    "accessibility guidelines",
    "accessibility documentation",
    "accessibility best practices"
  ],
});

// Add breadcrumb structured data
useBreadcrumbStructuredData([
  { name: "Home", url: "/" },
  { name: "Resources & Links", url: "/links" },
]);
</script>

<style scoped>
/* Plakat look: a ruled reference list. Section names sit under a heavy rule,
   link groups under a lighter one. */
.links-content {
  font-size: 1.0625rem;
}

.links-content :deep(h1) {
  display: none;
}

.links-content :deep(> p:first-of-type) {
  font-size: 1.1875rem;
  color: var(--pk-text);
  margin-bottom: 1.5rem;
}

/* The heavy rule above each section does the dividing. */
.links-content :deep(hr) {
  display: none;
}

.links-content :deep(h2) {
  margin: 3.5rem 0 1.25rem;
  padding: 0.875rem 0 0;
  border-top: 4px solid var(--pk-heading);
  font-size: 1.875rem;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--pk-heading);
  scroll-margin-top: 80px;
}

.links-content :deep(h2 a),
.links-content :deep(h3 a) {
  color: inherit;
  text-decoration: none;
  pointer-events: none;
  cursor: default;
}

.links-content :deep(h3) {
  margin: 2rem 0 0.5rem;
  padding: 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pk-text-2);
}

.links-content :deep(p) {
  font-size: 1.0625rem;
  line-height: 1.6 !important;
  color: var(--pk-text);
  margin: 0 0 1rem 0;
}

.links-content :deep(ul),
.links-content :deep(ol) {
  list-style: none;
  padding-left: 0;
  margin: 0 0 1.5rem 0;
  border-bottom: 2px solid var(--pk-border-alt);
}

.links-content :deep(li) {
  display: block;
  margin: 0;
  padding: 0.75rem 0;
  border-top: 2px solid var(--pk-border-alt);
  color: var(--pk-text-2);
  line-height: 1.5;
  font-size: 1.0625rem;
}

.links-content :deep(a) {
  color: var(--pk-link);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.links-content :deep(li a) {
  font-weight: 700;
  display: inline;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44px tap target height */
  min-height: 44px !important;
  padding: 8px 2px 8px 0;
  box-sizing: border-box;
  line-height: 1.5;
}

.links-content :deep(a:hover) {
  color: var(--pk-link-hover);
  text-decoration-thickness: 2px;
}

.links-content :deep(strong) {
  color: var(--pk-heading);
  font-weight: 700;
}

.links-content :deep(li strong) {
  color: inherit;
}

.links-content :deep(.qa-card) {
  margin-bottom: 2rem;
}

.links-content :deep(.qa-card > h3) {
  margin-top: 0;
}

.links-content :deep(.qa-card > *:last-child) {
  margin-bottom: 0;
}

.links-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem 0;
  font-size: 1rem;
  border-top: 4px solid var(--pk-heading);
}

.links-content :deep(th) {
  color: var(--pk-heading);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.75rem 1rem 0.75rem 0;
  text-align: left;
  border-bottom: 2px solid var(--pk-heading);
}

.links-content :deep(td) {
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 1px solid var(--pk-border-alt);
  color: var(--pk-text);
}

@media (max-width: 600px) {
  .links-content :deep(h2) {
    font-size: 1.5rem;
    margin-top: 2.75rem;
  }
}
</style>
