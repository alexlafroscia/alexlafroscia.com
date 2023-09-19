import type { PageLoad } from "./$types";
import { Post } from "$lib/post";

export const load: PageLoad = async ({ fetch }) => {
  const posts = await Post.fetchAll(fetch);
  const duplicatedTopics = posts.flatMap((post) => post.tags).sort();

  return {
    posts: posts.sort(Post.compare).slice(0, 5),
    topics: Array.from(new Set(duplicatedTopics)).slice(0, 5),
  };
};

/**
 * Pre-render the page at build-time
 */
export const prerender = true;
