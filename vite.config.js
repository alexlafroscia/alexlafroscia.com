import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import rollupPluginYaml from "@rollup/plugin-yaml";

export default defineConfig({
  plugins: [sveltekit(), rollupPluginYaml()],
});
