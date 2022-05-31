import { Temporal } from "@js-temporal/polyfill";
import { browser } from "$app/env";
import { base } from "$app/paths";
import { pipe } from "$lib/pipe";
import { collect, filter, map } from "$lib/async-iter";
import type { MdxvexModuleResult } from "./types";

export type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  legacy?: boolean;
};

export interface SerializedPost extends Required<Pick<Frontmatter, "title" | "date" | "legacy">> {
  slug: string;
}

export class Post {
  title: string;
  slug: string;
  date: Temporal.Instant;

  /**
   * Present when generated on the server, but not provided to the client
   */
  content?: string;

  /**
   * `true` for posts from the "original" Gatsby site, that need a redirect from the "old" URL
   */
  legacy: boolean;

  static compare(a: Post | SerializedPost, b: Post | SerializedPost): Temporal.ComparisonResult {
    return Temporal.Instant.compare(a.date, b.date);
  }

  constructor(slug: string, code: MdxvexModuleResult, frontmatter: Frontmatter) {
    this.slug = slug;

    this.title = frontmatter.title ?? ""; // TODO: extract title from post if not in frontmatter
    this.date = frontmatter.date ? Temporal.Instant.from(frontmatter.date) : Temporal.Now.instant();
    this.legacy = frontmatter.legacy ?? false;

    this.content = code.html;
  }

  static fromJSON(serialized: SerializedPost): Post {
    const { slug, ...frontmatter } = serialized;
    return new Post(
      // Grab `slug` from serialized format
      slug,
      // Stub `code`; we only need it to extract the title, and we already have done that when we
      // created the serialized form
      { html: "" },
      // Everything else is frontmatter
      frontmatter
    );
  }

  toJSON(): SerializedPost {
    return {
      title: this.title,
      slug: this.slug,
      date: this.date.toString(),
      legacy: this.legacy,
    };
  }

  static async fetchAll(fetch: typeof window.fetch): Promise<Post[]> {
    const res = await fetch(`${base}/tech.json`);
    const { posts }: { posts: SerializedPost[] } = await res.json();

    return posts.map((post) => Post.fromJSON(post));
  }

  /**
   * Store a cache of posts read from the file system
   */
  private static posts?: Post[];

  /**
   * Retrieve the full set of Posts
   *
   * Requires that SvelteKit's `fetch` implementation is passed in, since its only available in `load`
   */
  static async all(): Promise<Post[]> {
    if (browser) {
      throw new Error("Invalid API call from client; use `fetchAll` to load through the network");
    }

    // Initialize the cache if we have not done so already
    if (!this.posts) {
      const modules = import.meta.glob("../routes/tech/**/*.{md,svx}");

      this.posts = await pipe(
        Object.entries(modules),
        map(async function ([entry, importModule]) {
          const slug = entry
            // Remove directory from path
            .replace("./tech", "")
            // Trim leading slash
            .replace(/^\//, "")
            // Remove file extension
            .replace(/\.(svx|md)$/, "");

          const { default: mod, metadata: frontmatter = {} } = await importModule();
          const code: MdxvexModuleResult = mod.render();

          return { code, frontmatter: frontmatter as Frontmatter, slug };
        }),
        filter((post) => !!post.frontmatter.date),
        map(({ code, frontmatter, slug }) => new Post(slug, code, frontmatter)),
        collect
      );
    }

    return this.posts;
  }
}
