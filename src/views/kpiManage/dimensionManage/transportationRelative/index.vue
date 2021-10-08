<!--
 * @Description: 集输关系维度关联
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-16 11:04:01
-->
<template>
  <div class="container">
    <el-button type="primary" @click="downloadTemplate"
      >下载导入模板</el-button
    >
    <el-button type="primary" @click="exportTemplate"
      >导出</el-button
    >
    <el-table
      v-loading="loading"
      :data="tableData"
      style="margin-top: 20px"
      row-key="id"
      border
      :header-cell-style="{ background: '#F7F7F8', color: 'rgba(0,0,0,0.45)' }"
      :cell-style="{ color: 'rgba(0,0,0,0.85)' }"
    >
      <el-table-column prop="name" label="集输单元名称"> </el-table-column>
      <el-table-column prop="gatheringId" label="集输关系级别">
        <template slot-scope="scoped">
          <el-cascader
            ref="casader"
            v-model="scoped.row.gatheringId"
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
  getTransportRelativeList,
  getTransportList,
  addTransportRelative,
  updateTransportRelative,
  downloadTransportTemplate,
  exportTransportTemplate,
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
  created() {
    this.getTransportRelativeList();
    this.getTransportList();
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
    async getTransportRelativeList() {
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
            gatheringId: row.gatheringId[row.gatheringId.length - 1],
            refId: row.id,
          })
        : await updateTransportRelative({
            gatheringId: row.gatheringId[row.gatheringId.length - 1],
            linkId: row.linkId,
          });
      if (data.code === undefined) {
        // this.getTransportRelativeList();
        // console.log(this.$refs, 222222);
        // this.$refs["casader"].dropDownVisible = false;
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
    /**
     * @description: 下载导入模板
     * @param {*}
     */
    async exportTemplate() {
      let response = await exportTransportTemplate();
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
