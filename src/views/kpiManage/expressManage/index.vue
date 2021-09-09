<!--
 * @Description: 指标库管理
 * @Autor: hh
 * @Date: 2021-08-19 15:04:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-03 14:27:21
-->
<template>
  <div class="express">
    <main class="content">
      <aside class="input-box">
        <el-input
          style="width: 200px; margin-right: 24px"
          v-model="formParam.name"
          clearable
          size="mini"
          placeholder="请输入指标名称"
        ></el-input>
        <el-select
          size="mini"
          clearable
          placeholder="请选择状态"
          v-model="formParam.status"
        >
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          style="margin: 0 10px"
          type="primary"
          size="mini"
          plain
          @click="handleSearch"
          >搜索</el-button
        >
      </aside>
      <aside class="btns">
        <el-button type="primary" size="mini" plain @click="handleAdd"
          >新增</el-button
        >
        <el-button type="primary" size="mini" plain @click="exportTable">导出</el-button>
      </aside>

      <v-table
        style="margin-top: 15px"
        :loading="loading"
        :table-data="tableData"
        :column-data="columnData"
        :current.sync="listQuery.page"
        :total-count="total"
        :show-pagination="true"
        :auto-query-first="false"
      >
        <el-table-column
          slot="column5"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scoped">
            <el-button type="text" @click="configExpress(scoped.row)"
              >设置</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          slot="column6"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scoped">
            <el-button type="text" @click="showRelativeModal(scoped.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          slot="column10"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="toggleStatus(scope.row)"
              >{{ scope.row.status === "normal" ? "禁用" : "启用" }}</el-button
            >
            <el-button size="mini" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </v-table>
    </main>

    <!-- 新增编辑 -->
    <add-update
      :isShow.sync="isAddDialogShow"
      :title="dialogTitle"
      :updateId="updateId"
      @confirm="changeExpress"
    ></add-update>

    <!-- 关联评价模型表格 -->
    <el-dialog title="关联评价模型" :visible.sync="isRelativeModalShow">
      <v-table
        style="margin-top: 15px"
        :table-data="relativeModalTable"
        :column-data="relativeModalColumn"
        :show-pagination="false"
        :auto-query-first="false"
      >
        <el-table-column
          slot="column0"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scoped">
            <el-button type="text">{{ scoped.row.name }}</el-button>
          </template>
        </el-table-column>
      </v-table>
    </el-dialog>
  </div>
</template>

<script>
import VTable from "@/components/tableCom";

import AddUpdate from "./addUpdate.vue";

import {
  getExpressList,
  getExpressStatusList,
  deleteExpress,
  exportExpress,
  updateExpressStatus,
  getRelativeCommentModal,
  addExpress,
  updateExpress,
} from "@/api/modules/kpi";

import { downloadFile } from "@/utils";
export default {
  components: {
    VTable,
    AddUpdate,
  },
  data() {
    return {
      // 表格加载中
      loading: false,
      // 状态数据
      statusList: [],
      // 表格数据
      tableData: [],
      // 列数据
      columnData: [
        {
          title: "指标名称",
          field: "name",
        },
        {
          title: "指标类型",
          field: "typeName",
        },
        {
          title: "指标说明",
          field: "instruction",
        },
        {
          title: "评价对象级别",
          field: "assessObjectLevelName",
        },
        {
          title: "评价对象维度",
          field: "objectName",
        },
        {
          title: "指标公式配置",
        },
        {
          title: "关联评价模型",
        },
        {
          title: "创建人",
          field: "createdBy",
        },
        {
          title: "创建时间",
          field: "creationDate",
          width: 150,
        },
        {
          title: "状态",
          field: "statusName",
        },
        {
          title: "操作",
          width: 120,
          fixed: "right",
        },
      ],
      // 总条数
      total: 0,

      // 入参
      formParam: {
        name: "",
        status: "",
      },
      listQuery: {
        page: 1,
        size: 10,
      },

      // 关联评价模型表格数据
      isRelativeModalShow: false,
      relativeModalTable: [],
      relativeModalColumn: [
        {
          title: "模型名称",
          field: "name",
        },
        {
          title: "状态",
          field: "statusName",
        },
      ],

      // 新增编辑弹窗
      isAddDialogShow: false,
      dialogTitle: "",
      updateId: "",
    };
  },
  created() {
    this.getExpressList();
    this.getExpressStatusList();
  },
  methods: {
    /**
     * @description: 获取状态下拉数据
     * @param {*}
     */
    async getExpressStatusList() {
      let { data } = await getExpressStatusList();
      if (data.code === undefined) {
        this.statusList = [...data];
      }
    },
    /**
     * @description: 新增标签按钮事件
     * @param {*}
     * @return {*}
     */
    handleAdd() {
      this.updateId = "";
      this.dialogTitle = "新增";
      this.isAddDialogShow = true;
    },
    /**
     * @description: 编辑指标
     * @param {*}
     */
    handleUpdate(row) {
      this.dialogTitle = "修改";
      this.isAddDialogShow = true;
      this.updateId = row.indexId;
    },
    /**
     * @description: 搜索确定
     * @param {*}
     * @return {*}
     */
    handleSearch() {
      this.restParam();
      this.getExpressList();
    },
    /**
     * @description: 导出数据
     * @param {*}
     */
    async exportTable() {
      let response = await exportExpress();
      downloadFile(response);
    },
    /**
     * @description: 重置参数
     * @param {*}
     * @return {*}
     */
    restParam() {
      this.tableData = [];
      this.listQuery = {
        page: 1,
        size: 10,
      };
    },
    /**
     * @description: 获取标签列表数据
     * @param {*}
     * @return {*}
     */
    async getExpressList() {
      this.loading = true;
      let param = Object.assign({}, this.formParam, this.listQuery);

      param.page--;
      try {
        let { data } = await getExpressList(param);
        if (data.code == undefined) {
          this.total = Number(data.totalElements);
          this.tableData = data.content;
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * @description: 删除单独标签
     * @param {*} ids 需要删除的标签集合
     * @return {*}
     */
    async handleDelete(row) {
      this.$confirm("是否确认删除指标?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { data } = await deleteExpress(row.indexId);
          if (data.code !== "500") {
            this.restParam();
            this.getExpressList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {});
    },
    /**
     * @description: 处理状态
     * @param {*}
     */
    async toggleStatus(row) {
      let { data } = await updateExpressStatus({
        indexId: row.indexId,
        status: row.status === "normal" ? "disable" : "normal",
      });
      if (data.code === undefined) {
        this.$message.closeAll();
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getExpressList();
      }
    },
    /**
     * @description: 配置指标
     * @param {*} row
     */
    configExpress(row) {
      this.$router.push({
        path: `/express-config/${row.indexId}`,
      });
    },
    /**
     * @description: 查看关联数据模型
     * @param {*} row
     */
    async showRelativeModal(row) {
      let { data } = await getRelativeCommentModal(row.indexId);
      if (data.code === undefined) {
        if (data.length) {
          this.isRelativeModalShow = true;
          this.relativeModalTable = data;
        } else {
          this.$message.closeAll();
          this.$message({
            type: "info",
            message: "无关联数据",
          });
        }
      }
    },
    /**
     * @description: 新增指标
     * @param {*} res
     */
    async changeExpress(res) {
      if (typeof res.assessObjectIds === "string") {
        res.assessObjectIds = res.assessObjectIds.split();
      }
      const apiArr = new Map([
        ["add", addExpress],
        ["update", updateExpress],
      ]);
      let apiTarget = null;
      // 编辑时新增id字段
      if (this.updateId) {
        res.indexId = this.updateId;
        apiTarget = apiArr.get("update");
      } else {
        apiTarget = apiArr.get("add");
      }

      let { data } = await apiTarget(res);
      if (data.code === undefined) {
        this.isAddDialogShow = false;
        this.getExpressList();
        this.$message({
          type: "success",
          message: this.updateId ? "修改成功" : "新增成功",
        });

        this.updateId = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.express {
  .content {
    padding: 24px 40px;
    box-sizing: border-box;
    .input-box {
      display: flex;
      margin-bottom: 16px;
    }
  }
}
</style>
