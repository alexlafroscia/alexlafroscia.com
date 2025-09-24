import { expect, test } from "vitest";
import { generateSlugs } from "./path";

test("enumerating all slug patterns within a path", () => {
  const slugs = generateSlugs("foo/bar");

  expect(slugs).toEqual([
    {
      path: "foo",
      label: "foo",
    },
    {
      path: "foo/bar",
      label: "bar",
    },
  ]);
});

test("not getting tripped up by a trailing slash", () => {
  const slugs = generateSlugs("foo/");

  expect(slugs).toEqual([
    {
      path: "foo",
      label: "foo",
    },
  ]);
});

test("when the path is empty", () => {
  const slugs = generateSlugs("");

  expect(slugs).toEqual([]);
});
