<script setup lang="ts">
import type { PitchBidder, PitchCard } from "@/lib/pitch/classes";
import { ref } from "vue";
import { closeDialog } from "vue3-promise-dialog";
import PitchHandWrapperVue from "@/components/pitch/PitchHandWrapper.vue";
import { tKeys } from "@/lib/constants";

/* props */
const props = defineProps<{
  bidder: PitchBidder;
}>();
/* refs */
const cardIndex = ref(0);

function select(card: PitchCard, index: number) {
  cardIndex.value = index;
  closeDialog(card);
}

function returnValue() {
  if (cardIndex.value < props.bidder.hand.length) {
    return props.bidder.hand[cardIndex.value];
  } else {
    return undefined;
  }
}
</script>

<template>
  <PitchHandWrapperVue
    :bidder="bidder"
    @select-card-index="select"
    @close="closeDialog(returnValue())"
  >
    <template #default>
      <div class="level">
        <p>{{ $t(tKeys.message_play_for, [bidder.name]) }}</p>
        <!-- <button class="level-item button">{{t(textKeys.label_play)}}</button> -->
      </div>
      <div class="block"></div>
    </template>
  </PitchHandWrapperVue>
</template>
