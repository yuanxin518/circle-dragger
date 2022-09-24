<script lang="ts" setup>
import ElementHolder from "../components/ElementHolder.vue";
import { compBucket } from "./collectComponent";
</script>
<template>
  <div class="left_panel">
    <ElementHolder
      v-for="item in compBucket"
      :key="item[1].key"
      :compName="item[0]"
    ></ElementHolder>
  </div>
</template>
<style scoped>
.left_panel {
  flex-shrink: 0;
  width: 300px;
  height: fit-content;
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
