<script setup lang="ts">
import ButtonBase from "./ButtonBase.vue";
</script>

<template>
  <ButtonBase
    class="vue-resize-container-buttons__button"
    data-action="expand"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </slot>
  </ButtonBase>
</template>
