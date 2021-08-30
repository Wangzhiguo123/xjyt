<!--报警处理-->
<template>
  <div class="handle">
    <el-dialog
      title="报警处理"
      :visible.sync="handleModalVisible"
      width="40%"
      :modal-append-to-body="false"
    >
      <div class="content">
        <p class="">报警处理</p>
        <el-select v-model="handleType" placeholder="请选择活动区域">
          <el-option
            v-for="(item, index) in handleData"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formInline')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { processingStatusPage } from "@/api/modules/productionMonitoring";
export default {
  data() {
    return {
      handleModalVisible: false,
      handleType: "",
      handleData: [],//处理下拉框数据
    };
  },
  methods: {
    //展示
    show(data) {
      console.log(data)
      this.handleModalVisible = true;
      this.queryList();
    },
    //查询
    async queryList() {
      let params = {
        current: 0,
        size: 10,
      };
      let res = await processingStatusPage(params);
      this.handleData = res.data.content || [];
    },
    submitForm() {
      if (!this.handleType) {
         this.$message.error('请选择报警处理');
        return;
      }
      console.log('handleData',this.handleData)
      let data = {
        alertId : this.handleData[0].id,
        handleType : this.handleType,
      }
      this.$emit('confirm',data);
    },
  },
};
</script>

<style lang="less" scoped>
.handle {
  height: "300px";
  .content {
    display: flex;
    align-items: center;
    p {
      margin-right: 20px;
      color: #555555;
      font-size: 16px;
    }
  }
}
/deep/ .el-dialog__header {
  background: #f7f9fc;
  .el-dialog__title {
    color: #3377ff;
  }
}
/deep/ .el-dialog__body {
  min-height: 200px;
}
</style>
