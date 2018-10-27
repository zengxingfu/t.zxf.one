import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./view/Login.vue";
import Home from "./view/Home.vue";
import Detail from "./view/Detail.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/detail",
      component: Detail
    }
  ]
});

export default router;
