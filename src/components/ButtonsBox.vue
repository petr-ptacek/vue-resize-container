<script lang="ts" setup>
import ButtonCollapse from "./ButtonCollapse.vue";
import ButtonExpand   from "./ButtonExpand.vue";

defineEmits<{
  expand: [MouseEvent],
  collapse: [MouseEvent]
}>();
</script>

<template>
  <div class="vue-resize-container-buttons">
    <ButtonExpand
      @click="$emit('expand', $event)"
    >
      <slot name="iconExpand" />
    </ButtonExpand>
    <div class="vue-resize-container-buttons__splitter"></div>
    <ButtonCollapse
      @click="$emit('collapse', $event)"
    >
      <slot name="iconCollapse" />
    </ButtonCollapse>
  </div>
</template>
