import type { PageLoad } from "./$types";
import { Post } from "$lib/post";

export const load: PageLoad = async ({ fetch }) => {
  const posts = await Post.fetchAll(fetch);

  return {
    posts: posts.filter((post) => post.slug.includes("2020")).sort(Post.compare),
  };
};

/**
 * Pre-render the page at build-time
 */
export const prerender = true;
