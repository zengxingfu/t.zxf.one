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
                            <a v-if="!$store.state.isLogin" @click="goRegister">> 访客登记</a>
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
    return {}
  },
  methods: {
    goRegister() {
      this.$router.push('/register')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.media {
  border-bottom: 0;
  padding: 0;
}
.card {
  background-color: #fff6ed;
  margin-bottom: 20px;
}
.user-name {
  font-size: 0.875rem;
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
  font-size: 0.875rem;
  color: #999999;
}
</style>