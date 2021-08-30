<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-19 10:37:29
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-08-19 15:41:51
-->
<template>
  <div class="knowledge-base">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Knowledge",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.knowledge-base {
  height: 100%;
  width: 100%;
}
</style>
