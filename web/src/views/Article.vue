<template>
  <div>
    <div class="page-article">
      <div class="d-flex ai-center py-3 border-bottom">
        <div
          class="iconfont icon-back text-article-title fs-xl pl-2"
          @click="$router.go(-1)"
        ></div>
        <div
          class="flex-1 text-ellipsis text-article-title fs-mlg text-bold pr-5"
        >
          {{ articleData.title }}
        </div>
        <div class="text-light-grey fs-sm pr-5">
          {{ dateFormater(articleData.createdAt) }}
        </div>
      </div>
      <div
        class="px-5 w-100 fs-xl article-container"
        v-html="articleData.body"
      ></div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
// import { useRoute } from "vue-router";
import { fetchArticleById } from "@/http/articles";
import { formatMandD } from "@/tool";

export default {
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    // const route = useRoute();
    let articleData = reactive({});
    const fetchArticleData = async () => {
      const res = await fetchArticleById(props.id);
      articleData = Object.assign(articleData, res.data);
    };
    fetchArticleData();

    //date Formate
    const dateFormater = computed(() => {
      return (date) => {
        const tmp = new Date(date);
        return (
          tmp.getFullYear() +
          "-" +
          formatMandD(tmp.getMonth() + 1) +
          "-" +
          formatMandD(tmp.getDate())
        );
      };
    });
    return {
      articleData,
      dateFormater,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/variables";
.article-container {
  line-height: 1.75em;
  p {
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
