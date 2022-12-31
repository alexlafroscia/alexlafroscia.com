<script context="module" lang="ts">
  import { Post as RenderPost } from "$lib/components";
</script>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ firstPost } = data);
</script>

<svelte:head>
  <title>home</title>
</svelte:head>

<main class="space-y-16 w-readable max-w-full mx-auto">
  <h1 class="text-3xl lowercase">Home</h1>
  <section>
    <nav>
      <ul class="flex gap-2">
        <li class="text-blue-800 dark:text-blue-400">
          <a class="block border-2 border-blue-700 rounded-md visited:text-current" href="/tech">
            <span class="block m-4 pl-8 pt-8">tech</span>
          </a>
        </li>

        <li class="text-green-800 dark:text-green-400">
          <a
            class="block border-2 border-green-700 rounded-md visited:text-current"
            href="/outdoors"
          >
            <span class="block m-4 pl-8 pt-8">outdoors</span>
          </a>
        </li>
      </ul>
    </nav>
  </section>
  <section>
    <h1 class="text-2xl">Latest Post</h1>

    <RenderPost post={firstPost} />
  </section>
</main>
