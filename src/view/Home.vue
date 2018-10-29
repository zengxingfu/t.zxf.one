<template>
    <div class="tweets-container">

      <tweet-input v-if="$store.state.isLogin" class="tweet-input"></tweet-input>
      <div v-for="tweet in tweets" :key="tweet.id">
        <tweet
          :_id="tweet._id"
          :content="tweet.content"
          :created_at="tweet.created_at"
          :replies="tweet.replies"
          :likes="tweet.likes"
          :retweets="tweet.retweets"
          :image="tweet.image"
          :type="tweet.type"
          :origin="tweet.origin?tweet.origin:{}"
          :liked="tweet.liked"
        ></tweet>
      </div>
      <pagination
        :count="count"
        :limit="limit"
        :page="page"
      ></pagination>
    </div>
</template>

<script>
import Tweet from "../components/Tweet";
import Pagination from "../components/Pagination.vue";
import TweetInput from "../components/TweetInput";
import Bus from "../bus.js";
export default {
  components: {
    Tweet,
    Pagination,
    TweetInput
    // Pagination
  },
  data() {
    return {
      limit: 10,
      count: 0,
      tweets: []
    };
  },
  computed: {
    page() {
      return Number(this.$route.params.page);
    }
  },
  beforeCreate() {},
  created() {
    const vm = this;
    vm.fetchData();
    Bus.$on("reload", data => {
      vm.fetchData();
    });
    // Bus.$on("change-page", data => {
    //   vm.page = data;
    //   vm.fetchData();
    // });
  },
  methods: {
    fetchData() {
      const params = new URLSearchParams();
      params.append("page", this.page);
      params.append("limit", this.limit);
      this.$request
        .get("/tweet", {
          params: {
            page: this.page,
            limit: this.limit
          }
        })
        .then(result => {
          // console.log(result.data);
          this.count = result.data.count;
          this.tweets = result.data.list.map(tweet => {
            let likedList = localStorage.getItem("likedList");
            if (likedList) {
              likedList = JSON.parse(likedList);
              if (likedList.indexOf(tweet._id) >= 0) {
                tweet.liked = true;
              }
            }
            tweet.created_at = this.$dayjs(tweet.created_at * 1000).fromNow();
            return tweet;
          });
          window.scrollTo(0, 0);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.tweet-input {
  /* margin-top: -20px; */
}
.tweets-container {
  margin-top: -33px;
}
</style>