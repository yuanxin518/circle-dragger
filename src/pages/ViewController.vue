<script lang="ts" setup>
import ICanvas from "../pages/canvas/ICanvas.vue";
import RowRuler from "./canvas/RowRuler.vue";
import ColumnRuler from "./canvas/ColumnRuler.vue";
import { onMounted, ref } from "vue";
import { setRulerSize } from "./canvas/handlerRuler";

const view = ref<HTMLDivElement>();
onMounted(() => {
  if (!view.value) return;
  setRulerSize(view.value.offsetWidth, view.value.offsetHeight);
  window.addEventListener("resize", () => {
    if (!view.value) return;
    setRulerSize(view.value.offsetWidth, view.value.offsetHeight);
  });
});
</script>
<template>
  <div class="view" ref="view">
    <div class="view_ruler">
      <RowRuler></RowRuler>
      <ColumnRuler></ColumnRuler>
    </div>
    <div class="view_controller">
      <div class="inner_controller">
        <ICanvas></ICanvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view {
  background-color: rgba(0, 0, 0, 0.2);
  overflow: auto;
}
.view_controller {
  width: 1920px;
  height: 1080px;
  padding: 66px;
}
.inner_controller {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px 0px;
}
.view_ruler {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  pointer-events: none;
}
</style>
