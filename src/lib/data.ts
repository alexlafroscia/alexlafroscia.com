import fs from "fs";
import { resolve as resolvePath, parse as parsePath } from "path";
import { compile } from "mdsvex";
import { walk } from "$lib/walk";
import { findPkg } from "$lib/find-pkg";
import { collect } from "$lib/async-iter";

const currentFileUrl = new URL(import.meta.url);
const pkgPath = findPkg(currentFileUrl.pathname);
const { dir: packageRootDir } = parsePath(pkgPath);
const rootPostDirName = resolvePath(packageRootDir, "src/routes/tech");
const POST_EXTENSIONS = new Set([".md", ".svx"]);

export type Post = {
  slug: string;
  frontmatter: unknown;
};

export class Store {
  static instance = new Store();

  cache = new Map<string, Post>();

  private get hasPopulatedCache() {
    return this.cache.size > 0;
  }

  private async loadPostsIntoCache(): Promise<void> {
    const paths = await collect(walk(rootPostDirName));
    const posts: Post[] = await Promise.all(
      paths
        .filter((path) => POST_EXTENSIONS.has(parsePath(path).ext))
        .map(async function (entry) {
          const slug = entry
            // Remove directory from path
            .replace(rootPostDirName, "")
            // Trim leading slash
            .replace(/^\//, "")
            // Remove file extension
            .replace(/\.(svx|md)$/, "");

          const fileContentBuffer = await fs.promises.readFile(entry);
          const fileContentString = fileContentBuffer.toString();
          const result = await compile(fileContentString);

          const {
            data: { fm: frontmatter = {} },
          } = result;

          return {
            slug,
            frontmatter,
          };
        })
    );

    for (const post of posts) {
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
