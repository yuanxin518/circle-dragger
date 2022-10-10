<script lang="ts" setup>
import type { DragComp } from "@/types/CollectComponent";
import { onMounted, ref, watch, type CSSProperties } from "vue";
import { useUniversalAttribute } from "@/components/drag-elements/useAttribute";
import { toRefs } from "vue";
import {
  useRenderedComponent,
  useComponentEventStates,
} from "./useRenderedComponent";

import { useDataControllerStore } from "@/stores/dataController";
import { useViewControllerStore } from "@/stores/viewController";

type IRenderedContainer = {
  renderedComponent: DragComp;
};
const renderedComponentInstance = ref(null);
const props = withDefaults(defineProps<IRenderedContainer>(), {});
const { viewControllerConfig } = useViewControllerStore();
const { loadAttribute, cancelLoadAttribute } = useDataControllerStore();
const states = useComponentEventStates(props);
const attrs = useUniversalAttribute();
const { width, height } = viewControllerConfig;
const renderedContainer = ref<HTMLDivElement | null>(null);

const {
  containerStyle,
  maskStyle,
  clickComponent,
  mouseEnter,
  mouseLeave,
  mouseDown,
  getMoveableStyle,
  getDefaultStyle,
  getHoverStyle,
  unFocusStyle,
} = useRenderedComponent(props, states);

const { position, size } = toRefs(attrs);
const { isHover, isChecked, isDown, clickPoint, isResize } = toRefs(states);

const cancelCheck = () => {
  if (!isHover.value) {
    isChecked.value = false;
  }
};

defineExpose(cancelCheck);

watch(states, (value) => {
  if (value.isChecked) {
    containerStyle.value = getMoveableStyle();
    maskStyle.value = getHoverStyle();
    loadAttribute(attrs);
  } else {
    maskStyle.value = unFocusStyle();
    containerStyle.value = getDefaultStyle();
    cancelLoadAttribute();
  }

  if (value.isHover) {
    if (!states.isChecked) {
      maskStyle.value = getDefaultStyle();
    }
    maskStyle.value = getHoverStyle();
  } else {
    if (!states.isChecked) {
      maskStyle.value = unFocusStyle();
    }
  }
});

onMounted(() => {
  window.addEventListener("mouseup", () => {
    isDown.value = false;
    window.isDown = false;
    isResize.value = false;
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDown.value || !isChecked.value || isResize.value) return;
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
    position.value.left = nextXPoint;
    position.value.top = nextYPoint;
  });
});

const linePoint = (index: number): CSSProperties => {
  index = index + 1;
  let left = "0";
  let top = "0";
  let transform = "translate(-50%,-50%)";
  let cursor = "";

  if ([1, 2, 3].includes(index)) {
    transform = "translate(-50%,-50%)";
  }
  if ([4, 5, 6].includes(index)) {
    transform = "translate(-50%,-50%)";
    top = "100%";
  }
  if ([2, 4].includes(index)) {
    left = "50%";
  }

  if ([3, 6].includes(index)) {
    transform = "translate(-50%,-50%)";
    left = "100%";
  }

  switch (index) {
    case 1:
    case 6:
      cursor = "se-resize";
      break;
    case 2:
    case 4:
      cursor = "ns-resize";
      break;
    case 3:
    case 5:
      cursor = "nesw-resize";
      break;
    default:
      break;
  }

  return {
    width: "8px",
    height: "8px",
    backgroundColor: "#44aaff",
    borderRadius: "50%",
    position: "absolute",
    pointerEvents: "all",
    transform,
    left,
    top,
    cursor,
  };
};

const linePointMouse = () => {
  isResize.value = true;
};
</script>
<template>
  <div
    class="rendered_container"
    ref="renderedContainer"
    :style="{
      ...containerStyle,
      left: `${position.left}px`,
      top: `${position.top}px`,
    }"
    @click="clickComponent"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @mousedown="mouseDown"
  >
    <div class="click_mask" :style="maskStyle">
      <div
        v-for="(item, index) in 6"
        :key="index"
        @mouseenter="linePointMouse()"
        :style="linePoint(index)"
      ></div>
    </div>
    <component
      :is="renderedComponent.component"
      :key="renderedComponent.key"
      :style="{ width: `${size.width}px`, height: `${size.height}px` }"
      ref="renderedComponentInstance"
      class="renderedComponent"
    ></component>
  </div>
</template>

<style scoped>
.rendered_container {
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
