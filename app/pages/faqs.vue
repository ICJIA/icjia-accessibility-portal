<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8" elevation="0">
          <h1 class="text-h3 mb-4 d-flex align-center">
            <v-icon class="mr-3" color="primary">mdi-frequently-asked-questions</v-icon>
            {{ page?.title || 'Frequently Asked Questions' }}
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-6">
            {{ page?.description || 'Find answers to common questions about web accessibility, WCAG guidelines, and compliance requirements.' }}
          </p>

          <div v-if="page" class="faq-content">
            <ContentRenderer :value="page" />
          </div>
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading FAQs...</p>
          </div>

          <v-divider class="my-8" />

          <v-card class="pa-6 text-center" variant="tonal">
            <h2 class="text-h5 mb-4">Still have questions?</h2>
            <p class="text-body-1 mb-4">
              If you couldn't find the answer you're looking for, please visit the
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
const { data: page } = await useAsyncData('faqs', () => {
  return queryCollection('faqs').first()
})

useSeoMeta({
  title: page.value?.title ? `${page.value.title} - ICJIA Accessibility Portal` : 'FAQs - ICJIA Accessibility Portal',
  description: page.value?.description || 'Frequently asked questions about accessibility',
})
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
  padding: 0;
  background: none;
  border-left: none;
}

/* Horizontal rules as section dividers */
.faq-content :deep(hr) {
  border: none;
  border-top: 2px solid rgba(var(--v-theme-primary), 0.2);
  margin: 3rem 0;
}

/* h2 = Section headings */
.faq-content :deep(h2) {
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.15) 0%,
    rgba(var(--v-theme-primary), 0.05) 100%
  );
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
}

.faq-content :deep(h2 a) {
  color: inherit;
  text-decoration: none;
}

/* h3 = Questions */
.faq-content :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding: 0;
}

.faq-content :deep(h3 a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 3px;
}

.faq-content :deep(h3 a:hover) {
  text-decoration-thickness: 2px;
}

/* p = Answers */
.faq-content :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.9;
  margin-bottom: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 8px;
  border-left: 3px solid rgba(var(--v-theme-on-surface), 0.15);
}

/* ul/li = Bullet points - properly indented */
.faq-content :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0 0 1.5rem 0;
}

.faq-content :deep(ul li) {
  position: relative;
  padding: 0.6rem 1rem 0.6rem 1.75rem;
  margin-left: 1.25rem;
  margin-bottom: 0.35rem;
  background: rgba(var(--v-theme-surface-variant), 0.2);
  border-radius: 6px;
  border-left: 3px solid rgba(var(--v-theme-primary), 0.4);
  line-height: 1.6;
}

.faq-content :deep(ul li::before) {
  content: "•";
  position: absolute;
  left: 0.5rem;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

.faq-content :deep(ul li strong) {
  color: rgb(var(--v-theme-on-surface));
}

/* Ordered lists */
.faq-content :deep(ol) {
  padding-left: 0;
  margin: 0 0 1.5rem 0;
  counter-reset: item;
  list-style: none;
}

.faq-content :deep(ol li) {
  position: relative;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  margin-left: 1.25rem;
  margin-bottom: 0.35rem;
  background: rgba(var(--v-theme-surface-variant), 0.2);
  border-radius: 6px;
  border-left: 3px solid rgba(var(--v-theme-primary), 0.4);
  line-height: 1.6;
  counter-increment: item;
}

.faq-content :deep(ol li::before) {
  content: counter(item) ".";
  position: absolute;
  left: 0.75rem;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
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
</style>
