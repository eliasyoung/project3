<template>
  <div>
    <div class="topbar bg-black py-2 px-5 d-flex ai-center">
      <img src="~@/assets/images/logo.png" alt="" height="33" />
      <div class="pl-4 flex-1 ">
        <div class="text-white fs-lg">王者荣耀</div>
        <div class="text-light-grey fs-sm">团队成就更多</div>
      </div>
      <button class="btn bg-primary fs-sm" type="button">立即下载</button>
    </div>
    <top-nav></top-nav>
    <router-view />
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
export default {
  name: "MainPage",
  setup() {},
  components: {
    TopNav,
  },
};
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 9
}
</style>
