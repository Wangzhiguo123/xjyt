<!--
 * @Description: 面包屑
 * @Date: 2021-08-24 14:48:03
 * @LastEditTime: 2021-08-24 16:27:45
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.menuName }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.menuName }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    /**
     * @description: 获取面包屑路由层级树
     * @param {*}
     */
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.menuName
      );
      // 首页添加
      const first = matched[0];

      // if (!this.isDashboard(first)) {
      //   matched = [
      //     { path: "/dashboard", meta: { menuName: "Dashboard" } },
      //   ].concat(matched);
      // }

      this.levelList = matched.filter(
        (item) =>
          item.meta && item.meta.menuName && item.meta.breadcrumb !== false
      );
    },
    /**
     * @description: 是否为首页
     * @param {*} route
     */
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    /**
     * @description: 处理上级路由跳转
     * @param {*} item
     */
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-breadcrumb__inner a,
/deep/.el-breadcrumb__inner.is-link {
  color: rgba(0, 0, 0, 0.45);
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: rgba(0, 0, 0, 0.85);

    cursor: text;
  }
}
</style>
