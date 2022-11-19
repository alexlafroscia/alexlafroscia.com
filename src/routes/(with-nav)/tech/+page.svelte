<script lang="ts" context="module">
  import PostList from "$lib/components/PostList.svelte";
</script>

<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { posts } = data;

  const fuse = new Fuse(posts, {
    keys: ["title"],
  });
  let search = "";

  // If there is a search term, fuzzy-find by it
  $: searchResults = search === "" ? posts : fuse.search(search).map(({ item }) => item);

  /** Disable input when JavaScript is disabled */

  let inputDisabled = true;

  onMount(() => {
    inputDisabled = false;
  });
</script>

<svelte:head>
  <title>All Tech Posts</title>
</svelte:head>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">All Tech Posts</h1>

  <input
    class="text-black dark:text-white bg-gray-200 dark:bg-gray-800 p-2 rounded-lg"
    class:opacity-50={inputDisabled}
    disabled={inputDisabled}
    bind:value={search}
    placeholder="Filter tech posts"
  />

  <PostList posts={searchResults} />
</main>
