<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <ContentRenderer
          v-if="page"
          :value="page"
        />
        <div v-else>
          <h1>Frequently Asked Questions</h1>
          <p>Content not found.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('faqs', () => {
  return queryCollection('faqs').first()
})

useSeoMeta({
  title: page.value?.title ? `${page.value.title} - ICJIA Accessibility Portal` : 'FAQs - ICJIA Accessibility Portal',
  description: page.value?.description || 'Frequently asked questions about accessibility',
})
</script>

