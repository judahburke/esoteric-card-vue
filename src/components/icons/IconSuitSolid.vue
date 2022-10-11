<script setup lang="ts">
import { CardSuitKey, CardSuitColorKey } from "@/lib/card/enums";
import { computed } from "vue";

const props = defineProps<{
  suit: CardSuitKey;
  color: CardSuitColorKey;
}>();

const fillColor = computed(() =>
  props.color === CardSuitColorKey.RED ? "red" : "black"
);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style="width: 24px; height: 24px"
    viewBox="0 0 24 24"
  >
    <path
      v-if="suit === CardSuitKey.CLUBS"
      :fill="fillColor"
      d="M12,2C14.3,2 16.3,4 16.3,6.2C16.21,8.77 14.34,9.83 14.04,10C15.04,9.5 16.5,9.5 16.5,9.5C19,9.5 21,11.3 21,13.8C21,16.3 19,18 16.5,18C16.5,18 15,18 13,17C13,17 12.7,19 15,22H9C11.3,19 11,17 11,17C9,18 7.5,18 7.5,18C5,18 3,16.3 3,13.8C3,11.3 5,9.5 7.5,9.5C7.5,9.5 8.96,9.5 9.96,10C9.66,9.83 7.79,8.77 7.7,6.2C7.7,4 9.7,2 12,2Z"
    />
    <path
      v-else-if="suit === CardSuitKey.DIAMONDS"
      :fill="fillColor"
      d="M19,12L12,22L5,12L12,2"
    />
    <path
      v-else-if="suit === CardSuitKey.HEARTS"
      :fill="fillColor"
      d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
    />
    <path
      v-else-if="suit === CardSuitKey.SPADES"
      :fill="fillColor"
      d="M12,2C9,7 4,9 4,14C4,16 6,18 8,18C9,18 10,18 11,17C11,17 11.32,19 9,22H15C13,19 13,17 13,17C14,18 15,18 16,18C18,18 20,16 20,14C20,9 15,7 12,2Z"
    />
    <path
      v-else
      :fill="fillColor"
      d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
    />
  </svg>
</template>
