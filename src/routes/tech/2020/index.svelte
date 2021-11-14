<script context="module" lang="ts">
  import { base } from "$app/paths";
  import { Post } from "$lib/db/post";
  import type { SerializedPost } from "$lib/db/post";

  export async function load({ fetch }) {
    const res = await fetch(`${base}/tech.json`);
    let { posts }: { posts: SerializedPost[] } = await res.json();

    return {
      props: {
        posts: posts
          .map((post) => new Post(post))
          .filter((post) => post.slug.includes("2020"))
          .sort(Post.compare)
          .reverse(),
      },
    };
  }
</script>

<script lang="ts">
  export let posts: Post[];
</script>

<ul>
  {#each posts as post}
    <li><a href={`${base}/tech/${post.slug}`}>{post.slug}</a></li>
  {/each}
</ul>
