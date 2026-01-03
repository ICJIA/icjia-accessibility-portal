/**
 * @fileoverview Vue Script Extractor for TypeDoc
 * @description Extracts <script setup> blocks from Vue SFCs to enable TypeDoc processing
 * 
 * This script:
 * 1. Reads all .vue files from app/components and app/pages
 * 2. Extracts the <script setup lang="ts"> content
 * 3. Writes them to docs-temp/ as .ts files for TypeDoc
 * 4. Preserves all JSDoc comments
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Configuration for Vue script extraction
 */
const CONFIG = {
  /** Directories containing Vue files */
  vueDirs: [
    'app/components',
    'app/pages',
    'app/layouts'
  ],
  /** Output directory for extracted scripts */
  outputDir: 'docs-temp',
  /** Vue script regex pattern */
  scriptPattern: /<script\s+setup\s+lang="ts">([\s\S]*?)<\/script>/
};

/**
 * Recursively find all .vue files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} [files=[]] - Accumulated file list
 * @returns {string[]} Array of .vue file paths
 */
function findVueFiles(dir, files = []) {
  const fullDir = path.join(rootDir, dir);
  
  if (!fs.existsSync(fullDir)) {
    console.log(`  ⚠️  Directory not found: ${dir}`);
    return files;
  }
  
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    const relativePath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findVueFiles(relativePath, files);
    } else if (entry.isFile() && entry.name.endsWith('.vue')) {
      files.push(relativePath);
    }
  }
  
  return files;
}

/**
 * Extract <script setup> content from a Vue file
 * @param {string} filePath - Path to Vue file
 * @returns {{ content: string, componentName: string } | null} Extracted script or null
 */
function extractScript(filePath) {
  const fullPath = path.join(rootDir, filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const match = content.match(CONFIG.scriptPattern);
  
  if (!match) {
    // Try alternate pattern (script setup without lang="ts")
    const altMatch = content.match(/<script\s+setup>([\s\S]*?)<\/script>/);
    if (!altMatch) {
      return null;
    }
    return {
      content: altMatch[1].trim(),
      componentName: path.basename(filePath, '.vue')
    };
  }
  
  return {
    content: match[1].trim(),
    componentName: path.basename(filePath, '.vue')
  };
}

/**
 * Extract JSDoc comments and type definitions from Vue script content
 * Creates a clean TypeDoc-compatible module without complex imports
 * @param {string} content - Script content
 * @param {string} componentName - Name of the component
 * @returns {string} Clean TypeDoc-compatible content
 */
function createCleanDocumentation(content, componentName) {
  const lines = [];
  
  // Extract and preserve JSDoc file header
  const fileDocMatch = content.match(/\/\*\*[\s\S]*?@fileoverview[\s\S]*?\*\//);
  if (fileDocMatch) {
    lines.push(fileDocMatch[0]);
    lines.push('');
  }
  
  // Extract interfaces and type definitions
  const interfaceRegex = /\/\*\*[\s\S]*?\*\/\s*(interface\s+\w+[\s\S]*?})/g;
  const typeRegex = /\/\*\*[\s\S]*?\*\/\s*(type\s+\w+[\s\S]*?;)/g;
  
  let match;
  while ((match = interfaceRegex.exec(content)) !== null) {
    // Get the JSDoc comment before the interface
    const fullMatch = content.substring(Math.max(0, content.lastIndexOf('/**', match.index)), match.index + match[0].length);
    const jsdocMatch = fullMatch.match(/\/\*\*[\s\S]*?\*\//);
    if (jsdocMatch) {
      lines.push(jsdocMatch[0]);
    }
    lines.push('export ' + match[1]);
    lines.push('');
  }
  
  while ((match = typeRegex.exec(content)) !== null) {
    lines.push('export ' + match[1]);
    lines.push('');
  }
  
  // Extract function documentation (JSDoc + signature only)
  const funcDocRegex = /\/\*\*[\s\S]*?\*\/\s*(?:async\s+)?function\s+(\w+)/g;
  const functionNames = new Set();
  while ((match = funcDocRegex.exec(content)) !== null) {
    const funcName = match[1];
    if (!functionNames.has(funcName)) {
      functionNames.add(funcName);
      const jsdocStart = content.lastIndexOf('/**', match.index);
      const jsdocEnd = content.indexOf('*/', jsdocStart) + 2;
      const jsdoc = content.substring(jsdocStart, jsdocEnd);
      lines.push(jsdoc);
      lines.push(`export function ${funcName}(...args: any[]): any;`);
      lines.push('');
    }
  }
  
  // Extract const with JSDoc
  const constDocRegex = /\/\*\*[\s\S]*?\*\/\s*const\s+(\w+)/g;
  while ((match = constDocRegex.exec(content)) !== null) {
    const constName = match[1];
    if (constName !== 'props' && !constName.startsWith('_')) {
      const jsdocStart = content.lastIndexOf('/**', match.index);
      const jsdocEnd = content.indexOf('*/', jsdocStart) + 2;
      const jsdoc = content.substring(jsdocStart, jsdocEnd);
      lines.push(jsdoc);
      lines.push(`export const ${constName}: any;`);
      lines.push('');
    }
  }
  
  return lines.join('\n');
}

/**
 * Create a TypeScript wrapper that TypeDoc can process
 * @param {string} scriptContent - Original script content
 * @param {string} componentName - Vue component name
 * @param {string} originalPath - Original .vue file path
 * @returns {string} TypeDoc-compatible TypeScript content
 */
function createTypedocWrapper(scriptContent, componentName, originalPath) {
  const categoryComment = originalPath.includes('components') 
    ? '@category Components'
    : originalPath.includes('pages') 
      ? '@category Pages'
      : '@category Layouts';
  
  // Create clean documentation from the script
  let cleanContent = createCleanDocumentation(scriptContent, componentName);
  
  // If no content was extracted, create a basic module
  if (!cleanContent.trim()) {
    cleanContent = `/**
 * @fileoverview ${componentName} Vue Component
 * @description Vue Single File Component from ${originalPath}
 * ${categoryComment}
 * @module ${componentName}
 */
`;
  }
  
  // Add module category comment if not present
  if (!cleanContent.includes('@category')) {
    cleanContent = cleanContent.replace(
      '@fileoverview',
      `@fileoverview`
    );
  }
  
  // Add export for TypeDoc to recognize as a module
  const footer = `
/**
 * Vue Component identifier
 * ${categoryComment}
 */
export const __component = '${componentName}';

/**
 * Component source file path
 */
export const __source = '${originalPath}';
`;

  return cleanContent + footer;
}

/**
 * Main extraction function
 */
function main() {
  console.log('🔍 Vue Script Extractor for TypeDoc\n');
  
  // Create output directory
  const outputDir = path.join(rootDir, CONFIG.outputDir);
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Create subdirectories
  fs.mkdirSync(path.join(outputDir, 'components'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'pages'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'layouts'), { recursive: true });
  
  let extractedCount = 0;
  let skippedCount = 0;
  
  // Process each Vue directory
  for (const dir of CONFIG.vueDirs) {
    console.log(`📁 Processing ${dir}/`);
    const vueFiles = findVueFiles(dir);
    
    for (const filePath of vueFiles) {
      const result = extractScript(filePath);
      
      if (result) {
        const subdir = filePath.includes('components') 
          ? 'components' 
          : filePath.includes('pages') 
            ? 'pages' 
            : 'layouts';
        
        const outputPath = path.join(
          outputDir, 
          subdir, 
          `${result.componentName}.ts`
        );
        
        const wrappedContent = createTypedocWrapper(
          result.content,
          result.componentName,
          filePath
        );
        
        fs.writeFileSync(outputPath, wrappedContent, 'utf-8');
        console.log(`  ✅ ${result.componentName}.vue → ${subdir}/${result.componentName}.ts`);
        extractedCount++;
      } else {
        console.log(`  ⏭️  Skipped ${path.basename(filePath)} (no <script setup>)`);
        skippedCount++;
      }
    }
  }
  
  // Create an index file for better organization
  const indexContent = `/**
 * @fileoverview Vue Components API Documentation
 * @description This module contains extracted TypeScript from Vue Single File Components
 * for API documentation purposes.
 * 
 * ## Components
 * 
 * Vue components from \`app/components/\`:
 * - {@link AppFooter} - Site footer with links
 * - {@link AppNavbar} - Navigation bar
 * - {@link CountdownTimer} - Deadline countdown display
 * - {@link FaqAccordion} - FAQ accordion with ARIA support
 * - {@link SkipLink} - Accessibility skip navigation link
 * 
 * ## Pages
 * 
 * Vue pages from \`app/pages/\`:
 * - {@link index} - Home page with FAQ listing
 * - {@link faqs} - Dedicated FAQs page
 * - {@link faqs-print} - Printer-friendly FAQs
 * - {@link links} - Resource links page
 * - {@link search} - Fuzzy search page
 * 
 * @module VueComponents
 * @category Vue
 */

export * from './components/AppFooter';
export * from './components/AppNavbar';
export * from './components/CountdownTimer';
export * from './components/FaqAccordion';
export * from './components/SkipLink';
export * from './pages/index';
export * from './pages/faqs';
export * from './pages/faqs-print';
export * from './pages/links';
export * from './pages/search';
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf-8');
  
  console.log(`\n✨ Extraction complete!`);
  console.log(`   📄 Extracted: ${extractedCount} files`);
  console.log(`   ⏭️  Skipped: ${skippedCount} files`);
  console.log(`   📁 Output: ${CONFIG.outputDir}/`);
}

main();

