<template>
  <v-footer
    :elevation="2"
    color="surface"
    class="mt-auto"
  >
    <v-container>
      <v-row>
        <!-- Social Media Icons -->
        <v-col cols="12" md="4">
          <div class="d-flex align-center mb-2">
            <span class="text-body-2 font-weight-medium mr-4">Follow Us:</span>
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="`Link to ICJIA on ${social.name}`"
              icon
              variant="text"
              size="small"
              class="mx-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Footer Links -->
        <v-col cols="12" md="4">
          <div class="d-flex flex-wrap">
            <v-btn
              v-for="link in footerLinks"
              :key="link.text"
              :to="link.to"
              variant="text"
              size="small"
              class="mr-2 mb-1"
            >
              {{ link.text }}
            </v-btn>
          </div>
        </v-col>

        <!-- Copyright -->
        <v-col cols="12" md="4">
          <div class="text-body-2 text-md-right">
            <p class="mb-1">&copy; {{ currentYear }} Illinois Criminal Justice Information Authority</p>
            <p class="text-caption">All rights reserved.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'Facebook', icon: 'mdi-facebook', url: '#' },
  { name: 'YouTube', icon: 'mdi-youtube', url: '#' },
  { name: 'Instagram', icon: 'mdi-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'mdi-linkedin', url: '#' },
]

const footerLinks = [
  { text: 'About', to: '#' },
  { text: 'Contact', to: '#' },
  { text: 'Search', to: '#' },
  { text: 'Privacy', to: '#' },
  { text: 'FOIA', to: '#' },
]
</script>

