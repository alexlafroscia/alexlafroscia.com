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
  title: string;
}

interface PostCreationOptions {
  title: string;
  slug: string;
  date: string | Temporal.Instant;
}

export class Post {
  title: string;
  slug: string;
  date: Temporal.Instant;

  static compare(a: Post, b: Post): Temporal.ComparisonResult {
    return Temporal.Instant.compare(a.date, b.date);
  }

  constructor({ title, slug, date }: PostCreationOptions) {
    this.title = title;
    this.slug = slug;
    this.date = Temporal.Instant.from(date);
  }

  toJSON(): SerializedPost {
    return {
      title: this.title,
      slug: this.slug,
      date: this.date.toString(),
    };
  }
}
