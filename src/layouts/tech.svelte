<script>
  import "../styles/prism-theme-night-owl.css";

  /**
   * Provided by mdsvex frontmatter
   *
   * @type {string}
   */
  export let title = "";
</script>

<article class="w-readable max-w-full mx-auto space-y-4 my-8">
  {#if title}
    <h1>{title}</h1>
  {/if}

  <slot />
</article>

<style lang="postcss">
  article :global(h1) {
    @apply font-bold;
    @apply text-3xl;
  }

  article :global(h2) {
    @apply font-bold;
    @apply text-2xl;
  }

  article :global(p) {
    @apply leading-6;
  }

  article :global(p) > :global(img) {
    /* Ensure images are only as wide as the text */
    @apply max-w-full;
  }

  article :global(h1) :global(code),
  article :global(h2) :global(code),
  article :global(h3) :global(code),
  article :global(h4) :global(code),
  article :global(li) :global(code),
  article :global(p) :global(code) {
    /* Style inline code snippets */
    @apply text-sm;
    @apply bg-gray-200;
    @apply px-1 py-0.5;
    @apply rounded;

    @media (prefers-color-scheme: dark) {
      @apply bg-gray-800;
    }
  }

  article :global(a) {
    @apply underline;
  }

  article :global(blockquote) {
    @apply pl-4;
    @apply py-1;
    @apply border-l-4;
    @apply border-gray-200;

    @media (prefers-color-scheme: dark) {
      @apply border-gray-800;
    }
  }

  article > :global(pre) {
    @apply text-white;
    @apply bg-gray-800;

    @apply rounded;
    @apply p-4;

    /* Ensure code snippets do not increase max page width */
    @apply max-w-full;
    @apply overflow-x-auto;
  }

  article > :global(ol),
  article > :global(ul) {
    @apply list-inside;
  }

  article > :global(ol) {
    @apply list-decimal;
  }

  article > :global(ul) {
    @apply list-disc;
  }
</style>
