#!/usr/bin/env node

/**
 * @fileoverview Generate routes.json by scanning pages and content directories
 * @description This script scans app/pages and content/ directories to discover
 * all routes and generates a routes.json file. This runs before sitemap generation
 * to ensure routes.json is always current.
 *
 * The script:
 * - Scans app/pages directory for .vue files and converts them to routes
 * - Scans content/ directory for .md files that may create routes
 * - Handles index files correctly (index.vue → /)
 * - Generates routes.json with timestamp and sorted route list
 *
 * This is used by the sitemap generation script to discover all available routes.
 *
 * @author ICJIA
 * @version 1.0.0
 *
 * @see {@link ./generate-sitemap.js} The sitemap generation script that uses routes.json
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
} from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * Current file path (ES module compatible)
 * @type {string}
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Current directory path
 * @type {string}
 */
const __dirname = dirname(__filename);

/**
 * Project root directory (one level up from scripts directory)
 * @type {string}
 */
const projectRoot = join(__dirname, "..");

/**
 * Recursively finds all .vue files in a directory and its subdirectories.
 *
 * This function traverses the directory tree and collects all Vue component files
 * that represent pages in the Nuxt application.
 *
 * @param {string} dir - Absolute path to the directory to search
 * @param {string} baseDir - Base directory for relative paths (currently unused but kept for API compatibility)
 * @returns {string[]} Array of absolute file paths to all .vue files found
 *
 * @example
 * ```js
 * const files = findVueFiles("/app/pages", "/app/pages");
 * // Returns: ["/app/pages/index.vue", "/app/pages/links.vue", "/app/pages/faqs/index.vue"]
 * ```
 */
function findVueFiles(dir, baseDir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findVueFiles(fullPath, baseDir));
      } else if (entry.isFile() && entry.name.endsWith(".vue")) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Ignore errors
  }
  return files;
}

/**
 * Converts a file path to a route path.
 *
 * Handles:
 * - Index files: index.vue → /
 * - Nested files: faqs/index.vue → /faqs
 * - Regular files: links.vue → /links
 * - Ensures route starts with /
 *
 * @param {string} filePath - Absolute file path to the Vue component
 * @param {string} pagesDir - Absolute path to the pages directory
 * @returns {string} Route path (e.g., "/", "/links", "/faqs")
 *
 * @example
 * ```js
 * filePathToRoute("/app/pages/index.vue", "/app/pages") // Returns "/"
 * filePathToRoute("/app/pages/links.vue", "/app/pages") // Returns "/links"
 * filePathToRoute("/app/pages/faqs/index.vue", "/app/pages") // Returns "/faqs"
 * ```
 */
function filePathToRoute(filePath, pagesDir) {
  const relativePath = relative(pagesDir, filePath);
  let route = relativePath.replace(/\.vue$/, "").replace(/\\/g, "/");

  // Handle index files
  if (route.endsWith("/index") || route === "index") {
    route = route.replace(/\/?index$/, "") || "/";
  }

  // Ensure route starts with /
  if (!route.startsWith("/")) {
    route = "/" + route;
  }

  return route;
}

/**
 * Gets all routes from the pages directory.
 *
 * Scans the app/pages directory for .vue files and converts them to route paths.
 * Always includes the root route (/) if any pages are found.
 *
 * @returns {string[]} Sorted array of route paths from the pages directory
 *
 * @example
 * ```js
 * const routes = getRoutesFromPages();
 * // Returns: ["/", "/faqs", "/links"]
 * ```
 */
function getRoutesFromPages() {
  const pagesDir = join(projectRoot, "app", "pages");
  const routes = new Set();

  if (!existsSync(pagesDir)) {
    return [];
  }

  const pageFiles = findVueFiles(pagesDir, pagesDir);

  for (const file of pageFiles) {
    const route = filePathToRoute(file, pagesDir);
    routes.add(route);
  }

  // Always include root if we have any pages
  if (pageFiles.length > 0) {
    routes.add("/");
  }

  return Array.from(routes).sort();
}

/**
 * Recursively finds all .md files in a directory and its subdirectories.
 *
 * This function traverses the directory tree and collects all markdown files
 * that may represent content pages in the Nuxt Content module.
 *
 * @param {string} dir - Absolute path to the directory to search
 * @returns {string[]} Array of absolute file paths to all .md files found
 *
 * @example
 * ```js
 * const files = findMarkdownFiles("/content");
 * // Returns: ["/content/faqs.md", "/content/links.md"]
 * ```
 */
function findMarkdownFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Ignore errors
  }
  return files;
}

/**
 * Converts a markdown file path to a potential route path.
 *
 * Handles:
 * - Index files: index.md → /
 * - Regular files: faqs.md → /faqs
 * - Nested files: blog/post.md → /blog/post
 * - Filters out invalid paths (empty, just ".")
 *
 * Note: Not all markdown files create routes - some are used as data sources.
 * This function provides potential routes that Nuxt Content might create.
 *
 * @param {string} filePath - Absolute path to the markdown file
 * @param {string} contentDir - Absolute path to the content directory
 * @returns {string|null} Potential route path, or null if it shouldn't create a route
 *
 * @example
 * ```js
 * markdownFileToRoute("/content/faqs.md", "/content") // Returns "/faqs"
 * markdownFileToRoute("/content/index.md", "/content") // Returns "/"
 * markdownFileToRoute("/content/blog/post.md", "/content") // Returns "/blog/post"
 * ```
 */
function markdownFileToRoute(filePath, contentDir) {
  const relativePath = relative(contentDir, filePath);
  let route = relativePath.replace(/\.md$/, "");

  // Handle index files
  if (route.endsWith("/index") || route === "index") {
    route = route.replace(/\/?index$/, "") || "/";
  }

  // Skip if empty or just a dot
  if (!route || route === ".") {
    return null;
  }

  // Ensure route starts with /
  if (!route.startsWith("/")) {
    route = "/" + route;
  }

  return route;
}

/**
 * Gets potential routes from the content directory.
 *
 * Scans the content/ directory for .md files and converts them to potential route paths.
 * Note: Not all markdown files create routes - some are used as data sources by Nuxt Content.
 *
 * @returns {string[]} Sorted array of potential route paths from markdown files
 *
 * @example
 * ```js
 * const routes = getRoutesFromContent();
 * // Returns: ["/faqs", "/links"] (if faqs.md and links.md exist)
 * ```
 */
function getRoutesFromContent() {
  const contentDir = join(projectRoot, "content");
  const routes = new Set();

  if (!existsSync(contentDir)) {
    return [];
  }

  const mdFiles = findMarkdownFiles(contentDir);

  for (const file of mdFiles) {
    const route = markdownFileToRoute(file, contentDir);
    if (route) {
      routes.add(route);
    }
  }

  return Array.from(routes).sort();
}

/**
 * Main function to generate routes.json.
 *
 * Orchestrates the route generation process:
 * 1. Scans app/pages directory for Vue components
 * 2. Scans content/ directory for markdown files
 * 3. Combines and deduplicates routes
 * 4. Generates routes.json with timestamp and sorted route list
 * 5. Writes routes.json to project root
 *
 * The generated routes.json file has the format:
 * ```json
 * {
 *   "generated": "2026-01-01T00:00:00.000Z",
 *   "routes": ["/", "/faqs", "/links"]
 * }
 * ```
 *
 * @returns {void}
 * @throws {Error} Exits with code 1 if route generation fails
 */
function main() {
  try {
    console.log("");
    console.log("┌" + "─".repeat(78) + "┐");
    console.log(
      "│" + " ".repeat(25) + "ROUTES GENERATION" + " ".repeat(35) + "│"
    );
    console.log("└" + "─".repeat(78) + "┘");
    console.log("");

    const allRoutes = new Set(["/"]); // Always include root

    // Get routes from pages directory
    console.log("Scanning app/pages directory...");
    const pageRoutes = getRoutesFromPages();
    pageRoutes.forEach((route) => allRoutes.add(route));
    console.log(`  Found ${pageRoutes.length} route(s) from pages`);

    // Get routes from content directory
    console.log("Scanning content directory...");
    const contentRoutes = getRoutesFromContent();
    contentRoutes.forEach((route) => allRoutes.add(route));
    console.log(`  Found ${contentRoutes.length} route(s) from content`);

    const sortedRoutes = Array.from(allRoutes).sort();
    const routesData = {
      generated: new Date().toISOString(),
      routes: sortedRoutes,
    };

    const routesJsonPath = join(projectRoot, "routes.json");
    writeFileSync(routesJsonPath, JSON.stringify(routesData, null, 2), "utf-8");

    console.log("");
    console.log(
      `✅ Generated routes.json with ${sortedRoutes.length} route(s):`
    );
    console.log("   " + sortedRoutes.join(", "));
    console.log("");
  } catch (error) {
    console.error("❌ Error generating routes.json:", error);
    process.exit(1);
  }
}

main();
