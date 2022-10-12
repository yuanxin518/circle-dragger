import type { Component } from "vue";

export type ElementType = "基础组件";
export type DragComp = {
  key?: number;
  component: Component;
  name: string;
  elementType: ElementType;
};
