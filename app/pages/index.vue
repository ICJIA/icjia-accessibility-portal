<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Clock Section -->
        <v-card class="pa-8 mb-8 countdown-card" elevation="4" color="surface">
          <div class="text-center">
            <h1 class="text-h3 mb-4">ICJIA Accessibility Portal</h1>
            <p class="text-h6 mb-6 text-medium-emphasis">
              Countdown to WCAG 2.1 AA Compliance
            </p>
            <ClientOnly>
              <div class="countdown-display">
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedDays }}</div>
                  <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-separator" aria-hidden="true">:</div>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedHours }}</div>
                  <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-separator" aria-hidden="true">:</div>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedMinutes }}</div>
                  <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-separator" aria-hidden="true">:</div>
                <div class="countdown-item">
                  <div class="countdown-value">{{ formattedSeconds }}</div>
                  <div class="countdown-label">Seconds</div>
                </div>
              </div>
              <template #fallback>
                <div class="countdown-display">
                  <div class="countdown-loader">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="48"
                      width="4"
                      aria-label="Loading countdown timer"
                    />
                  </div>
                </div>
              </template>
            </ClientOnly>
            <p class="text-body-2 mt-4">
              <NuxtLink
                href="https://www.ada.gov/resources/2024-03-08-web-rule/"
                target="_blank"
                rel="noopener noreferrer"
                class="compliance-link"
              >
                <v-icon size="16" class="mr-1" aria-hidden="true"
                  >mdi-open-in-new</v-icon
                >
                ADA Title II Web Accessibility Compliance Deadline: April 24,
                2026
              </NuxtLink>
            </p>
            <p class="text-caption mt-3 text-medium-emphasis site-dates">
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true"
                  >mdi-creation</v-icon
                >
                Created: {{ siteCreated }}
              </span>
              <span class="date-separator" aria-hidden="true">•</span>
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true"
                  >mdi-update</v-icon
                >
                Updated: {{ lastUpdated }}
              </span>
            </p>
          </div>
        </v-card>

        <!-- FAQs Section -->
        <div class="faq-section">
          <h2 class="text-h4 mb-6 faq-main-title">
            <v-icon class="mr-2" size="32"
              >mdi-frequently-asked-questions</v-icon
            >
            Frequently Asked Questions
          </h2>
          <div v-if="faqItems.length > 0">
            <!-- Render intro and section headings -->
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
          <div v-else>
            <p class="text-body-1">FAQs content loading...</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { transformFaqsToAccordionData } from "../utils/faqTransform";

const targetDate = new Date("2026-04-24T00:00:00").getTime();

// Site dates - update lastUpdated when content is added or edited
const siteCreated = "December 2025";
const lastUpdated = "December 16, 2025";

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

// Format countdown values with zero-padding
const formattedDays = computed(() =>
  String(countdown.value.days).padStart(2, "0")
);
const formattedHours = computed(() =>
  String(countdown.value.hours).padStart(2, "0")
);
const formattedMinutes = computed(() =>
  String(countdown.value.minutes).padStart(2, "0")
);
const formattedSeconds = computed(() =>
  String(countdown.value.seconds).padStart(2, "0")
);

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance > 0) {
    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

let countdownInterval: ReturnType<typeof setInterval> | null = null;

// Initialize countdown only on client-side to avoid hydration mismatches
onMounted(() => {
  // Initialize countdown immediately on client
  updateCountdown();
  // Start interval to update every second
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

// Fetch FAQs content
const { data: faqsPage } = await useAsyncData("faqs", () => {
  // TS sometimes resolves an overload requiring 2 args; extra undefined is harmless at runtime.
  return (queryCollection as any)("faqs", undefined).first();
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

// Process markdown to separate intro, sections, and FAQs
const faqItems = computed(() => {
  if (!faqsPage.value) return [];
  const body = (faqsPage.value as any).body;
  if (!body || body.type !== "minimark" || !Array.isArray(body.value))
    return [];

  return transformFaqsToAccordionData(body.value);
});

// Process markdown to create sections with headings
const faqSections = computed(() => {
  if (!faqsPage.value) return [];
  const body = (faqsPage.value as any).body;
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
  if (!faqsPage.value) return null;
  const body = (faqsPage.value as any).body;
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
    ...faqsPage.value,
    body: {
      ...body,
      value: introNodes,
    },
  };
});

useSeoMeta({
  title: "ICJIA Accessibility Portal - Home",
  description: "Your resource for accessibility information and resources",
});
</script>

<style scoped>
.countdown-card {
  background: rgb(var(--v-theme-surface)) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 10px 25px -5px rgba(var(--v-theme-primary), 0.15) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.countdown-card :deep(h1),
.countdown-card :deep(p),
.countdown-card :deep(.text-h3),
.countdown-card :deep(.text-h6),
.countdown-card :deep(.text-body-2) {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.compliance-link {
  color: rgb(var(--v-theme-primary)) !important;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
}

.compliance-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.compliance-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 4px;
}

.site-dates {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-style: italic;
}

.date-item {
  display: inline-flex;
  align-items: center;
}

.date-separator {
  opacity: 0.5;
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  min-height: 120px;
  flex-wrap: wrap;
  width: 100%;
}

.countdown-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  flex: 0 0 auto;
}

.countdown-value {
  font-size: 4.5rem;
  font-weight: bold;
  line-height: 1;
  color: rgb(var(--v-theme-primary));
}

.countdown-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  opacity: 0.8;
  color: rgb(var(--v-theme-on-surface)) !important;
}

.countdown-separator {
  font-size: 3rem;
  font-weight: bold;
  opacity: 0.5;
  padding: 0 0.25rem;
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1;
  display: flex;
  align-items: center;
}

@media (max-width: 960px) {
  .countdown-card {
    padding: 1.5rem !important;
  }

  .countdown-value {
    font-size: 3.5rem;
  }

  .countdown-separator {
    font-size: 2.5rem;
    padding: 0 0.2rem;
  }
}

@media (max-width: 600px) {
  .countdown-card {
    padding: 1rem !important;
  }

  .countdown-display {
    gap: 0.25rem;
    margin: 1.5rem 0;
    min-height: 100px;
  }

  .countdown-value {
    font-size: 2.5rem;
  }

  .countdown-item {
    min-width: 55px;
  }

  .countdown-separator {
    font-size: 1.75rem;
    padding: 0 0.15rem;
  }

  .countdown-label {
    font-size: 0.7rem;
    margin-top: 0.25rem;
  }

  h1.text-h3 {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 400px) {
  .countdown-display {
    gap: 0.2rem;
    margin: 1rem 0;
    min-height: 90px;
  }

  .countdown-value {
    font-size: 2rem;
  }

  .countdown-item {
    min-width: 45px;
  }

  .countdown-separator {
    font-size: 1.5rem;
    padding: 0 0.1rem;
  }

  .countdown-label {
    font-size: 0.65rem;
    margin-top: 0.2rem;
  }
}

/* FAQ Section Styles */
.faq-section {
  padding: 2rem 0;
}

.faq-main-title {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  padding-bottom: 1rem;
}

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
</style>
