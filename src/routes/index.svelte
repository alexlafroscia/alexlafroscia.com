<script context="module" lang="ts">
  import { base } from "$app/paths";
  import { Post } from "$lib/db/post";
  import type { SerializedPost } from "$lib/db/post";

  export async function load({ fetch }) {
    const res = await fetch(`${base}/tech.json`);
    let { posts: postJson }: { posts: SerializedPost[] } = await res.json();

    const posts = postJson
      .map((post) => new Post(post))
      .sort(Post.compare)
      .reverse();

    return {
      props: {
        firstPost: posts[0],
      },
    };
  }

  /**
   * Pre-render the page at build-time
   */
  export const prerender = true;
</script>

<script lang="ts">
  export let firstPost: Post;
</script>

<svelte:head>
  <title>home</title>
</svelte:head>

<main class="w-readable">
  <h1 class="lowercase">Home</h1>
  <section>
    <h1>Recent Articles</h1>
    <article>
      <h1>
        {firstPost.slug}
      </h1>
    </article>
  </section>
</main>

<style>
  main > * + * {
    margin-top: 4rem;
  }
</style>
