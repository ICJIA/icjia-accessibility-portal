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
          aria-label="Visit Illinois Criminal Justice Information Authority website (opens in new tab)"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true"
            >mdi-copyright</v-icon
          >
          <span
            >{{ currentYear }} Illinois Criminal Justice Information
            Authority</span
          >
        </a>
      </div>

      <!-- Links Section -->
      <nav class="footer-links" aria-label="Footer navigation">
        <a
          href="/faqs-print"
          class="footer-link"
          aria-label="View printer-friendly version of FAQs"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true"
            >mdi-printer</v-icon
          >
          <span>Print FAQs</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/docs/architecture"
          class="footer-link"
          aria-label="View site architecture documentation"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true"
            >mdi-file-document-outline</v-icon
          >
          <span>Site Architecture</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="/docs/accessibility/"
          class="footer-link"
          aria-label="View accessibility audit report"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true"
            >mdi-check-circle</v-icon
          >
          <span>Accessibility Report</span>
        </a>
        <span class="footer-separator" aria-hidden="true">•</span>
        <a
          href="https://github.com/ICJIA/icjia-accessibility-portal"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          aria-label="View source code on GitHub (opens in new tab)"
        >
          <v-icon size="16" class="mr-1" aria-hidden="true"
            >mdi-github</v-icon
          >
          <span>GitHub</span>
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * @fileoverview Footer component with copyright, links, and navigation
 * @description Modern, centered footer with ICJIA copyright, printer-friendly link,
 * accessibility report, and GitHub repository link. Responsive and fully accessible.
 */

/** @type {number} Current year for copyright display */
const currentYear = new Date().getFullYear();
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
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.copyright-link:hover {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
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
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.footer-link:hover {
  opacity: 0.8;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  background: rgba(var(--v-theme-primary), 0.1);
}

.footer-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  background: rgba(var(--v-theme-primary), 0.15);
}

.footer-separator {
  color: rgba(var(--v-theme-on-surface), 0.5);
  font-size: 1rem;
  line-height: 1;
  user-select: none;
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
  }

  .footer-link {
    font-size: 0.8125rem;
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
  }

  .footer-link {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
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
  }

  .copyright-link span {
    display: inline;
  }

  .footer-link {
    font-size: 0.7rem;
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
