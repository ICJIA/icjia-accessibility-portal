<template>
  <section
    v-if="latest"
    class="whats-new-banner"
    :class="{ 'whats-new-banner-compact': compact }"
    aria-labelledby="whats-new-banner-label"
  >
    <span class="whats-new-badge">
      {{ latest.badge }} {{ shortDate }}
    </span>
    <p class="whats-new-text">
      <span id="whats-new-banner-label" class="whats-new-label">What's New</span>
      <!-- Explicit {{ " " }} spaces: Vue's whitespace condensing drops a space
           that sits between an element and a v-if block. -->
      <strong>{{ latest.title }}.</strong>{{ " " }}<template v-if="!compact">{{ latest.summary }}{{ " " }}</template><NuxtLink to="/whats-new" class="whats-new-link">See all updates</NuxtLink>
    </p>
  </section>
</template>

<script setup lang="ts">
/**
 * @fileoverview What's New banner shown at the top of the countdown card
 * @description Shows the newest entry from `app/utils/whatsNew.ts` (badge, date,
 * headline, and, in the full version, its summary), with a link to the
 * /whats-new archive. It replaced the April 2026 deadline-extension notice,
 * which now lives in the archive as its own entry.
 *
 * The data is static, so the server and the browser render identical markup
 * (no hydration mismatch, no layout shift).
 */

import { computed } from "vue";
import { getLatestWhatsNew, formatWhatsNewShortDate } from "~/utils/whatsNew";

withDefaults(
  defineProps<{
    /** Shorter version for internal pages: headline and link only. */
    compact?: boolean;
  }>(),
  { compact: false },
);

const latest = getLatestWhatsNew();

/** Badge date, e.g. "11/6/2026". */
const shortDate = computed(() =>
  latest ? formatWhatsNewShortDate(latest.date) : "",
);
</script>

<style scoped>
/*
 * Selectors are prefixed with .whats-new-banner so they outrank the countdown
 * card's own `.countdown-card :deep(p)` color rule on the home page.
 */
.whats-new-banner {
  background: #0f172a;
  color: #ffffff;
  border-bottom: 3px solid #f59e0b;
  padding: 16px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  text-align: left;
}

.whats-new-banner-compact {
  padding: 10px 16px;
}

.whats-new-banner .whats-new-badge {
  flex-shrink: 0;
  background: #f59e0b;
  color: #0f172a;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  white-space: nowrap;
}

.whats-new-banner .whats-new-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #f1f5f9 !important;
  font-weight: 500;
}

.whats-new-banner-compact .whats-new-text {
  font-size: 0.875rem;
}

.whats-new-banner .whats-new-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fde68a;
  margin-bottom: 2px;
}

.whats-new-banner .whats-new-text strong {
  color: #ffffff;
}

.whats-new-banner .whats-new-link {
  color: #fbbf24 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px;
  font-weight: 700;
  white-space: nowrap;
}

.whats-new-banner .whats-new-link:hover,
.whats-new-banner .whats-new-link:focus-visible {
  color: #fde68a !important;
  text-decoration-thickness: 2px;
}

.whats-new-banner .whats-new-link:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
  border-radius: 2px;
}

@media (max-width: 600px) {
  .whats-new-banner {
    padding: 12px 16px;
  }
  /* On a phone the badge sits above the text, so the text keeps the full width. */
  .whats-new-banner .whats-new-text {
    flex-basis: 100%;
    font-size: 0.875rem;
  }
}

@media print {
  .whats-new-banner {
    display: none;
  }
}
</style>
