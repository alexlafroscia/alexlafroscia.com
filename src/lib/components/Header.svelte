<script lang="ts">
  import { derived } from "svelte/store";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { fade, scale } from "svelte/transition";
  import Hamburger from "./Header/Hamburger.svelte";

  /* === Breadcrumb Navigation === */

  type PathPart = {
    label: string;
    href: string;
  };

  const pathParts = derived(page, ({ url }) => {
    return url.pathname.split("/").reduce((acc, part) => {
      // Handle root
      if (part === "") {
        return acc;
      }

      const previous = acc[acc.length - 1] ?? { href: base };

      return [...acc, { label: decodeURIComponent(part), href: `${previous.href}/${part}` }];
    }, [] as PathPart[]);
  });

  /* === Navigation Toggle === */

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<header
  class="leading-6 text-black dark:text-white bg-white dark:bg-gray-900 flex items-center sticky top-0 z-10 p-4 -m-4 mb-4 space-x-4"
>
  <Hamburger class="-ml-2 -mr-2 z-10" open={menuOpen} on:toggle={toggleMenu} />

  {#if menuOpen}
    <div
      class={`
        ${/* Positioning the menu */ ""}
        absolute -left-2
        ${/* Top-align menu within the header, rather than center-align */ ""}
        self-start
        ${/* Match border to the "round" edges of the button's hover state */ ""}
        rounded-[24px]
        ${/* Start transition from the top-left */ ""}
        origin-top-left
        ${/* Other Styling */ "//"}
        bg-gray-200 dark:bg-gray-800 shadow
      `}
      transition:scale={{ duration: 200 }}
    >
      <nav class="ml-12 p-3 mr-3" transition:fade={{ delay: 200, duration: 200 }}>
        <ul class="space-y-3">
          <li><a href={`${base}/`}>home</a></li>

          <li><a href={`${base}/tech`}>tech</a></li>

          <li><a href={`${base}/resume`}>resume</a></li>
        </ul>
      </nav>
    </div>
  {/if}

  <nav class="overflow-auto breadcrumbs" aria-label="breadcrumbs">
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
  .breadcrumbs li:not(:last-of-type)::after {
    content: "/";
    padding: 0px 0.5rem;
  }
</style>
