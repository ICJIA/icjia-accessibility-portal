<template>
  <v-expansion-panels
    v-model="expandedPanels"
    class="faq-accordion"
    :multiple="true"
    elevation="0"
    color="surface"
  >
    <v-expansion-panel
      v-for="(item, index) in items"
      :key="index"
      :value="index"
      class="faq-panel"
      elevation="0"
      color="surface"
    >
      <v-expansion-panel-title class="faq-question">
        {{ item.question }}
        <template #actions>
          <v-icon icon="mdi-chevron-down" class="faq-chevron" size="24" />
        </template>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="faq-answer">
        <div class="faq-answer-content">
          <ContentRenderer
            v-if="item.answer"
            :value="createAnswerContent(item.answer)"
          />
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type MiniMarkNode = any;

interface FaqItem {
  question: string;
  answer: MiniMarkNode[];
}

const props = defineProps<{
  items: FaqItem[];
}>();

// Allow multiple panels to be open simultaneously
const expandedPanels = ref<number[]>([]);

// Create a content structure that ContentRenderer can handle
function createAnswerContent(answerNodes: MiniMarkNode[]) {
  return {
    body: {
      type: "minimark",
      value: answerNodes,
    },
  };
}
</script>

<style scoped>
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-panel {
  background: rgb(var(--v-theme-surface)) !important;
  border: 1px solid;
  border-color: rgba(var(--v-theme-on-surface), 0.12) !important;
  border-radius: 8px !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  transition: all 150ms ease !important;
  overflow: hidden;
}

.faq-panel:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  cursor: pointer;
}

.faq-panel:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
}

.faq-panel:focus-within {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.faq-question {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface)) !important;
  padding: 24px !important;
  min-height: auto !important;
}

.faq-chevron {
  color: rgb(var(--v-theme-on-surface-variant)) !important;
  transition: transform 200ms ease-in-out !important;
}

.faq-panel[aria-expanded="true"] .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 !important;
  background: rgb(var(--v-theme-surface-variant)) !important;
}

.faq-answer-content {
  padding: 0 24px 24px 24px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant)) !important;
}

/* Content styling within answers */
.faq-answer-content :deep(p) {
  margin: 0 0 1rem 0;
  color: inherit;
}

.faq-answer-content :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-answer-content :deep(ul),
.faq-answer-content :deep(ol) {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

.faq-answer-content :deep(li) {
  margin: 0.5rem 0;
}

.faq-answer-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.faq-answer-content :deep(th) {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
}

.faq-answer-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-surface-variant), 0.15);
}

.faq-answer-content :deep(tr:last-child td) {
  border-bottom: none;
}

.faq-answer-content :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 2px;
}

.faq-answer-content :deep(a:hover) {
  text-decoration-thickness: 2px;
}

.faq-answer-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  background: rgba(var(--v-theme-primary), 0.08);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.faq-answer-content :deep(code) {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.faq-answer-content :deep(strong) {
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 1023px) {
  .faq-question {
    padding: 20px !important;
    font-size: 17px;
  }

  .faq-answer-content {
    padding: 0 20px 20px 20px;
  }
}

@media (max-width: 767px) {
  .faq-accordion {
    gap: 20px;
  }

  .faq-question {
    padding: 16px !important;
    font-size: 16px;
  }

  .faq-answer-content {
    padding: 0 16px 16px 16px;
    font-size: 15px;
  }

  .faq-chevron {
    min-width: 44px;
    min-height: 44px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .faq-panel,
  .faq-chevron {
    transition: none !important;
  }

  .faq-panel[aria-expanded="true"] .faq-chevron {
    transform: rotate(180deg);
  }
}

/* Link colors use theme primary */
.faq-answer-content :deep(a) {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
