<script lang="ts">
  import "../tailwind.css";

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

<div
  class="bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col sm:flex-row w-screen h-screen"
>
  <Sidebar hidden={!sidebarIsOpen} />

  <div class="pb-4 pl-4 pr-4 flex flex-col flex-grow overflow-auto sm:min-h-screen">
    <Header sidebarOpen={sidebarIsOpen} on:toggle={toggleSidebar} />

    <div class="flex-grow">
      <slot />
    </div>
  </div>
</div>
