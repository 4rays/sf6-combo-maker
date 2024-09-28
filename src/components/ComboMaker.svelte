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
  import QuarterCircleForward from "./glyphs/QuarterCircleForward.svelte";
  import QuarterCircleBack from "./glyphs/QuarterCircleBack.svelte";
  import HalfCircleForward from "./glyphs/HalfCircleForward.svelte";
  import HalfCircleBack from "./glyphs/HalfCircleBack.svelte";
  import DragonPunch from "./glyphs/DragonPunch.svelte";
  import ThreeSixty from "./glyphs/ThreeSixty.svelte";
  import DriveImpact from "./glyphs/DriveImpact.svelte";
  import DriveRush from "./glyphs/DriveRush.svelte";
  import AnyDirection from "./glyphs/AnyDirection.svelte";
  import Button from "./Button.svelte";
  import GameButton from "./GameButton.svelte";

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
      case shortCodeForButton(Glyph.downBack):
        add(Glyph.downBack);
        break;
      case shortCodeForButton(Glyph.down):
        add(Glyph.down);
        break;
      case shortCodeForButton(Glyph.downForward):
        add(Glyph.downForward);
        break;
      case shortCodeForButton(Glyph.back):
        add(Glyph.back);
        break;
      case shortCodeForButton(Glyph.neutral):
        add(Glyph.neutral);
        break;
      case shortCodeForButton(Glyph.forward):
        add(Glyph.forward);
        break;
      case shortCodeForButton(Glyph.upBack):
        add(Glyph.upBack);
        break;
      case shortCodeForButton(Glyph.up):
        add(Glyph.up);
        break;
      case shortCodeForButton(Glyph.upForward):
        add(Glyph.upForward);
        break;
      case shortCodeForButton(Glyph.lightPunch):
        add(Glyph.lightPunch);
        break;
      case shortCodeForButton(Glyph.mediumPunch):
        add(Glyph.mediumPunch);
        break;
      case shortCodeForButton(Glyph.heavyPunch):
        add(Glyph.heavyPunch);
        break;
      case shortCodeForButton(Glyph.punch):
        add(Glyph.punch);
        break;
      case shortCodeForButton(Glyph.lightKick):
        add(Glyph.lightKick);
        break;
      case shortCodeForButton(Glyph.mediumKick):
        add(Glyph.mediumKick);
        break;
      case shortCodeForButton(Glyph.heavyKick):
        add(Glyph.heavyKick);
        break;
      case shortCodeForButton(Glyph.kick):
        add(Glyph.kick);
        break;
      case shortCodeForButton(Glyph.and):
        add(Glyph.and);
        break;
      case shortCodeForButton(Glyph.then):
        add(Glyph.then);
        break;
      case shortCodeForButton(Glyph.or):
        add(Glyph.or);
        break;
      case shortCodeForButton(Glyph.hold):
        add(Glyph.hold);
        break;
      case shortCodeForButton(Glyph.quarterCircleBack):
        add(Glyph.quarterCircleBack);
        break;
      case shortCodeForButton(Glyph.quarterCircleForward):
        add(Glyph.quarterCircleForward);
        break;
      case shortCodeForButton(Glyph.halfCircleBack):
        add(Glyph.halfCircleBack);
        break;
      case shortCodeForButton(Glyph.halfCircleForward):
        add(Glyph.halfCircleForward);
        break;
      case shortCodeForButton(Glyph.dragonPunch):
        add(Glyph.dragonPunch);
        break;
      case shortCodeForButton(Glyph.threeSixty):
        add(Glyph.threeSixty);
        break;
      case shortCodeForButton(Glyph.driveImpact):
        add(Glyph.driveImpact);
        break;
      case shortCodeForButton(Glyph.driveRush):
        add(Glyph.driveRush);
        break;
      case shortCodeForButton(Glyph.anyDirection):
        add(Glyph.anyDirection);
        break;
      case shortCodeForButton(Glyph.link):
        add(Glyph.link);
        break;
      case shortCodeForButton(Glyph.cancel):
        add(Glyph.cancel);
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

<div class="flex gap-2 mt-2 justify-evenly">
  <div class="flex flex-1">
    <Button
      buttonText="Undo"
      onClickAction={undo}
      {disableActions}
      shortcut="Z"
    />
  </div>
  <div class="flex flex-1">
    <Button
      buttonText="Reset"
      onClickAction={clearAll}
      {disableActions}
      shortcut="X"
    />
  </div>
</div>

<div
  id="buttons"
  class="flex my-8 justify-around gap-5 flex-wrap p-4 backdrop-blur-xl rounded-lg"
>
  <!-- Left -->
  <div class="grid grid-cols-3 grid-rows-3 gap-4">
    <GameButton
      key="7"
      onClickAction={() => add(Glyph.upBack)}
      title="Up-Back | 後ろジャンプ"
    >
      <Direction7 />
    </GameButton>
    <GameButton
      key="8"
      onClickAction={() => add(Glyph.up)}
      title="Up | ジャンプ"
    >
      <Direction8 />
    </GameButton>
    <GameButton
      key="9"
      onClickAction={() => add(Glyph.upForward)}
      title="Up-Forward | 前ジャンプ"
    >
      <Direction9 />
    </GameButton>
    <GameButton
      key="4"
      onClickAction={() => add(Glyph.back)}
      title="Back | 後ろ"
    >
      <Direction4 />
    </GameButton>
    <GameButton
      key="5"
      onClickAction={() => add(Glyph.neutral)}
      title="Neutral | 立ち"
    >
      <Direction5 />
    </GameButton>
    <GameButton
      key="6"
      onClickAction={() => add(Glyph.forward)}
      title="Forward | 前"
    >
      <Direction6 />
    </GameButton>
    <GameButton
      key="1"
      onClickAction={() => add(Glyph.downBack)}
      title="Down-Back | 後ろしゃがみ"
    >
      <Direction1 />
    </GameButton>
    <GameButton
      key="2"
      onClickAction={() => add(Glyph.down)}
      title="Down | しゃがみ"
    >
      <Direction2 />
    </GameButton>
    <GameButton
      key="3"
      onClickAction={() => add(Glyph.downForward)}
      title="Down-Forward | 前しゃがみ"
    >
      <Direction3 />
    </GameButton>
  </div>
  <!-- Middle -->
  <div class="grid grid-cols-3 grid-rows-4 sm:grid-cols-4 sm:grid-rows-3 gap-4">
    <GameButton
      key="Q"
      onClickAction={() => add(Glyph.lightPunch)}
      title="Light Punch | 弱パンチ"
    >
      <LightPunch />
    </GameButton>
    <GameButton
      key="W"
      onClickAction={() => add(Glyph.mediumPunch)}
      title="Medium Punch | 中パンチ"
    >
      <MediumPunch />
    </GameButton>
    <GameButton
      key="E"
      onClickAction={() => add(Glyph.heavyPunch)}
      title="Heavy Punch | 強パンチ"
    >
      <HeavyPunch />
    </GameButton>
    <GameButton
      key="P"
      onClickAction={() => add(Glyph.punch)}
      title="Any Punch | パンチ"
    >
      <Punch />
    </GameButton>
    <GameButton
      key="A"
      onClickAction={() => add(Glyph.lightKick)}
      title="Light Kick | 弱キック"
    >
      <LightKick />
    </GameButton>
    <GameButton
      key="S"
      onClickAction={() => add(Glyph.mediumKick)}
      title="Medium Kick | 中キック"
    >
      <MediumKick />
    </GameButton>
    <GameButton
      key="D"
      onClickAction={() => add(Glyph.heavyKick)}
      title="Heavy Kick | 強キック"
    >
      <HeavyKick />
    </GameButton>
    <GameButton
      key="K"
      onClickAction={() => add(Glyph.kick)}
      title="Any Kick | キック"
    >
      <Kick />
    </GameButton>
    <div class="flex items-center justify-center">
      <GameButton
        key="+"
        onClickAction={() => add(Glyph.and)}
        includeBackground={true}
        title="Simultaneous | 同時入力"
      >
        <ModifierPlus />
      </GameButton>
    </div>
    <div class="flex items-center justify-center">
      <GameButton
        key=">"
        onClickAction={() => add(Glyph.then)}
        includeBackground={true}
        title="Sequential | 連続入力"
      >
        <ModifierThen />
      </GameButton>
    </div>
    <div class="flex items-center justify-center">
      <GameButton
        key="H"
        onClickAction={() => add(Glyph.hold)}
        includeBackground={true}
        title="Hold | チャージ"
      >
        <ModifierHold />
      </GameButton>
    </div>
    <div class="flex items-center justify-center">
      <GameButton
        key="|"
        onClickAction={() => add(Glyph.or)}
        includeBackground={true}
        title="Alternative | 選択"
      >
        <ModifierOr />
      </GameButton>
    </div>
  </div>
  <!-- Right -->
  <div class="grid grid-cols-3 grid-rows-3 gap-4">
    <GameButton
      key={shortCodeForButton(Glyph.quarterCircleForward).toUpperCase()}
      onClickAction={() => add(Glyph.quarterCircleForward)}
      title="Quarter Circle Forward | 波動拳コマンド"
    >
      <QuarterCircleForward />
    </GameButton>
    <GameButton
      key={shortCodeForButton(Glyph.quarterCircleBack).toUpperCase()}
      onClickAction={() => add(Glyph.quarterCircleBack)}
      title="Quarter Circle Back | 竜巻コマンド"
    >
      <QuarterCircleBack />
    </GameButton>
    <GameButton
      key={shortCodeForButton(Glyph.dragonPunch).toUpperCase()}
      onClickAction={() => add(Glyph.dragonPunch)}
      title="Dragon Punch | 昇竜拳コマンド"
    >
      <DragonPunch />
    </GameButton>
    <GameButton
      key={shortCodeForButton(Glyph.halfCircleForward).toUpperCase()}
      onClickAction={() => add(Glyph.halfCircleForward)}
      title="Half Circle Forward | 半回転前"
    >
      <HalfCircleForward />
    </GameButton>
    <GameButton
      key={shortCodeForButton(Glyph.halfCircleBack).toUpperCase()}
      onClickAction={() => add(Glyph.halfCircleBack)}
      title="Half Circle Back | 半回転後"
    >
      <HalfCircleBack />
    </GameButton>
    <GameButton
      key={shortCodeForButton(Glyph.threeSixty).toUpperCase()}
      onClickAction={() => add(Glyph.threeSixty)}
      title="Three Sixty | 一回転"
    >
      <ThreeSixty />
    </GameButton>
    <GameButton
      key={shortCodeForButton(Glyph.anyDirection).toUpperCase()}
      onClickAction={() => add(Glyph.anyDirection)}
      title="Any Direction | 任意方向"
    >
      <AnyDirection />
    </GameButton>
    <div class="flex items-center justify-center">
      <GameButton
        key={shortCodeForButton(Glyph.driveImpact).toUpperCase()}
        onClickAction={() => add(Glyph.driveImpact)}
        includeBackground={true}
        title="Drive Impact | ドライブインパクト"
      >
        <DriveImpact />
      </GameButton>
    </div>
    <div class="flex items-center justify-center">
      <GameButton
        key={shortCodeForButton(Glyph.driveRush).toUpperCase()}
        onClickAction={() => add(Glyph.driveRush)}
        includeBackground={true}
        title="Drive Rush | ドライブラッシュ"
      >
        <DriveRush />
      </GameButton>
    </div>
  </div>
</div>

<div class="flex gap-2 sm:mt-0 mt-10 flex-col sm:flex-row">
  <div class="flex gap-2 flex-grow">
    <Button
      buttonText="Copy as…"
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

  <div
    class="border-l border-yellow-200 border-opacity-20 mx-2 hidden sm:block"
  ></div>
  <Button
    buttonText="Save as Image"
    onClickAction={copyAsImage}
    {disableActions}
    shortcut="I"
  />
</div>

<div
  aria-live="assertive"
  class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
  <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
    {#if alertText !== ""}
      <div
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-black/50 border border-yellow-200 border-opacity-20 backdrop-blur-xl ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-orange-500"
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
              <p class="text-sm font-medium text-yellow-200">Combo copied!</p>
              <p class="mt-1 text-sm text-stone-400">
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
