import { collect } from "./async-iter";

test("collect", async () => {
  async function* run() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
  }

  expect(await collect(run())).toEqual([1, 2]);
});
