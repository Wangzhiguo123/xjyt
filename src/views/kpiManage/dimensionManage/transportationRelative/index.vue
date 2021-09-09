<!--
 * @Description: 集输关系维度关联
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-02 09:29:09
-->
<template>
  <div class="container">
    <el-button type="primary" plain size="mini" @click="downloadTemplate"
      >下载导入模板</el-button
    >
    <el-button type="primary" plain size="mini">导出</el-button>
    <el-table
      :data="tableData"
      style="margin-top: 20px"
      row-key="id"
      border
      v-loading="loading"
    >
      <el-table-column prop="name" label="集输单元名称"> </el-table-column>
      <el-table-column prop="levelId" label="集输关系级别">
        <template slot-scope="scoped">
          <el-cascader
            v-model="scoped.row.levelId"
            :options="levelSelectList"
            :show-all-levels="false"
            @change="handleChange($event, scoped.row)"
          ></el-cascader>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getTransportRelativeList,
  getTransportList,
  addTransportRelative,
  updateTransportRelative,
  downloadTransportTemplate,
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
    async getTransportList() {
      let { data } = await getTransportList();
      if (data.code === undefined) {
        this.levelSelectList = [...data];
      }
    },
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getOrganizaRelativeList() {
      this.loading = true;
      let { data } = await getTransportRelativeList();
      if (data.code === undefined) {
        this.tableData = [...data];
      }
      this.loading = false;
    },
    /**
     * @description: 级别选择
     * @param {*} res
     * @param {*} row
     */
    async handleChange(res, row) {
      let { data } = !row.linkId
        ? await addTransportRelative({
            levelId: row.levelId[row.levelId.length - 1],
            refId: row.id,
          })
        : await updateTransportRelative({
            levelId: row.levelId[row.levelId.length - 1],
            linkId: row.linkId,
          });
      if (data.code === undefined) {
        this.getTransportRelativeList();
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
      let response = await downloadTransportTemplate();
      downloadFile(response);
    },
  },
  created() {
    this.getTransportRelativeList();
    this.getTransportList();
  },
};
</script>
<style lang="less" scoped></style>
