import type { SizeUnitType, SizeValueUnit } from "../types";

export function resolveSizeUnit(size: SizeValueUnit, expectedUnitType: SizeUnitType) {
  return size.endsWith(expectedUnitType);
}
