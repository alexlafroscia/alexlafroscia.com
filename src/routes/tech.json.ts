import { Post } from "$lib/post";

// @ts-expect-error `RequestHandler` wants the `body` to be a specific type,
//                  which includes an index signature on each JSON object in
//                  the response, but I don't want to add that to `SerializedPost`
export const GET: RequestHandler = async () => {
  const posts = await Post.all();

  return {
    body: {
      posts: posts.map((post) => post.toJSON()),
    },
  };
};
