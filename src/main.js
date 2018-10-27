import Vue from "vue";
import app from "./App.vue";
import axios from "axios";
import router from "./router";
import "./assets/mystyle.sass";

Vue.prototype.$request = axios;

new Vue({
  el: "#app",
  router,
  render: h => h(app)
});
