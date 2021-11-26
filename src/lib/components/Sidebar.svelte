<script lang="ts">
  import { base } from "$app/paths";

  export let hidden = false;
</script>

<nav id="sidebar" class:hidden class="flex flex-col p-8 min-w-[250px] bg-gray-200 dark:bg-gray-800">
  <h1 class="bold text-lg mb-4 sm:mt-4 sm:mb-8">Menu</h1>

  <ol class="space-y-4">
    <li><a href={`${base}/`}>home</a></li>

    <li><a href={`${base}/tech`}>tech</a></li>
  </ol>
</nav>
