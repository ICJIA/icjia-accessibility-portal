<!--
  @fileoverview Print layout component
  @description Minimal layout for printer-friendly pages without navbar/footer
  Provides clean output suitable for printing or saving as PDF
-->
<template>
  <div class="print-layout-wrapper">
    <SkipLink />
    <v-main id="main-content" class="print-main-content" tabindex="-1">
      <slot />
    </v-main>
  </div>
</template>

<style scoped>
/* Print layout wrapper */
.print-layout-wrapper {
  min-height: 100vh;
  background: #fff;
}

.print-main-content {
  width: 100%;
  padding: 0;
}

/* Ensure no Vuetify padding/margins interfere */
.print-main-content :deep(.v-main__wrap) {
  padding: 0;
}

/* Hide any Vuetify overlays or nav elements that might appear */
:deep(.v-overlay-container),
:deep(.v-app-bar),
:deep(footer),
:deep(nav) {
  display: none !important;
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

/* Print-specific: ensure nothing else appears */
@media print {
  .print-layout-wrapper {
    background: #fff;
  }
  
  /* Hide any potential navigation or UI elements */
  :deep(.v-overlay-container),
  :deep(.v-app-bar),
  :deep(footer),
  :deep(nav),
  :deep(.v-navigation-drawer),
  :deep(.v-menu),
  :deep(.v-dialog) {
    display: none !important;
  }
}
</style>

