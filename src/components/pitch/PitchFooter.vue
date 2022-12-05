<script setup lang="ts">
import { tKeys } from "@/lib/constants";

const emit = defineEmits(["play", "config", "exit"]);
</script>

<template>
  <div class="level is-mobile" id="pitch-messages">
    <button class="level-item button" @click="emit('play')">
      {{ $t(tKeys.label_play) }}
    </button>
    <button class="level-item button" @click="emit('config')">
      {{ $t(tKeys.label_configure) }}
    </button>
    <button class="level-item button" @click="emit('exit')">
      {{ $t(tKeys.label_exit) }}
    </button>
    <!-- <LocaleVue class="level-item select" /> -->
  </div>
</template>
