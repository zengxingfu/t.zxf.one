import Vue from "vue";
import app from "./App.vue";
import axios from "axios";

Vue.prototype.$request = axios;

new Vue({
  el: "#app",
  render: h => h(app)
});
