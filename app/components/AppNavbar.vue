<template>
  <v-app-bar :elevation="0" color="background" height="64" class="site-bar">
    <v-container class="d-flex align-center py-0">
      <!-- Logo -->
      <v-app-bar-title class="d-flex align-center">
        <a
          href="/"
          class="d-flex align-center text-decoration-none logo-link"
          style="color: inherit"
          @click="handleLogoClick"
        >
          <!-- Brand mark: the same outline globe as audit.icjia.app, in its
               light purple of this site's brand. Decoration only; the link's name is the text. -->
          <svg
            class="brand-mark"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <ellipse cx="12" cy="12" rx="4.2" ry="10" />
            <path d="M2 12h20M3.6 7h16.8M3.6 17h16.8" />
          </svg>
          <span class="portal-title">ICJIA Accessibility Portal</span>
        </a>
      </v-app-bar-title>

      <v-spacer />

      <!-- Navigation Links - CSS-based visibility (avoids hydration mismatch from useDisplay) -->
      <div class="desktop-nav">
        <v-btn
          v-for="item in navItems"
          :key="item.to"
          :href="item.isDownload ? undefined : item.to"
          :target="item.target || undefined"
          :rel="item.rel || undefined"
          variant="text"
          class="nav-btn"
          :aria-label="item.ariaLabel || `Navigate to ${item.title}`"
          :aria-current="
            !item.isDownload && route.path === item.to ? 'page' : undefined
          "
          @click="item.isDownload ? openDownloadDialog($event) : undefined"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <!-- Mobile Navigation Menu -->
      <div class="mobile-nav">
        <v-menu location="bottom" v-model="menuOpen">
          <template #activator="{ props: menuProps }">
            <v-btn
              v-bind="menuProps"
              icon
              variant="text"
              aria-label="Open navigation menu"
              aria-haspopup="true"
              :aria-expanded="menuOpen"
              style="min-width: 44px; min-height: 44px"
            >
              <v-icon :icon="mdiMenu" />
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in navItems"
              :key="item.to"
              :href="item.isDownload ? undefined : item.to"
              :target="item.target || undefined"
              :rel="item.rel || undefined"
              :prepend-icon="item.icon"
              :aria-current="
                !item.isDownload && route.path === item.to ? 'page' : undefined
              "
              @click="item.isDownload ? openDownloadDialog($event) : undefined"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              href="/search"
              :prepend-icon="mdiMagnify"
              :aria-current="route.path === '/search' ? 'page' : undefined"
            >
              <v-list-item-title>Search</v-list-item-title>
            </v-list-item>
            <v-list-item
              :href="AUDIT_URL"
              target="_blank"
              rel="noopener noreferrer"
              :prepend-icon="mdiFileCheckOutline"
            >
              <v-list-item-title class="external-title">
                Audit PDF
                <svg class="external-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span class="sr-only">(opens audit.icjia.app in a new tab)</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Search Button with Label - Desktop only -->
      <div class="desktop-nav">
        <v-btn
          href="/search"
          variant="text"
          class="search-btn nav-btn"
          aria-label="Search FAQs"
          :aria-current="route.path === '/search' ? 'page' : undefined"
        >
          Search
        </v-btn>
        <!-- LAST on purpose: the one link here that leaves this site. -->
        <v-btn
          :href="AUDIT_URL"
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
          class="nav-btn external-btn"
        >
          Audit PDF
          <svg class="external-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          <span class="sr-only">(opens audit.icjia.app in a new tab)</span>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Download Dialog -->
  <DownloadDialog v-model="showDownloadDialog" />
</template>

<script setup lang="ts">
/**
 * @fileoverview Navigation bar component with logo and navigation links
 * @description AppNavbar provides the main navigation with logo, navigation items,
 * and mobile menu support. Includes aria-current support for active page indication.
 */

import { ref } from "vue";
import { mdiHome, mdiPrinter, mdiDownload, mdiFileCheckOutline, mdiLink, mdiMenu, mdiMagnify, mdiShieldCheckOutline } from "~/utils/icons";

const route = useRoute();
const { collapseAll } = useFaqCollapse();
const menuOpen = ref(false);
const showDownloadDialog = ref(false);

interface NavItem {
  title: string;
  to: string;
  icon: string;
  target?: string;
  rel?: string;
  isDownload?: boolean;
  ariaLabel?: string;
}

/** ICJIA's document checker; the "Audit PDF" link, placed last in the nav. */
const AUDIT_URL = "https://audit.icjia.app";

const navItems: NavItem[] = [
  {
    title: "Home",
    to: "/",
    icon: mdiHome,
  },
  {
    title: "Why trust this?",
    to: "/trust",
    icon: mdiShieldCheckOutline,
  },
  {
    title: "Print",
    to: "/faqs-print",
    icon: mdiPrinter,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    title: "Download",
    to: "#download",
    icon: mdiDownload,
    isDownload: true,
    ariaLabel: "Download FAQs - choose format",
  },
  {
    title: "Links",
    to: "/links",
    icon: mdiLink,
  },
];

function handleLogoClick(event: MouseEvent) {
  const isHomePage = route.path === "/";

  if (isHomePage) {
    event.preventDefault();
    collapseAll();

    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

function openDownloadDialog(event: MouseEvent) {
  event.preventDefault();
  menuOpen.value = false; // Close mobile menu if open
  showDownloadDialog.value = true;
}
</script>

<style scoped>
/* Plakat look: a flat black bar, a heavy uppercase wordmark, plain text links.
   The current page is marked with a white underline as well as aria-current. */
.site-bar {
  border-bottom: 1px solid var(--pk-border);
}

/* Responsive nav: CSS controls visibility (no Vuetify d-flex to avoid !important conflicts) */
.desktop-nav {
  display: none !important;
}
.mobile-nav {
  display: flex !important;
  align-items: center;
}
/* Menu button only below 1024px (seven text links and the wordmark need the
   room; at 1000px they touch). Full nav above. */
@media (min-width: 1024px) {
  .desktop-nav {
    display: flex !important;
    align-items: center;
  }
  .mobile-nav {
    display: none !important;
  }
}

/* The wordmark keeps its full width; the spacer beside it takes the rest. */
.v-app-bar-title {
  flex: 0 1 auto;
}

.v-app-bar-title a:hover {
  cursor: pointer;
}

.portal-title {
  font-size: 1.1875rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--pk-heading);
  white-space: nowrap;
}

/* The globe, in a light lavender (9:1 on the bar): the same mark as
   audit.icjia.app, in this site's purple rather than its cobalt. */
.brand-mark {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  margin-right: 10px;
  color: #b9a6e0;
}

/* "Audit PDF": the arrow-out-of-a-box icon says it leaves this site. */
.external-icon {
  flex-shrink: 0;
  width: 13px;
  height: 13px;
  margin-left: 5px;
  opacity: 0.75;
}

.external-title {
  display: inline-flex;
  align-items: center;
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

.logo-link {
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px !important;
  min-width: 44px !important;
  height: auto;
  padding: 4px 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

.nav-btn {
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-width: 44px !important;
  min-height: 44px !important;
  padding: 0 10px;
  margin: 0 2px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  /* 18:1 on the bar */
  color: var(--pk-text) !important;
}

.nav-btn:hover {
  color: var(--pk-heading) !important;
}

.nav-btn[aria-current="page"] {
  color: var(--pk-heading) !important;
  font-weight: 700;
  box-shadow: inset 0 -3px 0 var(--pk-heading);
}

@media (max-width: 960px) {
  .nav-btn {
    padding: 0 6px;
    margin: 0 1px;
  }
}

@media (max-width: 600px) {
  .brand-mark {
    width: 22px;
    height: 22px;
    margin-right: 8px;
  }

  .portal-title {
    font-size: 1rem;
  }
}

@media (max-width: 400px) {
  .portal-title {
    font-size: 0.875rem;
  }
}
</style>
