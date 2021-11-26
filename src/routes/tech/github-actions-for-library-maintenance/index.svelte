<script context="module" lang="ts">
  import { base } from "$app/paths";
  import { Post } from "$lib/db/post";
  import type { SerializedPost } from "$lib/db/post";
  import { PostList } from "$lib/components";

  export async function load({ fetch }) {
    const res = await fetch(`${base}/tech.json`);
    let { posts }: { posts: SerializedPost[] } = await res.json();

    return {
      props: {
        posts: posts
          .map((post) => new Post(post))
          .filter((post) => post.slug.includes("github-actions-for-library-maintenance"))
          .sort(Post.compare)
          .reverse(),
      },
    };
  }

  /**
   * Pre-render the page at build-time
   */
  export const prerender = true;
</script>

<script lang="ts">
  export let posts: Post[];
</script>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">Series: GitHub Actions for Library Maintenance</h1>

  <PostList {posts} />
</main>
