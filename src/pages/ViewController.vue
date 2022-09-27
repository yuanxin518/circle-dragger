<script lang="ts" setup>
import ICanvas from "../pages/canvas/ICanvas.vue";
import RowRuler from "./canvas/RowRuler.vue";
import ColumnRuler from "./canvas/ColumnRuler.vue";
import { onMounted, ref } from "vue";
import { setRulerSize } from "./canvas/handlerRuler";

const viewController = ref<HTMLDivElement>();
const view = ref<HTMLDivElement>();

onMounted(() => {
  if (!viewController.value) return;
  setRulerSize(
    viewController.value.offsetWidth,
    viewController.value.offsetHeight
  );

  window.addEventListener("resize", () => {
    if (!viewController.value) return;
    setRulerSize(
      viewController.value.offsetWidth,
      viewController.value.offsetHeight
    );
  });
});
</script>
<template>
  <div class="view" ref="view">
    <div class="container">
      <div class="view_controller" ref="viewController">
        <!-- //TODO: encapsulate rulersetting -->
        <div class="view_ruler">
          <span class="ruler_setting"></span>
          <RowRuler></RowRuler>
          <ColumnRuler></ColumnRuler>
        </div>
        <div class="inner_controller">
          <ICanvas></ICanvas>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view {
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform: translateX(0);
}
.container {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.view_controller {
  width: 1920px;
  height: 1080px;
  padding: 66px;
  box-sizing: content-box;
}
.inner_controller {
  width: 1920px;
  height: 1080px;
  background-color: #f0f0f0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px 0px;
}
.view_ruler {
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.ruler_setting {
  position: fixed;
  z-index: 4;
  left: 0;
  top: 0;
  display: block;
  background-color: red;
  width: 20px;
  height: 20px;
}

.view::-webkit-scrollbar {
  width: 20px;
  height: 8px;
}
</style>
