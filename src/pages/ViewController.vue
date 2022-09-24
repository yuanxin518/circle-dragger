<script lang="ts" setup>
import ICanvas from "../pages/canvas/ICanvas.vue";
</script>
<template>
  <div class="view">
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
  border-radius: 8px;
}
</style>
