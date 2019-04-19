<template>
  <footer class="footer has-background-white-ter">
    <div class="container has-text-left is-size-65">
      <p>
        © 2018 – 2019 ❤️
        <a
          class="has-text-weight-semibold has-text-dark"
          :href="'https://zxf.one?from=tiny-tweet-footer&at=' + new Date().getTime()"
        >曾高兴</a>
      </p>
      <p>
        Powered by
        <a
          class="has-text-weight-semibold has-text-dark"
          href="https://github.com/zengxingfu/tiny-tweet"
        >Tiny Tweet</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
