<template>
  <div class="home">
    <swiper-component></swiper-component>
    <!--- end of top slide --->
    <!-- sprite -->
    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap jc-center">
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-coming"></i>
          <div>爆料站</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-story"></i>
          <div>故事站</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-mall"></i>
          <div>周边商城</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-tyf"></i>
          <div>体验服</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-xrzq"></i>
          <div>新人专区</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-memory"></i>
          <div>荣耀·传承</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-camp"></i>
          <div>王者营地</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-mp"></i>
          <div>公众号</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-bbjs"></i>
          <div>爆料站</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-station"></i>
          <div>爆料站</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-ipgc"></i>
          <div>爆料站</div>
        </div>
        <div class="nav-item w-25 mt-4 mb-5 ">
          <i class="sprite sprite-cyhd"></i>
          <div>爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-md">
        <i class="sprite sprite-arrow mr-1"></i><span>收起</span>
      </div>
    </div>
    <!-- end of sprite-nav-icons -->
    <p-list-card
      title="新闻资讯"
      icon="Menu"
      :categories="newsCats"
      clickForMore
    >
      <template #default="{swipeContent}">
        <router-link
          v-for="(news, index) in swipeContent.newsList"
          :key="index"
          :to="`/articles/${news._id}`"
          custom
          v-slot="{ navigate }"
        >
          <div class="d-flex ai-center news-wrapper mb-5" @click="navigate">
            <span
              class="news-tag fs-sm"
              :class="getNewsTagClass(news.categoryName)"
              >{{ news.categoryName }}</span
            >
            <span class="flex-1 px-3 fs-mlg text-ellipsis">{{
              news.title
            }}</span>
            <span class="text-light-grey">{{
              dateFormater(news.createdAt)
            }}</span>
          </div>
        </router-link>
      </template>
    </p-list-card>
    <!--- end of newslist -->
    <p-list-card
      title="英雄列表"
      icon="card-hero"
      clickForMore
      :categories="heroCats"
      headerBanner="https://ossweb-img.qq.com/upload/webplat/info/yxzj/20210623/39070448590418.jpg"
    >
      <template #default="{swipeContent}">
        <div class="herolist-wrapper d-flex ai-center jc-start mb-2 flex-wrap">
          <div
            class="hero-wrapper text-center px-2 pb-3"
            v-for="(hero, index) in swipeContent.heroList"
            :key="index"
          >
            <img class="w-100" :src="hero.avatar" alt="" />
            <span>{{ hero.name }}</span>
          </div>
        </div>
      </template>
    </p-list-card>
    <!--- end of herolist -->
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, computed } from "vue";
import { fetchNewsData, fetchHeroData } from "@/http/home";
import SwiperComponent from "@/components/SwiperComponent";
import PListCard from "@/components/PListCard";
import { formatMandD } from "@/tool";
export default {
  name: "Home",
  setup() {
    //get newsData
    let newsCats = reactive([]);
    const fetchNewsCats = async () => {
      const res = await fetchNewsData();
      newsCats.push(...res.data);
    };
    fetchNewsCats();

    // getNewsCategory and define class
    const getNewsTagClass = computed(() => (category) => {
      return newsTagClassGetter(category);
    });

    // date format
    const dateFormater = computed(() => {
      return (date) => {
        const tmp = new Date(date);
        return (
          formatMandD(tmp.getMonth() + 1) + "/" + formatMandD(tmp.getDate())
        );
      };
    });

    // get HeroData
    let heroCats = reactive([]);
    const fetchHeroCats = async () => {
      const res = await fetchHeroData();
      heroCats.push(...res.data);
    };
    fetchHeroCats();

    return {
      newsCats,
      getNewsTagClass,
      dateFormater,
      heroCats,
    };
  },
  components: {
    SwiperComponent,
    PListCard,
  },
};

function newsTagClassGetter(c) {
  switch (c) {
    case "热门":
      return "news-hot";
    case "活动":
      return "news-activity";
    case "新闻":
      return "news-news";
    case "赛事":
      return "news-match";
    case "公告":
      return "news-announcement";
    default:
      return "news-hot";
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/variables";
.nav-icons {
  // border-top: 1px solid $border-color;
  // border-bottom: 1px solid $border-color;
  .nav-item {
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}

// news-list
.news-wrapper {
  span {
    &.news-tag {
      border: 1px solid map-get($colors, "announcement");
      border-radius: 0.2rem;
      padding: 0.02rem 0.16rem;
      line-height: 1.2rem;
      &.news-hot {
        color: map-get($colors, "activity");
        border-color: map-get($colors, "activity");
      }
      &.news-activity {
        color: map-get($colors, "activity");
        border-color: map-get($colors, "activity");
      }
      &.news-announcement {
        color: map-get($colors, "announcement");
        border-color: map-get($colors, "announcement");
      }
      &.news-match {
        color: map-get($colors, "match");
        border-color: map-get($colors, "match");
      }
      &.news-news {
        color: map-get($colors, "news");
        border-color: map-get($colors, "news");
      }
    }
  }
}

.herolist-wrapper {
  margin: 0 -0.5rem;
  .hero-wrapper {
    width: 20%;
    span {
      display: block;
      width: 100%;
    }
  }
}
</style>
