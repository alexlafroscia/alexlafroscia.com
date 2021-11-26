<script context="module" lang="ts">
  import { Post } from "$lib/post";
  import { PostList } from "$lib/components";

  export async function load({ fetch }) {
    const posts = await Post.fetchAll(fetch);

    return {
      props: {
        posts: posts.sort(Post.compare).reverse(),
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

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">All Tech Posts</h1>

  <input
    class="text-black dark:text-white bg-gray-200 dark:bg-gray-800 p-2 rounded-lg"
    bind:value={search}
    placeholder="Filter tech posts"
  />

  <PostList posts={searchResults} />
</main>
