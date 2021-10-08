<!--
 * @Description: 模型管理
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-05 14:19:55
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="formParams" class="demo-form-inline">
      <el-form-item label="评价模型名称">
        <el-select
          v-model="formParams.modelId"
          placeholder="请选择"
          clearable
          multiple
          filterable
          :multiple-limit="1"
          collapse-tags
        >
          <el-option
            v-for="item in assessList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指标名称">
        <el-select
          v-model="formParams.indexId"
          placeholder="请选择"
          clearable
          filterable
          multiple
          :multiple-limit="1"
          collapse-tags
        >
          <el-option
            v-for="item in indexList"
            :key="item.indexId"
            :label="item.name"
            :value="item.indexId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织机构">
        <select-tree
          v-model="formParams.orgId"
          :unit-tree="unitTree"
        ></select-tree>
      </el-form-item>
      <el-form-item label="地质单元">
        <select-tree
          v-model="formParams.geologyId"
          :unit-tree="geologyUnitTree"
        ></select-tree>
      </el-form-item>
      <el-form-item label="集输单元">
        <select-tree
          v-model="formParams.gatheringId"
          :unit-tree="gatheringUnitTree"
        ></select-tree>
      </el-form-item>
      <el-form-item label="评价周期">
        <el-select
          v-model="formParams.cycle"
          placeholder="请选择"
          filterable
          clearable
          multiple
          :multiple-limit="1"
          collapse-tags
          @change="changeCycle"
        >
          <el-option
            v-for="item in assessCycleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formParams.cycle.length > 0" label="评价日期">
        <div v-if="formParams.cycle[0] === 'year'">
          <el-date-picker
            v-model="assessmodel.year.begin"
            type="year"
            placeholder="选择年"
          >
          </el-date-picker
          >&nbsp;至&nbsp;
          <el-date-picker
            v-model="assessmodel.year.end"
            type="year"
            placeholder="选择年"
          >
          </el-date-picker>
        </div>
        <div v-if="formParams.cycle[0] === 'quarter'">
          <quarter-data-picker
            v-model="assessmodel.quarter.begin"
          ></quarter-data-picker>
          至&nbsp;
          <quarter-data-picker
            v-model="assessmodel.quarter.end"
          ></quarter-data-picker>
        </div>
        <div v-if="formParams.cycle[0] === 'month'">
          <el-date-picker
            v-model="assessmodel.month.begin"
            type="month"
            placeholder="选择月"
          >
          </el-date-picker
          >&nbsp;至&nbsp;
          <el-date-picker
            v-model="assessmodel.month.end"
            type="month"
            placeholder="选择月"
          >
          </el-date-picker>
        </div>
        <div v-if="formParams.cycle[0] === 'day'">
          <el-date-picker
            v-model="assessmodel.date.begin"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker
          >&nbsp;至&nbsp;
          <el-date-picker
            v-model="assessmodel.date.end"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getKnowledgeBaseList">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" plain @click="exportTable">导出</el-button>
      </el-form-item>
    </el-form>

    <v-table
      style="margin-top: 15px"
      :loading="loading"
      :table-data="tableData"
      :column-data="columnData"
      :current.sync="listQuery.current"
      :size.sync="listQuery.size"
      :total-count="total"
      :show-pagination="true"
      :auto-query-first="false"
      @query-data="getAssessResultList"
    >
      <el-table-column slot="column9" slot-scope="row" :label="row.title">
        <template slot-scope="scoped">
          <span>{{ scoped.row.weightScore + "%" }}</span>
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
import VTable from "@/components/tableCom";
import QuarterDataPicker from "@/components/quarterDataPicker";
import SelectTree from "@/components/selectTree";
import { downloadFile } from "@/utils";

import {
  getIndicatorAssessModelList,
  getUnitlList,
  getAssessCycleList,
  getIndexList,
  getGatheringUnitTree,
  getGeologyUnitTree,
  getAssessResultList,
  exportAssessResult,
} from "@/api/modules/kpi";
import { getDateArray } from "@/utils";
export default {
  components: {
    VTable,
    QuarterDataPicker,
    SelectTree,
  },
  data() {
    return {
      indexList: [],
      geologyUnitTree: [],
      gatheringUnitTree: [],
      assessmodel: {
        year: {
          begin: "",
          end: "",
        },
        quarter: {
          begin: "",
          end: "",
        },
        month: {
          begin: "",
          end: "",
        },
        date: {
          begin: "",
          end: "",
        },
      },
      options: [],
      unitTree: [],
      formDate: [],
      assessList: [],
      classifyList: [],
      assessCycleList: [],
      loading: false,
      tableData: [],
      columnData: [
        {
          title: "评价标题",
          field: "assessTitle",
        },
        {
          title: "评价模型名称",
          field: "modelName",
          width: 150,
        },
        {
          title: "组织机构",
          field: "orgName",
        },
        {
          title: "地质单元",
          field: "geologyName",
        },
        {
          title: "集输单元",
          field: "gatheringName",
        },
        {
          title: "指标名称",
          field: "indexName",
        },
        {
          title: "业务分类",
          field: "businessName",
        },
        {
          title: "场景分类",
          field: "sceneName",
        },
        {
          title: "评价周期",
          field: "cycleName",
        },
        {
          title: "评价日期",
          field: "assessDate",
        },
        {
          title: "权重",
          field: "weightScore",
        },
        {
          title: "评分",
          field: "indexScore",
        },
        {
          title: "创建时间",
          field: "createTime",
        },
      ],
      // 总条数
      total: 0,

      // 入参
      listQuery: {
        current: 1,
        size: 10,
      },

      // 表格表头类型
      formParams: {
        modelId: [],
        cycle: [],
        gatheringId: "",
        geologyId: "",
        orgId: "",
        indexId: [],
      },
    };
  },
  created() {
    this.getIndicatorAssessModelList();
    this.getIndexList();
    this.getUnitlList();
    this.getAssessCycleList();
    this.getAssessResultList();
    this.getGatheringUnitTree();
    this.getGeologyUnitTree();
  },
  methods: {
    reset() {
      this.formParams = {
        modelId: [],
        cycle: [],
        gatheringId: "",
        geologyId: "",
        orgId: "",
        indexId: [],
      };
      this.listQuery = {
        current: 1,
        size: 10,
      };
      this.getAssessResultList();
    },
    /**
     * @description: 导出数据
     * @param {*}
     */
    async exportTable() {
      let param = {
        modelId: this.formParams.modelId[0],
        indexId: this.formParams.indexId[0],
        cycle: this.formParams.cycle[0],
        orgId: this.formParams.orgId,
        gatheringId: this.formParams.gatheringId,
        geologyId: this.formParams.geologyId,
        ...this.listQuery,
        current: this.listQuery.current - 1,
      };
      if (this.formParams.cycle.length > 0) {
        let beginDate = "",
          endDate = "";
        switch (this.formParams.cycle[0]) {
          case "year":
            if (this.assessmodel.year.begin || this.assessmodel.year.end) {
              if (this.assessmodel.year.begin && !this.assessmodel.year.end) {
                this.assessmodel.year.end = this.assessmodel.year.begin;
              } else if (
                !this.assessmodel.year.begin &&
                this.assessmodel.year.end
              ) {
                this.assessmodel.year.begin = this.assessmodel.year.end;
              }
              param["assessDates"] = `${
                this.assessmodel.year.begin
                  ? this.assessmodel.year.begin.getFullYear()
                  : ""
              },${
                this.assessmodel.year.end
                  ? this.assessmodel.year.end.getFullYear()
                  : ""
              }`;
            }
            break;
          case "quarter":
            if (
              this.assessmodel.quarter.begin ||
              this.assessmodel.quarter.end
            ) {
              if (
                this.assessmodel.quarter.begin &&
                !this.assessmodel.quarter.end
              ) {
                this.assessmodel.quarter.end = this.assessmodel.quarter.begin;
              } else if (
                !this.assessmodel.quarter.begin &&
                this.assessmodel.quarter.end
              ) {
                this.assessmodel.quarter.begin = this.assessmodel.quarter.end;
              }
              param["assessDates"] = `${this.assessmodel.quarter.begin || ""},${
                this.assessmodel.quarter.end || ""
              }`;
            }
            break;
          case "day":
            if (this.assessmodel.date.begin || this.assessmodel.date.end) {
              if (this.assessmodel.date.begin && !this.assessmodel.date.end) {
                this.assessmodel.date.end = this.assessmodel.date.begin;
              } else if (
                !this.assessmodel.date.begin &&
                this.assessmodel.date.end
              ) {
                this.assessmodel.date.begin = this.assessmodel.date.end;
              }
              let arrBeginDate = getDateArray(this.assessmodel.date.begin);
              beginDate = `${arrBeginDate[0]}-${arrBeginDate[1]}-${arrBeginDate[2]}`;
              let arrEndDate = getDateArray(this.assessmodel.date.end);
              endDate = `${arrEndDate[0]}-${arrEndDate[1]}-${arrEndDate[2]}`;
              param["assessDates"] = `${beginDate},${endDate}`;
            }
            break;
          case "month":
            if (this.assessmodel.month.begin || this.assessmodel.month.end) {
              if (this.assessmodel.month.begin && !this.assessmodel.month.end) {
                this.assessmodel.month.end = this.assessmodel.month.begin;
              } else if (
                !this.assessmodel.month.begin &&
                this.assessmodel.month.end
              ) {
                this.assessmodel.month.begin = this.assessmodel.month.end;
              }
              let arrBeginDate = getDateArray(this.assessmodel.month.begin);
              beginDate = `${arrBeginDate[0]}-${arrBeginDate[1]}`;
              let arrEndDate = getDateArray(this.assessmodel.month.end);
              endDate = `${arrEndDate[0]}-${arrEndDate[1]}`;
              param["assessDates"] = `${beginDate},${endDate}`;
            }
            break;
          default:
            break;
        }
      }
      let response = await exportAssessResult(param);
      if (response) {
        downloadFile(response);
      }
    },
    /**
     * @description: 列表查询
     * @param {*}
     */
    getKnowledgeBaseList() {
      this.listQuery = {
        current: 1,
        size: 10,
      };
      this.getAssessResultList();
    },
    /**
     * @description: 清空评价日期
     * @param {*}
     */
    changeCycle() {
      this.assessmodel.year.begin = "";
      this.assessmodel.year.end = "";
      this.assessmodel.quarter.begin = "";
      this.assessmodel.quarter.end = "";
      this.assessmodel.month.begin = "";
      this.assessmodel.month.end = "";
      this.assessmodel.date.begin = "";
      this.assessmodel.date.end = "";
    },
    /**
     * @description: 获取指标评价模型下拉
     * @param {*}
     */
    async getIndicatorAssessModelList() {
      let { data } = await getIndicatorAssessModelList();
      if (data && data.code === undefined) {
        this.assessList = data;
      }
    },
    /**
     * @description: 获取集输单元树
     * @param {*}
     */
    async getGatheringUnitTree() {
      let { data } = await getGatheringUnitTree();
      if (data && data.code === undefined) {
        this.gatheringUnitTree = data;
      }
    },
    /**
     * @description: 获取地质单元树
     * @param {*}
     */
    async getGeologyUnitTree() {
      let { data } = await getGeologyUnitTree();
      if (data && data.code === undefined) {
        this.geologyUnitTree = data;
      }
    },
    /**
     * @description: 获取指标下拉
     * @param {*}
     */
    async getIndexList() {
      let { data } = await getIndexList();
      if (data && data.code === undefined) {
        this.indexList = data;
      }
    },
    /**
     * @description: 获取检查单位下拉
     * @param {*}
     */
    async getUnitlList() {
      let { data } = await getUnitlList();
      if (data && data.code === undefined) {
        this.unitTree = data;
      }
    },
    /**
     * @description: 获取评价周期下拉
     * @param {*}
     */
    async getAssessCycleList() {
      let { data } = await getAssessCycleList();
      if (data && data.code === undefined) {
        this.assessCycleList = data;
      }
    },
    /**
     * @description: 日期改变
     * @param {*}
     */
    onDateChange(val) {
      if (val === null) {
        this.formParams.publishDateStart = "";
        this.formParams.publishDateEnd = "";
      } else {
        [this.formParams.publishDateStart, this.formParams.publishDateEnd] = [
          ...val,
        ];
      }
    },
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getAssessResultList() {
      let param = {
        modelId: this.formParams.modelId[0],
        indexId: this.formParams.indexId[0],
        cycle: this.formParams.cycle[0],
        orgId: this.formParams.orgId,
        gatheringId: this.formParams.gatheringId,
        geologyId: this.formParams.geologyId,
        ...this.listQuery,
        current: this.listQuery.current - 1,
      };
      if (this.formParams.cycle.length > 0) {
        let beginDate = "",
          endDate = "";
        switch (this.formParams.cycle[0]) {
          case "year":
            if (this.assessmodel.year.begin || this.assessmodel.year.end) {
              if (this.assessmodel.year.begin && !this.assessmodel.year.end) {
                this.assessmodel.year.end = this.assessmodel.year.begin;
              } else if (
                !this.assessmodel.year.begin &&
                this.assessmodel.year.end
              ) {
                this.assessmodel.year.begin = this.assessmodel.year.end;
              }
              param["assessDates"] = `${
                this.assessmodel.year.begin
                  ? this.assessmodel.year.begin.getFullYear()
                  : ""
              },${
                this.assessmodel.year.end
                  ? this.assessmodel.year.end.getFullYear()
                  : ""
              }`;
            }
            break;
          case "quarter":
            if (
              this.assessmodel.quarter.begin ||
              this.assessmodel.quarter.end
            ) {
              if (
                this.assessmodel.quarter.begin &&
                !this.assessmodel.quarter.end
              ) {
                this.assessmodel.quarter.end = this.assessmodel.quarter.begin;
              } else if (
                !this.assessmodel.quarter.begin &&
                this.assessmodel.quarter.end
              ) {
                this.assessmodel.quarter.begin = this.assessmodel.quarter.end;
              }
              param["assessDates"] = `${this.assessmodel.quarter.begin || ""},${
                this.assessmodel.quarter.end || ""
              }`;
            }
            break;
          case "day":
            if (this.assessmodel.date.begin || this.assessmodel.date.end) {
              if (this.assessmodel.date.begin && !this.assessmodel.date.end) {
                this.assessmodel.date.end = this.assessmodel.date.begin;
              } else if (
                !this.assessmodel.date.begin &&
                this.assessmodel.date.end
              ) {
                this.assessmodel.date.begin = this.assessmodel.date.end;
              }
              let arrBeginDate = getDateArray(this.assessmodel.date.begin);
              beginDate = `${arrBeginDate[0]}-${arrBeginDate[1]}-${arrBeginDate[2]}`;
              let arrEndDate = getDateArray(this.assessmodel.date.end);
              endDate = `${arrEndDate[0]}-${arrEndDate[1]}-${arrEndDate[2]}`;
              param["assessDates"] = `${beginDate},${endDate}`;
            }
            break;
          case "month":
            if (this.assessmodel.month.begin || this.assessmodel.month.end) {
              if (this.assessmodel.month.begin && !this.assessmodel.month.end) {
                this.assessmodel.month.end = this.assessmodel.month.begin;
              } else if (
                !this.assessmodel.month.begin &&
                this.assessmodel.month.end
              ) {
                this.assessmodel.month.begin = this.assessmodel.month.end;
              }
              let arrBeginDate = getDateArray(this.assessmodel.month.begin);
              beginDate = `${arrBeginDate[0]}-${arrBeginDate[1]}`;
              let arrEndDate = getDateArray(this.assessmodel.month.end);
              endDate = `${arrEndDate[0]}-${arrEndDate[1]}`;
              param["assessDates"] = `${beginDate},${endDate}`;
            }
            break;
          default:
            break;
        }
      }
      this.loading = true;
      let { data } = await getAssessResultList(param);
      if (data.code === undefined) {
        this.loading = false;
        this.tableData = data.content;
        this.total = Number(data.totalElements);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
</style>
