<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button size="mini" type="primary" @click="model.items.push({})"
        ><i class="el-icon-plus" />添加广告图</el-button
      >
      <el-row type="flex" justify="space-around" style="flex-wrap:wrap">
        <el-col
          :md="22"
          v-for="(item, index) in model.items"
          :key="index"
          style="margin-top:2rem"
        >
          <el-card shadow="always">
            <template #header>
              <div
                style="display:flex;justify-content:space-between;align-items:center"
              >
                <h1>{{ index + 1 }}</h1>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="small"
                  @click="removeAd(index)"
                ></el-button>
              </div>
            </template>
            <el-form-item label="图片" label-width="80px">
              <el-upload
                class="avatar-uploader"
                :action="$axios.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => afterAdImgUpload(index, res)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接(URL)" label-width="80px">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
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
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-top: 2rem"
          >保存</el-button
        >
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
import { adCreate, getAdById, adUpdate } from "@/http/ad";
import { getCategory } from "@/http/category";
export default {
  name: "AdEdit",
  setup(props) {
    // let id = ref();
    const model = ref({});
    model.value = {
      items: [],
    };
    const router = useRouter();
    // const route = useRoute();
    const onSubmit = async () => {
      let res;
      if (props.id) {
        res = await adUpdate(props.id, model.value);
        router.push("/ads/list");
        console.log(res);
        ElMessage.success({
          message: "yosah!!",
          type: "success",
        });
      } else {
        res = await adCreate(model.value);
        router.push("/ads/list");
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
      const res = await getAdById(id);
      model.value = res.data;
    };
    props.id && fetch(props.id);

    //获取上级分类数据
    const parents = ref([]);
    const fetchParents = async () => {
      const res = await getCategory();
      parents.value = res.data;
    };
    fetchParents();

    // 上传图片
    const afterAdImgUpload = (index, res) => {
      console.log("index", index);
      console.log("res", res);
      model.value.items[index].image = res.url;
    };

    // 删除广告图
    const removeAd = (index) => {
      model.value.items.splice(index, 1);
    };

    //监听路由变化初始化数据
    const route = useRoute();
    watch(route, () => {
      if (!route.params.id) {
        model.value = {
          items: [],
        };
      }
    });
    return {
      model,
      onSubmit,
      fetch,
      parents,
      fetchParents,
      afterAdImgUpload,
      removeAd,
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

<style scoped>
.avatar {
  width: 100%;
  height: auto;
}
</style>
