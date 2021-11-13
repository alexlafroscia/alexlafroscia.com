<script context="module" lang="ts">
  import type { Post } from "$lib/data";
  import { base } from "$app/paths";

  type ListResponse = {
    posts: Post[];
  };

  export async function load({ fetch }) {
    const res = await fetch(`${base}/tech.json`);
    const { posts }: ListResponse = await res.json();

    return {
      props: {
        posts: posts.filter((post) => post.slug.includes("2020")),
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
