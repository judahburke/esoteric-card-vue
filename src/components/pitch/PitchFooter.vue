<script setup lang="ts">
import { textKeys } from '@/lib/constants'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const emit = defineEmits(['play', 'config', 'exit'])
</script>

<template>
    <div class="level is-mobile" id="pitch-messages">
        <button class="level-item button" @click="emit('play')">{{t(textKeys.label_play)}}</button>
        <button class="level-item button" @click="emit('config')">{{t(textKeys.label_configure)}}</button>
        <button class="level-item button" @click="emit('exit')">{{t(textKeys.label_exit)}}</button>
        <!-- <LocaleVue class="level-item select" /> -->
    </div>
</template>