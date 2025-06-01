<script setup lang="ts">
import { VueResizeContainer, VueResizeContainerSection } from "vue-resize-container";
</script>

<template>
  <div style="height: 100vh">
    <VueResizeContainer direction="horizontal" origin="alpha">
      <template #sectionAlpha>
        <VueResizeContainerSection>
          <div style="background-color: blueviolet; height: 100%; display: flex; justify-content: center; align-items: center; font-size: 24px;">
            Section Alpha
          </div>
        </VueResizeContainerSection>
      </template>
      <template #sectionBeta>
        <VueResizeContainerSection>
          <div style="background-color: cyan;">
            <div style="height: 100%; display: flex; justify-content: center; align-items: center; font-size: 24px;">
              <div style="width: 400px; height: 200px; background-color: red; display: flex; justify-content: center; align-items: center; text-transform: uppercase;">
                BOx
              </div>
            </div>
          </div>
        </VueResizeContainerSection>
      </template>
    </VueResizeContainer>
  </div>
</template>
