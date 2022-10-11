<script setup lang="ts">
import { messageKeys } from "@/lib/constants";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
</script>

<template>
  <div class="select is-small">
    <select v-model="locale">
      <option value="en_US">{{t(messageKeys.en_US)}}</option>
      <option value="vn_VN">{{t(messageKeys.vn_VN)}}</option>
      <option value="es_MX" disabled="true">{{t(messageKeys.es_MX)}}</option>
      <option value="de_DE" disabled="true">{{t(messageKeys.de_DE)}}</option>
    </select>
  </div>
</template>
