<script lang="ts">
  import "../tailwind.css";
  import "../styles/main-site-background.css";

  import { Header } from "$lib/components";
</script>

<svelte:head>
  <link
    rel="alternate"
    type="application/atom+xml"
    title="Tech | Alex LaFroscia"
    href="/tech.atom"
  />

  <!-- Set theme colors to style browser "chrome" like page background -->
  <meta name="color-scheme" content="dark light" />
  <meta name="theme-color" content="white" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="rgb(17, 24, 39)" media="(prefers-color-scheme: dark)" />

  <!-- Fathom Analytics -->
  <script
    src="https://nutritious-intuitive.alexlafroscia.com/script.js"
    data-site="NHEVCYHO"
    data-spa="auto"
    defer></script>
</svelte:head>

<div class="flex flex-col sm:flex-row w-screen">
  <div class="pb-4 px-4 overflow-auto flex-grow">
    <Header />

    <slot />
  </div>
</div>
