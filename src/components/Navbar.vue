<template>
  <div class="navbar">
    <div class="nav-link">
      <!-- <span class="icon"><i class="fas fa-chevron-left"></i></span> -->
      <a href="#"> 👈学习一个</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  width: 100vw;
  background: #222222;
  min-height: 28px;
  height: 28px;
  font-size: 0.875em;
}
.navbar > .nav-link {
  margin-left: 14px;
  line-height: 28px;
}
.nav-link a {
  color: #d5d5d5;
}
.nav-link a:hover {
  color: white;
  text-decoration: underline;
}
</style>