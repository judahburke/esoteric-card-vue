<script setup lang="ts">
import { messageKeys } from "@/lib/constants";
import type { PitchCard } from "@/lib/pitch/classes";
import IconSuitSolid from "../icons/IconSuitSolid.vue";

/* props */
const props = defineProps<{
  card: PitchCard;
  show: boolean;
}>();
</script>

<template>
  <div
    id="pitch-card"
    :class="[
      'card',
      'box',
      'is-hoverable',
      'playing-card',
      show ? 'face-up' : 'face-down',
    ]"
  >
    <span v-if="show" class="playing-card-face is-nw">{{
      $t(messageKeys.mapCardRank(card.rank.key))
    }}</span>
    <span v-if="show" class="playing-card-face is-ne"
      ><IconSuitSolid :suit="card.suit.key" :color="card.suit.colorKey"
    /></span>
    <span v-if="show" class="playing-card-face is-sw"
      ><IconSuitSolid :suit="card.suit.key" :color="card.suit.colorKey"
    /></span>
    <span v-if="show" class="playing-card-face is-se">{{
      $t(messageKeys.mapCardRank(card.rank.key))
    }}</span>
  </div>
</template>

<style scoped>
#pitch-card:hover {
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 50%),
    0 0 0 1px rgb(10 10 10 / 10%);
}

.playing-card {
  min-width: 4em;
  min-height: 6em;
  display: inline-block;
  position: relative;
}

.playing-card.face-up {
  background-color: white;
}
.playing-card.face-down {
  background-color: skyblue;
}
.playing-card-face {
  position: absolute;
}
.playing-card-face.is-black {
  color: black;
}
.playing-card-face.is-red {
  color: maroon;
}
.playing-card-face.is-ne {
  top: 0.25em;
  right: 0.25em;
}
.playing-card-face.is-nw {
  top: 0.25em;
  left: 0.75em;
}
.playing-card-face.is-se {
  bottom: 0.5em;
  right: 0.75em;
}
.playing-card-face.is-sw {
  bottom: 0.25em;
  left: 0.25em;
}
</style>
