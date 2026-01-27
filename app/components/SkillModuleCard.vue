<template>
  <v-card
    :href="`/skills/${skill.id}`"
    class="skill-card h-100"
    elevation="2"
    hover
  >
    <v-card-item>
      <template #prepend>
        <v-icon
          :icon="skill.icon || 'mdi-school'"
          size="40"
          color="primary"
          aria-hidden="true"
        />
      </template>
      <v-card-title class="text-h6">
        {{ skill.title }}
      </v-card-title>
      <v-card-subtitle class="text-wrap">
        {{ skill.description }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <!-- Metadata chips -->
      <div class="d-flex flex-wrap ga-2 mb-3">
        <v-chip
          v-if="skill.difficulty"
          :color="difficultyColor"
          variant="tonal"
          size="small"
        >
          <v-icon start size="small">mdi-signal</v-icon>
          {{ capitalizeFirst(skill.difficulty) }}
        </v-chip>
        <v-chip
          v-if="skill.duration"
          color="info"
          variant="tonal"
          size="small"
        >
          <v-icon start size="small">mdi-clock-outline</v-icon>
          {{ skill.duration }} min
        </v-chip>
      </div>

      <!-- Objectives preview -->
      <div v-if="skill.objectives && skill.objectives.length > 0" class="objectives-preview">
        <p class="text-caption text-medium-emphasis mb-1">You'll learn to:</p>
        <ul class="text-body-2">
          <li v-for="(objective, index) in skill.objectives.slice(0, 2)" :key="index">
            {{ objective }}
          </li>
          <li v-if="skill.objectives.length > 2" class="text-medium-emphasis">
            +{{ skill.objectives.length - 2 }} more...
          </li>
        </ul>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        variant="text"
        append-icon="mdi-arrow-right"
      >
        Start Learning
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
/**
 * @fileoverview Skill module card component
 * @description Displays a skill module preview with metadata and link to full content
 */

import { computed } from "vue";

interface Skill {
  id: string;
  title: string;
  description?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  duration?: number;
  tags?: string[];
  objectives?: string[];
  icon?: string;
}

const props = defineProps<{
  skill: Skill;
}>();

/**
 * Get color based on difficulty level
 */
const difficultyColor = computed(() => {
  switch (props.skill.difficulty) {
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
</script>

<style scoped>
.skill-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-card:hover {
  transform: translateY(-2px);
}

.objectives-preview ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.objectives-preview li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.objectives-preview li::before {
  content: "\2022";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
}

.objectives-preview li:last-child::before {
  content: "";
}
</style>
