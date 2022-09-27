<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { initRuler } from "./handlerRuler";
const rowRuler = ref();

withDefaults(defineProps<{ offset: number }>(), {
  offset: 0,
});

onMounted(() => {
  if (rowRuler.value) {
    initRuler(rowRuler.value, null);
  }
});
</script>
<template>
  <div class="row_container">
    <canvas ref="rowRuler" class="row_ruler" height="20"></canvas>
  </div>
</template>
<style scoped>
.row_container {
  margin-left: 20px;
  width: 100%;
  height: 20px;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
.row_ruler {
  left: 0;
  top: 0;
}
</style>
