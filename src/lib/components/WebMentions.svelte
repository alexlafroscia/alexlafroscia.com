<script lang="ts">
  import { slide } from "svelte/transition";

  import type { LayoutData } from "../../routes/tech/$types";

  import Reply from "./WebMention/Reply.svelte";

  type WebMentionsPayload = LayoutData["streamed"]["webmentions"];

  export let webmentions: WebMentionsPayload;
</script>

<section class="text-sm rounded-lg border-2">
  <div class="p-3 flex">
    {#await webmentions}
      <h1 class="font-semibold motion-safe:animate-pulse">WebMentions</h1>
    {:then}
      <h1 class="font-semibold">WebMentions</h1>
    {/await}
  </div>

  {#await webmentions then value}
    <div class="px-3 py-1 border-t-2" transition:slide>
      {#if value.children.length}
        <ul class="divide-y-2">
          {#each value.children as child}
            {#if "in-reply-to" in child}
              <li class="py-2">
                <Reply reply={child} />
              </li>
            {/if}
          {/each}
        </ul>
      {:else}
        <p class="py-2 italics">There are no WebMentions for this page yet</p>
      {/if}
    </div>
  {/await}
</section>
