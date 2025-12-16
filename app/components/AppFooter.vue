<template>
  <v-footer class="footer-wrapper">
    <v-container>
      <div class="footer-content">
        <!-- Logo -->
        <div class="footer-brand">
          <img
            src="/icjia-logo.png"
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
  height: 40px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  opacity: 0.9;
  transition: opacity 0.2s ease;
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

@media (max-width: 960px) {
  .footer-content {
    gap: 1rem;
  }

  .footer-logo {
    height: 36px;
    max-width: 180px;
  }
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }

  .footer-logo {
    height: 32px;
    max-width: 150px;
  }

  .social-section {
    justify-content: center;
  }

  .footer-copyright {
    font-size: 0.7rem;
    text-align: center;
  }
}

@media (max-width: 400px) {
  .footer-logo {
    height: 28px;
    max-width: 120px;
  }

  .footer-copyright {
    flex-direction: column;
    gap: 0.25rem;
  }

  .copyright-divider {
    display: none;
  }
}
</style>
