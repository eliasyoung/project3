<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
// import { useRouter, useRoute } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  categoryCreate,
  getCategoryById,
  categoryUpdate,
} from "../http/category";
export default {
  name: "CategoryEdit",
  setup(props) {
    // let id = ref();
    const model = ref({});
    const router = useRouter();
    // const route = useRoute();
    const onSubmit = async () => {
      let res;
      if (props.id) {
        res = await categoryUpdate(props.id, model.value);
        router.push("/categories/list");
        console.log(res);
        ElMessage.success({
          message: "yosah!!",
          type: "success",
        });
      } else {
        res = await categoryCreate(model.value);
        router.push("/categories/list");
        console.log(res);
        ElMessage.success({
          message: "yosh!",
          type: "success",
        });
      }
    };
    // id = route.query.id;
    const fetch = async (id) => {
      const res = await getCategoryById(id);
      model.value = res.data;
    };
    props.id && fetch(props.id);
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
};
</script>

<style></style>
