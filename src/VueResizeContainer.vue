<script lang="ts" setup>
import { ButtonsBox } from "./components";
import type { AppResizeContainerProps } from "./types";
import { useResizer } from "./use";

const {
  origin = "alpha",
  direction = "horizontal",
  initialSize = ["50%", "50%"],
} = defineProps<AppResizeContainerProps>();

// const storageData = useStorage(storageKey);

const {
  resizerMouseDownHandler,
  resizerMouseEnterHandler,
  resizerMouseLeaveHandler,
  collapse,
  expand,
  alphaStateSize,
  betaStateSize,
  isResizerHover,
  isResizing,
  isExpanded,
  isCollapsed,
} = useResizer({
  origin,
  direction,
  initialSize,
});

defineSlots<{
  sectionAlpha: () => void;
  sectionBeta: () => void;
  buttonIconCollapse: () => void;
  buttonIconExpand: () => void;
}>();
</script>

<template>
  <div
    :data-origin="origin"
    :data-direction="direction"
    :class="{
      'is-resizing': isResizing,
      'is-resizer-hover': isResizerHover,
      'is-expanded': isExpanded,
      'is-collapsed': isCollapsed,
    }"
    class="vue-resize-container"
  >
    <div
      ref="container"
      class="vue-resize-container__container"
    >
      <div
        ref="sectionAlpha"
        :style="alphaStateSize.styleObj.value"
        data-section="alpha"
        class="vue-resize-container__section"
      >
        <slot name="sectionAlpha" />
      </div>

      <div class="vue-resize-container__resizer">
        <div
          ref="resizer"
          class="vue-resize-container-resizer"
        >
          <div class="vue-resize-container-resizer__inner">
            <div class="vue-resize-container-resizer__buttons">
              <ButtonsBox
                @expand="expand"
                @collapse="collapse"
              >
                <template #iconExpand>
                  <slot name="buttonIconExpand" />
                </template>
                <template #iconCollapse>
                  <slot name="buttonIconCollapse" />
                </template>
              </ButtonsBox>
            </div>
          </div>

          <div
            class="vue-resize-container-resizer__inner vue-resize-container-resizer__handler"
            @mouseenter="resizerMouseEnterHandler"
            @mouseleave="resizerMouseLeaveHandler"
            @mousedown.left="resizerMouseDownHandler"
          ></div>
        </div>
      </div>

      <div
        ref="sectionBeta"
        :style="betaStateSize.styleObj.value"
        data-section="beta"
        class="vue-resize-container__section"
      >
        <slot name="sectionBeta" />
      </div>
    </div>
  </div>
</template>
