<!-- 生产监控报警管理-参数报警 -->
<template>
  <div class="productionWarning">
       <el-form :model="formInline" class="form">
                <el-row> <el-col :span="4">
                         <el-form-item label="报警信息">
                         <el-input v-model="formInline.paramName"
                                   style="width: 160px"/></el-form-item></el-col>
                         <el-col :span="7"> 
                                 <el-form-item label="报警时间">
                                 <el-date-picker
                                      style="width: 280px"
                                      v-model="formInline.alterTime"
                                      format="yyyy-MM-dd HH:mm:ss"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"></el-date-picker> </el-form-item></el-col>
                        <el-col :span="4">
                                <el-form-item label="报警类型">
                                <el-select v-model="formInline.type" style="width: 160px">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item></el-col>
                        <el-col :span="4">
                                <el-form-item label="处理状态">
                                <el-select v-model="formInline.status" style="width: 160px">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item></el-col>
                        <el-col :span="4">
                          <el-button type="primary" @click="queryList">搜索</el-button>
                          <el-button @click="onSubmit">导出</el-button></el-col></el-row></el-form>
        <tableCom :table-data="tableData"
                  :column-data="tbColumnCon"
                  style="width: 80%"
                  :current.sync="pagination.current"
                  :size.sync="pagination.size"
                  :total-count="pagination.totalCount"
                  :columnCheck="true"
                  :show-pagination="true"
                  @query-data="queryList"
                  :sortable="true">
                  <el-table-column slot="column9"
                                  slot-scope="row"
                                  :label="row.title"
                                  :width="row.width"
                                  :min-width="row.minWidth"
                                  sortable>
                  <template slot-scope="scoped">
                    <div class="operation">
                      <p @click="openhandle(scoped.row)">报警类型</p>
                      <p>派遣工单</p>
                      <p>监控画面</p>
                    </div></template></el-table-column></tableCom>
      <handle-modal ref="handleModal" @confirm="confirm"></handle-modal>
      <relation-modal></relation-modal>
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
import moment from "moment";
import { productionAlerts,handleResults } from "@/api/modules/productionMonitoring";
import handleModal from "../../../components/handleModal.vue";
import relationModal from "../../../components/relationModal.vue";
import { tbColumnCon } from "../list/config";
export default {
  name: "ProductionWarning",
  components: {
    tableCom,
    handleModal,
    relationModal,
  },
  data() {
    return {
      //表单信息
      formInline: {
        paramName: "",
        alterTime: "",
        type: "",
        status: "",
      },
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
  created() {},
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
    async confirm (data) {
       let res = await handleResults(data);
    },
    //查询列表
    async queryList() {
      let params = {
        ...this.formInline,
        current: this.pagination.current - 1,
        size: this.pagination.size,
      };
      if (params.alterTime) {
        params.alertStartTime = moment(params.alterTime[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        params.alertEndTime = moment(params.alterTime[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        params.alertStartTime = "";
        params.alertEndTime = "";
      }
      let res = await productionAlerts(params);
      this.tableData = res.data.content || [];
      this.pagination.totalCount = res.data.totalPages;
    }

  },
};
</script>

<style lang="less" scoped>
.productionWarning {
  min-width: calc(100vh - 300px);
  min-width: 1440px;
  padding-left: 30px;
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
</style>
