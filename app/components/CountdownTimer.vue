<template>
  <div class="countdown-card" :class="{ compact: compact }">
    <!-- The cobalt band: label and deadline on the left, the numbers on the right -->
    <div class="countdown-content pk-block">
      <div class="countdown-intro">
        <h2 v-if="!compact" class="countdown-heading pk-label">
          Countdown to WCAG 2.1 AA Compliance
        </h2>
        <p v-if="compact" class="countdown-compact-text pk-label">
          Countdown to WCAG 2.1 AA Compliance
        </p>
        <p class="countdown-deadline">
          <a
            href="https://www.ada.gov/resources/2024-03-08-web-rule/"
            target="_blank"
            rel="noopener noreferrer"
            class="compliance-link"
          >
            ADA Title II Compliance Deadline: April 26, 2027
          </a>
        </p>
      </div>
      <div
        class="countdown-display"
        role="status"
        aria-live="polite"
        aria-atomic="false"
      >
        <span class="sr-only">{{ countdownAriaLabel }}</span>
        <div v-if="!countdownInitialized" class="countdown-loader">
          <v-progress-circular
            indeterminate
            color="white"
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
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.hours }}</div>
            <div class="countdown-label">Hours</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.minutes }}</div>
            <div class="countdown-label">Minutes</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdown.seconds }}</div>
            <div class="countdown-label">Seconds</div>
          </div>
        </template>
      </div>
    </div>
    <WhatsNewBanner :compact="compact" />
  </div>
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

/** @type {number} Target date timestamp for WCAG 2.1 AA compliance deadline (April 26, 2027) */
const targetDate = new Date("2027-04-26T00:00:00").getTime();

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
/* Plakat look: on a reading page the countdown is the page's one cobalt band,
   with the What's New strip attached underneath it. */
.countdown-content {
  padding: 28px 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px 32px;
}

.compact .countdown-content {
  padding: 20px 24px;
}

.countdown-intro {
  flex: 1 1 240px;
  min-width: 0;
}

.countdown-heading,
.countdown-compact-text {
  margin: 0;
  color: var(--pk-brand-ink);
}

.countdown-deadline {
  margin: 6px 0 0;
  font-size: 1.0625rem;
  line-height: 1.5;
}

.compliance-link {
  /* White on cobalt: 5.7:1. Underlined, so colour is not the only cue. */
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

.countdown-display {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px 24px;
  min-height: 72px;
}

.countdown-loader {
  display: flex;
  align-items: center;
  min-width: 200px;
  min-height: 72px;
}

.countdown-value {
  font-size: 4rem;
  line-height: 0.9;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--pk-brand-ink);
  /* Digits keep one width, so the numbers do not shuffle every second. */
  font-variant-numeric: tabular-nums;
}

.compact .countdown-value {
  font-size: 2.75rem;
}

.countdown-label {
  margin-top: 6px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pk-brand-ink);
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
  .countdown-content,
  .compact .countdown-content {
    padding: 18px 16px;
  }

  .countdown-display {
    gap: 8px 16px;
  }

  .countdown-value,
  .compact .countdown-value {
    font-size: 2.25rem;
  }
}

@media print {
  .countdown-card {
    display: none;
  }
}
</style>
