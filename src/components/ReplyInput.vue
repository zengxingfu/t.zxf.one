<template>
<div class="reply-input content">
    <p>
        你的回应  · · · · · ·
        <textarea v-model="replyInput" class="textarea" placeholder="e.g. 把我批判一番？" rows="2"></textarea>
        <div class="field is-grouped is-grouped-right">
        <p class="control">
            <a :disabled="replyInput.length===0" class="button is-light" @click="publish">
            📌 加上去
            </a>
        </p>
        </div>
    </p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      replyInput: ""
    };
  },
  methods: {
    publish() {
      if (this.replyInput.length > 0) {
        const params = new URLSearchParams();
        params.append("content", this.replyInput);
        params.append("email", this.$store.state.user.email);
        params.append("nickname", this.$store.state.user.nickname);
        params.append("avatar", this.$store.state.user.avatar);
        const vm = this;
        vm.$request
          .post(`/tweet/${this.$route.params.id}/reply`, params)
          .then(res => {
            if (res.data.success === 1) {
              // vm.fetchReplies();
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
.textarea {
  margin-top: 10px;
}
</style>