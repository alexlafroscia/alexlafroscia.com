import { Temporal } from "@js-temporal/polyfill";

export type Frontmatter = {
  title?: string;
  description?: string;
  date?: Date;
  tags?: string[];
  [T: string]: unknown;
};

export interface SerializedPost {
  slug: string;
  date: string;
}

export class Post {
  slug: string;
  date: Temporal.Instant;

  static compare(a: Post, b: Post): Temporal.ComparisonResult {
    return Temporal.Instant.compare(a.date, b.date);
  }

  constructor({ slug, date }: { slug: string; date: string | Temporal.Instant }) {
    this.slug = slug;
    this.date = Temporal.Instant.from(date);
  }

  toJSON(): SerializedPost {
    return {
      slug: this.slug,
      date: this.date.toString(),
    };
  }
}
