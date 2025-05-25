import type { DirectionValue }    from "../types";
import { getValueFromPercentage } from "./getValueFromPercentage";

export type Params = {
  sizePercentage: number;
  containerElement: HTMLElement;
  resizerElement: HTMLElement;
  direction: DirectionValue;
}

export function computeSizeFromPercentage(params: Params) {
  const {
    sizePercentage,
    direction,
    resizerElement,
    containerElement
  } = params;

  const containerSize = containerElement.getBoundingClientRect();
  const resizerSize = resizerElement.getBoundingClientRect();
  const baseValue = direction === "horizontal" ?
                    containerSize.width - resizerSize.width :
                    containerSize.height - resizerSize.height;

  return getValueFromPercentage(
    sizePercentage,
    baseValue
  );
}
