<template>
  <footer class="footer-wrapper">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-copyright">
          <span class="copyright-text"
            >&copy; {{ currentYear }} Illinois Criminal Justice Information
            Authority</span
          >
        </div>
        <div class="footer-links">
          <a
            href="/faqs-print"
            class="footer-link"
            aria-label="View printer-friendly FAQs"
          >
            <v-icon size="14" class="mr-1" aria-hidden="true"
              >mdi-printer</v-icon
            >
            Print FAQs
          </a>
          <a
            href="/docs/accessibility/"
            class="footer-link"
            aria-label="View accessibility audit report"
          >
            <v-icon size="14" class="mr-1" aria-hidden="true"
              >mdi-accessibility</v-icon
            >
            Accessibility Report
          </a>
          <a
            href="https://github.com/ICJIA/icjia-accessibility-portal"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
            aria-label="View source code on GitHub (opens in new tab)"
          >
            <v-icon size="14" class="mr-1" aria-hidden="true"
              >mdi-github</v-icon
            >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * @fileoverview Footer component displaying copyright information and GitHub link
 * @description Footer component showing copyright with current year and link to source code on GitHub
 */

/** @type {number} Current year for copyright display */
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-wrapper {
  flex-shrink: 0;
  background: rgb(var(--v-theme-surface)) !important;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.15);
  padding: 1rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.footer-copyright {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.875rem;
}

.copyright-text {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  color: rgb(var(--v-theme-primary)) !important;
  text-decoration: none;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.footer-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-copyright {
    font-size: 0.75rem;
    justify-content: center;
  }

  .footer-links {
    justify-content: center;
  }

  .footer-link {
    font-size: 0.75rem;
  }
}

@media (max-width: 400px) {
  .footer-copyright {
    font-size: 0.7rem;
  }

  .footer-link {
    font-size: 0.7rem;
  }
}
</style>
