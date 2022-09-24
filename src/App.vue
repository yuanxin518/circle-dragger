<script setup lang="ts">
import ViewController from "./pages/ViewController.vue";
import CompController from "./pages/CompController.vue";
import DataController from "./pages/DataController.vue";
import ElementHolder from "./components/ElementHolder.vue";

const projectConfig = {
  name: "circle-dragger",
};
document.title = projectConfig.name;
</script>

<template>
  <div class="controller">
    <CompController> </CompController>
    <ViewController></ViewController>
    <DataController></DataController>
  </div>
</template>

<style scoped>
.controller {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
