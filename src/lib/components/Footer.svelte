<script lang="ts">
  import { base } from "$app/paths";

  import ReadableWidth from "./ReadableWidth.svelte";

  import common from "$data/common.yml";

  /* === Picture of Me === */

  import me1x from "$assets/me.webp";
  import me1_5x from "$assets/me@1_5x.webp";
  import me2x from "$assets/me@2x.webp";

  const meSrcSet = `${me1x}, ${me1_5x} 1.5x, ${me2x} 2x`;
</script>

<footer id="footer" class="px-4 py-8 bg-gray-200 dark:bg-gray-800">
  <ReadableWidth class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-current">
    <div class="flex col-span-2 items-start gap-4">
      <img
        class="w-[120px] aspect-auto rounded-lg"
        srcset={meSrcSet}
        src={me2x}
        alt="Alex LaFroscia and his dog, Rayla"
      />
      <div class="space-y-2 max-w-xs">
        <p class="font-bold">Alex LaFroscia</p>
        <p>{common.bio}</p>
      </div>
    </div>

    <nav class="flex md:justify-center">
      <ol class="space-y-2">
        <li class="font-bold">here</li>

        <li><a href={`${base}/`}>home</a></li>

        <li><a href={`${base}/tech`}>tech</a></li>

        <li><a href={`${base}/outdoors`}>outdoors</a></li>

        <li><a href={`${base}/resume`}>resume</a></li>
      </ol>
    </nav>

    <div class="flex md:justify-center">
      <ol class="space-y-2">
        <li class="font-bold">other places</li>

        <li>
          <a rel="me" href="https://mastodon.social/@alexlafroscia">Mastodon</a>
        </li>

        <li>
          <a rel="me" href="https://github.com/alexlafroscia">GitHub</a>
        </li>

        <li>
          <a href="https://www.alltrails.com/members/alex-lafroscia">AllTrails</a>
        </li>
      </ol>
    </div>
  </ReadableWidth>
</footer>
