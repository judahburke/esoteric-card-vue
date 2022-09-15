<script setup lang="ts">
import { textKeys } from '@/lib/constants';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div id="spit" class="container">
    <div class="content">
      <h2 class="title is-2">{{t(textKeys.spit.title)}}</h2>
      <p class="subtitle is-4">{{t(textKeys.spit.message_description)}}</p>
      <p class="subtitle is-4">{{t(textKeys.spit.message_waitdescription)}}</p>
    </div>
  </div>
</template>
  