<script lang="ts">
  import { base } from "$app/paths";
</script>

<aside id="sidebar">
  <span class="bold menu-header">Menu</span>

  <a href={`${base}/`}>home</a>

  <a href={`${base}/tech`}>tech blog</a>
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    background: var(--background-secondary);
    padding: 2rem;
    min-width: 250px;
  }

  .menu-header {
    margin-bottom: 1rem;
  }

  aside * + * {
    margin-top: 1rem;
  }
</style>
