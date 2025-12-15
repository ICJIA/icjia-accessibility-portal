<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8" elevation="0">
          <h1 class="text-h3 mb-4 d-flex align-center">
            <v-icon class="mr-3" color="primary"
              >mdi-frequently-asked-questions</v-icon
            >
            {{ page?.title || "Frequently Asked Questions" }}
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-6">
            {{
              page?.description ||
              "Find answers to common questions about web accessibility, WCAG guidelines, and compliance requirements."
            }}
          </p>

          <div v-if="renderedPage" class="faq-content">
            <ContentRenderer :value="renderedPage" />
          </div>
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading FAQs...</p>
          </div>

          <v-divider class="my-8" />

          <v-card class="pa-6 text-center" variant="tonal">
            <h2 class="text-h5 mb-4">Still have questions?</h2>
            <p class="text-body-1 mb-4">
              If you couldn't find the answer you're looking for, please visit
              the
              <NuxtLink
                href="https://icjia.illinois.gov/contact"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none font-weight-medium"
              >
                ICJIA Contact page
              </NuxtLink>
              for additional support.
            </p>
            <v-btn
              href="https://icjia.illinois.gov/contact"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="flat"
              prepend-icon="mdi-email-outline"
            >
              Contact Us
            </v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { wrapFaqQuestionsIntoCards } from "../utils/faqTransform";

const { data: page } = await useAsyncData("faqs", () => {
  return queryCollection("faqs").first();
});

const renderedPage = computed(() => {
  if (!page.value) return null;
  const body = page.value.body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return page.value;

  return {
    ...page.value,
    body: {
      ...body,
      value: wrapFaqQuestionsIntoCards(body.value),
    },
  };
});

useSeoMeta({
  title: page.value?.title
    ? `${page.value.title} - ICJIA Accessibility Portal`
    : "FAQs - ICJIA Accessibility Portal",
  description:
    page.value?.description || "Frequently asked questions about accessibility",
});
</script>

<style scoped>
/* FAQ Content Styles - targeting rendered markdown */

/* Hide duplicate h1 from markdown */
.faq-content :deep(h1) {
  display: none;
}

/* Intro paragraph (first p before any h2) */
.faq-content :deep(> p:first-of-type) {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.85;
  margin-bottom: 1.5rem;
}

/* Horizontal rules as section dividers */
.faq-content :deep(hr) {
  border: none;
  border-top: 2px solid rgba(var(--v-theme-primary), 0.2);
  margin: 3rem 0;
}

/* ## = H2 section headings (NOT linkified) */
.faq-content :deep(h2) {
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(186, 104, 200, 0.15) 0%,
    rgba(186, 104, 200, 0.05) 100%
  );
  border-left: 4px solid #ba68c8;
  border-radius: 0 8px 8px 0;
}

/* Safety: if any heading anchors still render, don't make them look/behave like links */
.faq-content :deep(h2 a),
.faq-content :deep(h3 a) {
  color: inherit;
  text-decoration: none;
  pointer-events: none;
  cursor: default;
}

/* ### = H3 question heading (paired with the answer block below) */
.faq-content :deep(h3) {
  font-size: 1.05rem;
  font-weight: 650;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 1.75rem;
  margin-bottom: 0;
  padding: 0.9rem 1.1rem;
  background: rgba(var(--v-theme-surface-variant), 0.28);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 8px 8px 0 0;
}

/* Default paragraph styling (non-answer prose) */
.faq-content :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.9;
  margin: 0 0 1rem 0;
  padding: 0;
  background: none;
  border: none;
}

/* Answer block: the content immediately following an H3 */
.faq-content :deep(h3 + p),
.faq-content :deep(h3 + ul),
.faq-content :deep(h3 + ol),
.faq-content :deep(h3 + table),
.faq-content :deep(h3 + blockquote),
/* Also support: question -> intro paragraph -> list/table/etc */
.faq-content :deep(h3 + p + ul),
.faq-content :deep(h3 + p + ol),
.faq-content :deep(h3 + p + table),
.faq-content :deep(h3 + p + blockquote) {
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  background: rgba(var(--v-theme-surface-variant), 0.22);
  border-left: 4px solid rgba(var(--v-theme-primary), 0.35);
  border-radius: 0 0 8px 8px;
}

/* If the answer starts with a paragraph and continues with a list/table, flatten the join */
.faq-content :deep(h3 + p) {
  margin-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-bottom: 0.75rem;
}

.faq-content :deep(h3 + p + ul),
.faq-content :deep(h3 + p + ol),
.faq-content :deep(h3 + p + table),
.faq-content :deep(h3 + p + blockquote) {
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* Lists: keep normal bullets and indent slightly so they align with answer text */
.faq-content :deep(ul),
.faq-content :deep(ol) {
  padding-left: 1.25rem;
}

.faq-content :deep(ul),
.faq-content :deep(ol) {
  margin: 0 0 1rem 0;
}

.faq-content :deep(li) {
  margin: 0.35rem 0;
}

/* When list is an answer block, add a bit more left padding for bullets */
.faq-content :deep(h3 + ul),
.faq-content :deep(h3 + ol),
.faq-content :deep(h3 + p + ul),
.faq-content :deep(h3 + p + ol) {
  /* keep bullets inside the answer card with a slight inset */
  padding-left: 2.25rem;
}

/* Tables */
.faq-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem 0;
  font-size: 0.9rem;
  border-radius: 8px;
  overflow: hidden;
}

.faq-content :deep(th) {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
}

.faq-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-surface-variant), 0.15);
}

.faq-content :deep(tr:last-child td) {
  border-bottom: none;
}

.faq-content :deep(tr:hover td) {
  background: rgba(var(--v-theme-surface-variant), 0.3);
}

/* Links within content */
.faq-content :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Ensure sufficient contrast for links - use brighter color in dark mode for WCAG AA compliance */
/* Primary color #90CAF9 may not have enough contrast on some dark backgrounds */
.v-theme--dark .faq-content :deep(a) {
  /* Use a brighter color that meets WCAG AA contrast (4.5:1) on dark backgrounds */
  color: #bbdefb;
}

.faq-content :deep(a:hover) {
  text-decoration-thickness: 2px;
}

/* Blockquotes */
.faq-content :deep(blockquote) {
  margin: 1rem 0 1.5rem 0;
  padding: 1rem 1.25rem;
  background: rgba(var(--v-theme-primary), 0.08);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.faq-content :deep(blockquote p) {
  background: none;
  padding: 0;
  margin: 0;
  border-left: none;
}

/* Code blocks */
.faq-content :deep(code) {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

/* Bold text emphasis */
.faq-content :deep(strong) {
  font-weight: 600;
}

/* --- Q/A cards (AST-wrapped) --- */
.faq-content :deep(.qa-card) {
  margin: 1.25rem 0 2rem;
  background: rgba(var(--v-theme-surface-variant), 0.18);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-left: 4px solid rgba(var(--v-theme-primary), 0.7);
  border-radius: 10px;
  overflow: hidden;
}

.faq-content :deep(.qa-card > h3) {
  margin: 0 !important;
  padding: 1rem 1.25rem !important;
  background: rgba(var(--v-theme-surface-variant), 0.28) !important;
  border-left: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

/* Everything under the question stays inside the same card */
.faq-content :deep(.qa-card > p),
.faq-content :deep(.qa-card > ul),
.faq-content :deep(.qa-card > ol),
.faq-content :deep(.qa-card > table),
.faq-content :deep(.qa-card > blockquote) {
  margin: 0 !important;
  padding: 1rem 1.25rem !important;
  background: transparent !important;
  border-left: none !important;
  border-radius: 0 !important;
}

/* If the answer spans multiple nodes, avoid double top padding */
.faq-content :deep(.qa-card > :not(h3) + :not(h3)) {
  padding-top: 0 !important;
}

/* Lists inside card: bullets aligned & slightly indented */
.faq-content :deep(.qa-card ul),
.faq-content :deep(.qa-card ol) {
  padding-left: 2.25rem !important;
}

.faq-content :deep(.qa-card li) {
  margin: 0.4rem 0 !important;
}
</style>
