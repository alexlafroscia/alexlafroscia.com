<script lang="ts">
  import { base } from "$app/paths";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

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
  <a class="bold" href={`${base}/`}>home</a>
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

  header * + * {
    margin-left: 0.5rem;
  }

  button {
    background: transparent;
    border: none;
    color: inherit;
    padding: 0;
    margin: 0;
  }

  .icon {
    fill: currentColor;
  }
</style>
