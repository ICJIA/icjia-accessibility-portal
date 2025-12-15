<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8" elevation="0">
          <h1 class="text-h3 mb-6 d-flex align-center">
            <v-icon class="mr-3" color="primary">mdi-link-variant</v-icon>
            {{ page?.title || 'Accessibility Links' }}
          </h1>
          <ContentRenderer
            v-if="page"
            :value="page"
          />
          <div v-else>
            <p>Content not found.</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('links', () => {
  return queryCollection('links').first()
})

useSeoMeta({
  title: page.value?.title ? `${page.value.title} - ICJIA Accessibility Portal` : 'Accessibility Links - ICJIA Accessibility Portal',
  description: page.value?.description || 'Accessibility resources and helpful links',
})
</script>

