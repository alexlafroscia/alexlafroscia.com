import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { Post } from "$lib/post";

export const load: PageServerLoad = async ({ params }) => {
  const allPosts = await Post.all();
  const postsWithTopic = allPosts
    .filter((post) => post.tags.includes(params.topic))
    .sort(Post.compare);

  // If we can't find any posts with that topic, the topic does not exist
  if (postsWithTopic.length === 0) {
    throw error(404, "No posts exist with that topic");
  }

  return {
    posts: postsWithTopic.map((post) => post.toJSON()),
  };
};
