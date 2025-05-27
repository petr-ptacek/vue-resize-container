import type { DirectionValue, OriginValue, Point } from "../types";
import { getPositionFromEvent } from "./getPositionFromEvent";
import { getPositionRelativeTo } from "./getPositionRelativeTo";

export type Params = {
  evt: MouseEvent;
  direction: DirectionValue;
  alphaSize: number;
  betaSize: number;
  containerElement: HTMLElement;
  resizerElement: HTMLElement;
  pointerOffset: Point;
  origin: OriginValue;
};

export function computeSizesFromMouseEvent(params: Params) {
  let sizes = {
    alpha: params.alphaSize,
    beta: params.betaSize,
  };

  switch (params.direction) {
    case "horizontal":
      sizes = _computeSizesHorizontal(params);
      break;
    case "vertical":
      sizes = _computeSizesVertical(params);
      break;
  }

  return sizes;
}

function _computeSizesVertical(params: Params) {
  const { evt, containerElement, resizerElement, origin, pointerOffset } = params;
  const containerRect = containerElement.getBoundingClientRect();
  const resizerRect = resizerElement.getBoundingClientRect();

  const { y: posY } = getPositionRelativeTo(getPositionFromEvent(evt), containerElement);
  let alpha = posY;
  let beta = containerRect.height;
  beta -= posY;
  beta -= resizerRect.height;

  switch (origin) {
    case "alpha":
      alpha -= pointerOffset.y;
      break;
    case "beta":
      beta += pointerOffset.y;
      break;
  }

  return {
    alpha,
    beta,
  };
}

function _computeSizesHorizontal(params: Params) {
  const { evt, containerElement, resizerElement, origin, pointerOffset } = params;
  const containerRect = containerElement.getBoundingClientRect();
  const resizerRect = resizerElement.getBoundingClientRect();

  const { x: posX } = getPositionRelativeTo(getPositionFromEvent(evt), containerElement);
  let alpha = 0;
  let beta = 0;

  switch (origin) {
    case "alpha":
      alpha = posX - pointerOffset.x;
      beta = containerRect.width - alpha - resizerRect.width;
      break;
    case "beta":
      beta = containerRect.width - posX - pointerOffset.x;
      alpha = containerRect.width - resizerRect.width - beta;
      break;
  }

  return {
    alpha,
    beta,
  };
}
