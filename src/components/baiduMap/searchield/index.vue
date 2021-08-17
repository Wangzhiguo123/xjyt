<!-- 地图自定义组件 -->
<!-- 参数说明
      type        -------------------------     类型 1下拉选搜索 2下拉选表格
      title       -------------------------     标题
      subTitle    -------------------------     子标题
      ident       -------------------------     标识
 -->

<template>
  <div class="searchield">
    <section v-for="(item, index) in searchData" :key="index">
      <el-input
        v-if="item.type === 1"
        v-model="input3"
        :placeholder="item.title"
        class="input-with-select"
      >
        <el-select slot="prepend" v-model="select" :placeholder="item.subTitle">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div v-if="item.type === 2" class="inputTable">
        <el-input
          v-model="member"
          style="width: 80%"
          :placeholder="item.title"
          :suffix-icon="item.isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          size="medium"
          readonly="readonly"
          @click.native="changeSelect(item.ident)"
        ></el-input>
        <div v-if="item.isShow" class="treeDiv">
          <el-table
            :ref="item.indet"
            style="width: 100%"
            :data="memberList"
            @row-click="handleRegionNodeClick"
            @cell-click="handleNameClick"
          >
            <el-table-column
              v-for="(item, index) in columns"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :show-overflow-tooltip="true"
              :width="item.width"
              sortable
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="item.type === 3">
        <el-button style="margin-top: 20px" type="primary"
          >{{ item.title }}({{ item.subTitle }})</el-button
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      input3: "",
      select: "",
      member: "",
      memberList: [
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
        {
          index: 1,
          obj: "滇西17集成站",
          time: "7-16 18:29:23",
          addres: "定位",
          status: "待处理",
        },
      ], // 用户list
      selectTableId: "", //  table选中行id
      columns: [
        {
          prop: "index",
          label: "序号",
          width: "60",
        },
        {
          prop: "obj",
          label: "报警对象",
          width: "90",
        },
        {
          prop: "time",
          label: "报警时间",
          width: "90",
        },
        {
          prop: "addres",
          label: "位置",
          width: "60",
          scopedSlots: { customRender: "name" },
        },
        {
          prop: "status",
          label: "状态",
          width: "60",
        },
      ],
    };
  },
  methods: {
    changeSelect(ident) {
      this.$emit("isShow", ident);
    },
    // 点击table节点
    handleRegionNodeClick(data) {
      console.log("data", data);
    },
    handleNameClick() {
      // row
      let lng = 104.06;
      let lat = 30.67;
      this.$emit("changePosition", lng, lat);
    },
  },
};
</script>

<style lang="less" scoped>
.searchield {
  margin-left: 32px;
  margin-top: 188px;
  width: 490px;
  .inputTable {
    margin-top: 16px;
  }
}
/deep/.el-select {
  .el-input__inner {
    width: 118px;
  }
}
.treeDiv {
  width: 80%;
  height: 226px;
  overflow: auto;
  overflow-x:hidden .el-table {
    border-radius: 6px;
  }
  .el-table /deep/ td {
    padding: 4px 0;
  }
}
/deep/ .el-table th > .cell {
  padding-left: 0;
  padding-right: 0;
}
/deep/ .el-table .cell {
  padding-left: 0;
  padding-right: 0;
}
.treeDiv::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*宽度竖滚动条的尺寸*/
  height: 10px; /*高度横滚动条的尺寸*/
}
.treeDiv::-webkit-scrollbar-thumb {
  /*滚动条里面的条*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.treeDiv::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: #ffffff;
}
</style>
