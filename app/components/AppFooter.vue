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
          aria-label="Check PDF accessibility (opens in new tab)"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiFileCheckOutline" />
          <span>Check PDF</span>
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
import { mdiCopyright, mdiMagnify, mdiPrinter, mdiDownload, mdiFileCheckOutline, mdiFileDocumentOutline, mdiCheckCircle, mdiGithub, mdiOpenInNew } from '~/utils/icons'

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
.footer-wrapper {
  flex-shrink: 0;
  background: rgb(var(--v-theme-surface));
  border-top: 1px solid rgba(var(--v-theme-primary), 0.15);
  padding: 2rem 1rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

/* Copyright Section */
.footer-copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.copyright-link {
  display: inline-flex;
  align-items: center;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: on-surface should already meet AAA, but ensure it does */
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

/* Ensure copyright link maintains AAA contrast on hover */
.copyright-link:hover {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.copyright-link:hover {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher contrast color on hover */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

/* Dark theme: use lighter color for AAA contrast on hover */
[data-v-theme="dark"] .copyright-link:hover,
.v-theme--dark .copyright-link:hover {
  color: #93C5FD !important; /* Lighter blue for 7:1+ contrast on dark background */
}

.copyright-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  background: rgba(var(--v-theme-primary), 0.1);
}

/* Links Section */
.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  width: 100%;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher contrast color */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  white-space: nowrap;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .footer-link,
.v-theme--dark .footer-link {
  color: #93C5FD !important; /* Lighter blue for 7:1+ contrast on dark background */
}

/* Button-specific reset for footer-button */
.footer-button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  min-width: 44px;
}

.footer-link:hover {
  /* Maintain AAA contrast on hover - don't reduce opacity */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  background: rgba(var(--v-theme-primary), 0.1);
}

[data-v-theme="dark"] .footer-link:hover,
.v-theme--dark .footer-link:hover {
  color: #93C5FD !important;
}

.footer-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  background: rgba(var(--v-theme-primary), 0.15);
}

.footer-separator {
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher opacity for better contrast */
  color: rgba(var(--v-theme-on-surface), 0.7) !important;
  font-size: 1rem;
  line-height: 1;
  user-select: none;
}

/* Dark theme: ensure AAA contrast for separators */
[data-v-theme="dark"] .footer-separator,
.v-theme--dark .footer-separator {
  color: rgba(248, 250, 252, 0.7) !important; /* Higher contrast on dark background */
}

/* Tablet breakpoint */
@media (max-width: 768px) {
  .footer-wrapper {
    padding: 1.5rem 1rem;
  }

  .footer-container {
    gap: 0.875rem;
  }

  .copyright-link {
    font-size: 0.8125rem;
    /* Maintain 44x44px minimum on tablet */
    min-height: 44px;
    min-width: 44px;
  }

  .footer-link {
    font-size: 0.8125rem;
    /* Maintain 44x44px minimum on tablet */
    min-height: 44px;
    min-width: 44px;
  }

  .footer-links {
    gap: 0.5rem;
  }
}

/* Mobile breakpoint */
@media (max-width: 600px) {
  .footer-wrapper {
    padding: 1.25rem 0.75rem;
  }

  .footer-container {
    gap: 0.75rem;
  }

  .copyright-link {
    font-size: 0.75rem;
    /* Maintain 44x44px minimum on mobile */
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem 0.6rem;
  }

  .footer-link {
    font-size: 0.75rem;
    /* Maintain 44x44px minimum on mobile */
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem 0.6rem;
  }

  .footer-separator {
    font-size: 0.875rem;
  }
}

/* Small mobile breakpoint */
@media (max-width: 400px) {
  .footer-wrapper {
    padding: 1rem 0.5rem;
  }

  .copyright-link {
    font-size: 0.7rem;
    /* Maintain 44x44px minimum on small mobile */
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem 0.5rem;
  }

  .copyright-link span {
    display: inline;
  }

  .footer-link {
    font-size: 0.7rem;
    /* Maintain 44x44px minimum on small mobile */
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem 0.5rem;
  }

  .footer-separator {
    display: none;
  }

  .footer-links {
    gap: 0.5rem;
  }
}

/* Ensure icons stay aligned */
.v-icon {
  flex-shrink: 0;
}

/* Print styles */
@media print {
  .footer-wrapper {
    display: none;
  }
}
</style>
