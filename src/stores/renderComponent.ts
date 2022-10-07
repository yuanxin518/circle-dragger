import { defineStore } from "pinia";
import { shallowReactive } from "vue";
import * as DragElements from "@/components/drag-elements/expose";
import type { DragComp } from "@/types/CollectComponent";

export const useRenderConponentStore = defineStore("renderComponent", () => {
  const renderedComponents = shallowReactive<any[]>([] as DragComp[]);
  const compBucket = new Map<string, DragComp>();

  // 引入所有内置的组件并渲染到CompController的容器中
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
  const renderComponent = (compName: string) => {
    const dragComp = compBucket.get(compName);

    if (dragComp) {
      dragComp.key = renderComponent.length;
      renderedComponents.push(dragComp);
    }
  };
  return {
    renderedComponents,
    compBucket,
    renderComponent,
  };
});
