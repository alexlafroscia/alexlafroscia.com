<script lang="ts">
  import "../../tailwind.css";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { webVitals } from "$lib/vitals";

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
      debug: true,
    });
  }
</script>

<svelte:head>
  <!-- Fathom Analytics -->
  <script
    src="https://nutritious-intuitive.alexlafroscia.com/script.js"
    data-site="NHEVCYHO"
    data-spa="auto"
    defer></script>
</svelte:head>

<slot />
