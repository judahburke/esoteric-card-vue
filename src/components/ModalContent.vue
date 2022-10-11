<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  active: boolean;
}>();

const emit = defineEmits(["close"]);

const show = computed(() =>
  props.active ? ["modal", "is-active"] : ["modal"]
);
</script>

<template>
  <div :class="show">
    <div class="modal-background" @click="emit('close')"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="emit('close')"
    ></button>
  </div>
</template>
