#!/usr/bin/env node
/**
 * @fileoverview Generate the Open Graph image (og-image.png) with serif typography
 * @description Renders an HTML template using Puppeteer and saves a 1200x630 PNG.
 * Uses Libre Baskerville to match the classic serif style of the ICJIA logo
 * (icjia-logo.png). Keeps the same layout and dark background; only the font
 * is changed from sans-serif to serif.
 *
 * Usage:
 *   node scripts/generate-og-image.js
 *   node scripts/generate-og-image.js --out public/og-image.png
 *
 * Requires: puppeteer (already in devDependencies)
 */

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'
import process from 'node:process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')

function getArg(name, fallback) {
  const idx = process.argv.indexOf(name)
  if (idx === -1) return fallback
  return process.argv[idx + 1] ?? fallback
}

const outPath = getArg('--out', join(PROJECT_ROOT, 'public', 'og-image.png'))

async function main() {
  const puppeteer = await import('puppeteer').catch(() => {
    console.error('puppeteer is required. Run: yarn add -D puppeteer')
    process.exit(1)
  })

  const templatePath = join(__dirname, 'og-image-template.html')
  if (!existsSync(templatePath)) {
    console.error('Template not found:', templatePath)
    process.exit(1)
  }

  const fileUrl = `file://${templatePath}`

  console.log('Generating og-image.png...')
  const browser = await puppeteer.default.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })
    await page.goto(fileUrl, { waitUntil: 'networkidle0' })
    // Allow Google Fonts to load
    await new Promise((r) => setTimeout(r, 1500))
    await page.screenshot({ path: outPath, type: 'png' })
    console.log('Saved:', outPath)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
