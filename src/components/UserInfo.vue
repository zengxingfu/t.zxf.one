<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="$store.state.user.avatar + '?d=retro'" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="user-name">{{$store.state.user.nickname}} 
                        <span class="user-option">
                            <a v-if="$store.state.isLogin" @click="logout">> 退出</a>
                            <a v-else @click="login">> 登录</a>
                        </span>
                    </p>
                    <p class="subtitle is-6 user-welcome"><small>欢迎你，也不欢迎。</small></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    logout() {
      localStorage.removeItem("access_token");
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #fff6ed;
}

.user-option {
  float: right;
}
.user-option a {
  color: #4a4a4a;
}
.user-option a:hover {
  color: black;
  text-decoration: underline;
}
.user-welcome {
  font-size: 0.875em;
  color: #999999;
}
</style>