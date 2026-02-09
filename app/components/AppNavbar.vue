<template>
  <v-app-bar :elevation="2" color="surface" height="64">
    <v-container class="d-flex align-center pa-0">
      <!-- Logo -->
      <v-app-bar-title class="d-flex align-center">
        <a
          href="/"
          class="d-flex align-center text-decoration-none logo-link"
          style="color: inherit"
          aria-label="Accessibility Portal - Go to home page"
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
          :prepend-icon="item.icon"
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
              <v-icon>mdi-menu</v-icon>
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
              prepend-icon="mdi-magnify"
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
          class="search-btn"
          prepend-icon="mdi-magnify"
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
    icon: "mdi-home",
  },
  {
    title: "Print",
    to: "/faqs-print",
    icon: "mdi-printer",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    title: "Download",
    to: "#download",
    icon: "mdi-download",
    isDownload: true,
    ariaLabel: "Download FAQs - choose format",
  },
  {
    title: "Links",
    to: "/links",
    icon: "mdi-link",
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
/* Responsive nav: CSS controls visibility (no Vuetify d-flex to avoid !important conflicts) */
.desktop-nav {
  display: none !important;
}
.mobile-nav {
  display: flex !important;
  align-items: center;
}
/* Hamburger only on small/xs screens (<600px). Full nav on everything else. */
@media (min-width: 600px) {
  .desktop-nav {
    display: flex !important;
    align-items: center;
  }
  .mobile-nav {
    display: none !important;
  }
}

.v-app-bar-title a {
  transition: opacity 0.2s ease;
}

.v-app-bar-title a:hover {
  opacity: 0.8;
  cursor: pointer;
}

.portal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: 0.01em;
}

.navbar-logo {
  height: 40px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
}

.logo-link {
  margin-left: 12px;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px !important;
  min-width: 44px !important;
  height: auto;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

.nav-btn {
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-width: 44px !important;
  min-height: 44px !important;
  padding: 0 12px;
  margin: 0 4px;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher contrast color */
  /* Light theme: darker blue (#1D4ED8) for better contrast on white */
  /* Dark theme: lighter blue (#93C5FD) for better contrast on dark surface */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .nav-btn,
.v-theme--dark .nav-btn {
  color: #93c5fd !important; /* Lighter blue for 7:1+ contrast on dark background */
}

.nav-btn:hover {
  /* Maintain AAA contrast on hover */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
}

[data-v-theme="dark"] .nav-btn:hover,
.v-theme--dark .nav-btn:hover {
  color: #93c5fd !important;
}

.search-btn {
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-width: 44px !important;
  min-height: 44px !important;
  margin-right: 4px;
  /* WCAG 1.4.6 Contrast (Enhanced) - AAA: Use higher contrast color */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
}

/* Dark theme: use lighter color for AAA contrast */
[data-v-theme="dark"] .search-btn,
.v-theme--dark .search-btn {
  color: #93c5fd !important; /* Lighter blue for 7:1+ contrast on dark background */
}

.search-btn:hover {
  background: rgba(var(--v-theme-primary), 0.1);
  /* Maintain AAA contrast on hover */
  color: rgb(var(--v-theme-primary-darken-1)) !important;
}

[data-v-theme="dark"] .search-btn:hover,
.v-theme--dark .search-btn:hover {
  color: #93c5fd !important;
}

@media (max-width: 960px) {
  .nav-btn {
    font-size: 0.875rem;
    padding: 0 8px;
    /* Maintain 44x44px minimum even on mobile - WCAG 2.5.5 Enhanced AAA */
    min-width: 44px !important;
    min-height: 44px !important;
  }

  .v-container {
    padding-left: 16px;
    padding-right: 8px;
  }
}

@media (max-width: 600px) {
  .navbar-logo {
    height: 32px;
    max-width: 120px;
  }

  .portal-title {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }

  .logo-link {
    /* Maintain 44x44px minimum on mobile - WCAG 2.5.5 Enhanced AAA */
    min-height: 44px !important;
    min-width: 44px !important;
    padding: 6px 10px;
    box-sizing: border-box;
  }

  .v-container {
    padding-left: 16px;
    padding-right: 8px;
  }
}

@media (max-width: 400px) {
  .navbar-logo {
    height: 28px;
    max-width: 100px;
  }

  .portal-title {
    font-size: 0.75rem;
    margin-left: 0.25rem;
  }

  .logo-link {
    /* Maintain 44x44px minimum on small mobile - WCAG 2.5.5 Enhanced AAA */
    min-height: 44px !important;
    min-width: 44px !important;
    padding: 8px 10px;
    box-sizing: border-box;
  }

  .v-container {
    padding-left: 12px;
    padding-right: 8px;
  }
}
</style>
