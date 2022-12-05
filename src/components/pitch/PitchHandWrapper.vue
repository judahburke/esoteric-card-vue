<script setup lang="ts">
import PitchCardVue from "@/components/pitch/PitchCard.vue";
import type { PitchBidder } from "@/lib/pitch/classes";
import { usePitchStore } from "@/stores/pitch";
import { storeToRefs } from "pinia";

/* store */
const { showCards } = storeToRefs(usePitchStore());
/* props */
defineProps<{
  bidder: PitchBidder;
}>();
/* emit */
const emit = defineEmits(["selectCardIndex"]);
</script>

<template>
  <div class="container">
    <div class="content">
      <slot></slot>
    </div>
    <div class="block"></div>
    <div id="pitch-hand-cards" class="content">
      <div class="columns is-multiline is-centered is-mobile">
        <div
          class="column is-narrow"
          v-for="(card, index) in bidder.hand"
          :key="card.rank.key * 100 + card.suit.key"
        >
          <PitchCardVue
            :card="card"
            :show="showCards"
            @click="emit('selectCardIndex', card, index, ...bidder.hand)"
          />
        </div>
        <div class="block"></div>
      </div>
    </div>
  </div>
</template>
