<template>
  <section class="hero is-light">
    <div class="top-bar has-background-grey-dark is-size-7">
      <nav>
        <ul>
          <a href="https://reader.zxf.one">
            <li>READER</li>
          </a>
          <a href="https://zxf.one">
            <li>BLOG</li>
          </a>
          <a class="right-nav">
            <li>LOGIN</li>
          </a>
          <!-- <b-dropdown class="right-nav" position="is-right" aria-role="list">
            <li class="right-li" slot="trigger">登录</li>
            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
          </b-dropdown>-->
        </ul>
      </nav>
      <div class="clear"></div>
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-4">📻小广播</h1>
        <p class="is-size-65">如果你爱我，我要向全世界广播</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>
<style lang="css" scoped>
.top-bar {
  padding: 0 12px;
  height: 28px;
  width: 100%;
}
.clear {
  clear: both;
}
.top-bar p.tag {
  text-align: right;
  cursor: pointer;
}
.top-bar li {
  list-style: none;
  line-height: 28px;
  float: left;
  padding: 0 12px;
  color: hsl(0, 0%, 71%);
}
.right-nav {
  float: right;
}
.top-bar li:hover {
  color: hsl(0, 0%, 98%);
}
</style>
