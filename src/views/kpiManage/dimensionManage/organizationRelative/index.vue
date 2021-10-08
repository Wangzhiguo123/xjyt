<!--
 * @Description: 组织机构维度关联
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-15 17:41:57
-->
<template>
  <div class="container">
    <el-button type="primary" plain size="mini" @click="downloadTemplate"
      >下载导入模板</el-button
    >
    <el-button type="primary" plain size="mini" @click="exportTemplate">导出</el-button>
    <el-table
      :data="tableData"
      style="margin-top: 20px; min-height: 300px"
      row-key="id"
      border
      v-loading="loading"
      :header-cell-style="{ background: '#F7F7F8', color: 'rgba(0,0,0,0.45)' }"
      :cell-style="{ color: 'rgba(0,0,0,0.85)' }"
    >
      <el-table-column prop="name" label="组织机构名称"> </el-table-column>
      <el-table-column prop="levelId" label="组织机构级别维护">
        <template slot-scope="scoped">
          <el-cascader
            v-model="scoped.row.levelId"
            :options="levelSelectList"
            :show-all-levels="false"
            :props="{ checkStrictly: true }"
            @change="handleChange($event, scoped.row)"
          ></el-cascader>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getOrganizaList,
  getOrganizaRelativeList,
  addOrganizaRelative,
  updateOrganizaRelative,
  downloadOrganizaTemplate,
  exportOrganizaTemplate
} from "@/api/modules/kpi";

import { downloadFile } from "@/utils";
export default {
  data() {
    return {
      loading: false,
      // 级别下拉选择列表
      levelSelectList: [],
      tableData: [],
    };
  },
  methods: {
    /**
     * @description: 获取下拉列表
     * @param {*}
     */
    async getOrganizaList() {
      let { data } = await getOrganizaList();
      if (data.code === undefined) {
        this.levelSelectList = [...data];
      }
    },
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getOrganizaRelativeList() {
      // this.loading = true;
      let { data } = await getOrganizaRelativeList();
      // this.loading = false;
      if (data.code === undefined) {
        this.tableData = [...data];
      }
    },
    /**
     * @description: 级别选择
     * @param {*} res
     * @param {*} row
     */
    async handleChange(res, row) {
      let { data } = !row.linkId
        ? await addOrganizaRelative({
            levelId: row.levelId[row.levelId.length - 1],
            refId: row.id,
          })
        : await updateOrganizaRelative({
            levelId: row.levelId[row.levelId.length - 1],
            linkId: row.linkId,
          });
      if (data.code === undefined) {
        // this.getOrganizaRelativeList();
        this.$message({
          type: "success",
          message: "编辑成功",
        });
      }
    },
    /**
     * @description: 下载导入模板
     * @param {*}
     */
    async downloadTemplate() {
      let response = await downloadOrganizaTemplate();
      downloadFile(response);
    },
    /**
     * @description: 导出模板
     * @param {*}
     */
    async exportTemplate() {
      let response = await exportOrganizaTemplate();
      downloadFile(response);
    },
  },
  created() {
    this.getOrganizaList();
    this.getOrganizaRelativeList();
  },
};
</script>
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
</style>
