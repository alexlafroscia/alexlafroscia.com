import { expect, test } from "vitest";
import { pipe } from "./pipe";

test("piping a value through multiple synchronous functions", async () => {
  const result = await pipe(
    1,
    (v) => v + 1,
    (v) => v * 2
  );

  expect(result).toBe(4);
});

test("piping a value through multiple asynchronous functions", async () => {
  const result = await pipe(
    1,
    (v) => Promise.resolve(v + 1),
    (v) => Promise.resolve(v * 2)
  );

  expect(result).toBe(4);
});
