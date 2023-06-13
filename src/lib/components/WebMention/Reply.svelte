<script lang="ts">
  import type { Reply } from "$lib/webmentions";

  import Author from "./Author.svelte";

  export let reply: Reply;

  $: ({ author } = reply);
</script>

<div class="flex flex-col gap-2">
  <Author {author} />

  <div class="space-y-2">
    {@html reply.content.html}
  </div>
</div>
