<!--
 * @Description: 模型管理
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-05 14:19:55
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="formParams" class="demo-form-inline">
      <el-form-item label="评价标题">
        <el-input
          v-model="formParams.title"
          clearable
          placeholder="请输入评价标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="指标评价模型名称">
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
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查单位">
        <select-tree
          v-model="formParams.orgUnitId"
          :unit-tree="unitTree"
        ></select-tree>
      </el-form-item>
      <el-form-item label="评价周期">
        <el-select
          v-model="formParams.cycle"
          placeholder="请选择"
          clearable
          multiple
          filterable
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
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleAdd">新增</el-button>

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
      @query-data="getAssessList"
    >
      <el-table-column
        slot="column0"
        slot-scope="row"
        :label="row.title"
        :width="row.width"
      >
        <template slot-scope="scoped">
          <el-button type="text" @click="goToDetail(scoped.row)">{{
            scoped.row.assessNumber
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        slot="column11"
        slot-scope="row"
        :label="row.title"
        :width="row.width"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.statusId !== 'confirm'"
            type="text"
            @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button
            type="text"
            style="color: #eb4f1a"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
import VTable from "@/components/tableCom";
import QuarterDataPicker from "@/components/quarterDataPicker";
import SelectTree from "@/components/selectTree";

import {
  getIndicatorAssessModelList,
  getUnitlList,
  getAssessCycleList,
  getAssessList,
  deleteAssess,
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
          title: "编号",
          field: "assessNumber",
          width: 120,
        },
        {
          title: "评价标题",
          field: "title",
          width: 150,
        },
        {
          title: "指标评价模型名称",
          field: "modelName",
        },
        {
          title: "状态",
          field: "statusName",
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
          title: "检查单位",
          field: "orgUnitName",
        },

        {
          title: "创建人",
          field: "createUserName",
        },
        {
          title: "创建时间",
          field: "createTime",
        },
        {
          title: "操作",
          width: 150,
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
        title: "",
        modelId: [],
        cycle: [],
        orgUnitId: "",
      },
    };
  },
  created() {
    this.getIndicatorAssessModelList();
    this.getUnitlList();
    this.getAssessCycleList();
    this.getAssessList();
  },
  methods: {
    reset() {
      this.formParams = {
        title: "",
        modelId: [],
        cycle: [],
        orgUnitId: "",
      };
      this.listQuery = {
        current: 1,
        size: 10,
      };
      this.getAssessList();
    },
    /**
     * @description: 新增
     * @param {*}
     */
    handleAdd() {
      this.$router.push({
        path: "/comment-add",
      });
    },
    /**
     * @description: 编辑数据
     * @param {*}
     */
    handleEdit(row) {
      this.$router.push({
        path: `/comment-edit/${row.assessId}`,
      });
    },
    /**
     * @description: 跳转详情
     * @param {*}
     */
    goToDetail(row) {
      this.$router.push({
        path: `/comment-detail/${row.assessId}`,
      });
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
      this.getAssessList();
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
        let arr = [{}, {}, {}, {}];
        data.forEach((item) => {
          if (item.id === "year") {
            arr[0] = item;
          } else if (item.id === "quarter") {
            arr[1] = item;
          } else if (item.id === "month") {
            arr[2] = item;
          } else {
            arr[3] = item;
          }
        });
        this.assessCycleList = arr;
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
    async getAssessList() {
      let param = {
        title: this.formParams.title,
        modelId: this.formParams.modelId[0],
        cycle: this.formParams.cycle[0],
        orgUnitId: this.formParams.orgUnitId,
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
      let { data } = await getAssessList(param);
      if (data.code === undefined) {
        this.loading = false;
        this.tableData = data.content;
        this.total = Number(data.totalElements);
      }
    },
    /**
     * @description: 删除
     * @param {*}
     */
    handleDelete(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let { data } = await deleteAssess(row.assessId);
        if (data.code === undefined) {
          this.listQuery.current = 1;
          this.getAssessList();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
</style>
