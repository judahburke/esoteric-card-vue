<script setup lang="ts">
import { messageKeys } from "@/lib/constants";
</script>

<template>
  <div class="columns">
    <div class="column has-text-centered">
      <h2 class="title is-2 is-spaced has-text-primary">
        {{ $t(messageKeys.message_greeting) }}
      </h2>
      <h4 class="subtitle is-4">{{ $t(messageKeys.message_subgreeting) }}</h4>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/pitch">{{ $t(messageKeys.pitch.title) }}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{ $t(messageKeys.pitch.message_summary) }}
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/solitaire">{{
                $t(messageKeys.solitaire.title)
              }}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{ $t(messageKeys.solitaire.message_summary) }}
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/spit">{{ $t(messageKeys.spit.title) }}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{ $t(messageKeys.spit.message_summary) }}
        </div>
      </div>
    </div>
  </div>
</template>
