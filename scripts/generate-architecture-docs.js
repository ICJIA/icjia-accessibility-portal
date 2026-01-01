/**
 * @fileoverview Script to generate architecture documentation HTML from markdown
 * @description Converts ARCHITECTURE_GUIDE.md to a clean, modern HTML documentation page
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const ARCHITECTURE_GUIDE_PATH = join(process.cwd(), 'markdown-documentation', 'ARCHITECTURE_GUIDE.md')
const OUTPUT_DIR = join(process.cwd(), 'public', 'docs', 'architecture')
const OUTPUT_FILE = join(OUTPUT_DIR, 'index.html')

// Enhanced markdown to HTML converter
function markdownToHtml(markdown) {
  let html = markdown

  // Remove fileoverview and module comments (JSDoc style)
  html = html.replace(/\/\*\*[\s\S]*?\*\/\s*/g, '')

  // Process code blocks first (before other replacements)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text'
    const escapedCode = escapeHtml(code.trim())
    return `<pre><code class="language-${language}">${escapedCode}</code></pre>`
  })

  // Process inline code (but not inside code blocks)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>')

  // Process tables (before other line-based processing)
  const tableRegex = /^\|(.+)\|$/gm
  let tableMatch
  const tables = []
  while ((tableMatch = tableRegex.exec(html)) !== null) {
    const line = tableMatch[0]
    if (line.includes('---')) continue // Skip separator rows for now
    tables.push({ match: tableMatch, line })
  }

  // Process tables properly (multiline regex)
  html = html.replace(/(\|[^\n]+\|\n)+/g, (match) => {
    const lines = match.trim().split('\n').filter(l => l.trim() && l.includes('|'))
    if (lines.length < 2) return match // Need at least header + separator
    
    // Find separator row index
    let separatorIndex = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('---') || lines[i].match(/\|[\s\-:]+\|/)) {
        separatorIndex = i
        break
      }
    }
    
    if (separatorIndex === -1) return match // No separator found
    
    const headerLine = lines[0]
    const dataLines = lines.slice(separatorIndex + 1)
    
    if (dataLines.length === 0) return match
    
    let tableHtml = '<table>\n<thead><tr>\n'
    
    // Parse header
    const headerCells = headerLine.split('|').map(c => c.trim()).filter(c => c)
    headerCells.forEach(cell => {
      tableHtml += `<th>${processInlineMarkdown(cell)}</th>\n`
    })
    tableHtml += '</tr></thead>\n<tbody>\n'
    
    // Parse data rows
    dataLines.forEach(line => {
      const cells = line.split('|').map(c => c.trim()).filter(c => c)
      if (cells.length > 0) {
        tableHtml += '<tr>\n'
        cells.forEach(cell => {
          tableHtml += `<td>${processInlineMarkdown(cell)}</td>\n`
        })
        tableHtml += '</tr>\n'
      }
    })
    
    tableHtml += '</tbody>\n</table>'
    return tableHtml
  })

  // Headers with ID generation
  html = html.replace(/^# (.*$)/gim, (match, content) => {
    const id = slugify(content)
    return `<h1 id="${id}">${processInlineMarkdown(content)}</h1>`
  })
  html = html.replace(/^## (.*$)/gim, (match, content) => {
    const id = slugify(content)
    return `<h2 id="${id}">${processInlineMarkdown(content)}</h2>`
  })
  html = html.replace(/^### (.*$)/gim, (match, content) => {
    const id = slugify(content)
    return `<h3 id="${id}">${processInlineMarkdown(content)}</h3>`
  })
  html = html.replace(/^#### (.*$)/gim, (match, content) => {
    const id = slugify(content)
    return `<h4 id="${id}">${processInlineMarkdown(content)}</h4>`
  })
  html = html.replace(/^##### (.*$)/gim, (match, content) => {
    const id = slugify(content)
    return `<h5 id="${id}">${processInlineMarkdown(content)}</h5>`
  })

  // Process links (including GitHub links)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const isExternal = url.startsWith('http')
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${url}"${target}>${processInlineMarkdown(text)}</a>`
  })

  // Process blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

  // Process horizontal rules
  html = html.replace(/^---$/gim, '<hr>')

  // Process lists (unordered)
  html = html.replace(/^(\s*)[-*] (.+)$/gim, (match, indent, content) => {
    const level = indent.length / 2
    return `${indent}<li>${processInlineMarkdown(content)}</li>`
  })

  // Process lists (ordered)
  html = html.replace(/^(\s*)(\d+)\. (.+)$/gim, (match, indent, num, content) => {
    return `${indent}<li>${processInlineMarkdown(content)}</li>`
  })

  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    // Check if it's already wrapped
    if (match.includes('<ul>') || match.includes('<ol>')) return match
    return '<ul>\n' + match + '</ul>'
  })

  // Process paragraphs (lines that aren't already HTML)
  const lines = html.split('\n')
  const processedLines = []
  let inList = false
  let inTable = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (line === '') {
      processedLines.push('')
      continue
    }

    // Skip if already HTML
    if (line.match(/^<[h|u|o|p|d|b|h|t|s|/|!]/)) {
      processedLines.push(lines[i])
      if (line.startsWith('</ul>') || line.startsWith('</ol>')) inList = false
      if (line.startsWith('</table>')) inTable = false
      if (line.startsWith('<table>')) inTable = true
      continue
    }

    // Skip list items (already processed)
    if (line.startsWith('<li>')) {
      processedLines.push(lines[i])
      inList = true
      continue
    }

    // Skip table rows (already processed)
    if (line.startsWith('<tr>') || line.startsWith('<th>') || line.startsWith('<td>')) {
      processedLines.push(lines[i])
      continue
    }

    // Process as paragraph
    processedLines.push(`<p>${processInlineMarkdown(lines[i])}</p>`)
  }

  html = processedLines.join('\n')

  // Clean up empty paragraphs and extra whitespace
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/\n{3,}/g, '\n\n')

  return html
}

// Process inline markdown (bold, italic, links, code)
function processInlineMarkdown(text) {
  let processed = text

  // Bold (avoid matching inside code blocks)
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  processed = processed.replace(/__([^_]+)__/g, '<strong>$1</strong>')

  // Italic (avoid matching bold)
  processed = processed.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
  processed = processed.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>')

  // Links (already processed in main function, but handle any remaining)
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const isExternal = url.startsWith('http')
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${url}"${target}>${text}</a>`
  })

  // Inline code (avoid matching code blocks)
  processed = processed.replace(/`([^`\n]+)`/g, '<code>$1</code>')

  return processed
}

// Slugify function for IDs
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

function generateHtml(content) {
  const htmlContent = markdownToHtml(content)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Architecture Guide - ICJIA Accessibility Portal</title>
  <meta name="description" content="Complete architecture and implementation guide for Vuetify 3 + Nuxt 4 applications. Learn best practices, solutions to common issues, and deployment strategies.">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-primary: #0f172a;
      --bg-surface: #1e293b;
      --bg-surface-variant: #1a2332;
      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --text-tertiary: #94a3b8;
      --accent: #60a5fa;
      --accent-dark: #3b82f6;
      --accent-hover: #93c5fd;
      --border: rgba(96, 165, 250, 0.2);
      --border-strong: rgba(96, 165, 250, 0.4);
      --code-bg: #1e293b;
      --code-border: rgba(96, 165, 250, 0.3);
      --link-color: #60a5fa;
      --link-hover: #93c5fd;
    }

    @media (prefers-color-scheme: light) {
      :root {
        --bg-primary: #ffffff;
        --bg-surface: #f8fafc;
        --bg-surface-variant: #f1f5f9;
        --text-primary: #0f172a;
        --text-secondary: #475569;
        --text-tertiary: #64748b;
        --code-bg: #f1f5f9;
        --code-border: rgba(15, 23, 42, 0.1);
      }
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.7;
      padding: 0;
      margin: 0;
    }

    .header {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border);
      padding: 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(10px);
      background: rgba(30, 41, 59, 0.95);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .header h1 {
      font-size: 1.75rem;
      color: var(--accent);
      margin: 0;
      font-weight: 600;
    }

    .header-nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .header-nav a {
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s;
      font-size: 0.9rem;
    }

    .header-nav a:hover {
      background: var(--bg-surface-variant);
      color: var(--accent);
    }

    .header-nav a:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .content {
      background: var(--bg-surface);
      border-radius: 12px;
      padding: 3rem;
      border: 1px solid var(--border);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 2.5rem;
      color: var(--accent);
      margin-bottom: 1rem;
      font-weight: 700;
      line-height: 1.2;
    }

    h2 {
      font-size: 2rem;
      color: var(--accent);
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--border);
      scroll-margin-top: 100px;
    }

    h3 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
      scroll-margin-top: 100px;
    }

    h4 {
      font-size: 1.25rem;
      color: var(--text-primary);
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    h5 {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    p {
      margin-bottom: 1.25rem;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    em {
      color: var(--text-secondary);
      font-style: italic;
    }

    a {
      color: var(--link-color);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s;
    }

    a:hover {
      color: var(--link-hover);
      border-bottom-color: var(--link-hover);
    }

    a:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
      border-radius: 2px;
    }

    code {
      background: var(--code-bg);
      border: 1px solid var(--code-border);
      border-radius: 4px;
      padding: 0.2rem 0.4rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
      font-size: 0.9em;
      color: var(--accent);
    }

    pre {
      background: var(--code-bg);
      border: 1px solid var(--code-border);
      border-radius: 8px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
      line-height: 1.6;
    }

    pre code {
      background: none;
      border: none;
      padding: 0;
      color: var(--text-primary);
      font-size: 0.9rem;
      display: block;
    }

    ul, ol {
      margin: 1.5rem 0;
      padding-left: 2rem;
      color: var(--text-secondary);
    }

    li {
      margin: 0.75rem 0;
      line-height: 1.8;
    }

    li strong {
      color: var(--text-primary);
    }

    blockquote {
      border-left: 4px solid var(--accent);
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: var(--text-secondary);
      font-style: italic;
    }

    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 3rem 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: var(--bg-surface-variant);
      border-radius: 8px;
      overflow: hidden;
    }

    th {
      background: var(--bg-surface);
      color: var(--accent);
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid var(--border);
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      color: var(--text-secondary);
    }

    tr:last-child td {
      border-bottom: none;
    }

    .toc {
      background: var(--bg-surface-variant);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2rem;
      margin: 2rem 0;
    }

    .toc h2 {
      font-size: 1.5rem;
      margin-top: 0;
      border-bottom: none;
    }

    .toc ul {
      list-style: none;
      padding-left: 0;
    }

    .toc li {
      margin: 0.5rem 0;
    }

    .toc a {
      color: var(--text-secondary);
      display: block;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .toc a:hover {
      background: var(--bg-surface);
      color: var(--accent);
    }

    .warning {
      background: rgba(251, 191, 36, 0.1);
      border-left: 4px solid #fbbf24;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .warning strong {
      color: #fbbf24;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--accent);
      margin-bottom: 2rem;
      font-weight: 500;
    }

    .back-link:hover {
      color: var(--accent-hover);
    }

    @media (max-width: 768px) {
      .container {
        padding: 1.5rem 1rem;
      }

      .content {
        padding: 1.5rem;
      }

      h1 {
        font-size: 2rem;
      }

      h2 {
        font-size: 1.75rem;
      }

      h3 {
        font-size: 1.25rem;
      }

      pre {
        padding: 1rem;
        font-size: 0.85rem;
      }

      .header {
        padding: 1rem;
      }

      .header h1 {
        font-size: 1.5rem;
      }
    }

    /* Print styles */
    @media print {
      .header {
        position: static;
      }

      .header-nav {
        display: none;
      }

      .back-link {
        display: none;
      }

      body {
        background: white;
        color: black;
      }

      .content {
        box-shadow: none;
        border: none;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <h1>🏗️ Site Architecture Guide</h1>
      <nav class="header-nav" aria-label="Documentation navigation">
        <a href="/docs">Documentation Portal</a>
        <a href="/docs/accessibility">Accessibility Report</a>
        <a href="/docs/lighthouse">Lighthouse Report</a>
        <a href="/">Home</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <a href="/docs" class="back-link">← Back to Documentation Portal</a>
    
    <div class="content">
      ${htmlContent}
    </div>
  </div>
</body>
</html>`
}

try {
  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true })

  // Read markdown file
  const markdown = readFileSync(ARCHITECTURE_GUIDE_PATH, 'utf-8')

  // Generate HTML
  const html = generateHtml(markdown)

  // Write HTML file
  writeFileSync(OUTPUT_FILE, html, 'utf-8')

  console.log('✅ Architecture documentation generated successfully!')
  console.log(`📄 Output: ${OUTPUT_FILE}`)
} catch (error) {
  console.error('❌ Error generating architecture documentation:', error)
  process.exit(1)
}

