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
              surface: '#F5F5F5',
              primary: '#1565C0',
              'primary-darken-1': '#0D47A1',
              secondary: '#424242',
              'secondary-darken-1': '#212121',
              accent: '#82B1FF',
              error: '#B00020',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
            },
          },
          dark: {
            colors: {
              background: '#121212',
              surface: '#1E1E1E',
              primary: '#90CAF9',
              'primary-darken-1': '#64B5F6',
              secondary: '#B0B0B0',
              'secondary-darken-1': '#E0E0E0',
              accent: '#82B1FF',
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
    prerender: {
      crawlLinks: true
    }
  }
})
