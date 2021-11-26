import { base } from "$app/paths";
import { Store } from "$lib/db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const { fallback: slug } = params;
  const post = await Store.instance.findBySlug(slug);

  // If the URL matches a "legacy" blog post, redirect to the new URL
  if (post?.legacy) {
    return {
      status: 301, // Permanently redirect to the new location
      headers: {
        Location: `${base}/tech/${post.slug}`,
      },
    };
  }
}
