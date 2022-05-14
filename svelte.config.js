import { join, parse } from "path";
import vercel from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import { defineMDSveXConfig, mdsvex } from "mdsvex";
import rollupPluginYaml from "@rollup/plugin-yaml";

import rehypePrism from "@mapbox/rehype-prism";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { h } from "hastscript";

const { pathname: filename } = new URL(import.meta.url);
const { dir: rootDir } = parse(filename);

export const mdsvexConfig = defineMDSveXConfig({
  layout: {
    tech: join(rootDir, "./src/layouts/tech.svelte"),
  },
  rehypePlugins: [
    rehypePrism,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        // "Solid Link" icon from Heroicons
        content: h(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" },
          h("path", {
            fillRule: "evenodd",
            d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
            clipRule: "evenodd",
          })
        ),
      },
    ],
  ],
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
