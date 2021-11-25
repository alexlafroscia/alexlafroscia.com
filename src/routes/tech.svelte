<script context="module" lang="ts">
  import { base } from "$app/paths";
  import { Post } from "$lib/db/post";
  import type { SerializedPost } from "$lib/db/post";
  import { PostList } from "$lib/components";

  export async function load({ fetch }) {
    const res = await fetch(`${base}/tech.json`);
    let { posts }: { posts: SerializedPost[] } = await res.json();

    return {
      props: {
        posts: posts
          .map((post) => new Post(post))
          .sort(Post.compare)
          .reverse(),
      },
    };
  }

  /**
   * Pre-render the page at build-time
   */
  export const prerender = true;
</script>

<script lang="ts">
  import Fuse from "fuse.js";

  export let posts: Post[];

  const fuse = new Fuse(posts, {
    keys: ["title"],
  });
  let search = "";

  // If there is a search term, fuzzy-find by it
  $: searchResults = search === "" ? posts : fuse.search(search).map(({ item }) => item);
</script>

<main class="w-readable">
  <h1>All Tech Posts</h1>

  <input bind:value={search} placeholder="Filter tech posts" />

  <PostList posts={searchResults} />
</main>

<style>
  input {
    background-color: var(--background-secondary);
    padding: 0.5rem;
    border: 0;
    border-radius: 0.5rem;
    color: var(--text-primary);
  }
</style>
