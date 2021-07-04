<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}用户</h1>
    <el-form label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
  admin_userCreate,
  getAdminUserById,
  admin_userUpdate,
} from "@/http/admin_user";
export default {
  name: "AdminUserEdit",
  setup(props) {
    // let id = ref();
    const model = ref({});
    const router = useRouter();
    // const route = useRoute();
    const onSubmit = async () => {
      let res;
      if (props.id) {
        res = await admin_userUpdate(props.id, model.value);
        router.push("/admin_users/list");
        console.log(res);
        ElMessage.success({
          message: "yosah!!",
          type: "success",
        });
      } else {
        res = await admin_userCreate(model.value);
        router.push("/admin_users/list");
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
      const res = await getAdminUserById(id);
      model.value = res.data;
    };
    props.id && fetch(props.id);

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
