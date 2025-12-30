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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' }
      ]
    }
  },
  
  modules: [
    '@nuxt/content',
    'vuetify-nuxt-module',
    '@nuxtjs/plausible'
  ],

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

  // Note: The "Failed to stringify dev server logs" warning is a known harmless issue
  // with Vuetify + Nuxt 4 where Vuetify exposes functions in its configuration that
  // can't be serialized for dev server logging. This does not affect functionality.
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

  // Optimize CSS loading to reduce render-blocking
  experimental: {
    payloadExtraction: false
  },

  // Vite CSS optimization to reduce render-blocking resources
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS into smaller chunks
      cssMinify: true // Minify CSS for faster loading
    },
    css: {
      devSourcemap: false // Disable sourcemaps in production for smaller files
    }
  },

  nitro: import.meta.dev ? {} : {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      ignore: ['/docs/accessibility']
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
