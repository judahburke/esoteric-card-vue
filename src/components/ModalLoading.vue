<script setup lang="ts">
import { tKeys } from "@/lib/constants";
import { useRootStore } from "@/stores/root";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const { isLoading } = storeToRefs(useRootStore());

const classes = computed(() =>
  isLoading.value ? ["modal", "is-active"] : ["modal"]
);
</script>

<template>
  <div :class="classes">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="hero is-primary">
        <div class="block"></div>
        <p class="title has-text-centered is-spaced">
          {{ $t(tKeys.label_please_wait) }}
        </p>
        <button class="button is-loading">
          {{ $t(tKeys.message_please_wait) }}
        </button>
      </div>
    </div>
  </div>
</template>
