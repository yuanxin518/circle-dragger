import type { Component } from "vue";
import * as DragElements from "../components/drag-elements/expose";

// 引入所有内置的组件并渲染到CompController的容器中
const compBucket = new Map();
const defineDragComp = (
  compName: string,
  comp: {
    key: number;
    component: Component;
  }
) => {
  if (compBucket.has(compName)) {
    throw new Error(`there also exists a component named compName`);
  }
  compBucket.set(compName, comp);
};

for (const item of Object.entries(DragElements)) {
  defineDragComp(item[0], {
    key: compBucket.size,
    component: item[1],
  });
}

export { compBucket };
