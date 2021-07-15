<template>
  <div class="card px-5 bg-white mt-3">
    <div class="card-header py-5 mb-5 d-flex">
      <i
        :class="'iconfont fs-xl ' + `icon-${icon}`"
        style="font-weight:bolder"
      ></i>
      <div class="fs-xxl flex-1 px-2">{{ title }}</div>
      <i class="iconfont icon-menu-p fs-xxxxl"></i>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }

  .card-body {
  }
}
</style>
