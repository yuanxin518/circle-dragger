import type { ComponentAttribute } from "@/types/ComponentAttribute";
import { reactive } from "vue";

export const useUniversalAttribute =
  (): ComponentAttribute.UniversalAttrType => {
    return reactive({
      position: {
        left: 0,
        top: 0,
      },
      size: {
        width: 200,
        height: 40,
      },
    });
  };
