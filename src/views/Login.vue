<template>
  <div class="login">
    <Hero/>
    <section class="container">
      <div class="columns">
        <div class="column">
          <div class="back">
            <a @click="$router.back(1)">← 返回</a>
          </div>
          <div class="form">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">🔒 登陆</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="field is-grouped">
                    <p class="control is-expanded">
                      <input
                        v-model="username"
                        class="input"
                        v-bind:class="{'is-success': validUsername}"
                        type="text"
                        placeholder="👤 用户名"
                      >
                    </p>
                    <p class="control">
                      <a
                        class="button"
                        v-bind:class="{'is-loading': isCheckingUsername}"
                        :disabled="(username.length === 0 || wait !== 0)"
                        @click="checkUsername"
                      >{{wait > 0 ? wait + '秒' : 'Check'}}</a>
                    </p>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input
                        v-model="code"
                        class="input verify-input"
                        type="text"
                        placeholder="🔑 安全码"
                      >
                    </div>
                    <p v-if="validUsername" class="help is-success">安全码已发送到你的邮箱，请注意查收！</p>
                    <p v-if="invalidUsername" class="help is-danger">用户名不存在，而且你也不能注册呀 ^_^</p>
                  </div>
                  <div class="control">
                    <button
                      class="button is-black submit"
                      v-bind:class="{'is-loading': isCheckingCode}"
                      :disabled="username.length === 0 || code.length === 0 || !validUsername"
                      @click="checkVerifyCode"
                    >提交</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </section>
    <foot/>
  </div>
  <!-- <div class="fill-blank">
  </div>-->
</template>
<script>
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Hero,
    foot: Footer
  },
  data() {
    return {
      username: "",
      code: "",
      isCheckingUsername: false,
      validUsername: false,
      invalidUsername: false,
      isCheckingCode: false,
      wait: 0
    };
  },
  beforeMount() {
    if (this.$GLOBAL.isLogin) {
      this.$router.push("/");
    }
  },
  methods: {
    checkUsername() {
      const vm = this;
      if (vm.username.length !== 0 && this.wait === 0) {
        this.wait = 60;
        let countdown = function() {
          if (vm.wait > 0) {
            vm.wait -= 1;
            setTimeout(countdown, 1000);
          } else {
            vm.wait = 0;
          }
        };
        setTimeout(countdown, 1000);
        vm.isCheckingUsername = true;
        vm.$request
          .post("/login", {
            username: vm.username
          })
          .then(result => {
            if (result.data["success"] === 1) {
              vm.validUsername = true;
              vm.invalidUsername = false;
              vm.isCheckingUsername = false;
            }
          })
          .catch(err => {
            console.error(err);
            vm.isCheckingUsername = false;
            vm.invalidUsername = true;
            vm.validUsername = false;
          });
      }
    },
    checkVerifyCode() {
      const vm = this;
      vm.isCheckingCode = true;
      const disabled =
        vm.username.length === 0 || vm.code.length === 0 || !vm.validUsername;
      if (!disabled) {
        vm.$request
          .post("/login/check", {
            username: vm.username,
            code: vm.code
          })
          .then(result => {
            if (result.data.success === 1) {
              localStorage.setItem("access_token", result.data.token);
              vm.$router.push("/");
              // window.location.reload();
            }
          })
          .catch(err => {
            console.log(err);
            vm.isCheckingCode = false;
            alert("安全码错误");
          });
      }
    }
  }
};
</script>

<style scoped>
.back {
  margin-bottom: 2rem;
}
.form,
input,
button,
a {
  font-size: 0.875rem;
}
.card {
  max-width: 420px;
}
.button.is-black {
  background-color: #222222 !important;
}
.submit {
  width: 100%;
}
</style>