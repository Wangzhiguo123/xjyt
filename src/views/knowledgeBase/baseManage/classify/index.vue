<!--
 * @Description: 类别管理
 * @Autor: hh
 * @Date: 2021-08-19 15:04:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 14:37:21
-->
<template>
  <div class="classify">
    <nav-bar></nav-bar>

    <main class="content">
      <aside class="input-box">
        <el-input
          style="width: 300px"
          v-model="keyword"
          clearable
          size="mini"
          placeholder="请输入类别名称或创建人"
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
          >添加类别</el-button
        >
        <el-button
          size="mini"
          :disabled="!classifyIds.length"
          plain
          @click="handleMultiDelete"
          >批量删除</el-button
        >
      </aside>

      <v-table
        style="margin-top: 15px"
        :loading="loading"
        ref="table"
        _ref="table"
        :table-data="tableData"
        :column-data="columnData"
        :current.sync="listQuery.page"
        :total-count="total"
        :column-check="true"
        :show-pagination="true"
        :getKeys="getKeys"
        :auto-query-first="false"
        @query-data="getClassifyList"
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
            <el-button size="mini" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
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
import NavBar from "../component/Nav.vue";
import VTable from "@/components/tableCom";

import {
  getClassifyList,
  delClassifies,
  addClassify,
  editClassify
} from "@/api/modules/knowledgeBase";
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
          title: "类别名称",
          field: "classificationName",
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
      // 选中类别id集合
      classifyIds: [],
    };
  },
  created() {
    this.getClassifyList();
  },
  methods: {
    /**
     * @description:获取表格选中类别id
     * @param {*}
     * @return {*}
     */
    getKeys(row) {
      return row.classificationId;
    },
    /**
     * @description: 排序改变
     * @param {*}
     */
    sortChange(res) {
      this.listQuery.fieldName = res.prop;
      this.listQuery.sortType = res.order === "ascending" ? "ASC" : "DESC";

      this.getClassifyList();
    },
    /**
     * @description: 新增类别按钮事件
     * @param {*}
     * @return {*}
     */
    handleAdd() {
      this.$prompt("请输入类别名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5\da-zA-Z]{1,10}$/,
        inputErrorMessage: "请输入类别名称且不能包含特殊字符并不超过10个字符",
      })
        .then(async ({ value }) => {
          let { data } = await addClassify({
            classificationName: value,
          });
          if (data.code === undefined) {
            this.restParam();
            this.getClassifyList();
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
      this.getClassifyList();
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
     * @description: 获取类别列表数据
     * @param {*}
     * @return {*}
     */
    async getClassifyList() {
      this.loading = true;
      let param = Object.assign(
        {
          fuzzy_matching: this.keyword,
        },
        this.listQuery
      );

      param.page--;
      try {
        let { data } = await getClassifyList(param);
        if (data.code === undefined) {
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
      this.classifyIds = res.length && res.map((it) => it.classificationId);
    },
    /**
     * @description: 批量删除类别
     * @param {*}
     * @return {*}
     */
    handleMultiDelete() {
      if (!this.classifyIds.length) {
        this.$message({
          type: "warning",
          message: "请先选择类别",
        });
        return;
      }
      this.handleDelete(this.classifyIds);
    },
    /**
     * @description: 编辑单独类别
     * @param {*} row 需要编辑的类别
     * @return {*}
     */
    handleEdit(row) {
      this.$prompt("请输入类别名称", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.classificationName,
        inputPattern: /^[\u4e00-\u9fa5\da-zA-Z]{1,10}$/,
        inputErrorMessage: "请输入类别名称且不能包含特殊字符并不超过10个字符",
      })
        .then(async ({ value }) => {
          let { data } = await editClassify({
            classificationName: value,
            classificationId:row.classificationId
          });
          if (data.code === undefined) {
            this.restParam();
            this.getClassifyList();
            this.$message({
              type: "success",
              message: "编辑成功",
            });
          }
        })
        .catch(() => {});
    },
    /**
     * @description: 删除单独类别
     * @param {*} row 需要删除的类别
     * @return {*}
     */
    async handleSingleDelete(row) {
      this.handleDelete([row.classificationId]);
    },
    /**
     * @description: 删除单独类别
     * @param {*} ids 需要删除的类别集合
     * @return {*}
     */
    async handleDelete(ids) {
      this.$confirm("是否确认删除类别?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let param = {
            idList: ids,
          };
          let { data } = await delClassifies(param);
          if (data.code === undefined) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.restParam();
          this.getClassifyList();
          this.$refs.table.clearSelection();
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.classify {
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
