<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    :autoplay="{ disableOnInteraction: false }"
    :pagination="pagination"
  >
    <!-- <swiper-slide v-for="(image, index) in swiperImages" :key="index">
      <img :src="image" alt="" />
    </swiper-slide> -->
    <!-- <swiper-slide virtualIndex="1">
      <img class="w-100" src="~@/assets/images/testImage/1.jpeg" alt="" />
    </swiper-slide>
    <swiper-slide virtualIndex="2">
      <img class="w-100" src="~@/assets/images/testImage/2.jpeg" alt="" />
    </swiper-slide>
    <swiper-slide virtualIndex="3">
      <img class="w-100" src="~@/assets/images/testImage/3.jpeg" alt="" />
    </swiper-slide> -->
    <swiper-slide>
      <img class="w-100" src="~@/assets/images/testImage/1.jpeg" alt="" />
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="~@/assets/images/testImage/2.jpeg" alt="" />
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="~@/assets/images/testImage/3.jpeg" alt="" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { ref } from "vue";
import SwiperCore, { Autoplay, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
// import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
// import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Autoplay, Pagination, A11y]);
export default {
  name: "SwiperComponent",
  props: {
    swiperImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const pagination = ref();
    pagination.value = {
      clickable: true,
    };
    return {
      pagination,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/variables.scss";
.swiper-pagination {
  text-align: right !important;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.25rem;
  .swiper-pagination-bullet {
    background: map-get($colors, "white");
    opacity: 1;
    border-radius: 0.153846rem;
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.5rem !important;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info") !important;
    }
  }
}
</style>
