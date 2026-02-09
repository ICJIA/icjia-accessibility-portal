#!/usr/bin/env node
/**
 * @fileoverview Reusable ICJIA logo generator
 * @description Generates the ICJIA logo lockup (text + horizontal rules) as a PNG.
 *
 * Configurable via CLI flags — font, colours, sizes, line ratios, background,
 * and output dimensions are all parameterised so this script can be dropped
 * into any project.
 *
 * Usage:
 *   node generate-icjia-logo.js [options]
 *
 * Options:
 *   --out <path>              Output file path          (default: icjia-logo-generated.png)
 *   --width <px>              Canvas width              (default: 600)
 *   --height <px>             Canvas height             (default: 400)
 *   --scale <n>               Device scale factor       (default: 2)
 *   --font <name>             Google Font family name   (default: Libre Baskerville)
 *   --font-weight <n>         CSS font-weight           (default: 400)
 *   --font-size <px>          Logo text font-size       (default: 96)
 *   --text <string>           Logo text                 (default: ICJIA)
 *   --text-color <css>        Text & line colour        (default: #ffffff)
 *   --bg <css>                Background colour/CSS     (default: #1b3a5c)
 *   --line-thickness <px>     Horizontal rule height    (default: 2)
 *   --line-gap <px>           Gap between line and text (default: 14)
 *   --top-line-ratio <0-1>    Top line width as ratio of text width    (default: 0.90)
 *   --bottom-line-ratio <0-1> Bottom line width as ratio of text width (default: 1.06)
 *   --transparent             Transparent background    (default: false)
 *   --subtitle <string>       Optional subtitle text beneath logo
 *   --subtitle-size <px>      Subtitle font-size        (default: 36)
 *
 * Examples:
 *   # Basic — match the ICJIA logo on dark blue
 *   node generate-icjia-logo.js --out logo.png
 *
 *   # Custom text and size for a different app
 *   node generate-icjia-logo.js --text "ACME" --font "Playfair Display" --bg "#0a0a0a" --out acme-logo.png
 *
 *   # Transparent background, white text
 *   node generate-icjia-logo.js --transparent --out logo-transparent.png
 *
 *   # With subtitle
 *   node generate-icjia-logo.js --subtitle "Accessibility Portal" --out full-logo.png
 *
 * Requires: puppeteer
 */

import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'
import process from 'node:process'

// ── CLI helpers ──────────────────────────────────────────────────────────────

function getArg(name, fallback) {
  const idx = process.argv.indexOf(name)
  if (idx === -1) return fallback
  return process.argv[idx + 1] ?? fallback
}
function hasFlag(name) {
  return process.argv.includes(name)
}

// ── Config from CLI flags ────────────────────────────────────────────────────

const config = {
  out:              getArg('--out', 'icjia-logo-generated.png'),
  width:            Number(getArg('--width', '600')),
  height:           Number(getArg('--height', '400')),
  scale:            Number(getArg('--scale', '2')),
  font:             getArg('--font', 'Libre Baskerville'),
  fontWeight:       getArg('--font-weight', '400'),
  fontSize:         Number(getArg('--font-size', '96')),
  text:             getArg('--text', 'ICJIA'),
  textColor:        getArg('--text-color', '#ffffff'),
  bg:               getArg('--bg', '#1b3a5c'),
  lineThickness:    Number(getArg('--line-thickness', '2')),
  lineGap:          Number(getArg('--line-gap', '14')),
  topLineRatio:     Number(getArg('--top-line-ratio', '0.90')),
  bottomLineRatio:  Number(getArg('--bottom-line-ratio', '1.06')),
  transparent:      hasFlag('--transparent'),
  subtitle:         getArg('--subtitle', ''),
  subtitleSize:     Number(getArg('--subtitle-size', '36')),
}

// ── Build the HTML ───────────────────────────────────────────────────────────

function buildHtml(c) {
  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(c.font)}:wght@${c.fontWeight}&display=swap`
  const bgStyle = c.transparent ? 'transparent' : c.bg

  const subtitleBlock = c.subtitle
    ? `<p style="
        font-family: '${c.font}', Georgia, serif;
        font-size: ${c.subtitleSize}px;
        font-weight: 400;
        color: ${c.textColor};
        opacity: 0.88;
        letter-spacing: 0.02em;
        margin-top: 16px;
        text-align: center;
      ">${c.subtitle}</p>`
    : ''

  return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${googleFontUrl}" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: ${c.width}px;
    height: ${c.height}px;
    background: ${bgStyle};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lockup {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .rule {
    height: ${c.lineThickness}px;
    background: ${c.textColor};
  }
  .logo {
    font-family: '${c.font}', Georgia, serif;
    font-size: ${c.fontSize}px;
    font-weight: ${c.fontWeight};
    color: ${c.textColor};
    letter-spacing: 0.02em;
    line-height: 1;
    padding: ${c.lineGap}px 0;
  }
</style>
</head><body>
<div class="wrap">
  <div class="lockup">
    <div class="rule" id="rt"></div>
    <div class="logo" id="lt">${c.text}</div>
    <div class="rule" id="rb"></div>
  </div>
  ${subtitleBlock}
</div>
<script>
  requestAnimationFrame(() => {
    const w = document.getElementById('lt').offsetWidth;
    document.getElementById('rt').style.width = Math.round(w * ${c.topLineRatio}) + 'px';
    document.getElementById('rb').style.width = Math.round(w * ${c.bottomLineRatio}) + 'px';
  });
</script>
</body></html>`
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const puppeteer = await import('puppeteer').catch(() => {
    console.error('puppeteer is required. Run: yarn add -D puppeteer')
    process.exit(1)
  })

  const html = buildHtml(config)

  // Write a temp file so Puppeteer can load Google Fonts via network
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const tmpPath = join(__dirname, '.icjia-logo-tmp.html')
  await writeFile(tmpPath, html, 'utf-8')

  const outPath = resolve(config.out)

  console.log('Generating ICJIA logo...')
  console.log(`  Text:       "${config.text}"`)
  console.log(`  Font:       ${config.font} (weight ${config.fontWeight})`)
  console.log(`  Size:       ${config.width}×${config.height} @${config.scale}x`)
  console.log(`  Top rule:   ${(config.topLineRatio * 100).toFixed(0)}% of text width`)
  console.log(`  Bottom rule: ${(config.bottomLineRatio * 100).toFixed(0)}% of text width`)
  console.log(`  Background: ${config.transparent ? 'transparent' : config.bg}`)
  if (config.subtitle) console.log(`  Subtitle:   "${config.subtitle}"`)

  const browser = await puppeteer.default.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: config.width,
      height: config.height,
      deviceScaleFactor: config.scale,
    })
    await page.goto(`file://${tmpPath}`, { waitUntil: 'networkidle0' })
    await new Promise((r) => setTimeout(r, 1500))

    const screenshotOpts = { path: outPath, type: 'png' }
    if (config.transparent) screenshotOpts.omitBackground = true

    await page.screenshot(screenshotOpts)
    console.log(`\n✅ Saved: ${outPath}`)
  } finally {
    await browser.close()
    // Clean up temp file
    const { unlink } = await import('node:fs/promises')
    await unlink(tmpPath).catch(() => {})
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
