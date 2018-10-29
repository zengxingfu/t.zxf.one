<template>
<article class="media">
  <figure class="media-left">
    <p class="image is-48x48">
      <img :src="$store.state.host.avatar">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{$store.state.host.nickname}}</strong> <small v-if="type===100">说：</small><small v-else>转发：</small>
        <br>
        <!-- 正文 -->
        {{content}}
        <!-- 图片 -->
        <div @click="showModal=true" class="tweet-image" v-if="image" :style="`background-image:url(${image})`"></div>
        <!-- 转发正文 -->
        <div v-if="type===101" class="retweet-content">
          <div class="media-content">
            <p>
              <strong>{{$store.state.host.nickname}} </strong> <small> 说：</small><br>
              {{origin.content}}
              <div @click="showModal=true" class="tweet-image" v-if="origin.image" :style="`background-image:url(${origin.image})`"></div>
            </p>
          </div>
        </div>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a @click="$router.push(`/detail/${_id}`)" class="level-item created_at">{{created_at}}</a>
        <a @click="handleReply" class="level-item replies">{{replies === 0 ? '' : replies}} 回应</a>
        <a @click="handleLike" v-bind:class="{'disabled': liked_d}" class="level-item likes"><span>赞 {{likes_d === 0 ? '' : `(${likes_d})`}}</span></a>
        <a class="level-item retweets"><span>转发 {{retweets === 0 ? '' : `(${retweets})`}}</span></a>
      </div>
    </nav>
    <!-- 回应列表 -->
    <ul v-show="reply.status" class="reply-list">
      <li v-for="item in reply.list" :key="item._id">
        <strong>{{item.nickname}}</strong>：{{item.content}}
      </li>
    </ul>
  </div>
  <div @click="showModal=false" class="modal" v-bind:class="{'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <p class="image">
      <img v-if="type===100" class="original-image" :src="image" alt="">
      <img v-else class="original-image" :src="origin.image" alt="">
    </p>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>
</article>
</template>

<script>
export default {
  name: "Tweet",
  data() {
    return {
      showModal: false,
      likes_d: this.likes,
      liked_d: this.liked,
      reply: {
        list: [],
        status: false
      }
    };
  },
  props: {
    _id: String,
    created_at: String,
    replies: Number,
    likes: Number,
    retweets: Number,
    content: String,
    image: String,
    type: Number,
    origin: Object,
    liked: Boolean
  },
  methods: {
    handleLike() {
      if (!this.liked_d) {
        const vm = this;
        this.$request
          .post(`/tweet/${this._id}/like`)
          .then(res => {
            if (res.data.success === 1) {
              let likedList = [];
              if (localStorage.getItem("likedList")) {
                likedList = JSON.parse(localStorage.getItem("likedList"));
              }
              if (likedList.indexOf(vm._id) < 0) {
                likedList.push(vm._id);
                localStorage.setItem("likedList", JSON.stringify(likedList));
              }
              vm.liked_d = true;
              vm.likes_d += 1;
            }
          })
          .catch(err => {
            console.log(err);
            alert(err);
          });
      }
    },
    handleReply() {
      const vm = this;
      if (vm.reply.list.length === 0) {
        this.$request
          .get(`/tweet/${vm._id}/reply`)
          .then(res => {
            if (res.data.success === 1) {
              vm.reply.list = res.data.list;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      vm.reply.status = !vm.reply.status;
    }
  }
};
</script>

<style>
@media screen and (max-width: 768px) {
  .media-content {
    overflow-x: initial !important;
  }
}
.media {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
a.level-item {
  font-weight: 500;
  line-height: 1em;
  font-size: 0.875em;
  color: #7094b7;
}
a.level-item:hover {
  color: white;
  background-color: #7094b7;
}
a.created_at {
  margin-right: 20px !important;
  color: #999;
}
a.created_at:hover {
  color: white;
  background-color: #999;
}

.content p {
  line-height: 2em;
  font-size: 0.875em;
}
.tweet-image {
  max-width: 50%;
  min-height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: zoom-in;
}
.modal-content img {
  cursor: zoom-out;
}
.retweet-content {
  padding: 20px;
  background-color: #f9f9f9;
}
.disabled,
.disabled:hover {
  color: #999 !important;
  cursor: text !important;
  background: transparent !important;
}
.reply-list {
  font-size: 0.875em;
}
</style>