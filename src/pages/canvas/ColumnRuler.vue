<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { initRuler } from "./handlerRuler";

const columnRuler = ref();
withDefaults(defineProps<{ offset: number }>(), {
  offset: 0,
});

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
  position: sticky;
  position: -webkit-sticky;
  left: 0;
  top: 0;
}
.column_ruler {
  top: 0;
  left: 0;
}
</style>
