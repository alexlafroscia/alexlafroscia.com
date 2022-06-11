<script lang="ts" context="module">
  import type { Load } from "./__types/topic";
  import { Post, type SerializedPost } from "$lib/post";

  type Topic = SerializedPost["tags"][number];

  export const load: Load = async ({ fetch }) => {
    const posts = await Post.fetchAll(fetch);
    const duplicatedTopics = posts.flatMap((post) => post.tags).sort();

    return {
      props: {
        topics: Array.from(new Set(duplicatedTopics)),
      },
    };
  };
</script>

<script lang="ts">
  import { base } from "$app/paths";

  export let topics: Topic[];
</script>

<svelte:head>
  <title>Topics</title>
</svelte:head>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">Topics</h1>

  <ul>
    {#each topics as topic}
      <li>
        <a href={`${base}/tech/topic/${topic}`}>{topic}</a>
      </li>
    {/each}
  </ul>
</main>
