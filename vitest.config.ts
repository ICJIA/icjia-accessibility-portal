import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: [
            "test/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
          ],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: [
            "test/nuxt/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
          ],
          environment: "nuxt",
        },
      }),
      // E2E tests temporarily disabled due to @nuxt/test-utils compatibility issue
      // See: https://github.com/nuxt/test-utils/issues/1491
      // Uncomment when issue is resolved:
      // await defineVitestProject({
      //   test: {
      //     name: "e2e",
      //     include: [
      //       "test/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      //     ],
      //     environment: "nuxt",
      //     setupTimeout: 180000, // 3 minutes for build
      //     testTimeout: 30000, // 30 seconds per test
      //   },
      // }),
    ],
  },
});
