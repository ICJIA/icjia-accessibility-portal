<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="faq-page">
          <!-- Page Header -->
          <div class="faq-header mb-8">
            <h1 class="text-h3 faq-title">
              <v-icon class="mr-3" size="40">mdi-frequently-asked-questions</v-icon>
              Frequently Asked Questions
            </h1>
            <p class="text-body-1 mt-4 faq-description">
              Find answers to common questions about web accessibility, WCAG guidelines, and compliance requirements.
            </p>
          </div>

          <!-- FAQ Content -->
          <div v-if="page" class="faq-content">
            <ContentRenderer :value="page" />
          </div>
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading FAQs...</p>
          </div>

          <!-- Help Section -->
          <v-card class="mt-8 pa-6" variant="tonal" color="primary">
            <div class="d-flex align-center">
              <v-icon size="48" class="mr-4">mdi-help-circle-outline</v-icon>
              <div>
                <h3 class="text-h6 mb-2">Still have questions?</h3>
                <p class="text-body-2 mb-0">
                  If you couldn't find the answer you're looking for, please visit the 
                  <a href="https://icjia.illinois.gov/contact" target="_blank" rel="noopener noreferrer" class="text-primary">
                    ICJIA Contact page
                  </a>
                  for additional support.
                </p>
              </div>
            </div>
          </v-card>
        </div>
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
.faq-page {
  padding: 1rem 0;
}

.faq-header {
  text-align: center;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
}

.faq-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary));
}

.faq-description {
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.85;
}

/* FAQ Content Styles - targeting rendered markdown */
.faq-content :deep(h1) {
  display: none; /* Hide the duplicate h1 from markdown */
}

.faq-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2rem;
  margin-bottom: 0.75rem;
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

/* Help section link styling */
.faq-page a {
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.faq-page a:hover {
  text-decoration-thickness: 2px;
}
</style>
