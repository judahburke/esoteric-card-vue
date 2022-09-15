<script setup lang="ts">
import { type Ref, ref, computed, onMounted, watch, resolveComponent } from 'vue';
import { useRouter } from 'vue-router';
import { openDialog } from 'vue3-promise-dialog';
import type { IPitchBid, IPitchPlay, IPitchRoundCalculation, IPitchState } from '@/lib/pitch/interfaces';
import { PitchAIFactory, PitchBidder, PitchCard, PitchCardRank, PitchCardSuit, PitchDealer, PitchTeam } from '@/lib/pitch/classes';
import { usePitchStore } from '@/stores/pitch';
import { DialogWrapper } from 'vue3-promise-dialog';
import type { PitchBidErrorKey, PitchPlayErrorKey } from '@/lib/pitch/types';
import { textKeys } from '@/lib/constants';
import ModalAlertVue from '../ModalAlert.vue';
import ModalBooleanPromptVue from '@/components/ModalBooleanPrompt.vue';
import PitchScoreboardVue from '@/components/pitch/PitchScoreboard.vue';
import PitchTrickVue from '@/components/pitch/PitchTrick.vue';
import PitchFooterVue from '@/components/pitch/PitchFooter.vue';
import PitchBidPromptVue from '@/components/pitch/PitchBidPrompt.vue';
import PitchHandPromptVue from '@/components/pitch/PitchHandPrompt.vue';
import PitchConfigPromptVue from '@/components/pitch/PitchConfigPrompt.vue';
import PitchRoundAlertVue from '@/components/pitch/PitchRoundAlert.vue';
import PitchAlertVue from './PitchAlert.vue';
import { storeToRefs } from 'pinia';

/* router */
const router = useRouter();
/* store */
const store = usePitchStore();
const { currentState } = storeToRefs(store);
/* refs */
const messages: Ref<{text:string, classes:string[]}[]> = ref([]);
const aiFactory = new PitchAIFactory();
const showMove = ref(false);
/* methods */
function writeErrors(texts: string[]): void {
    console.error(texts);
    messages.value.unshift(...texts.map(text => { return {text, classes:['has-text-danger-dark']} } ));
}
function writeMessages(texts: string[]): void {
    console.log(texts);
    messages.value.unshift(...texts.map(text => { return {text, classes:['has-text-success-dark']} } ));
}
function clearMessages() {
    messages.value = [];
}
async function config() {
    await openDialog(PitchConfigPromptVue, { });
}
async function play() {
    const dealer = new PitchDealer();

    try {
        store.initializeState()

        await dealer.playPitch(
            currentState.value,
            alertOfTurn,
            promptForBid,
            promptForPlay,
            alertOfTrickResult,
            alertOfRoundResult,
            alertOfGameResult,
            setState);

        await again();
    } catch (error) {
        console.error(error);
        if (error && (error as Error).message) {
            await openDialog(ModalAlertVue, { 
                titleKey: textKeys.title_error, 
                messageKey: textKeys.message_error_of, 
                messageParams: [(error as Error).message] 
            })
            writeErrors([(error as Error).message]);
        }
    }
}
async function again(): Promise<void> {
    if (await openDialog(ModalBooleanPromptVue, { 
        titleKey: 'Game Over', 
        message: 'Would you like to play again', 
        labelTrue: 'Yes', 
        labelFalse: 'No'
    })) {
        await play();
    } else {
        await exit();
    }
}
async function exit() {
    router.push('/');
}
async function alertOfTurn(state: IPitchState<PitchCardRank,PitchCardSuit,PitchCard,PitchTeam,PitchBidder>, bidder: PitchBidder): Promise<boolean> {
    if (aiFactory.selectIntelligence(bidder.intelligence)) {
        return true;
    } else {
        return await openDialog(ModalAlertVue, { 
            titleKey: textKeys.title_turn_for,
            titleParams: [bidder.name],
            messageKey: textKeys.message_turn_for,
            messageParams: [bidder.name]
         });
    }
}
async function alertOfTrickResult(state: IPitchState<PitchCardRank,PitchCardSuit,PitchCard,PitchTeam,PitchBidder>,
    winningPlay: IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) : Promise<void> {
    console.debug('[components.pitch] PitchGame.alertOfTrickResult', winningPlay)
    await openDialog(PitchAlertVue, { 
        closeKey: textKeys.label_continue,
        messageKey: textKeys.message_trick_winner_for,
        messageParams: [winningPlay.bidder.name] 
    }, 'pitch-notice')
}
async function alertOfRoundResult(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
    calculation: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): Promise<void> {
    console.debug('[components.pitch] PitchGame.alertOfRoundResult', calculation)
    await openDialog(PitchRoundAlertVue, { calculator: state.calculator, calculation, options: state.options }, 'pitch-notice');
}
async function alertOfGameResult(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, winningTeam: PitchTeam) {
    console.debug('[components.pitch] PitchGame.alertOfGameResult', winningTeam)
    await openDialog(PitchAlertVue, {
        closeKey: textKeys.label_continue,
        messageKey: textKeys.message_winner_for,
        messageParams: [winningTeam.name]
     }, 'pitch-notice')
}
async function promptForBid(state: IPitchState<PitchCardRank,PitchCardSuit,PitchCard,PitchTeam,PitchBidder>, bidder: PitchBidder, error?: PitchBidErrorKey): Promise<IPitchBid<PitchCardRank,PitchCardSuit,PitchCard,PitchTeam,PitchBidder>> {
    let intelligence = aiFactory.selectIntelligence(bidder.intelligence);
    if (intelligence) {
        return intelligence.decideBid(bidder, state);
    } else {
        if (error) {
            await openDialog(ModalAlertVue, { titleKey: `${bidder.name}: Invalid Bid`, messageKey: error })
        }
        showMove.value = true;
        const bid = await openDialog(PitchBidPromptVue, { bidder }, 'pitch-hand')
        showMove.value = false;
        return bid;
    }
}
async function promptForPlay(state: IPitchState<PitchCardRank,PitchCardSuit,PitchCard,PitchTeam,PitchBidder>, bidder: PitchBidder, error?: PitchPlayErrorKey): Promise<PitchCard> {
    let intelligence = aiFactory.selectIntelligence(bidder.intelligence);
    if (intelligence) {
        return intelligence.decidePlay(bidder, state);
    } else {
        if (error) {
            await openDialog(ModalAlertVue, { titleKey: `${bidder.name}: Invalid Play`, messageKey: error })
        }
        showMove.value = true;
        return await openDialog(PitchHandPromptVue, { bidder }, 'pitch-hand')
            .then((card: PitchCard) => { showMove.value = false; return card; });
    }
}
async function setState(state: IPitchState<PitchCardRank,PitchCardSuit,PitchCard,PitchTeam,PitchBidder>, message?: string) {
    if (message) { writeMessages([message]); }
    store.setPitchState(state);
} 
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

onMounted(() => config())
</script>

<template>
    <div id="pitch-game" class="container">
        <header id="pitch-game-scoreboard" class="section box">
            <PitchScoreboardVue></PitchScoreboardVue>
        </header>
        <section id="pitch-game-trick" class="section box">
            <PitchTrickVue></PitchTrickVue>
            <DialogWrapper name="pitch-notice" :transition-attrs="{name: 'pitch-hand'}"></DialogWrapper>
        </section>
        <section id="pitch-game-move" :class="showMove ? ['section','box'] : ['hidden']">
            <DialogWrapper name="pitch-hand" :transition-attrs="{name: 'pitch-hand'}"></DialogWrapper>
        </section>
        <footer id="pitch-game-messages" class="">
            <PitchFooterVue :messages="messages" @play="play()" @clear="clearMessages()" @config="config()" @exit="exit()"></PitchFooterVue>
        </footer>
    </div>
</template>

<style>

</style>