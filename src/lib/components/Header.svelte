<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { derived } from "svelte/store";
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  type PathPart = {
    label: string;
    href: string;
  };

  const dispatch = createEventDispatcher();

  const pathParts = derived(page, ({ path }) => {
    return path.split("/").reduce((acc, part) => {
      // Handle root
      if (part === "") {
        return acc;
      }

      const previous = acc[acc.length - 1] ?? { href: base };

      return [...acc, { label: part, href: `${previous.href}/${part}` }];
    }, [] as PathPart[]);
  });

  export let sidebarOpen = false;

  function toggleSidebar() {
    dispatch("toggle");
  }
</script>

<header
  class="leading-6 text-black dark:text-white bg-white dark:bg-gray-900 flex items-center sticky top-0 p-4 -m-4 mb-4 space-x-4"
>
  <button
    class="bg-transparent border-none p-0 m-0 leading-none"
    aria-controls="sidebar"
    aria-expanded={sidebarOpen}
    on:click={toggleSidebar}
  >
    <span class="sr-only">Toggle Sidebar Visibility</span>
    <svg
      class="icon fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
      />
    </svg>
  </button>

  <nav class="overflow-auto" aria-label="breadcrumbs">
    <h1 class="sr-only">Breadcrumbs</h1>
    <ol class="flex">
      <li class="flex">
        <a class="bold whitespace-nowrap" href={`${base}/`}>home</a>
      </li>
      {#each $pathParts as part}
        <li class="flex">
          <a class="bold whitespace-nowrap" href={part.href}>{part.label}</a>
        </li>
      {/each}
    </ol>
  </nav>
</header>

<style>
  li:not(:last-of-type)::after {
    content: "/";
    padding: 0px 0.5rem;
  }
</style>
