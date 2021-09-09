<!--派遣工单-->
<template>
  <div class="workOrder">
    <el-dialog
      title="派遣工单"
      :visible.sync="centerDialogVisible"
      width="40%"
      :modal-append-to-body="false"
    >
      <el-row>
        <el-col
          v-for="(item, index) in workOrderData"
          :key="index"
          :span="6"
          class="data"
          ><img src="" alt="暂无图片" />
          <p>{{ item.title }}</p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      workOrderData: [
        { title: "派车申请单" },
        { title: "取样单" },
        { title: "应急处理" },
        { title: "维修单" },
        { title: "应急物资领用申请单" },
        { title: "故障报警" },
        { title: "巡检单" },
        { title: "加密计划" },
        { title: "计量计划" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.workOrder {
  .data {
    margin-top: 25px;
    margin-bottom: 25px;
  }
}
/deep/ .el-dialog__header {
  background: #f7f9fc;
  .el-dialog__title {
    color: #3377ff;
  }
}
</style>
