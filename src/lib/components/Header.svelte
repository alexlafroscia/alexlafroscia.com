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

<header>
  <button aria-controls="sidebar" aria-expanded={sidebarOpen} on:click={toggleSidebar}>
    <span class="sr-only">Toggle Sidebar Visibility</span>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
      />
    </svg>
  </button>

  <nav aria-label="breadcrumbs">
    <h1 class="sr-only">Breadcrumbs</h1>
    <ol>
      <li>
        <a class="bold" href={`${base}/`}>home</a>
      </li>
      {#each $pathParts as part}
        <li>
          <a class="bold" href={part.href}>{part.label}</a>
        </li>
      {/each}
    </ol>
  </nav>
</header>

<style>
  header {
    background: var(--background-primary);
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    line-height: 24px;
    padding: 1rem;
    margin: -1rem;
    margin-bottom: 1rem;
  }

  header > * + * {
    margin-left: 1rem;
  }

  button {
    background: transparent;
    border: none;
    color: inherit;
    padding: 0;
    margin: 0;
    line-height: 0;
  }

  nav {
    overflow: auto;
  }

  ol {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
  }

  li:not(:last-of-type)::after {
    content: "/";
    padding: 0px 0.5rem;
  }

  a {
    white-space: nowrap;
  }

  .icon {
    fill: currentColor;
  }
</style>
