<script setup lang="ts">
import type {
  PitchBidder,
  PitchCard,
  PitchCardRank,
  PitchCardSuit,
  PitchTeam,
} from "@/lib/pitch/classes";
import type { IPitchBid } from "@/lib/pitch/interfaces";
import { tKeys } from "@/lib/constants";
import { usePitchStore } from "@/stores/pitch";
import { computed, ref } from "vue";
import { closeDialog } from "vue3-promise-dialog";
import PitchHandWrapperVue from "@/components/pitch/PitchHandWrapper.vue";
import { storeToRefs } from "pinia";

/* props */
const props = defineProps<{
  bidder: PitchBidder;
}>();
/* store */
const { currentState, currentRound } = storeToRefs(usePitchStore());
/* refs */
const bid = ref(0);
const active = ref(true);
/* computed */
const skippable = computed(() => {
  // can always bid none
  return (
    currentState.value.options.isBidNoneEnabled ||
    // there is an existing bid
    currentRound.value?.bid ||
    // or is not the last player
    currentState.value.table.last.compare(props.bidder) !== 0
  );
});
const validBids = computed(() => {
  const bid = currentRound.value?.bid;
  return [
    {
      bid: 2,
      enabled: !bid || bid.bid < 2,
    },
    {
      bid: 3,
      enabled: !bid || bid.bid < 3,
    },
    {
      bid: 4,
      enabled: !bid || bid.bid < 4,
    },
    {
      bid: 5,
      enabled:
        currentState.value.options.isBidFiveEnabled && (!bid || bid.bid < 5),
    },
  ];
});

function returnValue(): IPitchBid<
  PitchCardRank,
  PitchCardSuit,
  PitchCard,
  PitchTeam,
  PitchBidder
> {
  active.value = false;
  return { bidder: props.bidder, bid: bid.value, skip: false };
}
function placeBid(): void {
  active.value = false;
  closeDialog(returnValue());
}
function skipBid(): void {
  active.value = false;
  closeDialog({ bidder: props.bidder, bid: 0, skip: true });
}
</script>

<template>
  <PitchHandWrapperVue :bidder="bidder">
    <template #default>
      <div class="container">
        <section id="pitch-bid-bid" class="content">
          {{ $t(tKeys.message_bid_for, [bidder.name]) }}
          <div class="select">
            <select v-model="bid">
              <option
                v-for="o in validBids"
                :disabled="!o.enabled"
                :selected="o.bid === bid"
                :value="o.bid"
                :key="o.bid"
              >
                {{ o.bid }}
              </option>
            </select>
          </div>
        </section>
        <section id="pitch-bid-submit" class="content level is-mobile">
          <button class="level-item button is-success" @click="placeBid()">
            {{ $t(tKeys.label_bid_submit) }}
          </button>
          <button
            class="level-item button"
            :disabled="!skippable"
            @click="skipBid()"
          >
            {{ $t(tKeys.label_bid_skip) }}
          </button>
        </section>
      </div>
    </template>

    <template #footer> </template>
  </PitchHandWrapperVue>
</template>
