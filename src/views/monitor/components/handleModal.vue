<!--报警处理-->
<template>
  <el-dialog
    :visible.sync="handleModalVisible"
    width="50%"
    class="handle"
    append-to-body
    :showClose="false"
    :modal-append-to-body="true"
    :close-on-click-modal="false"
  >
    <template v-slot:title>
      <header class="dialogTit">
        <h3>立即处理</h3>
        <p @click="handleClose">关闭</p>
      </header>
    </template>
    <div class="content">
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
    </div>
    <div class="footer">
      <el-button @click="handleClose">返回</el-button>
      <el-button type="primary" @click="submitForm('formInline')"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  processingStatusPage,
  handlesTypesPage,
  handleConfigsPage,
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
      ident: "",
      isAssign: false, //是否指派人员
      tranData: {}, //传输数据
    };
  },
  methods: {
    /**
     * @description:关闭
     * @param {*}
     * @return {*}
     */
    handleClose() {
      this.handleModalVisible = false;
    },
    /**
     * @description:确定
     * @param {*}
     * @return {*}
     */
    async preservation() {
      let params = {
        alertId: this.alertId,
        handleUserId: this.handleUserId,
        remarks: this.ruleForm.remarks,
      };
      let res = await handleUser(params);
    },
    //展示
    show(data, ident) {
      this.tranData = data;
      this.handleModalVisible = true;
      this.ruleForm = {
        handleType: "",
        remarks: "",
      };
      this.queryList(ident);
    },
    //类型改变
    handleDataChange(value) {
      if (this.ident === "video") {
        this.handleData.forEach((item) => {
          if (item.code === value) {
            this.isAssign = item.isAssign === 1 ? true : false;
          }
        });
      }
    },
    /**
     * @description:查询
     * @param {*}
     * @return {*}
     */
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
        this.handleData.forEach((item) => {
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
      console.log("this.tranData", this.tranData);
      // let data = {
      //   code: this.handleData[0].id,
      //   alertId: this.tranData.id,
      //   handleType: this.ruleForm.handleType,
      //   remarks: this.ruleForm.remarks,
      //   name: this.tranData.monitoryPoint || "",
      // };
      let  data = {
        ...this.ruleForm,
        id : this.tranData.id,
      }
      this.$emit("confirm", data, this.ident);
      this.handleModalVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.handle {
  .dialogTit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 15px 30px;
    color: #409eff;
    font-size: 20px;
    h3 {
      position: relative;
      font-weight: 450;
      &::before {
        content: ""; // 必须
        position: absolute;
        bottom: -17px;
        width: 140%;
        left: -18%;
        height: 2px;
        background-color: #3377ff;
      }
    }
  }
  .content {
    margin-top: 30px;
    min-height: 300px;
  }
  .footer {
    text-align: right;
    padding-right: 60px;
    padding-top: 20px;
    box-shadow: 0px 0px 4px #888888;
    width: 96%;
    height: 60px;
  }
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-button {
  margin-right: 20px;
}
</style>
