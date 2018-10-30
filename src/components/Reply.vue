<template>
    <div>
        <article class="media">
          <figure class="media-left">
            <p class="image is-32x32">
              <img :src="avatar+'?d=retro'">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{nickname}}</strong> <small> {{created_at}} </small> <small v-if="$store.state.isLogin" @click="handleDelete" class="delete-reply"> 删除 </small>
                <br>
                <!-- 正文 -->
                {{content}}
              </p>
            </div>
          </div>
          <!-- modal -->
        </article>
    </div>
</template>

<script>
export default {
  props: ["avatar", "content", "created_at", "nickname", "_id"],
  methods: {
    handleDelete() {
      if (confirm("删除这条评论？")) {
        this.$request
          .delete(`/reply/${this._id}`)
          .then(res => {
            if (res.data.success === 1) {
              window.location.reload();
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
  float: right;
  color: #ec6149;
}
.delete-reply:hover {
  color: white;
  background: #ec6149;
}
</style>