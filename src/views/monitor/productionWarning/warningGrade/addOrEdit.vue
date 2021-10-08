<!--告警类型 告警等级 新增or编辑-->
<template>
  <div class="handle">
    <el-dialog
      :title="title"
      :visible.sync="handleModalVisible"
      width="40%"
      :modal-append-to-body="false"
      :close-on-click-modal='false'
    >
      <div class="content">
        <div style="margin: 20px"></div>
        <el-form label-width="80px" :model="formInline" ref="formInline" :rules="rules">
                 <el-form-item label="告警等级" prop="name">
                                <el-input v-model="formInline.name"/></el-form-item>
                 <el-form-item label="等级编码"  prop="code">
                                <el-input v-model="formInline.code"/></el-form-item>
                 <el-form-item label="备注" >
                                <el-input v-model="formInline.remarks"/></el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
           <el-button @click="handleModalVisible = false">取 消</el-button>
           <el-button type="primary" @click="submitForm('formInline')">确 定</el-button>
     </div>
    </el-dialog>
  </div>
</template>

<script>
import { warningGradeAdd,warningGradeEdit } from "@/api/modules/productionMonitoring";
export default {
  data() {
    return {
      formInline:{
          name:'',
          code:'',
          remarks:'',
      },
      handleModalVisible: false,
      region: "",
      title: "新增",
        rules: {
          name: [
            { required: true, message: '必填项', trigger: 'blur' }],
          code: [
            { required: true, message: '必填项', trigger: 'blur' }],
          remarks: [
            { required: true, message: '必填项', trigger: 'blur' }],
        }
    };
  },
  methods: {
    //打开模态框
    show(data){
        if (data) {
            this.title = '编辑'
        }else {
          this.title = '新增'
        }
        this.formInline = data || {};
        this.handleModalVisible = true;
    },
    //提交数据
    submitForm(formInline) {
            this.$refs[formInline].validate(async (valid) => {
            if (valid) {
                let params = {
                    ...this.formInline,
                }
                let res = ''
                if (this.title === '新增') {
                     res = await warningGradeAdd(params);
                } else {
                     res = await warningGradeEdit(params);
                }
                if (res.status === 204) {
                  this.handleModalVisible = false;
                  this.$parent.queryList();
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
  }
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
