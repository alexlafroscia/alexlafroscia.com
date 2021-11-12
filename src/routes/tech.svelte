<script context="module">
  import { base } from "$app/paths";

  export async function load({ fetch }) {
    // Handle redirecting URLs from the old blog, where posts had no namespace,
    // to the new blog where they *do* have a namespace
    const res = await fetch(`${base}/tech.json`);
    const { posts } = await res.json();

    return {
      props: {
        posts,
      },
    };
  }
</script>

<script>
  export let posts;
</script>

<ul>
  {#each posts as post}
    <li><a href={`${base}/tech/${post.slug}`}>{post.slug}</a></li>
  {/each}
</ul>
