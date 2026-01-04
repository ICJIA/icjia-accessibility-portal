import { createReadStream } from "node:fs";
import { stat, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { spawn } from "node:child_process";
import { createError, sendStream, setHeader } from "h3";

/**
 * Server route for `/ICJIA-Accessibility-FAQs.docx`
 *
 * In static hosting, this route is NOT used because the file is pre-generated.
 * In local dev/preview, this generates the file on-demand.
 */
export default defineEventHandler(async (event) => {
  const root = process.cwd();
  const filename = "ICJIA-Accessibility-FAQs.docx";
  
  // Check multiple locations for the file
  const candidates = [
    join(root, ".output", "public", filename),
    join(root, "public", filename),
  ];

  let filePath: string | null = null;
  for (const p of candidates) {
    try {
      const s = await stat(p);
      if (s.isFile()) {
        filePath = p;
        break;
      }
    } catch {
      // ignore
    }
  }

  // If not found, generate on-demand
  if (!filePath) {
    const inputPath = join(root, "content", "faqs.md");
    const outputDir = join(root, "public");
    const outputPath = join(outputDir, filename);

    try {
      // Ensure output directory exists
      await mkdir(outputDir, { recursive: true });

      // Generate the docx file
      await new Promise<void>((resolve, reject) => {
        const child = spawn(
          process.execPath,
          [
            join(root, "scripts", "generate-faq-docx.js"),
            "--input",
            inputPath,
            "--out",
            outputPath,
          ],
          { stdio: "inherit" }
        );
        child.on("error", reject);
        child.on("exit", (code) => {
          if (code === 0) resolve();
          else reject(new Error(`DOCX generation exited with code ${code}`));
        });
      });

      filePath = outputPath;
    } catch (error) {
      console.error("[DOCX route] Generation failed:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to generate Word document. Check server logs.",
      });
    }
  }

  setHeader(event, "Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
  return sendStream(event, createReadStream(filePath));
});

