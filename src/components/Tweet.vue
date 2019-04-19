<template>
  <div class="tweet">
    <article class="media">
      <figure class="media-left">
        <p v-if="tweet.image" class="image is-48x48">
          <img :src="tweet.user.avatar">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p class="is-size-65">
            <strong>{{tweet.user.nickname}}&nbsp;</strong>
            <small>{{tweet.type === 100 ? '广播：' : '转发：'}}</small>
            <br>
            {{tweet.content}}
          </p>
          <div class="tweet-pic">
            <img :src="imageUrl" alt="">
          </div>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <!-- <a class="level-item">
              <span class="icon is-small">
                <i class="fas fa-reply"></i>
              </span>
            </a>
            <a class="level-item">
              <span class="icon is-small">
                <i class="fas fa-retweet"></i>
              </span>
            </a>-->
            <a class="created_at level-item is-size-7 has-text-grey">
              <span>{{createdTime}}</span>
              <!-- <span class="icon is-small">
                <i class="fas fa-heart"></i>
              </span>-->
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Tweet",
  data() {
    return {
      tweet: {
        user: {}
      }
    };
  },
  computed: {
    imageUrl() {
      const key = this.tweet.image;
      const param = `imageView2/0/q/75|watermark/1/image/aHR0cDovL3R3ZWV0LWNkbi56ZW5neGluZ2Z1LmNvbS9hc3NldHMvaW1hZ2V3YXRlcm1hcmtlX3YzLnBuZw==/dissolve/80/gravity/SouthEast/dx/10/dy/10|imageslim`;
      return `${this.$qiniuHost}${key}?${param}`;
    },
    createdTime() {
      const diff = this.$dayjs(new Date().getTime()).diff(
        this.tweet.created_at * 1000,
        "day",
        true
      );
      if (diff > 1) {
        return this.$dayjs(this.tweet.created_at * 1000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return this.$dayjs(this.tweet.created_at * 1000).fromNow();
    }
  },
  props: {
    tid: Number
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$request("/tweet/" + String(this.tid));
        if (response.data.success) {
          this.tweet = response.data.data;
        }
      } catch (e) {}
    }
  }
};
</script>

<style lang="css" scoped>
.tweet-pic img {
  max-width: 75%;
}
a.created_at:hover {
  /* background-color: #7a7a7a; */
  background-color: hsl(0, 0%, 71%);
  color: white !important;
}
</style>
