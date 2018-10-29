<template>
    <div>
        <div class="card core-values">
            <div class="card-content">
                富强 民主 文明 和谐
                <br>
                自由 平等 公正 法治
                <br>
                爱国 敬业 诚信 友善
                <br>
            </div>
        </div>
        <div class="nav-link">
            <a v-if="$route.name ==='tweets' ">> 为什么是“小广播”？</a>
            <a v-else @click="$router.push('/')">> 返回曾高兴的全部广播</a>
        </div>
        <div class="nav-link">
            <a v-if="!$store.state.isLogin" @click="login">> 登录</a>
            <a v-else @click="logout">> 退出</a>
        </div>
        <div class="mailme">
            <a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=eREcFRUWOQMBH1cWFxw" style="text-decoration:none;"><img src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_01.png"/></a>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.commit("setIsLogin", false);
      localStorage.removeItem("access_token");
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.card-content {
  margin-top: 20px;
  text-align: center;
  font-size: 0.875em;
  letter-spacing: 0.875em;
  font-weight: 100;
}

.nav-link {
  margin-top: 20px;
  margin-bottom: 20px;
}
.nav-link a {
  font-size: 0.875em;
  color: #222222;
}
.nav-link a:hover {
  color: black;
  text-decoration: underline;
}
</style>