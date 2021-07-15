<template>
  <div class="card px-5 bg-white mt-4">
    <div class="card-header py-5 mb-4">
      <div class="d-flex">
        <i
          :class="'iconfont fs-xl ' + `icon-${icon}`"
          style="font-weight:bolder"
        ></i>
        <div class="fs-xxl flex-1 px-2">{{ title }}</div>
        <i
          v-if="clickForMore"
          class="iconfont icon-menu-p fs-xxxxl"
        ></i>
      </div>
      <div v-if="headerBanner" class="header-banner mt-4">
        <img :src="headerBanner" alt="" />
      </div>
    </div>

    <!--- end of header --->
    <div class="card-body">
      <div class="nav d-flex jc-between fs-lg">
        <div
          v-for="(category, index) in categories"
          :key="category.name"
          class="nav-item"
        >
          <span
            class="nav-link"
            :class="{ active: index === currentIndex }"
            @click="changeSlide(index)"
            >{{ category.name }}</span
          >
        </div>
      </div>
      <!--- end of card nav --->
      <div class="swiper-container mt-5">
        <swiper
          :slides-per-view="1"
          :space-between="50"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          autoHeight
        >
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot :swipeContent="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
      <!--- end of card swiper content --->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
// import PCard from "@/components/PCard";
export default {
  name: "PListCard",
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: {
      type: Array,
      required: true,
    },
    clickForMore: {
      type: Boolean,
      default() {
        return undefined;
      },
    },
    headerBanner: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    // PCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const currentIndex = ref();
    currentIndex.value = 0;

    //swiper:
    //get swiper instance & define slide change event
    const swiperInstance = ref();
    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };
    const onSlideChange = (swiper) => {
      currentIndex.value = swiper.activeIndex;
    };

    //click event: change slide
    const changeSlide = (i) => {
      swiperInstance.value.slideTo(i);
    };

    return {
      currentIndex,
      onSwiper,
      onSlideChange,
      changeSlide,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
    .header-banner {
      img {
        width: 100%;
      }
    }
  }

  .card-body {
  }
}
</style>
