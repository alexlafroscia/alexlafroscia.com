import type { RequestHandler } from "./__types/[topic]";
import { Post } from "$lib/post";

// @ts-expect-error `RequestHandler` wants the `body` to be a specific type,
//                  which includes an index signature on each JSON object in
//                  the response, but I don't want to add that to `SerializedPost`
export const get: RequestHandler = async ({ params }) => {
  const allPosts = await Post.all();
  const postsWithTopic = allPosts
    .filter((post) => post.tags.includes(params.topic))
    .sort(Post.compare);

  // If we can't find any posts with that topic, the topic does not exist
  if (postsWithTopic.length === 0) {
    return {
      status: 404,
    };
  }

  return {
    body: {
      posts: postsWithTopic.map((post) => post.toJSON()),
    },
  };
};
