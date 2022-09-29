<script lang="ts" setup>
import { renderedComponents } from "@/pages/collectComponent";
import { onMounted } from "vue";
import RenderedComponent from "./RenderedComponent.vue";

onMounted(() => {
  window.addEventListener("click", (event) => {
    console.log(event);
  });
});
</script>
<template>
  <div class="render_container">
    <RenderedComponent
      v-for="(item, index) in renderedComponents"
      :key="index"
      :componentConfig="item"
    ></RenderedComponent>
  </div>
</template>

<style scoped>
.render_container {
  width: 100%;
  height: 100%;
}
</style>
