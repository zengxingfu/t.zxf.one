<template>
  <div class="page-container">
    <md-app>
      <!-- header -->
      <!-- <md-app-toolbar class="md-dense">
        <span class="md-title">小广播</span>
        <div class="md-toolbar-section-end">
          <md-button>访客</md-button>
        </div>
      </md-app-toolbar> -->
      <!-- body -->
      <md-app-content>
        <div class="md-layout md-alignment-center">
          <div class="md-layout-item md-xlarge-size-60 md-large-size-70 md-medium-size-80 md-small-size-90">
            <hero></hero>
            <div class="md-layout md-alignment-top-space-between">
              <div class="tweets-container md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-55 md-small-size-55 md-xsmall-size-100">tweets-container</div>
              <div class="sider-container md-layout-item md-xlarge-size-30 md-large-size-30 md-medium-size-35 md-small-size-35 md-xsmall-size-100">sider-container</div>
            </div>
            <footer-component></footer-component>
          </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Hero from "../components/Hero";
import FooterComponent from "../components/FooterComponent";
export default {
  name: "layout",
  components: {
    Hero,
    FooterComponent
  }
};
</script>

<style scoped>
.tweets-container {
  background-color: aquamarine;
}
.sider-container {
  background-color: bisque;
}
</style>