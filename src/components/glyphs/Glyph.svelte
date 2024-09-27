<script>
  import Direction1 from "./Direction1.svelte";
  import Direction2 from "./Direction2.svelte";
  import Direction3 from "./Direction3.svelte";
  import Direction4 from "./Direction4.svelte";
  import Direction5 from "./Direction5.svelte";
  import Direction6 from "./Direction6.svelte";
  import Direction7 from "./Direction7.svelte";
  import Direction8 from "./Direction8.svelte";
  import Direction9 from "./Direction9.svelte";
  import HeavyKick from "./HeavyKick.svelte";
  import HeavyPunch from "./HeavyPunch.svelte";
  import Kick from "./Kick.svelte";
  import LightKick from "./LightKick.svelte";
  import LightPunch from "./LightPunch.svelte";
  import MediumKick from "./MediumKick.svelte";
  import MediumPunch from "./MediumPunch.svelte";
  import ModifierHold from "./ModifierHold.svelte";
  import ModifierOr from "./ModifierOr.svelte";
  import ModifierPlus from "./ModifierPlus.svelte";
  import ModifierThen from "./ModifierThen.svelte";
  import Punch from "./Punch.svelte";
  import { Glyph } from "@lib/types";
  import QuarterCircleBack from "./QuarterCircleBack.svelte";
  import QuarterCircleForward from "./QuarterCircleForward.svelte";
  import DragonPunch from "./DragonPunch.svelte";
  import HalfCircleBack from "./HalfCircleBack.svelte";
  import HalfCircleForward from "./HalfCircleForward.svelte";
  import ThreeSixty from "./ThreeSixty.svelte";
  import AnyDirection from "./AnyDirection.svelte";
  import DriveImpact from "./DriveImpact.svelte";
  import DriveRush from "./DriveRush.svelte";
  import { shortCodeForButton } from "@lib/types";

  export let shortCode;
</script>

{#if shortCode === shortCodeForButton(Glyph.downBack)}
  <Direction1 />
{:else if shortCode === shortCodeForButton(Glyph.down)}
  <Direction2 />
{:else if shortCode === shortCodeForButton(Glyph.downForward)}
  <Direction3 />
{:else if shortCode === shortCodeForButton(Glyph.back)}
  <Direction4 />
{:else if shortCode === shortCodeForButton(Glyph.neutral)}
  <Direction5 />
{:else if shortCode === shortCodeForButton(Glyph.forward)}
  <Direction6 />
{:else if shortCode === shortCodeForButton(Glyph.upBack)}
  <Direction7 />
{:else if shortCode === shortCodeForButton(Glyph.up)}
  <Direction8 />
{:else if shortCode === shortCodeForButton(Glyph.upForward)}
  <Direction9 />
{:else if shortCode === shortCodeForButton(Glyph.lightPunch)}
  <LightPunch />
{:else if shortCode === shortCodeForButton(Glyph.mediumPunch)}
  <MediumPunch />
{:else if shortCode === shortCodeForButton(Glyph.heavyPunch)}
  <HeavyPunch />
{:else if shortCode === shortCodeForButton(Glyph.punch)}
  <Punch />
{:else if shortCode === shortCodeForButton(Glyph.lightKick)}
  <LightKick />
{:else if shortCode === shortCodeForButton(Glyph.mediumKick)}
  <MediumKick />
{:else if shortCode === shortCodeForButton(Glyph.heavyKick)}
  <HeavyKick />
{:else if shortCode === shortCodeForButton(Glyph.kick)}
  <Kick />
{:else if shortCode === shortCodeForButton(Glyph.or)}
  <ModifierOr />
{:else if shortCode === shortCodeForButton(Glyph.and)}
  <ModifierPlus />
{:else if shortCode === shortCodeForButton(Glyph.then)}
  <ModifierThen />
{:else if shortCode === shortCodeForButton(Glyph.hold)}
  <ModifierHold />
{:else if shortCode === shortCodeForButton(Glyph.quarterCircleForward)}
  <QuarterCircleForward />
{:else if shortCode === shortCodeForButton(Glyph.quarterCircleBack)}
  <QuarterCircleBack />
{:else if shortCode === shortCodeForButton(Glyph.halfCircleForward)}
  <HalfCircleForward />
{:else if shortCode === shortCodeForButton(Glyph.halfCircleBack)}
  <HalfCircleBack />
{:else if shortCode === shortCodeForButton(Glyph.dragonPunch)}
  <DragonPunch />
{:else if shortCode === shortCodeForButton(Glyph.threeSixty)}
  <ThreeSixty />
{:else if shortCode === shortCodeForButton(Glyph.anyDirection)}
  <AnyDirection />
{:else if shortCode === shortCodeForButton(Glyph.driveImpact)}
  <DriveImpact />
{:else if shortCode === shortCodeForButton(Glyph.driveRush)}
  <DriveRush />
{:else if shortCode === shortCodeForButton(Glyph.link)}
  <div class="text-gray-400 text-4xl">{shortCode}</div>
{:else if shortCode === shortCodeForButton(Glyph.cancel)}
  <div class="text-gray-400 text-4xl">{shortCode}</div>
{:else}
  <div class="text-red-500">Error: Unsupported `{shortCode}`</div>
{/if}
