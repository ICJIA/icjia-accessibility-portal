import { createReadStream } from "node:fs";
import { stat, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createError, sendStream, setHeader } from "h3";

/**
 * Server route for `/ICJIA-Accessibility-FAQs.txt`
 *
 * In static hosting, this route is NOT used because the file is pre-generated.
 * In local dev/preview, this generates the file on-demand.
 */
export default defineEventHandler(async (event) => {
  const root = process.cwd();
  const filename = "ICJIA-Accessibility-FAQs.txt";
  
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

      // Generate the txt file
      await new Promise<void>((resolve, reject) => {
        const child = spawn(
          process.execPath,
          [
            join(root, "scripts", "generate-faq-txt.js"),
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
          else reject(new Error(`TXT generation exited with code ${code}`));
        });
      });

      filePath = outputPath;
    } catch (error) {
      console.error("[TXT route] Generation failed:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to generate text file. Check server logs.",
      });
    }
  }

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
  return sendStream(event, createReadStream(filePath));
});

