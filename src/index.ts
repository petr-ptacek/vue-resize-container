import VueResizeContainerSection from "./components/ResizeContainerSection.vue";
import VueResizeContainer from "./VueResizeContainer.vue";

export * from "./types";

export { VueResizeContainer, VueResizeContainerSection };

if (import.meta.env.PROD) {
  import("./assets/styles/main.css");
}
