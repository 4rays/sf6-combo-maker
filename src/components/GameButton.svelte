<script>
  export let onClickAction;
  export let key;
  export let includeBackground = false;
  export let title;

  import Key from "./Key.svelte";
</script>

<button
  on:click={onClickAction}
  class="relative rounded-full shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90"
  {title}
>
  {#if includeBackground}
    <div
      class="absolute inset-0 rounded-full bg-white/10 aspect-square max-w-10"
    />
  {/if}
  <slot />
  <Key {key} />
</button>
