<template>
  <b-pagination
    :total="total"
    :current.sync="currentPage"
    :order="order"
    :size="size"
    :simple="isSimple"
    :rounded="isRounded"
    :per-page="limit"
    v-on:change="handleChangePage"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  ></b-pagination>
</template>

<script>
import Bus from "../bus.js";
export default {
  props: ["limit", "total", "page"],
  data() {
    return {
      currentPage: this.page,
      order: "",
      size: "is-small",
      isSimple: false,
      isRounded: false
    };
  },
  methods: {
    handleChangePage(val) {
      // console.log(val);
      this.$router.push({
        path: "/",
        query: { p: val }
      });
      Bus.$emit("changePage", val);
    }
  }
};
</script>