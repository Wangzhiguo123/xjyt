<!--
 * @Description: 导航栏组件
 * @Autor: hh
 * @Date: 2021-08-19 15:10:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 17:38:43
-->
<template>
  <nav class="nav">
    <a
      :class="[item.key === $route.name ? 'actived' : '', 'item']"
      v-for="item in navData"
      :key="item.key"
      @click="handleNavigator(item)"
      href="javascript:void(0);"
    >
      {{ item.value }}
    </a>
  </nav>
</template>
<script>
export default {
  props: {
    // 导航数据
    navData: {
      type: Array,
      default: () => {
        return [
          {
            value: "知识管理",
            key: "knowledgeManage",
          },
          {
            value: "类别管理",
            key: "classifyManage",
          },
          {
            value: "标签管理",
            key: "labelsManage",
          },
        ];
      },
    },
  },
  methods: {
    /**
     * @description: 页面跳转
     * @param {*} item 跳转对象
     * @return {*}
     */
    handleNavigator(item) {
      this.$router.push({
        name: item.key,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  height: 56px;
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
  .item {
    position: relative;
    padding: 0 8px 0 16px;
    line-height: 56px;
  }
  .actived {
    color: #1982ed;
    &::after {
      display: inline-block;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #1982ed;
      width: 100%;
      height: 1px;
    }
  }
}
</style>
