<!--
 * @Description: 面包屑
 * @Date: 2021-08-24 14:48:03
 * @LastEditTime: 2021-09-03 16:45:16
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
    <!-- <div v-if="selectShow" class="selectModel">
      <el-select
        v-model="value"
        filterable
        placeholder="请选择"
        style="width: 160px"
        class="selectInput"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div> -->
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
      // options: [
      //   {
      //     value: "选项1",
      //     label: "采气一场",
      //   },
      //   {
      //     value: "选项2",
      //     label: "百口泉采气厂",
      //   },
      //   {
      //     value: "选项3",
      //     label: "采气二场",
      //   },
      // ], //告警地图下拉框
      // value: "", //下拉框参数
      selectShow: false, //是否展示下拉框
    };
  },
  watch: {
    $route(route) {
      if (route.path === '/alarmMap') { //判断是否告警地图
        this.selectShow = true;
      } else {
        this.selectShow = false;
      }
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
  position: sticky;
  top: 0;
  display: block;
  font-size: 14px;
  line-height: 50px;
  padding-left: 8px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  .no-redirect {
    color: rgba(0, 0, 0, 0.85);

    cursor: text;
  }
  .selectModel {
    position: absolute;
    right: 300px;
  }
}
</style>
