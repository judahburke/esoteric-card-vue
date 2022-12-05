<script setup lang="ts">
import { CardError } from "@/lib/card/classes";
import type {
  IPitchBid,
  IPitchPlay,
  IPitchRoundCalculation,
  IPitchState,
} from "@/lib/pitch/interfaces";
import {
  PitchAIFactory,
  PitchBidder,
  PitchCard,
  PitchCardRank,
  PitchCardSuit,
  PitchDealer,
  PitchTeam,
  PitchError,
} from "@/lib/pitch/classes";
import type {
  PitchBidValidation,
  PitchPlayValidation,
} from "@/lib/pitch/enums";
import { tKeys } from "@/lib/constants";
import ModalAlertVue from "@/components/ModalAlert.vue";
import ModalBooleanPromptVue from "@/components/ModalBooleanPrompt.vue";
import PitchScoreboardVue from "@/components/pitch/PitchScoreboard.vue";
import PitchTrickVue from "@/components/pitch/PitchTrick.vue";
import PitchFooterVue from "@/components/pitch/PitchFooter.vue";
import PitchBidPromptVue from "@/components/pitch/PitchBidPrompt.vue";
import PitchHandPromptVue from "@/components/pitch/PitchHandPrompt.vue";
import PitchConfigPromptVue from "@/components/pitch/PitchConfigPrompt.vue";
import PitchRoundAlertVue from "@/components/pitch/PitchRoundAlert.vue";
import PitchAlertVue from "@/components/pitch/PitchAlert.vue";
import { usePitchStore } from "@/stores/pitch";
import { type Ref, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { openDialog } from "vue3-promise-dialog";
import { DialogWrapper } from "vue3-promise-dialog";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

/* router */
const router = useRouter();
/* store */
const store = usePitchStore();
const { currentState } = storeToRefs(store);
/* refs */
const messages: Ref<{ text: string; classes: string[] }[]> = ref([]);
const aiFactory = new PitchAIFactory();
const showMove = ref(false);
/* methods */
function writeErrors(texts: string[]): void {
  console.error(texts);
  messages.value.unshift(
    ...texts.map((text) => {
      return { text, classes: ["has-text-danger-dark"] };
    })
  );
}
function writeMessages(texts: string[]): void {
  console.log(texts);
  messages.value.unshift(
    ...texts.map((text) => {
      return { text, classes: ["has-text-success-dark"] };
    })
  );
}
function clearMessages() {
  messages.value = [];
}
async function config() {
  await openDialog(PitchConfigPromptVue, {});
}
async function play() {
  const dealer = new PitchDealer();

  try {
    store.initializeState();

    await dealer.playPitch(
      currentState.value,
      alertOfTurn,
      promptForBid,
      promptForPlay,
      alertOfTrickResult,
      alertOfRoundResult,
      alertOfGameResult,
      setState
    );

    await again();
  } catch (error) {
    console.error(error);
    if (error) {
      let messageParam = (error as Error).message ?? t(tKeys.errors.NA_500);
      if (error instanceof PitchError) {
        let k = (error as PitchError).errorKey;
        messageParam = t(tKeys.mapPitchError(k), [k]);
      } else if (error instanceof CardError) {
        let k = (error as CardError).errorKey;
        messageParam = t(tKeys.mapCardError(k), [k]);
      }
      await openDialog(ModalAlertVue, {
        titleKey: tKeys.title_error,
        messageKey: tKeys.message_error_of,
        messageParams: [messageParam],
      });
      writeErrors([messageParam]);
    }
  }
}
async function again(): Promise<void> {
  if (
    await openDialog(ModalBooleanPromptVue, {
      titleKey: tKeys.title_game_over,
      message: tKeys.message_play_again,
      labelTrue: tKeys.label_yes,
      labelFalse: tKeys.label_no,
    })
  ) {
    await play();
  } else {
    await exit();
  }
}
async function exit() {
  router.push("/");
}
async function alertOfTurn(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  bidder: PitchBidder
): Promise<boolean> {
  if (aiFactory.selectIntelligence(bidder.intelligence)) {
    return true;
  } else {
    return await openDialog(ModalAlertVue, {
      titleKey: tKeys.title_turn_for,
      titleParams: [bidder.name],
      messageKey: tKeys.message_turn_for,
      messageParams: [bidder.name],
    });
  }
}
async function alertOfTrickResult(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  winningPlay: IPitchPlay<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >
): Promise<void> {
  console.debug("[components.pitch] PitchGame.alertOfTrickResult", winningPlay);
  await openDialog(
    PitchAlertVue,
    {
      closeKey: tKeys.label_continue,
      messageKey: tKeys.message_trick_winner_for,
      messageParams: [winningPlay.bidder.name],
    },
    "pitch-notice"
  );
}
async function alertOfRoundResult(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  calculation: IPitchRoundCalculation<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >
): Promise<void> {
  console.debug("[components.pitch] PitchGame.alertOfRoundResult", calculation);
  await openDialog(
    PitchRoundAlertVue,
    { calculator: state.calculator, calculation, options: state.options },
    "pitch-notice"
  );
}
async function alertOfGameResult(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  winningTeam: PitchTeam
) {
  console.debug("[components.pitch] PitchGame.alertOfGameResult", winningTeam);
  await openDialog(
    PitchAlertVue,
    {
      closeKey: tKeys.label_continue,
      messageKey: tKeys.message_winner_for,
      messageParams: [winningTeam.name],
    },
    "pitch-notice"
  );
}
async function promptForBid(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  bidder: PitchBidder,
  validation?: PitchBidValidation
): Promise<
  IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
> {
  let intelligence = aiFactory.selectIntelligence(bidder.intelligence);
  if (intelligence) {
    return intelligence.decideBid(bidder, state);
  } else {
    if (validation) {
      await openDialog(ModalAlertVue, {
        titleKey: tKeys.pitch.title_invalid_bid_for,
        messageKey: tKeys.mapPitchBidVal(validation),
      });
    }
    showMove.value = true;
    const bid = await openDialog(PitchBidPromptVue, { bidder }, "pitch-hand");
    showMove.value = false;
    return bid;
  }
}
async function promptForPlay(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  bidder: PitchBidder,
  validation?: PitchPlayValidation
): Promise<PitchCard> {
  let intelligence = aiFactory.selectIntelligence(bidder.intelligence);
  if (intelligence) {
    return intelligence.decidePlay(bidder, state);
  } else {
    if (validation) {
      await openDialog(ModalAlertVue, {
        titleKey: tKeys.pitch.title_invalid_play_for,
        messageKey: tKeys.mapPitchPlayVal(validation),
      });
    }
    showMove.value = true;
    return await openDialog(PitchHandPromptVue, { bidder }, "pitch-hand").then(
      (card: PitchCard) => {
        showMove.value = false;
        return card;
      }
    );
  }
}
async function setState(
  state: IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >,
  message?: string
) {
  if (message) {
    writeMessages([message]);
  }
  store.setPitchState(state);
}
// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

onMounted(() => config());
</script>

<template>
  <div id="pitch-game" class="container">
    <header id="pitch-game-scoreboard" class="section box">
      <PitchScoreboardVue></PitchScoreboardVue>
    </header>
    <section id="pitch-game-trick" class="section box">
      <PitchTrickVue></PitchTrickVue>
      <DialogWrapper
        name="pitch-notice"
        :transition-attrs="{ name: 'pitch-hand' }"
      ></DialogWrapper>
    </section>
    <section
      id="pitch-game-move"
      :class="showMove ? ['section', 'box'] : ['hidden']"
    >
      <DialogWrapper
        name="pitch-hand"
        :transition-attrs="{ name: 'pitch-hand' }"
      ></DialogWrapper>
    </section>
    <footer id="pitch-game-messages" class="">
      <PitchFooterVue
        :messages="messages"
        @play="play()"
        @clear="clearMessages()"
        @config="config()"
        @exit="exit()"
      ></PitchFooterVue>
    </footer>
  </div>
</template>

<style></style>
