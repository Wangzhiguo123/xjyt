<!--报警处理-->
<template>
  <div class="handle">
    <el-dialog
      :visible.sync="handleModalVisible"
      width="40%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <template v-slot:title>
        <header class="title">
          <div>
            <img :src="imgUrl" alt="" />
            <span class="oneClass">采气一厂</span>/
            <span class="tweClass">新疆克拉玛依市百口泉</span>
          </div>
        </header>
      </template>
      <h3>告警处理</h3>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        class="form"
        label-width="100px"
      >
        <el-form-item label="报警处理">
          <el-select
            v-model="ruleForm.handleType"
            style="width: 320px"
            placeholder="请选择活动区域"
            @change="handleDataChange"
          >
            <el-option
              v-for="(item, index) in handleData"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指派人员" v-if="ident === 'video' && isAssign">
          <el-select
            v-model="ruleForm.handleType"
            style="width: 320px"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="(item, index) in handleData"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            style="width: 320px"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="ruleForm.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('formInline')"
          >处理</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  processingStatusPage,
  handlesTypesPage,
  handleConfigsPage
} from "@/api/modules/productionMonitoring";
export default {
  data() {
    return {
      handleModalVisible: false,
      ruleForm: {
        handleType: "",
        remarks: "", //备注
      },
      handleData: [], //处理下拉框数据
      imgUrl: require("@/assets/images/address.png"),
      ident: "",
      isAssign:false,//是否指派人员
      tranData:{},//传输数据
    };
  },
  methods: {
    //展示
    show(data, ident) {
      this.tranData = data;
      this.handleModalVisible = true;
      this.ruleForm = {
         handleType: "",
        remarks: "",
      }
      this.queryList(ident);
    },
    //类型改变
    handleDataChange(value){
      if (this.ident === "video") {
        this.handleData.forEach(item=>{
          if (item.code === value){
              this.isAssign = item.isAssign === 1?true:false;
          }
        })
      }
    },
    //查询
    async queryList(ident) {
      this.ident = ident;
      let params = {
        current: 0,
        size: 10,
      };
      if (ident === "pro") {
        let res = await processingStatusPage(params);
        this.handleData = res.data.content || [];
      }
      if (ident === "car") {
        let res = await handlesTypesPage(params);
        this.handleData = res.data || [];
      }
      if (ident === "video") {
        let res = await handleConfigsPage(params);
        this.handleData = res.data.content || [];
        this.handleData.forEach(item => {
            item.code = item.id;
            item.name = item.descriptions;
        });
      }
    },
    submitForm() {
      if (!this.ruleForm.handleType) {
        this.$message.error("请选择报警处理");
        return;
      }
      console.log('this.tranData',this.tranData)
      let data = {
        code: this.handleData[0].id,
        alertId: this.tranData.id,
        handleType: this.ruleForm.handleType,
        remarks: this.ruleForm.remarks,
        name:this.tranData.monitoryPoint||'', 
      };
      this.$emit("confirm", data,this.ident);
      this.handleModalVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.handle {
  height: "300px";
  .title {
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 6px;
    font-size: 14px;
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      transform: translateY(8px);
      margin-right: 4px;
    }
  }
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
.form {
  border: 1px solid #ccc;
  padding: 50px;
}
/deep/ .el-dialog__header {
  background: #f7f9fc;
  .el-dialog__title {
    color: #3377ff;
  }
}
/deep/ .el-dialog__body {
  min-height: 200px;
  padding: 0;
  h3 {
    margin: 18px 22px;
    font-size: 18px;
    color: #000000;
  }
}
</style>
