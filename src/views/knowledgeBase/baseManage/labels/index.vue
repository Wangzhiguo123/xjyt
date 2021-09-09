<!--
 * @Description: 标签管理
 * @Autor: hh
 * @Date: 2021-08-19 15:04:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 14:36:22
-->
<template>
  <div class="labels">
    <nav-bar></nav-bar>

    <main class="content">
      <aside class="input-box">
        <el-input
          style="width: 300px"
          v-model="keyword"
          clearable
          size="mini"
          placeholder="请输入标签名称或创建人"
        ></el-input>
        <el-button
          style="margin: 0 10px"
          type="primary"
          size="mini"
          plain
          @click="handleConfirm"
          >搜索</el-button
        >
      </aside>
      <aside class="btns">
        <el-button type="primary" size="mini" plain @click="handleAdd"
          >添加标签</el-button
        >
        <el-button
          size="mini"
          :disabled="!labelIds.length"
          plain
          @click="handleMultiDelete"
          >批量删除</el-button
        >
      </aside>

      <v-table
        style="margin-top: 15px"
        _ref="table"
        ref="table"
        :loading="loading"
        :table-data="tableData"
        :column-data="columnData"
        :current.sync="listQuery.page"
        :total-count="total"
        :column-check="true"
        :show-pagination="true"
        :getKeys="getKeys"
        :auto-query-first="false"
        @query-data="getLableList"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          slot="column2"
          slot-scope="row"
          sortable="custom"
          :label="row.title"
          :width="row.width"
          prop="creationDate"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.creationDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
          slot="column3"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleSingleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </v-table>
    </main>
  </div>
</template>

<script>
import NavBar from "../component/Nav";
import VTable from "@/components/tableCom";

import { getLableList, delLables, addLabel } from "@/api/modules/knowledgeBase";
export default {
  components: {
    NavBar,
    VTable,
  },
  data() {
    return {
      // 关键词
      keyword: "",

      // 表格加载中
      loading: false,
      // 表格数据
      tableData: [],
      // 列数据
      columnData: [
        {
          title: "标签名称",
          field: "labelName",
        },
        {
          title: "创建人",
          field: "createdByName",
        },
        {
          title: "创建时间",
          field: "creationDate",
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
        fieldName: "",
        sortType: "",
        page: 1,
        size: 10,
      },
      // 选中标签id集合
      labelIds: [],
    };
  },
  created() {
    this.getLableList();
  },
  methods: {
    /**
     * @description:获取表格选中标签id
     * @param {*}
     * @return {*}
     */
    getKeys(row) {
      return row.labelId;
    },
    /**
     * @description: 排序改变
     * @param {*}
     */
    sortChange(res) {
      this.listQuery.fieldName = res.prop;
      this.listQuery.sortType = res.order === "ascending" ? "ASC" : "DESC";

      this.getLableList();
    },
    /**
     * @description: 新增标签按钮事件
     * @param {*}
     * @return {*}
     */
    handleAdd() {
      this.$prompt("请输入标签名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5\da-zA-Z]{1,10}$/,
        inputErrorMessage: "请输入标签内容且不能包含特殊字符",
      })
        .then(async ({ value }) => {
          let { data } = await addLabel({
            labelName: value,
          });
          if (data.code == undefined) {
            this.restParam();
            this.getLableList();
            this.$message({
              type: "success",
              message: "新增成功",
            });
          }
        })
        .catch(() => {});
    },
    /**
     * @description: 搜索确定
     * @param {*}
     * @return {*}
     */
    handleConfirm() {
      this.restParam();
      this.getLableList();
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
      this.labelIds = [];
    },
    /**
     * @description: 获取标签列表数据
     * @param {*}
     * @return {*}
     */
    async getLableList() {
      this.loading = true;
      let param = Object.assign(
        {
          fuzzy_matching: this.keyword,
        },
        this.listQuery
      );

      param.page--;
      try {
        let { data } = await getLableList(param);
        if (data.code == undefined) {
          this.total = data.totalElements;
          this.tableData = data.content;
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * @description: 标签选中改变
     * @param {*} res 选中标签
     */
    selectionChange(res) {
      this.labelIds = res.length && res.map((it) => it.labelId);
    },
    /**
     * @description: 批量删除标签
     * @param {*}
     * @return {*}
     */
    handleMultiDelete() {
      if (!this.labelIds.length) {
        this.$message({
          type: "warning",
          message: "请先选择标签",
        });
        return;
      }
      this.handleDelete(this.labelIds);
    },
    /**
     * @description: 删除单独标签
     * @param {*} row 需要删除的标签
     * @return {*}
     */
    async handleSingleDelete(row) {
      this.handleDelete([row.labelId]);
    },
    /**
     * @description: 删除单独标签
     * @param {*} ids 需要删除的标签集合
     * @return {*}
     */
    async handleDelete(ids) {
      this.$confirm("是否确认删除标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let param = {
            idList: ids,
          };
          let { data } = await delLables(param);
          if (data.code !== "500") {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.restParam();
          this.getLableList();
          this.$refs.table.clearSelection();
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.labels {
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
