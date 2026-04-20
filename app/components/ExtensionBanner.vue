<template>
  <aside
    v-if="visible"
    class="extension-banner"
    role="region"
    aria-labelledby="extension-banner-heading"
  >
    <div class="extension-banner-inner">
      <div class="extension-banner-body">
        <h2 id="extension-banner-heading" class="extension-banner-heading">
          <span class="extension-banner-badge" aria-hidden="true">Updated</span>
          ADA Title II compliance deadline extended to April 26, 2027
        </h2>
        <p class="extension-banner-text">
          On April 20, 2026, the U.S. Department of Justice published an
          <a
            href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web"
            target="_blank"
            rel="noopener noreferrer"
            class="extension-banner-link"
          >Interim Final Rule</a>
          extending the web accessibility compliance date by one year. Illinois
          state agencies (50,000+ population) now have until
          <strong>April 26, 2027</strong> (previously April 24, 2026). The
          WCAG 2.1 Level AA standard is unchanged — only the compliance date
          moved. Agencies already planning or remediating should continue; the
          extra year is for implementation, not delay.
        </p>
        <p class="extension-banner-sources">
          Sources:
          <a
            href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web"
            target="_blank"
            rel="noopener noreferrer"
            class="extension-banner-link"
          >Federal Register</a>
          ·
          <a
            href="https://www.govtech.com/policy/federal-accessibility-deadline-will-be-delayed-one-year"
            target="_blank"
            rel="noopener noreferrer"
            class="extension-banner-link"
          >Government Technology</a>
        </p>
      </div>
      <button
        type="button"
        class="extension-banner-dismiss"
        aria-label="Dismiss deadline extension notice"
        @click="dismiss"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'icjia-extension-banner-dismissed-2026-04-20'

// Banner auto-expires 10 days after the DOJ extension announcement (April 20, 2026).
// After April 30, 2026 at midnight Chicago time, the banner is hidden for everyone —
// the permanent notice inside the countdown timer continues to communicate the extension.
const BANNER_EXPIRY = new Date('2026-04-30T00:00:00-05:00').getTime()

// Date check runs at setup (both SSR and client) so server and client agree on whether
// the banner should render. The dismissal check only runs on mount because localStorage
// is not available during SSR.
const withinWindow = Date.now() < BANNER_EXPIRY
const visible = ref(withinWindow)

onMounted(() => {
  if (!withinWindow) return
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === '1') {
      visible.value = false
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — keep banner visible
  }
})

function dismiss() {
  visible.value = false
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // ignore
  }
}
</script>

<style scoped>
.extension-banner {
  background: #0F172A;
  color: #FFFFFF;
  border-bottom: 3px solid #F59E0B;
}

.extension-banner-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.extension-banner-body {
  flex: 1;
  min-width: 0;
}

.extension-banner-heading {
  margin: 0 0 6px 0;
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.35;
  color: #FFFFFF;
}

.extension-banner-badge {
  display: inline-block;
  background: #F59E0B;
  color: #0F172A;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 8px;
  vertical-align: middle;
}

.extension-banner-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #F1F5F9;
}

.extension-banner-sources {
  margin: 6px 0 0 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #CBD5E1;
}

.extension-banner-link {
  color: #FBBF24;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 600;
}

.extension-banner-link:hover,
.extension-banner-link:focus-visible {
  color: #FDE68A;
  text-decoration-thickness: 2px;
}

.extension-banner-link:focus-visible {
  outline: 2px solid #FBBF24;
  outline-offset: 2px;
  border-radius: 2px;
}

.extension-banner-dismiss {
  flex-shrink: 0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #FFFFFF;
  font-size: 1.5rem;
  line-height: 1;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.extension-banner-dismiss:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.6);
}

.extension-banner-dismiss:focus-visible {
  outline: 2px solid #FBBF24;
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .extension-banner-inner {
    padding: 12px 16px;
    gap: 12px;
  }

  .extension-banner-heading {
    font-size: 1rem;
  }

  .extension-banner-text {
    font-size: 0.875rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .extension-banner-dismiss {
    transition: none;
  }
}

@media print {
  .extension-banner {
    display: none;
  }
}
</style>
