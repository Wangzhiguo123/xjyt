<!---告警地图-关联摄像头---->
<template>
  <el-dialog
    title="关联摄像头"
    :visible.sync="cameraVisible"
    width="50%"
    class="camera"
    append-to-body
    :before-close="handleClose"
  >
    <div class="content">
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
          style="width: 460px"
          @blur="queryList"
        >
          <el-select v-model="select" slot="prepend" placeholder="所属机构">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryList"
          ></el-button>
        </el-input>
      </div>
      <tableCom
        :table-data="tableData"
        :column-data="tbColumnCon"
        style="width: 100%"
        :current.sync="pagination.current"
        :size.sync="pagination.size"
        :total-count="pagination.totalCount"
        :columnCheck="true"
        :show-pagination="true"
        @selection-change="selectionChange"
        @query-data="queryList"
      >
        <el-table-column
          slot="column3"
          slot-scope="row"
          :label="row.title"
          :width="row.width"
          :prop="row.field"
          :min-width="row.minWidth"
          sortable
        >
          <template>
            <div class="operation">预览</div></template
          ></el-table-column
        ></tableCom
      >
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="preservation"
        ><i class="el-icon-arrow-right"></i>保存</el-button
      >
      <el-button @click="cameraVisible = false"
        ><i class="el-icon-arrow-right"></i>取消</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import tableCom from "@/components/tableCom";
import { camerasPage,unitsCameras } from "@/api/modules/productionMonitoring";
export default {
  components: {
    tableCom,
  },
  data() {
    return {
      cameraVisible: false,
      input3: "",
      select: "",
      cameraData: [], //列表数据
      tableData: [], // 用户list
      selectionData: [], //选中的数据
      // 分页参数
      pagination: {
        size: 10,
        current: 1,
        totalCount: 0,
      },
      tbColumnCon: [
        {
          field: "name",
          title: "摄像头名称",
          width: "240",
        },
        {
          field: "linkObject",
          title: "摄像头位置",
          width: "240",
        },
        {
          field: "alertTime",
          title: "状态",
          width: "160",
        },
        {
          field: "location",
          title: "操作",
        },
      ],
    };
  },
  methods: {
    //关闭弹窗
    handleClose(done) {
      this.cameraVisible = false;
    },
    //展示
    show(params) {
      this.cameraVisible = true;
      if (params) {
        let data = [];
        params.forEach((item) => {
          data.push(item.id);
        });
        this.cameraData = data;
        this.queryList();
      }
    },
    //查询列表
    async queryList() {
      let excludeIds = this.cameraData.join(",");
      let params = {
        current: this.pagination.current - 1,
        size: this.pagination.size,
        excludeIds: excludeIds, //排除id数据
      };
      let res = await camerasPage(params);
      this.tableData = res.data.content || [];
      this.pagination.totalCount = res.data.numberOfElements;
    },
    //保存关联摄像头
    async preservation() {
      let cameraIds = []
      this.selectionData.forEach(item=>{
        cameraIds.push(item.id)
      })
      let params = {
        cameraIds,
        unitId : 1,
      };
      let res = await unitsCameras(params);
      this.cameraVisible = false;
    },
    //选中的摄像头
    selectionChange(data) {
      this.selectionData = data;
    },
  },
};
</script>

<style lang="less" scoped>
.camera {
  .content {
  }
}

/deep/ .el-dialog__header {
  color: rgba(0, 0, 0, 0.85);
}
/deep/ .el-dialog__body {
  border-top: 1px solid #ccc;
}
/deep/.el-input-group {
  margin: 24px 0;
}
/deep/ .el-select {
  width: 120px;
}
/deep/ .el-select {
  .el-input__inner::-webkit-input-placeholder {
    color: #000000;
  }
}
/deep/ .el-dialog{
  margin-left: 26%;
}
</style>absolute;
    // -bottom: 6px;
    // right: 0px;
  }
  .videoContent {
    // display: flex;s
    // justify-content: space-around;
    // flex-wrap: wrap;

    .video {
      width: 580px;
      height: 400px;
      // max-height: 200px;
    }
  }
}
</style>
