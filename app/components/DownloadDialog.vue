<template>
  <v-dialog
    v-model="isOpen"
    max-width="550"
    :fullscreen="isMobile"
    :aria-labelledby="dialogTitleId"
    aria-modal="true"
    role="dialog"
    class="download-dialog-wrapper"
  >
    <v-card class="download-dialog">
      <v-card-title :id="dialogTitleId" class="download-dialog-title">
        <v-icon class="mr-2" aria-hidden="true" :icon="mdiDownload" />
        Download FAQs
      </v-card-title>

      <v-card-text class="download-dialog-content">
        <p class="download-dialog-description">
          Choose your preferred accessible format. Each format is accessible
          and keeps the document's structure intact.
        </p>

        <div class="download-options" role="list">
          <!-- Word Document Option -->
          <a
            :href="docxUrl"
            :download="docxFilename"
            class="download-option"
            role="listitem"
            @click="handleDownload('docx')"
          >
            <div class="download-option-icon docx-icon">
              <v-icon size="32" aria-hidden="true" :icon="mdiFileWord" />
            </div>
            <div class="download-option-info">
              <span class="download-option-title">Word Document (.docx)</span>
              <span class="download-option-description">
                Formatted document with headings, tables, and links. Opens in
                Microsoft Word, Google Docs, or LibreOffice.
              </span>
              <span class="download-option-accessibility">
                <v-icon size="14" color="success" aria-hidden="true" :icon="mdiCheckCircle" />
                Accessible: Proper heading structure for navigation
              </span>
            </div>
            <v-icon class="download-option-arrow" aria-hidden="true" :icon="mdiChevronRight" />
          </a>

          <!-- Plain Text Option -->
          <a
            :href="txtUrl"
            :download="txtFilename"
            class="download-option"
            role="listitem"
            @click="handleDownload('txt')"
          >
            <div class="download-option-icon txt-icon">
              <v-icon size="32" aria-hidden="true" :icon="mdiFileDocumentOutline" />
            </div>
            <div class="download-option-info">
              <span class="download-option-title">Plain Text (.txt)</span>
              <span class="download-option-description">
                Simple text file readable by any device or screen reader.
                Maximum compatibility, no special software needed.
              </span>
              <span class="download-option-accessibility">
                <v-icon size="14" color="success" aria-hidden="true" :icon="mdiCheckCircle" />
                Accessible: Universal format, works everywhere
              </span>
              <span class="download-option-llm">
                <v-icon size="14" color="info" aria-hidden="true" :icon="mdiRobot" />
                Great for AI: works well pasted into ChatGPT, Claude, or other AI tools
              </span>
            </div>
            <v-icon class="download-option-arrow" aria-hidden="true" :icon="mdiChevronRight" />
          </a>

          <!-- Markdown Option -->
          <a
            :href="mdUrl"
            :download="mdFilename"
            class="download-option"
            role="listitem"
            @click="handleDownload('md')"
          >
            <div class="download-option-icon md-icon">
              <v-icon size="32" aria-hidden="true" :icon="mdiLanguageMarkdown" />
            </div>
            <div class="download-option-info">
              <span class="download-option-title">Markdown (.md)</span>
              <span class="download-option-description">
                Plain text with formatting syntax. Opens in any text editor, 
                or renders with full formatting in VS Code, GitHub, Obsidian, or Typora.
              </span>
              <span class="download-option-accessibility">
                <v-icon size="14" color="success" aria-hidden="true" :icon="mdiCheckCircle" />
                Accessible: Readable as plain text, renders with formatting
              </span>
              <span class="download-option-llm">
                <v-icon size="14" color="info" aria-hidden="true" :icon="mdiRobot" />
                Great for AI: works well pasted into ChatGPT, Claude, or other AI tools
              </span>
            </div>
            <v-icon class="download-option-arrow" aria-hidden="true" :icon="mdiChevronRight" />
          </a>
        </div>

        <!-- Markdown Explanation -->
        <details class="markdown-explainer">
          <summary class="markdown-explainer-summary">
            <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiHelpCircleOutline" />
            What is Markdown? How do I view it?
          </summary>
          <div class="markdown-explainer-content">
            <p>
              <strong>Markdown</strong> is a simple text format that uses symbols like <code>#</code> for headings, 
              <code>**bold**</code> for bold text, and <code>[links](url)</code> for hyperlinks. It's readable 
              as plain text but renders with full formatting in compatible viewers.
            </p>
            
            <div class="icjia-viewer-highlight">
              <p class="section-heading"><strong>⭐ ICJIA Markdown Viewer (Recommended):</strong></p>
              <p>
                ICJIA's online Markdown viewer and editor makes viewing 
                <code>.md</code> files easy — no software installation required:
              </p>
              <ul>
                <li>
                  <strong><a href="https://markdown.icjia.cloud" target="_blank" rel="noopener noreferrer">markdown.icjia.cloud</a></strong> 
                  — Simply drag & drop your downloaded <code>.md</code> file, or paste the content directly. 
                  Features live preview, export options, and a clean interface.
                </li>
              </ul>
            </div>
            
            <p class="section-heading"><strong>🌐 Other Online Viewers (No Install):</strong></p>
            <ul>
              <li><strong><a href="https://dillinger.io" target="_blank" rel="noopener noreferrer">Dillinger.io</a></strong> — Drag & drop to view instantly</li>
              <li><strong><a href="https://stackedit.io" target="_blank" rel="noopener noreferrer">StackEdit.io</a></strong> — Full-featured online editor</li>
              <li><strong><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></strong> — Paste content into a Gist or README</li>
            </ul>
            
            <p class="section-heading"><strong>🪟 Windows — Native Options:</strong></p>
            <ul>
              <li><strong>Notepad</strong> — Opens as plain text (built-in)</li>
              <li><strong>WordPad</strong> — Opens as plain text (built-in)</li>
              <li><strong>Microsoft Edge</strong> — Drag & drop the file to view with basic rendering</li>
              <li><strong>Visual Studio Code</strong> — Free, right-click file → "Open Preview" for formatted view</li>
            </ul>
            
            <p class="section-heading"><strong>🍎 macOS — Native Options:</strong></p>
            <ul>
              <li><strong>TextEdit</strong> — Opens as plain text (built-in)</li>
              <li><strong>Quick Look</strong> — Press <kbd>Space</kbd> on selected file in Finder (with plugins)</li>
              <li><strong>Safari</strong> — Drag & drop to view as plain text</li>
              <li><strong>Xcode</strong> — Built-in Markdown preview (if installed)</li>
              <li><strong>Visual Studio Code</strong> — Free, Cmd+Shift+V for formatted preview</li>
            </ul>
            
            <p class="section-heading"><strong>📱 Cross-Platform Apps (Free):</strong></p>
            <ul>
              <li><strong><a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">VS Code</a></strong> — Best free option with live preview</li>
              <li><strong><a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">Obsidian</a></strong> — Beautiful note-taking app with Markdown</li>
              <li><strong><a href="https://typora.io" target="_blank" rel="noopener noreferrer">Typora</a></strong> — Clean live-preview editor</li>
              <li><strong><a href="https://marktext.app" target="_blank" rel="noopener noreferrer">Mark Text</a></strong> — Simple, open-source editor</li>
            </ul>
            
            <p class="section-heading"><strong>🤖 Using with AI/LLMs:</strong></p>
            <p>
              Markdown and plain text files are <strong>ideal formats for AI assistants</strong> like ChatGPT, 
              Claude, Gemini, or Copilot. Simply:
            </p>
            <ul>
              <li>Open the downloaded file in any text editor</li>
              <li>Select all and copy (Ctrl+A, Ctrl+C or Cmd+A, Cmd+C)</li>
              <li>Paste into your AI chat to ask questions, get summaries, or request explanations</li>
            </ul>
            <p style="font-size: 0.8em; color: rgb(var(--v-theme-on-surface));">
              AI assistants can help you understand complex accessibility requirements, create action plans, 
              or answer specific questions about the content.
            </p>
            
            <p class="tip-text">
              <v-icon size="14" class="mr-1" aria-hidden="true" :icon="mdiLightbulbOutline" />
              <strong>Tip:</strong> Markdown and plain text are the most reliable formats for AI tools — 
              they preserve all content without formatting issues that Word documents can have.
            </p>
          </div>
        </details>

        <p class="download-dialog-note">
          <v-icon size="16" class="mr-1" aria-hidden="true" :icon="mdiInformation" />
          <strong>Tip:</strong> For screen reader users, the Word document format 
          preserves heading structure for easy navigation.
        </p>
      </v-card-text>

      <v-card-actions class="download-dialog-actions">
        <v-spacer />
        <button
          type="button"
          @click="close"
          class="cancel-link"
          aria-label="Cancel and close download dialog"
          style="background: transparent; border: none; cursor: pointer; font-family: inherit; color: rgb(var(--v-theme-on-surface)) !important; text-decoration: underline; font-weight: 700; font-size: 1rem; padding: 12px 16px; min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; line-height: 1.5; box-sizing: border-box;"
        >
          Cancel
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
/**
 * @fileoverview Download format selection dialog
 * @description Accessible dialog for choosing between Word (.docx), Markdown (.md),
 * and plain text (.txt) download formats for the FAQs document.
 * 
 * Responsive behavior:
 * - Full-screen dialog on mobile devices (< 600px)
 * - Centered modal on tablet and desktop
 * - Touch-friendly targets on all devices
 * - Scrollable content for small viewports
 */

import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { mdiDownload, mdiFileWord, mdiCheckCircle, mdiChevronRight, mdiFileDocumentOutline, mdiRobot, mdiLanguageMarkdown, mdiHelpCircleOutline, mdiLightbulbOutline, mdiInformation } from '~/utils/icons';

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Responsive breakpoint detection with fallback for test environments
let smAndDown = ref(false);
try {
  const display = useDisplay();
  smAndDown = display.smAndDown;
} catch {
  // Fallback for test environments where Vuetify context may not be available
  smAndDown = ref(false);
}

/**
 * Determines if the dialog should be fullscreen (on mobile devices).
 * Uses Vuetify's display composable for responsive detection.
 * Falls back to false (non-fullscreen) if Vuetify context is unavailable.
 */
const isMobile = computed(() => smAndDown.value);

// Generate unique ID for accessibility
const dialogTitleId = `download-dialog-title-${Math.random().toString(36).slice(2, 9)}`;

// Dialog state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Download URLs and filenames
const docxUrl = "/ICJIA-Accessibility-FAQs.docx";
const docxFilename = "ICJIA-Accessibility-FAQs.docx";
const mdUrl = "/ICJIA-Accessibility-FAQs.md";
const mdFilename = "ICJIA-Accessibility-FAQs.md";
const txtUrl = "/ICJIA-Accessibility-FAQs.txt";
const txtFilename = "ICJIA-Accessibility-FAQs.txt";

/**
 * Handle download click - close dialog after a short delay
 */
function handleDownload(format: "docx" | "md" | "txt") {
  // Allow the download to start, then close the dialog
  setTimeout(() => {
    close();
  }, 100);
}

/**
 * Close the dialog
 */
function close() {
  isOpen.value = false;
}
</script>

<style scoped>
/* Plakat look: a square panel with a white outline (set for every overlay in
   assets/css/plakat.css). Each format is a ruled row; the whole row is the
   download link. */
.download-dialog {
  overflow-y: auto;
}

.download-dialog-title {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--pk-heading);
  white-space: normal;
}

.download-dialog-title .v-icon {
  display: none;
}

.download-dialog-content {
  padding: 0 1.5rem 1rem !important;
}

.download-dialog-description {
  margin: 0 0 1.25rem 0;
  color: var(--pk-text);
  font-size: 1.0625rem;
  /* WCAG 1.4.8 Visual Presentation (Enhanced) - AAA: Minimum 1.5 line-height */
  line-height: 1.5;
}

.download-options {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid var(--pk-border-alt);
}

.download-option {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0.5rem 1rem 0;
  border-top: 2px solid var(--pk-border-alt);
  color: var(--pk-text);
  text-decoration: none;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
}

.download-option:hover {
  background: var(--pk-hover);
}

.download-option-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--pk-brand);
  color: var(--pk-brand-ink);
}

.download-option-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.download-option-title {
  font-size: 1.1875rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--pk-heading);
}

.download-option:hover .download-option-title {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.download-option-description {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--pk-text);
}

.download-option-accessibility,
.download-option-llm {
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--pk-text-2);
}

.download-option-accessibility .v-icon,
.download-option-llm .v-icon {
  flex-shrink: 0;
  margin-top: 4px;
}

.download-option-arrow {
  flex-shrink: 0;
  align-self: center;
  color: var(--pk-heading);
}

/* "What is Markdown?" — a folded note, closed until asked for. */
.markdown-explainer {
  margin: 0 0 1rem;
  border: 1px solid var(--pk-border-alt);
  border-left: 4px solid var(--pk-heading);
  background: var(--pk-raised);
}

.markdown-explainer-summary {
  display: flex;
  align-items: center;
  padding: 0.625rem 1rem;
  /* WCAG 2.5.5 Target Size (Enhanced) - AAA: Minimum 44x44px */
  min-height: 44px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  color: var(--pk-heading);
}

.markdown-explainer-summary:hover {
  background: var(--pk-hover);
}

.markdown-explainer-content {
  padding: 0.5rem 1rem 1rem;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--pk-text);
}

.markdown-explainer-content p {
  margin: 0 0 0.75rem;
  line-height: 1.55 !important;
}

.markdown-explainer-content ul {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
}

.markdown-explainer-content li {
  margin: 0.375rem 0;
  line-height: 1.55;
}

.markdown-explainer-content strong {
  color: var(--pk-heading);
  font-weight: 700;
}

.markdown-explainer-content a {
  color: var(--pk-link);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown-explainer-content a:hover {
  color: var(--pk-link-hover);
  text-decoration-thickness: 2px;
}

.markdown-explainer-content code,
.markdown-explainer-content kbd {
  background: var(--pk-body);
  border: 1px solid var(--pk-border-input);
  padding: 0.05rem 0.3rem;
  font-size: 0.9em;
  color: var(--pk-heading);
}

.markdown-explainer-content .section-heading {
  margin: 1.25rem 0 0.375rem;
}

.icjia-viewer-highlight {
  margin: 1rem 0;
  padding: 0.75rem 1rem 0.25rem;
  background: var(--pk-card);
  border: 1px solid var(--pk-border-alt);
}

.icjia-viewer-highlight .section-heading {
  margin-top: 0;
}

.tip-text,
.download-dialog-note {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5 !important;
  color: var(--pk-text-2);
}

.tip-text {
  display: block;
  margin-top: 1rem;
}

.download-dialog-note {
  display: block;
}

.download-dialog-note strong,
.tip-text strong {
  color: var(--pk-heading);
}

.download-dialog-actions {
  padding: 0.5rem 1.5rem 1rem;
  border-top: 2px solid var(--pk-border-alt);
}

.cancel-link:hover {
  text-decoration-thickness: 3px !important;
}

@media (max-width: 600px) {
  .download-dialog-title {
    font-size: 1.5rem;
    padding: 1rem 1rem 0.75rem;
  }

  .download-dialog-content {
    padding: 0 1rem 1rem !important;
  }

  .download-option {
    gap: 0.75rem;
  }

  .download-option-icon {
    width: 40px;
    height: 40px;
  }

  .download-dialog-actions {
    padding: 0.5rem 1rem 1rem;
  }
}
</style>
