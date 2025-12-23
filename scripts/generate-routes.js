#!/usr/bin/env node

/**
 * @fileoverview Generate routes.json by scanning pages and content directories
 * @description This script scans app/pages and content/ directories to discover
 * all routes and generates a routes.json file. This runs before sitemap generation
 * to ensure routes.json is always current.
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

/**
 * Find all .vue files in a directory recursively
 * @param {string} dir - Directory to search
 * @param {string} baseDir - Base directory for relative paths
 * @returns {string[]} Array of file paths
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
 * Convert a file path to a route path
 * @param {string} filePath - Full file path
 * @param {string} pagesDir - Pages directory path
 * @returns {string} Route path
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
 * Get routes from the pages directory
 * @returns {string[]} Array of route paths
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
 * Find all .md files in a directory recursively
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of file paths
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
 * Convert a markdown file path to a potential route
 * @param {string} filePath - Absolute path to the markdown file
 * @param {string} contentDir - Absolute path to the content directory
 * @returns {string|null} Potential route path, or null if it shouldn't create a route
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
 * Get potential routes from the content directory
 * @returns {string[]} Array of potential route paths from markdown files
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
 * Main function to generate routes.json
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


