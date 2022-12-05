<script setup lang="ts">
import { tKeys } from "@/lib/constants";
</script>

<template>
  <div id="corners" class="container">
    <div class="content">
      <h2 class="title is-2">{{ $t(tKeys.corners.title) }}</h2>
      <p class="subtitle is-4">
        {{ $t(tKeys.corners.message_description) }}
      </p>
      <p class="subtitle is-4">
        {{ $t(tKeys.corners.message_waitdescription) }}
      </p>
    </div>
  </div>
</template>
