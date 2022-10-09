<script lang="ts" setup>
import { useDataControllerStore } from "@/stores/dataController";
import { computed, ref, toRefs, watch, type CSSProperties } from "vue";

const dataControllerStyle = ref<CSSProperties>({});
const dataControllerStore = useDataControllerStore();
const { loadedUniversalAttributes } = toRefs(dataControllerStore);

watch(dataControllerStore, (value) => {
  if (value.isLoadAttribute) {
    dataControllerStyle.value = {
      "min-width": "400px",
    };
  } else {
    dataControllerStyle.value = {
      width: "0px",
    };
  }
});

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
  <div v-if="!dataControllerStore.isLoadAttribute"></div>
  <div class="data_controller" :style="dataControllerStyle" v-else>
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
</template>
<style scoped>
.data_controller {
  transition: all ease-in-out 0.15s;
}
.data_item {
  width: 100%;
}
.data_item .item_title {
  font-size: 24px;
}
</style>
