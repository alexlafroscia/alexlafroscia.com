import type { PageLoad } from "./$types";
import { Post } from "$lib/post";

export const load: PageLoad = async ({ fetch }) => {
  const posts = await Post.fetchAll(fetch);

  return {
    posts: posts.sort(Post.compare),
  };
};

/**
 * Pre-render the page at build-time
 */
export const prerender = true;
