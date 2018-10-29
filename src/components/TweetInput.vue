<template>
  <div class="input-wrapper field">
    <label class="label">💬 说句话</label>
    <div class="control">
      <!-- <input class="input" type="text" placeholder="Text input"> -->
      <textarea v-model="payload.content" v-on:blur="onblurInput" v-on:focus="onfocusInput" :rows="rows" class="textarea" placeholder="e.g. Hello world"></textarea>
    </div>
<div v-show="!hideButton" class="field is-grouped is-grouped-right">
      <p class="control">
        <div class="file has-name">
          <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
              <span class="file-label">
                🌄 上传照片
              </span>
            </span>
            <span class="file-name">
              image file
            </span>
          </label>
        </div>
      </p>
      <p class="control">
        <a :disabled="payload.content.length === 0" class="button is-light" v-bind:class="{'is-loading': publishing}" @click="publish">
          📌 发布
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Bus from "../bus.js";
export default {
  data() {
    return {
      rows: 1,
      hideButton: true,
      publishing: false,
      payload: {
        content: "",
        image: ""
      }
    };
  },
  methods: {
    onfocusInput() {
      this.rows = 3;
      this.hideButton = false;
    },
    onblurInput() {
      if (this.payload.content.length === 0) {
        this.rows = 1;
        this.hideButton = true;
      }
    },
    publish() {
      const vm = this;
      vm.publishing = true;
      const params = new URLSearchParams();
      params.append("content", vm.payload.content);
      params.append("image", vm.payload.image);
      vm.$request
        .post("/tweet", params)
        .then(result => {
          if (result.data.success === 1) {
            Bus.$emit("reload");
            vm.payload.content = "";
            vm.payload.image = "";
            vm.publishing = false;
          }
        })
        .catch(err => {
          vm.publishing = false;
          console.log(err);
        });
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