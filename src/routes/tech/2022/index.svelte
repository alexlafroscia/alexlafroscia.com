<script context="module" lang="ts">
  import type { Load } from "./__types/index";
  import { Post, type SerializedPost } from "$lib/post";
  import { PostList } from "$lib/components";

  export const load: Load = async ({ fetch }) => {
    const posts = await Post.fetchAll(fetch);

    return {
      props: {
        posts: posts
          .filter((post) => post.slug.includes("2022"))
          .sort(Post.compare)
          .reverse(),
      },
    };
  };

  /**
   * Pre-render the page at build-time
   */
  export const prerender = true;
</script>

<script lang="ts">
  export let posts: SerializedPost[];
</script>

<svelte:head>
  <title>2022 Tech Posts</title>
</svelte:head>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">2022 Tech Posts</h1>

  <PostList {posts} />
</main>
