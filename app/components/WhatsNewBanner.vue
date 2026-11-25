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
/* Plakat look: a quiet raised strip, like the announcement bar on
   audit.icjia.app. Text on --pk-raised is 16:1; the link blue is 6.9:1. */
.whats-new-banner {
  background: var(--pk-raised);
  color: var(--pk-text);
  border: 1px solid var(--pk-border-alt);
  margin-top: 24px;
  padding: 16px 22px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px 18px;
  text-align: left;
}

/* Under the compact countdown band the strip is attached to it. */
.whats-new-banner-compact {
  margin-top: 0;
  border-top: 0;
  padding: 12px 24px;
}

.whats-new-banner .whats-new-badge {
  flex-shrink: 0;
  margin-top: 3px;
  background: var(--pk-green-wash);
  color: var(--pk-green);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 9px;
  white-space: nowrap;
}

.whats-new-banner .whats-new-text {
  flex: 1 1 20rem;
  min-width: 0;
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--pk-text) !important;
  font-weight: 400;
}

.whats-new-banner-compact .whats-new-text {
  font-size: 1rem;
}

.whats-new-banner .whats-new-label {
  display: block;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pk-heading);
  margin-bottom: 2px;
}

.whats-new-banner .whats-new-text strong {
  color: var(--pk-heading);
  font-weight: 700;
}

.whats-new-banner .whats-new-link {
  color: var(--pk-link) !important;
  text-decoration: underline !important;
  text-underline-offset: 2px;
  font-weight: 700;
  white-space: nowrap;
}

.whats-new-banner .whats-new-link:hover,
.whats-new-banner .whats-new-link:focus-visible {
  color: var(--pk-link-hover) !important;
  text-decoration-thickness: 2px;
}

@media (max-width: 600px) {
  .whats-new-banner,
  .whats-new-banner-compact {
    padding: 12px 16px;
  }
  /* On a phone the badge sits above the text, so the text keeps the full width. */
  .whats-new-banner .whats-new-text {
    flex-basis: 100%;
    font-size: 1rem;
  }
}

@media print {
  .whats-new-banner {
    display: none;
  }
}
</style>
