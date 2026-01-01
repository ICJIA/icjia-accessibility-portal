/**
 * @fileoverview Server plugin to ensure accessibility report always exists
 * @description Creates a placeholder accessibility report if one doesn't exist.
 * 
 * This ensures /docs/accessibility is always accessible in dev/build/generate modes,
 * even if the report hasn't been generated yet. Prevents 404 errors and provides
 * helpful instructions for generating the report.
 * 
 * The placeholder report includes:
 * - Instructions on how to generate the report
 * - Command to run (yarn generate:accessibility)
 * - Note about requiring a running server
 * 
 * @module ensure-accessibility-report
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'

/**
 * Nuxt server plugin that ensures the accessibility report exists.
 * 
 * Creates a placeholder HTML file at public/docs/accessibility/index.html
 * if it doesn't exist. This prevents 404 errors and provides helpful
 * instructions for generating the actual report.
 * 
 * Only runs on server side. Silently fails if there are file system errors.
 * 
 * @returns {void}
 */
export default defineNuxtPlugin(() => {
  // Only run on server side
  if (import.meta.server) {
    try {
      const reportPath = join(process.cwd(), 'public', 'docs', 'accessibility', 'index.html')
      const reportDir = dirname(reportPath)
      
      // Ensure directory exists
      if (!existsSync(reportDir)) {
        mkdirSync(reportDir, { recursive: true })
      }
      
      // If report doesn't exist, create a placeholder
      if (!existsSync(reportPath)) {
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
    .code { background: #0F172A; padding: 1rem; border-radius: 4px; font-family: monospace; color: #60A5FA; margin: 1rem 0; }
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
        writeFileSync(reportPath, placeholder, 'utf-8')
        console.log('📄 Created placeholder accessibility report')
      }
    } catch (error) {
      // Silently fail - not critical for app startup
    }
  }
})



