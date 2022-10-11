<script setup lang="ts">
import { closeDialog } from "vue3-promise-dialog";
import ModalCardVue from "@/components/ModalCard.vue";
import { ref } from "vue";

/* props */
const props = defineProps<{
  messageKey: string;
  messageParams?: unknown[];
  titleKey: string;
  titleParams?: string[];
}>();
/* refs */
const active = ref(true);

function returnValue(): boolean {
  return true;
}
</script>

<template>
  <ModalCardVue
    :active="active"
    :title-key="titleKey"
    :title-params="titleParams"
    @close="closeDialog(returnValue())"
  >
    <template #default>
      {{ $t(messageKey, messageParams ? messageParams : []) }}
    </template>
  </ModalCardVue>
</template>
