<!--
 * @Description: 搜索结果词条
 * @Autor: hh
 * @Date: 2021-08-19 13:56:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-30 09:27:37
-->
<template>
  <div class="container">
    <router-link
      :to="'/knowledge-detail/' + result.articleId"
      class="title"
      v-html="result.articleTitle"
    ></router-link>
    <section class="content" v-html="content"></section>
    <footer class="foot">
      <span class="item">作者：{{ result.createdByName }}</span>
      <span class="item"
        >发布时间：{{ result.articlePublishDateTime.split(" ")[0] }}</span
      >
    </footer>
  </div>
</template>
<script>
export default {
  props: {
    result: {
      type: Object,
    },
  },
  computed: {
    content() {
      return this.result.articleContent.replace(/<[^<>]+>/g, "");
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: block;
  padding: 24px 0 8px;
  .title {
    margin-bottom: 8px;
    font-size: 18px;
    color: #1468be;
    line-height: 26px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .content {
    margin-bottom: 8px;
    font-size: 14px;
    color: #595959;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .foot {
    .item {
      &:first-child {
        margin-right: 24px;
      }
      color: #b3b3b3;
      font-size: 14px;
    }
  }
}
</style>
