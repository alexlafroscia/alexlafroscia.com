<script context="module" lang="ts">
  import { Post as RenderPost } from "$lib/components";
</script>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ firstPost } = data);
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
