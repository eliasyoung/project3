<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="lists">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
      <el-table-column prop="name" label="广告名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scoped">
          <el-button size="small" type="primary" @click="onEdit(scoped.row)">
            编辑
          </el-button>
          <el-popconfirm
            :title="
              '确认删除 id: ' +
                scoped.row._id +
                ', name: ' +
                scoped.row.name +
                '?'
            "
            @confirm="onDelete(scoped.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getAd, adDeleteById } from "@/http/ad";
export default {
  name: "AdList",
  setup() {
    const router = useRouter();
    //获取页面数据
    const lists = ref([]);
    const fetch = async () => {
      const res = await getAd();
      lists.value = res.data;
    };
    fetch();
    //跳转编辑页面
    const onEdit = (data) => {
      router.push(`/ads/edit/${data._id}`);
      // router.push("ads/edit/" + data._id);
      // router.push({ path: "/ads/edit", query: { id: data._id } });
    };
    // 删除数据
    const onDelete = async (data) => {
      console.log("beforeDelete", data);
      const res = await adDeleteById(data._id);
      console.log(res);
      ElMessage.success({
        message: "DEEEEEEEEELETE!",
        type: "success",
      });
      fetch();
    };
    return {
      lists,
      fetch,
      onEdit,
      onDelete,
    };
  },
};
</script>

<style></style>
