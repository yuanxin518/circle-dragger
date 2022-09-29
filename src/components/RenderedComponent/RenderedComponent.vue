<script lang="ts" setup>
import useComponentEvent from "./useComponentEvent";
const { containerStyle, clickComponent } = useComponentEvent();

withDefaults(
  defineProps<{
    componentConfig: any;
  }>(),
  {}
);
</script>
<template>
  <div
    class="rendered_container"
    :style="containerStyle"
    @click="clickComponent($event)"
  >
    <div class="click_mask"></div>
    <component
      :is="componentConfig.component"
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
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px solid skyblue;
}
</style>
