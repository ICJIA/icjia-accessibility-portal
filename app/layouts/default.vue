<template>
  <div>
    <SkipLink />
    <AppNavbar />
    <v-main id="main-content" tabindex="-1">
      <slot />
    </v-main>
    <AppFooter />
  </div>
</template>

<style>
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
  outline: 3px solid var(--v-primary-base);
  outline-offset: 2px;
}
</style>

