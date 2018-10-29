<template>
    <div class="tweets-container">

      <tweet-input v-if="$store.state.isLogin" class="tweet-input"></tweet-input>
      <div v-for="item in tweets" :key="item._id">
        <tweet
          :_id="item._id"
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
  name: "Home",
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
      tweets: {}
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
    // Bus.$on("has-liked", id => {
    //   this.tweets[id].likes += 1;
    //   this.tweets[id].liked = true;
    // });

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
          this.count = result.data.count;
          this.tweets = result.data.list;
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