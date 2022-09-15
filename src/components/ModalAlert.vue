<script setup lang="ts">
import { closeDialog } from 'vue3-promise-dialog';
import ModalCardVue from '@/components/ModalCard.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

/* props */
const props = defineProps<{
    messageKey: string,
    messageParams?: unknown[],
    titleKey: string,
    titleParams?: unknown[]
}>()
/* refs */
const active = ref(true);

function returnValue(): boolean {
    return true;
}
</script>
    
<template>
    <ModalCardVue :active="active" :title-key="titleKey" :title-params="titleParams"
        @close="closeDialog(returnValue())">
        <template #default>
            {{ messageParams ? t(messageKey, messageParams) : t(messageKey) }}
        </template>
    </ModalCardVue>
</template>