<script lang="ts" context="module">
  import PostList from "$lib/components/PostList.svelte";
  import TopicList from "$lib/components/TopicList.svelte";
</script>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const { posts, topics } = data;
</script>

<svelte:head>
  <title>All Tech Posts</title>
</svelte:head>

<main class="space-y-16 w-readable max-w-full mx-auto">
  <h1 class="text-3xl lowercase">Tech</h1>

  <section class="space-y-4">
    <h2 class="text-2xl">Topics</h2>

    <TopicList {topics}>
      <li class="flex">
        <a class="text-xs hover:underline" href="/tech/topic">View All</a>
      </li>
    </TopicList>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl">Recent Tech Posts</h2>

    <PostList {posts} />

    <a class="block hover:underline" href="/tech/all">View All</a>
  </section>
</main>
