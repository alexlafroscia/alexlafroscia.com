<script lang="ts">
  import "../tailwind.css";

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
  <!-- Set theme colors to style browser "chrome" like page background -->
  <meta name="color-scheme" content="dark light" />
  <meta name="theme-color" content="white" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="rgb(17, 24, 39)" media="(prefers-color-scheme: dark)" />

  <!-- Fathom Analytics -->
  <script
    src="https://nutritious-intuitive.alexlafroscia.com/script.js"
    data-site="NHEVCYHO"
    data-spa="auto"
    defer
  ></script>
</svelte:head>

<slot />
