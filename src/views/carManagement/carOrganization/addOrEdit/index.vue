<!--车辆类型 车辆组织 新增or编辑-->
<template>
  <div class="addOrEdit">
    <el-dialog
      :title="title"
      :visible.sync="addOrEditModalVisible"
      width="40%"
      :modal-append-to-body="false"
      :close-on-click-modal='false'
    >
      <div class="content">
        <div style="margin: 20px"></div>
        <el-form label-width="80px" :model="formInline" ref="formInline" :rules="rules">
                 <el-form-item label="车辆组织类型" prop="name">
                                <el-input v-model="formInline.name"/></el-form-item>
                 <el-form-item label="车辆组织编码"  prop="code">
                                <el-input v-model="formInline.code"/></el-form-item>
                 <el-form-item label="备注" >
                                <el-input v-model="formInline.remarks"/></el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
           <el-button @click="addOrEditModalVisible = false">取 消</el-button>
           <el-button type="primary" @click="submitForm('formInline')">确 定</el-button>
     </div>
    </el-dialog>
  </div>
</template>

<script>
import { carOrganizesAdd,carOrganizesEdit } from "@/api/modules/carManagement";
export default {
  data() {
    return {
      formInline:{
          name:'',
          code:'',
          remarks:'',
      },
      addOrEditModalVisible: false,
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
          this.title = '修改'
        } else {
          this.title = '新增'
        }
        this.formInline = data || {};
        console.log('this.formInline',this.formInline)
        this.addOrEditModalVisible = true;
    },
    //提交数据
    submitForm(formInline) {
            this.$refs[formInline].validate(async (valid) => {
            if (valid) {
                let params = {
                    ...this.formInline,
                    parentCode:0,
                    id:0
                }
                let res = ''
                if (this.title === '新增') {
                     res = await carOrganizesAdd(params);
                } else {
                     res = await carOrganizesEdit(params);
                }
                if (res.status === 204) {
                  this.addOrEditModalVisible = false;
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
.addOrEdit {
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
