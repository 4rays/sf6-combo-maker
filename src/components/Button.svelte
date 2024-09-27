<script>
  export let buttonText = "Undo";
  export let onClickAction;
  export let disableActions;
  export let shortcut;
</script>

<button
  type="button"
  class="text-yellow-200 relative backdrop-blur-xl enabled:hover:border-opacity-90 border-opacity-30 rounded-md p-2 border flex-grow bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0))] border-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  on:click={onClickAction}
  disabled={disableActions}
>
  {buttonText} <span class="opacity-30">({shortcut})</span>
</button>
