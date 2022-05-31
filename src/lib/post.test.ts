import { describe, expect, it } from "vitest";
import { Post, type SerializedPost } from "./post";

describe("compare", () => {
  it("works with Post", () => {
    const a = Post.fromJSON({ title: "A", date: "2020-01-01Z", slug: "/a", legacy: false });
    const b = Post.fromJSON({ title: "B", date: "2021-01-01Z", slug: "/b", legacy: false });

    expect(Post.compare(a, b)).toEqual(-1);
    expect(Post.compare(b, a)).toEqual(1);
  });

  it("works with SerializedPost", () => {
    const a: SerializedPost = { title: "A", date: "2020-01-01Z", slug: "/a", legacy: false };
    const b: SerializedPost = { title: "B", date: "2021-01-01Z", slug: "/b", legacy: false };

    expect(Post.compare(a, b)).toEqual(-1);
    expect(Post.compare(b, a)).toEqual(1);
  });
});
