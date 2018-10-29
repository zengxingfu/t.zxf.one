<template>
    <div class="tweet-detail">
        <article class="media">
          <figure @click="$router.push('/')" class="media-left">
            <p class="image is-48x48">
              <img :src="$store.state.host.avatar">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong @click="$router.push('/')" class="host-name">{{$store.state.host.nickname}}</strong> <small v-if="tweet.type===100">说：</small><small v-else>转发：</small>
                <br>
                <!-- 正文 -->
                {{tweet.content}}
                <!-- 图片 -->
                <div @click="showModal=true" class="tweet-image" v-if="tweet.image" :style="`background-image:url(${tweet.image})`"></div>
                <!-- 转发正文 -->
                <div v-if="tweet.type===101" class="retweet-content">
                  <div class="media-content">
                    <p>
                      <strong>{{$store.state.host.nickname}} </strong> <small> 说：</small><br>
                      {{tweet.origin.content}}
                      <div @click="showModal=true" class="tweet-image" v-if="tweet.origin.image" :style="`background-image:url(${tweet.origin.image})`"></div>
                    </p>
                  </div>
                </div>
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item created_at disabled">{{tweet.created_at}}</a>
                <a href="#replies" class="level-item replies">{{tweet.replies === 0 ? '' : tweet.replies}} 回应</a>
                <a @click="handleLike" v-bind:class="{'disabled': tweet.liked}" class="level-item likes"><span>赞 {{tweet.likes === 0 ? '' : `(${tweet.likes})`}}</span></a>
                <a class="level-item retweets"><span>转发 {{tweet.retweets === 0 ? '' : `(${tweet.retweets})`}}</span></a>
              </div>
            </nav>
          </div>
          <!-- modal -->
          <div @click="showModal=false" class="modal" v-bind:class="{'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
              <p class="image" v-if="tweet.image">
                <img class="original-image" :src="tweet.image" alt="">
                <!-- <img v-if="tweet.type===100 && tweet.origin.image" class="original-image" :src="tweet.origin.image" alt=""> -->
              </p>
              <p v-if="tweet.origin" class="image">
                <img v-if="tweet.origin.image" :src="tweet.origin.image" alt="" class="original-image">
              </p>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
          </div>
        </article>
        <!-- 回应列表 -->
        <div id="replies" class="reply-list" >
          <reply v-for="item in replies" :key="item._id"
            :nickname="item.nickname"
            :content="item.content"
            :created_at="item.created_at"
            :avatar="item.avatar"
          ></reply>
        </div>
        <!-- 你的回应 -->
        <reply-input class="reply-input"></reply-input>
    </div>
</template>

<script>
import Reply from "../components/Reply";
import ReplyInput from "../components/ReplyInput";
export default {
  name: "Detail",
  components: {
    Reply,
    ReplyInput
  },
  data() {
    return {
      showModal: false,
      tweet: {},
      replies: [],
      replyCount: 0
    };
  },
  beforeMount() {
    const id = this.$route.params.id;
    this.fetchTweet(id);
    this.fetchReplies(id);
  },
  created() {
    // window.scrollTo(0, 0);
  },
  methods: {
    fetchTweet(id) {
      const vm = this;
      vm.$request
        .get("/tweet/" + id)
        .then(result => {
          if (result.data.success === 1) {
            vm.tweet = result.data.data;
            let likedList = localStorage.getItem("likedList");
            if (likedList) {
              likedList = JSON.parse(likedList);
              if (likedList.indexOf(vm.$route.params.id) >= 0) {
                vm.tweet.liked = true;
              } else {
                vm.tweet.liked = false;
              }
            } else {
              vm.tweet.liked = false;
            }
            vm.tweet.created_at = vm
              .$dayjs(vm.tweet.created_at * 1000)
              .fromNow();
          }
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    },
    fetchReplies(id) {
      const vm = this;
      this.$request
        .get("/tweet/" + id + "/reply")
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
          console.log(err);
          alert(err);
        });
    },
    handleLike() {
      if (!this.tweet.liked) {
        const vm = this;
        this.$request
          .post(`/tweet/${this.$route.params.id}/like`)
          .then(res => {
            if (res.data.success === 1) {
              let likedList = [];
              if (localStorage.getItem("likedList")) {
                likedList = JSON.parse(localStorage.getItem("likedList"));
              }
              if (likedList.indexOf(this.$route.params.id) < 0) {
                likedList.push(this.$route.params.id);
                localStorage.setItem("likedList", JSON.stringify(likedList));
              }
              vm.tweet.liked = true;
              vm.tweet.likes += 1;
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