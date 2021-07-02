import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import router from "./router";
import axios from "axios";
import "@/style.css";

//vue-md-editor
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js";

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App).use(router);
installElementPlus(app);
axios.defaults.baseURL = "http://localhost:3000/admin/api";
app.config.globalProperties.$axios = axios;
app.use(VMdEditor);

app.mount("#app");
