<script lang="ts">
  import "../app.scss";

  import { navigating } from "$app/stores";
  import { browser } from "$app/env";
  import { Header, Sidebar } from "$lib/components";
  import { isDarkMode } from "$lib/dark-mode";

  // Dark mode class on `body`
  if (browser) {
    isDarkMode.subscribe((isDarkMode) => {
      if (isDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });
  }

  // Sidebar state management
  let sidebarIsOpen = false;

  function toggleSidebar() {
    sidebarIsOpen = !sidebarIsOpen;
  }

  navigating.subscribe(() => {
    // Close the sidebar when navigating
    sidebarIsOpen = false;
  });
</script>

<div class="layout">
  {#if sidebarIsOpen}
    <Sidebar />
  {/if}

  <main>
    <Header sidebarOpen={sidebarIsOpen} on:toggle={toggleSidebar} />

    <slot />
  </main>
</div>

<style>
  .layout {
    background: var(--background-primary);
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }

  main {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex-grow: 1;
    padding: 0 1rem 1rem 1rem;
  }

  @media (min-width: 600px) {
    .layout {
      flex-direction: row;
    }
  }
</style>
