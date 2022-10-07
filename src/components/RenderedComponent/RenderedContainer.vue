<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { toRefs } from "vue";

import {
  useRenderedComponent,
  useComponentEventStates,
} from "./useRenderedComponent";
import { useViewControllerStore } from "@/stores/viewController";
import type { DragComp } from "@/types/CollectComponent";

type IRenderedContainer = {
  renderedComponent: DragComp;
};
const props = withDefaults(defineProps<IRenderedContainer>(), {});

const states = useComponentEventStates(props);
const {
  containerStyle,
  maskStyle,
  clickComponent,
  mouseEnter,
  mouseLeave,
  mouseDown,
} = useRenderedComponent(props, states);

const { isHover, isChecked, isDown, offsetX, offsetY, clickPoint } =
  toRefs(states);
const { viewControllerConfig } = useViewControllerStore();
const { width, height } = viewControllerConfig;
const renderedContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  window.addEventListener("click", () => {
    if (!isHover.value) {
      isChecked.value = false;
    }
  });
  window.addEventListener("mouseup", () => {
    isDown.value = false;
    window.isDown = false;
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDown.value || !isChecked.value) return;
    let nextXPoint = event.clientX - clickPoint.value.x;
    let nextYPoint = event.clientY - clickPoint.value.y;

    if (nextXPoint <= 0) {
      nextXPoint = 0;
    }
    if (
      renderedContainer.value &&
      nextXPoint >= width - renderedContainer.value?.clientWidth
    ) {
      nextXPoint = width - renderedContainer.value?.clientWidth;
    }
    if (nextYPoint <= 0) {
      nextYPoint = 0;
    }
    if (
      renderedContainer.value &&
      nextYPoint >= height - renderedContainer.value.clientHeight
    ) {
      nextYPoint = height - renderedContainer.value.clientHeight;
    }
    offsetX.value = nextXPoint;
    offsetY.value = nextYPoint;
  });
});
</script>
<template>
  <div
    class="rendered_container"
    ref="renderedContainer"
    :style="{ ...containerStyle, left: `${offsetX}px`, top: `${offsetY}px` }"
    @click="clickComponent"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @mousedown="mouseDown"
  >
    <div class="click_mask" :style="maskStyle"></div>
    <component
      :is="renderedComponent.component"
      :key="renderedComponent.key"
      class="renderedComponent"
    ></component>
  </div>
</template>

<style scoped>
.rendered_container {
  display: block;
  position: absolute;
  user-select: none;
}
.renderedComponent {
  pointer-events: none;
}
.click_mask {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;

  transition: all ease-in-out 0.1s;
}
</style>
