<template>
  <div class="app-wrapper">
    <SkipLink />
    <AppNavbar />
    <v-main id="main-content" tabindex="-1" class="main-content">
      <slot />
    </v-main>
    <AppFooter />
  </div>
</template>

<style>
/* App wrapper for sticky footer */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1 0 auto;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus indicators for accessibility */
*:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}
</style>
