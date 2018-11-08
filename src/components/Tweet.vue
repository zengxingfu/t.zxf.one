<template>
<article 
  v-on:mouseleave="mouseEnter=false" 
  v-on:mouseenter="mouseEnter=true" 
  class="media">
  <figure 
    v-bind:class="{'clickable': isInDetail}" 
    @click="handleAvatarClick" 
    class="media-left">
    <p class="image is-48x48">
      <img :src="$store.state.host.avatar">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong 
          v-bind:class="{'clickable': isInDetail}"
          @click="handleAvatarClick"
          >{{$store.state.host.nickname}}</strong> <small v-if="tweet.type===100">说：</small><small v-else>转发：</small>
        <br>
        <!-- 正文 -->
        {{tweet.content}}
        <!-- 图片 -->
        <div @click="showModal=true" class="tweet-image" v-if="tweet.image" :style="`background-image:url(${imageUrl(tweet.image)})`"></div>
        <span v-if="tweet.location" class="location">📍 {{tweet.location}}</span>
        <!-- 转发正文 -->
        <div v-if="tweet.type===101" class="retweet-content">
          <div v-if="tweet.origin" class="media-content">
            <p class="retweet-p">
              <strong>{{$store.state.host.nickname}} </strong> <small> 说：</small><br>
              {{tweet.origin.content}} <br>
              <div @click="showModal=true" class="tweet-image" v-if="tweet.origin.image" :style="`background-image:url(${imageUrl(tweet.origin.image)})`"></div>
              <span v-if="tweet.origin.location" class="location">📍 {{tweet.origin.location}}</span>
            </p>
          </div>
        </div>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a @click="handleCreatedAt" v-bind:class="{'unclickable': isInDetail}" class="level-item created_at">{{tweet.created_at}}</a>
        <a @click="handleReply" class="level-item replies">{{tweet.replies === 0 ? '' : tweet.replies}} 回应</a>
        <a @click="handleLike" v-bind:class="{'disabled': tweet.liked}" class="level-item likes"><span>赞 {{tweet.likes === 0 ? '' : `(${tweet.likes})`}}</span></a>
        <a @click="handleRetweet" class="level-item retweets"><span>转发 {{tweet.retweets === 0 ? '' : `(${tweet.retweets})`}}</span></a>
        <a v-if="$store.state.isLogin && mouseEnter" @click="handleDelete" class="level-item delete-tweet"><span>删除</span></a>
      </div>
    </nav>
    <!-- 回应列表 -->
    <ul v-show="reply.status" class="reply-list">
      <li v-for="item in reply.list" :key="item._id">
        <strong>{{item.nickname}}</strong>：{{item.content}}
      </li>
          <div class="quick-reply field is-grouped">
      <p class="control is-expanded">
        <input v-model="reply.quickInput" class="input is-small" type="text" placeholder="e.g. 我跟他谈笑风生">
      </p>
      <p class="control">
        <a :disabled="reply.quickInput.length===0" @click="publishQuickReply" class="button is-small">
          发表回应
        </a>
      </p>
    </div>
    </ul>
    <div v-show="retweet.status" class="quick-retweet field is-grouped">
 <p class="control is-expanded">
        <input v-model="retweet.quickInput" class="input is-small" type="text" placeholder="e.g. excited!">
      </p>
      <p class="control">
        <a :disabled="retweet.quickInput.length===0" @click="publishRetweet" class="button is-small">
          转发
        </a>
      </p>
    </div>

  </div>
  <div @click="showModal=false" class="modal" v-bind:class="{'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <p class="image" v-if="tweet.image">
      <img class="original-image" :src="imageUrl(tweet.image)" alt="">
      <!-- <img v-if="tweet.type===100 && $qiniuHost + tweet.origin.image" class="original-image" :src="$qiniuHost + tweet.origin.image" alt=""> -->
    </p>
    <p v-if="tweet.origin" class="image">
      <img v-if="tweet.origin.image" :src="imageUrl(tweet.origin.image)" alt="" class="original-image">
    </p>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>
</article>
</template>

<script>
import Bus from '../bus.js'
export default {
  name: 'Tweet',
  created() {
    this.fetchTweet()
  },
  data() {
    return {
      mouseEnter: false,
      tweet: {},
      showModal: false,
      reply: {
        list: [],
        status: false,
        quickInput: '',
        requested: false
      },
      retweet: {
        quickInput: '',
        status: false
      }
    }
  },
  computed: {
    isInDetail() {
      return this.$route.name === 'detail'
    }
  },
  props: {
    _id: String
  },
  methods: {
    imageUrl(key) {
      const param = `imageView2/0/q/75|watermark/1/image/aHR0cDovL3R3ZWV0LWNkbi56ZW5neGluZ2Z1LmNvbS9hc3NldHMvaW1hZ2V3YXRlcm1hcmtlX3YzLnBuZw==/dissolve/80/gravity/SouthEast/dx/10/dy/10|imageslim`
      return `${this.$qiniuHost}${key}?${param}`
    },
    fetchTweet() {
      this.$request
        .get(`/tweet/${this._id}`)
        .then(res => {
          if (res.data.success === 1) {
            this.tweet = res.data.data
            let likedList = localStorage.getItem('likedList')
            if (likedList) {
              likedList = JSON.parse(likedList)
            } else {
              likedList = []
            }
            this.tweet.liked = likedList.indexOf(this._id) >= 0
            this.tweet.created_at = this.$dayjs(
              this.tweet.created_at * 1000
            ).fromNow()
          }
        })
        .catch(err => {
          console.log(err)
          alert('广播不存在')
          this.$router.push('/')
        })
    },
    handleLike() {
      if (!this.tweet.liked) {
        const vm = this
        this.$request
          .post(`/tweet/${this._id}/like`)
          .then(res => {
            if (res.data.success === 1) {
              let likedList = []
              if (localStorage.getItem('likedList')) {
                likedList = JSON.parse(localStorage.getItem('likedList'))
              }
              if (likedList.indexOf(vm._id) < 0) {
                likedList.push(vm._id)
                localStorage.setItem('likedList', JSON.stringify(likedList))
              }
              this.tweet.likes += 1
              this.tweet.liked = true
            }
          })
          .catch(err => {
            console.log(err)
            alert(err)
          })
      }
    },
    handleReply() {
      const vm = this
      if (!vm.reply.requested) {
        this.$request
          .get(`/tweet/${vm._id}/reply`)
          .then(res => {
            if (res.data.success === 1) {
              vm.reply.list = res.data.list
              vm.reply.requested = true
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      if (this.$route.name === 'tweets') {
        vm.reply.status = !vm.reply.status
      }
      if (this.$route.name === 'detail') {
        window.location.hash = '#replies'
      }
      this.retweet.status = false
    },
    publishQuickReply() {
      if (this.reply.quickInput.length > 0) {
        const vm = this
        const params = new URLSearchParams()
        params.append('content', vm.reply.quickInput)
        params.append('email', vm.$store.state.user.email)
        params.append('nickname', vm.$store.state.user.nickname)
        params.append('avatar', vm.$store.state.user.avatar)
        vm.$request
          .post(`/tweet/${vm._id}/reply`, params)
          .then(res => {
            if (res.data.success === 1) {
              vm.reply.list.splice(0, 0, {
                nickname: vm.$store.state.user.nickname,
                email: vm.$store.state.user.email,
                content: vm.reply.quickInput,
                avatar: vm.$store.state.user.avatar
              })
              vm.reply.quickInput = ''
              vm.tweet.replies += 1
            }
          })
          .catch(err => {})
      }
    },
    handleRetweet() {
      this.retweet.status = !this.retweet.status
      this.reply.status = false
    },
    publishRetweet() {
      if (this.retweet.quickInput.length > 0) {
        if (this.$store.state.isLogin) {
          const params = new URLSearchParams()
          params.append('content', this.retweet.quickInput)
          this.$request
            .post(`/tweet/${this._id}/retweet`, params)
            .then(res => {
              if (res.data.success === 1) {
                if (this.$route.name === 'tweets') {
                  this.$router.push('/')
                  window.location.reload()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  this.$router.push('/detail/' + res.data.tweet_id)
                  window.location.reload()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }
            })
            .catch(err => {
              console.log(err)
              alert(err)
            })
        } else {
          alert('你为什么想要转发呢？')
        }
      }
    },
    handleCreatedAt() {
      this.$router.push(`/detail/${this._id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleDelete() {
      if (confirm('删除这条广播？')) {
        this.$request
          .delete(`/tweet/${this._id}`)
          .then(res => {
            if (res.data.success === 1) {
              if (this.$route.name === 'detail') {
                this.$router.back()
              } else {
                window.location.reload()
              }
            }
          })
          .catch(err => {
            console.log(err)
            alert(err)
          })
      }
    },
    handleAvatarClick() {
      if (this.isInDetail) {
        this.$router.push('/')
      }
    }
  }
}
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
  font-size: 0.875rem;
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
  font-size: 0.875rem;
}
.tweet-image {
  margin-bottom: 0.5rem;
  max-width: 50%;
  min-height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: zoom-in;
}
@media screen and (max-width: 768px) {
  .tweet-image {
    max-width: 90%;
    min-height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: zoom-in;
  }
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
  font-size: 0.875rem;
}
.reply-list li {
  padding-bottom: 5px;
}
.quick-reply {
  padding-top: 5px;
  /* width: 50%; */
}
.delete-tweet {
  color: #ec6149 !important;
}
.delete-tweet:hover {
  color: white !important;
  background: #ec6149 !important;
}
.clickable {
  cursor: pointer;
}
.unclickable {
  cursor: text;
}
</style>

<style scoped>
span.location {
  font-size: 0.75rem;
  color: #999;
}
.media-content p {
  margin-bottom: .25rem !important;
}
nav.level.is-mobile {
  margin-bottom: 0.5rem !important;
}
</style>
