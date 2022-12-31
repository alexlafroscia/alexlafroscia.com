<script context="module" lang="ts">
  import { PostList } from "$lib/components";
</script>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const { posts } = data;
</script>

<svelte:head>
  <title>GitHub Actions for Library Maintenance</title>
</svelte:head>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">Series: GitHub Actions for Library Maintenance</h1>

  <PostList {posts} />
</main>
