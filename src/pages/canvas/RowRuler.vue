<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { getCustomStyle } from "./getRulerStyle";
import { initRuler } from "./handlerRuler";

const style = computed(() => {
  return getCustomStyle("row");
});
const rowRuler = ref();

onMounted(() => {
  if (rowRuler.value) {
    initRuler(rowRuler.value, null);
  }
});
</script>
<template>
  <div class="row_container" :style="style">
    <canvas ref="rowRuler" class="row_ruler" height="20"></canvas>
  </div>
</template>
<style scoped>
.row_container {
  margin-left: 20px;
  width: 100%;
  height: 20px;
}
.row_ruler {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
