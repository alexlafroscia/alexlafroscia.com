<script lang="ts">
  import type { Post } from "$lib/post";
  import { Post as RenderPost } from "$lib/components";

  export let posts: Post[];
</script>

<ol class="divide-y divide-gray-200 dark:divide-gray-800">
  {#each posts as post}
    <li>
      <RenderPost {post} />
    </li>
  {/each}
</ol>
