<template>
  <a
    href="#main-content"
    class="skip-link"
    @click="handleClick"
  >
    Skip to main content
  </a>
</template>

<script setup lang="ts">
const handleClick = (e: Event) => {
  e.preventDefault()
  const target = document.getElementById('main-content')
  if (target) {
    target.focus()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--v-primary-base);
  color: var(--v-on-primary-base);
  padding: 8px 16px;
  text-decoration: none;
  z-index: 1000;
  border-radius: 0 0 4px 0;
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid var(--v-primary-base);
  outline-offset: 2px;
}
</style>

