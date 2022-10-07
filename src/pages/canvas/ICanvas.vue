<script lang="ts" setup>
import { onMounted, ref } from "vue";
import getMousePosition from "./getMousePosition";

const dragCanvas = ref<HTMLDivElement | null>(null);

onMounted(() => {
  dragCanvas.value?.addEventListener("mouseenter", () => {
    console.log("enter");
  });
  dragCanvas.value?.addEventListener("mouseleave", () => {
    console.log("leave");
  });
  dragCanvas.value?.addEventListener("mousemove", (event) => {
    const offsetProps = getMousePosition(event);
  });
});
</script>

<template>
  <div class="circledrag-canvas" ref="dragCanvas">
    <slot></slot>
  </div>
</template>

<style scoped>
.circledrag-canvas {
  width: 100%;
  height: 100%;
}
</style>
