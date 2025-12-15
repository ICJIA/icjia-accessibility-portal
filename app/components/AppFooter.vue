<template>
  <v-footer class="footer-wrapper">
    <v-container>
      <!-- Logo and Branding Section -->
      <div class="footer-brand text-center mb-6">
        <img 
          src="https://icjia.illinois.gov/icjia-logo.png" 
          alt="Illinois Criminal Justice Information Authority Logo"
          class="footer-logo"
        />
      </div>

      <!-- Social Media Icons -->
      <div class="social-section text-center mb-6">
        <v-btn
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          :aria-label="`Follow ICJIA on ${social.name}`"
          icon
          variant="text"
          size="large"
          class="social-icon mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon size="24">{{ social.icon }}</v-icon>
        </v-btn>
      </div>

      <!-- Footer Links -->
      <div class="footer-links text-center mb-6">
        <NuxtLink
          v-for="link in footerLinks"
          :key="link.text"
          :to="link.to"
          class="footer-link"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <!-- Divider -->
      <v-divider class="footer-divider mb-6" />

      <!-- Copyright -->
      <div class="footer-copyright text-center">
        <p class="copyright-text mb-1">
          &copy; {{ currentYear }} Illinois Criminal Justice Information Authority
        </p>
        <p class="copyright-address">
          60 E. Van Buren St., Suite 725 • Chicago, IL 60605
        </p>
      </div>
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
  { text: 'Contact', to: '/' },
  { text: 'Search', to: '/search' },
]
</script>

<style scoped>
.footer-wrapper {
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    rgba(var(--v-theme-surface), 1) 0%,
    rgba(var(--v-theme-surface), 0.95) 100%
  ) !important;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.2);
  padding: 3rem 0 2rem;
}

.footer-brand {
  padding-top: 1rem;
}

.footer-logo {
  max-height: 80px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

/* Light mode logo adjustment */
:root[data-theme="light"] .footer-logo,
.v-theme--light .footer-logo {
  filter: none;
  opacity: 1;
}

.footer-logo:hover {
  opacity: 1;
}

.social-section {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.social-icon {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
}

.social-icon:hover {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.2);
  transform: translateY(-2px);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-link {
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  opacity: 0.8;
  transition: all 0.2s ease;
  background: rgba(var(--v-theme-primary), 0.08);
}

.footer-link:hover {
  opacity: 1;
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
}

.footer-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.footer-divider {
  max-width: 200px;
  margin: 0 auto;
  border-color: rgba(var(--v-theme-primary), 0.2) !important;
}

.footer-copyright {
  opacity: 0.7;
}

.copyright-text {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 0.25rem;
}

.copyright-address {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.8;
  margin-bottom: 0;
}
</style>
