<template>
  <v-card
    class="countdown-card"
    :class="{ 'mb-8': !compact, 'mb-4': compact }"
    :elevation="compact ? 2 : 4"
    color="surface"
  >
    <div
      class="text-center countdown-content"
      :class="{ 'pa-8': !compact, 'pa-4': compact }"
    >
      <h2 v-if="!compact" class="text-h5 mb-2 countdown-heading">
        Countdown to WCAG 2.1 AA Compliance
      </h2>
      <p v-if="compact" class="text-body-2 mb-2 countdown-compact-text">
        Countdown to WCAG 2.1 AA Compliance
      </p>
      <div
        class="countdown-display"
        :class="{ compact: compact }"
        role="status"
        aria-live="polite"
        aria-atomic="false"
      >
        <span class="sr-only">{{ countdownAriaLabel }}</span>
        <div v-if="!countdownInitialized" class="countdown-loader">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="compact ? 32 : 48"
            :width="compact ? 3 : 4"
            aria-label="Loading countdown timer"
          />
        </div>
        <template v-else>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.days }}</div>
            <div class="countdown-label">Days</div>
          </div>
          <div class="countdown-separator" aria-hidden="true">:</div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.hours }}</div>
            <div class="countdown-label">Hours</div>
          </div>
          <div class="countdown-separator" aria-hidden="true">:</div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.minutes }}</div>
            <div class="countdown-label">Minutes</div>
          </div>
          <div class="countdown-separator" aria-hidden="true">:</div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.seconds }}</div>
            <div class="countdown-label">Seconds</div>
          </div>
        </template>
      </div>
      <p class="text-body-2 mt-3" style="line-height: 1.5 !important;">
        <a
          href="https://www.ada.gov/resources/2024-03-08-web-rule/"
          target="_blank"
          rel="noopener noreferrer"
          class="compliance-link"
          style="color: rgb(var(--v-theme-on-surface)) !important; text-decoration: underline !important; font-weight: 700 !important; font-size: 1rem !important; display: inline-flex; align-items: center; min-height: 44px; min-width: 44px; padding: 4px 8px; line-height: 1.5; box-sizing: border-box; opacity: 1 !important;"
        >
          <span style="margin-right: 4px; font-size: 1.1em; color: inherit !important;" aria-hidden="true">↗</span>
          ADA Title II Deadline: April 24, 2026
        </a>
      </p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
/**
 * @fileoverview Countdown timer component for WCAG 2.1 AA compliance deadline
 * @description Displays a countdown timer to the ADA Title II compliance deadline
 * with ARIA live region support for screen readers
 */

import { ref, computed, onMounted, onUnmounted } from "vue";

/**
 * Component props
 * @typedef {Object} CountdownTimerProps
 * @property {boolean} [compact] - Whether to display in compact mode
 */
defineProps<{
  compact?: boolean;
}>();

/** @type {number} Target date timestamp for WCAG 2.1 AA compliance deadline (April 24, 2026) */
const targetDate = new Date("2026-04-24T00:00:00").getTime();

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

/** @type {import('vue').Ref<boolean>} Whether countdown has been initialized */
const countdownInitialized = ref(false);

/**
 * Computed aria-label for screen readers
 * @type {import('vue').ComputedRef<string>}
 */
const countdownAriaLabel = computed(() => {
  if (!countdownInitialized.value) {
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

  if (!countdownInitialized.value) {
    countdownInitialized.value = true;
  }
};

/** @type {ReturnType<typeof setInterval> | null} Interval reference for countdown updates */
let countdownInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Initialize countdown when component is mounted
 */
onMounted(() => {
  updateCountdown();
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

/* Override any Vuetify link styles within the countdown card */
.countdown-card a,
.countdown-card a:link,
.countdown-card a:visited,
.countdown-card a:hover,
.countdown-card a:active,
.countdown-card a:focus {
  color: rgb(var(--v-theme-primary)) !important;
}

.countdown-content {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.countdown-content p,
.countdown-content h2,
.countdown-content h3,
.countdown-content h4,
.countdown-content h5,
.countdown-content h6,
.countdown-content span {
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* All links in countdown - use primary color for better visibility and contrast */
.countdown-content a,
.countdown-content a:link,
.countdown-content a:visited,
.countdown-content a:hover,
.countdown-content a:active,
.countdown-content a:focus {
  color: rgb(var(--v-theme-primary)) !important;
}

.countdown-heading {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.countdown-heading * {
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Ensure all text and links in heading use theme colors */
.countdown-heading,
.countdown-heading span {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.countdown-heading a,
.countdown-heading a:link,
.countdown-heading a:visited,
.countdown-heading a:hover,
.countdown-heading a:active,
.countdown-heading a:focus {
  color: rgb(var(--v-theme-primary)) !important;
}

/* Force primary color on all links in countdown for proper contrast */
.countdown-link,
.countdown-link:link,
.countdown-link:visited,
.countdown-link:hover,
.countdown-link:active,
.countdown-link:focus {
  color: rgb(var(--v-theme-primary)) !important;
  text-decoration: underline !important;
}

.countdown-link:hover {
  opacity: 0.9;
}

.countdown-compact-text {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.compliance-link {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text */
  /* Use pure black for maximum contrast on light background (21:1 - exceeds AAA requirement) */
  color: #000000 !important;
  text-decoration: underline;
  font-weight: 600; /* Slightly bolder for better visibility */
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px !important;
  min-width: 44px !important;
  padding: 8px 12px;
  box-sizing: border-box;
  /* Ensure maximum contrast - no opacity reduction */
  opacity: 1 !important;
}

/* Dark theme: use white for maximum AAA contrast */
[data-v-theme="dark"] .compliance-link,
.v-theme--dark .compliance-link {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: 7:1 for normal text on dark background */
  /* Use pure white for maximum contrast on dark background (21:1+ on #0F172A) */
  color: #FFFFFF !important;
  opacity: 1 !important;
}

.compliance-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain maximum contrast on hover */
  opacity: 1 !important;
  text-decoration: underline;
  /* Pure black for maximum contrast on light background */
  color: #000000 !important;
}

/* Dark theme: use white for maximum AAA contrast on hover */
[data-v-theme="dark"] .compliance-link:hover,
.v-theme--dark .compliance-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain maximum contrast on hover */
  color: #FFFFFF !important; /* Pure white for maximum contrast on dark background */
  opacity: 1 !important;
}

.compliance-link:visited {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain maximum contrast for visited state */
  color: #000000 !important;
  opacity: 1 !important;
}

/* Dark theme: use white for maximum AAA contrast for visited state */
[data-v-theme="dark"] .compliance-link:visited,
.v-theme--dark .compliance-link:visited {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Maintain maximum contrast for visited state */
  color: #FFFFFF !important; /* Pure white for maximum contrast on dark background */
  opacity: 1 !important;
}

.compliance-link .v-icon {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Match link color for maximum contrast */
  color: #000000 !important;
  opacity: 1 !important;
}

/* Dark theme: use white for maximum AAA contrast for icon */
[data-v-theme="dark"] .compliance-link .v-icon,
.v-theme--dark .compliance-link .v-icon {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Match link color for maximum contrast */
  color: #FFFFFF !important; /* Pure white for maximum contrast on dark background */
  opacity: 1 !important;
}

.compliance-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 4px;
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
  min-height: 80px;
  flex-wrap: wrap;
}

.countdown-display.compact {
  min-height: 60px;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.countdown-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}

.compact .countdown-item {
  min-width: 45px;
}

.countdown-value {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1;
  color: rgb(var(--v-theme-primary)) !important;
}

.compact .countdown-value {
  font-size: 1.75rem;
}

.countdown-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.25rem;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use full opacity for better contrast */
  opacity: 1 !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for countdown labels */
[data-v-theme="dark"] .countdown-label,
.v-theme--dark .countdown-label {
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
}

.compact .countdown-label {
  font-size: 0.6rem;
}

.countdown-separator {
  font-size: 1.75rem;
  font-weight: bold;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  opacity: 0.9 !important;
  padding: 0 0.25rem;
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Dark theme: ensure AAA contrast for countdown separators */
[data-v-theme="dark"] .countdown-separator,
.v-theme--dark .countdown-separator {
  opacity: 1 !important;
  color: rgb(248, 250, 252) !important; /* Full contrast on dark background */
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

.compact .countdown-separator {
  font-size: 1.25rem;
}

@media (max-width: 600px) {
  .countdown-value {
    font-size: 2rem;
  }

  .compact .countdown-value {
    font-size: 1.5rem;
  }

  .countdown-item {
    min-width: 50px;
  }

  .compact .countdown-item {
    min-width: 40px;
  }

  .countdown-separator {
    font-size: 1.25rem;
  }

  .compact .countdown-separator {
    font-size: 1rem;
  }
}

@media (max-width: 400px) {
  .countdown-value {
    font-size: 1.75rem;
  }

  .compact .countdown-value {
    font-size: 1.25rem;
  }

  .countdown-item {
    min-width: 45px;
  }

  .compact .countdown-item {
    min-width: 35px;
  }

  .countdown-separator {
    font-size: 1rem;
  }

  .compact .countdown-separator {
    font-size: 0.875rem;
  }

  .countdown-label {
    font-size: 0.6rem;
  }

  .compact .countdown-label {
    font-size: 0.5rem;
  }
}
</style>
