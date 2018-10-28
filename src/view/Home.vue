<template>
    <div class="tweets-container">

      <tweet-input class="tweet-input"></tweet-input>
      <div v-for="tweet in tweets" :key="tweet.id">
        <tweet
          :content="tweet.content"
          :created_at="tweet.created_at"
          :replies="tweet.replies"
          :likes="tweet.likes"
          :retweets="tweet.retweets"
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
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Tweet from "../components/Tweet";
import Pagination from "../components/Pagination.vue";
import TweetInput from "../components/TweetInput";
export default {
  components: {
    Tweet,
    Pagination,
    TweetInput
    // Pagination
  },
  data() {
    return {
      page: 1,
      limit: 5,
      count: 0,
      tweets: []
    };
  },
  created() {
    this.fetchData();
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
            tweet.created_at = dayjs(tweet.created_at * 1000).fromNow();
            return tweet;
          });
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