import { useDebounceFn } from "@vueuse/core";
import { type MaybeRefOrGetter, onUnmounted, readonly, ref, shallowRef, toValue } from "vue";

import type { DirectionValue, OriginValue, Point } from "../types";
import { computeSizesFromMouseEvent, getPositionFromEvent, getPositionRelativeTo } from "../utils";
import type { UseSizeStateReturn } from "./useSizeState";

export type UseResizerHandlersOptions = {
  alphaSizeState: UseSizeStateReturn;
  betaSizeState: UseSizeStateReturn;
  origin: MaybeRefOrGetter<OriginValue>;
  direction: MaybeRefOrGetter<DirectionValue>;
  containerElement: MaybeRefOrGetter<HTMLElement | null>;
  resizerElement: MaybeRefOrGetter<HTMLElement | null>;
};

export type UseResizerHandlersReturn = ReturnType<typeof useResizerHandlers>;

export function useResizerHandlers(options: UseResizerHandlersOptions) {
  const isResizerHover = ref(false);
  const isResizing = ref(false);
  const pointerPosition = shallowRef<Point>({ x: 0, y: 0 });
  const pointerOffset = shallowRef<Point>({ x: 0, y: 0 });

  const _windowMousemoveDebounced = useDebounceFn(windowMouseMoveHandler, 0);

  onUnmounted(() => {
    window.removeEventListener("mousemove", _windowMousemoveDebounced);

    window.removeEventListener("mouseup", windowMouseUpHandler);
  });

  function resizerMouseEnterHandler(_evt: MouseEvent) {
    isResizerHover.value = true;
  }

  function resizerMouseLeaveHandler(_evt: MouseEvent) {
    isResizerHover.value = false;
  }

  function resizerMouseDownHandler(evt: MouseEvent) {
    isResizing.value = true;
    pointerPosition.value = {
      x: evt.clientX,
      y: evt.clientY,
    };

    pointerOffset.value = getPositionRelativeTo(getPositionFromEvent(evt), evt.currentTarget as HTMLElement);

    window.addEventListener("mousemove", _windowMousemoveDebounced);
    window.addEventListener("mouseup", windowMouseUpHandler);
  }

  function windowMouseMoveHandler(evt: MouseEvent) {
    const { alphaSizeState, betaSizeState } = options;

    const { alpha, beta } = computeSizesFromMouseEvent({
      evt,
      origin: toValue(options.origin),
      direction: toValue(options.direction),
      pointerOffset: pointerOffset.value,
      alphaSize: alphaSizeState.size.value,
      betaSize: betaSizeState.size.value,
      resizerElement: toValue(options.resizerElement)!,
      containerElement: toValue(options.containerElement)!,
    });

    alphaSizeState.setSize(alpha);
    betaSizeState.setSize(beta);
  }

  function windowMouseUpHandler(_evt: MouseEvent) {
    isResizing.value = false;
    pointerPosition.value = { x: 0, y: 0 };
    pointerOffset.value = { x: 0, y: 0 };

    window.removeEventListener("mousemove", _windowMousemoveDebounced);

    window.removeEventListener("mouseup", windowMouseUpHandler);
  }

  return {
    pointerPosition: readonly(pointerPosition),
    pointerOffset: readonly(pointerOffset),
    isResizerHover: readonly(isResizerHover),
    isResizing: readonly(isResizing),

    resizerMouseDownHandler,
    resizerMouseEnterHandler,
    resizerMouseLeaveHandler,
  };
}
