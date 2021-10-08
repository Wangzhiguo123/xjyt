<!--
 * @Description: 地质关系维度关联
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-15 16:21:26
-->
<template>
  <div class="container">
    <el-button type="primary" plain size="mini" @click="downloadTemplate"
      >下载导入模板</el-button
    >
    <el-button type="primary" plain size="mini" @click="exportTemplate"
      >导出</el-button
    >
    <el-table
      v-loading="loading"
      :data="tableData"
      style="margin-top: 20px"
      row-key="id"
      :header-cell-style="{ background: '#F7F7F8', color: 'rgba(0,0,0,0.45)' }"
      :cell-style="{ color: 'rgba(0,0,0,0.85)' }"
      border
    >
      <el-table-column prop="name" label="地质单元名称"> </el-table-column>
      <el-table-column prop="geologyId" label="地质关系级别">
        <template slot-scope="scoped">
          <el-cascader
            v-model="scoped.row.geologyId"
            :options="levelSelectList"
            :show-all-levels="false"
            :props="{ checkStrictly: true }"
            @change="handleChange(scoped.row)"
          ></el-cascader>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getGeologyList,
  getGeologyRelativeList,
  changeGeologyRelative,
  downloadGeologyTemplate,
  exportGeologyTemplate,
} from "@/api/modules/kpi";

import { downloadFile } from "@/utils";
export default {
  data() {
    return {
      loading: false,
      // 级别下拉选择列表
      levelSelectList: [],
      tableData: [],
      parentElement: {},
    };
  },
  async created() {
    await this.getGeologyList();
    this.getGeologyRelativeList();
  },
  methods: {
    /**
     * @description: 获取下拉列表
     * @param {*}
     */
    async getGeologyList() {
      let { data } = await getGeologyList();
      if (data.code === undefined) {
        this.levelSelectList = [...data];
      }
    },
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getGeologyRelativeList() {
      this.loading = true;
      let { data } = await getGeologyRelativeList();
      if (data.code === undefined) {
        this.tableData = [...data];
      }
      this.loading = false;
    },
    //查询父节点元素
    findParent(arr, id) {
      arr.forEach((item) => {
        if (item.id === id) {
          this.parentElement = item;
          return;
        }
        if (item.children) {
          this.findParent(item.children, id);
        }
      });
    },
    /**
     * @description: 级别选择
     * @param {*} res
     * @param {*} row
     */
    async handleChange(row) {
      // if (row.parentId !== "0") {
      //   this.findParent(this.tableData, row.parentId);
      //   if (this.parentElement && !this.parentElement.geologyName) {
      //     row.geologyId = null;
      //     this.$message.warning("请先选择父节点地质关系级别");
      //     return;
      //   }
      // }
      let { data } = await changeGeologyRelative({
        geologyId: row.geologyId[row.geologyId.length - 1],
        refId: row.id,
      });
      if (data.code === undefined) {
        // this.getGeologyRelativeList();
        this.$message({
          type: "success",
          message: "修改成功",
        });
      }
    },
    /**
     * @description: 下载导入模板
     * @param {*}
     */
    async downloadTemplate() {
      let response = await downloadGeologyTemplate();
      downloadFile(response);
    },
    /**
     * @description: 下载导入模板
     * @param {*}
     */
    async exportTemplate() {
      let response = await exportGeologyTemplate();
      downloadFile(response);
    },
  },
};
</script>
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
</style>
