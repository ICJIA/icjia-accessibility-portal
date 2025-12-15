<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Clock Section -->
        <v-card class="pa-8 mb-8 countdown-card" elevation="4">
          <div class="text-center">
            <h1 class="text-h3 mb-4">ICJIA Accessibility Portal</h1>
            <p class="text-h6 mb-6 text-medium-emphasis">
              Countdown to WCAG 2.1 AA Compliance
            </p>
            <div class="countdown-display">
              <div class="countdown-item">
                <div class="countdown-value">{{ countdown.days }}</div>
                <div class="countdown-label">Days</div>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <div class="countdown-value">{{ countdown.hours }}</div>
                <div class="countdown-label">Hours</div>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <div class="countdown-value">{{ countdown.minutes }}</div>
                <div class="countdown-label">Minutes</div>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <div class="countdown-value">{{ countdown.seconds }}</div>
                <div class="countdown-label">Seconds</div>
              </div>
            </div>
            <p class="text-body-2 mt-4 text-medium-emphasis">
              Target Date: April 24, 2026
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
          <div v-if="faqsPage" class="faq-content">
            <ContentRenderer :value="faqsPage" />
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
import { ref, onMounted, onUnmounted } from "vue";

const targetDate = new Date("2026-04-24T00:00:00").getTime();

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

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

onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

// Fetch FAQs content
const { data: faqsPage } = await useAsyncData("faqs", () => {
  return queryCollection("faqs").first();
});

useSeoMeta({
  title: "ICJIA Accessibility Portal - Home",
  description: "Your resource for accessibility information and resources",
});
</script>

<style scoped>
.countdown-card {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 10px 25px -5px rgba(var(--v-theme-primary), 0.15) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.countdown-value {
  font-size: 3rem;
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
}

.countdown-separator {
  font-size: 2rem;
  font-weight: bold;
  opacity: 0.5;
  padding: 0 0.5rem;
}

@media (max-width: 600px) {
  .countdown-value {
    font-size: 2rem;
  }

  .countdown-item {
    min-width: 60px;
  }

  .countdown-separator {
    font-size: 1.5rem;
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
    rgba(var(--v-theme-primary), 0.15) 0%,
    rgba(var(--v-theme-primary), 0.05) 100%
  );
  border-left: 4px solid rgb(var(--v-theme-primary));
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
.faq-content :deep(h3 + blockquote) {
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

.faq-content :deep(li) {
  margin: 0.35rem 0;
}

/* When list is an answer block, add a bit more left padding for bullets */
.faq-content :deep(h3 + ul),
.faq-content :deep(h3 + ol),
.faq-content :deep(h3 + p + ul),
.faq-content :deep(h3 + p + ol) {
  padding-left: 2.5rem;
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
