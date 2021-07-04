import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router/index.js";

const request = axios.create({
  baseURL: "http://localhost:3000/admin/api",
});

//requestl拦截器
request.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  (err) => {
    if (err.response.data.message) {
      ElMessage({
        showClose: true,
        type: "error",
        message: err.response.data.message,
      });
    }
    return Promise.reject(err);
  }
);

//response拦截器
request.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    //axios: response.data
    if (err.response.data.message) {
      ElMessage({
        showClose: true,
        type: "error",
        message: err.response.data.message,
      });
      router.push("/login");
    }

    return Promise.reject(err);
  }
);

export default request;
