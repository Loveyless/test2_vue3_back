import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.scss";
import i18n from "./i18n";
//解决鼠标滑轮报错 npm i default-passive-events -S
import 'default-passive-events'

createApp(App).use(store).use(router).use(i18n).mount("#app");
