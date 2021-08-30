<!--
 * @Description: 搜索框组件
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-19 10:50:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 16:35:32
-->
<template>
  <div class="search-box">
    <el-input
      placeholder="请输入关键词"
      v-model="inputInfo"
      clearable
      @input="handleInput"
      @keyup.enter.native="handleSearch"
    >
      <template slot="append"> </template>
    </el-input>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 关键词
      inputInfo: "",
    };
  },
  methods: {
    /**
     * @description: 输入
     * @param {*}
     */
    handleInput() {
      this.$emit("update:keyword", this.inputInfo);
    },
    /**
     * @description: 处理搜索事件
     * @param {*}
     * @return {*}
     * @author: hh
     */
    handleSearch() {
      this.$emit("handleSearch");
    },
  },
  created() {
    this.inputInfo = this.keyword;
  },
};
</script>
<style lang="less" scoped>
.search-box{
  display: flex;
}
</style>
