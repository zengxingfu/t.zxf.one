<template>
  <div class="home">
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <Hero/>
    <section class="container">
      <div class="columns">
        <div class="column">
          <TweetInput v-if="$GLOBAL.isLogin"/>
          <Tweet v-for="tweet in tweets" :key="tweet.id" :tid="tweet.id"/>
          <Pagination :page="page" :limit="limit" :total="total"/>
        </div>
        <div class="column"></div>
      </div>
    </section>
    <foot/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import TweetInput from "@/components/TweetInput.vue";
import Footer from "@/components/Footer.vue";
import Tweet from "@/components/Tweet.vue";
import Pagination from "@/components/Pagination.vue";
import Bus from "../bus.js";
export default {
  name: "home",
  components: {
    Hero,
    foot: Footer,
    Tweet,
    Pagination,
    TweetInput
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 10,
      total: 0,
      tweets: []
    };
  },
  created() {
    const page = this.$route.query.p;
    if (page) {
      this.page = Number(page);
    }
    this.fetchData();
    Bus.$on("reload", () => {
      this.fetchData();
    });
    Bus.$on("changePage", async val => {
      this.page = val;
      await this.fetchData();
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    });
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const resp = await this.$request.get("/tweet", {
        params: {
          page: this.page
        }
      });
      this.tweets = resp.data.list;
      this.total = resp.data.total;
      this.isLoading = false;
    }
  }
};
</script>

<style>
.container {
  padding: 2rem 0;
}
@media screen and (max-width: 1087px) {
  .container {
    padding: 2rem 1.5rem;
  }
}
</style>
