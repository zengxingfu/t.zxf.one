<template>
  <div>
    <Navbar></Navbar>
    <Hero></Hero>
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds">
          
          <router-view></router-view>
        </div>
        <div class="column is-one-thirds">
          <user-info></user-info>
          <core-values></core-values>
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
  beforeCreate() {
    const request = this.$request.create({
      baseURL: "http://tiny-tweet.zengxingfu.com"
    });
    request.get("/constants").then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style scoped>
</style>