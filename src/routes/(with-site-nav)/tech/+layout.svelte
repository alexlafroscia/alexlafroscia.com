<script lang="ts">
  import WebMentions from "$lib/components/WebMentions.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: webmentions = data.streamed.webmentions;
</script>

<slot />

<div class="w-readable max-w-full mt-8 mx-auto">
  <WebMentions {webmentions} />
</div>
