import type { PageLoad } from "./$types";
import { Post } from "$lib/post";

export const load: PageLoad = async ({ fetch }) => {
  let posts = await Post.fetchAll(fetch);

  posts = posts.sort(Post.compare);

  return {
    firstPost: posts[0],
  };
};

/**
 * Pre-render the page at build-time
 */
export const prerender = true;
