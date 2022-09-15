<script setup lang="ts">
import type { PitchBidder, PitchCard } from '@/lib/pitch/classes';
import { ref } from 'vue';
import { closeDialog } from 'vue3-promise-dialog';
import PitchHandWrapperVue from '@/components/pitch/PitchHandWrapper.vue'
import { textKeys } from '@/lib/constants';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/* props */
const props = defineProps<{
    bidder: PitchBidder
}>()
/* refs */
const cardIndex = ref(0);
const active = ref(true);

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
    <PitchHandWrapperVue :bidder="bidder"
        @select-card-index="select">
        <template #default>
            <div class="level">
                <p>{{t(textKeys.message_play_for, [bidder.name])}}</p>
                <!-- <button class="level-item button">{{t(textKeys.label_play)}}</button> -->
            </div>
            <div class="block"></div>
        </template>
    </PitchHandWrapperVue>
</template>