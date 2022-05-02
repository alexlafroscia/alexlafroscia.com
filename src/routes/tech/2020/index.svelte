<script context="module" lang="ts">
  import type { Load } from "./index.d";
  import { Post } from "$lib/post";
  import { PostList } from "$lib/components";

  export const load: Load = async ({ fetch }) => {
    const posts = await Post.fetchAll(fetch);

    return {
      props: {
        posts: posts
          .filter((post) => post.slug.includes("2020"))
          .sort(Post.compare)
          .reverse(),
      },
    };
  };

  /**
   * Pre-render the page at build-time
   */
  export const prerender = true;
</script>

<script lang="ts">
  export let posts: Post[];
</script>

<main class="space-y-4 w-readable max-w-full mx-auto">
  <h1 class="font-bold text-3xl">2020 Tech Posts</h1>

  <PostList {posts} />
</main>
