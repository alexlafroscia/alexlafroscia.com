<script lang="ts">
  import { base } from "$app/paths";

  export let hidden = false;
</script>

<nav
  id="sidebar"
  class:hidden
  class="relative flex flex-col min-w-[250px] bg-gray-200 dark:bg-gray-800"
>
  <div class="sticky top-0 p-8">
    <h1 class="bold text-lg mb-4 sm:mt-4 sm:mb-8">Menu</h1>

    <ol class="space-y-4">
      <li><a href={`${base}/`}>home</a></li>

      <li><a href={`${base}/tech`}>tech</a></li>

      <li><a href={`${base}/outdoors`}>outdoors</a></li>

      <li><a href={`${base}/resume`}>resume</a></li>
    </ol>

    <hr class="border-current my-8" />

    <ol class="space-y-4">
      <li>
        <a rel="me" href="https://mastodon.social/@alexlafroscia">Mastodon</a>
      </li>

      <li>
        <a href="https://github.com/alexlafroscia">GitHub</a>
      </li>

      <li>
        <a href="https://www.alltrails.com/members/alex-lafroscia">AllTrails</a>
      </li>
    </ol>
  </div>
</nav>
