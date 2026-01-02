/**
 * Generate a PDF version of the FAQs by printing the prerendered `/faqs-print` page.
 *
 * Intended to run after `nuxt generate`, so `.output/public` exists.
 *
 * Output: `${publicDir}/faqs.pdf` (default)
 *
 * Usage:
 *   node scripts/generate-faq-pdf.js --publicDir .output/public
 *   node scripts/generate-faq-pdf.js --publicDir .output/public --out .output/public/faqs.pdf
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import process from "node:process";
import { chromium } from "playwright";

function getArg(name, fallback = undefined) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  const value = process.argv[idx + 1];
  return value ?? fallback;
}

const publicDir = getArg("--publicDir", ".output/public");
const outPath = getArg("--out", join(publicDir, "ICJIA-Accessibility-FAQs.pdf"));

function contentTypeFor(pathname) {
  const ext = extname(pathname).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".ico") return "image/x-icon";
  if (ext === ".xml") return "application/xml; charset=utf-8";
  if (ext === ".txt") return "text/plain; charset=utf-8";
  if (ext === ".woff2") return "font/woff2";
  return "application/octet-stream";
}

function safeJoin(root, reqPath) {
  const cleaned = reqPath.split("?")[0]?.split("#")[0] || "/";
  const normalized = normalize(cleaned).replace(/^(\.\.(\/|\\|$))+/, "");
  return join(root, normalized);
}

async function ensureExists(path) {
  try {
    const s = await stat(path);
    return s.isFile() || s.isDirectory();
  } catch {
    return false;
  }
}

async function main() {
  const printIndex = join(publicDir, "faqs-print", "index.html");
  if (!(await ensureExists(printIndex))) {
    console.error(
      `[generate-faq-pdf] Missing ${printIndex}. Did you run \`nuxt generate\` first?`
    );
    process.exit(1);
  }

  // Minimal static file server for `.output/public`
  const server = createServer(async (req, res) => {
    try {
      const url = req.url || "/";
      const pathOnly = url.split("?")[0] || "/";

      // Map route paths to index.html (Nuxt generate output)
      const mappedPath =
        pathOnly === "/"
          ? "/index.html"
          : pathOnly.endsWith("/")
            ? `${pathOnly}index.html`
            : pathOnly;

      let filePath = safeJoin(publicDir, mappedPath);

      // If user requested `/faqs-print`, serve its index
      if (pathOnly === "/faqs-print") {
        filePath = join(publicDir, "faqs-print", "index.html");
      }

      // If exact file doesn't exist, try directory index
      if (!(await ensureExists(filePath))) {
        const tryIndex = join(filePath, "index.html");
        if (await ensureExists(tryIndex)) {
          filePath = tryIndex;
        } else {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
      }

      const data = await readFile(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", contentTypeFor(filePath));
      res.end(data);
    } catch (e) {
      res.statusCode = 500;
      res.end("Server error");
      console.error("[generate-faq-pdf] static server error:", e);
    }
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const addr = server.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;
  const url = `http://127.0.0.1:${port}/faqs-print/`;

  console.log(`[generate-faq-pdf] Serving ${publicDir} on ${url}`);
  console.log(`[generate-faq-pdf] Generating PDF → ${outPath}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  // Wait for fonts (best-effort)
  await page.evaluate(async () => {
    // @ts-ignore
    if (document.fonts?.ready) {
      // @ts-ignore
      await document.fonts.ready;
    }
  });

  await page.pdf({
    path: outPath,
    format: "Letter",
    printBackground: true,
    margin: {
      top: "0.5in",
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
  });

  await browser.close();
  server.close();

  console.log("[generate-faq-pdf] Done.");
}

main().catch((e) => {
  console.error("[generate-faq-pdf] Failed:", e);
  process.exit(1);
});


