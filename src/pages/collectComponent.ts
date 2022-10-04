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

/**
 * 将expose暴露出来的所有组件整合到Bucket中
 */
for (const item of Object.entries(DragElements)) {
  defineDragComp(item[0], {
    key: compBucket.size,
    component: item[1],
  });
}
/**
 *在bucket中寻找对应组件名字的对象，然后将其添加到renderedComponents中
 * @param compName
 */
export const renderComponent = (compName: string) => {
  const dragComp = compBucket.get(compName);

  if (dragComp) {
    renderedComponents.push(dragComp);
  }
  console.log(renderedComponents);
};

export { compBucket };
