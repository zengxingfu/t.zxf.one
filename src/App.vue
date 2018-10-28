<template>
  <div class="page-wrapper">
    <Navbar></Navbar>
    <Hero></Hero>
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds">
          <router-view></router-view>
        </div>
        <div class="column is-one-thirds">
          <user-info
            :is-login="isLogin"
            :nickname="nickname"
            :avatar="avatar"
          ></user-info>
          <core-values father="home"></core-values>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import UserInfo from "./components/UserInfo";
import FooterComponent from "./components/FooterComponent";
import CoreValues from "./components/CoreValues";
export default {
  name: "App",
  components: {
    Navbar,
    Hero,
    FooterComponent,
    UserInfo,
    CoreValues
  },
  data() {
    return {
      isLogin: false,
      nickname: "",
      avatar: "",
      email: ""
    };
  },
  beforeCreate() {
    const vm = this;
    vm.$request("/welcome")
      .then(result => {
        if (result.data.success === 1) {
          if (result.data.data.type === "host") {
            vm.isLogin = true;
            vm.$setCookie("isLogin", "1");
          }
          vm.nickname = result.data.data.nickname;
          vm.avatar = result.data.data.avatar + "?d=retro";
          vm.$emit("login statut changed", vm.isLogin);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
}
</style>