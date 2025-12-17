<template>
  <v-app-bar :elevation="2" color="surface">
    <v-container class="d-flex align-center pa-0">
      <!-- Logo -->
      <v-app-bar-title class="d-flex align-center">
        <a
          href="/"
          class="d-flex align-center text-decoration-none logo-link"
          style="color: inherit"
          @click="handleLogoClick"
        >
          <img
            src="/icjia-logo.png"
            alt="Illinois Criminal Justice Information Authority"
            class="navbar-logo"
          />
          <span class="text-caption ml-3 text-medium-emphasis"
            >Accessibility Portal</span
          >
        </a>
      </v-app-bar-title>

      <v-spacer />

      <!-- Navigation Links -->
      <v-btn
        v-for="item in navItems"
        :key="item.to"
        :href="item.to"
        variant="text"
        class="nav-btn d-none d-sm-flex"
        :prepend-icon="item.icon"
        :aria-label="`Navigate to ${item.title}`"
        :aria-current="route.path === item.to ? 'page' : undefined"
      >
        {{ item.title }}
      </v-btn>

      <!-- Mobile Navigation Menu -->
      <v-menu
        v-if="mobile"
        location="bottom"
        class="d-flex d-sm-none"
        v-model="menuOpen"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            variant="text"
            aria-label="Navigation menu"
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
            :prepend-icon="item.icon"
            :aria-current="route.path === item.to ? 'page' : undefined"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            href="https://icjia.illinois.gov"
            target="_blank"
            rel="noopener noreferrer"
            prepend-icon="mdi-open-in-new"
          >
            <v-list-item-title>ICJIA Website</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Desktop External ICJIA Link -->
      <v-btn
        href="https://icjia.illinois.gov"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        class="mx-1 d-none d-sm-flex"
        prepend-icon="mdi-open-in-new"
      >
        ICJIA Website
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const route = useRoute();
const { collapseAll } = useFaqCollapse();
const menuOpen = ref(false);

const navItems = [
  { title: "Home", to: "/", icon: "mdi-home" },
  { title: "Links", to: "/links", icon: "mdi-link" },
  { title: "FAQs", to: "/faqs", icon: "mdi-help-circle" },
];

/**
 * Handle logo click: if on home page, collapse all FAQs and scroll to top.
 * Otherwise, navigate to home page normally.
 */
function handleLogoClick(event: MouseEvent) {
  const isHomePage = route.path === "/";

  if (isHomePage) {
    // Prevent default navigation since we're already on home
    event.preventDefault();

    // Collapse all FAQ panels
    collapseAll();

    // Clear any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }

    // Scroll to top of page smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // If not on home page, let the default navigation happen
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

.navbar-logo {
  height: 40px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
}

.nav-btn {
  min-width: auto;
  padding: 0 12px;
  margin: 0 4px;
}

@media (max-width: 960px) {
  .nav-btn {
    font-size: 0.875rem;
    padding: 0 4px;
  }
}

@media (max-width: 600px) {
  .navbar-logo {
    height: 32px;
    max-width: 120px;
  }

  .v-app-bar-title .text-caption {
    font-size: 0.65rem;
    margin-left: 0.5rem;
  }

  .v-container {
    padding-left: 8px;
    padding-right: 8px;
  }
}

@media (max-width: 400px) {
  .navbar-logo {
    height: 28px;
    max-width: 100px;
  }

  .v-app-bar-title .text-caption {
    font-size: 0.6rem;
    margin-left: 0.25rem;
  }
}
</style>
