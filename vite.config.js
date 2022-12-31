import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import rollupPluginYaml from "@rollup/plugin-yaml";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [sveltekit(), rollupPluginYaml(), tsconfigPaths()],

  define: {
    "import.meta.env.VERCEL_ANALYTICS_ID": JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
  },

  test: {
    // Use Vitest for `src/**` tests
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
