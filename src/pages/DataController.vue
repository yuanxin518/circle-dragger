<script lang="ts" setup>
import { useDataControllerStore } from "@/stores/dataController";
import { computed, toRefs } from "vue";

const dataControllerStore = useDataControllerStore();
const { loadedUniversalAttributes } = toRefs(dataControllerStore);

const attributes = computed(() => {
  return loadedUniversalAttributes.value;
});

const handlerAttribute = computed(() => {
  const { position, size } = attributes.value;
  return [
    {
      title: "位置",
      item: [
        {
          name: "左距离",
          key: "left",
          value: position.left,
        },
        {
          name: "上距离",
          key: "top",
          value: position.top,
        },
      ],
    },
    {
      title: "大小",
      item: [
        {
          name: "宽度",
          key: "width",
          value: size.width,
        },
        {
          name: "高度",
          key: "height",
          value: size.height,
        },
      ],
    },
  ];
});
</script>
<template>
  <Transition>
    <div class="data_controller" v-if="dataControllerStore.isLoadAttribute">
      <div
        class="data_item"
        v-for="(item, index) in handlerAttribute"
        :key="index"
      >
        <div class="item_title">
          <div>{{ item.title }}</div>
        </div>
        <div
          class="item_content"
          v-for="(child, cIndex) in item.item"
          :key="cIndex"
        >
          <div>{{ child.name }}</div>
          <div>{{ child.value }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.data_controller {
  min-width: 400px;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  min-width: 0;
}

.data_item {
  width: 100%;
}
.data_item .item_title {
  font-size: 24px;
}
</style>
