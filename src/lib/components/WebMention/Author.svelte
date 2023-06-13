<script lang="ts">
  import type { Author } from "$lib/webmentions";

  export let author: Author;
</script>

<div class="flex gap-2 items-center">
  {#if author.photo}
    <img class="rounded-full h-6 w-6" alt={`Author photo for ${author.name}`} src={author.photo} />
  {/if}

  <p>{author.name}</p>
</div>
