<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import DialogWrapper from "@/components/DialogWrapper.vue";
import ModalLoading from "@/components/ModalLoading.vue";
import Locale from "@/components/SelectLocale.vue";
</script>

<template>
  <div class="hero-head">
    <div class="tabs is-small is-centered">
      <ul>
        <li>
          <RouterLink to="/">{{ $t("home.title") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/pitch">{{ $t("pitch.title") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/spit">{{ $t("spit.title") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/kings-in-the-corners">{{
            $t("corners.title")
          }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">{{ $t("about.title") }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
  <div class="hero-body">
    <div class="content container">
      <RouterView />
    </div>
  </div>
  <div class="hero-foot">
    <div class="level">
      <div class="level-left">{{ $t("label_copyright") }}</div>
      <div class="level-right"><Locale /></div>
    </div>
  </div>

  <DialogWrapper :transition-attrs="{ name: 'dialog' }"></DialogWrapper>
  <ModalLoading />
</template>
