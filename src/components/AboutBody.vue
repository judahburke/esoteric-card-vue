<script setup lang="ts">
import AboutItem from "@/components/AboutItem.vue";
//import DocumentationIcon from "@/components/icons/IconDocumentation.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
//import EcosystemIcon from "@/components/icons/IconEcosystem.vue";
//import CommunityIcon from "@/components/icons/IconCommunity.vue";
//import SupportIcon from "@/components/icons/IconSupport.vue";
import { ref } from "vue";
const urlVueJs = ref("https://vuejs.org");
const urlTS = ref("https://www.typescriptlang.org/");
const urlPinia = ref("https://pinia.vuejs.org/");
const urlVueRouter = ref("https://test-utils.vuejs.org/");
const urlI18n = ref("https://vue-i18n.intlify.dev/");
const urlBulma = ref("https://bulma.io");
const urlVite = ref("https://vitejs.dev/guide/features.html");
const urlVueTest = ref("https://github.com/vuejs/devtools");
const urlCypress = ref("https://www.cypress.io/");
const urlVueDevTools = ref("https://github.com/vuejs/devtools");
const urlSource = ref("https://github.com/judahburke/esoteric-card-vue");
</script>

<template>
  <AboutItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>{{ $t("about.title_tools") }}</template>

    <i18n-t keypath="about.message_tools" tag="p">
      <template v-slot:urlVueJs>
        <a :href="urlVueJs">{{ $t("about.link.vuejs") }}</a>
      </template>
      <template v-slot:urlTS>
        <a :ref="urlTS">{{ $t("about.link.ts") }}</a>
      </template>
      <template v-slot:urlPinia>
        <a :href="urlPinia">{{ $t("about.link.pinia") }}</a>
      </template>
      <template v-slot:urlVueRouter>
        <a :href="urlVueRouter">{{ $t("about.link.vueRouter") }}</a>
      </template>
      <template v-slot:urlI18n>
        <a :href="urlI18n">{{ $t("about.link.i18n") }}</a>
      </template>
      <template v-slot:urlBulma>
        <a :ref="urlBulma">{{ $t("about.link.bulma") }}</a>
      </template>
    </i18n-t>

    <i18n-t keypath="about.message_dev_tools" tag="p">
      <template v-slot:urlVite>
        <a :href="urlVite">{{ $t("about.link.vite") }}</a>
      </template>
      <template v-slot:urlVueTest>
        <a :href="urlVueTest">{{ $t("about.link.vueTest") }}</a>
      </template>
      <template v-slot:urlCypress>
        <a :href="urlCypress">{{ $t("about.link.cypress") }}</a>
      </template>
      <template v-slot:urlVueDevTools>
        <a :href="urlVueDevTools">{{ $t("about.link.vueDevTools") }}</a>
      </template>
      <template v-slot:urlSource>
        <a :href="urlSource">{{ $t("about.link.source") }}</a>
      </template>
    </i18n-t>
  </AboutItem>
</template>
