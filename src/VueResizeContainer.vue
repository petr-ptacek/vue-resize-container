<script lang="ts" setup>
import type { AppResizeContainerProps } from "./types";
import { useResizer }                   from "./use";
import { ButtonsBox }                   from "./components";

const {
  origin = "alpha",
  direction = "horizontal",
  initialSize = ["50%", "50%"]
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
  isCollapsed
} = useResizer({
  origin,
  direction,
  initialSize
});
</script>

<template>
  <div
    ref="container"
    :data-origin="origin"
    :data-direction="direction"
    :class="{
			'is-resizing': isResizing,
			'is-resizer-hover': isResizerHover,
			'is-expanded': isExpanded,
			'is-collapsed': isCollapsed
		}"
    class="vue-resize-container"
  >
    <div
      ref="container"
      class="vue-resize-container__container">
      <div
        ref="sectionAlpha"
        :style="alphaStateSize.styleObj.value"
        data-section="alpha"
        class="vue-resize-container__section"
      >
        <slot name="alpha" />
      </div>

      <div
        ref="resizer"
        class="vue-resize-container__resizer"
      >
        <div class="vue-resize-container-resizer">
          <div
            class="vue-resize-container-resizer__inner"
            @mouseenter="resizerMouseEnterHandler"
            @mouseleave="resizerMouseLeaveHandler"
            @mousedown.left="resizerMouseDownHandler"
          ></div>
        </div>

        <ButtonsBox
          @expand="expand"
          @collapse="collapse"
        />
      </div>

      <div
        ref="sectionBeta"
        :style="betaStateSize.styleObj.value"
        data-section="beta"
        class="vue-resize-container__section"
      >
        <slot name="beta" />
      </div>
    </div>
  </div>
</template>
