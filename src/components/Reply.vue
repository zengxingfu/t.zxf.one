<template>
    <div v-on:mouseenter="mouseEnter=true" v-on:mouseleave="mouseEnter=false">
        <article class="media">
          <figure class="media-left">
            <p class="image is-32x32">
              <img :src="avatar+'?d=retro'">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{nickname}}</strong> <small> {{created_at}} </small> <small v-if="$store.state.isLogin && mouseEnter" @click="handleDelete" class="delete-reply"> 删除 </small>
                <br>
                <!-- 正文 -->
                {{content}}
                <div class="tweet-tale">来自 {{ tale }}</div>
              </p>
            </div>
          </div>
          <!-- modal -->
        </article>
    </div>
</template>

<script>
export default {
  props: ["avatar", "content", "created_at", "nickname", "_id", "tweet_id", "tale"],
  data() {
    return {
      mouseEnter: false
    };
  },
  methods: {
    handleDelete() {
      if (confirm("删除这条评论？")) {
        this.$request
          .delete(`/reply/${this._id}`)
          .then(res => {
            if (res.data.success === 1) {
              this.$router.push("/detail/" + this.tweet_id);
              window.location.reload();
              // console.log(res.data);
            }
          })
          .catch(err => {
            console.log(err);
            alert(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.delete-reply {
  line-height: 1em;
  float: right;
  color: #ec6149;
}
.delete-reply:hover {
  cursor: pointer;
  color: white;
  background: #ec6149;
}
</style>