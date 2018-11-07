<template>
  <div class="input-wrapper field">
    <label class="label">💬 说句话</label>
    <div class="control">
      <!-- <input class="input" type="text" placeholder="Text input"> -->
      <textarea v-model="payload.content" v-on:blur="onblurInput" v-on:focus="onfocusInput" :rows="rows" class="textarea" placeholder="e.g. Hello world"></textarea>
    </div>
    <div v-show="!hideButton" class="field is-grouped position-group">
      <label class="checkbox">
        <input v-on:change="handleLocate" v-model="payload.addLocation" type="checkbox">
        定位 
      </label>
      <span v-show="payload.addLocation" class="location"> | 📍 {{payload.locationDisplay}}</span>
    </div>
    <div v-show="!hideButton" class="field is-grouped is-grouped-right">
      <p class="control">
        <div class="file has-name is-small">
          <label class="file-label">
            <input v-on:change="handleImageLoad" class="file-input" type="file" name="file">
            <span class="file-cta">
              <span class="file-label is-loading">
                🌄 上传照片
              </span>
            </span>
            <span class="file-name">
              {{uploadAreaDisplay}}
            </span>
          </label>
        </div>
      </p>
      <p class="control">
        <a :disabled="payload.content.length === 0" class="button is-light is-small" v-bind:class="{'is-loading': publishing}" @click="publish">
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
        image: null,
        fileName: null,
        uploadToken: "",
        uploading: false,
        addLocation: false,
        locationDisplay: "正在定位……"

      }
    };
  },
  computed: {
    uploadAreaDisplay() {
      if (!this.payload.fileName) return "等待添加图片";
      if (this.payload.fileName && this.payload.uploading)
        return "上传中，请等待……";
      if (this.payload.image) return "上传成功！";
    }
  },
  methods: {
    handleLocate(e) {
      // console.log(e.target.checked);
      const vm = this;
      function getAddress(longitude, latitude) {
        var myGeo = new BMap.Geocoder();
        // 根据坐标得到地址描述
        myGeo.getLocation(new BMap.Point(longitude, latitude), function(
          result
        ) {
          if (result) {
            // alert(result.address);
            vm.payload.locationDisplay = result.address;
          } else {
            vm.payload.locationDisplay = null;
          }
        });
      }
      if (this.payload.addLocation) {
        const geolocation = new BMap.Geolocation();
        // 开启SDK辅助定位
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // alert("您的位置：" + r.point.lng + "," + r.point.lat);
            getAddress(r.point.lng, r.point.lat);
          } else {
            alert("failed" + this.getStatus());
            vm.payload.locationDisplay = null;
          }
        });
      }
    },
    uploadImage(file, token) {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("token", token);
      this.payload.uploading = true;
      this.$upload({
        url: "https://up-z1.qiniup.com/",
        method: "post",
        data: formdata
      })
        .then(res => {
          // console.log(res.data)
          this.payload.image = res.data.key;
          this.payload.uploading = false;
        })
        .catch(err => {
          console.log(err);
          alert(err);
          this.payload.uploading = false;
        });
    },
    handleImageLoad(e) {
      const file = e.target.files[0];
      // console.log(file)
      const allowTypes = ["image/png", "image/jpeg", "image/gif"];
      if (allowTypes.indexOf(file.type) >= 0) {
        // get upload token
        this.payload.fileName = file["name"];
        this.$request
          .get("/upload/token")
          .then(res => {
            if (res.data.success === 1) {
              const token = res.data.token;
              this.uploadImage(file, token);
            }
          })
          .catch(err => {
            console.log(err);
            alert(err);
          });
      } else {
        alert("请选择图片文件上传！");
      }
    },
    onfocusInput() {
      this.rows = 2;
      this.hideButton = false;
    },
    onblurInput() {
      if (this.payload.content.length === 0) {
        this.rows = 1;
        this.hideButton = true;
      }
    },
    publish() {
      if (this.payload.content.length > 0) {
        if (this.payload.fileName && !this.payload.image) {
          alert("图片上传中，请等待……");
          return false;
        }
        const vm = this;
        vm.publishing = true;
        const params = new URLSearchParams();
        params.append("content", vm.payload.content);
        if (vm.payload.image) params.append("image", vm.payload.image);
        if (vm.payload.addLocation)
          params.append("location", vm.payload.locationDisplay);
        vm.$request
          .post("/tweet", params)
          .then(result => {
            if (result.data.success === 1) {
              vm.payload.content = "";
              vm.payload.image = null;
              vm.publishing = false;
              vm.payload.fileName = null;
              vm.$router.push("/");
              Bus.$emit("reload");
            }
          })
          .catch(err => {
            vm.publishing = false;
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.input-wrapper .label,
textarea {
  font-size: 0.875rem;
}
.input-wrapper.field {
  padding-bottom: -20px;
}

.position-group {
  padding-top: 10px;
}

p.control {
  padding-left: 20px;
}
.checkbox,
span.location {
  font-size: 0.875rem;
}
.checkbox {
  margin-right: 5px;
}
</style>