<!--删除模态框-->
<template>
  <div class="delModal">
    <el-dialog
      title="删除"
      :visible.sync="delModalVisible"
      width="40%"
      :modal-append-to-body="false"
    >
      <div class="content">
        是否删除id{{delData.id}}的数据
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
   name: "delModal",
  data() {
    return {
      delModalVisible: false,//是否展示
      delData: '',//删除数据
    };
  },
  methods: {
    show(data) {
      this.delModalVisible = true;
      this.delData = data;
    },
    confirm() {
      this.$emit('confirm',this.delData);
       this.delModalVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.delModal {
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
