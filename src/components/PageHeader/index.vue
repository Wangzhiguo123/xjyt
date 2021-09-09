<!--
 * @Description: 模块页新增、编辑、详情 页面 头部 标题及操作按钮组
 * @Date: 2021-08-26 16:15:08
 * @LastEditTime: 2021-09-03 17:40:44
-->
<template>
  <header class="header">
    <span class="left">{{ title }}</span>
    <p class="btns">
      <!-- 按钮组插槽 -->
      <slot name="btns"></slot>
    </p>
  </header>
</template>
<script>
export default {
  props: {
    // 当前页面的功能标题
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
  .left {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Regular;
  }
}
</style>
