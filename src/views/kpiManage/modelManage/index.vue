<!--
 * @Description: 模型管理
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-06 10:34:05
-->
<template>
  <div class="container">
    <el-input
      style="width: 300px; margin-right: 10px"
      v-model="listQuery.name"
      clearable
      size="mini"
      placeholder="请输入指标名称"
    ></el-input>
    <el-button type="primary" size="mini" @click="getModelList">查询</el-button>
    <div style="margin-top: 10px">
      <el-button type="primary" size="mini" @click="btnAdd">新增</el-button>
    </div>
    <v-table
      style="margin-top: 15px"
      :loading="loading"
      :table-data="tableData"
      :column-data="columnData"
      :current.sync="listQuery.page"
      :total-count="total"
      :show-pagination="true"
      :auto-query-first="false"
      @query-data="getModelList"
    >
      <el-table-column
        slot="column0"
        slot-scope="row"
        :label="row.title"
        :width="row.width"
      >
        <template slot-scope="scoped">
          <el-button type="text" @click="pageToDetail(scoped.row.id)">{{
            scoped.row.code
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        slot="column10"
        slot-scope="row"
        :label="row.title"
        :width="row.width"
        fixed="right"
      >
        <template slot-scope="scoped">
          <template v-if="scoped.row.publicName !== '已发布'">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
          <el-button
            v-else
            size="mini"
            type="text"
            @click="handleSetStatus(scoped.row)"
            >{{ scoped.row.statusName === "禁用" ? "启用" : "禁用" }}</el-button
          >
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
import VTable from "@/components/tableCom";

import {
  getModelList,
  setModelStatus,
  addBusiness,
  updateBusiness,
  deleteModel,
} from "@/api/modules/kpi";

export default {
  components: {
    VTable,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      columnData: [
        {
          title: "编号",
          field: "code",
          width: 150,
        },
        {
          title: "评价模型名称",
          field: "name",
          width: 200,
        },
        {
          title: "发布状态",
          field: "publicName",
        },
        {
          title: "禁启状态",
          field: "statusName",
        },
        {
          title: "业务分类",
          field: "businessName",
        },
        {
          title: "评价对象类型",
          field: "objectLevelName",
          width: 150,
        },
        {
          title: "评价对象",
          field: "objectName",
        },
        {
          title: "评价周期",
          field: "cycleName",
        },
        {
          title: "创建人",
          field: "creationDate",
        },
        {
          title: "创建时间",
          field: "creatDate",
          width: 150,
        },
        {
          title: "操作",
          width: 100,
        },
      ],
      // 总条数
      total: 0,

      // 入参
      listQuery: {
        name: "",
        page: 1,
        size: 10,
      },
    };
  },
  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getModelList() {
      let { data } = await getModelList(this.listQuery);
      if (data.code === undefined) {
        this.tableData = data.content;
        this.total = Number(data.totalElements);
      }
    },
    /**
     * @description: 跳转详情
     * @param {*}
     */
    pageToDetail(id) {
      this.$router.push({
        path: `/model-detail/${id}`,
      });
    },
    /**
     * @description: 新增
     * @param {*}
     */
    btnAdd() {
      this.$router.push({
        path: "/model-add",
      });
    },
    /**
     * @description: 编辑数据
     * @param {*}
     */
    handleEdit(row) {
      this.$router.push({
        path: `/model-edit/${id}`,
      });
    },
    /**
     * @description: 禁用启用状态
     * @param {*} row
     */
    async handleSetStatus(row) {
      let { data } = await setModelStatus({
        id: row.id,
        code: row.status === "disable" ? "normal" : "disable",
      });
      if (data.code === undefined) {
        this.$message.closeAll();
        this.$message({
          type: "success",
          message: `${row.status === "disable" ? "启用" : "禁用"}成功`,
        });
        this.getModelList();
      }
    },
    /**
     * @description: 删除
     * @param {*}
     */
    handleDelete(id) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let { data } = await deleteModel(id);
        if (data.code === undefined) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getModelList();
        }
      });
    },
  },
  created() {
    this.getModelList();
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
</style>
