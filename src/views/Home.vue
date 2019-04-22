<template>
  <div class="home">
    <Hero/>
    <section class="container">
      <div class="columns">
        <div class="column">
          <TweetInput/>
          <Tweet v-for="tweet in tweets" :key="tweet.id" :tid="tweet.id"/>
        </div>
        <div class="column">Second column</div>
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

export default {
  name: "home",
  components: {
    Hero,
    foot: Footer,
    Tweet,
    TweetInput
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      tweets: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await this.$request.get("/tweet", {
        params: {
          page: this.page
        }
      });
      this.tweets = resp.data.list;
      this.total = resp.data.total;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 2rem 0;
}
@media screen and (max-width: 1087px) {
  .container {
    padding: 2rem 1.5rem;
  }
}
</style>
