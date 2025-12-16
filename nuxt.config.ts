export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  
  modules: [
    '@nuxt/content',
    'vuetify-nuxt-module'
  ],

  content: {
    renderer: {
      // Don't wrap headings in anchor links (keeps ## as plain H2, ### as plain H3)
      anchorLinks: false,
    },
  },

  vuetify: {
    moduleOptions: {
      styles: true
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            colors: {
              background: '#FFFFFF',
              surface: '#FFFFFF',
              'surface-variant': '#F8FAFC',
              primary: '#2563EB',
              'primary-darken-1': '#1D4ED8',
              'on-surface': '#1E293B',
              'on-surface-variant': '#475569',
              secondary: '#424242',
              'secondary-darken-1': '#212121',
              accent: '#2563EB',
              error: '#B00020',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
            },
          },
          dark: {
            colors: {
              background: '#0F172A',
              surface: '#1E293B',
              'surface-variant': '#1A2332',
              primary: '#60A5FA',
              'primary-darken-1': '#3B82F6',
              'on-surface': '#F8FAFC',
              'on-surface-variant': '#CBD5E1',
              secondary: '#B0B0B0',
              'secondary-darken-1': '#E0E0E0',
              accent: '#60A5FA',
              error: '#CF6679',
              info: '#90CAF9',
              success: '#81C784',
              warning: '#FFB74D',
            },
          },
        },
      },
      icons: {
        defaultSet: 'mdi'
      }
    }
  },

  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  build: {
    transpile: ['vuetify']
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true
    }
  }
})
