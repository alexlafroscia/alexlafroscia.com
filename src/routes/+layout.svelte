<script lang="ts">
  import "../tailwind.css";
  import "../styles/main-site-background.css";

  import { browser, dev } from "$app/environment";
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

  {#if !dev}
    <!-- Fathom Analytics -->
    <script
      src="https://nutritious-intuitive.alexlafroscia.com/script.js"
      data-site="NHEVCYHO"
      data-spa="auto"
      defer
    ></script>
  {/if}

  <link
    rel="alternate"
    type="application/atom+xml"
    title="Tech | Alex LaFroscia"
    href="/tech.atom"
  />

  <!-- Support web mentions through `webmention.io` -->
  <link rel="webmention" href="https://webmention.io/alexlafroscia.com/webmention" />
</svelte:head>

<slot />
