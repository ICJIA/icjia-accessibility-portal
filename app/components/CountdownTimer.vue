<template>
  <v-card
    class="countdown-card"
    :class="{ 'mb-8': !compact, 'mb-4': compact }"
    :elevation="compact ? 2 : 4"
    color="surface"
  >
    <div class="text-center" :class="{ 'pa-8': !compact, 'pa-4': compact }">
      <h2 v-if="!compact" class="text-h5 mb-2">
        Countdown to
        <NuxtLink
          href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa"
          target="_blank"
          rel="noopener noreferrer"
          class="text-decoration-none font-weight-medium"
        >
          WCAG 2.1 AA Compliance
        </NuxtLink>
      </h2>
      <p v-if="compact" class="text-body-2 text-medium-emphasis mb-2">
        Countdown to WCAG 2.1 AA Compliance
      </p>
      <div class="countdown-display" :class="{ compact: compact }">
        <div v-if="!countdownInitialized" class="countdown-loader">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="compact ? 32 : 48"
            :width="compact ? 3 : 4"
          />
        </div>
        <template v-else>
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
        </template>
      </div>
      <p class="text-body-2 mt-3">
        <NuxtLink
          href="https://www.ada.gov/resources/2024-03-08-web-rule/"
          target="_blank"
          rel="noopener noreferrer"
          class="compliance-link"
        >
          <v-icon size="14" class="mr-1">mdi-open-in-new</v-icon>
          ADA Title II Deadline: April 24, 2026
        </NuxtLink>
      </p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  compact?: boolean;
}>();

const targetDate = new Date("2026-04-24T00:00:00").getTime();

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const countdownInitialized = ref(false);

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
  color: rgb(var(--v-theme-primary));
}

.compact .countdown-value {
  font-size: 1.75rem;
}

.countdown-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.25rem;
  opacity: 0.8;
  color: rgb(var(--v-theme-on-surface)) !important;
}

.compact .countdown-label {
  font-size: 0.6rem;
}

.countdown-separator {
  font-size: 1.75rem;
  font-weight: bold;
  opacity: 0.5;
  padding: 0 0.25rem;
  color: rgb(var(--v-theme-on-surface)) !important;
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

