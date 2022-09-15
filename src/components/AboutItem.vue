<template>
  <div class="columns is-vcentered">
    <div class="column is-one-fifth is-vcentered">
      <i class="icon">
        <slot name="icon"></slot>
      </i>
    </div>
    <div class="column">
      <h3 class="subtitle is-4">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>
