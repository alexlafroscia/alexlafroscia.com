import type { PageLoad } from "../$types";
import { Post } from "$lib/post";

export const load: PageLoad = async ({ fetch }) => {
  const posts = await Post.fetchAll(fetch);
  const duplicatedTopics = posts.flatMap((post) => post.tags).sort();

  return {
    topics: Array.from(new Set(duplicatedTopics)),
  };
};
