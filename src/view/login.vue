<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  created() {
    const isLogin = this.$getCookie("isLogin");
    if (isLogin === "1") {
      this.$router.push("/");
    }
  },
  components: {
    LoginForm
  }
};
</script>

<style scoped>
</style>