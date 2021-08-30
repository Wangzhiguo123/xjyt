<!--关联摄像头-->
<template>
  <div class="relation">
    <el-dialog
      title="摄像头关联"
      :visible.sync="centerDialogVisible"
      width="40%"
      :modal-append-to-body="false"
    >
      <div class="content" style="margin-top: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            class="select"
            slot="prepend"
            placeholder="所属机构"
          >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <tableCom
        :table-data="tableData"
        :column-data="tbColumnCon"
        style="width: 100%; margin-top: 15px"
        :current.sync="pagination.current"
        :size.sync="pagination.size"
        :total-count="pagination.totalCount"
        :columnCheck="true"
        :show-pagination="true"
        :sortable="true"
      >
        <el-table-column
          slot="column9"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
          :min-width="row.minWidth"
          sortable
        >
          <template>
            <el-button>删除</el-button>
            <el-button type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </tableCom>
    </el-dialog>
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
export default {
  components: {
    tableCom,
  },
  data() {
    return {
      centerDialogVisible: false,
      region: "",
      input3: "",
      select: "",
      tableData: [
        {
          adjCode: "2016-05-02",
          startDatea: "王小虎",
          startDateb: "上海市普陀",
        },
        {
          adjCode: "2016-05-02",
          startDatea: "王小虎",
          startDateb: "上海市普陀",
        },
        {
          adjCode: "2016-05-02",
          startDatea: "王小虎",
          startDateb: "上海市普陀",
        },
      ],
      tbColumnCon: [
        {
          title: "摄像头名称",
          field: "adjCode",
          width: 120,
        },
        {
          title: "摄像头位置",
          field: "startDatea",
          width: 100,
        },
        {
          title: "状态",
          field: "startDateb",
          width: 100,
        },
        {
          title: "操作",
          field: "",
        },
      ],
      // 分页参数
      pagination: {
        size: 10,
        current: 1,
        totalCount: 10,
      },
    };
  },
};
</script>

<style lang="less" scoped>
.relation {
  height: "300px";
  .content {
    .select {
      min-width: 120px;
      // background: #fff;
      // height: 38px;
      // border-top:1px solid #DCDFE6 ;
      // border-bottom:1px solid #DCDFE6 ;
    }
  }
}
/deep/ .el-dialog__header {
  background: #f7f9fc;
  .el-dialog__title {
    color: #3377ff;
  }
}
/deep/ .el-dialog__body {
  min-height: 200px;
}
/deep/ .tableCom .pagination[data-v-60b524b4] {
  transform: translate(0%);
}
</style>
