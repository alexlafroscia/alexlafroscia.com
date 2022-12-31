<script lang="ts">
  import "../tailwind.css";
  import "../styles/main-site-background.css";

  import { browser, dev } from "$app/environment";
  import { page } from "$app/stores";
  import { webVitals } from "$lib/vitals";
  import { Footer, Header, ReadableWidth } from "$lib/components";

  // Themeing
  $: useOutdoorTheme = $page.url.pathname.startsWith("/outdoors");

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
</svelte:head>

<div
  class="flex flex-col min-h-screen accent-color-default"
  class:accent-color-green={useOutdoorTheme}
>
  <div class="pb-4 px-4 overflow-auto flex-grow">
    <ReadableWidth>
      <Header />
    </ReadableWidth>

    <div class="mt-4">
      <slot />
    </div>
  </div>

  <Footer />
</div>

<style>
  .accent-color-default {
    --accent-color: theme(colors.blue.700);
  }

  @media (prefers-color-scheme: dark) {
    .accent-color-default {
      --accent-color: theme(colors.blue.400);
    }
  }

  .accent-color-green {
    --accent-color: theme(colors.green.700);
  }

  @media (prefers-color-scheme: dark) {
    .accent-color-green {
      --accent-color: theme(colors.green.400);
    }
  }
</style>
