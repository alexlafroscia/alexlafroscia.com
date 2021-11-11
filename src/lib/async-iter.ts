export async function collect<T>(gen: AsyncIterableIterator<T>): Promise<T[]> {
  const result: Array<T> = [];

  for await (const element of gen) {
    result.push(element);
  }

  return result;
}
