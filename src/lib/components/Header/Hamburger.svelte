<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  /**
   * Whether or not the menu is currently open
   */
  export let open = false;

  function toggleMenu() {
    dispatch("toggle");
  }

  let className = "";

  export { className as class };
</script>

<button
  class="{className} bg-transparent rounded-full border-none p-3 m-0 leading-none hover:bg-gray-200 hover:dark:bg-gray-800 transition duration-200"
  aria-controls="sidebar"
  aria-expanded={open}
  on:click={toggleMenu}
>
  <span class="sr-only">Toggle Menu Visibility</span>
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
