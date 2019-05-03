<template>
  <div class="detail">
    <Hero/>
    <section class="container">
      <div class="columns">
        <div class="column">
          <div class="back is-size-65">
            <a @click="$router.back(1)">← 返回</a>
          </div>
          <Tweet :tid="tid"/>
          <!-- 回应列表 -->
          <div id="replies" class="reply-list">
            <reply
              v-for="item in replies"
              :key="item.id"
              :nickname="item.user ? item.user.nickname : null"
              :content="item.content"
              :created_at="item.created_at"
              :avatar="item.user ? item.user.avatar : null"
              :_id="item.id"
              :tweet_id="$route.params.id"
              :tale="item.tail"
            ></reply>
          </div>
          <!-- 你的回应 -->
          <div class="publish-reply">
            <ReplyInput/>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </section>
    <F/>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";
import Tweet from "@/components/Tweet.vue";
import Reply from "@/components/Reply.vue";
import ReplyInput from "@/components/ReplyInput.vue";
import Bus from "@/bus.js";
export default {
  components: {
    Hero,
    Tweet,
    Reply,
    F: Footer,
    ReplyInput
  },
  data() {
    return {
      tid: Number(this.$route.params.tid),
      replyLimit: 100,
      replyPage: 1,
      replies: []
    };
  },
  created() {
    this.fetchReplies(this.tid);
    Bus.$on("append-reply", () => {
      this.fetchReplies(this.tid);
    });
  },
  methods: {
    fetchReplies(id) {
      const vm = this;
      this.$request
        .get(
          "/tweet/" +
            id +
            "/reply?limit=" +
            this.replyLimit +
            "&page=" +
            this.replyPage
        )
        .then(result => {
          if (result.data.success === 1) {
            vm.replies = result.data.list.map(reply => {
              reply.created_at = vm.$dayjs(reply.created_at * 1000).fromNow();
              return reply;
            });
            vm.replyCount = result.data.count;
          }
        })
        .catch(err => {
          // console.log(err);
          alert(err);
        });
    }
  }
};
</script>
<style scoped>
.back {
  margin-bottom: 2rem;
}
.reply-list,
.reply-input,
.publish-reply {
  margin-top: 20px;
  padding-left: 64px;
}
.publish-reply {
  margin-top: 2rem;
}
</style>
