<script lang="ts">
  import { base } from "$app/paths";
  import type { Post } from "$lib/db/post";

  let className = "";

  export let post: Post;

  export { className as class };
</script>

<article class={className}>
  <header>
    <h1>
      <a href={`${base}/tech/${post.slug}`}>{post.title}</a>
    </h1>
    <div>
      {post.date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  </header>
</article>

<style lang="scss">
  article {
    display: flex;
    padding: 1rem 0;
  }

  header > * + * {
    margin-top: 0.5rem;
  }

  h1 {
    margin: 0;
  }
</style>
