<template>
  <div id="app">
    <el-container>
      <el-aside width="280px">
        <el-menu router>
          <div class="projectLogo">
            <img src="./assets/logo.png" alt="" srcset="" />
            <h1>生产调度指挥系统</h1>
          </div>
          <NavMenu :nav-menus="menuData"></NavMenu>
        </el-menu>
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu";

export default {
  name: "App",
  components: {
    NavMenu,
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
.projectLogo {
  width: 100%;
  background: #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;
  color: #ffffff;
  padding-top: 16px;
  img {
    width: 50px;
    height: 50px;
  }
}
/deep/.el-main {
  padding: 0 !important;
  height: 100%;
}
/deep/.el-menu {
  background-color: #0a0b11;
  border-right: none;
}
/deep/ .el-aside {
  background-color: #0a0b11;
  overflow: hidden;
}
</style>
