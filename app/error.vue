<template>
  <v-app>
    <div class="app-wrapper">
      <SkipLink />
      <AppNavbar />
      <v-main id="main-content" tabindex="-1">
        <v-container class="main-inner">
          <div class="pk-page error-page">
            <div class="pk-page-head">
              <p class="pk-label">Error {{ error.statusCode || 404 }}</p>
              <h1 class="pk-page-title">{{ (error.statusCode || 404) === 404 ? "Page Not Found" : "Something Went Wrong" }}</h1>
              <p class="pk-page-intro">
                We couldn't find that page — it may have moved.
              </p>
            </div>

            <div class="error-actions">
              <v-btn href="/" color="brand" size="large" variant="flat">
                Go Home
              </v-btn>

              <v-btn href="/links" variant="outlined" size="large">
                Accessibility Links
              </v-btn>
            </div>
          </div>
        </v-container>
        <AppFooter />
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
/**
 * @fileoverview Error page component
 * @description Displays error pages (404, 500, etc.) with helpful navigation options
 */

/**
 * Component props
 * @typedef {Object} ErrorPageProps
 * @property {Object} error - Error object
 * @property {number} [error.statusCode] - HTTP status code
 * @property {string} [error.statusMessage] - HTTP status message
 * @property {string} [error.message] - Error message
 */
const props = defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}>();

useSeoMeta({
  title: `${props.error.statusCode || 404} - ${(props.error.statusCode || 404) === 404 ? 'Page Not Found' : 'Something Went Wrong'}`,
  description: "The page you are looking for could not be found.",
});
</script>

<style scoped>
/* Plakat look: the same reading-page head as the other pages, then two
   square buttons — the cobalt one is the main way out. */
.error-page {
  min-height: calc(100vh - 360px);
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.error-actions .v-btn {
  min-height: 48px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
  box-shadow: none;
}

.error-actions .v-btn--variant-outlined {
  border: 2px solid var(--pk-heading);
  color: var(--pk-heading);
}
</style>
