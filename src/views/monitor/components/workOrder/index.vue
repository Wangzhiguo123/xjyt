<template>
  <div>
    <el-dialog
      :visible.sync="workOrderVisible"
      width="30%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <template v-slot:title>
        <header class="title">派遣工单</header>
      </template>
      <div>
        <workOrder ref="workOrder"></workOrder>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import workOrder from "@/components/workOrder";
import { processTransactionPage } from "@/api/modules/workBenchDetails";
export default {
  components: {
    workOrder,
  },
  data() {
    return {
      workOrderVisible: false,
      basicsData : [],//工作台数据
    };
  },
  methods: {
    async queryList() {
      let data = {
        page: "0",
        size: "20",
      };
      let basicsData = await processTransactionPage(data);
      console.log('basicsData',basicsData)
    },
  },
};
</script> 

<style lang="less" scoped>
.title {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #ccc;
  padding-left: 12px;
  font-size: 18px;
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/ .el-table--border,
.el-table--group {
  border-bottom: none;
}
</style>