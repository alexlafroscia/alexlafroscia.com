<script lang="ts">
  import type { SerializedPost } from "$lib/post";
  import { Post } from "$lib/components";

  export let posts: SerializedPost[];
</script>

<ol class="divide-y divide-gray-200 dark:divide-gray-800">
  {#each posts as post}
    <li>
      <Post {post} />
    </li>
  {/each}
</ol>
