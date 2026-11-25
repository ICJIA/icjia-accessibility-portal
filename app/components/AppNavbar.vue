<template>
  <v-app-bar :elevation="0" color="background" height="64" class="site-bar">
    <v-container class="d-flex align-center py-0">
      <!-- Logo -->
      <v-app-bar-title class="d-flex align-center">
        <a
          href="/"
          class="d-flex align-center text-decoration-none logo-link"
          style="color: inherit"
          aria-label="Accessibility Portal"
          @click="handleLogoClick"
        >
          <img
            src="/icjia-logo-1x.png"
            srcset="/icjia-logo-1x.png 1x, /icjia-logo-2x.png 2x"
            alt="Illinois Criminal Justice Information Authority"
            class="navbar-logo"
            loading="eager"
            fetchpriority="high"
            width="57"
            height="40"
            decoding="async"
          />
          <span class="portal-title ml-3">Accessibility Portal</span>
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
import { mdiHome, mdiPrinter, mdiDownload, mdiFileCheckOutline, mdiLink, mdiMenu, mdiMagnify } from "~/utils/icons";

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

const navItems: NavItem[] = [
  {
    title: "Home",
    to: "/",
    icon: mdiHome,
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
    title: "Check PDF",
    to: "https://audit.icjia.app",
    icon: mdiFileCheckOutline,
    target: "_blank",
    rel: "noopener noreferrer",
    ariaLabel: "Check PDF accessibility (opens in new tab)",
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
/* Menu button only below 900px (six text links need the room). Full nav above. */
@media (min-width: 900px) {
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
}

.navbar-logo {
  height: 36px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
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
  .navbar-logo {
    height: 32px;
    max-width: 120px;
  }

  .portal-title {
    font-size: 1rem;
    margin-left: 0.5rem !important;
  }
}

@media (max-width: 400px) {
  .navbar-logo {
    height: 28px;
    max-width: 100px;
  }

  .portal-title {
    font-size: 0.875rem;
  }
}
</style>
