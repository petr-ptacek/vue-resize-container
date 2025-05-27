import type { Point } from "../types";

type _Event = {
  x: number;
  y: number;
};

type Options = {
  xKey?: keyof _Event;
  yKey?: keyof _Event;
};

export function getPositionFromEvent<TEvent extends _Event>(event: TEvent, options?: Options): Point {
  return {
    x: event[options?.xKey ?? "x"],
    y: event[options?.yKey ?? "y"],
  };
}
