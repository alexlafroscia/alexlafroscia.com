<script lang="ts">
  export let tag: keyof HTMLElementTagNameMap = "div";

  let className = "";

  export { className as class };
</script>

<svelte:element this={tag} class="w-readable max-w-full mx-auto {className}">
  <slot />
</svelte:element>
