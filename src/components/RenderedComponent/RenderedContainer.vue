<script lang="ts" setup>
import type { DragComp } from "@/types/CollectComponent";
import { onMounted, ref, watch, type CSSProperties } from "vue";
import { useUniversalAttribute } from "@/components/drag-elements/useAttribute";
import { useDataControllerStore } from "@/stores/dataController";
import { useViewControllerStore } from "@/stores/viewController";
import { toRefs } from "vue";
import {
  useRenderedComponent,
  useComponentEventStates,
} from "./useRenderedComponent";

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
const { isHover, isChecked, isDown, clickPoint, isResize, resizePointIndex } =
  toRefs(states);

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
    if (isResize.value) {
      const resizeClickXPoint = event.clientX - clickPoint.value.x;
      const resizeClickYPoint = event.clientY - clickPoint.value.y;
      if (resizeClickXPoint < 0 || resizeClickYPoint < 0) {
        return;
      }
      let nextResizeWidth = size.value.width;
      let nextResizeHeight = size.value.height;
      switch (resizePointIndex.value) {
        // TODO: 左上角，右上角，左下角的情况
        case 0:
        case 1:
        case 3:
          break;
        case 4:
        case 5:
          nextResizeWidth = event.clientX - clickPoint.value.x;
          break;
        case 2:
        case 6:
          nextResizeHeight = event.clientY - clickPoint.value.y;
          break;
        case 7:
          nextResizeWidth = event.clientX - clickPoint.value.x;
          nextResizeHeight = event.clientY - clickPoint.value.y;
          break;
        default:
          break;
      }
      if (nextResizeHeight + position.value.top > 1080) {
        nextResizeHeight = 1080 - position.value.top;
      } else if (nextResizeWidth + position.value.left > 1920) {
        nextResizeWidth = 1920 - position.value.left;
      }
      size.value.height = nextResizeHeight;
      size.value.width = nextResizeWidth;
    } else {
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
      position.value.left = nextXPoint;
      position.value.top = nextYPoint;
    }
  });
});

const linePoint = (index: number): CSSProperties => {
  let left = "0";
  let top = "0";
  let transform = "translate(-50%,-50%)";
  let cursor = "";

  if ([0, 1, 2].includes(index)) {
    transform = "translate(-50%,-50%)";
    top = "0";
    if (index === 1) {
      left = "50%";
    } else if (index === 2) {
      left = "100%";
    }
  } else if ([3, 4].includes(index)) {
    top = "50%";
    if (index === 4) {
      left = "100%";
    }
  } else if ([5, 6, 7].includes(index)) {
    top = "100%";
    transform = "translate(-50%,-50%)";
    if (index === 6) {
      left = "50%";
    } else if (index === 7) {
      left = "100%";
    }
  }

  switch (index) {
    case 0:
    case 7:
      cursor = "se-resize";
      break;
    case 1:
    case 6:
      cursor = "ns-resize";
      break;
    case 2:
    case 5:
      cursor = "nesw-resize";
      break;
    case 3:
    case 4:
      cursor = "ew-resize";
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

const linePointMouse = (event: MouseEvent, index: number) => {
  isResize.value = true;
  clickPoint.value.x = event.clientX;
  clickPoint.value.y = event.clientY;
  resizePointIndex.value = index;
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
      width: `${size.width}px`,
      height: `${size.height}px`,
    }"
    @click="clickComponent"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @mousedown="mouseDown"
  >
    <div class="click_mask" :style="maskStyle">
      <div
        v-for="(item, index) in 8"
        :key="index"
        :style="linePoint(index)"
        @mousedown="linePointMouse($event, index)"
      ></div>
    </div>
    <component
      :is="renderedComponent.component"
      :key="renderedComponent.key"
      :style="{
        left: 0,
        top: 0,
        position: `absolute`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }"
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
