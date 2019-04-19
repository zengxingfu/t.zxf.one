<template>
  <div class="home">
    <Hero/>
    <section class="container">
      <div class="columns">
        <div class="column">
          <Tweet :tid="85"/>
        </div>
        <div class="column">Second column</div>
      </div>
    </section>
    <foot/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Footer from '@/components/Footer.vue'
import Tweet from '@/components/Tweet.vue'

export default {
  name: 'home',
  components: {
    Hero,
    foot: Footer,
    Tweet
  }
}
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
