<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8" elevation="0">
          <h1 class="text-h3 mb-6">Search</h1>

          <!-- Search Input -->
          <v-text-field
            v-model="searchQuery"
            placeholder="Search the site..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            autofocus
            class="mb-6"
            @keyup.enter="performSearch"
          />

          <!-- Search Results -->
          <div v-if="searchQuery && searchQuery.length > 0">
            <div v-if="searchResults.length > 0">
              <h2 class="text-h5 mb-4">
                Found {{ searchResults.length }} result{{
                  searchResults.length !== 1 ? "s" : ""
                }}
              </h2>
              <v-list>
                <v-list-item
                  v-for="result in searchResults"
                  :key="result.item.id"
                  :href="getResultPath(result.item)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mb-2"
                >
                  <template #prepend>
                    <v-icon class="mr-4">mdi-file-document-outline</v-icon>
                  </template>
                  <v-list-item-title class="text-h6 mb-1">
                    {{ result.item.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <div class="text-body-2 mt-2">
                      {{ getSnippet(result.item.content, result.matches) }}
                    </div>
                    <div class="text-caption mt-1 text-medium-emphasis">
                      {{ getResultPath(result.item) }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
            <div v-else class="text-center py-8">
              <v-icon size="64" class="mb-4">mdi-magnify</v-icon>
              <p class="text-h6 mb-2">No results found</p>
              <p class="text-body-2 text-medium-emphasis">
                Try different keywords or check your spelling
              </p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8">
            <v-icon size="64" class="mb-4">mdi-magnify</v-icon>
            <p class="text-h6 mb-2">Search the site</p>
            <p class="text-body-2 text-medium-emphasis">
              Enter a search term above to find content across the accessibility
              portal
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";

const searchQuery = ref("");

// Fetch all searchable content from both collections
const { data: linksData } = await useAsyncData("search-links", () => {
  return queryCollectionSearchSections("links");
});

const { data: faqsData } = await useAsyncData("search-faqs", () => {
  return queryCollectionSearchSections("faqs");
});

const allSearchData = computed(() => {
  const links = linksData.value || [];
  const faqs = faqsData.value || [];
  return [...links, ...faqs];
});

// Initialize Fuse.js with fuzzy search options
const fuse = computed(() => {
  if (!allSearchData.value.length) return null;

  return new Fuse(allSearchData.value, {
    keys: [
      { name: "title", weight: 0.7 },
      { name: "content", weight: 0.3 },
    ],
    threshold: 0.4, // Fuzzy threshold (0.0 = exact match, 1.0 = match anything)
    ignoreLocation: true, // Search across entire string
    minMatchCharLength: 2,
    includeScore: true,
    includeMatches: true,
  });
});

// Perform search
const searchResults = computed(() => {
  if (!searchQuery.value || !fuse.value) return [];

  const query = searchQuery.value.trim();
  if (query.length < 2) return [];

  return fuse.value.search(query).slice(0, 20); // Limit to 20 results
});

// Get snippet from content with highlighting
const getSnippet = (content: string, matches?: Fuse.FuseResultMatch[]) => {
  if (!content) return "";

  const maxLength = 200;
  let snippet = content.substring(0, maxLength);

  if (content.length > maxLength) {
    snippet += "...";
  }

  return snippet;
};

// Get the correct path for a search result
const getResultPath = (item: any) => {
  // If item has a path, use it
  if (item.path) return item.path;

  // If item has an id that looks like a path, use it
  if (item.id && item.id.startsWith("/")) return item.id;

  // Otherwise, try to determine path from collection
  // Check if it's from links or faqs collection based on content
  if (item.titles && item.titles.length > 0) {
    // This is likely from a specific page
    return "/links";
  }

  // Default fallback
  return "/";
};

const performSearch = () => {
  // Search is performed reactively via computed property
  // This function can be used for additional search logic if needed
};

useSeoMeta({
  title: "Search - ICJIA Accessibility Portal",
  description:
    "Search the ICJIA Accessibility Portal for accessibility resources and information",
});
</script>

<style scoped>
.v-list-item {
  border-radius: 8px;
  margin-bottom: 8px;
}

.v-list-item:hover {
  background-color: var(--v-surface-variant);
}
</style>
