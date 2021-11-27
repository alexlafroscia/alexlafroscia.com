import { base } from "$app/paths";
import { Temporal } from "@js-temporal/polyfill";
import type { MdxvexModuleResult } from "./types";

function extractTitleFromPost(code: string[]): string {
  const h1 = code.find((line) => line.startsWith("<h1>") && line.endsWith("</h1>"));

  if (!h1) {
    throw new Error("Could not locate title in post");
  }

  return h1.slice(3, h1.length - 6);
}

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

  static compare(a: Post, b: Post): Temporal.ComparisonResult {
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

  /**
   * Retrieve the full set of Posts
   *
   * Requires that SvelteKit's `fetch` implementation is passed in, since its only available in `load`
   */
  static async fetchAll(fetch: typeof window.fetch): Promise<Post[]> {
    const res = await fetch(`${base}/tech.json`);
    const { posts }: { posts: SerializedPost[] } = await res.json();

    return posts.map((post) => Post.fromJSON(post));
  }
}
