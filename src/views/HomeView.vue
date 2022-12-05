<script setup lang="ts">
import { tKeys } from "@/lib/constants";
</script>

<template>
  <div class="columns">
    <div class="column has-text-centered">
      <h2 class="title is-2 is-spaced has-text-primary">
        {{ $t(tKeys.message_greeting) }}
      </h2>
      <h4 class="subtitle is-4">{{ $t(tKeys.message_subgreeting) }}</h4>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/pitch">{{ $t(tKeys.pitch.title) }}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{ $t(tKeys.pitch.message_summary) }}
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/kings-in-the-corners">{{
                $t(tKeys.corners.title)
              }}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{ $t(tKeys.corners.message_summary) }}
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-fifth is-vcentered">
          <i class="icon">
            <button class="button is-primary is-outlined">
              <RouterLink to="/spit">{{ $t(tKeys.spit.title) }}</RouterLink>
            </button>
          </i>
        </div>
        <div class="column">
          {{ $t(tKeys.spit.message_summary) }}
        </div>
      </div>
    </div>
  </div>
</template>
