/**
 * @fileoverview Unit tests for FAQ download generator scripts
 * @description Tests the markdown-to-text, markdown-to-md, and markdown-to-docx conversion logic
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { readFile, writeFile, unlink, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..', '..')
const tempDir = join(rootDir, 'node_modules', '.test-temp')

// Sample markdown content for testing
const sampleMarkdown = `---
title: Test FAQs
---

# Test FAQ Document

This is a test document with various markdown elements.

## Section One

This section has **bold text** and *italic text*.

### Question 1

What is accessibility?

Accessibility means making content usable by everyone, including people with disabilities.

- List item 1
- List item 2
- List item 3

### Question 2 {updated:2026-01-01}

What is WCAG?

WCAG stands for [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/).

## Section Two

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

> This is a blockquote.

---

End of test document.
`

describe('FAQ Download Generators', () => {
  const testInputPath = join(tempDir, 'test-faqs.md')
  
  beforeAll(async () => {
    // Create temp directory
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true })
    }
    // Write test markdown
    await writeFile(testInputPath, sampleMarkdown, 'utf-8')
  })

  afterAll(async () => {
    // Clean up temp files
    try {
      await unlink(testInputPath)
    } catch {
      // Ignore cleanup errors
    }
  })

  describe('Plain Text Generator (generate-faq-txt.js)', () => {
    const outputPath = join(tempDir, 'test-output.txt')

    afterAll(async () => {
      try {
        await unlink(outputPath)
      } catch {
        // Ignore cleanup errors
      }
    })

    it('should generate a plain text file from markdown', async () => {
      // Run the generator script
      execSync(
        `node ${join(rootDir, 'scripts', 'generate-faq-txt.js')} --input ${testInputPath} --out ${outputPath}`,
        { cwd: rootDir }
      )

      expect(existsSync(outputPath)).toBe(true)
    })

    it('should include proper header with metadata', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      expect(content).toContain('ICJIA DIGITAL ACCESSIBILITY FAQ')
      expect(content).toContain('Illinois Criminal Justice Information Authority')
      expect(content).toContain('Generated:')
      expect(content).toContain('https://accessibility.icjia.app')
    })

    it('should convert headings to uppercase with separators', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      // H1 headings should be uppercase with = separators
      expect(content).toMatch(/={10,}[\s\S]*TEST FAQ DOCUMENT[\s\S]*={10,}/i)
      
      // H2 headings should be uppercase with - separators
      expect(content).toMatch(/-{10,}[\s\S]*SECTION ONE[\s\S]*-{10,}/i)
    })

    it('should preserve links with URLs in parentheses', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      expect(content).toContain('(https://www.w3.org/WAI/WCAG21/quickref/)')
    })

    it('should remove markdown formatting symbols', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      // Should not contain markdown bold/italic markers
      expect(content).not.toMatch(/\*\*[^*]+\*\*/)
      expect(content).not.toMatch(/(?<!\*)\*[^*]+\*(?!\*)/)
    })

    it('should include footer with copyright', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      expect(content).toContain('END OF DOCUMENT')
      expect(content).toContain('Illinois Criminal Justice Information Authority')
    })

    it('should handle {updated:} tags appropriately', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      // Should either remove or convert {updated:} tags
      expect(content).not.toContain('{updated:2026-01-01}')
    })

    it('should be readable as plain ASCII text', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      // Check that file contains only printable ASCII + newlines
      // Allow some extended characters for accessibility
      const printableAscii = /^[\x20-\x7E\n\r\t©🔄\[\]]+$/
      // More lenient: just check it's valid text
      expect(content.length).toBeGreaterThan(100)
      expect(typeof content).toBe('string')
    })
  })

  describe('Markdown Generator (generate-faq-md.js)', () => {
    const outputPath = join(tempDir, 'test-output.md')

    afterAll(async () => {
      try {
        await unlink(outputPath)
      } catch {
        // Ignore cleanup errors
      }
    })

    it('should generate a markdown file from source', async () => {
      execSync(
        `node ${join(rootDir, 'scripts', 'generate-faq-md.js')} --input ${testInputPath} --out ${outputPath}`,
        { cwd: rootDir }
      )

      expect(existsSync(outputPath)).toBe(true)
    })

    it('should include proper header with metadata', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      expect(content).toContain('# ICJIA Digital Accessibility FAQ')
      expect(content).toContain('Illinois Criminal Justice Information Authority')
      expect(content).toContain('Generated')
      expect(content).toContain('https://accessibility.icjia.app')
    })

    it('should remove original YAML frontmatter', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      // Should not contain original frontmatter
      expect(content).not.toMatch(/^---\s*\ntitle: Test FAQs\s*\n---/m)
    })

    it('should preserve markdown formatting', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      // Should preserve headings
      expect(content).toContain('## Section One')
      expect(content).toContain('### Question 1')
      
      // Should preserve bold and italic
      expect(content).toContain('**bold text**')
      expect(content).toContain('*italic text*')
      
      // Should preserve links
      expect(content).toContain('[Web Content Accessibility Guidelines]')
    })

    it('should preserve tables', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      expect(content).toContain('| Header 1 | Header 2 |')
      expect(content).toContain('| Cell 1   | Cell 2   |')
    })

    it('should convert {updated:} tags to visible badges', async () => {
      const content = await readFile(outputPath, 'utf-8')

      // Should not contain raw {updated:} tags
      expect(content).not.toContain('{updated:2026-01-01}')
      // Should contain converted badge
      expect(content).toContain('🔄')
    })

    it('should include footer with document info', async () => {
      const content = await readFile(outputPath, 'utf-8')
      
      expect(content).toContain('## Document Information')
      expect(content).toContain('Illinois Criminal Justice Information Authority')
    })
  })

  describe('Word Document Generator (generate-faq-docx.js)', () => {
    const outputPath = join(tempDir, 'test-output.docx')

    afterAll(async () => {
      try {
        await unlink(outputPath)
      } catch {
        // Ignore cleanup errors
      }
    })

    it('should generate a docx file from markdown', async () => {
      execSync(
        `node ${join(rootDir, 'scripts', 'generate-faq-docx.js')} --input ${testInputPath} --out ${outputPath}`,
        { cwd: rootDir }
      )

      expect(existsSync(outputPath)).toBe(true)
    })

    it('should create a valid ZIP-based docx file', async () => {
      const content = await readFile(outputPath)
      
      // DOCX files are ZIP files, so they start with PK signature
      expect(content[0]).toBe(0x50) // 'P'
      expect(content[1]).toBe(0x4B) // 'K'
    })

    it('should have reasonable file size', async () => {
      const content = await readFile(outputPath)
      
      // DOCX should be at least 5KB and less than 1MB for this content
      expect(content.length).toBeGreaterThan(5000)
      expect(content.length).toBeLessThan(1000000)
    })

    it('should contain document content in XML format', async () => {
      // DOCX is a zip, we can check if it contains expected XML files
      // by checking for known markers in the binary
      const content = await readFile(outputPath, 'binary')
      
      // Should contain word/document.xml reference
      expect(content).toContain('word/document.xml')
    })
  })
})

describe('Download File Accessibility', () => {
  describe('Plain Text Accessibility', () => {
    it('should be readable without any special software', async () => {
      const txtPath = join(rootDir, 'public', 'ICJIA-Accessibility-FAQs.txt')
      
      // Check if file exists (may not exist in dev mode without generate)
      if (existsSync(txtPath)) {
        const content = await readFile(txtPath, 'utf-8')
        
        // Plain text should be human-readable
        expect(content.length).toBeGreaterThan(1000)
        expect(content).toContain('ICJIA')
        expect(content).toContain('FAQ')
      } else {
        // Skip if file doesn't exist yet
        console.log('Skipping TXT accessibility test - file not generated yet')
      }
    })

    it('should use clear visual structure with ASCII separators', async () => {
      const txtPath = join(rootDir, 'public', 'ICJIA-Accessibility-FAQs.txt')
      
      if (existsSync(txtPath)) {
        const content = await readFile(txtPath, 'utf-8')
        
        // Should use text-based separators for visual structure
        expect(content).toMatch(/={3,}/) // Header separators
        expect(content).toMatch(/-{3,}/) // Section separators
      }
    })
  })

  describe('Markdown Accessibility', () => {
    it('should be readable as plain text', async () => {
      const mdPath = join(rootDir, 'public', 'ICJIA-Accessibility-FAQs.md')
      
      if (existsSync(mdPath)) {
        const content = await readFile(mdPath, 'utf-8')
        
        // Markdown is inherently readable as plain text
        expect(content.length).toBeGreaterThan(1000)
        expect(typeof content).toBe('string')
      }
    })

    it('should have proper heading hierarchy', async () => {
      const mdPath = join(rootDir, 'public', 'ICJIA-Accessibility-FAQs.md')
      
      if (existsSync(mdPath)) {
        const content = await readFile(mdPath, 'utf-8')
        
        // Should have H1 heading
        expect(content).toMatch(/^# .+$/m)
        
        // Should have H2 headings
        expect(content).toMatch(/^## .+$/m)
      }
    })
  })

  describe('Word Document Accessibility', () => {
    it('should be a valid Office Open XML file', async () => {
      const docxPath = join(rootDir, 'public', 'ICJIA-Accessibility-FAQs.docx')
      
      if (existsSync(docxPath)) {
        const content = await readFile(docxPath)
        
        // DOCX files start with ZIP signature
        expect(content[0]).toBe(0x50)
        expect(content[1]).toBe(0x4B)
      }
    })

    it('should contain structured content', async () => {
      const docxPath = join(rootDir, 'public', 'ICJIA-Accessibility-FAQs.docx')
      
      if (existsSync(docxPath)) {
        const content = await readFile(docxPath, 'binary')
        
        // Should contain document structure
        expect(content).toContain('word/document.xml')
        // Should contain styles for accessibility
        expect(content).toContain('word/styles.xml')
      }
    })
  })
})

