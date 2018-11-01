<template>
  <div class="user-info-container">
    <md-card class="user-info-card">
      <md-card-header class="user-info-content">
        <md-avatar>
          <img src="https://vuematerial.io/assets/examples/avatar.png" alt="Avatar">
        </md-avatar>
        <div class="md-title">Anonymous</div>
        <div class="md-subhead">欢迎你，也不欢迎。</div>
      </md-card-header>
          <md-card-actions>
          <md-button>👉访客登记</md-button>
        </md-card-actions>

    </md-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-info-container {
  margin-bottom: 20px;
}
.user-info-card {
  background-color: #fff6ed;
  margin: 0;
  padding: 0;
}
.user-info-content {
  padding-bottom: 0;
}
</style>