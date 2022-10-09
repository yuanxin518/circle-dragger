import { defineStore } from "pinia";
import type { ComponentAttribute } from "@/types/ComponentAttribute";
import { ref } from "vue";

export const useDataControllerStore = defineStore("dataController", () => {
  const isLoadAttribute = ref(false);
  const loadedUniversalAttributes = ref<ComponentAttribute.UniversalAttrType>(
    {} as ComponentAttribute.UniversalAttrType
  );

  const loadAttribute = (attributes: ComponentAttribute.UniversalAttrType) => {
    isLoadAttribute.value = true;
    loadedUniversalAttributes.value = attributes;
  };

  const cancelLoadAttribute = () => {
    isLoadAttribute.value = false;
  };

  return {
    loadAttribute,
    isLoadAttribute,
    cancelLoadAttribute,
    loadedUniversalAttributes,
  };
});
