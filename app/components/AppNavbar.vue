<template>
  <v-app-bar :elevation="2" color="surface">
    <v-container class="d-flex align-center pa-0">
      <!-- Logo -->
      <v-app-bar-title class="d-flex align-center">
        <a
          href="/"
          class="d-flex align-center text-decoration-none logo-link"
          style="color: inherit"
          aria-label="ICJIA Accessibility Portal - Go to home page"
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

      <!-- Navigation Links -->
      <template v-if="showDesktopNav">
        <v-btn
          v-for="item in navItems"
          :key="item.to"
          :href="item.to"
          :download="item.download || undefined"
          :target="item.target || undefined"
          :rel="item.rel || undefined"
          variant="text"
          class="nav-btn"
          :prepend-icon="item.icon"
          :aria-label="item.ariaLabel || `Navigate to ${item.title}`"
          :aria-current="route.path === item.to ? 'page' : undefined"
        >
          {{ item.title }}
        </v-btn>
      </template>

      <!-- Mobile Navigation Menu -->
      <v-menu
        v-if="showMobileMenu"
        location="bottom"
        class="d-flex"
        v-model="menuOpen"
      >
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            icon
            variant="text"
            aria-label="Open navigation menu"
            aria-haspopup="true"
            :aria-expanded="menuOpen"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in navItems"
            :key="item.to"
            :href="item.to"
            :download="item.download || undefined"
            :target="item.target || undefined"
            :rel="item.rel || undefined"
            :prepend-icon="item.icon"
            :aria-current="route.path === item.to ? 'page' : undefined"
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

      <!-- Search Button with Label - Desktop only -->
      <v-btn
        v-if="showDesktopNav"
        href="/search"
        variant="text"
        class="search-btn"
        prepend-icon="mdi-magnify"
        aria-label="Search FAQs"
        :aria-current="route.path === '/search' ? 'page' : undefined"
      >
        Search
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
/**
 * @fileoverview Navigation bar component with logo and navigation links
 * @description AppNavbar provides the main navigation with logo, navigation items,
 * and mobile menu support. Includes aria-current support for active page indication.
 */

import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const { width } = useDisplay();

const showMobileMenu = computed(() => width.value < 961);
const showDesktopNav = computed(() => width.value >= 961);

const route = useRoute();
const { collapseAll } = useFaqCollapse();
const menuOpen = ref(false);

interface NavItem {
  title: string;
  to: string;
  icon: string;
  target?: string;
  rel?: string;
  download?: string;
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
    to: "/faqs.pdf",
    icon: "mdi-download",
    download: "ICJIA-Accessibility-FAQs.pdf",
    ariaLabel: "Download FAQs as PDF",
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
</script>

<style scoped>
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
}

.nav-btn {
  min-width: auto;
  padding: 0 12px;
  margin: 0 4px;
}

.search-btn {
  margin-right: 4px;
  color: rgb(var(--v-theme-primary));
}

.search-btn:hover {
  background: rgba(var(--v-theme-primary), 0.1);
}

@media (max-width: 960px) {
  .nav-btn {
    font-size: 0.875rem;
    padding: 0 4px;
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

  .v-container {
    padding-left: 12px;
    padding-right: 8px;
  }
}
</style>
