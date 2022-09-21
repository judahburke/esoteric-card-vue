<script setup lang="ts">
import PitchCardVue from '@/components/pitch/PitchCard.vue';
import type { PitchBidder, PitchCard } from '@/lib/pitch/classes';
import { useI18n } from 'vue-i18n';
import { usePitchStore } from '@/stores/pitch';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

/* locale */
const { t } = useI18n({useScope: 'global'})
/* store */
const { showCards } = storeToRefs(usePitchStore())
/* props */
const props = defineProps<{
    bidder: PitchBidder,
}>()
/* emit */
const emit = defineEmits(['selectCardIndex'])

</script>

<template>
    <div class="container">
        <div class="content">
            <slot></slot>
        </div>
        <div class="block"></div>
        <div id="pitch-hand-cards" class="content">
            <div class="columns is-multiline is-centered is-mobile">
                <div class="column is-narrow" v-for="(card, index) in bidder.hand">
                    <PitchCardVue :card="card" :show="showCards" 
                        @click="emit('selectCardIndex', card, index, ...bidder.hand)" />
                </div>
                <div class="block"></div>
            </div>
        </div>
    </div>
</template>