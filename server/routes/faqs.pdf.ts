import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createError, sendStream, setHeader } from "h3";

/**
 * Dev/SSR fallback for `/faqs.pdf`.
 *
 * In static hosting (Netlify publish = `.output/public`) this route is NOT used,
 * because `faqs.pdf` is emitted as a static file at build time.
 *
 * In local `nuxt dev` (or `nuxt preview`), this prevents a 404 by serving the
 * generated PDF from `.output/public/faqs.pdf` (or `public/faqs.pdf`).
 */
export default defineEventHandler(async (event) => {
  const root = process.cwd();
  const outDir = join(root, ".output", "public");
  const printIndex = join(outDir, "faqs-print", "index.html");
  const candidates = [
    join(outDir, "faqs.pdf"),
    join(outDir, "ICJIA-Accessibility-FAQs.pdf"),
    join(root, "public", "faqs.pdf"),
    join(root, "public", "ICJIA-Accessibility-FAQs.pdf"),
  ];

  let pdfPath: string | null = null;
  for (const p of candidates) {
    try {
      const s = await stat(p);
      if (s.isFile()) {
        pdfPath = p;
        break;
      }
    } catch {
      // ignore
    }
  }

  if (!pdfPath) {
    // Dev convenience: if the generated HTML exists, generate the PDF on-demand.
    // This avoids a confusing 404 when running `nuxt dev` without having run `nuxt generate`.
    try {
      const s = await stat(printIndex);
      if (s.isFile()) {
        await new Promise<void>((resolve, reject) => {
          const child = spawn(
            process.execPath,
            [
              join(root, "scripts", "generate-faq-pdf.js"),
              "--publicDir",
              outDir,
              "--out",
              join(outDir, "ICJIA-Accessibility-FAQs.pdf"),
            ],
            { stdio: "inherit" }
          );
          child.on("error", reject);
          child.on("exit", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`PDF generation exited with code ${code}`));
          });
        });
        pdfPath = join(outDir, "ICJIA-Accessibility-FAQs.pdf");
      }
    } catch {
      // ignore and fall through to 404
    }

    if (!pdfPath) {
      throw createError({
        statusCode: 404,
        statusMessage:
          "FAQs PDF not found. Run `yarn generate` (postgenerate creates faqs.pdf).",
      });
    }
  }

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(
    event,
    "Content-Disposition",
    'attachment; filename="ICJIA-Accessibility-FAQs.pdf"'
  );
  return sendStream(event, createReadStream(pdfPath));
});


