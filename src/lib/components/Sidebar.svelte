<script lang="ts">
  import { base } from "$app/paths";

  export let hidden = false;
</script>

<nav id="sidebar" class:hidden>
  <h1 class="bold menu-header">Menu</h1>

  <ol>
    <li><a href={`${base}/`}>home</a></li>

    <li><a href={`${base}/tech`}>tech</a></li>
  </ol>
</nav>

<style lang="scss">
  nav {
    display: flex;
    flex-direction: column;
    background: var(--background-secondary);
    padding: 2rem;
    min-width: 250px;

    &.hidden {
      display: none;
    }
  }

  .menu-header {
    margin-top: 0;
    margin-bottom: 1rem;

    @media (min-width: 600px) {
      margin-top: 1rem;
      margin-bottom: 2rem;
    }
  }

  nav * + * {
    margin-top: 1rem;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
