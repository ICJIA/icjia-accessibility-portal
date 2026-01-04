#!/usr/bin/env node
/**
 * Comprehensive test runner that:
 * 1. Detects if E2E tests are enabled
 * 2. Starts dev server if E2E tests are enabled
 * 3. Runs all tests (unit, nuxt, e2e)
 * 4. Generates comprehensive reports (JSON + HTML)
 * 5. Cleans up dev server
 */

import {
  writeFileSync,
  existsSync,
  readFileSync,
  unlinkSync,
  mkdirSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const outputPath = join(__dirname, "failed-tests.json");
const fullResultsPath = join(__dirname, "test-results.json");
const htmlReportPath = join(rootDir, "public", "docs", "tests", "index.html");

/**
 * Test Descriptions
 * Maps test name patterns to human-readable descriptions explaining what each test verifies.
 * Used to generate expandable documentation in the HTML test report.
 */
const TEST_DESCRIPTIONS = {
  // FAQ Download Generators
  "should generate a plain text file from markdown": "Verifies the TXT generator script reads content/faqs.md and produces ICJIA-Accessibility-FAQs.txt. The script uses Node.js file system APIs to read Markdown input and write formatted plain text output to the public directory.",
  "should include proper header with metadata": "Checks that generated files include the official ICJIA header with agency name, generation date (formatted as 'January 4, 2026'), source URL (https://accessibility.icjia.app), and ADA Title II compliance deadline. This metadata helps users identify the document source and currency.",
  "should convert headings to uppercase with separators": "Ensures Markdown headings are converted to accessible plain text structure: H1 uses '=' separators, H2 uses '-' separators, and H3 uses '~' separators. This creates visual hierarchy for users reading the document in basic text editors without rich formatting support.",
  "should preserve links with URLs in parentheses": "Verifies that Markdown links like [ICJIA](https://icjia.illinois.gov) are converted to 'ICJIA (https://icjia.illinois.gov)' format. This ensures users can access linked resources when viewing plain text, where clickable hyperlinks aren't available.",
  "should remove markdown formatting symbols": "Confirms that Markdown syntax markers are stripped: **bold** becomes 'bold', *italic* becomes 'italic', and `code` is quoted. This produces clean readable text while preserving the semantic content that formatting conveyed.",
  "should include footer with copyright": "Checks that generated documents end with ICJIA copyright notice (© 2026), official website URL (https://icjia.illinois.gov), accessibility portal link, and contact information for DoIT.Accessibility@Illinois.gov. This ensures proper attribution and provides support resources.",
  "should handle {new:} tags appropriately": "Verifies that {new:YYYY-MM-DD} date tags embedded in FAQ content are either stripped completely (in TXT) or converted to visible '[NEW]' indicators. These tags mark recently updated content within the 10-day 'new' window defined in the application.",
  "should be readable as plain ASCII text": "Ensures the output contains only standard ASCII characters (codes 0-127) without Unicode special characters. This guarantees compatibility with legacy systems, screen readers, and basic text editors that may not support extended character sets.",
  "should generate a markdown file from source": "Verifies the MD generator creates ICJIA-Accessibility-FAQs.md with a formatted header including metadata table, preserves the source Markdown content, and adds a footer with document information. The output is suitable for GitHub, VS Code, Obsidian, and other Markdown viewers.",
  "should remove original YAML frontmatter": "Ensures the source file's YAML frontmatter block (delimited by '---') containing title and other metadata is stripped and replaced with a human-readable header section. This produces cleaner standalone documentation without build-system-specific configuration.",
  "should preserve markdown formatting": "Confirms that Markdown syntax including headings (#, ##, ###), bold (**text**), italic (*text*), inline code (`code`), links ([text](url)), blockquotes (>), and lists (-, 1.) are preserved exactly as authored. This maintains full formatting capability for Markdown-aware applications.",
  "should preserve tables": "Verifies that Markdown pipe-table syntax (| Header | Header |) is kept intact in the generated file. Tables are used throughout the FAQs for structured information like deadline dates and compliance requirements, and must render correctly in Markdown viewers.",
  "should convert {new:} tags to visible badges": "Checks that {new:YYYY-MM-DD} date tags are converted to '🆕 *New*' emoji badges in Markdown output. This provides visual indication of recently updated content while maintaining Markdown syntax that renders as styled text in compatible viewers.",
  "should include footer with document info": "Ensures the Markdown output includes a '## Document Information' section with a table containing Organization (ICJIA), Website URL, Accessibility Portal URL, Generation date, and Compliance Deadline. This structured footer provides complete document provenance information.",
  "should generate a docx file from markdown": "Verifies the DOCX generator uses the 'docx' npm library to create a Word document with proper Office Open XML structure. The generator parses Markdown headings, paragraphs, lists, tables, and links, converting them to Word document elements with appropriate styles.",
  "should create a valid ZIP-based docx file": "Confirms the output starts with the 'PK' ZIP signature (bytes 0x504B0304) that identifies Office Open XML files. DOCX files are ZIP archives containing XML files for document content, styles, and relationships. Invalid ZIP structure would prevent the document from opening.",
  "should have reasonable file size": "Ensures the generated DOCX is between 5KB and 1MB, which indicates proper content generation without bloat. Files too small suggest missing content; files too large may indicate embedded binary data or generation errors. The typical FAQ document should be 20-100KB.",
  "should contain document content in XML format": "Verifies the DOCX archive contains word/document.xml with the document body, including heading styles (w:pStyle), paragraph text (w:t), tables (w:tbl), and hyperlinks (w:hyperlink). This XML structure enables Word and other applications to render the document correctly.",
  
  // Download File Accessibility
  "should be readable without any special software": "Verifies plain text files contain only standard characters and formatting that any basic text editor (Notepad, TextEdit, nano, vim) can display correctly. The file should not require Word processors, PDF readers, or specialized accessibility software.",
  "should use clear visual structure with ASCII separators": "Checks that plain text files use ASCII separator patterns: '=' characters for major sections (H1), '-' characters for subsections (H2), '~' characters for questions (H3), and '•' bullet points for lists. These visual patterns provide document structure without requiring rich text formatting.",
  "should have proper heading hierarchy": "Ensures Markdown files maintain correct heading structure: single H1 for document title, H2 for major sections (Executive Summary, Compliance Requirements), and H3 for individual FAQ questions. This hierarchy is required for screen reader navigation and accessibility compliance.",
  "should be a valid Office Open XML file": "Confirms DOCX files can be loaded as ZIP archives using JSZip and contain the required Office Open XML structure: [Content_Types].xml for file type definitions, word/document.xml for content, docProps/core.xml for metadata. Invalid structure would prevent Microsoft Word from opening the file.",
  "should contain structured content": "Verifies DOCX files include accessibility features: proper heading styles (Heading1-4) for navigation, paragraph spacing for readability, hyperlink preservation with r:id references, numbered/bulleted lists with w:numPr elements, and tables with proper cell structure (w:tc, w:tr) for screen reader table navigation.",
  
  // DownloadDialog Component
  "should render when modelValue is true": "Verifies the v-dialog component and its v-card content are rendered in the DOM when the modelValue prop is true. The dialog uses Vue 3 v-model pattern where the parent controls visibility through the modelValue prop binding.",
  "should not render dialog content when modelValue is false": "Confirms the dialog content (v-card with download options) is not rendered when modelValue is false. This prevents unnecessary DOM elements when the dialog is closed and follows Vue's conditional rendering best practices with v-if behavior.",
  "should display dialog title": "Checks that the dialog header contains 'Download FAQs' text with an mdi-download icon. The title is assigned a unique ID (download-dialog-title-*) for aria-labelledby association, ensuring screen readers announce the dialog purpose when opened.",
  "should display description text": "Verifies the introductory text 'Choose your preferred accessible format...' is displayed below the title. This description helps users understand that all formats are accessible and guides their selection decision.",
  "should display Word Document option": "Confirms the DOCX download option card displays with mdi-file-word icon, '.docx' extension, description mentioning Microsoft Word/Google Docs/LibreOffice compatibility, and the accessibility note about heading structure for screen reader navigation.",
  "should display Markdown option": "Confirms the MD download option displays with mdi-language-markdown icon, explanation that it's plain text with formatting syntax, and mentions VS Code, GitHub, Obsidian, and Typora as compatible viewers for rich rendering of Markdown content.",
  "should display Plain Text option": "Confirms the TXT download option displays with mdi-file-document-outline icon, 'Maximum compatibility' description, and notes that it works on any device including screen readers without requiring special software installation.",
  "should have correct download links": "Verifies the three download anchor elements have correct href attributes: '/ICJIA-Accessibility-FAQs.docx', '/ICJIA-Accessibility-FAQs.md', and '/ICJIA-Accessibility-FAQs.txt'. These paths must match the files generated during build and served by the server routes in development.",
  "should have download attributes on links": "Checks that each download link includes the 'download' HTML attribute with the correct filename value. This attribute triggers browser download behavior rather than navigation, and provides the suggested filename for the saved file.",
  "should display accessibility notes for each format": "Verifies each format option shows a green checkmark accessibility indicator: DOCX shows 'Proper heading structure for navigation', MD shows 'Readable as plain text, renders with formatting', TXT shows 'Universal format, works everywhere'. These notes help users choose based on their accessibility needs.",
  "should have expandable Markdown explanation": "Confirms the details/summary HTML element with 'What is Markdown? How do I view it?' is present and functional. When clicked, it expands to show comprehensive Markdown viewing instructions without cluttering the main dialog interface.",
  "should explain what Markdown is": "Checks that the expanded section explains Markdown uses symbols like # for headings, **bold** for bold text, and [text](url) for links. This education helps users unfamiliar with Markdown understand they can view it as plain text or with rich formatting.",
  "should include Windows native options": "Verifies the Markdown explanation lists Windows-specific viewing options: Notepad (built-in plain text), WordPad (built-in), Microsoft Edge (drag & drop viewing), and Visual Studio Code (with 'Open Preview' for formatted view). This helps Windows users view files without additional software.",
  "should include macOS native options": "Verifies the Markdown explanation lists macOS-specific viewing options: TextEdit (built-in), Quick Look (Space key in Finder), Safari (drag & drop), Xcode (if installed), and Visual Studio Code. This ensures Mac users know their native viewing options.",
  "should include cross-platform apps": "Confirms the explanation lists free cross-platform Markdown applications: VS Code (best free option with live preview), Obsidian (note-taking app), Typora (live-preview editor), and Mark Text (open-source). These work on Windows, Mac, and Linux.",
  "should include online viewers": "Verifies online Markdown viewing options are listed with actual hyperlinks: Dillinger.io for drag-and-drop viewing, StackEdit.io for full-featured editing, and GitHub for pasting into Gists. These options require no software installation.",
  "should have aria-labelledby for dialog": "Checks the v-dialog component has aria-labelledby attribute pointing to the dialog title element's ID. This WCAG requirement ensures screen readers announce the dialog title when the modal opens, providing context for keyboard and screen reader users.",
  "should have download options with role=\"list\"": "Verifies the container div holding download options has role='list' attribute. Combined with role='listitem' on children, this creates proper list semantics for screen readers to announce 'list of 3 items' when navigating the download options.",
  "should have download options with role=\"listitem\"": "Confirms each of the three download option anchor elements has role='listitem' attribute. This creates proper ARIA list semantics so screen readers announce position (e.g., '1 of 3') when users navigate between download format choices.",
  "should have cancel button with aria-label": "Checks the Cancel button includes aria-label='Close download dialog' attribute. Since the button text is just 'Cancel', the aria-label provides additional context that this action closes the dialog rather than canceling a download in progress.",
  "should emit update:modelValue when cancel is clicked": "Verifies clicking the Cancel button emits an 'update:modelValue' event with value 'false'. This follows Vue 3's v-model pattern where the child component requests the parent to update the modelValue prop, properly closing the dialog.",
  "should include tip for screen reader users": "Confirms a highlighted tip note is displayed: 'For screen reader users, the Word document format preserves heading structure for easy navigation.' This guidance helps users with visual impairments choose the most accessible format for their assistive technology.",
  "should indicate Markdown is good for LLM input": "Verifies the Markdown option displays a robot icon badge with 'Great for AI: Ideal for pasting into ChatGPT, Claude, or other LLMs'. This indicates Markdown's clean text format works well for AI language model input without formatting artifacts.",
  "should indicate Plain Text is good for LLM input": "Verifies the Plain Text option displays a robot icon badge with 'Great for AI: Perfect for pasting into ChatGPT, Claude, or other LLMs'. Plain text is the most reliable format for AI tools as it has no hidden formatting that could interfere.",
  "should explain how to use with AI assistants": "Confirms the expanded Markdown section includes step-by-step instructions: 1) Open the file in a text editor, 2) Select all and copy (Ctrl+A, Ctrl+C or Cmd+A, Cmd+C), 3) Paste into AI chat. This practical guidance helps users leverage AI for understanding accessibility requirements.",
  "should mention specific AI tools": "Checks that the dialog text explicitly mentions current popular AI assistants: ChatGPT, Claude, Gemini, and Copilot. Naming specific tools helps users understand the practical applications and provides searchable terms if they need to learn more.",
  
  // DownloadDialog Responsive Design
  "should use fullscreen prop for mobile detection": "Verifies the dialog component exists and is configured for responsive behavior. The component uses Vuetify's useDisplay composable with smAndDown breakpoint to detect mobile devices, rendering fullscreen on screens smaller than 600px.",
  "should have responsive CSS classes": "Confirms the component includes the necessary CSS class structure (download-dialog, download-dialog-content) that contains responsive media queries for tablet, mobile, and very small screen adaptations.",
  "should have touch-friendly minimum heights on download options": "Verifies all three download option buttons exist and will receive the CSS min-height of 60px on mobile (per WCAG touch target guidelines). This ensures users can easily tap options on touchscreen devices.",
  
  // FaqAccordion Component
  "should render FAQ items": "Verifies the FaqAccordion component renders a v-expansion-panel for each FAQ item passed in the items prop. Each panel contains a question header (v-expansion-panel-title) and answer content (v-expansion-panel-text) with proper Vuetify accordion behavior.",
  "should display question text": "Confirms FAQ question text from the 'question' property is displayed in the accordion panel header. The question text should be visible when the accordion is both collapsed and expanded, serving as the clickable trigger to reveal the answer.",
  "should display new badge when isNew is true": "Verifies that FAQ items with isNew:true display a 'New' badge chip next to the question text. The badge uses v-chip with 'success' color variant and 'NEW' text to highlight recently added content within the 10-day window defined by NEW_QUESTION_DAYS.",
  "should not display new badge when isNew is false": "Confirms that FAQ items with isNew:false or undefined do not display the 'New' badge chip. This ensures the badge only appears for genuinely new content and maintains visual consistency for established FAQ items.",
  "should generate question IDs correctly": "Checks that each FAQ item receives a unique HTML id attribute generated from the section and question text using the useSlugify composable. These IDs enable direct URL linking (e.g., #executive-summary-what-is-accessibility) and in-page navigation.",
  "should handle empty items array": "Verifies the component gracefully handles an empty items array without throwing errors or rendering broken UI. This is important for sections that may temporarily have no FAQ content or when content is still loading.",
  "should use sectionId when provided": "Confirms that when a sectionId prop is provided, it's incorporated into the generated question IDs as a prefix. This creates unique anchors even when identical question text appears in different sections (e.g., 'executive-summary-q1' vs 'compliance-q1').",
  
  // Search Functionality
  "should return results for exact match in question": "Verifies that searching for exact question text (e.g., 'What is WCAG?') returns the matching FAQ item. The Fuse.js search engine is configured to search the 'question' field with high weight, so exact matches should appear with the best relevance scores.",
  "should return results for partial match": "Confirms that partial word searches (e.g., 'access' matching 'accessibility') return relevant FAQ items. Fuse.js tokenizes search terms and matches against word fragments, enabling users to find content without typing complete phrases.",
  "should return empty array for no matches": "Verifies that search queries with no matching content (e.g., 'xyz123nonexistent') return an empty array rather than null or throwing an error. This ensures the UI can safely display 'No results found' messaging.",
  "should search in both question and answer fields": "Confirms the Fuse.js configuration includes both 'question' and 'answer' keys in its search index. This allows users to find FAQs based on answer content even when the question phrasing doesn't match their search terms.",
  "should return results sorted by score ascending": "Verifies results are ordered by Fuse.js score from lowest to highest (0 = perfect match, 1 = no match). This ensures the most relevant results appear first in the search results list for better user experience.",
  "should rank exact question match highest": "Confirms that an exact match in the question field (weight: 2.0) receives a lower (better) score than partial matches. This prioritizes FAQs where the user's search directly matches what they're looking for.",
  "should rank question matches higher than answer-only matches": "Verifies the search weighting system where question matches (weight: 2.0) score better than answer-only matches (weight: 1.0). Users typically search using question phrasing, so question matches are more likely to be what they want.",
  "should order results from closest to partial match": "Confirms the search results array is sorted so items with the lowest Fuse.js scores (best matches) appear before items with higher scores (weaker matches). This ordering is critical for displaying the most helpful results first.",
  "should include score in results": "Verifies each search result object includes the 'score' property from Fuse.js. This score (0-1 range) is used for relevance labeling (Excellent/Good/Fair/Partial) and allows the UI to communicate match quality to users.",
  "should have scores between 0 and 1": "Confirms Fuse.js scores are normalized to the 0-1 range where 0 represents a perfect match and 1 represents no match. This normalization enables consistent thresholding and relevance labeling across different search queries.",
  "should return best matches with scores below threshold": "Verifies the search threshold (0.6 by default) filters out weak matches. Results with scores above 0.6 are considered too weak to be useful and are excluded, preventing users from seeing irrelevant FAQ items.",
  "should include match indices in results": "Confirms Fuse.js returns 'matches' array with 'indices' property indicating exact character positions where the search term was found. This data enables the UI to highlight matched text within questions and answers.",
  "should provide match positions for highlighting": "Verifies the indices arrays contain [start, end] tuples marking matched text ranges. The search results page uses these positions to wrap matched text in <mark> elements for visual highlighting of relevant terms.",
  "should identify which key matched": "Confirms each match object includes a 'key' property indicating whether the match occurred in 'question' or 'answer' field. This allows the UI to show different highlighting or messaging based on where the match was found.",
  "should find results with typos": "Verifies Fuse.js fuzzy matching handles common spelling errors (e.g., 'accessability' matching 'accessibility'). The fuzzy threshold allows for character substitutions, insertions, and deletions typical of user typos.",
  "should find results with partial words": "Confirms partial word searches (e.g., 'comply' matching 'compliance') return relevant results. This substring matching is important because users often don't know the exact terminology used in FAQ questions.",
  "should handle case-insensitive search": "Verifies the search is case-insensitive so 'WCAG', 'wcag', and 'Wcag' all return the same results. This matches user expectations and prevents missed results due to capitalization differences.",
  "should label very close matches as Excellent": "Confirms scores below 0.1 are labeled as 'Excellent' match quality. These near-perfect matches occur when the search term closely matches question or answer text with minimal fuzzy distance.",
  "should label good matches appropriately": "Verifies scores between 0.1 and 0.3 are labeled as 'Good' match quality. These strong matches indicate the search term was found with minor variations or as part of longer text passages.",
  "should label fair matches appropriately": "Confirms scores between 0.3 and 0.5 are labeled as 'Fair' match quality. These moderate matches may involve word fragments, synonyms, or partial phrase matches that are still likely relevant.",
  "should label weak matches as Partial": "Verifies scores above 0.5 (but below the 0.6 threshold) are labeled as 'Partial' match quality. These weaker matches may be tangentially related and are shown last in results with reduced visual prominence.",
  "should handle undefined score": "Confirms the relevance labeling function handles edge cases where the score property is undefined or null. This prevents runtime errors when processing malformed search results or edge cases in the Fuse.js output.",
  "should return results quickly for small datasets": "Verifies search execution completes within acceptable time limits (typically <100ms) for the FAQ dataset. Since the FAQ list is relatively small (<200 items), Fuse.js should provide near-instantaneous results for good user experience.",
  "should handle multiple sequential searches": "Confirms the search engine handles rapid consecutive searches without memory leaks, race conditions, or accumulated state. Users may type quickly, triggering multiple searches in succession as they refine their query.",
  "should handle empty search query": "Verifies an empty string search returns an empty results array without errors. The search input may be cleared by users, and the system should gracefully reset to showing no results rather than all FAQs.",
  "should handle single character search": "Confirms single-character searches (e.g., 'a') work correctly, typically returning empty results since the minimum match length is usually 2-3 characters. This prevents overwhelming users with irrelevant matches.",
  "should handle special characters": "Verifies searches containing special characters (e.g., '?', '@', '#', '&') don't break the search engine or cause regex errors. These characters should be treated literally or safely escaped.",
  "should handle very long search queries": "Confirms the search engine handles unusually long queries (100+ characters) without performance degradation or crashes. While rare, users may paste full sentences or paragraphs into the search box.",
  "should handle search with numbers": "Verifies numeric searches (e.g., '2026', '2.1') return relevant FAQs containing those numbers. Compliance deadlines, WCAG versions, and other numeric references should be searchable.",
  "should preserve section information in results": "Confirms each search result includes the 'section' property indicating which FAQ category (Executive Summary, Compliance Requirements, etc.) the item belongs to. This context helps users evaluate result relevance.",
  "should include isNew flag in results": "Verifies search results preserve the 'isNew' boolean flag from the original FAQ data. This allows the search results page to display 'New' badges on recently added items, maintaining visual consistency with the main FAQ page.",
  
  // SEO and Structured Data
  "should set basic SEO meta tags with default values": "Verifies the useSeo composable sets default meta tags including title, description, og:title, og:description, og:type, and canonical URL. These defaults ensure every page has proper SEO even without explicit configuration.",
  "should set custom title with site name suffix": "Confirms page titles follow the pattern 'Page Title | ICJIA Accessibility Portal' where the site name is automatically appended. This branding consistency helps users identify the site in browser tabs and search results.",
  "should set custom description": "Verifies the meta description tag can be set per-page for SEO. Each page should have a unique description (150-160 characters) that accurately summarizes the page content for search engine snippets.",
  "should build full URL from relative path": "Confirms relative URL paths like '/faqs' are converted to absolute URLs like 'https://accessibility.icjia.app/faqs'. Absolute URLs are required for Open Graph, canonical links, and sitemap entries.",
  "should handle URL with leading slash": "Verifies URLs starting with '/' are correctly joined with the base URL without creating double slashes. The buildUrl function should produce 'https://example.com/page' not 'https://example.com//page'.",
  "should handle URL without leading slash": "Confirms URLs without a leading '/' are still correctly joined with the base URL. The buildUrl function should handle both 'page' and '/page' inputs to produce the same valid absolute URL.",
  "should build image URL from relative path": "Verifies Open Graph image URLs are generated from relative paths like '/icjia-logo.png' to 'https://accessibility.icjia.app/icjia-logo.png'. This enables social media platforms to display preview images.",
  "should use absolute image URL as-is": "Confirms that absolute image URLs (starting with http:// or https://) are preserved unchanged. This allows using external image CDNs or already-absolute URLs without double-prefixing.",
  "should handle keywords array": "Verifies an array of keywords like ['accessibility', 'WCAG', 'ADA'] is joined into a comma-separated meta keywords string. While keywords meta tag has reduced SEO value, it aids internal search and categorization.",
  "should handle article type with published time": "Confirms setting type: 'article' and publishedTime generates article:published_time meta tag for Open Graph. This is used on blog-style content to indicate publication date in social media previews.",
  "should handle noindex and nofollow flags": "Verifies setting noindex: true adds 'noindex' to the robots meta tag (preventing search engine indexing) and nofollow: true adds 'nofollow' (preventing link following). Used for print pages, admin pages, or duplicate content.",
  "should set custom author": "Confirms the meta author tag can be customized per page. Defaults to 'Illinois Criminal Justice Information Authority' but can be overridden for content with specific authors.",
  "should handle all options together": "Verifies all SEO options (title, description, keywords, type, image, author, noindex, nofollow, canonical, publishedTime) can be combined without conflicts. This integration test ensures the composable handles complex real-world configurations.",
  
  // Structured Data
  "should handle empty FAQ array": "Verifies the useFAQStructuredData composable generates a valid FAQPage schema even with an empty array. The @type: 'FAQPage' with empty mainEntity array is valid JSON-LD that won't cause Google Search Console errors.",
  "should handle FAQ items": "Confirms FAQ items are converted to schema.org Question/Answer entities within the FAQPage mainEntity array. Each item includes @type: 'Question', name (question text), and acceptedAnswer with @type: 'Answer' and text (answer content).",
  "should handle single FAQ item": "Verifies a single FAQ item generates a valid FAQPage schema with exactly one Question in the mainEntity array. This edge case ensures the schema is valid even for pages with minimal content.",
  "should handle FAQ with special characters": "Confirms special characters in FAQ questions and answers (<, >, &, \", ') are properly escaped in the JSON-LD output. Unescaped characters would create invalid JSON that breaks rich result parsing.",
  "should work with default values": "Verifies the useOrganizationStructuredData composable generates valid Organization schema using defaults: name 'Illinois Criminal Justice Information Authority', type 'GovernmentOrganization', and ICJIA branding.",
  "should handle custom organization name": "Confirms the Organization schema name property can be overridden from the default 'ICJIA' to any custom organization name for flexibility in future uses or sub-branding.",
  "should handle custom URL": "Verifies the Organization schema url property can be set to different domains if needed. Defaults to 'https://icjia.illinois.gov' but can be customized for subdomain or portal-specific URLs.",
  "should handle custom logo": "Confirms the Organization schema includes a logo property with ImageObject type containing the specified logo URL. This enables logo display in Google Knowledge Panels and search results.",
  "should handle custom description": "Verifies the Organization schema description property can be customized to describe the organization's mission, services, or purpose. This text may appear in search engine knowledge panels.",
  "should handle contact point": "Confirms the Organization schema includes contactPoint with ContactType, telephone, and email properties. This structured contact data can display in search results and enables direct calling on mobile devices.",
  "should handle all options together": "Verifies Organization schema correctly combines all properties (name, url, logo, description, contactPoint, sameAs social links) into a single valid JSON-LD object without property conflicts or nesting errors.",
  "should work without search URL": "Confirms the WebSite schema is valid without a potentialAction SearchAction. Not all sites have search functionality, so the search action should be optional without breaking schema validation.",
  "should handle search URL with leading slash": "Verifies WebSite schema SearchAction URL is correctly built from relative paths starting with '/'. The target URL should be absolute (e.g., 'https://accessibility.icjia.app/search?q={search_term_string}').",
  "should handle empty breadcrumb array": "Confirms the useBreadcrumbStructuredData composable handles empty breadcrumb arrays without errors. Pages at the root level may have no breadcrumbs, and the schema should gracefully return null or empty ItemList.",
  "should handle single breadcrumb": "Verifies a single breadcrumb item generates valid BreadcrumbList schema with one ListItem. This represents a page one level deep from the homepage (e.g., Homepage > FAQs).",
  "should handle multiple breadcrumbs": "Confirms multiple breadcrumb items generate a BreadcrumbList with correct position ordering (1, 2, 3...) and proper item nesting. Each ListItem should have name, item (URL), and position properties.",
  
  // FAQ Collapse
  "should initialize with collapseSignal at 0": "Verifies the useFaqCollapse composable initializes the reactive collapseSignal ref to 0. This signal is used to trigger collapse animations in child components that watch for changes.",
  "should initialize with openAccordion as null": "Confirms the openAccordion reactive ref starts as null, meaning no accordion panel is open when the page first loads. Users must click to expand any FAQ section.",
  "should increment collapseSignal when collapseAll is called": "Verifies calling collapseAll() increments the collapseSignal value. Components watching this signal react by closing their expanded panels, enabling a 'close all' button feature.",
  "should reset openAccordion when collapseAll is called": "Confirms collapseAll() sets openAccordion back to null in addition to signaling collapse. This ensures the state correctly reflects that no accordion is open after collapse.",
  "should set open accordion correctly": "Verifies setOpenAccordion(id) stores the panel identifier so the UI can track which specific FAQ panel is currently expanded. This enables single-panel-open behavior.",
  "should close accordion when setOpenAccordion is called with undefined": "Confirms calling setOpenAccordion(undefined) or setOpenAccordion(null) closes any currently open accordion. This is used when a user clicks on an already-open panel to close it.",
  "should check if panel is open correctly": "Verifies the isPanelOpen(id) function returns true when the passed id matches the currently open accordion, and false otherwise. This is used for conditional styling and ARIA states.",
  "should get open panel index correctly": "Confirms getOpenPanelIndex() returns the current value of openAccordion, which may be a string ID, number index, or null. This allows components to read the current state.",
  "should return undefined when no panel is open": "Verifies getOpenPanelIndex() returns null/undefined when no panel is open rather than throwing an error. This null state represents the initial or collapsed-all state.",
  "should handle multiple accordions correctly": "Confirms that opening a new accordion panel automatically closes the previously open one. Only one FAQ answer should be visible at a time to prevent information overload.",
  
  // Countdown
  "should calculate days remaining correctly": "Verifies days until the April 24, 2026 deadline are calculated accurately using Chicago timezone (America/Chicago, CDT = UTC-5). The calculation divides milliseconds difference by (1000 * 60 * 60 * 24) and floors the result to get whole days.",
  "should return 0 days when deadline has passed": "Confirms that when the current date is past April 24, 2026 in Chicago timezone, daysRemaining returns 0 rather than negative numbers. This ensures the UI displays sensible information post-deadline.",
  "should use Chicago timezone (America/Chicago) for all calculations": "Verifies the deadline timestamp uses explicit CDT offset (-05:00) for April dates. Tests 11:59 PM on April 23 (not passed) vs 12:01 AM on April 24 (passed) to confirm timezone boundary handling. Illinois state agencies operate in Central Time.",
  "should format days remaining text correctly": "Verifies daysRemainingText returns proper pluralization: '100 days', '2 days' for multiple days, '1 day' for singular. This grammatically correct text is displayed prominently on the homepage countdown component.",
  "should format \"1 day\" correctly": "Confirms that when exactly 24-48 hours remain before the deadline, the text returns '1 day' (singular) rather than '1 days'. This attention to grammar detail improves the professional appearance of the portal.",
  "should format \"less than 1 day\" when less than 24 hours remain": "Verifies that when fewer than 24 hours remain (but deadline hasn't passed), the text returns 'less than 1 day' rather than '0 days'. This communicates urgency while being accurate about the timeline.",
  "should show deadline passed message when deadline has passed": "Confirms daysRemainingText returns 'the deadline has passed' when the current date is beyond April 24, 2026 CDT. This message replaces the countdown on the homepage after the compliance deadline.",
  "should provide urgency text for different time ranges": "Verifies urgencyText returns appropriate messaging: 'Immediate action' for 0 days, 'Urgent action required' for 1-30 days, 'systematic work' messaging for 31-90 days, and general 'work needs to start now' for 91+ days.",
  "should update deadlinePassed correctly": "Confirms the deadlinePassed reactive boolean correctly reflects whether the current date is before (false) or after (true) the April 24, 2026 deadline. This flag controls conditional UI rendering throughout the portal.",
  
  // Print Links
  "should append URL to external links": "Verifies that external links (href starting with http:// or https://) have their full URL appended in parentheses after the link text for print view. Example: 'Visit WCAG (https://www.w3.org/WAI/WCAG21/)'. This ensures printed documents contain accessible URLs.",
  "should handle links without text by using URL": "Confirms that anchor elements with empty or whitespace-only text content are given the URL as their visible text. This prevents blank clickable areas and ensures all links are visible in print output.",
  "should style internal links as bold text": "Verifies that internal links (relative URLs or same-domain) are styled with bold text rather than showing URLs. Internal navigation isn't useful in printed documents, so bold styling indicates linked content without cluttering with URLs.",
  "should not duplicate URLs if already appended": "Confirms the URL is not added twice if the link text already contains the URL or if the processLinks function is called multiple times. Prevents output like 'Visit WCAG (https://...) (https://...)'.",
  "should add text to empty table headers": "Verifies that <th> elements with empty content receive placeholder text like 'Column' or get aria-label attributes. Empty table headers cause accessibility issues and confuse screen reader users navigating tables.",
  "should handle headers with only HTML comments": "Confirms that table headers containing only HTML comments (<!-- placeholder -->) are treated as empty and receive accessible text. Comment-only headers would otherwise appear blank to assistive technologies.",
  "should add aria-label to table headers": "Verifies that table headers receive aria-label attributes describing their purpose when the visible text is generic or unclear. This improves screen reader navigation by providing context for each column.",
  
  // Slugify
  "should convert text to lowercase": "Verifies the slugify function converts 'What Is WCAG?' to 'what-is-wcag'. Lowercase slugs are standard for URLs and HTML IDs, ensuring consistency and avoiding case-sensitivity issues in browsers.",
  "should replace non-alphanumeric characters with hyphens": "Confirms characters like spaces, apostrophes, colons, and punctuation are replaced with hyphens. 'What's the deadline?' becomes 'what-s-the-deadline'. This creates URL-safe identifiers.",
  "should remove leading and trailing hyphens": "Verifies slugs don't start or end with hyphens, which look unprofessional and can cause issues with some URL parsers. '---hello-world---' becomes 'hello-world'.",
  "should truncate to maxLength": "Confirms very long text is truncated to the specified maximum length (default 150 characters). This prevents excessively long URLs that may cause issues with URL length limits or display truncation.",
  "should remove trailing hyphens after truncation": "Verifies that if truncation cuts a word mid-way leaving a trailing hyphen, that hyphen is removed. 'long-question-about-' after truncation becomes 'long-question-about' for clean URLs.",
  "should handle empty string": "Confirms empty string input returns an empty string without errors. This edge case might occur if a question title is missing or undefined in the content.",
  "should handle special characters": "Verifies symbols like ?, !, @, #, $, %, &, *, () are either removed or converted to hyphens. Special characters must be handled to create valid HTML ID attributes and URL fragments.",
  "should handle numbers": "Confirms numbers are preserved in slugs: 'WCAG 2.1 Level AA' becomes 'wcag-2-1-level-aa'. Numbers are important for version references and should remain in the generated IDs.",
  "should combine section and question slugs": "Verifies getQuestionId combines section and question into a single unique ID: section 'Compliance' + question 'What is WCAG?' produces 'compliance-what-is-wcag'. This enables direct linking to specific FAQs.",
  "should handle different sections with same question": "Confirms identical question text in different sections produces unique IDs. 'Overview' + 'What is it?' and 'Technical' + 'What is it?' produce different IDs, preventing duplicate anchors.",
  "should handle special characters in section and question": "Verifies complex input like section 'Q&A: Overview' + question 'What's this?' correctly slugifies to 'q-a-overview-what-s-this' without breaking or producing invalid characters.",
  "should use default maxLength of 150": "Confirms the slugify function uses a default maximum length of 150 characters when no maxLength parameter is provided. This default prevents excessively long slugs while allowing descriptive question IDs.",
  "should return slugify and getQuestionId functions": "Verifies the useSlugify composable exports both the generic slugify function and the FAQ-specific getQuestionId function. Both are needed for different use cases in the application.",
  "should work correctly when used as composable": "Confirms useSlugify follows Vue 3 composable conventions and can be used within setup() functions or other composables. The returned functions should be stable references suitable for reactive contexts.",
  
  // FAQ Transform
  "should return true for dates within the new window": "Verifies the isWithinNewWindow function returns true for dates within the past 10 days (NEW_QUESTION_DAYS constant). This controls whether the 'New' badge displays next to FAQ questions, highlighting recently added content.",
  "should return false for dates outside the new window": "Confirms dates older than 10 days return false from isWithinNewWindow. The 'New' badge automatically disappears after content has been published for more than 10 days, reducing visual noise over time.",
  "should return true for today": "Verifies that today's date (formatted as YYYY-MM-DD) returns true from isWithinNewWindow. Content tagged with today's date should immediately show the 'New' badge when published.",
  "should return true for dates exactly 10 days ago": "Confirms the boundary condition: a date exactly 10 days ago (the edge of the window) is still considered 'new'. The comparison uses <= so day 10 is included, day 11 is not.",
  "should handle date comparisons consistently in Chicago timezone context": "Verifies date string comparisons (YYYY-MM-DD format) work correctly regardless of where the server or client is running. The portal serves Illinois agencies in Chicago timezone; date logic should be consistent across timezones.",
  "should extract new date from curly braces format when within window": "Verifies the extractNewDate function parses {new:2026-01-01} format from Markdown AST nodes. This format is embedded in FAQ answer content to mark questions as recently updated.",
  "should extract new date from HTML comment format when within window": "Confirms the extractNewDate function also parses <!-- new:2026-01-01 --> HTML comment format. This alternative format allows editors to use HTML comments if preferred over curly brace syntax.",
  "should return null if no new date found": "Verifies extractNewDate returns null when the Markdown content has no {new:} or <!-- new: --> tags. Most FAQ items won't have date tags, and the function should gracefully return null for these.",
  "should return null if date is outside new window": "Confirms extractNewDate returns null for dates older than 10 days. While the date tag exists in the source, it's no longer 'new' so the function returns null, preventing the badge from displaying.",
  "should extract tagged date even if outside new window": "Verifies extractTaggedDate retrieves the date string regardless of whether it's within the new window. This function is used for sorting or display purposes where the actual date matters, not just the 'new' status.",
  "should return null if no tag is present": "Confirms extractTaggedDate returns null when no date tag exists in the content. This distinguishes between 'no tag present' and 'tag present but expired' scenarios for different handling.",
  "should remove new tag from nodes": "Verifies filterNewComments removes {new:YYYY-MM-DD} and <!-- new:YYYY-MM-DD --> tags from the rendered content. The date tag is metadata, not user-visible content, so it must be stripped before display.",
  "should replace dynamic placeholders": "Confirms filterNewComments replaces {days_until_deadline} placeholder with the actual calculated days remaining. This enables FAQ answers to show current countdown information without manual updates.",
  "should filter out empty nodes after removing new tag": "Verifies clean node structure.",
  "should handle mixed content with new tags and regular text": "Confirms complex content handling.",
  "should wrap H3 questions and answers in div.qa-card": "Verifies Q&A card wrapping.",
  "should stop wrapping at next H1, H2, H3, or HR": "Confirms proper section boundaries.",
  "should leave non-H3 nodes unchanged": "Verifies non-question content is preserved.",
  "should transform FAQ markdown AST to accordion data": "Confirms AST to accordion transformation.",
  "should extract multiple FAQs": "Verifies multiple questions are extracted.",
  "should stop at H1, H2, or HR": "Confirms section boundary detection.",
  "should handle FAQs without new tags": "Verifies graceful handling of untagged FAQs.",
  "should return empty array for non-array input": "Confirms type safety on invalid input.",
  
  // Search Config
  "should have valid threshold value (0-1 range)": "Verifies fuzzy search threshold is valid.",
  "should have threshold set for balanced fuzzy matching": "Confirms threshold allows reasonable fuzziness.",
  "should have distance configured": "Verifies Fuse.js distance setting exists.",
  "should have minMatchCharLength configured": "Confirms minimum match length is set.",
  "should include score in results for ranking": "Verifies score inclusion setting.",
  "should include matches for highlighting": "Confirms match data is returned.",
  "should enable sorting for proper rank order": "Verifies result sorting is enabled.",
  "should ignore location for searching anywhere in text": "Confirms location-independent search.",
  "should have keys array defined": "Verifies search fields are configured.",
  "should search in question field with higher weight": "Confirms question field priority.",
  "should search in answer field with lower weight": "Verifies answer field is included.",
  "should prioritize question over answer (higher weight)": "Confirms field weighting order.",
  "should have weights that sum to approximately 1": "Verifies normalized field weights.",
  "should have relevance labels defined": "Confirms label configuration exists.",
  "should have excellent label with lowest threshold": "Verifies 'Excellent' threshold value.",
  "should have good label": "Confirms 'Good' label configuration.",
  "should have fair label": "Verifies 'Fair' label configuration.",
  "should have partial label as catch-all": "Confirms 'Partial' is the fallback label.",
  "should have ascending threshold order": "Verifies label thresholds are ordered.",
  "should have display settings defined": "Confirms display configuration exists.",
  "should have minimum search length": "Verifies min search length is set.",
  "should have answer preview length": "Confirms preview length configuration.",
  "should have context before match": "Verifies context before setting.",
  "should have context after match": "Confirms context after setting.",
  "should understand that lower score = better match in Fuse.js": "Documents Fuse.js scoring behavior.",
  "should have threshold that allows fuzzy matching": "Confirms threshold enables fuzzy search.",
};

console.log("🧪 Comprehensive Test Runner\n");
console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
);

// Check if E2E tests are enabled
const vitestConfigPath = join(rootDir, "vitest.config.ts");
const vitestConfig = readFileSync(vitestConfigPath, "utf-8");
const e2eEnabled = !vitestConfig.includes('//     name: "e2e"');

console.log(`📋 Test Configuration:`);
console.log(`   • Unit tests: ✅ Enabled`);
console.log(`   • Nuxt tests: ✅ Enabled`);
console.log(`   • E2E tests:  ${e2eEnabled ? "✅ Enabled" : "⏭️  Disabled"}\n`);

if (e2eEnabled) {
  console.log("⚠️  E2E tests are enabled - dev server will be started\n");
}

console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
);

// Delete old reports
if (existsSync(outputPath)) {
  try {
    unlinkSync(outputPath);
    console.log("🗑️  Deleted old failed-tests.json");
  } catch (error) {
    console.warn(
      `⚠️  Could not delete old failed-tests.json: ${error.message}`
    );
  }
}

if (existsSync(fullResultsPath)) {
  try {
    unlinkSync(fullResultsPath);
    console.log("🗑️  Deleted old test-results.json");
  } catch (error) {
    console.warn(
      `⚠️  Could not delete old test-results.json: ${error.message}`
    );
  }
}

console.log("");

let devServer = null;
let serverReady = false;

async function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log("🚀 Starting dev server for E2E tests...\n");

    devServer = spawn("npm", ["run", "dev"], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    let output = "";

    const onData = (data) => {
      const text = data.toString();
      output += text;

      // Check if server is ready
      if (text.includes("Local:") || text.includes("localhost:3000")) {
        serverReady = true;
        console.log("✅ Dev server is ready!\n");
        resolve();
      }
    };

    devServer.stdout.on("data", onData);
    devServer.stderr.on("data", onData);

    devServer.on("error", (error) => {
      console.error("❌ Failed to start dev server:", error.message);
      reject(error);
    });

    devServer.on("exit", (code) => {
      if (!serverReady) {
        console.error(`❌ Dev server exited with code ${code}`);
        reject(new Error(`Dev server exited with code ${code}`));
      }
    });

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!serverReady) {
        console.error("❌ Dev server failed to start within 60 seconds");
        reject(new Error("Dev server timeout"));
      }
    }, 60000);
  });
}

function stopDevServer() {
  if (devServer) {
    console.log("\n🛑 Stopping dev server...");
    devServer.kill("SIGTERM");

    // Force kill after 5 seconds if still running
    setTimeout(() => {
      if (devServer && !devServer.killed) {
        console.log("⚠️  Force killing dev server...");
        devServer.kill("SIGKILL");
      }
    }, 5000);
  }
}

async function runTests() {
  const tempJsonPath = join(__dirname, "vitest-results.json");

  console.log("🧪 Running all tests...\n");
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );

  try {
    execSync(
      `vitest run --reporter=json --reporter=verbose --outputFile=${tempJsonPath}`,
      {
        cwd: rootDir,
        encoding: "utf-8",
        stdio: "inherit",
      }
    );
  } catch (testError) {
    // Tests failed, but we still want to process the JSON
    // Exit code will be non-zero, which is expected if tests fail
  }

  return tempJsonPath;
}

function processTestResults(tempJsonPath) {
  console.log(
    "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );
  console.log("📊 Processing test results...\n");

  if (!existsSync(tempJsonPath)) {
    console.error("❌ Could not find test results JSON file");
    console.error("This might mean tests did not run or there was an error.");
    return null;
  }

  const jsonContent = readFileSync(tempJsonPath, "utf-8");
  const jsonData = JSON.parse(jsonContent);

  // Clean up temp file
  try {
    unlinkSync(tempJsonPath);
  } catch {
    // Ignore cleanup errors
  }

  // Create summary
  const summary = {
    totalTests: jsonData.numTotalTests || 0,
    passedTests: jsonData.numPassedTests || 0,
    failedTests: jsonData.numFailedTests || 0,
    skippedTests: jsonData.numSkippedTests || 0,
    duration: jsonData.startTime ? Date.now() - jsonData.startTime : 0,
    generatedAt: new Date().toISOString(),
  };

  // Process test results by project
  const projectStats = {};
  const failedTests = {
    summary,
    testResults: [],
  };

  if (jsonData.testResults) {
    for (const testFile of jsonData.testResults) {
      const failedCases = [];

      if (testFile.assertionResults) {
        for (const assertion of testFile.assertionResults) {
          if (assertion.status === "failed") {
            failedCases.push({
              title: assertion.title,
              fullName: assertion.fullName,
              status: assertion.status,
              failureMessages: assertion.failureMessages || [],
              duration: assertion.duration,
            });
          }
        }
      }

      // Track stats by project
      const fileName = testFile.name || "";
      let project = "unknown";
      if (fileName.includes("/test/unit/")) project = "unit";
      else if (fileName.includes("/test/nuxt/")) project = "nuxt";
      else if (fileName.includes("/test/e2e/")) project = "e2e";

      if (!projectStats[project]) {
        projectStats[project] = { passed: 0, failed: 0, total: 0 };
      }

      const testCount = testFile.assertionResults?.length || 0;
      projectStats[project].total += testCount;
      projectStats[project].passed += testCount - failedCases.length;
      projectStats[project].failed += failedCases.length;

      // Add to failed tests if there are failures
      if (failedCases.length > 0 || testFile.status === "failed") {
        failedTests.testResults.push({
          file: testFile.name,
          status: testFile.status,
          message: testFile.message || "",
          failedCases,
        });
      }
    }
  }

  // Create full test results
  const fullTestResults = {
    summary,
    projectStats,
    testResults: jsonData.testResults || [],
  };

  return { fullTestResults, failedTests };
}

function generateReports(fullTestResults, failedTests) {
  console.log("📝 Generating reports...\n");

  // Write full results JSON
  writeFileSync(
    fullResultsPath,
    JSON.stringify(fullTestResults, null, 2),
    "utf-8"
  );
  console.log(`   ✅ Full results: ${fullResultsPath}`);

  // Write failed tests JSON
  writeFileSync(outputPath, JSON.stringify(failedTests, null, 2), "utf-8");
  console.log(`   ✅ Failed tests: ${outputPath}`);

  // Generate HTML report
  generateHTMLReport(fullTestResults, htmlReportPath, rootDir);
  console.log(`   ✅ HTML report:  ${htmlReportPath}`);
}

function generateHTMLReport(testResults, outputPath, rootDir) {
  // Ensure directory exists
  const reportDir = dirname(outputPath);
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }

  const { summary, projectStats, testResults: results } = testResults;
  const passRate =
    summary.totalTests > 0
      ? ((summary.passedTests / summary.totalTests) * 100).toFixed(1)
      : 0;

  // Generate project stats HTML
  let projectStatsHTML = "";
  if (projectStats && Object.keys(projectStats).length > 0) {
    projectStatsHTML = Object.entries(projectStats)
      .map(([project, stats]) => {
        const projectStatus = stats.failed > 0 ? "error" : "success";
        return `
        <tr>
          <td><strong>${project}</strong></td>
          <td>${stats.total}</td>
          <td class="status-pass">${stats.passed}</td>
          <td class="status-${projectStatus}">${stats.failed}</td>
          <td class="status-${stats.failed > 0 ? "fail" : "pass"}">${stats.failed > 0 ? "❌ Fail" : "✅ Pass"}</td>
        </tr>`;
      })
      .join("");
  }
  
  const generatedDate = new Date(summary.generatedAt || Date.now());
  const formattedDate = generatedDate.toLocaleDateString();
  const formattedTime = generatedDate.toLocaleTimeString();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Results Report - ${formattedDate}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 1.25rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    
    .meta {
      color: #666;
      font-size: 0.9em;
      margin-bottom: 2rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .stat-card {
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      transition: all 0.2s ease;
    }
    
    .stat-card.success {
      background: #d1e7dd;
      border-color: #badbcc;
      color: #0f5132;
    }
    
    .stat-card.error {
      background: #f8d7da;
      border-color: #f5c2c7;
      color: #842029;
    }
    
    .stat-card.warning {
      background: #fff3cd;
      border-color: #ffecb5;
      color: #856404;
    }
    
    .stat-card .number {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    
    .stat-card .label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      overflow: hidden;
    }
    
    thead {
      background: #f8f9fa;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    
    th {
      font-weight: 600;
      color: #495057;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .status-pass {
      color: #198754;
      font-weight: 600;
    }
    
    .status-fail {
      color: #dc3545;
      font-weight: 600;
    }
    
    .status-warning {
      color: #856404;
      font-weight: 600;
    }
    
    .test-file {
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .test-file-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
    
    .test-file-name {
      font-weight: 600;
      color: #212529;
      font-size: 1.1rem;
    }
    
    .test-file-status {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .test-file-status.passed {
      background: #d1e7dd;
      color: #0f5132;
    }
    
    .test-file-status.failed {
      background: #f8d7da;
      color: #842029;
    }
    
    .test-file-status.skipped {
      background: #fff3cd;
      color: #856404;
    }
    
    .test-case {
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      background: #f8f9fa;
    }
    
    .test-case.passed {
      border-left: 3px solid #198754;
    }
    
    .test-case.failed {
      border-left: 3px solid #dc3545;
    }
    
    .test-case.skipped {
      border-left: 3px solid #ffc107;
    }
    
    .test-case-title {
      font-weight: 500;
      color: #212529;
      margin-bottom: 0.25rem;
    }
    
    .test-case-duration {
      font-size: 0.85rem;
      color: #6c757d;
    }
    
    .test-case-description {
      margin-top: 0.5rem;
    }
    
    .test-case-description summary {
      font-size: 0.8rem;
      color: #0d6efd;
      cursor: pointer;
      user-select: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .test-case-description summary:hover {
      text-decoration: underline;
    }
    
    .test-case-description summary::marker {
      content: '';
    }
    
    .test-case-description summary::before {
      content: '▶';
      font-size: 0.6rem;
      transition: transform 0.2s ease;
    }
    
    .test-case-description[open] summary::before {
      transform: rotate(90deg);
    }
    
    .test-case-description .description-content {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #e7f1ff;
      border-left: 3px solid #0d6efd;
      border-radius: 4px;
      font-size: 0.85rem;
      color: #0a58ca;
      line-height: 1.5;
    }
    
    .test-case-description .description-content p {
      margin: 0;
    }
    
    .failure-message {
      margin-top: 0.5rem;
      padding: 0.75rem;
      background: #f8d7da;
      border-radius: 4px;
      border-left: 3px solid #dc3545;
    }
    
    .failure-message pre {
      color: #842029;
      font-size: 0.85rem;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      background: #0d6efd;
      color: #fff;
      padding: 12px 24px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 0 0 4px 0;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5;
      clip: auto;
      clip-path: none;
      transition: top 0.2s ease-in-out;
    }
    
    .skip-link:focus {
      top: 0;
      left: 0;
      outline: 3px solid #0d6efd;
      outline-offset: 2px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    .skip-link:focus-visible {
      top: 0;
      left: 0;
      outline: 3px solid #0d6efd;
      outline-offset: 2px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    @media (prefers-reduced-motion: reduce) {
      .skip-link {
        transition: none;
      }
    }
    
    @media (max-width: 768px) {
      table {
        font-size: 0.875rem;
      }
      
      th, td {
        padding: 0.5rem;
      }
    }
    
    footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #dee2e6;
      text-align: center;
      color: #6c757d;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <!-- Skip Link -->
  <a
    href="#main-content"
    class="skip-link"
    id="skip-link"
  >
    Skip to main content
  </a>
  
  <div class="container">
    <main id="main-content" tabindex="-1">
    <h1>🧪 ICJIA Accessibility Portal - Test Results Report</h1>
    <p class="meta" style="margin-top: 0.5rem; margin-bottom: 1rem;">Comprehensive test results for unit, Nuxt, and E2E tests</p>
    <div class="meta">
      <p><strong>Generated:</strong> ${formattedDate}, ${formattedTime}</p>
      <p><strong>Total Tests:</strong> ${summary.totalTests}</p>
      <p><strong>Duration:</strong> ${(summary.duration / 1000).toFixed(2)} seconds</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card ${summary.failedTests > 0 ? "error" : "success"}">
        <div class="label">Total Tests</div>
        <div class="number">${summary.totalTests}</div>
      </div>
      <div class="stat-card success">
        <div class="label">Passed</div>
        <div class="number">${summary.passedTests}</div>
      </div>
      <div class="stat-card ${summary.failedTests > 0 ? "error" : "success"}">
        <div class="label">Failed</div>
        <div class="number">${summary.failedTests}</div>
      </div>
      <div class="stat-card ${summary.skippedTests > 0 ? "warning" : "success"}">
        <div class="label">Skipped</div>
        <div class="number">${summary.skippedTests}</div>
      </div>
      <div class="stat-card ${summary.failedTests > 0 ? "error" : "success"}">
        <div class="label">Pass Rate</div>
        <div class="number">${passRate}%</div>
      </div>
    </div>
    
    ${projectStatsHTML ? `
    <h2>📋 Test Results by Project</h2>
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Total Tests</th>
          <th>Passed</th>
          <th>Failed</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${projectStatsHTML}
      </tbody>
    </table>
    ` : ""}
    
    <h2>📋 All Test Files</h2>
    ${generateTestFilesHTML(results, rootDir)}
    
    <footer>
      <p>Generated on ${formattedDate}, ${formattedTime}</p>
      <p>Total duration: ${(summary.duration / 1000).toFixed(2)} seconds</p>
    </footer>
    </main>
  </div>
  
  <script>
    // Skip Link Handler
    (function() {
      const skipLink = document.getElementById('skip-link');
      if (skipLink) {
        const handleSkipLink = function(e) {
          e.preventDefault();
          const target = document.getElementById('main-content');
          if (target) {
            target.focus();
            const prefersReducedMotion = window.matchMedia(
              '(prefers-reduced-motion: reduce)'
            ).matches;
            target.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          }
        };
        
        skipLink.addEventListener('click', handleSkipLink);
        skipLink.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            handleSkipLink(e);
          }
        });
      }
    })();
  </script>
</body>
</html>`;

  writeFileSync(outputPath, html, "utf-8");
}

function generateTestFilesHTML(results, rootDir) {
  if (results.length === 0) {
    return '<div style="text-align: center; padding: 3rem; color: #6c757d;"><p>No test results available</p></div>';
  }

  return results
    .map((testFile) => {
      const status = testFile.status || "unknown";
      const statusClass = status.toLowerCase();
      const testCases = testFile.assertionResults || [];
      const fileName = testFile.name.replace(rootDir, "").replace(/\\/g, "/");

      // Count test cases by status
      const passedCount = testCases.filter((tc) => tc.status === "passed").length;
      const failedCount = testCases.filter((tc) => tc.status === "failed").length;
      const skippedCount = testCases.filter((tc) => tc.status === "skipped").length;

      let testCasesHTML = "";
      if (testCases.length === 0) {
        testCasesHTML =
          '<p style="color: #6c757d;">No test cases in this file</p>';
      } else {
        testCasesHTML = testCases
          .map((testCase) => {
            const caseStatus = testCase.status || "unknown";
            const caseClass = caseStatus.toLowerCase();
            const title = testCase.title || "Untitled Test";
            const duration = testCase.duration
              ? testCase.duration.toFixed(2) + "ms"
              : "N/A";

            let failureHTML = "";
            if (
              testCase.failureMessages &&
              testCase.failureMessages.length > 0
            ) {
              const failureText = testCase.failureMessages
                .join("\n")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
              failureHTML = `<div class="failure-message"><pre>${failureText}</pre></div>`;
            }

            const statusIcon = caseStatus === "passed" ? "✅" : caseStatus === "failed" ? "❌" : "⚠️";
            
            // Look up description for this test
            const description = TEST_DESCRIPTIONS[title] || null;
            const descriptionHTML = description
              ? `<details class="test-case-description">
                  <summary>What does this test verify?</summary>
                  <div class="description-content">
                    <p>${description}</p>
                  </div>
                </details>`
              : "";

            return `
      <div class="test-case ${caseClass}">
        <div class="test-case-title">${statusIcon} ${title}</div>
        <div class="test-case-duration">Duration: ${duration}</div>
        ${descriptionHTML}
        ${failureHTML}
      </div>`;
          })
          .join("");
      }

      return `
    <div class="test-file">
      <div class="test-file-header">
        <div class="test-file-name">${fileName}</div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="font-size: 0.85rem; color: #6c757d;">
            ${passedCount} passed, ${failedCount} failed, ${skippedCount} skipped
          </span>
          <span class="test-file-status ${statusClass}">${status.toUpperCase()}</span>
        </div>
      </div>
      ${testCasesHTML}
    </div>`;
    })
    .join("");
}

// Main execution
async function main() {
  try {
    // Start dev server if E2E tests are enabled
    if (e2eEnabled) {
      await startDevServer();
    }

    // Run tests
    const tempJsonPath = await runTests();

    // Process results
    const results = processTestResults(tempJsonPath);
    if (!results) {
      process.exit(1);
    }

    const { fullTestResults, failedTests } = results;

    // Generate reports
    generateReports(fullTestResults, failedTests);

    console.log(
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    );

    // Print summary
    const { summary, projectStats } = fullTestResults;
    console.log("📊 Test Summary:\n");
    console.log(`   Total:   ${summary.totalTests}`);
    console.log(`   Passed:  ${summary.passedTests} ✅`);
    console.log(
      `   Failed:  ${summary.failedTests} ${summary.failedTests > 0 ? "❌" : ""}`
    );
    console.log(`   Skipped: ${summary.skippedTests}`);
    console.log(`   Duration: ${(summary.duration / 1000).toFixed(2)}s`);

    if (projectStats && Object.keys(projectStats).length > 0) {
      console.log("\n📋 By Project:\n");
      for (const [project, stats] of Object.entries(projectStats)) {
        const status = stats.failed > 0 ? "❌" : "✅";
        console.log(
          `   ${project.padEnd(6)}: ${stats.passed}/${stats.total} passed ${status}`
        );
      }
    }

    console.log(
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    );

    // Check for failures
    const hasFailures = failedTests.summary.failedTests > 0;

    if (hasFailures) {
      console.log(`❌ ${failedTests.summary.failedTests} test(s) failed\n`);
      console.log(
        `💡 Tip: Share ${outputPath} with an LLM for help fixing issues\n`
      );
      process.exit(1);
    } else {
      console.log("✅ All tests passed!\n");
      process.exit(0);
    }
  } catch (error) {
    console.error("\n❌ Error running tests:", error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Always stop dev server
    if (e2eEnabled) {
      stopDevServer();
    }
  }
}

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n\n⚠️  Test run interrupted by user");
  stopDevServer();
  process.exit(130);
});

process.on("SIGTERM", () => {
  console.log("\n\n⚠️  Test run terminated");
  stopDevServer();
  process.exit(143);
});

// Run main function
main();
