<script lang="ts">
  import { base } from "$app/paths";
  import type { SerializedPost } from "$lib/post";

  let className = "";

  export let post: SerializedPost;

  $: date = new Date(post.date);

  export { className as class };
</script>

<article class={`${className} flex py-4`}>
  <header class="space-y-2">
    <h1 class="text-xl">
      <a href={`${base}/tech/${post.slug}`}>{post.title}</a>
    </h1>
    <div>
      {date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  </header>
</article>
