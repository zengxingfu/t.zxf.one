<template>
  <div class="page-wrapper">
    <!-- <Navbar></Navbar> -->
    <Hero></Hero>
    <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <router-view></router-view>
        </div>
        <div class="column is-3 is-offset-1">
          <user-info></user-info>
          <core-values></core-values>
        </div>
      </div>
    </div>
    </section>
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
    return {};
  },
  beforeCreate() {
    const vm = this;
    const nickname = localStorage.getItem("nickname");
    const email = localStorage.getItem("email");
    const url = `/welcome?nickname=${nickname ? nickname : ""}&email=${
      email ? email : ""
    }`;
    vm.$request(url)
      .then(result => {
        if (result.data.success === 1) {
          if (result.data.data.type === "host") {
            vm.$store.commit("setIsLogin", true);
          }
          vm.$store.commit("setUser", result.data.data.user);
          vm.$store.commit("setHost", result.data.data.host);
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