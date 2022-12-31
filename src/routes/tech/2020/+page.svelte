<script context="module" lang="ts">
  import { PostList } from "$lib/components";
</script>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const { posts } = data;
</script>

<svelte:head>
  <title>2020 Tech Posts</title>
</svelte:head>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">2020 Tech Posts</h1>

  <PostList {posts} />
</main>
