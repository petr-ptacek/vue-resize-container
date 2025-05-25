import { computed, type MaybeRefOrGetter, readonly, shallowRef, toValue } from "vue";
import type { OriginValue }                                               from "../types";
import type { UseSizeStateReturn }                                        from "./useSizeState";

export type UseExpandOrCollapseOptions = {
  type: "expand" | "collapse";
  alphaSizeState: UseSizeStateReturn;
  betaSizeState: UseSizeStateReturn;
  origin: MaybeRefOrGetter<OriginValue>;
  containerElement: MaybeRefOrGetter<HTMLElement | null>;
  resizerElement: MaybeRefOrGetter<HTMLElement | null>;
};

export function useExpandOrCollapse(
  options: UseExpandOrCollapseOptions
) {
  const {
    alphaSizeState,
    betaSizeState
  } = options;

  const sizesBefore = shallowRef<
    { alpha: number, beta: number } | null
  >(null);

  const isActive = computed(
    () => !!sizesBefore.value
  );

  function activate() {
    const alpha = alphaSizeState.sizePercentage.value;
    const beta = betaSizeState.sizePercentage.value;

    switch ( toValue(options.origin) ) {
      case "alpha":
        switch ( options.type ) {
          case "expand":
            alphaSizeState.setSize("100%");
            betaSizeState.setSize(0);
            break;
          case "collapse":
            alphaSizeState.setSize(0);
            betaSizeState.setSize("100%");
            break;
        }
        break;
      case "beta":
        switch ( options.type ) {
          case "expand":
            alphaSizeState.setSize(0);
            betaSizeState.setSize("100%");
            break;
          case "collapse":
            alphaSizeState.setSize("100%");
            betaSizeState.setSize(0);
            break;
        }
        break;
    }

    sizesBefore.value = {
      alpha,
      beta
    };
  }

  function deactivate() {
    const { beta, alpha } = sizesBefore.value!;

    sizesBefore.value = null;
    alphaSizeState.setSize(`${ alpha }%`);
    betaSizeState.setSize(`${ beta }%`);
  }

  function setActive(value: boolean) {
    if ( value ) {
      activate();
    } else {
      deactivate();
    }
  }

  return {
    isActive,
    sizesBefore: readonly(sizesBefore),
    activate,
    deactivate,
    setActive
  };
}
