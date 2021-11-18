import fs from "fs";
import { join as joinPath, parse as parsePath } from "path";
import { compile } from "mdsvex";
import { Temporal } from "@js-temporal/polyfill";
import { walk } from "$lib/walk";
import { findPkg } from "$lib/find-pkg";
import { pipe } from "$lib/pipe";
import { filter, map } from "$lib/async-iter";
import { Post } from "./post";
import type { Frontmatter } from "./post";

const currentFileUrl = new URL(import.meta.url);
const pkgPath = findPkg(currentFileUrl.pathname);
const { dir: packageRootDir } = parsePath(pkgPath);
const rootPostDirName = joinPath(packageRootDir, "src/routes/tech");
const POST_EXTENSIONS = new Set([".md", ".svx"]);

function extractTitleFromPost(code: string[]): string {
  const h1 = code.find(line => line.startsWith('<h1>') && line.endsWith('</h1>'))

  if (!h1) {
    throw new Error('Could not locate title in post');
  }

  return h1.slice(3, h1.length - 6);
}

export class Store {
  static instance = new Store();

  cache = new Map<string, Post>();

  private get hasPopulatedCache() {
    return this.cache.size > 0;
  }

  private async loadPostsIntoCache(): Promise<void> {
    // Retrieve the same `mdsvex` config that we use at build-time
    const { mdsvexConfig } = await import(joinPath(packageRootDir, "svelte.config.js"));
    const posts = await pipe(
      walk(rootPostDirName),
      filter((path) => POST_EXTENSIONS.has(parsePath(path).ext)),
      map(async function (entry) {
        const slug = entry
          // Remove directory from path
          .replace(rootPostDirName, "")
          // Trim leading slash
          .replace(/^\//, "")
          // Remove file extension
          .replace(/\.(svx|md)$/, "");

        const fileContentBuffer = await fs.promises.readFile(entry);
        const fileContentString = fileContentBuffer.toString();
        const result = await compile(fileContentString, {
          ...mdsvexConfig,
          // Need to provide the file name for layout-application purposes
          filename: entry,
        });

        // `result` can be undefined; not sure _when_ though
        if (!result) {
          throw new Error(`mdsvex could not compile "${entry}"`);
        }

        const frontmatter = (result.data?.fm as Frontmatter) ?? ({} as Frontmatter);

        return { code: result.code, frontmatter, slug };
      }),
      filter((post) => !!post.frontmatter.date),
      map(
        ({ code, frontmatter, slug }) =>
          new Post({
            title: frontmatter.title ?? extractTitleFromPost(code),
            slug,
            date: Temporal.Instant.from((frontmatter.date as Date).toISOString()),
          })
      )
    );

    for await (const post of posts) {
      this.cache.set(post.slug, post);
    }
  }

  async findAll(): Promise<Post[]> {
    if (!this.hasPopulatedCache) {
      await this.loadPostsIntoCache();
    }

    return Array.from(this.cache.values());
  }
}
