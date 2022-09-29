import { shallowReactive, type Component } from "vue";
import * as DragElements from "../components/drag-elements/expose";

export type DragComp = {
  key: number;
  component: Component;
};
// 引入所有内置的组件并渲染到CompController的容器中
const compBucket = new Map<string, DragComp>();
export const renderedComponents = shallowReactive<any[]>([] as DragComp[]);

const defineDragComp = (compName: string, comp: DragComp) => {
  if (compBucket.has(compName)) {
    throw new Error(`there also exists a component named` + compName);
  }
  compBucket.set(compName, comp);
};

for (const item of Object.entries(DragElements)) {
  defineDragComp(item[0], {
    key: compBucket.size,
    component: item[1],
  });
}

export const renderComponent = (compName: string) => {
  const dragComp = compBucket.get(compName);

  if (dragComp) {
    renderedComponents.push(dragComp);
  }
  console.log(renderedComponents);
};

export { compBucket };
