<script lang="ts" setup>
import { computed } from "vue";
import { customStyle } from "./getRulerStyle";

const style = computed(() => {
  return customStyle("row");
});
</script>
<template>
  <div class="row_ruler" :style="style"></div>
</template>
<style scoped>
.row_ruler {
  width: 100%;
  height: 20px;
}
</style>
