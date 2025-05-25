<script setup lang="ts">
import { VueResizeContainer, VueResizeContainerSection } from "vue-resize-container";
</script>

<template>
  <div style="height: 100vh;">
    <VueResizeContainer style="height: 100%">
      <template #sectionAlpha>
        <VueResizeContainerSection>
          <div style="background-color: blueviolet; height: 100%;">
            Section Alpha
          </div>
        </VueResizeContainerSection>
      </template>
      <template #sectionBeta>
        <div style="background-color: cyan; height: 100%;">
          Section Beta
        </div>
      </template>
    </VueResizeContainer>
  </div>
</template>
