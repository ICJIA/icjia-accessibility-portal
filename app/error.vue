<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <v-container>
        <v-row justify="center" align="center" class="min-height-screen">
          <v-col cols="12" md="8" lg="6">
            <v-card class="pa-8 text-center" elevation="2">
              <div class="error-code mb-4">
                <span class="error-number">{{ error.statusCode || 404 }}</span>
              </div>

              <h1 class="text-h4 mb-4">Page Not Found</h1>

              <p class="text-body-1 mb-6 text-medium-emphasis">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <div class="mb-6">
                <v-icon size="64" class="mb-4"
                  >mdi-file-question-outline</v-icon
                >
              </div>

              <div class="d-flex flex-column flex-sm-row gap-4 justify-center">
                <v-btn
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  size="large"
                  prepend-icon="mdi-home"
                >
                  Go Home
                </v-btn>

                <v-btn
                  href="/search"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="large"
                  prepend-icon="mdi-magnify"
                >
                  Search Site
                </v-btn>
              </div>

              <v-divider class="my-6" />

              <div class="text-body-2 text-medium-emphasis">
                <p class="mb-2">You might be looking for:</p>
                <div
                  class="d-flex flex-column flex-sm-row gap-2 justify-center"
                >
                  <v-btn
                    href="/links"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    size="small"
                  >
                    Accessibility Links
                  </v-btn>
                  <v-btn
                    href="/faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    size="small"
                  >
                    FAQs
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}>();

useSeoMeta({
  title: `${props.error.statusCode || 404} - Page Not Found`,
  description: "The page you are looking for could not be found.",
});
</script>

<style scoped>
.min-height-screen {
  min-height: calc(100vh - 200px);
}

.error-code {
  margin-bottom: 2rem;
}

.error-number {
  font-size: 8rem;
  font-weight: bold;
  line-height: 1;
  background: linear-gradient(
    135deg,
    var(--v-primary-base),
    var(--v-accent-base)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

@media (max-width: 600px) {
  .error-number {
    font-size: 5rem;
  }
}
</style>
