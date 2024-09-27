<script>
  export let onClickAction;
  export let key;
  export let includeBackground = false;

  import Key from "./Key.svelte";
</script>

<button
  on:click={onClickAction}
  class="relative rounded-full shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10 {includeBackground
    ? 'bg-white/10'
    : ''}"
>
  <slot />
  <Key {key} />
</button>
