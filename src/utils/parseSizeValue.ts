import type { DirectionValue, SizeValue } from "../types";
import { computeSizeFromPercentage, resolveSizeUnit } from "../utils";

export type Params = {
  value: SizeValue;
  containerElement: HTMLElement;
  resizerElement: HTMLElement;
  direction: DirectionValue;
};

export function parseSizeValue(params: Params): number {
  const { resizerElement, containerElement, value, direction } = params;
  if (typeof value === "number") {
    return value;
  }

  if (resolveSizeUnit(value, "px")) {
    return parseInt(value);
  }

  if (resolveSizeUnit(value, "%")) {
    return computeSizeFromPercentage({
      sizePercentage: parseFloat(value),
      direction,
      containerElement,
      resizerElement,
    });
  }

  return 0;
}
