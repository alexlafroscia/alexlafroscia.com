<script context="module" lang="ts">
  import { base } from "$app/paths";
  import { Post } from "$lib/post";

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, page }) {
    const { fallback: slug } = page.params;

    const techPosts = await Post.fetchAll(fetch);
    const techPostMatchingSlug = techPosts.find((post) => post.slug === slug);

    // If the URL matches a "legacy" blog post, redirect to the new URL
    if (techPostMatchingSlug?.legacy) {
      return {
        status: 301, // Permanently redirect to the new location
        redirect: `${base}/tech/${techPostMatchingSlug.slug}`,
      };
    }
  }
</script>
