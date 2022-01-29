import { expect, test } from "vitest";
import { prepare } from "./content";

test("it removes the wrapping `article` element", async () => {
  const result = await prepare('<article class="foo">Testing</article>');

  expect(result).toBe("Testing");
});

test("it removes all classes from elements", async () => {
  const result = await prepare('<article><p class="foo">Testing</p></article>');

  expect(result).toBe("<p>Testing</p>");
});

test("it removes the initial `h1` element", async () => {
  const result = await prepare("<article><h1>title</h1><p>content</p></article>");

  expect(result).toBe("<p>content</p>");
});

test("it adds the host name to relative image URLs", async () => {
  const result = await prepare(`<article><img src="/foo.gif"></article>`);

  expect(result).toBe(`<img src="https://alexlafroscia.com/foo.gif">`);
});
