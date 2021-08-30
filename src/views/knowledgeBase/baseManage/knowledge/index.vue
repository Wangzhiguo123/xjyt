<!--
 * @Description: 知识管理
 * @Autor: hh
 * @Date: 2021-08-19 15:04:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 18:00:00
-->
<template>
  <div class="knowledge">
    <nav-bar />

    <main class="content">
      <el-form :inline="true" :model="formParams" class="demo-form-inline">
        <el-form-item label="标签">
          <el-select
            size="mini"
            v-model="formParams.labelIdList"
            placeholder="请选择"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in labelList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别">
          <el-select
            size="mini"
            v-model="formParams.classificationIdList"
            placeholder="请选择"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in classifyList"
              :key="item.classificationId"
              :label="item.classificationName"
              :value="item.classificationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-select
            size="mini"
            v-model="formParams.authorIdList"
            placeholder="请选择"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in authorList"
              :key="item.authorId"
              :label="item.authorName"
              :value="item.authorId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            size="mini"
            v-model="formDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="onDateChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            size="mini"
            v-model="formParams.title"
            clearable
            placeholder="审批人"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="primary" @click="getKnowledgeBaseList"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" plain @click="onReset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>

      <v-table
        style="margin-top: 20px"
        :loading="loading"
        :table-data="tableData"
        :column-data="columnData"
        :current.sync="listQuery.page"
        :total-count="total"
        :show-pagination="true"
        :cell-style="setCellStyle"
        @query-data="getKnowledgeBaseList"
        @sort-change="sortChange"
        @row-click="handleRowClick"
      >
        <el-table-column
          slot="column1"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.articleLabelList.map((it) => it.labelName).join()
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          slot="column2"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.articleClassificationList
                .map((it) => it.classificationName)
                .join()
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          slot="column3"
          slot-scope="row"
          sortable="custom"
          :label="row.title"
          :width="row.width"
          prop="articleContentSizeAssemble"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.articleContentSizeAssemble }}</span>
          </template>
        </el-table-column>
        <el-table-column
          slot="column4"
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
          slot="column6"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.articleState_dictText }}</span>
          </template>
        </el-table-column>

        <el-table-column
          slot="column7"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click.stop="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click.stop="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click.stop="handleDownUp(scope.row)"
              >{{
                scope.row.articleState_dictText === "未发布" ? "上" : "下"
              }}架</el-button
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

import {
  getAuthorList,
  getClassificationList,
  getLabelList,
  getKnowledgeBaseList,
  deleteArticle,
  publishArticle,
} from "@/api/modules/knowledgeBase";

import { handleParam } from "@/utils";
export default {
  components: {
    NavBar,
    VTable,
  },
  data() {
    return {
      // 标签数据
      labelList: [],
      // 类别数据
      classifyList: [],
      // 作者数据
      authorList: [],

      // 筛选条件参数
      formParams: {
        sortFlag: "",
        sortKey: "",
        labelIdList: [],
        classificationIdList: [],
        authorIdList: [],
        publishDateStart: "",
        publishDateEnd: "",
        title: "",
      },
      formDate: [],
      loading: false,
      // 表格数据
      tableData: [],
      columnData: [
        {
          title: "标题",
          field: "articleTitle",
        },
        {
          title: "标签",
          field: "articleLabelList",
        },
        {
          title: "所属类型",
          field: "articleClassificationList",
        },
        {
          title: "大小",
          field: "articleContentSizeAssemble",
        },
        {
          title: "发布时间",
          field: "creationDate",
          width: 150,
        },
        {
          title: "作者",
          field: "articleAuthorName",
        },
        {
          title: "状态",
          field: "articleState_dictText",
        },
        {
          title: "操作",
          width: 200,
        },
      ],
      // 总条数
      total: 0,
      listQuery: {
        page: 1,
        size: 10,
      },
    };
  },
  created() {
    /**
     * @description: 获取筛选下拉列表数据
     * @param {*}
     */
    this.getAuthorList();
    this.getClassificationList();
    this.getLabelList();
  },
  methods: {
    /**
     * @description: 获取作者下拉
     * @param {*}
     */
    async getAuthorList() {
      let { data } = await getAuthorList();
      if (data.code === undefined) {
        this.authorList = data;
      }
    },
    /**
     * @description: 获取分类下拉
     * @param {*}
     */
    async getClassificationList() {
      let { data } = await getClassificationList();
      if (data.code === undefined) {
        this.classifyList = data;
      }
    },
    /**
     * @description: 获取标签下拉
     * @param {*}
     */
    async getLabelList() {
      let { data } = await getLabelList();
      if (data.code === undefined) {
        this.labelList = data;
      }
    },
    /**
     * @description: 日期改变
     * @param {*}
     */
    onDateChange(val) {
      [this.formParams.publishDateStart, this.formParams.publishDateEnd] = [
        ...val,
      ];
    },
    /**
     * @description: 排序改变
     * @param {*}
     */
    sortChange(res) {
      this.formParams.sortFlag = res.order === "ascending" ? "ASC" : "DESC";
      this.formParams.sortKey = res.prop;

      this.getKnowledgeBaseList();
    },
    /**
     * @description: 新增知识库事件
     * @param {*}
     */
    handleAdd() {
      this.$router.push({
        name: "knowledgeAdd",
      });
    },
    /**
     * @description: 修改单元格样式
     * @param {*}
     */
    setCellStyle({ columnIndex, row }) {
      if (columnIndex === 6 && row.articleState_dictText == "未发布") {
        return "color:#EB4F1A;";
      }
    },
    /**
     * @description: 重置参数
     * @param {*}
     */
    onReset() {
      this.formDate = [];
      this.formParams = {
        sortFlag: "",
        sortKey: "",
        labelIdList: "",
        classificationIdList: "",
        authorIdList: "",
        publishDateStart: "",
        publishDateEnd: "",
        title: "",
      };
    },
    /**
     * @description: 行点击事件
     * @param {*}
     */
    handleRowClick(data) {
      this.$router.push({
        path: `/knowledge-detail/${data.articleId}`,
      });
    },
    /**
     * @description: 获取知识库列表
     * @param {*}
     */
    async getKnowledgeBaseList() {
      this.loading = true;
      let param = Object.assign(this.formParams, this.listQuery);
      param.page--;

      // formdata 入参
      let formData = new FormData();
      for (let [key, val] of Object.entries(param)) {
        formData.append(key, val);
      }

      try {
        let { data } = await getKnowledgeBaseList(formData);
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
     * @description: 编辑文章
     * @param {*} row
     */
    handleEdit(row) {
      this.$router.push(`/knowledge-update/${row.articleId}`);
    },
    /**
     * @description: 上下架文章
     * @param {*} row
     */
    async handleDownUp(row) {
      let param = new FormData();
      handleParam(
        {
          articleIdList: [row.articleId],
        },
        param
      );
      if (row.articleState_dictText === "未发布") {
        param.append("publishOrUnPublishType", 1);
        let { data } = await publishArticle(param);
        if (data.code === undefined) {
          this.getKnowledgeBaseList();
          this.$message({
            type: "success",
            message: "上架成功",
          });
        }
      } else {
        this.$confirm("是否确认下架该文章?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          param.append("publishOrUnPublishType", 0);
          let { data } = await publishArticle(param);
          if (data.code === undefined) {
            this.getKnowledgeBaseList();
            this.$message({
              type: "success",
              message: "下架成功",
            });
          }
        });
      }
    },
    /**
     * @description: 删除文章
     * @param {*} row
     */
    async handleDelete(row) {
      this.$confirm("是否确认删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let formData = new FormData();
          formData.append("articleIdList", [row.articleId]);
          let { data } = await deleteArticle(formData);
          if (data.code === undefined) {
            this.getKnowledgeBaseList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-form-item {
  margin-bottom: 12px;
}
.knowledge {
  height: 100%;
  padding-top: 8px;
  .content {
    padding: 20px 40px;
  }
}
</style>
