<script setup lang="ts">
import { textKeys } from '@/lib/constants'
import { useI18n } from 'vue-i18n';
const { t } = useI18n({useScope: 'global'})
</script>

<template>
  <div class="columns">
    <div class="column has-text-centered">
      <h2 class="title is-2 is-spaced has-text-primary">{{t(textKeys.message_greeting)}}</h2>
      <h4 class="subtitle is-4">{{t(textKeys.message_subgreeting)}}</h4>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/pitch">{{t(textKeys.pitch.title)}}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{t(textKeys.pitch.message_summary)}}
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/solitaire">{{t(textKeys.solitaire.title)}}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{t(textKeys.solitaire.message_summary)}}
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/spit">{{t(textKeys.spit.title)}}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{t(textKeys.spit.message_summary)}}
        </div>
      </div>
    </div>
  </div>
</template>
