<template>
<section class="hero is-medium">
  <div class="hero-body">
    <div class="container">
      <span @click="$router.push('/')" class="title">小广播</span><br><br>
      <span class="subtitle">中国有一句话叫「闷声大发财」，我就什么话也不说，这是最好的！</span>
    </div>
  </div>
</section>
</template>

<script>
export default {};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .container {
    text-align: center;
  }
}
.title {
  color: white;
  background: #222222;
  font-weight: 400;
  padding: 10px 20px 10px 20px;
  font-size: 1em;
  cursor: pointer;
}
.subtitle {
  font-size: 0.875rem;
  color: #999999;
}
</style>