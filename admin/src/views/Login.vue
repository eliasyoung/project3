<template>
  <div class="login-container">
    <el-card header="Please Login First" class="login-card">
      <el-form label-width="5rem" @submit.prevent>
        <el-form-item label="Account">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { Login } from "@/http/login.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  name: "loginPage",
  setup() {
    const model = ref({});
    const router = useRouter();
    const login = async () => {
      try {
        const res = await Login(model.value);

        //sessionStorge || localStorge
        // sessionStorage.token = res.data.token;
        localStorage.token = res.data.token;
        // console.log(res.data);
        router.push("/");
        ElMessage({
            type:'success',
            message:'Login!'
        })
      } catch (err) {
        console.log(err);
      }
    };
    return {
      model,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  width: 25rem;
}
</style>
