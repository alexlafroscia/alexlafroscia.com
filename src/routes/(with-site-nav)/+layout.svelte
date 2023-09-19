<script lang="ts">
  import { page } from "$app/stores";
  import { Footer, Header, ReadableWidth } from "$lib/components";

  // Themeing
  $: useOutdoorTheme = $page.url.pathname.startsWith("/outdoors");
</script>

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
