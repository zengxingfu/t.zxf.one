<template>
<div>
<div class="form">
<div class="card">
    <header class="card-header">
    <p class="card-header-title">
      😀 访客登记
    </p>
  </header>
  <div class="card-content">
    <div class="content">
           <div class="control nickname">
                <input v-model="nickname" class="input" type="text" placeholder="👤 昵称">
            </div>
        <div class="field">
            <div class="control">
                <input v-model="email" class="input" type="text" placeholder="✉️ 邮箱">
            </div>
            <p class="help"> 填或不填，都随缘 🙏</p>
        </div>
        <div class="control">
            <button class="button is-black submit" 
                @click="updateUserInfo">提交</button>
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
      nickname: "",
      email: ""
    };
  },
  methods: {
    updateUserInfo() {
      this.$store.commit("setUser", {
        nickname: this.nickname,
        email: this.email,
        avatar: null
      });
    }
  }
};
</script>

<style scoped>
.nickname {
  margin-bottom: 0.75rem;
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
/* .fill-blank {
  width: 100%;
  height: 10vh;
} */
</style>