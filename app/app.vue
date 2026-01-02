<!--
  @fileoverview Root application component
  @description Main app component that wraps the entire application with Vuetify's v-app
-->
<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<style>
/* ============================================================
   Responsive markdown tables (global)

   Pattern:
   - Wrap markdown AST `table` nodes in a div.table-scroll-wrapper
   - Add a mobile-only, aria-hidden hint element .table-scroll-hint
   - Enable horizontal scrolling on small viewports
   ============================================================ */

.table-scroll-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  margin: 1rem 0;
  position: relative;
  border-radius: 6px;
}

/* Ensure wide tables can exceed viewport width */
.table-scroll-wrapper > table {
  width: max-content;
  min-width: 100%;
}

/* Mobile-only “scroll hint” + subtle right-edge gradient cue */
@media (max-width: 767px) {
  .table-scroll-hint {
    position: sticky;
    left: 0;
    display: block;
    width: fit-content;
    max-width: 100%;
    margin: 0 0 0.5rem 0;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: rgba(var(--v-theme-on-surface), 0.9);
    background: rgba(var(--v-theme-surface), 0.88);
    border: 1px solid rgba(var(--v-theme-on-surface), 0.18);
    border-radius: 999px;
    backdrop-filter: blur(6px);
  }

  .table-scroll-wrapper::after {
    content: "";
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(var(--v-theme-surface-variant), 0.95),
      rgba(var(--v-theme-surface-variant), 0)
    );
  }
}

/* Print: no scroll containers, no hints/gradients */
@media print {
  .table-scroll-hint {
    display: none !important;
  }
  .table-scroll-wrapper {
    overflow: visible !important;
  }
  .table-scroll-wrapper::after {
    display: none !important;
  }
  .table-scroll-wrapper > table {
    width: 100% !important;
    min-width: 100% !important;
  }
}
</style>
