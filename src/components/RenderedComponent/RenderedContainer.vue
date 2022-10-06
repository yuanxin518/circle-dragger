<script lang="ts" setup>
import { onMounted } from "vue";
import type { DragComp } from "@/pages/collectComponent";
import { toRefs } from "vue";
import {
  useRenderedComponent,
  useComponentEventStates,
} from "./useRenderedComponent";

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
  removeFocus,
} = useRenderedComponent(props, states);

const { isHover, isChecked } = toRefs(states);

onMounted(() => {
  window.addEventListener("click", (event) => {
    if (!isHover.value) {
      isChecked.value = false;
      removeFocus();
    }
  });
});
</script>
<template>
  <div
    class="rendered_container"
    :style="containerStyle"
    @click="clickComponent"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
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
