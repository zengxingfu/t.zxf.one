<template>
  <div class="tweet-detail">
      <tweet
        :_id="$route.params.id"
      ></tweet>
      <!-- 回应列表 -->
      <div id="replies" class="reply-list" >
        <reply v-for="item in replies" :key="item._id"
          :nickname="item.nickname"
          :content="item.content"
          :created_at="item.created_at"
          :avatar="item.avatar"
          :_id="item._id"
          :tweet_id="$route.params.id"
          :tale="item.from"
        ></reply>
      </div>
      <!-- 你的回应 -->
      <reply-input :tweet_id="$route.params.id" class="reply-input"></reply-input>
  </div>
</template>

<script>
import Reply from '../components/Reply'
import ReplyInput from '../components/ReplyInput'
import Tweet from '../components/Tweet'
import Bus from '../bus'
export default {
  name: 'Detail',
  components: {
    Reply,
    ReplyInput,
    Tweet
  },
  data() {
    return {
      showModal: false,
      replies: [],
      replyCount: 0,
      replyLimit: 100,
      replyPage: 1
    }
  },
  created() {
    this.fetchReplies(this.$route.params.id)
    Bus.$on('append-reply', data => {
      this.replies.splice(0, 0, data)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  },
  methods: {
    fetchReplies(id) {
      const vm = this
      this.$request
        .get(
          '/tweet/' +
            id +
            '/reply?limit=' +
            this.replyLimit +
            '&page=' +
            this.replyPage
        )
        .then(result => {
          if (result.data.success === 1) {
            vm.replies = result.data.list.map(reply => {
              reply.created_at = vm.$dayjs(reply.created_at * 1000).fromNow()
              return reply
            })
            vm.replyCount = result.data.count
          }
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    }
  }
}
</script>

<style scoped>
.media-left,
.host-name {
  cursor: pointer;
}
.tweet-detail {
  margin-top: -20px;
}
.reply-list,
.reply-input {
  margin-top: 20px;
  padding-left: 64px;
}
</style>