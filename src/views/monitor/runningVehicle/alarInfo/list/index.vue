<!-- 生产监控报警管理-车辆监控告警管理 -->
<template>
  <div class="productionWarning">
       <el-form :model="formInline" :inline="true" class="form" ref="ruleForm" label-width="80px">
                        <el-form-item label="车牌号码" prop="type">
                                  <el-select v-model="formInline.type">
                                             <el-option label="区域一" value="shanghai"></el-option>
                                             <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                <el-form-item label="机构区域" prop="alertTypeName">
                                <el-select v-model="formInline.alertTypeName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item> 
                                 <el-form-item label="告警时间" prop="alterTime">
                                 <el-date-picker
                                      v-model="formInline.alterTime"
                                      style="width:260px"
                                      format="yyyy-MM-dd"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"></el-date-picker> </el-form-item>
                                <el-form-item label="告警类型" prop="statusName">
                                <el-select v-model="formInline.statusName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                <el-form-item label="运营类型" prop="statusName">
                                <el-select v-model="formInline.statusName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                <el-form-item label="处理状态" prop="statusName">
                                <el-select v-model="formInline.statusName">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                                <el-form-item label="车辆状态" prop="statusName">
                                <el-select v-model="formInline.statusName" style="width:260px">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option></el-select></el-form-item>
                          <el-button type="primary" @click="queryList">查询</el-button>
                          <el-button type="primary" @click="reset('ruleForm')">重置</el-button></el-form>
        <tableCom :table-data="tableData"
                  :column-data="tbColumnCon"
                  :current.sync="pagination.current"
                  :size.sync="pagination.size"
                  :total-count="pagination.totalCount"
                  :columnCheck="true"
                  :show-pagination="true"
                  @query-data="queryList">
                  <el-table-column slot="column8"
                                  slot-scope="row"
                                  :label="row.title"
                                  :width="row.width"
                                  :min-width="row.minWidth"
                                  :fixed="row.fixed">
                  <template slot-scope="scoped">
                    <div class="operation">
                      <p @click="jumpDetails(scoped.row)">告警详情</p>
                    </div></template></el-table-column></tableCom>
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
import moment from "moment";
import {  carAlertsPage } from "@/api/modules/productionMonitoring";
import { tbColumnCon } from "../list/config";
export default {
  name: "ProductionWarning",
  components: {
    tableCom
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
        name:'carAlarInfoDetails',
        query:{
          id:row.id,
          status:row.status,
        }
      })
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
      let res = await  carAlertsPage(params);
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
