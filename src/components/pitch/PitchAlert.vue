<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { closeDialog } from 'vue3-promise-dialog';

const { t } = useI18n();

const props = defineProps<{
    closeKey: string,
    messageKey: string,
    messageParams?: unknown[]
    messageClasses?: string[],
}>()

function returnValue(): boolean {
    return true;
}
</script>
    
<template>
    <div class="container">
        <div class="content level">
            <p :class="['level-item'].concat(...(messageClasses ?? []))">
                {{messageParams ? t(messageKey, messageParams) : t(messageKey)}}
            </p>
            <button class="level-item button" @click="closeDialog(returnValue())">
                {{t(closeKey)}}
            </button>
        </div>
    </div>
</template>

<style>
#pitch-message-error {
    color: firebrick
}

#pitch-message {
    color: forestgreen
}
</style>