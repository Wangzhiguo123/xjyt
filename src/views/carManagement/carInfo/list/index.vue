<!-- 车辆管理-车辆信息 -->
<template>
  <div class="productionWarning">
       <el-form :model="formInline" class="form">
                <el-row> <el-col :span="4">
                         <el-form-item label="车牌号">
                         <el-input v-model="formInline.paramName"
                                   style="width: 160px"/></el-form-item></el-col>
                         <el-col :span="7"> 
                                 <el-form-item label="服务时间">
                                 <el-date-picker
                                      style="width: 320px"
                                      v-model="formInline.alterTime"
                                      format="yyyy-MM-dd HH:mm:ss"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"></el-date-picker> </el-form-item></el-col>
                        <el-col :span="4">
                                <el-form-item label="车辆类型">
                                <el-select v-model="formInline.type" style="width: 160px">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item></el-col>
                        <el-col :span="4">
                                <el-form-item label="车辆颜色">
                                <el-select v-model="formInline.licensePlateColor " style="width: 160px">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item></el-col>
                        <el-col :span="4">
                          <el-button type="primary" @click="queryList">搜索</el-button>
                          <el-button type="primary" @click="queryList">重置</el-button></el-col></el-row>
                <el-row>  <el-col :span="2">
                          <!-- <el-button type="primary" @click="queryList">新增</el-button> -->
                          </el-col>
               <el-col :span="2" :push="1">
                           <el-upload class="upload-demo"
                                      :action="carsImport"
                                      :on-preview="handlePreview"
                                      :on-success="handleAvatarSuccess"
                                       multiple
                                      :limit="3"
                                      :on-exceed="handleExceed"
                                      :file-list="fileList"
                                      :on-remove="handleRemove"
                                      accept=".xls,.xlsx"
                                      >
                                      <el-button size="small" type="primary">导入</el-button></el-upload>
                                      </el-col> </el-row></el-form>
        <tableCom :table-data="tableData"
                  :column-data="tbColumnCon"
                  :current.sync="pagination.current"
                  :size.sync="pagination.size"
                  :total-count="pagination.totalCount"
                  :columnCheck="true"
                  :show-pagination="true"
                  @query-data="queryList"
                  :sortable="true">
                  <el-table-column slot="column10"
                                  slot-scope="row"
                                  :label="row.title"
                                  :width="row.width"
                                  :min-width="row.minWidth"
                                  sortable>
                  <template slot-scope="scoped">
                    <div class="operation">
                      <!-- <p @click="openhandle(scoped.row)">报警类型</p>
                      <p>派遣工单</p>
                      <p>监控画面</p> -->
                      <p>编辑</p>
                      <!-- <p>查看</p> -->
                    </div></template></el-table-column></tableCom>
      <!-- <handle-modal ref="handleModal" @confirm="confirm"></handle-modal>
      <relation-modal></relation-modal> -->
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
import moment from "moment";
// carsImport
import { carInfoPage } from "@/api/modules/carManagement";
import importFile from "@/api/modules/importFile";
// import { productionAlerts,handleResults } from "@/api/modules/carManagement";
// import handleModal from "../../../components/handleModal.vue";
// import relationModal from "../../../components/relationModal.vue";
import { tbColumnCon } from "./config";
import axios from "axios";
export default {
  name: "ProductionWarning",
  components: {
    tableCom,
    // handleModal,
    // relationModal,
  },
  data() {
    return {
      //表单信息
      formInline: {
        paramName: "",
        alterTime: "",
        type: "",
        licensePlateColor : "",
      },
      fileList: [],//上传文件
      carsImport: importFile.carsImport,
      //表头数据
      tbColumnCon,
      //表格数据
      tableData: [],
      // 分页参数
      pagination: {
        size: 10,
        current: 1,
        totalCount: 0,
      },
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    formatter(row, column) {
      return row.address;
    },
    //报警类型处理
    openhandle (data) {
      this.$refs.handleModal.show(data);
    },
    //告警处理
    // async confirm (data) {
    //    let res = await handleResults(data);
    // },
    //点击文件列表中已上传的文件时的钩子
      handlePreview(file) {
        console.log(file);
      },
    //点击文件列表中已上传的文件时的钩子
      handleExceed(file) {
        console.log(file);
      },
    //点击文件列表中已上传的文件时的成功钩子
      handleAvatarSuccess(res, file) {
        // res.errorList 失败的条数
        console.log('this.tableData',res.errorList)
        // this.tableData = res.errorList;
      },
    //删除上传文件
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    //查询列表
    async queryList() {
      let params = {
        // ...this.formInline,
        current: this.pagination.current - 1,
        size: this.pagination.size,
        carPageDTO:{}
      };
      if (params.alterTime) {
        params.serviceStartTime  = moment(params.alterTime[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        params.serviceEndTime  = moment(params.alterTime[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        params.serviceStartTime  = "";
        params.serviceEndTime = "";
      }
      console.log('params',params)
      let res = await carInfoPage(params);
      console.log('res',res)
      this.tableData = res.data.content || [];
      this.pagination.totalCount = Number(res.data.totalElements) || 0;
    }

  },
};
</script>

<style lang="less" scoped>
.productionWarning {
  min-width: calc(100vh - 300px);
  padding-left: 30px;
  padding-right: 30px;
  .form {
    padding-top: 30px;
  }
  .operation {
    display: flex;
    color: #409eff;
    p{
      margin-right: 10px;
    }
  }
}
/deep/ .upload-demo{
  .el-button--primary{
    width: 66px;
    height: 40px;
    margin-left: -60px;
  }
}
</style>
