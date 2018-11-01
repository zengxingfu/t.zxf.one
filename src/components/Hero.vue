<template>
    <div class="hero">
        <div class="hero-content">
            <span class="logo-name md-subheading">小广播</span>
            <br>
            <br>
            <span class="md-body-1 subtitle">中国有一句话叫「闷声大发财」，我就什么话也不说，这是最好的！</span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.hero {
  height: 360px;
  text-align: left;
  vertical-align: center;
  display: flex;
}
.logo-name {
  padding: 0.75rem 1.25rem;

  color: white;
  background: #212121;
}
.hero-content {
  align-self: center;
}
span.subtitle {
  color: #757575;
  line-height: 2rem;
}
</style>