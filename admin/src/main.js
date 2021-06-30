import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import router from "./router";
import axios from "axios";

const app = createApp(App).use(router);
installElementPlus(app);
axios.defaults.baseURL = "http://localhost:3000/admin/api";
app.config.globalProperties.$axios = axios;

app.mount("#app");
