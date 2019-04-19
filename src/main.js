import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import router from "./router";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
Vue.prototype.$dayjs = dayjs;

Vue.use(Buefy);
Vue.config.productionTip = false;
const request = axios.create({
  baseURL: "http://tiny-tweet.zengxingfu.com"
});
request.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);
const upload = axios.create({
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
Vue.prototype.$request = request;
Vue.prototype.$upload = upload;
Vue.prototype.$qiniuHost = "http://tweet-cdn.zengxingfu.com/";
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
