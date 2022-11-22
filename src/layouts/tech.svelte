<script>
  import TopicList from "$lib/components/TopicList.svelte";
  import "../styles/prism-theme-night-owl.css";

  /**
   * Provided by mdsvex frontmatter
   *
   * @type {string}
   */
  export let title = "";

  /**
   * @type {string[]}
   */
  export let tags = [];

  let dateString = "";

  $: date = new Date(dateString);

  export { dateString as date };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article class="w-readable max-w-full mx-auto space-y-4 my-8">
  <header class="flex flex-col space-y-2">
    {#if title}
      <h1>{title}</h1>
    {/if}

    <div class="flex flex-col space-y-2 p-2 rounded text-sm bg-gray-200 dark:bg-gray-800">
      <span>
        Posted <time datetime={date.toISOString()}>{date.toLocaleDateString("en-US")}</time>
      </span>

      {#if tags.length}
        <TopicList topics={tags}>
          <li slot="before">Topics:</li>
        </TopicList>
      {/if}
    </div>
  </header>

  <slot />
</article>

<style lang="postcss">
  article :global(h1),
  article :global(h2) {
    @apply font-bold;

    /* For header-link behavior */
    @apply flex items-center gap-1;
  }

  article :global(h1) {
    @apply text-3xl;
  }

  article :global(h2) {
    @apply text-2xl;
  }

  article :global(h1) :global(a),
  article :global(h2) :global(a),
  article :global(h3) :global(a),
  article :global(h4) :global(a) {
    @apply text-current;
  }

  article :global(h1) :global(a) :global(svg),
  article :global(h2) :global(a) :global(svg),
  article :global(h3) :global(a) :global(svg),
  article :global(h4) :global(a) :global(svg) {
    @apply w-5 h-5;
    @apply opacity-40;
    @apply transition-opacity duration-300 delay-200;
  }

  article :global(h1) :global(a):hover :global(svg),
  article :global(h2) :global(a):hover :global(svg),
  article :global(h3) :global(a):hover :global(svg),
  article :global(h4) :global(a):hover :global(svg) {
    @apply opacity-75;
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

  article :global(a:not(.no-underline)) {
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
