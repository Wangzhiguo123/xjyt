<!--
 * @Description: 
 * @Autor: hh
 * @Date: 2021-08-17 17:14:03
 * @LastEditTime: 2021-08-25 12:03:24
-->
<template>
  <div id="app">
    <el-container>
      <el-aside>
        <side-bar />
      </el-aside>
      <el-main>
        <bread-crumb-head locale-router="知识库管理"></bread-crumb-head>
        <main class="main-container">
          <div class="main-content">
            <router-view />
          </div>
        </main>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import SideBar from "@/components/Sidebar";

import breadCrumbHead from "@/components/Breadcrumb";
export default {
  name: "App",
  components: {
    SideBar,
    breadCrumbHead,
  },
  data() {
    return {
      menuData: this.$router.options.routes,
    };
  },
};
</script>

<style lang="less" scoped>
@import "./assets/reset.css";
#app {
  width: 100%;
  height: 100%;
}
/deep/.el-container {
  height: 100%;
}
/deep/.el-main {
  width: calc(100vw - 400px);
  height: 100%;
  padding: 0 !important;
  .main-container {
    display: flex;
    padding: 16px;
    min-height: calc(100vh - 55px);
    box-sizing: border-box;
    background: #f0f2f5;
    .main-content {
      width: 100%;
      min-height: calc(100vh - 87px);
      background-color: #fff;
    }
  }
}
</style>
<style>
@import "./assets/sidebar.less";
</style>
