<script lang="ts">
  import "../../styles/main-site-background.css";

  import { navigating } from "$app/stores";
  import { Header, Sidebar } from "$lib/components";

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

<svelte:head>
  <link
    rel="alternate"
    type="application/atom+xml"
    title="Tech | Alex LaFroscia"
    href="/tech.atom"
  />
</svelte:head>

<div class="flex flex-col sm:flex-row w-screen">
  <Sidebar hidden={!sidebarIsOpen} />

  <div class="pb-4 px-4 overflow-auto flex-grow">
    <Header sidebarOpen={sidebarIsOpen} on:toggle={toggleSidebar} />

    <slot />
  </div>
</div>
