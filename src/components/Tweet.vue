<template>
  <div class="tweet">
    <b-modal :active.sync="isImageModalActive">
      <p class="image">
        <img :src="previewUrl">
      </p>
    </b-modal>
    <article class="media">
      <figure class="media-left">
        <p v-if="tweet.user.avatar" class="image is-48x48">
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
          <div v-if="tweet.image" class="tweet-pic">
            <img :src="imageUrl.tweet" alt="" @click="previewImage(imageUrl.tweet)">
          </div>
          <!-- 转发 -->
          <div v-if="tweet.type===101" class="retweet-wrapper has-background-white-ter">
            <p class="is-size-65">
              <strong>{{tweet.user.nickname}}&nbsp;</strong>
              <small>说：</small>
              <br>
              {{tweet.retweet.content}}
            </p>
            <div v-if="tweet.retweet.image" class="tweet-pic">
              <img :src="imageUrl.retweet" alt="" @click="previewImage(imageUrl.retweet)">
            </div>
            <nav v-if="tweet.retweet.location" class="level is-mobile">
              <div class="is-size-65 level-left">
                <span>📍 {{tweet.retweet.location}}</span>
              </div>
            </nav>
          </div>
        </div>
        <!-- 位置 -->
        <nav v-if="tweet.location" class="level is-mobile">
          <div class="is-size-65 level-left">
            <span>📍 {{tweet.location}}</span>
          </div>
        </nav>
        <!-- 尾巴 -->
        <nav v-if="tweet.tail" class="level is-mobile">
          <div class="is-size-7 level-left">
            <span
              class="has-text-grey"
            >来自 {{ tweet.tail.indexOf('Generic') >= 0 ? tweet.tail.replace('Generic ', '') : tweet.tail }}</span>
          </div>
        </nav>
        <!-- 时间、回应、赞、转发 -->
        <nav class="level is-mobile">
          <div class="is-size-7 level-left">
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
            <a
              class="level-item has-text-grey"
              @click="$router.push({name: 'detail', params:{tid}})"
            >
              <span class="created_at">{{createdTime}}</span>
            </a>
            <a class="level-item has-text-link" @click="hanleReply">
              <span
                v-if="!reply.status"
                class="links"
              >{{tweet.replies_count ? tweet.replies_count : ''}}&nbsp;回应</span>
              <span v-else class="links">隐藏回应</span>
            </a>
            <a class="level-item has-text-link">
              <span class="links" @click="handleLike">赞</span>
              <span
                class="count has-text-grey"
                v-if="tweet.likes_count"
              >&nbsp;({{tweet.likes_count}})</span>
            </a>
            <a class="level-item has-text-link">
              <span v-if="!retweet.status" class="links" @click="hanleRetweet">转发</span>
              <span v-else class="links" @click="hanleRetweet">隐藏转发</span>
              <span
                class="count has-text-grey"
                v-if="tweet.retweets_count"
              >&nbsp;({{tweet.retweets_count}})</span>
            </a>
            <a v-if="$GLOBAL.isLogin" class="level-item has-text-danger" @click="hanleDelete">
              <span class="delete-tweet">删除</span>
            </a>
          </div>
        </nav>
        <!-- 回应列表 -->
        <ul v-show="reply.status" class="reply-list is-size-7">
          <li
            v-for="item in reply.list"
            :key="item.id"
          >{{item.content}} - {{item.user_id ? item.user.nickname : 'Anonymous'}}</li>
          <b-field grouped>
            <b-input v-model="reply.quickInput" placeholder="e.g. 我跟他谈笑风生" size="is-small" expanded></b-input>
            <p class="control">
              <b-button type="is-light" :disabled="reply.quickInput.length===0" size="is-small">发表回应</b-button>
            </p>
          </b-field>
        </ul>
        <!-- 转发 Input -->
        <b-field v-if="retweet.status" grouped>
          <b-input
            v-model="retweet.quickInput"
            placeholder="e.g. excited!"
            size="is-small"
            expanded
          ></b-input>
          <p class="control">
            <b-button type="is-light" :disabled="retweet.quickInput.length===0" size="is-small">发表转发</b-button>
          </p>
        </b-field>
      </div>
    </article>
    <hr>
  </div>
</template>

<script>
import Bus from "../bus.js";
export default {
  name: "Tweet",
  data() {
    return {
      isImageModalActive: false,
      previewUrl: "",
      tweet: {
        user: {}
      },
      reply: {
        status: false,
        list: [],
        quickInput: ""
      },
      retweet: {
        status: false,
        list: [],
        quickInput: ""
      }
    };
  },
  computed: {
    imageUrl() {
      const isRetweet = this.tweet.type === 101;
      let retweetKey = null;
      const key = this.tweet.image;
      if (isRetweet) retweetKey = this.tweet.retweet.image;
      const param = `imageView2/0/q/75|watermark/1/image/aHR0cDovL3R3ZWV0LWNkbi56ZW5neGluZ2Z1LmNvbS9hc3NldHMvaW1hZ2V3YXRlcm1hcmtlX3YzLnBuZw==/dissolve/80/gravity/SouthEast/dx/10/dy/10|imageslim`;
      return {
        tweet: `${this.$qiniuHost}${key}?${param}`,
        retweet: isRetweet ? `${this.$qiniuHost}${retweetKey}?${param}` : null
      };
    },
    createdTime() {
      const diff = this.$dayjs(new Date().getTime()).diff(
        this.tweet.created_at * 1000,
        "day",
        true
      );
      if (diff > 1) {
        return this.$dayjs(this.tweet.created_at * 1000).format(
          "MM-DD HH:mm:ss"
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
      } catch (e) {
        this.$notification.open({
          duration: 5000,
          message: `获取广播详情失败！`,
          position: "is-top-right",
          type: "is-danger",
          hasIcon: true
        });
      }
    },
    async handlePublishReply() {},
    async hanleDelete() {
      const result = window.confirm("确认删除这条广播?");
      if (result) {
        try {
          const resp = await this.$request.delete("/tweet/" + String(this.tid));
          if (resp.data.success) {
            if (this.$route.name === "home") Bus.$emit("reload");
            if (this.$route.name === "detail") this.$router.push("/");
          }
        } catch (e) {
          alert(e);
        }
      }
    },
    async handleLike() {
      this.tweet.likes_count += 1;
    },
    async hanleReply() {
      this.reply.status = !this.reply.status;
      this.retweet.status = false;
      if (this.reply.status) {
        const resp = await this.$request(
          "/tweet/" + String(this.tid) + "/reply"
        );
        // console.log(resp.data)
        this.reply.list = resp.data.list;
      }
    },
    previewImage(url) {
      this.previewUrl = url;
      this.isImageModalActive = true;
    },
    async hanleRetweet() {
      this.retweet.status = !this.retweet.status;
      this.reply.status = false;
      // if (this.reply.status) {
      //   const resp = await this.$request(
      //     "/tweet/" + String(this.tid) + "/reply"
      //   );
      //   // console.log(resp.data)
      //   this.reply.list = resp.data.list;
      // }
    }
  }
};
</script>

<style lang="css" scoped>
hr {
  height: 1px;
}
.tweet-pic img {
  cursor: zoom-in;
  max-width: 50%;
  max-height: 300px;
}
.retweet-wrapper {
  padding: 1.5rem;
}
nav span {
  line-height: 1rem;
}
span.created_at {
  margin-right: 1.5rem !important;
}
@media screen and (max-width: 1087px) {
  span.created_at {
    margin-right: 0 !important;
  }
}
span.created_at:hover {
  /* background-color: #7a7a7a; */
  background-color: hsl(0, 0%, 48%);
  color: white !important;
}
span.links:hover {
  background-color: #37a;
  color: white !important;
}
.has-text-link {
  color: #37a !important;
}
span.count {
  cursor: initial;
}
span.delete-tweet:hover {
  background-color: hsl(348, 100%, 61%);
  color: white;
}
.reply-list li {
  margin-bottom: 0.5rem;
}
</style>
