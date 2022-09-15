<script setup lang="ts">
  import type { Ref } from 'vue'
  import { ref } from 'vue'
  import PitchGameVue from '@/components/pitch/PitchGame.vue';

  const config = ref(true);
</script>

<template>
    <div class="pitch">
      <PitchGameVue v-model="config"></PitchGameVue>
    </div>
</template>

<style>
@media (min-width: 1024px) {
  .pitch {
    display: flex;
    align-items: center;
  }
}
</style>
