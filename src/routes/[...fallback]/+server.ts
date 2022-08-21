import type { RequestHandler } from "./$types";
import { base } from "$app/paths";
import { Post } from "$lib/post";

export const GET: RequestHandler = async ({ params }) => {
  const { fallback: slug } = params;

  const techPosts = await Post.all();
  const techPostMatchingSlug = techPosts.find((post) => post.slug === slug);

  // If the URL matches a "legacy" blog post, redirect to the new URL
  if (techPostMatchingSlug?.legacy) {
    return new Response(null, {
      status: 301,
      headers: {
        location: `${base}/tech/${techPostMatchingSlug.slug}`,
      },
    });
  }

  return new Response(null, {
    status: 404,
  });
};
