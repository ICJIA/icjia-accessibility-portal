<template>
  <v-app-bar :elevation="2" color="surface">
    <v-container class="d-flex align-center pa-0">
      <!-- Logo placeholder -->
      <v-app-bar-title class="d-flex align-center">
        <NuxtLink
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-h6 font-weight-bold text-decoration-none"
          style="color: inherit"
        >
          ICJIA
        </NuxtLink>
        <span class="text-caption ml-2 text-medium-emphasis"
          >Accessibility Portal</span
        >
      </v-app-bar-title>

      <v-spacer />

      <!-- Navigation Links -->
      <v-btn
        v-for="item in navItems"
        :key="item.to"
        :href="item.to"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        class="mx-1"
        :prepend-icon="item.icon"
      >
        {{ item.title }}
      </v-btn>

      <!-- External ICJIA Link -->
      <v-btn
        href="https://icjia.illinois.gov"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        class="mx-1"
        prepend-icon="mdi-open-in-new"
      >
        ICJIA Website
      </v-btn>

      <!-- Search Button -->
      <v-btn
        href="/search"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        class="mx-1"
        icon
        aria-label="Search site"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Theme Toggle -->
      <ThemeToggle />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
const navItems = [
  { title: "Home", to: "/", icon: "mdi-home" },
  { title: "Links", to: "/links", icon: "mdi-link" },
  { title: "FAQs", to: "/faqs", icon: "mdi-help-circle" },
];
</script>

<style scoped>
.v-app-bar-title a {
  transition: opacity 0.2s ease;
}

.v-app-bar-title a:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
