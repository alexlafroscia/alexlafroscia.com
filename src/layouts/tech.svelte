<script>
  /**
   * Provided by mdsvex frontmatter
   *
   * @type {string}
   */
  export let title = "";
</script>

{#if title}
  <h1>{title}</h1>
{/if}

<slot />
