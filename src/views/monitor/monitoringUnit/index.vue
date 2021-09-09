<!-- 监控单元信息查询 -->
<template>
  <div class="monitoringUnit">
    <section class="content">
      <div class="title">
        <span></span>
        <h3>监控单元详情</h3>
      </div>
      <div class="subject">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first" class="first">
            <el-row v-for="(item,index) in basicTit" :key="index">
              <el-col :span="3"
                ><div class="subTit">{{item.title}}</div></el-col
              >
              <el-col :span="12"
                ><div>{{basicDate.geoDescription}}</div></el-col
              >
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="生产动态" name="second">生产动态</el-tab-pane>
          <el-tab-pane label="监控画面" name="third">监控画面</el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MonitoringUnit",
  components: {
  },
  data() {
    return {
      // 面包屑配置
      breadcrumb: {
        beforeRouterList: [
          {
            name: "生产监控",
            router: {
              path: "",
            },
          },
        ],
        localeRouter: "监控单元信息查询",
      },
      activeName: "first",
      basicTit: [
        { title: "[所属区块]" },
        { title: "[计量站]" },
        { title: "[站类型]" },
        { title: "[阀组接口总数]" },
        { title: "[已用接口总数]" },
        { title: "[管辖井数]" },
        { title: "[计量方式]" },
        { title: "[是否无人值守]" },
        { title: "[所属脱水站名称]" },
        { title: "[用工人数]" },
        { title: "[投产日期]" },
        { title: "[运行状态]" },
        { title: "[位置信息]" },
      ],
      basicDate:{},
    };
  },
  created () {
    this.getProWells();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.monitoringUnit {
  
  height: 100%;
  width: 100%;

  .content {
    padding-left: 30px;
    margin-top: 10px;
    .title {
      font-weight: 400px;
      color: #000000;
      font-size: 14px;
      padding-top: 10px;
      position: relative;
      span {
        display: inline-block;
        background: #3377ff;
        width: 4px;
        height: 22px;
        position: absolute;
        left: -10px;
        bottom: -2px;
      }
    }
    .subject {
      background: #fff;
      height: 469px;
      width: 921px;
      margin-top: 20px;
      .subTit{
          margin-bottom: 14px;
      }
    }
  }
}
/deep/ #tab-first {
  padding-left: 20px;
}
/deep/ .el-tab-pane {
  padding-top: 10px;
  padding-left: 20px;
}
</style>
