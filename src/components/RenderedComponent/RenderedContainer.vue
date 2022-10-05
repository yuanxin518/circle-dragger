<script lang="ts" setup>
import { renderedComponents } from "@/pages/collectComponent";
import { onMounted } from "vue";
import type { DragComp } from "@/pages/collectComponent";
import { toRefs } from "vue";
import {
  useRenderedComponent,
  useComponentEventStates,
} from "./useRenderedComponent";

const states = useComponentEventStates();
const {
  containerStyle,
  maskStyle,
  clickComponent,
  mouseEnter,
  mouseLeave,
  removeFocus,
} = useRenderedComponent(states);

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
  <div class="render_container">
    <div
      class="rendered_container"
      v-for="(item, index) in (renderedComponents as DragComp[])"
      :key="index"
      :style="containerStyle"
      @click="clickComponent"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <div class="click_mask" :style="maskStyle"></div>
      <component :is="item.component" class="renderedComponent"></component>
    </div>
  </div>
</template>

<style scoped>
.render_container {
  width: 100%;
  height: 100%;
}
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
