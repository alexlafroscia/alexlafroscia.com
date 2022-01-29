import { describe, expect, test, vi } from "vitest";
import { collect, filter, log as logEach, map } from "./async-iter";

test("collect", async () => {
  async function* run() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
  }

  expect(await collect(run())).toEqual([1, 2]);
});

test("filter", async () => {
  async function* run() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
  }

  const evenFilter = filter((num: number) => num % 2 === 0);
  const onlyEven = evenFilter(run());

  expect(await collect(onlyEven)).toEqual([2]);
});

test("log", async () => {
  const log = vi.fn();
  async function* run() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
  }

  const output = logEach(run(), { log });

  // Output is correct
  expect(await collect(output)).toEqual([1, 2]);

  // Logged as expected
  expect(log).toHaveBeenCalledTimes(2);
  expect(log).toHaveBeenCalledWith(1);
  expect(log).toHaveBeenCalledWith(2);
});

describe("map", () => {
  test("with an async iterable", async () => {
    async function* run() {
      yield Promise.resolve(1);
      yield Promise.resolve(2);
    }

    const doubleMapper = map((num: number) => num * 2);
    const doubled = doubleMapper(run());

    expect(await collect(doubled)).toEqual([2, 4]);
  });

  test("with an iterable", async () => {
    const content = [1, 2];

    const doubleMapper = map((num: number) => num * 2);
    const doubled = doubleMapper(content);

    expect(await collect(doubled)).toEqual([2, 4]);
  });
});
