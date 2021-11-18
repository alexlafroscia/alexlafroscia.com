<script lang="ts">
  import type { Post } from "$lib/db/post";
  import { Post as RenderPost } from "$lib/components";

  export let posts: Post[];
</script>

<ol>
  {#each posts as post}
    <li>
      <RenderPost {post} />
    </li>
  {/each}
</ol>

<style>
  ol {
    list-style: none;
    padding: 0;
  }

  li + li {
    border-top: 1px solid currentColor;
  }
</style>
