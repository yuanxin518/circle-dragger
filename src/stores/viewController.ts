import { reactive } from "vue";
import { defineStore } from "pinia";

export const useViewControllerStore = defineStore("viewController", () => {
  const viewControllerConfig = reactive({
    width: 1920,
    height: 1080,
  });

  return { viewControllerConfig };
});
