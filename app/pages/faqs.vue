<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8" elevation="0" color="surface">
          <h1 class="text-h3 mb-4 d-flex align-center flex-wrap">
            <v-icon class="mr-3" color="primary"
              >mdi-frequently-asked-questions</v-icon
            >
            <span>{{ page?.title || "Frequently Asked Questions" }}</span>
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-6">
            {{
              page?.description ||
              "Find answers to common questions about web accessibility, WCAG guidelines, and compliance requirements."
            }}
          </p>

          <div v-if="faqSections.length > 0 || introContent">
            <!-- Render intro content -->
            <div v-if="introContent" class="faq-intro">
              <ContentRenderer :value="introContent" />
            </div>
            <!-- Render FAQ accordion with sections -->
            <div
              v-for="(section, sectionIndex) in faqSections"
              :key="sectionIndex"
              class="faq-section-group"
            >
              <h2 v-if="section.heading" class="faq-section-heading">
                {{ section.heading }}
              </h2>
              <FaqAccordion
                :items="section.items"
                :section-id="slugify(section.heading || '')"
              />
            </div>
          </div>
          <div v-else-if="page" class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading FAQs...</p>
          </div>

          <v-divider class="my-8" />

          <v-card class="pa-6 text-center" variant="tonal" color="surface">
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
import { transformFaqsToAccordionData } from "../utils/faqTransform";

const { data: page } = await useAsyncData("faqs", () => {
  return queryCollection("faqs").first();
});

type MiniMarkNode = any;

function isElementNode(node: MiniMarkNode): node is any[] {
  return Array.isArray(node) && typeof node[0] === "string";
}

function tagName(node: any[]): string {
  return node[0];
}

// Extract text from a node
function extractText(node: any): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node) && node.length > 2) {
    return node.slice(2).map(extractText).join("");
  }
  return "";
}

// Generate a URL-friendly slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 30)
    .replace(/-$/, "");
}

// Process markdown to create sections with headings
const faqSections = computed(() => {
  if (!page.value) return [];
  const body = page.value.body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return [];

  const nodes = body.value;
  const sections: Array<{
    heading: string | null;
    items: Array<{ question: string; answer: MiniMarkNode[] }>;
  }> = [];
  let currentSection: {
    heading: string | null;
    items: Array<{ question: string; answer: MiniMarkNode[] }>;
  } | null = null;
  let i = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    if (isElementNode(node)) {
      const tag = tagName(node);

      if (tag === "h2") {
        // Start new section
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          heading: extractText(node),
          items: [],
        };
        i++;
        continue;
      } else if (tag === "h3") {
        // Extract FAQ item
        if (!currentSection) {
          currentSection = { heading: null, items: [] };
        }
        const questionText = extractText(node);
        const answerNodes: MiniMarkNode[] = [];
        i++;

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
          currentSection.items.push({
            question: questionText,
            answer: answerNodes,
          });
        }
        continue;
      }
    }

    i++;
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
});

// Extract intro content (content before first H2)
const introContent = computed(() => {
  if (!page.value) return null;
  const body = page.value.body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return null;

  const nodes = body.value;
  const introNodes: MiniMarkNode[] = [];

  for (const node of nodes) {
    if (
      isElementNode(node) &&
      (tagName(node) === "h2" || tagName(node) === "h1")
    ) {
      break;
    }
    introNodes.push(node);
  }

  if (introNodes.length === 0) return null;

  return {
    ...page.value,
    body: {
      ...body,
      value: introNodes,
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
/* Intro content styling */
.faq-intro {
  margin-bottom: 2rem;
}

.faq-intro :deep(h1) {
  display: none;
}

.faq-intro :deep(p) {
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.85;
  margin-bottom: 1.5rem;
  line-height: 1.75;
}

.faq-intro :deep(hr) {
  border: none;
  border-top: 2px solid rgba(var(--v-theme-primary), 0.2);
  margin: 3rem 0;
}

/* Section headings */
.faq-section-group {
  margin-bottom: 3rem;
}

.faq-section-heading {
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background: rgb(var(--v-theme-surface-variant));
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
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

  .faq-section-heading {
    font-size: 1.2rem;
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 400px) {
  h1.text-h3 {
    font-size: 1.25rem !important;
  }

  .faq-section-heading {
    font-size: 1.1rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
