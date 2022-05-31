<script context="module" lang="ts">
  import type { Load } from "./__types/index";
  import { Post, type SerializedPost } from "$lib/post";
  import { Post as RenderPost } from "$lib/components";

  export const load: Load = async ({ fetch }) => {
    let posts = await Post.fetchAll(fetch);

    posts = posts.sort(Post.compare).reverse();

    return {
      props: {
        firstPost: posts[0],
      },
    };
  };

  /**
   * Pre-render the page at build-time
   */
  export const prerender = true;
</script>

<script lang="ts">
  export let firstPost: SerializedPost;
</script>

<svelte:head>
  <title>home</title>
</svelte:head>

<main class="space-y-16 w-readable max-w-full mx-auto">
  <h1 class="text-3xl lowercase mt-8">Home</h1>
  <section>
    <h1 class="text-2xl">Latest Post</h1>

    <RenderPost post={firstPost} />
  </section>
</main>
