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
        <strong>{{$store.state.host.nickname}}</strong> <small>说：</small>
        <br>
        {{content}}
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item created_at">{{created_at}}</a>
        <a class="level-item replies">{{replies === 0 ? '' : replies}} 回应</a>
        <a class="level-item likes"><span>赞 {{likes === 0 ? '' : `(${likes})`}}</span></a>
        <a class="level-item retweets"><span>转发 {{retweets === 0 ? '' : `(${retweets})`}}</span></a>
      </div>
    </nav>
  </div>
</article>
</template>

<script>
export default {
  name: "Tweet",
  props: {
    created_at: String,
    replies: Number,
    likes: Number,
    retweets: Number,
    content: String
  }
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .media-content {
    overflow-x: unset;
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
  line-height: 1.5em;
}
</style>