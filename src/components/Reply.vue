<template>
    <div>
        <article class="media">
          <figure class="media-left">
            <p class="image is-32x32">
              <img :src="avatar+'?d=retro'">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{nickname}}</strong> <small> {{created_at}} </small>
                <br>
                <!-- 正文 -->
                {{content}}
              </p>
            </div>
          </div>
          <!-- modal -->
        </article>
    </div>
</template>

<script>
export default {
  props: ["avatar", "content", "created_at", "nickname"]
};
</script>

<style scoped>
</style>