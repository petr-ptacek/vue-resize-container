import type { DefaultSettings } from "../types";

export function getDefaultSettings(): DefaultSettings {
  return {
    initialSize: ["50%", "50%"],
    storageKey: "resizeContainer",
    origin: "alpha",
    direction: "horizontal"
  };
}
