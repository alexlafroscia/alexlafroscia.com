import { render } from "svelte/server";
import { browser } from "$app/environment";
import { base } from "$app/paths";
import { pipe } from "$lib/pipe";
import { collect, filter, map } from "$lib/async-iter";
import type { MDsveXModule, MDsveXModuleResult } from "./types";

export type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  legacy?: boolean;
};

export interface SerializedPost extends Required<Omit<Frontmatter, "description">> {
  slug: string;
}

export class Post {
  title: string;
  slug: string;
  date: Date;
  tags: string[];

  /**
   * Present when generated on the server, but not provided to the client
   */
  content?: string;

  /**
   * `true` for posts from the "original" Gatsby site, that need a redirect from the "old" URL
   */
  legacy: boolean;

  static compare(a: Post | SerializedPost, b: Post | SerializedPost): number {
    const aDate = a instanceof Post ? a.date : new Date(a.date);
    const bDate = b instanceof Post ? b.date : new Date(b.date);

    // @ts-expect-error you can totally subtract `Date` instances
    return bDate - aDate;
  }

  constructor(slug: string, code: MDsveXModuleResult, frontmatter: Frontmatter) {
    this.slug = slug;

    this.title = frontmatter.title ?? ""; // TODO: extract title from post if not in frontmatter
    this.date = frontmatter.date ? new Date(frontmatter.date) : new Date();
    this.tags = frontmatter.tags ?? [];
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
      frontmatter,
    );
  }

  toJSON(): SerializedPost {
    return {
      title: this.title,
      slug: this.slug,
      date: this.date.toString(),
      tags: this.tags,
      legacy: this.legacy,
    };
  }

  static async fetchAll(fetch: typeof window.fetch): Promise<SerializedPost[]> {
    const res = await fetch(`${base}/tech.json`);
    const { posts }: { posts: SerializedPost[] } = await res.json();

    return posts;
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
      // Note: the glob pattern uses `*` in place of `(` and `)` because the latter had trouble
      // actually matching the files. I couldn't find a way to escape the characters that worked
      const modules = import.meta.glob<MDsveXModule>(
        "../routes/*with-site-nav*/tech/**/*.{md,svx}",
      );

      this.posts = await pipe(
        Object.entries(modules),
        map(async function ([entry, importModule]) {
          const slug = entry
            // Remove directory from path
            .replace("../routes/(with-site-nav)/tech", "")
            // Trim leading slash
            .replace(/^\//, "")
            // Remove SvelteKit file naming conventions
            .replace("/+page", "")
            // Remove file extension
            .replace(/\.(svx|md)$/, "");

          const { default: mod, metadata: frontmatter = {} } = await importModule();
          const code = render(mod, {
            props: {},
          });

          return { code, frontmatter: frontmatter as Frontmatter, slug };
        }),
        filter((post) => !!post.frontmatter.date),
        map(({ code, frontmatter, slug }) => new Post(slug, code, frontmatter)),
        collect,
      );
    }

    return this.posts;
  }
}
