import { join, parse } from "path";
import vercel from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";

const { pathname: filename } = new URL(import.meta.url);
const { dir: rootDir } = parse(filename);

export const mdsvexConfig = {
  layout: {
    tech: join(rootDir, "./src/layouts/tech.svelte"),
  },
  extensions: [".md", ".svx"],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".md", ".svelte", ".svx"],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    adapter: vercel({}),
  },
};

export default config;
