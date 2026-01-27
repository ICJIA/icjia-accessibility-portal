<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Timer -->
        <CountdownTimer compact />

        <v-card class="pa-8" elevation="0">
          <!-- Back navigation -->
          <v-btn
            href="/skills"
            variant="text"
            color="primary"
            class="mb-4"
            prepend-icon="mdi-arrow-left"
          >
            Back to Skills
          </v-btn>

          <!-- Skill header -->
          <div class="d-flex align-start mb-4">
            <v-icon
              v-if="skill?.icon"
              :icon="skill.icon"
              size="48"
              color="primary"
              class="mr-4"
              aria-hidden="true"
            />
            <div class="flex-grow-1">
              <h1 class="text-h3 mb-2">
                {{ skill?.title || "Skill Module" }}
              </h1>
              <p class="text-subtitle-1 text-medium-emphasis mb-0">
                {{ skill?.description }}
              </p>
            </div>
          </div>

          <!-- Skill metadata -->
          <div class="d-flex flex-wrap ga-3 mb-6">
            <v-chip
              v-if="skill?.difficulty"
              :color="difficultyColor"
              variant="tonal"
              size="small"
            >
              <v-icon start size="small">mdi-signal</v-icon>
              {{ capitalizeFirst(skill.difficulty) }}
            </v-chip>
            <v-chip
              v-if="skill?.duration"
              color="info"
              variant="tonal"
              size="small"
            >
              <v-icon start size="small">mdi-clock-outline</v-icon>
              {{ skill.duration }} min
            </v-chip>
            <v-chip
              v-if="skill?.lastUpdated"
              color="secondary"
              variant="tonal"
              size="small"
            >
              <v-icon start size="small">mdi-calendar</v-icon>
              Updated {{ formatDate(skill.lastUpdated) }}
            </v-chip>
          </div>

          <!-- Learning objectives -->
          <v-card
            v-if="skill?.objectives && skill.objectives.length > 0"
            variant="tonal"
            color="primary"
            class="mb-6 pa-4"
          >
            <h2 class="text-h6 mb-3">
              <v-icon start size="small">mdi-target</v-icon>
              Learning Objectives
            </h2>
            <ul class="objectives-list">
              <li v-for="objective in skill.objectives" :key="objective">
                {{ objective }}
              </li>
            </ul>
          </v-card>

          <!-- Tags -->
          <div v-if="skill?.tags && skill.tags.length > 0" class="mb-6">
            <v-chip
              v-for="tag in skill.tags"
              :key="tag"
              size="small"
              variant="outlined"
              class="mr-2 mb-2"
            >
              {{ tag }}
            </v-chip>
          </div>

          <v-divider class="mb-6" />

          <!-- Main content -->
          <div v-if="renderedSkill" class="skill-content">
            <ContentRenderer :value="renderedSkill" />
          </div>
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading content...</p>
          </div>

          <v-divider class="my-8" />

          <!-- Navigation -->
          <div class="d-flex justify-space-between">
            <v-btn
              href="/skills"
              variant="outlined"
              color="primary"
              prepend-icon="mdi-arrow-left"
            >
              Back to Skills
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Individual skill module page
 * @description Displays a single Claude skill module with full content
 */

import { computed } from "vue";
import { useSeo } from "../../composables/useSeo";
import { useBreadcrumbStructuredData } from "../../composables/useStructuredData";

const route = useRoute();
const skillId = route.params.id as string;

/** @type {import('nuxt/app').AsyncData<any>} Skill content */
const { data: skill } = await useAsyncData(`skill-${skillId}`, async () => {
  const results = await queryCollection("skills").all();
  return results.find((s: any) => s.id === skillId);
});

/**
 * Rendered skill content
 */
const renderedSkill = computed(() => {
  if (!skill.value) return null;
  return skill.value;
});

/**
 * Get color based on difficulty level
 */
const difficultyColor = computed(() => {
  switch (skill.value?.difficulty) {
    case "beginner":
      return "success";
    case "intermediate":
      return "warning";
    case "advanced":
      return "error";
    default:
      return "primary";
  }
});

/**
 * Capitalize first letter
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format date string
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// SEO
const pageTitle = skill.value?.title || "Skill Module";
const pageDescription =
  skill.value?.description || "Claude AI skill module for enhancing productivity";

useSeo({
  title: `${pageTitle} - Claude Skills`,
  description: pageDescription,
  url: `/skills/${skillId}`,
  keywords: skill.value?.tags || ["Claude skills", "AI learning"],
});

// Breadcrumb structured data
useBreadcrumbStructuredData([
  { name: "Home", url: "/" },
  { name: "Claude Skills", url: "/skills" },
  { name: pageTitle, url: `/skills/${skillId}` },
]);
</script>

<style scoped>
.objectives-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.objectives-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.objectives-list li::before {
  content: "\2713";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

/* Skill Content Styles */
.skill-content :deep(h1) {
  display: none;
}

.skill-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.2);
}

.skill-content :deep(h2:first-of-type) {
  margin-top: 0;
}

.skill-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.skill-content :deep(h4) {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.skill-content :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 1rem 0;
}

.skill-content :deep(hr) {
  border: none;
  border-top: 2px solid rgba(var(--v-theme-on-surface), 0.15);
  margin: 2.5rem 0;
}

.skill-content :deep(ul),
.skill-content :deep(ol) {
  padding-left: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.skill-content :deep(li) {
  margin: 0.5rem 0;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
}

.skill-content :deep(strong) {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.skill-content :deep(code) {
  background: rgba(var(--v-theme-primary), 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
  font-size: 0.9em;
}

.skill-content :deep(pre) {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0 1.5rem 0;
}

.skill-content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.skill-content :deep(blockquote) {
  border-left: 4px solid rgb(var(--v-theme-primary));
  margin: 1.5rem 0;
  padding: 0.75rem 1.5rem;
  background: rgba(var(--v-theme-primary), 0.05);
  border-radius: 0 8px 8px 0;
}

.skill-content :deep(blockquote p) {
  margin: 0;
}

.skill-content :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.skill-content :deep(a:hover) {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .v-card {
    padding: 1.5rem !important;
  }
}

@media (max-width: 600px) {
  .v-card {
    padding: 1rem !important;
  }

  h1.text-h3 {
    font-size: 1.5rem !important;
  }

  .text-subtitle-1 {
    font-size: 0.9rem !important;
  }

  .skill-content :deep(h2) {
    font-size: 1.25rem;
  }

  .skill-content :deep(h3) {
    font-size: 1.1rem;
  }
}

@media (max-width: 400px) {
  h1.text-h3 {
    font-size: 1.25rem !important;
  }
}
</style>
