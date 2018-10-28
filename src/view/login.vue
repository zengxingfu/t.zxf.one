<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  beforeMount() {
    if (this.$store.state.isLogin) {
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