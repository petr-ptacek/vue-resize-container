import { useStorage as _useStorage } from "@vueuse/core";
import type { MaybeRefOrGetter } from "vue";

import type { StorageData } from "../types";

export type UseStorageOptions = {
  key: MaybeRefOrGetter<string>;
};

export function useStorage(key: MaybeRefOrGetter<string>, _options?: UseStorageOptions) {
  return _useStorage<StorageData>(key, null, undefined);
}
