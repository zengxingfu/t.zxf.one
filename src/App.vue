<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import MD5 from "md5.js";
export default {
  created() {
    // isLogin?
    const token = window.localStorage.getItem("access_token");
    if (token) {
      this.$GLOBAL.isLogin = true;
    }
    // userid
    const userid = window.localStorage.getItem("_userid");
    if (!userid) {
      let email = "hello@zxf.one";
      if (!token) email = `anonymous@${new Date().getTime()}.com`;
      const hash = new MD5().update(email).digest("hex");
      window.localStorage.setItem("_userid", hash);
    }
  }
};
</script>

<style>
.is-size-65 {
  font-size: 0.875rem;
  line-height: 1.75rem;
}
</style>
