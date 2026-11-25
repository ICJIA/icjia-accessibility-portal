export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#0A0A0A' }, // Dark theme background color
        { name: 'msapplication-TileColor', content: '#0A0A0A' },
        { name: 'application-name', content: 'ICJIA Accessibility Portal' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'ICJIA Accessibility' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
        // Preconnect to external domains for faster DNS resolution
        { rel: 'preconnect', href: 'https://plausible.icjia.cloud' },
        { rel: 'dns-prefetch', href: 'https://plausible.icjia.cloud' },
      ]
    }
  },
  
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://accessibility.icjia.app',
      siteName: 'ICJIA Accessibility Portal',
    }
  },
  
  modules: [
    '@nuxt/content',
    'vuetify-nuxt-module',
    '@nuxtjs/plausible',
    '@nuxt/test-utils/module'
  ],

  /**
   * Nitro prerendering configuration.
   *
   * We host a static documentation portal under `/docs/` from the `public/` directory.
   * During `nuxt generate`, Nitro's crawler can attempt to prerender `/docs/` as an app route,
   * which results in a 404 and fails the build. We explicitly ignore `/docs` paths for prerendering
   * (they are static assets and do not need SSR prerender).
   */
  nitro: {
    prerender: {
      ignore: ['/docs', '/docs/', '/docs/**']
    }
  },

  plausible: {
    domain: 'accessibility.icjia.app',
    apiHost: 'https://plausible.icjia.cloud'
  },

  content: {
    renderer: {
      // Don't wrap headings in anchor links (keeps ## as plain H2, ### as plain H3)
      anchorLinks: false,
    },
  },

  // Note: Vuetify configuration objects may appear in console logs (both command line and browser)
  // due to Vuetify + Nuxt 4 compatibility where Vuetify exposes functions in its configuration
  // that can't be serialized. This is a known harmless issue that doesn't affect functionality.
  // Client-side console logs are suppressed by app/plugins/suppress-vuetify-logs.client.ts
  // Server-side logs (command line) are from Nuxt's dev server and are harmless.
  vuetify: {
    moduleOptions: {
      styles: true,
    },
    vuetifyOptions: {
      // SVG icons from @mdi/js (app/utils/icons.ts). This must be in vuetifyOptions:
      // vuetify-nuxt-module reads `vuetifyOptions.icons`, and without it falls back
      // to the `mdi` font set and injects the @mdi/font stylesheet from a CDN,
      // which the site's Content-Security-Policy blocks.
      icons: {
        defaultSet: 'mdi-svg'
      },
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
          // Plakat look (November 2026), matching audit.icjia.app. The tokens
          // are mirrored as --pk-* variables in app/assets/css/plakat.css.
          // `primary` is the LINK blue (7.6:1 on the page), because Vuetify
          // uses primary as a text colour; the purple brand block (#7b4acf)
          // is only ever a background, never text (3.4:1 on the page).
          dark: {
            colors: {
              background: '#0A0A0A',
              surface: '#111111',
              'surface-variant': '#16191F',
              primary: '#60A5FA',
              'primary-darken-1': '#93C5FD',
              'on-surface': '#F5F5F5',
              'on-surface-variant': '#D4D4D4',
              secondary: '#A3A3A3',
              'secondary-darken-1': '#D4D4D4',
              accent: '#60A5FA',
              brand: '#7B4ACF',
              error: '#F87171',
              info: '#60A5FA',
              // Purple, not green (2026-11-25): Vuetify draws black text on it.
              success: '#B9A6E0',
              warning: '#FDE68A',
            },
          },
        },
      },
    }
  },

  // Archivo is self-hosted (no font CDN request; the CSP's font-src 'self' holds).
  css: ['@fontsource-variable/archivo/wght.css', '~/assets/css/plakat.css'],

  build: {
    transpile: ['vuetify']
  },

  // Optimize CSS loading to reduce render-blocking
  experimental: {
    payloadExtraction: false
  },

  // Vite optimization to reduce render-blocking resources and improve performance
  vite: {
    plugins: [],
    build: {
      cssCodeSplit: true, // Split CSS into smaller chunks
      cssMinify: true // Minify CSS for faster loading
      // Removed manualChunks to avoid circular dependency issues
      // Nuxt's default code splitting is sufficient
    },
    css: {
      devSourcemap: false // Disable sourcemaps in production for smaller files
    }
  },

  nitro: import.meta.dev ? {} : {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      ignore: ['/docs/accessibility', '/docs/architecture']
    },
    hooks: {
      async 'close'() {
        // Generate routes.json from Nuxt's discovered routes after build is complete
        // Scan the output directory to get all prerendered routes
        try {
          const { writeFileSync, readdirSync, statSync, existsSync, readFileSync, mkdirSync } = await import('fs')
          const { join, dirname } = await import('path')
          
          console.log('')
          console.log('📋 Scanning prerendered routes...')
          
          const outputDir = join(process.cwd(), '.output', 'public')
          const routes = new Set(['/']) // Always include root
          
          if (existsSync(outputDir)) {
            // Recursively find all index.html files to determine routes
            function findRoutes(dir: string, basePath = '') {
              try {
                const entries = readdirSync(dir, { withFileTypes: true })
                for (const entry of entries) {
                  const fullPath = join(dir, entry.name)
                  if (entry.isDirectory()) {
                    const routePath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`
                    findRoutes(fullPath, routePath)
                  } else if (entry.name === 'index.html' && basePath) {
                    routes.add(basePath)
                  }
                }
              } catch (err) {
                // Ignore errors
              }
            }
            
            findRoutes(outputDir)
          }
          
          const sortedRoutes = Array.from(routes).sort()
          const routesData = {
            generated: new Date().toISOString(),
            routes: sortedRoutes
          }
          
          const routesJsonPath = join(process.cwd(), 'routes.json')
          writeFileSync(routesJsonPath, JSON.stringify(routesData, null, 2), 'utf-8')
          
          console.log('')
          console.log('┌' + '─'.repeat(78) + '┐')
          console.log('│' + ' '.repeat(25) + 'ROUTES GENERATION' + ' '.repeat(35) + '│')
          console.log('└' + '─'.repeat(78) + '┘')
          console.log(`✅ Generated routes.json with ${sortedRoutes.length} route(s):`)
          console.log('   ' + sortedRoutes.join(', '))
          console.log('')
          
          // Ensure accessibility report is copied from public/ to .output/public/
          // This ensures the report is available after generate and on Netlify
          const accessibilityReportSource = join(process.cwd(), 'public', 'docs', 'accessibility', 'index.html')
          const accessibilityReportDest = join(process.cwd(), '.output', 'public', 'docs', 'accessibility', 'index.html')
          
          // Always ensure the report exists (create placeholder if needed)
          if (!existsSync(accessibilityReportSource)) {
            const sourceDir = dirname(accessibilityReportSource)
            if (!existsSync(sourceDir)) {
              mkdirSync(sourceDir, { recursive: true })
            }
            // Create a simple placeholder if report doesn't exist
            const placeholder = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Report - Not Yet Generated</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0F172A;
      color: #E2E8F0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      max-width: 600px;
      text-align: center;
      background: #1E293B;
      padding: 3rem;
      border-radius: 8px;
      border: 1px solid #334155;
    }
    h1 { color: #FBBF24; margin-bottom: 1rem; }
    p { color: #CBD5E1; margin-bottom: 1.5rem; line-height: 1.6; }
    .code { background: #0F172A; padding: 1rem; border-radius: 4px; font-family: monospace; color: #60A5FA; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Accessibility Report Not Yet Generated</h1>
    <p>No accessibility report has been generated yet. To generate a report, run:</p>
    <div class="code">yarn generate:accessibility</div>
    <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #94A3B8;">
      Note: This requires a running server (yarn dev, yarn preview, or yarn generate:serve)
    </p>
  </div>
</body>
</html>`
            writeFileSync(accessibilityReportSource, placeholder, 'utf-8')
          }
          
          // Copy to output directory
          const destDir = dirname(accessibilityReportDest)
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true })
          }
          const reportContent = readFileSync(accessibilityReportSource, 'utf-8')
          writeFileSync(accessibilityReportDest, reportContent, 'utf-8')
          console.log('✓ Accessibility report copied to output directory')
          
          // Also ensure docs/index.html is copied
          const docsIndexSource = join(process.cwd(), 'public', 'docs', 'index.html')
          const docsIndexDest = join(process.cwd(), '.output', 'public', 'docs', 'index.html')
          
          if (existsSync(docsIndexSource)) {
            const docsIndexDir = dirname(docsIndexDest)
            if (!existsSync(docsIndexDir)) {
              mkdirSync(docsIndexDir, { recursive: true })
            }
            const docsIndexContent = readFileSync(docsIndexSource, 'utf-8')
            writeFileSync(docsIndexDest, docsIndexContent, 'utf-8')
            console.log('✓ Documentation portal copied to output directory')
          }
        } catch (error) {
          console.warn('Warning: Could not generate routes.json:', error)
        }
      }
    }
  }
})
