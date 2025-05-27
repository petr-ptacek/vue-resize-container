import type { MaybeRefOrGetter } from "vue";

export type Point = { x: number; y: number };

export type SizeUnitType = "%" | "px";

export type SizeValueUnit = `${number}%` | `${number}px`;

export type SizeValue = number | SizeValueUnit;

export type SizeValueTuple = [SizeValue, SizeValue];

export type OriginValue = "alpha" | "beta";

export type DirectionValue = "horizontal" | "vertical";

export type DefaultSettings = Required<
  Pick<AppResizeContainerProps, "origin" | "direction" | "initialSize" | "storageKey">
>;

export type AppResizeContainerProps = {
  direction?: DirectionValue;
  origin?: OriginValue;
  storageKey?: string;
  initialSize?: SizeValueTuple;
};

export type StorageData = {
  alphaSize: SizeValue;
  betaSize: SizeValue;
  origin: OriginValue;
  direction: DirectionValue;
};

export type UseResizerOptions = {
  origin: MaybeRefOrGetter<OriginValue>;
  direction: MaybeRefOrGetter<DirectionValue>;
  initialSize: SizeValueTuple;
};
