<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-19 10:41:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 16:51:42
-->
<template>
  <div class="search-wrap">
    <div class="search-main">
      <search-nav
        :defaultList="defaultList"
        :moreList="moreList"
        @handleClick="handleClick"
      ></search-nav>
      <search-box
        :keyword.sync="keyword"
        @handleInput="handleInput"
        @handleSearch="handleSearch"
      ></search-box>
    </div>
  </div>
</template>
<script>
import SearchNav from "./component/SearchNav";
import SearchBox from "./component/SearchBox";

import { getAllClassifyList } from "@/api/modules/knowledgeBase";
export default {
  name: "search",
  components: {
    SearchNav,
    SearchBox,
  },
  created() {
    this.getAllClassifyList();
  },
  computed: {
    // 默认展示
    defaultList() {
      let arr = this.classifyList.slice(0, 6);
      arr.unshift({
        classificationId: "",
        classificationName: "全部",
      });
      return arr;
    },
    // 更多展示
    moreList() {
      return this.classifyList.slice(6);
    },
  },
  data() {
    return {
      classifyList: [],

      classificationId: "",
      keyword: "",
    };
  },
  methods: {
    /**
     * @description: 获取所有分类数据
     * @param {*}
     */
    async getAllClassifyList() {
      let { data } = await getAllClassifyList();
      if (data.code === undefined) {
        this.classifyList = data.slice(0, 14);
      }
    },
    /**
     * @description: 分类点击
     * @param {*}
     */
    handleClick(id) {
      this.handlePageTo({
        id: id,
        keyword: this.keyword,
      });
    },
    /**
     * @description: 输入内容改变
     * @param {*}
     */
    handleInput(val) {
      this.keyword = val;
    },
    /**
     * @description: 输入内容确定
     * @param {*}
     */
    handleSearch() {
      this.handlePageTo({
        id: this.classificationId,
        keyword: this.keyword,
      });
    },
    /**
     * @description: 输入内容搜索确定
     * @param {*}
     * @return {*}
     */
    async handlePageTo({ id, keyword }) {
      this.$router.push({
        path: "/search-result",
        query: {
          id: id,
          keyword: keyword,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.search-wrap {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  .search-main {
    min-width: 50%;
  }
}
</style>
