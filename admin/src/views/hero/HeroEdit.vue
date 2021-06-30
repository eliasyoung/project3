<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="100px">
      <el-tabs model-value="skills" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$axios.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="定位">
            <el-select v-model="model.location" placeholder="请选择" multiple>
              <el-option
                v-for="item in locations"
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
          <el-form-item label="难度">
            <el-rate
              style="margin-top:.6rem"
              v-model="model.scores.difficult"
              :max="9"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top:.6rem"
              v-model="model.scores.skills"
              :max="9"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top:.6rem"
              v-model="model.scores.attack"
              :max="9"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top:.6rem"
              v-model="model.scores.survive"
              :max="9"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" placeholder="请选择" multiple>
              <el-option
                v-for="item in equips"
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
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" placeholder="请选择" multiple>
              <el-option
                v-for="item in equips"
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
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button size="mini"><i class="el-icon-plus" />添加技能</el-button>
        </el-tab-pane>
      </el-tabs>
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
      <el-form-item style="margin-top: 2rem">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    {{ model }}
    <hr />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getCategory } from "@/http/category";
import { getItem } from "@/http/item";
import { heroCreate, getHeroById, heroUpdate } from "@/http/hero";
export default {
  name: "HeroEdit",
  setup(props) {
    // let id = ref();
    const model = ref({});
    model.value = {
      scores: {
        difficult: 0,
        skills: 0,
        attack: 0,
        survive: 0,
      },
    };
    const router = useRouter();
    // const route = useRoute();
    const onSubmit = async () => {
      let res;
      if (props.id) {
        res = await heroUpdate(props.id, model.value);
        router.push("/heroes/list");
        console.log(res);
        ElMessage.success({
          message: "yosah!!",
          type: "success",
        });
      } else {
        res = await heroCreate(model.value);
        router.push("/heroes/list");
        console.log(res);
        ElMessage.success({
          message: "yosh!",
          type: "success",
        });
      }
    };
    // id = route.query.id;

    //上传头像
    const afterUpload = (res) => {
      console.log(res);
      model.value.avatar = res.url;
    };

    //获取定位categories
    const locations = ref([]);
    const fetchCategories = async () => {
      const res = await getCategory();
      locations.value = res.data;
    };
    fetchCategories();

    //获取装备列表
    const equips = ref([]);
    const fetchEquips = async () => {
      const res = await getItem();
      equips.value = res.data;
    };
    fetchEquips();

    //若有数据随路由传递，则为编辑分类，获取id对应的数据
    const fetch = async (id) => {
      const res = await getHeroById(id);
      model.value = Object.assign({}, model.value, res.data);
    };
    props.id && fetch(props.id);

    //监听路由变化初始化数据
    const route = useRoute();
    watch(route, () => {
      if (!route.params.id) {
        model.value = {
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0,
          },
        };
      }
    });

    return {
      model,
      onSubmit,
      fetch,
      afterUpload,
      locations,
      equips,
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
