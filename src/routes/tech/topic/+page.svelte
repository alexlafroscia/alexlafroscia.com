<script lang="ts">
  import type { PageData } from "./$types";
  import { base } from "$app/paths";

  export let data: PageData;

  const { topics } = data;
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
