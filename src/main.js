"use strict";

import Vue from "vue";
import Vuex from "vuex";
import app from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import "./assets/mystyle.sass";

// dayjs
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
Vue.prototype.$dayjs = dayjs;

const request = axios.create({
  baseURL: "http://tiny-tweet.zengxingfu.com"
});
request.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);

Vue.prototype.$request = request;
// Vue.prototype.$setCookie = function (name, value) {
//   document.cookie = name + '=' + escape(value);
// }
// Vue.prototype.$getCookie = function (name) {
//   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
//   if (arr = document.cookie.match(reg)) {
//     return unescape(arr[2]);
//   } else {
//     return null;
//   }
// }
// Vue.prototype.$delCookie = function (name) {
//   var exp = new Date();
//   exp.setTime(exp.getTime() - 1);
//   var cval = getCookie(name);
//   if (cval != null) {
//     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//   }
// }
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(app)
});
