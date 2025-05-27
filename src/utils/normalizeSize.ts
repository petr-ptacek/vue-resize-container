import type { DirectionValue } from "../types";

export type Params = {
  size: number;
  direction: DirectionValue;
  containerElement: HTMLElement;
  resizerElement: HTMLElement;
};

export function normalizeSize(params: Params) {
  const { size, direction } = params;

  switch (direction) {
    case "vertical":
      return _normalizeVertical(params);
    case "horizontal":
      return _normalizeHorizontal(params);
    default:
      return size;
  }
}

function _normalizeHorizontal(params: Params) {
  const { containerElement, resizerElement, size } = params;
  const containerSize = containerElement.getBoundingClientRect();
  const resizerSize = resizerElement.getBoundingClientRect();

  if (size < 0) {
    return 0;
  } else if (size > containerSize.width) {
    return containerSize.width - resizerSize.width;
  } else {
    return size;
  }
}

function _normalizeVertical(params: Params) {
  const { containerElement, resizerElement, size } = params;
  const containerSize = containerElement.getBoundingClientRect();
  const resizerSize = resizerElement.getBoundingClientRect();

  if (size < 0) {
    return 0;
  } else if (size > containerSize.height) {
    return containerSize.height - resizerSize.height;
  } else {
    return size;
  }
}
