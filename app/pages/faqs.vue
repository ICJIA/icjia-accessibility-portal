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
.faq-content :deep(h1) {
  display: none; /* Hide the duplicate h1 from markdown */
}

.faq-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 3.5rem;
  margin-bottom: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.15) 0%,
    rgba(var(--v-theme-primary), 0.05) 100%
  );
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  transition: all 0.2s ease;
}

.faq-content :deep(h2):hover {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.2) 0%,
    rgba(var(--v-theme-primary), 0.1) 100%
  );
}

.faq-content :deep(h2 a) {
  color: inherit;
  text-decoration: none;
}

.faq-content :deep(h2 a:hover) {
  color: rgb(var(--v-theme-primary));
}

.faq-content :deep(p) {
  font-size: 1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.9;
  margin-left: 0;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 8px;
  border-left: 3px solid rgba(var(--v-theme-on-surface), 0.2);
  transition: all 0.2s ease;
}

.faq-content :deep(p):hover {
  background: rgba(var(--v-theme-surface-variant), 0.5);
}

/* First h2 has smaller top margin */
.faq-content :deep(h2:first-of-type) {
  margin-top: 1rem;
}
</style>
