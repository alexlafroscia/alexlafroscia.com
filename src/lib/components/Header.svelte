<script lang="ts">
  import { derived } from "svelte/store";
  import { base } from "$app/paths";
  import { page } from "$app/stores";

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
</script>

<header
  class="leading-6 text-black dark:text-white bg-white dark:bg-gray-900 flex items-center py-4 space-x-4"
>
  <nav class="overflow-auto" aria-label="breadcrumbs">
    <h1 class="sr-only">Breadcrumbs</h1>
    <ol class="flex">
      <li class="flex">
        <a class="bold whitespace-nowrap accent-color" href={`${base}/`}>home</a>
      </li>
      {#each $pathParts as part}
        <li class="flex">
          <a class="bold whitespace-nowrap accent-color" href={part.href}>{part.label}</a>
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

  .accent-color {
    color: var(--accent-color);
  }
</style>
