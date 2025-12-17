<template>
  <footer class="footer-wrapper">
    <div class="footer-container">
      <div class="footer-copyright">
        <span class="copyright-text"
          >&copy; {{ currentYear }} Illinois Criminal Justice Information
          Authority</span
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-wrapper {
  flex-shrink: 0;
  background: rgb(var(--v-theme-surface)) !important;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.15);
  padding: 1rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.875rem;
  width: 100%;
}

.copyright-text {
  color: rgb(var(--v-theme-on-surface)) !important;
}

@media (max-width: 600px) {
  .footer-copyright {
    font-size: 0.75rem;
  }
}

@media (max-width: 400px) {
  .footer-copyright {
    font-size: 0.7rem;
  }
}
</style>
