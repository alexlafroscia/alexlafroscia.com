import type { MaybePromise } from "./types";

type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;

export async function collect<T>(gen: AsyncIterableIterator<T>): Promise<T[]> {
  const result: Array<T> = [];

  for await (const element of gen) {
    result.push(element);
  }

  return result;
}

export function filter<T>(
  filterCallback: (item: T) => boolean
): (input: AsyncIterableIterator<T>) => AsyncIterableIterator<T> {
  return async function* (input) {
    for await (const element of input) {
      if (filterCallback(element)) {
        yield element;
      }
    }
  };
}

interface Logger {
  log(item: unknown): void;
}

export async function* log<T>(
  input: AsyncIterableIterator<T>,
  logger: Logger = console
): AsyncIterableIterator<T> {
  for await (const element of input) {
    logger.log(element);
    yield element;
  }
}

export function map<T, U>(
  mapCallback: (item: T) => MaybePromise<U>
): (input: AnyIterable<T>) => AsyncIterableIterator<U> {
  return async function* (input) {
    for await (const element of input) {
      yield await mapCallback(element);
    }
  };
}
