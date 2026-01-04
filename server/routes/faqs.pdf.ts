import { createError } from "h3";

/**
 * Legacy route handler for `/faqs.pdf`.
 *
 * The PDF download has been replaced with accessible document formats.
 * This route now redirects users to the accessible alternatives.
 */
export default defineEventHandler(async (event) => {
  // Return a helpful error message directing users to accessible alternatives
  throw createError({
    statusCode: 410, // Gone - resource no longer available
    statusMessage:
      "The PDF download has been replaced with accessible document formats. Please use the Download button to choose between Word (.docx) or Plain Text (.txt) formats.",
    data: {
      alternatives: [
        {
          format: "Word Document",
          url: "/ICJIA-Accessibility-FAQs.docx",
          description: "Formatted document with headings, tables, and links",
        },
        {
          format: "Plain Text",
          url: "/ICJIA-Accessibility-FAQs.txt",
          description: "Simple text file readable by any device",
        },
      ],
      reason:
        "PDFs generated via browser print are not accessible to screen readers. We now provide fully accessible document formats.",
    },
  });
});
