<script lang="ts" setup>
import ButtonBase from "./ButtonBase.vue";

const emit = defineEmits<{
  expand: [MouseEvent];
  collapse: [MouseEvent];
}>();

defineSlots<{
  iconExpand: () => void;
  iconCollapse: () => void;
}>();

function emitExpand(e: MouseEvent): void {
  emit("expand", e);
}

function emitCollapse(e: MouseEvent): void {
  emit("collapse", e);
}
</script>

<template>
  <div class="vue-resize-container-buttons">
    <ButtonBase
      class="vue-resize-container-buttons__button"
      data-action="expand"
      @click="emitExpand"
    >
      <slot name="iconExpand">
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

    <div class="vue-resize-container-buttons__splitter"></div>
    <ButtonBase
      class="vue-resize-container-buttons__button"
      data-action="collapse"
      @click="emitCollapse"
    >
      <slot name="iconCollapse">
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </slot>
    </ButtonBase>
  </div>
</template>
