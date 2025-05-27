import { useEventListener, useDebounceFn } from "@vueuse/core";
import { onMounted, useTemplateRef } from "vue";

import type { UseResizerOptions } from "../types";
import { useExpandOrCollapse } from "./useExpandOrCollapse";
import { useResizerHandlers } from "./useResizerHandlers";
import { useSizeState } from "./useSizeState";

export function useResizer(options: UseResizerOptions) {
  const $container = useTemplateRef<HTMLElement>("container");
  const $resizer = useTemplateRef<HTMLElement>("resizer");

  const alphaSizeState = useSizeState({
    resizerElement: $resizer,
    containerElement: $container,
    direction: options.direction,
  });

  const betaSizeState = useSizeState({
    resizerElement: $resizer,
    containerElement: $container,
    direction: options.direction,
  });

  const { isActive: isCollapsed, setActive: setCollapsed } = useExpandOrCollapse({
    type: "collapse",
    alphaSizeState,
    betaSizeState,
    containerElement: $container,
    resizerElement: $resizer,
    origin: options.origin,
  });

  const { isActive: isExpanded, setActive: setExpanded } = useExpandOrCollapse({
    type: "expand",
    origin: options.origin,
    containerElement: $container,
    resizerElement: $resizer,
    alphaSizeState,
    betaSizeState,
  });

  const { resizerMouseDownHandler, resizerMouseEnterHandler, resizerMouseLeaveHandler, isResizing, isResizerHover } =
    useResizerHandlers({
      resizerElement: $resizer,
      containerElement: $container,
      direction: options.direction,
      origin: options.origin,
      alphaSizeState,
      betaSizeState,
    });

  const _onWindowResizedDebounce = useDebounceFn(_onWindowResized, 100);

  useEventListener(window, "resize", _onWindowResizedDebounce);

  onMounted(() => {
    const [alpha, beta] = options.initialSize;
    alphaSizeState.setSize(alpha);
    betaSizeState.setSize(beta);
  });

  function _onWindowResized() {
    alphaSizeState.setSize(`${alphaSizeState.sizePercentage.value}%`);
    betaSizeState.setSize(`${betaSizeState.sizePercentage.value}%`);
  }

  function expand() {
    if (isCollapsed.value) {
      return void setCollapsed(false);
    }

    setExpanded(!isExpanded.value);
  }

  function collapse() {
    if (isExpanded.value) {
      return void setExpanded(false);
    }

    setCollapsed(!isCollapsed.value);
  }

  return {
    resizerMouseDownHandler,
    resizerMouseEnterHandler,
    resizerMouseLeaveHandler,
    expand,
    collapse,

    isResizing,
    isResizerHover,
    isCollapsed,
    isExpanded,

    alphaStateSize: alphaSizeState,
    betaStateSize: betaSizeState,
  };
}
