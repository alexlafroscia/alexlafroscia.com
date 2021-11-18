<script lang="ts">
  import "../app.scss";

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

<div class="layout">
  <Sidebar hidden={!sidebarIsOpen} />

  <div class="wrapper">
    <Header sidebarOpen={sidebarIsOpen} on:toggle={toggleSidebar} />

    <div class="content">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .layout {
    background: var(--background-primary);
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex-grow: 1;
    padding: 0 1rem 1rem 1rem;

    @media (min-width: 600px) {
      min-height: 100vh;
    }
  }

  .content {
    flex-grow: 1;
  }
</style>
