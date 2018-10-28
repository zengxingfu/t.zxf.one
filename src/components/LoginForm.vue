<template>
<div>
<div class="form">
<div class="card">
    <header class="card-header">
    <p class="card-header-title">
      🔒 登陆
    </p>
  </header>
  <div class="card-content">
    <div class="content">
        <div class="field is-grouped">
            <p class="control is-expanded">
                <input v-model="form.username" class="input" v-bind:class="{'is-success': form.validUsername}" type="text" placeholder="👤 用户名">
            </p>
            <p class="control">
                <a class="button" v-bind:class="{'is-loading': form.isCheckingUsername}" :disabled="form.username.length === 0" @click="checkUsername">
                    Check
                </a>
            </p>
        </div>
        <div class="field">
            <div class="control">
                <input v-model="form.code" class="input verify-input" type="text" placeholder="🔑 安全码">
            </div>
            <p v-if="form.validUsername" class="help is-success">安全码已发送到你的邮箱，请注意查收！</p>
            <p v-if="form.invalidUsername" class="help is-danger">用户名不存在，而且你也不能注册呀 ^_^</p>
        </div>
        <div class="control">
            <button 
                class="button is-black submit" 
                v-bind:class="{'is-loading': form.isCheckingCode}" 
                :disabled="form.username.length === 0 || form.code.length === 0 || !form.validUsername"
                @click="checkVerifyCode"
                >提交</button>
        </div>
    </div>
  </div>
</div>
</div>
    <!-- <div class="fill-blank">
    </div> -->
</div>


</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        code: "",
        isCheckingUsername: false,
        validUsername: false,
        invalidUsername: false,
        isCheckingCode: false
      }
    };
  },
  methods: {
    checkUsername() {
      const vm = this;
      if (vm.form.username.length !== 0) {
        vm.form.isCheckingUsername = true;
        vm.$request
          .post("/login", {
            username: vm.form.username
          })
          .then(result => {
            if (result.data["success"] === 1) {
              vm.form.validUsername = true;
              vm.form.invalidUsername = false;
              vm.form.isCheckingUsername = false;
            }
          })
          .catch(err => {
            console.error(err);
            vm.form.isCheckingUsername = false;
            vm.form.invalidUsername = true;
            vm.form.validUsername = false;
          });
      }
    },
    checkVerifyCode() {
      const vm = this;
      vm.form.isCheckingCode = true;
      const disabled =
        vm.form.username.length === 0 ||
        vm.form.code.length === 0 ||
        !vm.form.validUsername;
      if (!disabled) {
        vm.$request
          .post("/login/check", {
            username: vm.form.username,
            code: vm.form.code
          })
          .then(result => {
            if (result.data.success === 1) {
              localStorage.setItem("access_token", result.data.token);
              vm.$router.push("/");
              window.location.reload();
            }
          })
          .catch(err => {
            console.log(err);
            vm.form.validUsername = false;
            vm.form.isCheckingCode = false;
            alert("安全码错误");
          });
      }
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 420px;
}
.button.is-black {
  background-color: #222222 !important;
}
.submit {
  width: 100%;
}
/* .fill-blank {
  width: 100%;
  height: 10vh;
} */
</style>