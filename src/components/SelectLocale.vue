<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });
</script>

<template>
  <div class="select is-small">
    <select v-model="locale">
      <option value="en_US">{{ t("en_US") }}</option>
      <option value="vn_VN">{{ t("vn_VN") }}</option>
      <option value="es_MX" disabled="true">{{ t("es_MX") }}</option>
      <option value="de_DE" disabled="true">{{ t("de_DE") }}</option>
    </select>
  </div>
</template>
