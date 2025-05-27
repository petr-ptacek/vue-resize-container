import { computed, type MaybeRefOrGetter, readonly, ref, toValue, watch } from "vue";

import type { DirectionValue, SizeValue } from "../types";
import { normalizeSize, parseSizeValue, computeSizeToPercentage } from "../utils";

export type UseSizeStateOptions = {
  direction: MaybeRefOrGetter<DirectionValue>;
  containerElement: MaybeRefOrGetter<HTMLElement | null>;
  resizerElement: MaybeRefOrGetter<HTMLElement | null>;
};

export type UseSizeStateReturn = ReturnType<typeof useSizeState>;

export function useSizeState(options: UseSizeStateOptions) {
  const direction = computed(() => toValue(options.direction));
  const containerElement = computed(() => toValue(options.containerElement));
  const resizerElement = computed(() => toValue(options.resizerElement));

  const size = ref(0);
  const sizePercentage = ref(0);

  watch([size, direction], () => {
    if (!containerElement.value || !resizerElement.value) {
      return;
    }

    sizePercentage.value = computeSizeToPercentage({
      size: size.value,
      direction: direction.value,
      containerElement: containerElement.value,
      resizerElement: resizerElement.value,
    });
  });

  const styleObj = computed(() => {
    let width: string | undefined = undefined;
    let height: string | undefined = undefined;

    if (direction.value === "horizontal") {
      width = `${sizePercentage.value}%`;
    }

    if (direction.value === "vertical") {
      height = `${sizePercentage.value}%`;
    }

    return {
      width,
      height,
    };
  });

  function setSize(sizeValue: SizeValue) {
    const direction = toValue(options.direction);
    const containerElement = toValue(options.containerElement)!;
    const resizerElement = toValue(options.resizerElement)!;

    const parsedSizeValue = parseSizeValue({
      value: sizeValue,
      direction,
      containerElement,
      resizerElement,
    });

    size.value = normalizeSize({
      size: parsedSizeValue,
      direction,
      containerElement,
      resizerElement,
    });
  }

  return {
    size: readonly(size),
    sizePercentage: readonly(sizePercentage),
    styleObj,

    setSize,
  };
}
