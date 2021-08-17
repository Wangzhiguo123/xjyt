<!--面包屑导航条-->
<template>
  <div class="bread-crumb-head">
    <img class="img" src="./logo.png" alt="" srcset="" />
    <el-breadcrumb separator="|">
      <el-breadcrumb-item
        v-for="(item, index) in beforeRouterList"
        :key="index"
        :to="item.router"
        >{{ item.name }}</el-breadcrumb-item
      >
      <el-breadcrumb-item class="currentRoute">{{
        localeRouter
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    //上级路由列表
    beforeRouterList: {
      type: Array,
      default() {
        return [];
      },
    },
    //当前路由名称
    localeRouter: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.bread-crumb-head {
  height: 41px;
  width: 100%;
  left: 280px;
  top: 0px;
  line-height: 40px;
  background: #f7f8fc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  .img {
    width: 17px;
    height: 14px;
    margin-right: 10px;
  }
  .currentRoute {
    color: #000 !important;
    line-height: 40px;
  }
}
/deep/ .el-breadcrumb__inner.is-link {
  color: #999999;
  font-weight: normal;
  font-size: 14px;
  line-height: 40px;
  &:hover {
    color: red;
  }
}
/dee/ .el-breadcrumb {
  line-height: 40px;
}
</style>
