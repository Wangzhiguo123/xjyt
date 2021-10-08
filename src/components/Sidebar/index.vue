<!--
 * @Description: 侧边栏
 * @Autor: hh
 * @Date: 2021-08-20 10:58:21
 * @LastEditTime: 2021-08-27 16:57:01
-->
<template>
  <div class="has-logo">
    <div class="sidebar-logo-container">
      <router-link class="sidebar-logo-link" to="/">
        <img src="@/assets/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">生产指挥调度系统</h1>
      </router-link>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        text-color="rgba(255,255,255,0.65)"
        active-text-color="#fff"
        :unique-opened="false"
        :collapse-transition="false"
        @open="open"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { mapState } from "vuex";
export default {
  components: { SidebarItem },
  computed: {
     ...mapState("baseStore", ["themeColor"]),
    // 当前所有路由
    routes() {
      return this.$router.options.routes;
    },
    // 当前激活路由
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      console.log('themeColor',this.themeColor)
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      // 有父级优先父级高亮
      return meta.parentPath || path;
    },
  },
  methods: {
    /**
     * @description: 菜单展开事件触发
     * @param {*} res
     */
    open(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  padding-left: 18px;
  box-sizing: border-box;
  height: 64px;
  margin-bottom: 12px;
  line-height: 64px;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 64px;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Semibold;
      vertical-align: middle;
    }
  }
}
// /deep/.el-menu-item:hover {
//   background: red !important;
// }
// /deep/.el-menu-item.is-active {
//   background:red !important;
// }
</style>
