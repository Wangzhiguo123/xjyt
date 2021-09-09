<template>
  <div>
    选取
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      multiple
      :show-file-list="false"
      :auto-upload="false"
      :on-change="fileChange"
    >
      <el-button slot="trigger" size="mini" type="primary" plain
        >选取文件</el-button
      >
    </el-upload>
    <v-table
      :table-data="fileList"
      :column-data="fileColumnData"
      :show-pagination="false"
    >
      <el-table-column
        slot="column2"
        slot-scope="row"
        :label="row.title"
        :width="row.width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleRemoveFile(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 附件数据
      fileList: [],
      fileColumnData: [
        {
          title: "附件名称",
          field: "attachmentRealName",
        },
        {
          title: "大小",
          field: "attachmentSizeAssemble",
          width: 200,
        },
        {
          title: "操作",
          width: 200,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>