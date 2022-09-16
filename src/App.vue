<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { DialogWrapper } from 'vue3-promise-dialog';
import ModalLoading from './components/ModalLoading.vue';
import Locale from './components/Locale.vue';
</script>

<template>
  <div class="hero-head">
    <div class="tabs is-small is-centered">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/pitch">Pitch</RouterLink>
        </li>
        <li>
          <RouterLink to="/spit">Spit</RouterLink>
        </li>
        <li>
          <RouterLink to="/solitaire">Solitaire</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
      </ul>
    </div>
  </div>
  <div class="hero-body">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <div class="content">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-foot">
    <div class="level">
      <div class="level-left">&copy;AnimatingStoat 2022</div>
      <div class="level-right"><Locale /></div>
    </div>
  </div>

  <DialogWrapper :transition-attrs="{name: 'dialog'}"></DialogWrapper>
  <ModalLoading />
</template>

<style scoped>
/*
@media screen and (min-width: 1024px) {
  #view {
    min-height: calc(100vh - 7rem);
  }
} */
</style>