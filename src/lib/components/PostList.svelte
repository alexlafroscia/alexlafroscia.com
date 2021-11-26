<script lang="ts">
  import type { Post } from "$lib/post";
  import { Post as RenderPost } from "$lib/components";

  export let posts: Post[];
</script>

<ol class="divide-y divide-current">
  {#each posts as post}
    <li>
      <RenderPost {post} />
    </li>
  {/each}
</ol>
