<script lang="ts">
  import "../tailwind.css";
  import "../styles/main-site-background.css";

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

  <!-- Set theme colors to style browser "chrome" like page background -->
  <meta name="color-scheme" content="dark light" />
  <meta name="theme-color" content="white" />
  <meta name="theme-color" content="rgb(17 24 39)" media="(prefers-color-scheme: dark)" />

  <!-- Fathom Analytics -->
  <script
    src="https://nutritious-intuitive.alexlafroscia.com/script.js"
    data-site="NHEVCYHO"
    data-spa="auto"
    defer></script>
</svelte:head>

<div class="flex flex-col sm:flex-row w-screen sm:h-screen">
  <Sidebar hidden={!sidebarIsOpen} />

  <div class="pb-4 pl-4 pr-4 flex flex-col flex-grow overflow-auto sm:min-h-full">
    <Header sidebarOpen={sidebarIsOpen} on:toggle={toggleSidebar} />

    <div class="flex-grow">
      <slot />
    </div>
  </div>
</div>
