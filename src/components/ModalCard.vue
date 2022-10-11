<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  active: boolean;
  titleKey: string;
  titleParams?: string[];
}>();

const emit = defineEmits(["close"]);

const show = computed(() =>
  props.active ? ["modal", "is-active"] : ["modal"]
);
</script>

<template>
  <div :class="show">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ titleParams ? $t(titleKey, [...titleParams]) : $t(titleKey) }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
