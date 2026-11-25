<template>
  <v-container class="home">
    <!-- Hero: the purple block (title, deadline, dates) beside the countdown panel -->
    <section class="hero" aria-label="Countdown to the compliance deadline">
      <div class="hero-block pk-block">
        <h1 class="hero-title">ICJIA Accessibility Portal</h1>
        <p class="hero-labels pk-label">
          <span>Countdown to WCAG 2.1 AA Compliance</span>
          <span aria-hidden="true">ADA Title II</span>
        </p>
        <p class="hero-deadline">
          <NuxtLink
            href="https://www.ada.gov/resources/2024-03-08-web-rule/"
            target="_blank"
            rel="noopener noreferrer"
            class="compliance-link"
          >
            ADA Title II Compliance Deadline: April 26, 2027
          </NuxtLink>
        </p>
        <p class="site-dates">
          <span class="date-item">Created: {{ siteCreated }}</span>
          <span class="date-separator" aria-hidden="true">·</span>
          <span class="date-item">Updated: {{ lastUpdated }}</span>
          <span class="date-separator" aria-hidden="true">·</span>
          <span class="date-item">Reviewed: {{ lastReviewed }}</span>
        </p>
      </div>

      <div class="hero-countdown">
        <ClientOnly>
          <div
            class="countdown-display"
            role="status"
            aria-live="polite"
            aria-atomic="false"
          >
            <span class="sr-only">{{ countdownAriaLabel }}</span>
            <div class="countdown-item countdown-item-days">
              <div class="countdown-value">{{ formattedDays }}</div>
              <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
              <div class="countdown-value">{{ formattedHours }}</div>
              <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
              <div class="countdown-value">{{ formattedMinutes }}</div>
              <div class="countdown-label">Minutes</div>
            </div>
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
      </div>
    </section>

    <!-- What's New: the newest entry from app/utils/whatsNew.ts -->
    <WhatsNewBanner />

    <!-- Shared FAQ experience (disclaimer, sort, review panel, sections) — same component as /faqs -->
    <FaqBrowser
      title-tag="h2"
      :show-description="false"
      :wrap-in-card="false"
    />
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Home page component with countdown timer and FAQ sections
 * @description Displays the ICJIA Accessibility Portal homepage with a countdown timer
 * to the WCAG 2.1 AA compliance deadline and FAQ sections
 */

import { ref, onMounted, onUnmounted, computed } from "vue";
import { useSeo } from "../composables/useSeo";
import {
  useOrganizationStructuredData,
  useWebSiteStructuredData,
} from "../composables/useStructuredData";

/** @type {number} Target date timestamp for WCAG 2.1 AA compliance deadline (April 26, 2027, midnight Chicago CDT) */
const targetDate = new Date("2027-04-26T00:00:00-05:00").getTime();

/** @type {string} Site creation date */
const siteCreated = "December 15, 2025";

/** @type {string} Last update date - update when content is added or edited */
const lastUpdated = "November 25, 2026";

/** @type {string} Last full review date - update when the FAQ is re-verified against official sources */
const lastReviewed = "November 25, 2026";


/** @type {import('vue').Ref<boolean>} Whether component has mounted on client */
const isMounted = ref(false);

/**
 * @type {import('vue').Ref<{days: number, hours: number, minutes: number, seconds: number}>}
 * Countdown timer state
 */
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

/**
 * Formatted countdown days with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedDays = computed(() =>
  isMounted.value ? String(countdown.value.days).padStart(2, "0") : "00"
);

/**
 * Formatted countdown hours with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedHours = computed(() =>
  isMounted.value ? String(countdown.value.hours).padStart(2, "0") : "00"
);

/**
 * Formatted countdown minutes with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedMinutes = computed(() =>
  isMounted.value ? String(countdown.value.minutes).padStart(2, "0") : "00"
);

/**
 * Formatted countdown seconds with zero-padding
 * @type {import('vue').ComputedRef<string>}
 */
const formattedSeconds = computed(() =>
  isMounted.value ? String(countdown.value.seconds).padStart(2, "0") : "00"
);

/**
 * Computed aria-label for screen readers
 * @type {import('vue').ComputedRef<string>}
 */
const countdownAriaLabel = computed(() => {
  if (!isMounted.value) {
    return "Countdown timer loading";
  }
  return `Countdown: ${countdown.value.days} days, ${countdown.value.hours} hours, ${countdown.value.minutes} minutes, ${countdown.value.seconds} seconds remaining until WCAG 2.1 AA compliance deadline`;
});

/**
 * Updates the countdown timer values based on the time remaining until target date
 * @returns {void}
 */
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

/** @type {ReturnType<typeof setInterval> | null} Interval reference for countdown updates */
let countdownInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Initialize countdown only on client-side to avoid hydration mismatches
 * Sets up the countdown timer and starts the update interval
 */
onMounted(() => {
  // Mark as mounted first to ensure computed properties return consistent values
  isMounted.value = true;
  // Initialize countdown immediately on client
  updateCountdown();
  // Start interval to update every second
  countdownInterval = setInterval(updateCountdown, 1000);
});

/**
 * Cleanup function to clear the countdown interval when component is unmounted
 */
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

// Enhanced SEO with Open Graph, Twitter Cards, and structured data
useSeo({
  title: "Home - WCAG 2.1 AA Portal",
  description:
    "Countdown to WCAG 2.1 AA deadline (April 26, 2027, extended from April 24, 2026). Resources, FAQs, and guidance for Illinois state agencies on digital accessibility and ADA Title II.",
  url: "/",
  keywords: [
    "WCAG 2.1 AA compliance",
    "digital accessibility",
    "ADA Title II",
    "web accessibility",
    "Illinois state agency",
    "accessibility deadline",
    "WCAG compliance",
    "accessibility resources",
    "Section 508",
    "IITAA",
  ],
});

// Add Organization structured data
useOrganizationStructuredData({
  name: "Illinois Criminal Justice Information Authority",
  url: "https://accessibility.icjia.app",
  logo: "/icjia-logo.png",
  description:
    "Illinois Criminal Justice Information Authority - Digital Accessibility Portal providing resources for WCAG 2.1 AA compliance",
  contactPoint: {
    contactType: "Accessibility Support",
    email: "DoIT.Accessibility@Illinois.gov",
  },
});

// Add WebSite structured data
useWebSiteStructuredData();
</script>

<style scoped>
/* Plakat look: the home hero is the same two-part layout as audit.icjia.app —
   one purple colour field on the left, a white-outlined panel on the right. */
.home {
  padding-top: 24px;
  padding-bottom: 0;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.hero-block {
  flex: 1.35 1 480px;
  min-width: 0;
  box-sizing: border-box;
  padding: 44px 44px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* The label row reads first on screen; the h1 stays first in the document. */
.hero-labels {
  order: -1;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  color: var(--pk-brand-ink);
}

.hero-title {
  margin: 0;
  font-size: clamp(2.5rem, 7.2vw, 5.75rem);
  line-height: 0.94;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--pk-brand-ink);
  overflow-wrap: break-word;
}

.hero-deadline {
  margin: 0;
  font-size: 1.3125rem;
  line-height: 1.5;
}

.compliance-link {
  /* White on the purple: 5.6:1. Underlined, so colour is not the only cue. */
  color: var(--pk-brand-ink);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  /* WCAG 2.5.5 Target Size (Enhanced): at least 44px tall */
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}

.compliance-link:hover {
  text-decoration-thickness: 3px;
}

.site-dates {
  margin: auto 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--pk-brand-ink);
}

.hero-countdown {
  flex: 1 1 360px;
  min-width: 0;
  box-sizing: border-box;
  border: 3px solid var(--pk-heading);
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.countdown-display {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  min-height: 300px;
  align-content: end;
}

.countdown-loader {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.countdown-item {
  border-top: 3px solid var(--pk-heading);
  padding-top: 12px;
}

.countdown-item-days {
  grid-column: 1 / -1;
  border-top: 0;
  padding-top: 0;
}

.countdown-value {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--pk-heading);
  /* Digits keep one width, so the numbers do not shuffle every second. */
  font-variant-numeric: tabular-nums;
}

.countdown-item-days .countdown-value {
  font-size: clamp(6rem, 17vw, 13.5rem);
  line-height: 0.86;
  letter-spacing: -0.06em;
}

.countdown-label {
  margin-top: 6px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pk-text-2);
}

.countdown-item-days .countdown-label {
  margin-top: 14px;
}

/* Screen reader only text - visually hidden but available to assistive technologies */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (max-width: 600px) {
  .hero {
    gap: 20px;
  }

  .hero-block {
    padding: 28px 24px;
    gap: 20px;
  }

  .hero-countdown {
    padding: 24px;
  }

  .countdown-display {
    gap: 14px;
    min-height: 220px;
  }

  .hero-deadline {
    font-size: 1.125rem;
  }
}
</style>
