<script lang="ts" setup>
import { computed } from "vue";
import { customStyle } from "./getRulerStyle";

const style = computed(() => {
  return customStyle("column");
});
</script>
<template>
  <div class="column_ruler" :style="style"></div>
</template>
<style scoped>
.column_ruler {
  width: 20px;
  height: 100%;
}
</style>
