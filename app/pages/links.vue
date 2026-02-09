<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Timer - ClientOnly to avoid hydration mismatch (timer differs server vs client) -->
        <ClientOnly>
          <CountdownTimer compact />
          <template #fallback>
            <v-card class="countdown-card mb-4" elevation="2" color="surface">
              <div class="text-center pa-4">
                <p class="text-body-2 mb-2">Countdown to WCAG 2.1 AA Compliance</p>
                <v-progress-circular indeterminate color="primary" size="32" width="3" aria-label="Loading countdown" />
              </div>
            </v-card>
          </template>
        </ClientOnly>

        <v-card class="pa-8" elevation="0">
          <h1 class="text-h3 mb-4 d-flex align-center">
            <v-icon class="mr-3" color="primary" aria-hidden="true"
              >mdi-link-variant</v-icon
            >
            {{ page?.title || "Accessibility Links" }}
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-6">
            {{
              page?.description ||
              "A collection of useful accessibility resources and links."
            }}
          </p>

          <div v-if="renderedPage" class="links-content">
            <ContentRenderer :value="renderedPage" />
          </div>
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading links...</p>
          </div>

          <v-divider class="my-8" />
        </v-card>
      </v-col>
    </v-row>
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
/* Links Content Styles - same as FAQ for consistency */

/* Hide duplicate h1 from markdown */
.links-content :deep(h1) {
  display: none;
}

/* Intro paragraph (first p before any h2) */
.links-content :deep(> p:first-of-type) {
  font-size: 1.1rem;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text - use full opacity */
  color: rgb(var(--v-theme-on-surface));
  opacity: 1;
  margin-bottom: 1.5rem;
}

/* Horizontal rules as section dividers */
.links-content :deep(hr) {
  border: none;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 3:1 for UI components */
  border-top: 2px solid rgba(var(--v-theme-on-surface), 0.3);
  margin: 3rem 0;
}

/* ## = H2 section headings */
.links-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  padding: 0;
  background: none;
  border: none;
}

.links-content :deep(h2:first-of-type) {
  margin-top: 0;
}

.links-content :deep(h2 a),
.links-content :deep(h3 a) {
  color: inherit;
  text-decoration: none;
  pointer-events: none;
  cursor: default;
}

/* ### = H3 question heading */
.links-content :deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding: 0;
  background: none;
  border: none;
}

/* Default paragraph styling (non-answer prose) */
.links-content :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text - use full opacity */
  color: rgb(var(--v-theme-on-surface));
  opacity: 1;
  margin: 0 0 1rem 0;
  padding: 0;
  background: none;
  border: none;
}

/* Content following H3 */
.links-content :deep(h3 + p),
.links-content :deep(h3 + ul),
.links-content :deep(h3 + ol) {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Q/A Card wrapper - ensures everything stays together */
.links-content :deep(.qa-card) {
  margin-bottom: 2rem;
}

.links-content :deep(.qa-card > h3) {
  margin-top: 0;
}

.links-content :deep(.qa-card > h3:first-child) {
  border-radius: 8px 8px 0 0;
}

.links-content :deep(.qa-card > *:last-child) {
  margin-bottom: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Lists: clean and modern */
.links-content :deep(ul),
.links-content :deep(ol) {
  list-style: none;
  padding-left: 0;
  margin: 0 0 1.5rem 0;
}

/* List items - clean styling */
.links-content :deep(li) {
  display: block;
  margin: 0.5rem 0;
  padding: 0;
  background: none;
  border: none;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.6;
  font-size: 1rem;
}

/* Links in list items */
.links-content :deep(li a) {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  /* Use black for maximum contrast on light backgrounds (21:1) */
  color: #000000; /* Black for 21:1 contrast on white background - exceeds AAA requirement */
  text-decoration: none;
  font-weight: 500;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px clickable area */
  display: inline-block;
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 12px 12px;
  box-sizing: border-box;
  line-height: 1.5;
  vertical-align: baseline;
  margin: -4px 0;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .links-content :deep(li a),
.v-theme--dark .links-content :deep(li a) {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text on dark background */
  color: #BFDBFE !important; /* Lighter blue (#BFDBFE) for 7:1+ contrast on dark background */
}

.links-content :deep(li a:hover) {
  text-decoration: underline;
  text-underline-offset: 2px;
  /* Maintain 44x44px on hover */
  min-height: 44px !important;
  min-width: 44px !important;
}

[data-v-theme="dark"] .links-content :deep(li a:hover),
.v-theme--dark .links-content :deep(li a:hover) {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain 7:1 contrast on hover */
  color: #BFDBFE !important;
}

/* Bold text (link titles) */
.links-content :deep(li strong) {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  color: #000000; /* Black for 21:1 contrast on white background - exceeds AAA requirement */
  font-weight: 600;
}

/* Dark theme: use lighter color for strong text */
[data-v-theme="dark"] .links-content :deep(li strong),
.v-theme--dark .links-content :deep(li strong) {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text on dark background */
  color: #BFDBFE !important; /* Lighter blue for 7:1+ contrast on dark background */
}

/* Q/A card styling - simplified */
.links-content :deep(.qa-card) {
  margin-bottom: 2rem;
}

.links-content :deep(.qa-card ul),
.links-content :deep(.qa-card ol) {
  margin-top: 0.5rem;
  margin-bottom: 0;
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

  .links-content :deep(h2) {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .links-content :deep(h3) {
    font-size: 1.1rem;
    margin-top: 1.5rem;
  }
}

@media (max-width: 400px) {
  h1.text-h3 {
    font-size: 1.25rem !important;
  }

  .links-content :deep(h2) {
    font-size: 1.1rem;
  }

  .links-content :deep(h3) {
    font-size: 1rem;
  }
}

/* Tables */
.links-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem 0;
  font-size: 0.9rem;
  border-radius: 8px;
  overflow: hidden;
}

.links-content :deep(th) {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Ensure text meets 7:1 on background */
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 3:1 for UI components */
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.3);
}

.links-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-surface-variant), 0.15);
}

.links-content :deep(tr:last-child td) {
  border-bottom: none;
}

.links-content :deep(tr:hover td) {
  background: rgba(var(--v-theme-surface-variant), 0.3);
}
</style>
