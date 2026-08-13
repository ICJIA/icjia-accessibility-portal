<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Clock Section -->
        <v-card class="pa-0 mb-8 countdown-card" elevation="4" color="surface">
          <!-- Deadline extension notice (prominent, in-card banner) -->
          <div
            class="extension-notice"
            role="note"
            aria-labelledby="countdown-extension-heading"
          >
            <span class="extension-notice-badge" aria-hidden="true">Extended 4/20/2026</span>
            <span id="countdown-extension-heading" class="extension-notice-text">
              <strong>Deadline extended one year by DOJ Interim Final Rule.</strong>
              Illinois state agencies now have until
              <strong>April 26, 2027</strong> (previously April 24, 2026). Verify for yourself:
              <a
                href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web"
                target="_blank"
                rel="noopener noreferrer"
                class="extension-notice-link"
              >Federal Register notice</a>
              ·
              <a
                href="https://www.govtech.com/policy/federal-accessibility-deadline-will-be-delayed-one-year"
                target="_blank"
                rel="noopener noreferrer"
                class="extension-notice-link"
              >Government Technology coverage</a>.
            </span>
          </div>
          <div class="text-center countdown-body pa-8">
            <h1 class="text-h3 mb-4">ICJIA Accessibility Portal</h1>
            <p class="text-h6 mb-6 text-medium-emphasis">
              Countdown to WCAG 2.1 AA Compliance
            </p>
            <ClientOnly>
              <div
                class="countdown-display"
                role="status"
                aria-live="polite"
                aria-atomic="false"
              >
                <span class="sr-only">{{ countdownAriaLabel }}</span>
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
                <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiOpenInNew" />
                ADA Title II Digital Accessibility Compliance Deadline: April 26, 2027
              </NuxtLink>
            </p>
            <p class="text-caption mt-3 text-medium-emphasis site-dates">
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true" :icon="mdiCreation" />
                Created: {{ siteCreated }}
              </span>
              <span class="date-separator" aria-hidden="true">•</span>
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true" :icon="mdiUpdate" />
                Updated: {{ lastUpdated }}
              </span>
              <span class="date-separator" aria-hidden="true">•</span>
              <span class="date-item">
                <v-icon size="14" class="mr-1" aria-hidden="true" :icon="mdiCalendarCheck" />
                Reviewed: {{ lastReviewed }}
              </span>
            </p>
          </div>
        </v-card>

        <!-- Shared FAQ experience (disclaimer, sort, review panel, sections) — same component as /faqs -->
        <FaqBrowser
          title-tag="h2"
          :show-description="false"
          :wrap-in-card="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Home page component with countdown timer and FAQ sections
 * @description Displays the ICJIA Accessibility Portal homepage with a countdown timer
 * to the WCAG 2.1 AA compliance deadline and FAQ sections
 */

import { ref, onMounted, onUnmounted, computed } from "vue";
import { mdiOpenInNew, mdiCreation, mdiUpdate, mdiCalendarCheck } from "~/utils/icons";
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
const lastUpdated = "August 13, 2026";

/** @type {string} Last full review date - update when the FAQ is re-verified against official sources */
const lastReviewed = "August 13, 2026";


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

.countdown-card {
  background: rgb(var(--v-theme-surface)) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 10px 25px -5px rgba(var(--v-theme-primary), 0.15) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  overflow: hidden;
}

/* In-card deadline extension notice — prominent banner on the countdown */
.countdown-card .extension-notice {
  background: #0F172A;
  color: #FFFFFF;
  border-bottom: 3px solid #F59E0B;
  padding: 16px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  text-align: left;
}

.countdown-card .extension-notice-badge {
  flex-shrink: 0;
  background: #F59E0B;
  color: #0F172A;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  white-space: nowrap;
}

.countdown-card .extension-notice-text {
  flex: 1;
  min-width: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #F1F5F9 !important;
  font-weight: 500;
}

.countdown-card .extension-notice-text strong {
  color: #FFFFFF;
}

.countdown-card .extension-notice-link {
  color: #FBBF24 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px;
  font-weight: 700;
}

.countdown-card .extension-notice-link:hover,
.countdown-card .extension-notice-link:focus-visible {
  color: #FDE68A !important;
  text-decoration-thickness: 2px;
}

.countdown-card .extension-notice-link:focus-visible {
  outline: 2px solid #FBBF24;
  outline-offset: 2px;
  border-radius: 2px;
}

@media (max-width: 600px) {
  .countdown-card .extension-notice {
    padding: 12px 16px;
  }
  .countdown-card .extension-notice-text {
    font-size: 0.875rem;
  }
}

@media print {
  .countdown-card .extension-notice {
    display: none;
  }
}

.countdown-card :deep(h1),
.countdown-card :deep(p),
.countdown-card :deep(.text-h3),
.countdown-card :deep(.text-h6),
.countdown-card :deep(.text-body-2) {
  color: rgb(var(--v-theme-on-surface)) !important;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5 !important;
}

.compliance-link {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  /* Use black for maximum contrast on light background (21:1) */
  color: #000000 !important;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 8px 12px;
  box-sizing: border-box;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .compliance-link,
.v-theme--dark .compliance-link {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text on dark background */
  color: #BFDBFE !important; /* Lighter blue (#BFDBFE) for 7:1+ contrast on dark background */
}

.compliance-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Don't reduce opacity, maintain full contrast */
  opacity: 1 !important;
  text-decoration: underline;
  /* Maintain AAA contrast on hover */
  color: #000000 !important;
}

/* Dark theme: use lighter color for AAA contrast on hover */
[data-v-theme="dark"] .compliance-link:hover,
.v-theme--dark .compliance-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain 7:1 contrast on hover */
  color: #BFDBFE !important; /* Lighter blue for 7:1+ contrast on dark background */
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
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Override text-medium-emphasis for better contrast */
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for site dates */
[data-v-theme="dark"] .site-dates,
.v-theme--dark .site-dates {
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.date-item {
  display: inline-flex;
  align-items: center;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Ensure text meets AAA contrast */
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for date items */
[data-v-theme="dark"] .date-item,
.v-theme--dark .date-item {
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.date-separator {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.7 !important;
  color: rgb(var(--v-theme-on-surface));
}

/* Dark theme: ensure AAA contrast for date separators */
[data-v-theme="dark"] .date-separator,
.v-theme--dark .date-separator {
  opacity: 0.7 !important;
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
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
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.9 !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for countdown labels */
[data-v-theme="dark"] .countdown-label,
.v-theme--dark .countdown-label {
  opacity: 1 !important;
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.countdown-separator {
  font-size: 3rem;
  font-weight: bold;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.7 !important;
  padding: 0 0.25rem;
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1;
  display: flex;
  align-items: center;
}

/* Dark theme: ensure AAA contrast for countdown separators */
[data-v-theme="dark"] .countdown-separator,
.v-theme--dark .countdown-separator {
  opacity: 0.8 !important;
  color: rgb(248, 250, 252) !important; /* Higher contrast on dark background */
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

</style>
