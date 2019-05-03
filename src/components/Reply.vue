<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-32x32">
        <img :src="avatarDisplay">
      </p>
    </figure>
    <div class="media-content">
      <div class="content is-size-7">
        <p>
          <strong>{{nicknameDisplay}}</strong>&nbsp;
          <small> {{created_at}} </small>&nbsp;&nbsp;
          <small v-if="$GLOBAL.isLogin" @click="handleDelete" class="delete-reply has-text-danger"> 删除</small>
          <br>
          <br>
          <!-- 正文 -->
          {{content}}
          <div v-if="tale" class="tweet-tale">来自 {{ tale.indexOf('Generic') >= 0 ? tale.replace('Generic ', '') : tale }}</div>
        </p>
      </div>
    </div>
    <!-- modal -->
  </article>
</template>

<script>
import MD5 from "md5.js";
import Bus from "@/bus.js";
export default {
  props: ["avatar", "content", "created_at", "nickname", "_id", "tweet_id", "tale"],
  data() {
    return {
      hash: new MD5()
        .update(`anonymous@${new Date().getTime()}.com`)
        .digest("hex")
    };
  },
  computed: {
    avatarDisplay() {
      if (this.avatar) return this.avatar
      return `https://www.gravatar.com/avatar/${this.hash}?d=retro`
    },
    nicknameDisplay() {
      if (this.nickname) return this.nickname
      return 'Anonymous'
    }
  },
  methods: {
    handleDelete() {
      if (confirm("删除这条评论？")) {
        this.$request
          .delete(`/reply/${this._id}`)
          .then(res => {
            if (res.data.success === 1) {
              // this.$router.push("/detail/" + this.tweet_id);
              Bus.$emit('append-reply');
            }
          })
          .catch(err => {
            // console.log(err);
            alert(err);
          });
      }
    }
  }
};
</script>

<style scoped>
small.delete-reply {
  cursor: pointer;
}
small.delete-reply:hover {
  color: white !important;
  background-color: hsl(348, 100%, 61%);
}
</style>