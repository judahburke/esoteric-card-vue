<script setup lang="ts">
import { messageKeys } from "@/lib/constants";
</script>

<template>
  <div id="solitaire" class="container">
    <div class="content">
      <h2 class="title is-2">{{ $t(messageKeys.solitaire.title) }}</h2>
      <p class="subtitle is-4">
        {{ $t(messageKeys.solitaire.message_description) }}
      </p>
      <p class="subtitle is-4">
        {{ $t(messageKeys.solitaire.message_waitdescription) }}
      </p>
    </div>
  </div>
</template>
