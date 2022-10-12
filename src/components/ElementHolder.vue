<script lang="ts" setup>
import { useRenderConponentStore } from "@/stores/renderComponent";
import type { DragComp, ElementType } from "@/types/CollectComponent";
import { computed, render } from "vue";

const { renderComponent } = useRenderConponentStore();
type IElementHolder = {
  compList: Map<string, DragComp>;
};
const props = withDefaults(defineProps<IElementHolder>(), {});

const handlerCompList = computed(() => {
  const bucket = {} as Record<ElementType, Record<string, DragComp>>;

  for (const [item, obj] of props.compList) {
    if (!bucket[obj.elementType]) {
      bucket[obj.elementType] = {};
    }
    bucket[obj.elementType][item] = obj;
  }
  return bucket;
});
</script>
<template>
  <div class="element_holder">
    <div
      class="holder_group"
      v-for="(item, titleKey) in handlerCompList"
      :key="titleKey"
    >
      {{ titleKey }}

      <div
        class="holder_item"
        v-for="(element, eleKey) in item"
        :key="eleKey"
        @click="renderComponent(eleKey)"
      >
        {{ element.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.element_holder {
  height: 80px;
  padding: 4px;
}
.holder_item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: all ease-in-out 0.15s;
}
.holder_item:hover {
  cursor: pointer;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
