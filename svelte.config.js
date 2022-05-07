import { join, parse } from "path";
import vercel from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import { defineMDSveXConfig, mdsvex } from "mdsvex";
import rehypePrism from "@mapbox/rehype-prism";
import rollupPluginYaml from "@rollup/plugin-yaml";

const { pathname: filename } = new URL(import.meta.url);
const { dir: rootDir } = parse(filename);

export const mdsvexConfig = defineMDSveXConfig({
  layout: {
    tech: join(rootDir, "./src/layouts/tech.svelte"),
  },
  rehypePlugins: [rehypePrism],
  extensions: [".md", ".svx"],
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".md", ".svelte", ".svx"],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],

  kit: {
    adapter: vercel({}),

    prerender: {
      entries: [
        // Default behavior
        // https://github.com/sveltejs/kit/blob/f95801ee10be3f5888e27672b100688c47a20a99/packages/kit/src/core/config/options.js#L120
        "*",

        // Pre-render the RSS feed
        "/tech.atom",
      ],
    },

    vite: {
      plugins: [rollupPluginYaml()],
    },
  },
};

export default config;
