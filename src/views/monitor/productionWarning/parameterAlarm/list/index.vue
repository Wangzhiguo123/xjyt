<!-- 生产监控报警管理-参数报警 -->
<template>
  <div class="productionWarning">
       <el-form :model="formInline" :inline="true"  class="form" ref="ruleForm">
                        <el-form-item label="告警区块" prop="type">
                                  <el-select v-model="formInline.type">
                                             <el-option label="区域一" value="shanghai"></el-option>
                                             <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item></el-col>
                                <el-form-item label="告警对象" prop="alertTypeName">
                                <el-select v-model="formInline.alertTypeName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                 <el-form-item label="时间" prop="alterTime">
                                 <el-date-picker
                                      v-model="formInline.alterTime"
                                      style="width:260px"
                                      format="yyyy-MM-dd"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"></el-date-picker> </el-form-item>
                                <el-form-item label="告警分型" prop="statusName">
                                <el-select v-model="formInline.statusName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                <el-form-item label="告警等级" prop="statusName">
                                <el-select v-model="formInline.statusName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                <el-form-item label="处理状态" prop="alterTime">
                                <el-select v-model="formInline.alterTime">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                          <el-button type="primary" @click="queryList">查询</el-button>
                          <el-button type="primary" @click="reset('ruleForm')">重置</el-button></el-form>
                        <div class="add">
                          <el-button type="primary" @click="allHandle">批量处理</el-button>
                          </div>
                          
        <tableCom :table-data="tableData"
                  :column-data="tbColumnCon"
                  :current.sync="pagination.current"
                  :size.sync="pagination.size"
                  :total-count="pagination.totalCount"
                  :columnCheck="true"
                  :show-pagination="true"
                  @query-data="queryList">
                  <el-table-column slot="column14"
                                  slot-scope="row"
                                  :label="row.title"
                                  :width="row.width"
                                  :min-width="row.minWidth"
                                  :fixed="row.fixed">
                  <template slot-scope="scoped">
                    <div class="operation">
                      <p @click="jumpDetails(scoped.row)">告警详情</p>
                    </div></template></el-table-column></tableCom>
      <!--模态框--->
      <div>
        <batchHandle ref="batchHandle" ></batchHandle>
      </div>
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
import moment from "moment";
import { productionAlerts,handleResults } from "@/api/modules/productionMonitoring";
import batchHandle from "@/views/monitor/components/params/batchHandle";
import { tbColumnCon } from "../list/config";
export default {
  name: "ProductionWarning",
  components: {
    tableCom,
    batchHandle
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
    /**
     * @description:重置
     * @param {*}
     * @return {*}
     */
    reset(formName) {
      this.$refs[formName].resetFields();
      // console.log("submit!");
      // this.$router.push({
      //   name:'parameterDetails'
      // })
    },
    /**
     * @description:告警详情
     * @param {*}
     * @return {*}
     */
    jumpDetails(row) {
      this.$router.push({
        name:'parameterDetails',
        query:{
          id:row.id,
          status:row.status,
        }
      })
    },
    /**
     * @description:告警详情
     * @param {*}
     * @return {*}
     */
    allHandle() {
      this.$refs.batchHandle.show();
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
          "YYYY-MM-DD"
        );
        params.alertEndTime = moment(params.alterTime[1]).format(
          "YYYY-MM-DD"
        );
      } else {
        params.alertStartTime = "";
        params.alertEndTime = "";
      }
      let res = await productionAlerts(params);
      this.tableData = res.data.content || [];
      this.pagination.totalCount = Number(res.data.totalElements) || 0;
    }

  },
};
</script>

<style lang="less" scoped>
.productionWarning {
  min-width: calc(100vh - 300px);
  padding-right: 30px;
  padding-left: 30px;
  .flex-warp{
    flex-wrap: wrap;
  }
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
  .add{
    margin-bottom: 30px;
    margin-top: 10px;
  }
}
</style>
