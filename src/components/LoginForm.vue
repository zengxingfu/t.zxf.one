<template>
<div class="card">
    <header class="card-header">
    <p class="card-header-title">
      🔒 登陆
    </p>
  </header>
  <div class="card-content">
    <div class="content">
        <div class="field is-grouped">
            <p class="control is-expanded">
                <input class="input" type="text" placeholder="用户名">
            </p>
            <p class="control">
                <a class="button">
                Check
                </a>
            </p>
        </div>
        <div class="field">
            <div class="control">
                <input class="input verify-input" type="text" placeholder="安全码">
            </div>
            <p class="help">This is a help text</p>
        </div>
        <div class="control">
            <button class="button is-black submit">提交</button>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  max-width: 420px;
}
.button.is-black {
  background-color: #222222 !important;
}
.submit {
  width: 100%;
}
</style>