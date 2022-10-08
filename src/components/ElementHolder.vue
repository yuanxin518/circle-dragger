<script lang="ts" setup>
import { useRenderConponentStore } from "@/stores/renderComponent";

const { renderComponent } = useRenderConponentStore();
type IElementHolder = {
  compName: {
    keyName: string;
    name: string;
  };
};
withDefaults(defineProps<IElementHolder>(), {});
</script>
<template>
  <div class="element_holder">
    <div class="holder_content" @click="renderComponent(compName.keyName)">
      {{ compName.name }}
    </div>
  </div>
</template>

<style scoped>
.element_holder {
  height: 80px;
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
