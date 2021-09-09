<!--
        参数配置==>
            1、basicsData: [],                      工作台机构参数集合
            2、type: 1                              工作台类型 1展示工作台标题 2不展示

        返回事件判断==>
            1、dispatchOrder                        点击工作台
        案例==》
          <workOrder ref="workOrder" :basicsData="basicsData" @confirm="点击工作台事件"></workOrder>
-->
<!-- 工作台 -->
<template>
  <div class="workOrder">
    <el-row class="subOrder" v-for="(item, index) in basicsData" :key="index">
      <h5 v-if="type === 1">{{ item.typeName }}</h5>
      <el-col :span="8" :push="1"
              v-for="(sub, subIndex) in item.dcDocs"
              :key="subIndex">
        <div @click="dispatchOrder(sub)">
          <!-- <p><i :class="sub.iconPath" style="font-size: 40px"></i></p> -->
          <p class="img"><img src="sub.iconPath" alt="暂无图片"></p>
          <p>{{ sub.name }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "workOrder",
  components: {},
  props: {
    basicsData: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: Number,
      default() {
        return 1;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    dispatchOrder(data) {
      this.$emit("confirm", data);
    },
  },
};
</script>

<style lang="less" scoped>
.workOrder {
  padding: 10px;
  .subOrder {
    h5 {
      color: #000000;
      font-size: 20px;
      margin-bottom: 18px;
    }
    h5:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 22px;
      background-color: #3377ff;
      font-weight: bold;
      margin-right: 16px;
      transform: translateY(2px);
    }
    p {
      margin-bottom: 16px;
      width: 40%;
      text-align: center;
      font-size: 18px;
    }
    .img{
        width: 40px;
        height: 40px;
    }
  }
}
/deep/ [class*=" el-icon-"],
[class^="el-icon-"] {
  width: 40px;
  height: 40px;
}
</style>