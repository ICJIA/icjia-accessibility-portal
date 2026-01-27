<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Countdown Timer -->
        <CountdownTimer compact />

        <v-card class="pa-8" elevation="0">
          <h1 class="text-h3 mb-4 d-flex align-center">
            <v-icon class="mr-3" color="primary" aria-hidden="true">mdi-school</v-icon>
            Claude Skills
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-6">
            Master the art of working with Claude AI through these comprehensive skill modules.
            Each module provides structured guidance on leveraging Claude for specific tasks.
          </p>

          <v-row v-if="skills && skills.length > 0">
            <v-col
              v-for="skill in skills"
              :key="skill.id"
              cols="12"
              md="6"
            >
              <SkillModuleCard :skill="skill" />
            </v-col>
          </v-row>

          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4 text-body-1">Loading skills...</p>
          </div>

          <v-divider class="my-8" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview Skills listing page
 * @description Displays all available Claude skill modules
 */

import { useSeo } from "../../composables/useSeo";
import { useBreadcrumbStructuredData } from "../../composables/useStructuredData";

/** @type {import('nuxt/app').AsyncData<Array>} Skills collection */
const { data: skills } = await useAsyncData("skills", async () => {
  const result = await queryCollection("skills").all();
  return result;
});

// SEO
useSeo({
  title: "Claude Skills - Learning Modules",
  description:
    "Master the art of working with Claude AI through comprehensive skill modules covering code examination, design documents, and project management.",
  url: "/skills",
  keywords: [
    "Claude skills",
    "AI learning",
    "code review",
    "design documents",
    "project management",
    "Claude AI",
    "skill modules",
  ],
});

// Breadcrumb structured data
useBreadcrumbStructuredData([
  { name: "Home", url: "/" },
  { name: "Claude Skills", url: "/skills" },
]);
</script>

<style scoped>
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
}

@media (max-width: 400px) {
  h1.text-h3 {
    font-size: 1.25rem !important;
  }
}
</style>
