<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Clock Section -->
        <v-card class="pa-8 mb-8" elevation="2">
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
              Launch Date: April 24, 2026
            </p>
          </div>
        </v-card>

        <!-- FAQs Section -->
        <v-card class="pa-8" elevation="0">
          <h2 class="text-h4 mb-6">Frequently Asked Questions</h2>
          <ContentRenderer
            v-if="faqsPage"
            :value="faqsPage"
          />
          <div v-else>
            <p class="text-body-1">FAQs content loading...</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const targetDate = new Date('2026-04-24T00:00:00').getTime()

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance > 0) {
    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    }
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
}

let countdownInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

// Fetch FAQs content
const { data: faqsPage } = await useAsyncData('faqs', () => {
  return queryCollection('faqs').first()
})

useSeoMeta({
  title: 'ICJIA Accessibility Portal - Home',
  description: 'Your resource for accessibility information and resources',
})
</script>

<style scoped>
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
  color: var(--v-primary-base);
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
</style>
