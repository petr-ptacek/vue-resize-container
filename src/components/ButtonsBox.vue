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
      title="Expand"
      @click="$emit('expand', $event)"
    />
    <div class="vue-resize-container-buttons__splitter"></div>
    <ButtonCollapse
      title="Collapse"
      @click="$emit('collapse', $event)"
    />
  </div>
</template>
