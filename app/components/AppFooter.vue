<template>
  <v-footer class="footer-wrapper py-6">
    <v-container>
      <!-- Top Row: Social Icons and Links -->
      <v-row class="align-center mb-4">
        <!-- Social Media Icons -->
        <v-col cols="12" md="auto" class="d-flex align-center justify-center justify-md-start mb-4 mb-md-0">
          <v-btn
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :aria-label="`Link to ICJIA on ${social.name}`"
            icon
            variant="text"
            size="small"
            class="social-icon mx-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon size="20">{{ social.icon }}</v-icon>
          </v-btn>
        </v-col>

        <!-- Divider (visible on desktop) -->
        <v-col cols="auto" class="d-none d-md-flex">
          <v-divider vertical class="mx-4 footer-divider" />
        </v-col>

        <!-- Footer Links -->
        <v-col cols="12" md="auto" class="flex-grow-1">
          <div class="d-flex flex-wrap justify-center justify-md-start footer-links">
            <NuxtLink
              v-for="link in footerLinks"
              :key="link.text"
              :to="link.to"
              class="footer-link"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </v-col>
      </v-row>

      <!-- Divider -->
      <v-divider class="footer-divider my-4" />

      <!-- Bottom Row: Copyright and Agency Info -->
      <v-row class="align-center">
        <v-col cols="12" md="8">
          <div class="footer-agency-info">
            <p class="mb-1 agency-name">Illinois Criminal Justice Information Authority</p>
            <p class="agency-address">60 E. Van Buren St., Suite 725 | Chicago, IL 60605</p>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-right">
          <p class="copyright">&copy; {{ currentYear }} State of Illinois</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'Facebook', icon: 'mdi-facebook', url: 'https://www.facebook.com/ABORTICJIA/' },
  { name: 'YouTube', icon: 'mdi-youtube', url: 'https://www.youtube.com/@icaborticjia5734' },
  { name: 'Instagram', icon: 'mdi-instagram', url: 'https://www.instagram.com/icaborticjia/' },
  { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://www.linkedin.com/company/illinois-criminal-justice-information-authority/' },
]

const footerLinks = [
  { text: 'About', to: '/' },
  { text: 'Contact', to: '/' },
  { text: 'Search', to: '/search' },
  { text: 'FOIA', to: '/' },
  { text: 'Privacy', to: '/' },
  { text: 'Accessibility', to: '/' },
]
</script>

<style scoped>
.footer-wrapper {
  flex-shrink: 0;
  background: rgb(var(--v-theme-surface)) !important;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.social-icon {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.8;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.social-icon:hover {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.footer-divider {
  border-color: rgba(var(--v-theme-on-surface), 0.12) !important;
}

.footer-links {
  gap: 0.5rem;
}

.footer-link {
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  opacity: 0.8;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

.footer-link:hover {
  opacity: 1;
  background-color: rgba(var(--v-theme-on-surface), 0.08);
}

.footer-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.footer-agency-info {
  text-align: center;
}

@media (min-width: 960px) {
  .footer-agency-info {
    text-align: left;
  }
}

.agency-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.9;
}

.agency-address {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.6;
  margin-bottom: 0;
}

.copyright {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.6;
  margin-bottom: 0;
}
</style>
