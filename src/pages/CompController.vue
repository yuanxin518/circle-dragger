<template>
  <div class="left_panel">
    <slot></slot>
  </div>
</template>
<style scoped>
.left_panel {
  width: 300px;
  height: fit-content;
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
