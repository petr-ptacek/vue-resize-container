import type { SizeUnitType, SizeValueUnit } from "../types";

export function resolveSizeUnit(size: SizeValueUnit, expectedUnitType: SizeUnitType): boolean {
  return size.endsWith(expectedUnitType);
}
