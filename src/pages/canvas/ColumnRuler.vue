<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { initRuler } from "./handlerRuler";

const columnRuler = ref();

onMounted(() => {
  if (columnRuler.value) {
    initRuler(null, columnRuler.value);
  }
});
</script>
<template>
  <div class="column_container">
    <canvas ref="columnRuler" class="column_ruler"></canvas>
  </div>
</template>
<style scoped>
.column_container {
  width: 20px;
  height: 100%;
}
.column_ruler {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
