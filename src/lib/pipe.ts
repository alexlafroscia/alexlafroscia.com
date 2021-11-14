/**
 * TODO: Replace with native type in TypeScript >= 4.5
 */
type Awaited<T> = T extends Promise<infer U> ? U : T;

type AnyFunction = (...args: unknown[]) => unknown;

export async function pipe<V0, V1, V2>(
  value: V0,
  fn1: (arg: V0) => V1,
  fn2: (arg: Awaited<V1>) => V2
): Promise<V2>;
export async function pipe<V0, V1, V2, V3>(
  value: V0,
  fn1: (arg: V0) => V1,
  fn2: (arg: Awaited<V1>) => V2,
  fn3: (arg: Awaited<V2>) => V3
): Promise<V3>;
export async function pipe<V0, V1, V2, V3>(
  value: V0,
  fn1: (arg: V0) => V1,
  fn2: (arg: Awaited<V1>) => V2,
  fn3: (arg: Awaited<V2>) => V3
): Promise<V3>;
export async function pipe<V0, V1, V2, V3, V4>(
  value: V0,
  fn1: (arg: V0) => V1,
  fn2: (arg: Awaited<V1>) => V2,
  fn3: (arg: Awaited<V2>) => V3,
  fn4: (arg: Awaited<V3>) => V4
): Promise<V4>;
export async function pipe<V0, V1, V2, V3, V4, V5>(
  value: V0,
  fn1: (arg: V0) => V1,
  fn2: (arg: Awaited<V1>) => V2,
  fn3: (arg: Awaited<V2>) => V3,
  fn4: (arg: Awaited<V3>) => V4,
  fn5: (arg: Awaited<V4>) => V5
): Promise<V5>;
export async function pipe<V0, V1, V2, V3, V4, V5, V6>(
  value: V0,
  fn1: (arg: V0) => V1,
  fn2: (arg: Awaited<V1>) => V2,
  fn3: (arg: Awaited<V2>) => V3,
  fn4: (arg: Awaited<V3>) => V4,
  fn5: (arg: Awaited<V4>) => V5,
  fn6: (arg: Awaited<V5>) => V6
): Promise<V6>;
export async function pipe(value: unknown, ...fxns: AnyFunction[]): Promise<unknown> {
  let result = value;

  for (const fxn of fxns) {
    result = await fxn(result);
  }

  return result;
}
