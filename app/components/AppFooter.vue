<template>
  <v-footer class="footer-wrapper">
    <v-container>
      <div class="footer-content">
        <!-- Logo -->
        <div class="footer-brand">
          <img
            src="https://icjia.illinois.gov/icjia-logo.png"
            alt="Illinois Criminal Justice Information Authority Logo"
            class="footer-logo"
          />
        </div>

        <!-- Social Media Icons -->
        <div class="social-section">
          <v-btn
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :aria-label="`Follow ICJIA on ${social.name}`"
            icon
            variant="text"
            size="small"
            class="social-icon mx-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon size="20">{{ social.icon }}</v-icon>
          </v-btn>
        </div>

        <!-- Footer Links -->
        <div class="footer-links">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.text"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            {{ link.text }}
          </NuxtLink>
        </div>

        <!-- Copyright -->
        <div class="footer-copyright">
          <span class="copyright-text"> &copy; {{ currentYear }} ICJIA </span>
          <span class="copyright-divider">•</span>
          <span class="copyright-address">Chicago, IL</span>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    icon: "mdi-facebook",
    url: "https://www.facebook.com/ABORTICJIA/",
  },
  {
    name: "YouTube",
    icon: "mdi-youtube",
    url: "https://www.youtube.com/@icaborticjia5734",
  },
  {
    name: "Instagram",
    icon: "mdi-instagram",
    url: "https://www.instagram.com/icaborticjia/",
  },
  {
    name: "LinkedIn",
    icon: "mdi-linkedin",
    url: "https://www.linkedin.com/company/illinois-criminal-justice-information-authority/",
  },
];

const footerLinks = [
  { text: "Contact", to: "/" },
  { text: "Search", to: "/search" },
];
</script>

<style scoped>
.footer-wrapper {
  flex-shrink: 0;
  background: rgb(var(--v-theme-surface)) !important;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.15);
  padding: 1rem 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-brand {
  display: flex;
  align-items: center;
}

.footer-logo {
  height: 32px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.85;
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
  align-items: center;
  gap: 0.25rem;
}

.social-icon {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.6;
  transition: all 0.2s ease;
}

.social-icon:hover {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-link {
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.footer-link:hover {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.footer-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.footer-copyright {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.5;
}

.copyright-text,
.copyright-address {
  color: rgb(var(--v-theme-on-surface));
}

.copyright-divider {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.5;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
