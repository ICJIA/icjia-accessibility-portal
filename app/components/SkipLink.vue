<template>
  <a
    href="#main-content"
    class="skip-link"
    @click="handleClick"
    @keydown.enter="handleClick"
  >
    Skip to main content
  </a>
</template>

<script setup lang="ts">
const handleClick = (e: Event) => {
  e.preventDefault();
  const target = document.getElementById("main-content");
  if (target) {
    // Focus the main content area
    target.focus();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scroll to target with appropriate behavior
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
};
</script>

<style scoped>
.skip-link {
  /* Hide skip link off-screen until focused */
  position: absolute;
  top: -100px;
  left: 0;
  /* Use theme colors for proper contrast */
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  padding: 12px 24px;
  text-decoration: none;
  /* High z-index to ensure it's above all other content */
  z-index: 10000;
  border-radius: 0 0 4px 0;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  /* Ensure it's always accessible */
  clip: auto;
  clip-path: none;
  /* Smooth transition when appearing (respects reduced motion) */
  transition: top 0.2s ease-in-out;
}

/* Show skip link when focused - WCAG 2.1 AA requirement */
.skip-link:focus {
  top: 0;
  left: 0;
  /* High contrast outline for visibility */
  outline: 3px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  /* Add shadow for better visibility */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

/* Ensure skip link is visible and accessible with focus-visible */
.skip-link:focus-visible {
  top: 0;
  left: 0;
  outline: 3px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

/* Respect reduced motion preference - WCAG 2.1 AA requirement */
@media (prefers-reduced-motion: reduce) {
  .skip-link {
    transition: none;
  }
}

/* Ensure skip link is visible on all screen sizes */
@media (max-width: 600px) {
  .skip-link {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}
</style>
