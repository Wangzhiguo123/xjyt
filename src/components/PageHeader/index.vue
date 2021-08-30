<!--
 * @Description: 页面头部标题及按钮组
 * @Date: 2021-08-26 16:15:08
 * @LastEditTime: 2021-08-26 16:23:53
-->
<template>
  <header class="header">
    <span class="left">{{ title }}</span>
    <p class="btns">
      <slot name="btns"></slot>
    </p>
  </header>
</template>
<script>
export default {
  props: {
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
