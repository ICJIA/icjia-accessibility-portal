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

        <!-- Shared FAQ experience (disclaimer, sort, review panel, sections) — also used on the homepage -->
        <FaqBrowser title-tag="h1" inject-faq-schema />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview FAQs page component
 * @description Renders the shared FaqBrowser component (the complete FAQ experience,
 * kept in parity with the homepage) plus page-level SEO and structured data.
 */

import { useSeo } from "../composables/useSeo";
import { useBreadcrumbStructuredData } from "../composables/useStructuredData";

/** @type {import('nuxt/app').AsyncData<import('@nuxt/content').ParsedContent>} FAQ page content (for SEO fields; deduped with FaqBrowser's query by key) */
const { data: page } = await useAsyncData("faqs", () => {
  return queryCollection("faqs").first();
});

// Enhanced SEO with Open Graph, Twitter Cards, and structured data
const pageDescription =
  page.value?.description ||
  "FAQs about WCAG 2.1 AA compliance, digital accessibility, and ADA Title II. Find answers for Illinois state agencies.";

useSeo({
  title: "FAQs - Accessibility",
  description: pageDescription,
  url: "/faqs",
  type: "article",
  keywords: [
    "accessibility FAQ",
    "WCAG 2.1 AA FAQ",
    "digital accessibility questions",
    "ADA compliance FAQ",
    "web accessibility FAQ",
    "accessibility compliance",
    "accessibility guidelines",
    "Section 508 FAQ",
    "IITAA FAQ",
    "accessibility best practices",
  ],
});

// Add breadcrumb structured data
useBreadcrumbStructuredData([
  { name: "Home", url: "/" },
  { name: "FAQs", url: "/faqs" },
]);
</script>
