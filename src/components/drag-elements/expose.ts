import type { Component } from "vue";
import ButtonVue from "./Button/ButtonVue.vue";
import EditTextVue from "./EditText/EditTextVue.vue";

type ExportComponent = {
  [key: string]: {
    name: "string";
    component: Component;
  };
};

export default {
  ButtonVue: {
    name: "按钮",
    component: ButtonVue,
  },
  EditTextVue: {
    name: "编辑框",
    component: EditTextVue,
  },
} as unknown as ExportComponent;
