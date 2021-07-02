<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.name"
            :value="item._id"
          >
            <span style="float: left">
              {{ item.name }}
            </span>
            <span style="float: right; color: #8492a6; font-size: 12px">
              {{ item._id }}
            </span>
          </el-option>
        </el-select>
      </el-form-item>
      <!--       <el-form-item label="内容">
        <v-md-editor
          v-model="model.body"
          height="500px"
          :disabled-menus="[]"
          @upload-image="handleUploadedImage"
        ></v-md-editor>
      </el-form-item> -->
      <el-form-item label="内容">
        <wang-editor v-model:editorContent="model.body"></wang-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    {{ model }}
  </div>
</template>

<script>
import { ref, watch } from "vue";
// import { useRouter, useRoute } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  articleCreate,
  getArticleById,
  articleUpdate,
  uploadMdImage,
} from "@/http/article";
import { getCategory } from "@/http/category";
import WangEditor from "@/components/wangeditor/WangEditor";
export default {
  name: "ArticleEdit",
  setup(props) {
    // let id = ref();
    const model = ref({});
    const router = useRouter();
    // const route = useRoute();
    const onSubmit = async () => {
      let res;
      if (props.id) {
        res = await articleUpdate(props.id, model.value);
        router.push("/articles/list");
        console.log(res);
        ElMessage.success({
          message: "yosah!!",
          type: "success",
        });
      } else {
        res = await articleCreate(model.value);
        router.push("/articles/list");
        console.log(res);
        ElMessage.success({
          message: "yosh!",
          type: "success",
        });
      }
    };
    // id = route.query.id;

    //若有数据随路由传递，则为编辑分类，获取id对应的数据
    const fetch = async (id) => {
      const res = await getArticleById(id);
      model.value = res.data;
    };
    props.id && fetch(props.id);

    //获取分类数据
    const categories = ref([]);
    const fetchCategories = async () => {
      const res = await getCategory();
      categories.value = res.data;
    };
    fetchCategories();

    //md编辑器上传图片处理
    const handleUploadedImage = async (event, insertImage, file) => {
      console.log(event);
      const formData = new FormData();
      formData.append("file", file[0]);
      const res = await uploadMdImage(formData);
      insertImage({
        url: res.data.url,
        desc: "",
      });
    };

    //监听路由变化初始化数据
    const route = useRoute();
    watch(route, () => {
      if (!route.params.id) {
        model.value = {};
      }
    });
    return {
      model,
      onSubmit,
      fetch,
      categories,
      fetchCategories,
      handleUploadedImage,
      //   id,
    };
  },
  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    WangEditor,
  },
};
</script>

<style></style>
