<script setup lang="ts">
import { closeDialog } from 'vue3-promise-dialog';
import ModalCardVue from '@/components/ModalCard.vue';
import { ref } from 'vue';

/* props */
const props = defineProps<{
    labelTrue: string,
    labelFalse: string,
    message:string,
    titleKey:string,
    titleParams?:string[]
}>()
/* refs */
const active = ref(true);

function returnValue(): boolean {
    return false;
}
</script>

<template>
    <ModalCardVue :active="active" :title-key="titleKey" :title-params="titleParams" @close="closeDialog(false)">
        <template #default>
            {{ message }}
        </template>

        <template #footer>
            <div class="level">
                <div class="level-item">
                    <button id="yes-no-prompt-yes" class="button" @click="closeDialog(true)">{{labelTrue}}</button>
                </div>
                <div class="level-item">
                    <button id="yes-no-prompt-no" class="button" @click="closeDialog(false)">{{labelFalse}}</button>
                </div>
            </div>
        </template>
    </ModalCardVue>
</template>