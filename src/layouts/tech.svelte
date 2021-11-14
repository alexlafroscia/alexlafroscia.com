<script>
  /**
   * Provided by mdsvex frontmatter
   *
   * @type {string}
   */
  export let title = "";
</script>

<article>
  {#if title}
    <h1>{title}</h1>
  {/if}

  <slot />
</article>

<style>
  article {
    /* Ensure article is a comfortable width */
    width: 80ch;
    max-width: 100%;
    margin: 0 auto;
  }

  article > :global(p) {
    line-height: 1.5rem;
  }

  article > :global(p) > :global(img) {
    /* Ensure images are only as wide as the text */
    max-width: 100%;
  }

  article > :global(pre) {
    border-radius: 4px;
    padding: 1rem;

    /* Ensure code snippets do not increase max page width */
    max-width: 100%;
    overflow-x: auto;

    /* Use "secondary" background color for code blocks */
    background: var(--background-secondary);
  }
</style>
