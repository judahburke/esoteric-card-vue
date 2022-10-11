<script setup lang="ts">
import { computed, ref } from "vue";
import { messageKeys } from "@/lib/constants";
import { usePitchStore } from "@/stores/pitch";
import ModalCardVue from "@/components/ModalCard.vue";
import { closeDialog } from "vue3-promise-dialog";
import { storeToRefs } from "pinia";
import { PitchIntelligence } from "@/lib/pitch/enums";

/* store */
const store = usePitchStore();
const {
  currentState,
  validBidderCounts,
  validTeamCounts,
  validShuffleCounts,
  validCutCounts,
  validIntelligences,
  validWinningScores,
} = storeToRefs(store);
/* ref */
const active = ref(true);
/* computed */
const isVerbosityEnabled = computed({
  get() {
    return currentState.value.options.verbose;
  },
  set(val) {
    store.setOptionVerbosity(val);
  },
});
const winningScore = computed({
  get() {
    return currentState.value.options.winningScore;
  },
  set(val) {
    store.setOptionWinningScore(val);
  },
});
const bidderCount = computed({
  get() {
    return currentState.value.options.bidderCount;
  },
  set(val) {
    store.setOptionBidderCount(val);
  },
});
const teamCount = computed({
  get() {
    return currentState.value.options.teamCount;
  },
  set(val) {
    store.setOptionTeamCount(val);
  },
});
const teamConfigs = computed({
  get() {
    return store.teamConfigs;
  },
  set(val) {
    store.setTeamConfigs(val);
  },
});
const bidderConfigs = computed({
  get() {
    return store.bidderConfigs;
  },
  set(val) {
    store.setBidderConfigs(val);
  },
});
const isBidFiveEnabled = computed({
  get() {
    return currentState.value.options.isBidFiveEnabled;
  },
  set(val) {
    store.setOptionBidFive(val);
  },
});
const isBidNoneEnabled = computed({
  get() {
    return currentState.value.options.isBidNoneEnabled;
  },
  set(val) {
    store.setOptionBidNone(val);
  },
});
const isAllowTrumpAlwaysEnabled = computed({
  get() {
    return currentState.value.options.isAllowTrumpWhenCanFollowSuitEnabled;
  },
  set(val) {
    store.setOptionAllowTrumpWhenCanFollowSuit(val);
  },
});
const isScoreTiedGamePointsEnabled = computed({
  get() {
    return currentState.value.options.isScoreTiedGamePointsEnabled;
  },
  set(val) {
    store.setOptionScoreTiedGamePionts(val);
  },
});
const shuffleCount = computed({
  get() {
    return currentState.value.options.shuffle.shuffleCount;
  },
  set(val) {
    store.setOptionShuffleCount(val);
  },
});
const cutMinimum = computed({
  get() {
    return currentState.value.options.cut.cutMinimum;
  },
  set(val) {
    store.setOptionCutMin(val);
  },
});
/* methods */
function setTeamName(i: number, name: string) {
  if (i < teamConfigs.value.length) {
    store.setTeamConfigName(name, i);
  }
}
function setBidderName(i: number, name: string) {
  if (i < bidderConfigs.value.length) {
    store.setBidderConfigName(name, i);
  }
}
function setBidderIntelligence(i: number, intelligence: PitchIntelligence) {
  if (i < bidderConfigs.value.length) {
    store.setBidderConfigIntelligence(intelligence, i);
  }
}
function getIntelligenceKey(intelligence: PitchIntelligence): string {
  switch (intelligence) {
    case PitchIntelligence.ARTIFICIAL:
      return messageKeys.label_artificial;
    case PitchIntelligence.HUMAN:
      return messageKeys.label_human;
  }
}
function exit() {
  closeDialog(returnValue());
}
function returnValue(): boolean {
  return true;
}
</script>

<template>
  <ModalCardVue
    :title-key="messageKeys.pitch.title_configuration"
    :active="true"
    @close="exit"
  >
    <template #default>
      <section
        id="state-table-bidders"
        :class="bidderCount > 0 ? 'section box' : 'is-hidden'"
      >
        <h3 class="subtitle">
          {{ $t(messageKeys.pitch.subtitle_configuration_bidders) }}
        </h3>
        <div
          class="columns is-mobile"
          v-for="(bidder, index) in bidderConfigs.filter(
            (_, i) => i < bidderCount
          )"
          :key="bidder.name"
        >
          <div class="column">
            <input
              class="input is-small"
              id="state-table-bidder-name"
              type="text"
              :value="bidder.name"
              @change="e => setBidderName(index, (e.target as HTMLInputElement).value)"
            />
          </div>
          <div class="column is-one-fourth">
            <div class="select is-small">
              <select
                id="state-table-bidder-intelligence"
                v-model="bidder.intelligence"
                @update:modelValue="(e:PitchIntelligence) => setBidderIntelligence(index, e)"
              >
                <option
                  v-for="o in validIntelligences"
                  :selected="o === bidder.intelligence"
                  :value="o"
                >
                  {{ $t(getIntelligenceKey(o)) }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section
        id="state-table-teams"
        :class="teamCount > 0 ? 'section box' : 'is-hidden'"
      >
        <h3 class="subtitle">
          {{ $t(messageKeys.pitch.subtitle_configuration_teams) }}
        </h3>
        <div
          class="columns"
          v-for="(team, index) in teamConfigs.filter((_, i) => i < teamCount)"
          :key="team.name"
        >
          <input
            class="input is-small"
            id="state-table-team-name"
            type="text"
            :value="team.name"
            @change="(event) => setTeamName(index, (event?.target as HTMLInputElement)?.value)"
          />
        </div>
      </section>
      <section id="state-options" class="section box">
        <h3 class="subtitle">
          {{ $t(messageKeys.pitch.subtitle_configuration_options) }}
        </h3>
        <!-- verbosity <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_verbose) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-verbose" v-model="isVerbosityEnabled">
                <option
                  v-for="o in [true, false]"
                  :selected="o === isVerbosityEnabled"
                  :value="o"
                >
                  {{ $t(o ? messageKeys.label_enabled : messageKeys.label_disabled) }}
                </option>
              </select>
            </div>
          </div>
        </div> -->
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_winning_score) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-winning-score" v-model="winningScore">
                <option
                  v-for="o in validWinningScores"
                  :selected="o === winningScore"
                  :value="o"
                >
                  {{ o }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_player_count) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-bidder-count" v-model="bidderCount">
                <option
                  v-for="o in validBidderCounts"
                  :selected="o === bidderCount"
                  :value="o"
                >
                  {{ o }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_team_count) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-team-count" v-model="teamCount">
                <option
                  v-for="o in validTeamCounts"
                  :selected="o === teamCount"
                  :value="o"
                >
                  {{ o }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_bid_5) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-enable-bid5" v-model="isBidFiveEnabled">
                <option
                  v-for="o in [true, false]"
                  :selected="o === isBidFiveEnabled"
                  :value="o"
                >
                  {{ $t(o ? messageKeys.label_enabled : messageKeys.label_disabled) }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_bid_all_skip) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select
                id="state-options-enable-bid-all-skip"
                v-model="isBidNoneEnabled"
              >
                <option
                  v-for="o in [true, false]"
                  :selected="o === isBidNoneEnabled"
                  :value="o"
                >
                  {{ $t(o ? messageKeys.label_enabled : messageKeys.label_disabled) }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{
              $t(messageKeys.label_option_play_trump_despite_lead)
            }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select
                id="state-options-enable-trump-over-lead"
                v-model="isAllowTrumpAlwaysEnabled"
              >
                <option
                  v-for="o in [true, false]"
                  :selected="o === isAllowTrumpAlwaysEnabled"
                  :value="o"
                >
                  {{ $t(o ? messageKeys.label_enabled : messageKeys.label_disabled) }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_score_tied_game) }}</label>
          </div>
          <div class="tile is-child">
            <div class="select is-small">
              <select
                id="state-options-enable-score-tied-game"
                v-model="isScoreTiedGamePointsEnabled"
              >
                <option
                  v-for="o in [true, false]"
                  :selected="o === isScoreTiedGamePointsEnabled"
                  :value="o"
                >
                  {{ $t(o ? messageKeys.label_enabled : messageKeys.label_disabled) }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_shuffle_count) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-shuffle-count" v-model="shuffleCount">
                <option
                  v-for="o in validShuffleCounts"
                  :selected="o === shuffleCount"
                  :value="o"
                >
                  {{ o }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!-- cut count <div class="tile is-parent is-12">
          <div class="tile is-child is-6">
            <label>{{ $t(messageKeys.label_option_cut_count_min) }}</label>
          </div>
          <div class="tile is-child container">
            <div class="select is-small">
              <select id="state-options-cut-min" v-model="cutMinimum">
                <option
                  v-for="o in validCutCounts"
                  :selected="o === cutMinimum"
                  :value="o"
                >
                  {{ o }}
                </option>
              </select>
            </div>
          </div>
        </div> -->
      </section>
    </template>

    <template #footer>
      <button class="button" type="submit" @click="exit">
        {{ $t(messageKeys.label_exit_configuration) }}
      </button>
    </template>
  </ModalCardVue>
</template>
