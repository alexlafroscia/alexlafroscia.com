<script context="module" lang="ts">
  import type { Load } from "./__types/[...fallback]";
  import { base } from "$app/paths";
  import { Post } from "$lib/post";

  export const load: Load = async ({ fetch, params }) => {
    const { fallback: slug } = params;

    const techPosts = await Post.fetchAll(fetch);
    const techPostMatchingSlug = techPosts.find((post) => post.slug === slug);

    // If the URL matches a "legacy" blog post, redirect to the new URL
    if (techPostMatchingSlug?.legacy) {
      return {
        status: 301, // Permanently redirect to the new location
        redirect: `${base}/tech/${techPostMatchingSlug.slug}`,
      };
    }

    return {
      status: 404,
    };
  };
</script>
