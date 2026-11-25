<template>
  <v-container>
    <div class="pk-page">
      <div class="pk-page-inner">
        <div class="whats-new-page">
          <div class="pk-page-head">
            <p class="pk-label">Update archive</p>
            <h1 class="pk-page-title">What's New</h1>
            <p class="pk-page-intro whats-new-intro">
              Every update to the portal and its FAQ, newest first: what changed and when. The
              banner at the top of the home page shows the most recent one.
            </p>
          </div>

          <ol v-if="entries.length" class="whats-new-list">
            <li
              v-for="(entry, index) in entries"
              :id="entry.id"
              :key="entry.id"
              class="whats-new-entry"
            >
              <article :aria-labelledby="`${entry.id}-title`">
                <div class="whats-new-meta">
                  <span class="whats-new-entry-badge">{{ entry.badge }}</span>
                  <time :datetime="entry.date" class="whats-new-date">{{
                    formatWhatsNewDate(entry.date)
                  }}</time>
                  <span v-if="index === 0" class="whats-new-latest">Latest</span>
                </div>
                <h2 :id="`${entry.id}-title`" class="whats-new-title">
                  {{ entry.title }}
                </h2>
                <p class="whats-new-summary">{{ entry.summary }}</p>
                <ul v-if="entry.details?.length" class="whats-new-details">
                  <li v-for="(detail, d) in entry.details" :key="d">{{ detail }}</li>
                </ul>
                <p v-if="entry.links?.length" class="whats-new-links">
                  <template v-for="(link, l) in entry.links" :key="link.href">
                    <span v-if="l > 0" aria-hidden="true"> · </span>
                    <a
                      v-if="isExternalWhatsNewLink(link.href)"
                      :href="link.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="whats-new-entry-link"
                      >{{ link.text }}<span class="sr-only"> (opens in new tab)</span></a
                    >
                    <NuxtLink v-else :to="link.href" class="whats-new-entry-link">{{
                      link.text
                    }}</NuxtLink>
                  </template>
                </p>
              </article>
            </li>
          </ol>

          <p v-else>There are no updates yet.</p>

          <p class="mt-8">
            <NuxtLink to="/" class="whats-new-entry-link">Back to the home page</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview What's New page: every update, newest first
 * @description Lists every entry from `app/utils/whatsNew.ts` in reverse
 * chronological order. The banner on the countdown card shows only the newest
 * entry; this page keeps the full history.
 */

import {
  getWhatsNewEntries,
  formatWhatsNewDate,
  isExternalWhatsNewLink,
} from "~/utils/whatsNew";
import { useSeo } from "../composables/useSeo";
import { useBreadcrumbStructuredData } from "../composables/useStructuredData";

/** Every entry, newest first. Static data, so it renders the same on server and client. */
const entries = getWhatsNewEntries();

useSeo({
  title: "What's New",
  description:
    "Every update to the ICJIA Accessibility Portal and its FAQ, newest first: what changed and when.",
  url: "/whats-new",
  keywords: [
    "what's new",
    "updates",
    "accessibility FAQ updates",
    "ADA Title II updates",
    "IITAA updates",
  ],
});

useBreadcrumbStructuredData([
  { name: "Home", url: "/" },
  { name: "What's New", url: "/whats-new" },
]);
</script>

<style scoped>
/* Plakat look: each update is a bordered panel on --pk-card, like the update
   archive on audit.icjia.app. */
.whats-new-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.whats-new-entry {
  border: 1px solid var(--pk-border-alt);
  background: var(--pk-card);
  padding: 20px 22px;
  margin-bottom: 16px;
  scroll-margin-top: 80px;
}

.whats-new-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  margin-bottom: 10px;
}

/* Green on its own wash: 9.5:1. */
.whats-new-entry-badge {
  background: var(--pk-green-wash);
  color: var(--pk-green);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 9px;
}

.whats-new-date {
  font-size: 0.9375rem;
  color: var(--pk-text-2);
}

.whats-new-latest {
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pk-heading);
}

.whats-new-title {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 10px;
  color: var(--pk-heading);
}

.whats-new-summary,
.whats-new-details li,
.whats-new-links {
  color: var(--pk-text);
  font-size: 1.0625rem;
  line-height: 1.6 !important;
}

.whats-new-summary {
  margin: 0 0 10px;
}

.whats-new-details {
  margin: 0 0 10px;
  padding-left: 1.375rem;
}

.whats-new-details li {
  margin-bottom: 6px;
}

.whats-new-links {
  margin: 10px 0 0;
}

.whats-new-entry-link {
  color: var(--pk-link);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 700;
}

.whats-new-entry-link:hover,
.whats-new-entry-link:focus-visible {
  color: var(--pk-link-hover);
  text-decoration-thickness: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 600px) {
  .whats-new-entry {
    padding: 16px;
  }
  .whats-new-title {
    font-size: 1.3125rem;
  }
}
</style>
