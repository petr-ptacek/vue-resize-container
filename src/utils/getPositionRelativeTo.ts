import type { MaybeRef } from "vue";
import { toValue } from "vue";

import type { Point } from "../types";

export function getPositionRelativeTo(position: MaybeRef<Point>, element: MaybeRef<HTMLElement>): Point {
  const _position = toValue(position);
  const _element = toValue(element);

  const rect = _element.getBoundingClientRect();

  return {
    x: _position.x - rect.x,
    y: _position.y - rect.y,
  };
}
