import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { Post } from "$lib/post";

export const GET: RequestHandler = async () => {
  const posts = await Post.all();

  return json({
    posts: posts.map((post) => post.toJSON()),
  });
};
