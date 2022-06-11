<script lang="ts">
  import { derived } from "svelte/store";
  import { page } from "$app/stores";
  import type { SerializedPost } from "$lib/post";
  import PostList from "$lib/components/PostList.svelte";

  export let posts: SerializedPost[];

  const topic = derived(page, (page) => page.params.topic);
  const title = derived(topic, (topic) => `Tech Posts on ${topic}`);
</script>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">{$title}</h1>

  <PostList {posts} />
</main>
