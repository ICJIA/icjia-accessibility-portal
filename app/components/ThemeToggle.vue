<template>
  <v-btn
    :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
    variant="text"
    @click="toggleTheme"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.name.value === 'dark')

const toggleTheme = () => {
  theme.toggle()
}
</script>

