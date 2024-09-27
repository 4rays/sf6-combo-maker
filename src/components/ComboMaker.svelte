<script lang="ts">
  import html2canvas from "html2canvas";
  import { onMount } from "svelte";
  import {
    Glyph,
    shortCodeForButton,
    buttonForShortCode,
    numberNotationForButton,
    letterNotationForButton,
    unicodeNotationForButton,
  } from "@lib/types";
  import type { Combo } from "@lib/types";
  import GlyphComponent from "@components/glyphs/Glyph.svelte";
  import Direction1 from "./glyphs/Direction1.svelte";
  import Direction2 from "./glyphs/Direction2.svelte";
  import Direction3 from "./glyphs/Direction3.svelte";
  import Direction4 from "./glyphs/Direction4.svelte";
  import Direction5 from "./glyphs/Direction5.svelte";
  import Direction6 from "./glyphs/Direction6.svelte";
  import Direction7 from "./glyphs/Direction7.svelte";
  import Direction8 from "./glyphs/Direction8.svelte";
  import Direction9 from "./glyphs/Direction9.svelte";
  import ModifierHold from "./glyphs/ModifierHold.svelte";
  import LightPunch from "./glyphs/LightPunch.svelte";
  import MediumPunch from "./glyphs/MediumPunch.svelte";
  import HeavyPunch from "./glyphs/HeavyPunch.svelte";
  import Punch from "./glyphs/Punch.svelte";
  import LightKick from "./glyphs/LightKick.svelte";
  import MediumKick from "./glyphs/MediumKick.svelte";
  import Kick from "./glyphs/Kick.svelte";
  import HeavyKick from "./glyphs/HeavyKick.svelte";
  import ModifierThen from "./glyphs/ModifierThen.svelte";
  import ModifierOr from "./glyphs/ModifierOr.svelte";
  import ModifierPlus from "./glyphs/ModifierPlus.svelte";
  import Button from "./Button.svelte";
  import Key from "./Key.svelte";

  let textModes = [
    { id: 1, text: `URL` },
    { id: 2, text: `Text (236)` },
    { id: 3, text: `Text (QCF)` },
    { id: 4, text: `Emoji` },
  ];

  let combo: Combo = {
    characterId: 0,
    gameVersion: "1.0.0",
    sequence: [],
  };

  let alertText = "";

  function closeAlert() {
    alertText = "";
  }

  function onKeyDown(e: KeyboardEvent) {
    const caseInsensitiveKey = e.key.toLowerCase();

    switch (caseInsensitiveKey) {
      case "1":
        add(Glyph.downBack);
        break;
      case "2":
        add(Glyph.down);
        break;
      case "3":
        add(Glyph.downForward);
        break;
      case "4":
        add(Glyph.back);
        break;
      case "5":
        add(Glyph.neutral);
        break;
      case "6":
        add(Glyph.forward);
        break;
      case "7":
        add(Glyph.upBack);
        break;
      case "8":
        add(Glyph.up);
        break;
      case "9":
        add(Glyph.upForward);
        break;
      case "q":
        add(Glyph.lightPunch);
        break;
      case "w":
        add(Glyph.mediumPunch);
        break;
      case "e":
        add(Glyph.heavyPunch);
        break;
      case "p":
        add(Glyph.punch);
        break;
      case "a":
        add(Glyph.lightKick);
        break;
      case "s":
        add(Glyph.mediumKick);
        break;
      case "d":
        add(Glyph.heavyKick);
        break;
      case "k":
        add(Glyph.kick);
        break;
      case "+":
        add(Glyph.and);
        break;
      case ">":
        add(Glyph.then);
        break;
      case "|":
        add(Glyph.or);
        break;
      case "h":
        add(Glyph.hold);
        break;
      case "z":
        undo();
        break;
      case "backspace":
        undo();
        break;
      case "x":
        clearAll();
        break;
      case "t":
        copyAsText();
        break;
      case "i":
        copyAsImage();
        break;
    }
  }

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const comboQuery = urlParams.get("combo");
    if (comboQuery) {
      const decodedCombo = urlSafeBase64Decode(comboQuery);
      const sequence = decodedCombo.split("");
      combo.sequence = sequence.map((button) => buttonForShortCode(button));
    }
  });

  $: disableActions = combo.sequence.length === 0;
  let selectedTextMode = 1;

  function add(glyph: Glyph) {
    combo.sequence = [...combo.sequence, glyph];
  }

  function publicUrl(): string {
    const url = new URL(window.location.href);
    const shortCode = combo.sequence.map(shortCodeForButton).join("");
    url.searchParams.set("combo", urlSafeBase64Encode(shortCode));
    return url.toString();
  }

  function urlSafeBase64Encode(str: string): string {
    let encoded = btoa(str);
    return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function urlSafeBase64Decode(encoded: string): string {
    let padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // Add padding back if necessary
    while (padded.length % 4) {
      padded += "=";
    }
    return atob(padded);
  }

  function copyAsText() {
    let text = "";
    switch (selectedTextMode) {
      case 1:
        text = publicUrl();
        break;
      case 2:
        text = combo.sequence
          .map((button) => numberNotationForButton(button))
          .join("");
        break;
      case 3:
        text = combo.sequence
          .map((button) => letterNotationForButton(button))
          .join("");

        text = text
          .replace(/bdbddff/g, "hcf")
          .replace(/fdfddbb/g, "hcb")
          .replace(/ddff/g, "qcf")
          .replace(/ddbb/g, "qcb");
        break;
      case 4:
        text = combo.sequence
          .map((button) => unicodeNotationForButton(button))
          .join("");
        break;
    }

    navigator.clipboard.writeText(text);

    alertText =
      selectedTextMode !== 1
        ? text
        : "A public URL to view this combo has been generated.";

    if (selectedTextMode === 1) {
      history.pushState(null, "", publicUrl());
    }

    setTimeout(() => {
      alertText = "";
    }, 5000);
  }

  function copyAsImage() {
    let combo = document.querySelector("#combo") as HTMLElement;

    html2canvas(combo, {
      backgroundColor: null,
      windowWidth: 300,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "combo.png";
      a.click();
    });
  }

  function undo() {
    if (combo.sequence.length === 0) return;
    combo.sequence = combo.sequence.slice(0, -1);
  }

  function clearAll() {
    combo.sequence = [];
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div
  class="flex flex-wrap items-start content-start gap-2.5 p-4 border border-yellow-200 border-opacity-20 backdrop-blur-xl rounded-lg min-h-60"
  id="combo"
>
  {#if combo.sequence.length === 0}
    <p
      class="mb-10 text-center absolute font-mono text-sm color-red-200 text-yellow-200 opacity-35"
    >
      Add notations using the buttons below…
    </p>
  {/if}
  {#each combo.sequence as button}
    {#if button === Glyph.and}
      <div class="-ml-1.5 -mr-1.5">
        <GlyphComponent shortCode="+" />
      </div>
    {:else}
      <GlyphComponent shortCode={shortCodeForButton(button)} />
    {/if}
  {/each}
</div>

<div
  class="flex my-8 justify-between sm:justify-center sm:gap-10 flex-wrap p-4 backdrop-blur-xl rounded-lg"
>
  <!-- Left -->
  <div class="grid grid-cols-3 grid-rows-3 gap-4 max-w-40 rounded-xl">
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.upBack)}
        class="relative hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction7 />
        <Key key="7" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.up)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction8 />
        <Key key="8" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.upForward)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction9 />
        <Key key="9" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.back)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction4 />
        <Key key="4" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.neutral)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction5 />
        <Key key="5" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.forward)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction6 />
        <Key key="6" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.downBack)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction1 />
        <Key key="1" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.down)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction2 />
        <Key key="2" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.downForward)}
        class="relative hover:opacity-50 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 active:scale-90"
      >
        <Direction3 />
        <Key key="3" />
      </button>
    </div>
  </div>
  <!-- Middle -->
  <div class="grid grid-cols-4 grid-rows-3 gap-2">
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.lightPunch)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <LightPunch />
        <Key key="Q" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.mediumPunch)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <MediumPunch />
        <Key key="W" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.heavyPunch)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <HeavyPunch />
        <Key key="E" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.punch)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <Punch />
        <Key key="P" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.lightKick)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <LightKick />
        <Key key="A" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.mediumKick)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <MediumKick />
        <Key key="S" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.heavyKick)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <HeavyKick />
        <Key key="D" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.kick)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <Kick />
        <Key key="K" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.and)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <ModifierPlus />
        <Key key="+" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.then)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <ModifierThen />
        <Key key=">" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.hold)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <ModifierHold />
        <Key key="H" />
      </button>
    </div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => add(Glyph.or)}
        class="relative rounded-full bg-white/10 shadow-sm hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-90 w-10"
      >
        <ModifierOr />
        <Key key="|" />
      </button>
    </div>
  </div>
  <!-- Right -->
  <div class="grid grid-rows-3 gap-2 flex-grow sm:mt-0 mt-10">
    <div class="flex gap-2">
      <Button
        buttonText="Undo"
        onClickAction={undo}
        {disableActions}
        shortcut="Z"
      />
      <Button
        buttonText="Reset Combo"
        onClickAction={clearAll}
        {disableActions}
        shortcut="X"
      />
    </div>

    <div class="flex gap-2">
      <Button
        buttonText="Copy as"
        onClickAction={copyAsText}
        {disableActions}
        shortcut="T"
      />
      <div>
        <select
          id="location"
          name="location"
          class="text-yellow-200 block w-full h-full bg-transparent rounded-md border-0 ring-1 ring-opacity-30 ring-inset ring-yellow-200 focus:ring-1 focus:ring-yellow-200"
          bind:value={selectedTextMode}
          disabled={disableActions}
        >
          {#each textModes as mode}
            <option value={mode.id} selected={mode.id === selectedTextMode}
              >{mode.text}</option
            >
          {/each}
        </select>
      </div>
    </div>

    <Button
      buttonText="Save as Image"
      onClickAction={copyAsImage}
      {disableActions}
      shortcut="I"
    />
  </div>
</div>

<div
  aria-live="assertive"
  class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
  <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
    {#if alertText !== ""}
      <div
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5 font-mono">
              <p class="text-sm font-medium">Combo copied!</p>
              <p class="mt-1 text-sm text-gray-400">
                {alertText}
              </p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button
                type="button"
                class="inline-flex rounded-md bg-black text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                on:click={closeAlert}
              >
                <span class="sr-only">Close</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
