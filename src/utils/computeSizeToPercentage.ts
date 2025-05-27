import type { DirectionValue } from "../types";
import { toPercentageValue } from "./toPercentageValue";

export type Params = {
  containerElement: HTMLElement;
  resizerElement: HTMLElement;
  size: number;
  direction: DirectionValue;
};

export function computeSizeToPercentage(params: Params) {
  const { size, direction, containerElement, resizerElement } = params;

  let base = 0;
  const containerSize = containerElement.getBoundingClientRect();
  const resizerSize = resizerElement.getBoundingClientRect();

  switch (direction) {
    case "horizontal":
      base = containerSize.width - resizerSize.width;
      break;
    case "vertical":
      base = containerSize.height - resizerSize.height;
      break;
  }

  return toPercentageValue(size, base);
}
