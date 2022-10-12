import ButtonVue from "@/components/drag-elements/Button/ButtonVue.vue";
import EditTextVue from "@/components/drag-elements/EditText/EditTextVue.vue";
import type { DragComp } from "@/types/CollectComponent";

export default {
  ButtonVue: {
    name: "按钮",
    component: ButtonVue,
    elementType: "基础组件",
  },
  EditTextVue: {
    name: "编辑框",
    component: EditTextVue,
    elementType: "基础组件",
  },
} as {
  [key: string]: DragComp;
};
