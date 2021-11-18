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

<main class="w-readable">
  <h1>All Tech Posts</h1>

  <PostList {posts} />
</main>
