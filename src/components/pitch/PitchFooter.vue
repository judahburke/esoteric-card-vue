<script setup lang="ts">
import { messageKeys } from "@/lib/constants";

const emit = defineEmits(["play", "config", "exit"]);
</script>

<template>
  <div class="level is-mobile" id="pitch-messages">
    <button class="level-item button" @click="emit('play')">
      {{ $t(messageKeys.label_play) }}
    </button>
    <button class="level-item button" @click="emit('config')">
      {{ $t(messageKeys.label_configure) }}
    </button>
    <button class="level-item button" @click="emit('exit')">
      {{ $t(messageKeys.label_exit) }}
    </button>
    <!-- <LocaleVue class="level-item select" /> -->
  </div>
</template>
