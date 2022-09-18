import { describe, expect, it, vi } from "vitest";
import { Post, type SerializedPost } from "./post";

vi.mock("$app/environment", () => ({ browser: false }));

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

    expect(Post.compare(a, b)).toBeGreaterThan(0);
    expect(Post.compare(b, a)).toBeLessThan(0);
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

    expect(Post.compare(a, b)).toBeGreaterThan(0);
    expect(Post.compare(b, a)).toBeLessThan(0);
  });
});
