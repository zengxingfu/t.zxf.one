<template>
  <div class="input-wrapper field">
    <label class="label">💬 说句话</label>
    <div class="control">
      <!-- <input class="input" type="text" placeholder="Text input"> -->
      <textarea v-on:blur="onblurInput" v-on:focus="onfocusInput" :rows="rows" class="textarea" placeholder="e.g. Hello world"></textarea>
    </div>
<div v-show="!hideButton" class="field is-grouped is-grouped-right">
      <p class="control">
        <div class="file has-name">
          <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                上传照片
              </span>
            </span>
            <span class="file-name">
              🌇
            </span>
          </label>
        </div>
      </p>
      <p class="control">
        <a class="button is-light">
          📌 发布
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: 1,
      hideButton: true
    };
  },
  methods: {
    onfocusInput() {
      this.rows = 3;
      this.hideButton = false;
    },
    onblurInput() {
      this.rows = 1;
      this.hideButton = true;
    }
  }
};
</script>

<style scoped>
.input-wrapper.field {
  padding-bottom: -20px;
}

.field.is-grouped {
  padding-top: 20px;
}

p.control {
  padding-left: 20px;
}
</style>