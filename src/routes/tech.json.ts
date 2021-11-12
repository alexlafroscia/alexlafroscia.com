import { Store } from "$lib/data";
import type { Post } from "$lib/data";

type Response = {
  body: {
    posts: Post[];
  };
};

export async function get(): Promise<Response> {
  const posts = await Store.instance.findAll();

  return {
    body: {
      posts,
    },
  };
}
