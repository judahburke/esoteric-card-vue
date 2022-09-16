<script setup lang="ts">
import { textKeys } from '@/lib/constants'
import type { PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder } from "@/lib/pitch/classes";
import type { IPitchCalculator, IPitchRoundCalculation } from "@/lib/pitch/interfaces";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { closeDialog } from "vue3-promise-dialog";
import ModalCardVue from "../ModalCard.vue";
import { useI18n } from 'vue-i18n';
import type { PitchOptions } from '@/lib/pitch/types';

const { t } = useI18n();

const props = defineProps<{
    calculator: IPitchCalculator<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
    calculation: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
    options: PitchOptions,
}>();

const active = ref(true);

const bid = computed(() => {
    if (props.calculation.greatestBid) {
        return { team: props.calculation.greatestBid.team.name, value: props.calculation.greatestBid.value.toString() };
    } else {
        return { team: t(textKeys.field_none), value: t(textKeys.field_none)  };
    }
})
const high = computed(() => {
    if (props.calculation.highestTrump) {
        return { team: props.calculation.highestTrump.team.name, value: text(props.calculation.highestTrump.value) };
    } else {
        return { team: t(textKeys.field_none), value: t(textKeys.field_none) };
    }
})
const low = computed(() => {
    if (props.calculation.lowestTrump) {
        return { team: props.calculation.lowestTrump.team.name, value: text(props.calculation.lowestTrump.value) };
    } else {
        return { team: t(textKeys.field_none) , value: t(textKeys.field_none)  };
    }
})
const jack = computed(() => {
    if (props.calculation.jackiestTrump) {
        return { team: props.calculation.jackiestTrump.team.name, value: text(props.calculation.jackiestTrump.value) };
    } else {
        return { team: t(textKeys.field_none) , value: t(textKeys.field_none)  };
    }
})
const game = computed(() => {
    if (props.calculation.greatestGame) {
        let teams = '';
        props.calculation.greatestGame.teams.forEach(t => teams += t.name + '|')
        return { team: teams.substring(0, teams.length - 2), value: props.calculation.greatestGame.value };
    } else {
        return { team: t(textKeys.field_none) , value: t(textKeys.field_none) };
    }
})
const teamsWithScore = computed(() => {
    let teams: PitchTeam[] = [];
    if (props.calculation.greatestGame) {
        props.calculation.greatestGame.teams.forEach(t => teams.push(t))
    }
    if (props.calculation.greatestBid && !teams.some(t => t.compare(props.calculation.greatestBid!.team) === 0)) {
        teams.push(props.calculation.greatestBid.team);
    }
    if (props.calculation.highestTrump && !teams.some(t => t.compare(props.calculation.highestTrump!.team) === 0)) {
        teams.push(props.calculation.highestTrump.team);
    }
    if (props.calculation.lowestTrump && !teams.some(t => t.compare(props.calculation.lowestTrump!.team) === 0)) {
        teams.push(props.calculation.lowestTrump.team);
    }
    if (props.calculation.jackiestTrump && !teams.some(t => t.compare(props.calculation.jackiestTrump!.team) === 0)) {
        teams.push(props.calculation.jackiestTrump.team);
    }
    return teams;
})

function text(card: PitchCard) {
    return t(card.rank.key) + ' ' + t(card.suit.key);
}
function returnValue(): boolean {
    active.value = false;
    return true;
}
</script>
    
<template>
    <ModalCardVue :title-key="textKeys.title_round_over" :active="active" @close="closeDialog(returnValue())">
        <template #default>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>{{t(textKeys.label_bid)}}</th>
                        <th>{{t(textKeys.label_high)}}</th>
                        <th>{{t(textKeys.label_low)}}</th>
                        <th>{{t(textKeys.label_jack)}}</th>
                        <th>{{t(textKeys.label_game)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{{t(textKeys.label_value)}}</th>
                        <td>{{ bid.value }}</td>
                        <td>{{ high.value }}</td>
                        <td>{{ low.value }}</td>
                        <td>{{ jack.value }}</td>
                        <td>{{ game.value }}</td>
                    </tr>
                    <tr>
                        <th>{{t(textKeys.label_team)}}</th>
                        <td>{{ bid.team }}</td>
                        <td>{{ high.team }}</td>
                        <td>{{ low.team }}</td>
                        <td>{{ jack.team }}</td>
                        <td>{{ game.team }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="team in teamsWithScore">{{team.name}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{{t(textKeys.label_netscore)}}</th>
                        <td v-for="team in teamsWithScore">{{calculator.net(calculator.score(team, calculation, options))}}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </ModalCardVue>
</template>