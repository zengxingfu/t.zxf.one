<template>
  <div class="paginator">
    <span class="prev">
      <a v-if="!isFirst" class="page-number" @click="changePage(-1, null)">
        &lt;前页
      </a>
      <a v-else class="page-number disabled">
        &lt;前页
      </a>
    </span>
    <a
     v-bind:class="{'thispage': page === pageNumber}"
     class="page-number"
     v-for="pageNumber in TotalPageList[groupIndex]"
     :key="pageNumber"
     @click="changePage(0, pageNumber)"
     >&nbsp;{{pageNumber}}&nbsp;</a>
    <!-- <span class="thispage">1</span>
    <a href="?p=2">2</a>
    <a href="?p=3">3</a> -->
    <span v-if="groupIndex < TotalPageList.length - 1" class="break">...</span>
    <span class="next">
      <a v-if="!isLast" class="page-number" @click="changePage(1, null)">后页&gt;</a>
      <a v-else class="page-number disabled">后页&gt;</a>
    </span>

  </div>
</template>

<script>
import Bus from "../bus.js";
export default {
  data() {
    return {
      // currentPageList: []
    };
  },
  computed: {
    isFirst() {
      return this.page === 1;
    },
    isLast() {
      return this.page * this.limit >= this.count;
    },
    TotalPageList() {
      const pageCount = Math.ceil(this.count / this.limit);
      const groupCount = Math.ceil(pageCount / 10);
      let list = [];
      for (let n = 1; n <= groupCount; n++) {
        let group = [];
        let i = (n - 1) * 10 + 1;
        while (group.length < 10) {
          group.push(i);
          if (i === pageCount) break;
          i++;
        }
        list.push(group);
      }
      return list;
    },
    groupIndex() {
      return Math.ceil(this.page / 10) - 1;
    }
  },
  props: ["count", "limit", "page"],
  created() {},
  methods: {
    changePage(add, changeTo) {
      if (changeTo) {
        if (changeTo !== this.page) {
          this.$router.push(`/page/${changeTo}`);
          Bus.$emit("reload");
        }
      } else {
        this.$router.push(`/page/${this.page + add}`);
        Bus.$emit("reload");
      }
    }
  }
};
</script>

<style scoped>
.paginator {
  padding-top: 40px;
  text-align: center;
  font-weight: 400;
}
.paginator span a {
  font-size: 0.875rem;
}

.prev {
  margin-right: 20px;
}

.next {
  margin-left: 20px;
}

.page-number {
  margin-left: 5px;
  margin-right: 5px;
  color: #222222;
}

.page-number:hover {
  color: white;
  cursor: pointer;
  background-color: #222222;
}

.disabled,
.disabled:hover {
  color: #999;
  cursor: text;
  background-color: transparent;
}

.thispage,
.thispage:hover {
  background-color: rgb(255, 246, 237);
  color: #4a4a4a;
  cursor: text;
  border: 1px solid rgba(10, 10, 10, 0.1);
}
</style>