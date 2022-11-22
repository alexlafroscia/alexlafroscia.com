<script lang="ts">
  import { base } from "$app/paths";

  export let topics: string[];
</script>

<ul class="flex flex-wrap items-center gap-2">
  {#each topics as topic}
    <li class="text-xs rounded-full py-1 px-3 bg-blue-100 text-blue-900">
      <a href={`${base}/tech/topic/${topic}`}>
        {topic}
      </a>
    </li>
  {/each}

  <slot />
</ul>
