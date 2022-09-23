<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

type IElementHolder = {
  compName: string;
};
const props = withDefaults(defineProps<IElementHolder>(), {
  compName: "",
});
// const CurrentComponent = defineAsyncComponent(
//   () => import(`./drag-elements/${props.compName}.vue`)
// );
</script>
<template>
  <div class="element_holder">
    <div class="holder_content">{{ props.compName }}</div>
    <!-- <CurrentComponent></CurrentComponent> -->
  </div>
</template>

<style scoped>
.element_holder {
  aspect-ratio: 1/1;
  padding: 4px;
}
.holder_content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: all ease-in-out 0.15s;
}
.holder_content:hover {
  cursor: pointer;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
