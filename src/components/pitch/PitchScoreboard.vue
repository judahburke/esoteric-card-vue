<script setup lang="ts">
import { messageKeys } from "@/lib/constants";
import { usePitchStore } from "@/stores/pitch";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import IconSuitOutline from "../icons/IconSuitOutline.vue";

const { table, rounds, currentScore, currentRound } = storeToRefs(
  usePitchStore()
);

const hideScoresPerRound = ref(true);
const trumpSuit = computed(() => currentRound.value?.trump?.key);
const trumpColor = computed(() => currentRound.value?.trump?.colorKey);
const bidText = computed(() => {
  const bid = currentRound.value?.bid;
  return bid ? `${bid.bid} (${bid.bidder.name})` : "";
});
</script>

<template>
  <div id="pitch-scoreboard" class="columns">
    <div id="pitch-scoreboard-game" class="column">
      <table id="pitch-scoreboard-scores-table" class="table">
        <thead>
          <tr>
            <th>
              {{ $t(messageKeys.label_team) }}
              <!-- todo radio for showing scores per round-->
            </th>
            <td v-for="team in table.teams">{{ team.name }}</td>
          </tr>
        </thead>
        <!-- todo scores per round -->
        <tfoot>
          <tr>
            <th>{{ $t(messageKeys.label_total) }}</th>
            <td v-for="team in table.teams">{{ currentScore(team) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div id="pitch-scoreboard-round" class="column">
      <table id="pitch-scoreboard-round-table" class="table">
        <thead>
          <tr>
            <th>{{ $t(messageKeys.label_trump) }}</th>
            <th>{{ $t(messageKeys.label_bid) }}</th>
            <th>{{ $t(messageKeys.label_round) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <IconSuitOutline
                v-if="trumpSuit && trumpColor"
                :suit="trumpSuit"
                :color="trumpColor"
              />
            </td>
            <td>{{ bidText }}</td>
            <td>{{ rounds.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
