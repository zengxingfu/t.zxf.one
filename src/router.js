import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./view/Login.vue";
import Home from "./view/Home.vue";
import Detail from "./view/Detail.vue";
import Register from "./view/Register.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/page/1"
    },
    {
      path: "/page",
      redirect: "/page/1"
    },
    {
      name: "login",
      path: "/login",
      component: Login
    },
    {
      name: "tweets",
      path: "/page/:page",
      component: Home
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail
    },
    {
      name: "register",
      path: "/register",
      component: Register
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

export default router;
