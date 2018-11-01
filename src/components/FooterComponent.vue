<template>
    <footer class="footer">
      <div class="content">
        <p class="container">
          <br>
            © 2011 – 2018  曾星富 <br>
            Powered by <a href="https://github.com/zengxingfu/tiny-tweet">Tiny Tweet</a>
        </p>
      </div>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  /* margin-top: 100px; */
  /* position: fixed;
  bottom: 0; */
  background-color: transparent;
}
.footer p {
  font-size: 0.875rem;
}
.footer a {
  font-weight: 600;
  color: #4a4a4a;
}
.footer a:hover {
  text-decoration: underline;
  /* color: black; */
}
.footer .container {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
</style>