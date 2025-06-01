export function toPercentageValue(value: number, baseValue: number): number {
  if (baseValue === 0) {
    return 0;
  }

  return value / (baseValue / 100);
}
