<script setup lang="ts">
import { usePitchStore } from "@/stores/pitch";
import { storeToRefs } from "pinia";
import PitchCardVue from "./PitchCard.vue";

const { currentTrick } = storeToRefs(usePitchStore());
</script>

<template>
  <div id="pitch-trick" class="columns is-multiline is-centered is-mobile">
    <div v-for="item in currentTrick?.waste ?? []" class="column is-narrow">
      <PitchCardVue :card="item.card" :show="true" />
      <div class="tags" v-if="item.bidder.name === item.bidder.team.name">
        <span class="tag is-primary">{{ item.bidder.name }}</span>
      </div>
      <div class="tags has-addons" v-else>
        <span class="tag is-primary">{{ item.bidder.name }}</span>
        <span class="tag is-light">{{ item.bidder.team.name }}</span>
      </div>
    </div>
  </div>
</template>
