<template>
  <footer class="footer-wrapper" role="contentinfo">
    <div class="footer-container">
      <!-- Copyright Section -->
      <div class="footer-copyright">
        <a
          href="https://icjia.illinois.gov"
          target="_blank"
          rel="noopener noreferrer"
          class="copyright-link"
          :aria-label="`${currentYear} Illinois Criminal Justice Information Authority (opens in new tab)`"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiCopyright" />
          <span
            >{{ currentYear }} Illinois Criminal Justice Information
            Authority</span
          >
        </a>
      </div>

      <!-- Links Section -->
      <nav class="footer-links" aria-label="Footer navigation">
        <a
          href="/trust"
          class="footer-link"
          :aria-current="route.path === '/trust' ? 'page' : undefined"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiShieldCheckOutline" />
          <span>Why trust this?</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/whats-new"
          class="footer-link"
          :aria-current="route.path === '/whats-new' ? 'page' : undefined"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiUpdate" />
          <span>What's New</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/search"
          class="footer-link"
          aria-label="Search FAQs"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiMagnify" />
          <span>Search</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/faqs-print"
          class="footer-link"
          aria-label="Print version of FAQs"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiPrinter" />
          <span>Print</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <button
          type="button"
          class="footer-link footer-button"
          aria-label="Download FAQs - choose format"
          @click="openDownloadDialog"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiDownload" />
          <span>Download</span>
        </button>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="https://audit.icjia.app"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          aria-label="Audit PDF (opens audit.icjia.app in a new tab)"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiFileCheckOutline" />
          <span>Audit PDF</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/docs/index.html"
          class="footer-link"
          aria-label="View documentation portal"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiFileDocumentOutline" />
          <span>Documentation</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/docs/accessibility/"
          class="footer-link"
          aria-label="View accessibility audit report"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiCheckCircle" />
          <span>Accessibility</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="https://github.com/ICJIA/icjia-accessibility-portal"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          aria-label="View source code on GitHub (opens in new tab)"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiGithub" />
          <span>GitHub</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="https://icjia.illinois.gov"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          aria-label="ICJIA Website (opens in new tab)"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiOpenInNew" />
          <span>ICJIA Website</span>
        </a>
      </nav>
    </div>

    <!-- Download Dialog -->
    <DownloadDialog v-model="showDownloadDialog" />
  </footer>
</template>

<script setup lang="ts">
/**
 * @fileoverview Footer component with copyright, links, and navigation
 * @description Modern, centered footer with ICJIA copyright, printer-friendly link,
 * accessibility report, and GitHub repository link. Responsive and fully accessible.
 */

import { ref } from "vue";
import { mdiShieldCheckOutline, mdiUpdate, mdiCopyright, mdiMagnify, mdiPrinter, mdiDownload, mdiFileCheckOutline, mdiFileDocumentOutline, mdiCheckCircle, mdiGithub, mdiOpenInNew } from '~/utils/icons'

/** Current route, for aria-current on the What's New link */
const route = useRoute();

/** @type {number} Current year for copyright display */
const currentYear = new Date().getFullYear();

/** @type {Ref<boolean>} Download dialog visibility state */
const showDownloadDialog = ref(false);

/**
 * Open the download format selection dialog
 */
function openDownloadDialog() {
  showDownloadDialog.value = true;
}
</script>

<style scoped>
/* Plakat look: a heavy white rule, the copyright on the left and plain text
   links on the right. The icons and dot separators are decorative
   (aria-hidden) and are not drawn in this look. */
.footer-wrapper {
  flex-shrink: 0;
  background: transparent;
  padding: 6rem 24px 2.5rem;
}

.footer-container {
  max-width: 1180px;
  margin: 0 auto;
  border-top: 4px solid var(--pk-heading);
  padding-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.25rem 2rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 1.375rem;
}

.footer-wrapper .v-icon,
.footer-separator {
  display: none;
}

.copyright-link,
.footer-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* 13.7:1 on the page */
  color: var(--pk-text-2) !important;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.5;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  white-space: nowrap;
}

.copyright-link {
  white-space: normal;
}

/* The © icon is not drawn in this look; the sign is set as text instead. */
.copyright-link span::before {
  content: "\00a9\00a0";
}

/* Button-specific reset for footer-button */
.footer-button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.copyright-link:hover,
.footer-link:hover {
  color: var(--pk-heading) !important;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.footer-link[aria-current="page"] {
  color: var(--pk-heading) !important;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

@media (max-width: 600px) {
  .footer-wrapper {
    padding: 4rem 16px 2rem;
  }
}

/* Print styles */
@media print {
  .footer-wrapper {
    display: none;
  }
}
</style>
