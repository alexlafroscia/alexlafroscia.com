import { Temporal } from "@js-temporal/polyfill";

export type Frontmatter = {
  title?: string;
  description?: string;
  date?: Date;
  tags?: string[];
  legacy?: true;
  [T: string]: unknown;
};

export interface SerializedPost {
  slug: string;
  date: string;
  title: string;
  legacy: boolean;
}

interface PostCreationOptions {
  title: string;
  slug: string;
  date: string | Temporal.Instant;
  legacy: boolean;
}

export class Post {
  title: string;
  slug: string;
  date: Temporal.Instant;

  /**
   * `true` for posts from the "original" Gatsby site, that need a redirect from the "old" URL
   */
  legacy: boolean;

  static compare(a: Post, b: Post): Temporal.ComparisonResult {
    return Temporal.Instant.compare(a.date, b.date);
  }

  constructor({ title, slug, date, legacy = false }: PostCreationOptions) {
    this.title = title;
    this.slug = slug;
    this.date = Temporal.Instant.from(date);
    this.legacy = legacy;
  }

  toJSON(): SerializedPost {
    return {
      title: this.title,
      slug: this.slug,
      date: this.date.toString(),
      legacy: this.legacy,
    };
  }
}
