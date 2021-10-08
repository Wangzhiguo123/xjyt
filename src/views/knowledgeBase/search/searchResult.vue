<!--
 * @Description: 搜索结果页
 * @Date: 2021-08-24 17:01:05
 * @LastEditTime: 2021-09-08 09:12:53
-->
<template>
  <div class="res-container">
    <header class="header">
      <search-box
        :keyword.sync="keyword"
        style="width: 75%"
        @handleInput="handleInput"
        @handleSearch="handleSearch"
      ></search-box>
      <search-nav
        direction="down"
        :id="classificationId"
        :defaultList="defaultList"
        :moreList="moreList"
        @handleClick="handleClick"
      ></search-nav>
    </header>

    <main class="content" @scroll.passive="listScroll">
      <section class="items" v-for="it in searchList" :key="it.articleId">
        <search-item :result="it"></search-item>
      </section>
      <section>
      <!-- <div class="pagination" v-if="showPagination && tableData.length > 0">
        <el-pagination
          style="margin-top: 30px"
          :current-page="current"
          :layout="pageLayout.pageLayout"
          background
          :page-size="size"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          prev-text="上一页"
          next-text="下一页"
        >
        </el-pagination>
      </div> -->
    </section>
    </main>
  </div>
</template>
<script>
import SearchBox from "./component/SearchBox";
import SearchNav from "./component/SearchNav";
import SearchItem from "./component/SearchItem";

import { getAllClassifyList, getSearchList } from "@/api/modules/knowledgeBase";

import { getQueryString } from "@/utils";
export default {
  components: {
    SearchBox,
    SearchNav,
    SearchItem,
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
      // 地址栏参数对象
      urlParams: {},

      // 分类
      classifyList: [],
      // 选中分类
      keyword: "",
      classificationId: "",

      // 当前页
      currentPage: 1,
      // 总页数
      totalPages: 0,
      searchList: [],
    };
  },
  created() {
    this.getAllClassifyList();
    this.urlParams = getQueryString();
    this.initData();
    // window.addEventListener("scroll", this.listScroll, true);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.listScroll, true);
  },
  methods: {
    /**
     * @description: 处理默认数据
     * @param {*}
     */
    initData() {
      this.keyword = this.urlParams.keyword;

      this.classificationId = this.urlParams.id;

      this.getSearchList();
    },
    /**
     * @description: 获取所有分类数据
     * @param {*}
     */
    async getAllClassifyList() {
      let { data } = await getAllClassifyList();
      if (data.code === undefined) {
        this.classifyList = data;
      }
    },
    /**
     * @description: 输入内容改变
     * @param {*} res 输入内容
     */
    handleInput(res) {
      this.keyword = res;
    },
    /**
     * @description: 搜索确定
     * @param {*}
     */
    handleSearch() {
      this.resetParam();
      this.getSearchList();
    },
    /**
     * @description: 标签点击
     * @param {*} idx
     */
    handleClick(res) {
      this.classificationId = res;
      this.resetParam();
      this.getSearchList();
    },
    /**
     * @description: 重置参数
     * @param {*}
     */
    resetParam() {
      this.currentPage = 1;
      this.searchList = [];
    },
    /**
     * @description: 搜索事件
     * @param {*}
     */
    async getSearchList() {
      let { data } = await getSearchList({
        classificationId: this.classificationId,
        keyword: this.keyword,
        page: this.currentPage,
        size: 10,
      });
      if (data.cdoe === undefined) {
        if (!data.content.length) {
          this.$message.closeAll();
          this.$message({
            type: "info",
            message: "暂无搜索结果",
          });
        }
        this.totalPages = data.totalPages;
        this.searchList = [...this.searchList, ...data.content];
      }
    },
    /**
     * @description: 滚动事件
     * @param {*}
     * @return {*}
     */
    // listScroll(e) {
    //   let target = e.target;
    //   if (target.scrollHeight - 50 < target.scrollTop + target.offsetHeight) {
    //     if (this.currentPage < this.totalPages) {
    //       ++this.currentPage;
    //       this.getSearchList();
    //     }
    //   }
    // },
  },
};
</script>
<style lang="less" scoped>
.res-container {
  .header {
    position: sticky;
    top: 0;
    padding: 32px 0 0 40px;
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
  }
  .content {
    padding: 0 40px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
