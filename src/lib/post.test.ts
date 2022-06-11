import { describe, expect, it } from "vitest";
import { Post, type SerializedPost } from "./post";

describe("compare", () => {
  it("works with Post", () => {
    const a = Post.fromJSON({
      title: "A",
      date: "2020-01-01Z",
      slug: "/a",
      legacy: false,
      tags: [],
    });
    const b = Post.fromJSON({
      title: "B",
      date: "2021-01-01Z",
      slug: "/b",
      legacy: false,
      tags: [],
    });

    expect(Post.compare(a, b)).toBeLessThan(0);
    expect(Post.compare(b, a)).toBeGreaterThan(0);
  });

  it("works with SerializedPost", () => {
    const a: SerializedPost = {
      title: "A",
      date: "2020-01-01Z",
      slug: "/a",
      legacy: false,
      tags: [],
    };
    const b: SerializedPost = {
      title: "B",
      date: "2021-01-01Z",
      slug: "/b",
      legacy: false,
      tags: [],
    };

    expect(Post.compare(a, b)).toBeLessThan(0);
    expect(Post.compare(b, a)).toBeGreaterThan(0);
  });
});
