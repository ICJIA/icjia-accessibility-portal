<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8 whats-new-page" elevation="0">
          <h1 class="text-h3 mb-4 d-flex align-center">
            <v-icon class="mr-3" color="primary" aria-hidden="true" :icon="mdiUpdate" />
            What's New
          </h1>
          <p class="text-subtitle-1 mb-8 whats-new-intro">
            Every update to the portal and its FAQ, newest first: what changed and when. The
            banner at the top of the home page shows the most recent one.
          </p>

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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview What's New page: every update, newest first
 * @description Lists every entry from `app/utils/whatsNew.ts` in reverse
 * chronological order. The banner on the countdown card shows only the newest
 * entry; this page keeps the full history.
 */

import { mdiUpdate } from "~/utils/icons";
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
.whats-new-intro {
  color: rgb(var(--v-theme-on-surface));
  opacity: 1;
}

.whats-new-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.whats-new-entry {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.3);
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 20px;
  background: rgba(var(--v-theme-on-surface), 0.03);
  scroll-margin-top: 80px;
}

.whats-new-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  margin-bottom: 8px;
}

.whats-new-entry-badge {
  background: #f59e0b;
  color: #0f172a;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
}

.whats-new-date {
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.whats-new-latest {
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.6);
  border-radius: 999px;
  padding: 1px 10px;
}

.whats-new-title {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 0 0 8px;
  color: rgb(var(--v-theme-on-surface));
}

.whats-new-summary,
.whats-new-details li,
.whats-new-links {
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.6;
}

.whats-new-summary {
  margin: 0 0 8px;
}

.whats-new-details {
  margin: 0 0 8px;
  padding-left: 1.25rem;
}

.whats-new-details li {
  margin-bottom: 4px;
}

.whats-new-links {
  margin: 8px 0 0;
}

.whats-new-entry-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 600;
}

.whats-new-entry-link:hover,
.whats-new-entry-link:focus-visible {
  text-decoration-thickness: 2px;
}

.whats-new-entry-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 2px;
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
  .whats-new-page {
    padding: 16px !important;
  }
  .whats-new-entry {
    padding: 16px;
  }
  .whats-new-title {
    font-size: 1.2rem;
  }
}
</style>
