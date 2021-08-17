<template>
  <div class="navMenu">
    <template v-for="itemMenu in routerInfo">
      <el-menu-item
        v-if="!itemMenu.children && itemMenu.meta"
        :key="itemMenu.meta.menuName"
        :data="itemMenu"
        :index="itemMenu.meta.menuName"
        :route="itemMenu.path"
      >
        <i :class="itemMenu.meta.iconClass"></i>
        <span slot="title">{{ itemMenu.meta.menuName }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="itemMenu.children && itemMenu.meta"
        :key="itemMenu.meta.menuName"
        :data="itemMenu"
        :index="itemMenu.meta.menuName"
      >
        <template slot="title">
          <i :class="itemMenu.meta.iconClass"></i>
          <span> {{ itemMenu.meta.menuName }}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :nav-menus="itemMenu.children"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "NavMenu",
  props: {
    navMenus: {
      type: Array, //类型
      default: null, //默认值
    },
  },
  data() {
    return {
      isCollapse: true, //是否展开
      clientWidth: 0, //页面宽度
    };
  },
  computed: {
    routerInfo() {
      let data = this.navMenus.filter((item) => {
        if (item.children) {
          item.children.filter((sub) => {
            if (sub.meta.isMenu) {
              return sub;
            }
          });
        }
        if (item.meta.isMenu) {
          return item;
        }
      });
      return data;
    },
  },
  methods: {
    //展开指定的菜单
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    //需要收起的菜单
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang="less">
.navMenu {
  background-color: #0a0b11;
  color: #ffffff;
  height: 100%;
  padding: 10px;
}
/deep/ .el-submenu__title,
.el-menu-item,
.el-menu-item-group__title {
  color: #ffffff;
}
</style>
