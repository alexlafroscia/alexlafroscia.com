import { Store } from "$lib/db";
import type { SerializedPost } from "$lib/db/post";

type Response = {
  body: {
    posts: SerializedPost[];
  };
};

export async function get(): Promise<Response> {
  const posts = await Store.instance.findAll();

  return {
    body: {
      posts: posts.map((post) => post.toJSON()),
    },
  };
}
