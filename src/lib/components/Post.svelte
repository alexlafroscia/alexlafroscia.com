<script lang="ts">
  import { base } from "$app/paths";
  import type { Post } from "$lib/db/post";

  let className = "";

  export let post: Post;

  export { className as class };
</script>

<article class={`${className} flex py-4`}>
  <header class="space-y-2">
    <h1 class="text-xl">
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
