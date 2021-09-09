<!-- 地图自定义组件 input选择搜索框及下来表格-->

<template>
  <div class="searchield">
    <section>
      <el-collapse accordion v-model="activeName">
        <el-collapse-item class="content" name="1">
          <template slot="title">
            生产监控警报 <span class="tips">6</span>
          </template>
          <div>
            <el-input
              placeholder="请输入搜索关键词"
              suffix-icon="el-icon-search"
              v-model="linkObject"
              class="seach"
              @blur="queryList"
            >
            </el-input>
            <div class="btn">
              <el-button type="primary" plain @click="queryList"
                >查看全部</el-button
              >
              <el-button type="primary" plain @click="queryList"
                >刷新</el-button
              >
            </div>
            <tableCom
              :table-data="tableData"
              :column-data="proColumnCon"
              style="width: 100%"
              :columnCheck="false"
              :show-pagination="false"
              @query-data="queryList"
              class="table"
            >
              <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :prop="row.field"
                :min-width="row.minWidth"
              >
                <template slot-scope="scoped">
                  <div class="operation">
                    <p @click="handleAlarm(scoped.row)">待处理</p>
                  </div></template
                ></el-table-column
              >
              <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :prop="row.field"
                :min-width="row.minWidth"
              >
                <template slot-scope="scoped">
                  <div class="operation">
                    <p @click="openhandle(scoped.row)">受理</p>
                  </div></template
                ></el-table-column
              >
            </tableCom>
          </div>
        </el-collapse-item>
        <el-collapse-item class="content" name="2">
          <template slot="title">
            运行车辆告警 <span class="tips">12</span>
          </template>
          <div>
            <el-input
              placeholder="请输入搜索关键词"
              suffix-icon="el-icon-search"
              v-model="linkObject"
              class="seach"
              @blur="carQueryList"
            >
            </el-input>
            <div class="btn">
              <el-button type="primary" plain @click="carQueryList"
                >查看全部</el-button
              >
              <el-button type="primary" plain @click="carQueryList"
                >刷新</el-button
              >
            </div>
            <tableCom
              :table-data="carTableData"
              :column-data="carColumnCon"
              style="width: 100%"
              :columnCheck="false"
              :show-pagination="false"
              @query-data="carQueryList"
              class="table"
            >
              <el-table-column
                slot="column1"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :prop="row.field"
                :min-width="row.minWidth"
              >
                <template slot-scope="scoped">
                  <div class="operation">
                    <p @click="handleCarAlarm(scoped.row)">超速告警</p>
                  </div></template
                ></el-table-column
              >
              <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :prop="row.field"
                :min-width="row.minWidth"
              >
                <template slot-scope="scoped">
                  <div class="operation">
                    <span @click="handleCarAlarm(scoped.row)">车辆轨迹</span>
                    <span @click="handleAlarm(scoped.row)">告警处理</span>
                  </div></template
                ></el-table-column
              >
            </tableCom>
          </div>
        </el-collapse-item>
      </el-collapse>
    </section>
    <handle-modal
      ref="handleModal"
      @confirm="confirm"
      :handleType="handleType"
    ></handle-modal>
    <!-- 生产监控告警基本信息 -->
    <!-- <alertInfo
      class="alertInfo"
      ref="alertInfo"
      :info-data="paramsData"
    ></alertInfo> -->
    <!-- 车辆监控告警基本信息 -->
    <!-- <carInfo class="carInfo" ref="carInfo" :info-data="carData"></carInfo> -->
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
import handleModal from "../handleModal";
// import alertInfo from "../alertInfo";
// import carInfo from "../carInfo";
import { proColumnCon, carColumnCon } from "./config";
import {
  mapList,
  handleResults,
  mapCarAlerts,
  carHandleResults,
} from "@/api/modules/productionMonitoring";
export default {
  props: {
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    tableCom,
    handleModal,
    // alertInfo,
    // carInfo,
  },
  data() {
    return {
      linkObject: "", //地图搜索的数据
      licensePlateNumber: "", //车辆搜索的数据
      activeName: ["1"], //默认展开行
      tableData: [], // 参数告警用户list
      carTableData: [], // 车辆告警用户list
      proColumnCon, //生产告警表头
      carColumnCon, //车辆告警表头
      handleType: "", //处理类型
      paramsData: [
        { title: "处理状态", name: "actualValue", value: "22" },
        { title: "关联对象", name: "actualValue", value: "" },
        { title: "告警类型", name: "actualValue", value: "" },
        { title: "告警分类", name: "actualValue", value: "" },
        { title: "告警等级", name: "actualValue", value: "" },
        { title: "参数名称", name: "actualValue", value: "" },
        { title: "实际/参考值", name: "actualValue", value: "" },
        { title: "告警时间", name: "actualValue", value: "" },
        { title: "解决方案", name: "actualValue", value: "" },
      ],
      carData: [
        { title: "车牌号码", name: "licensePlateNumber", value: "22" },
        { title: "车牌颜色", name: "licensePlateColor", value: "" },
        { title: "告警信息", name: "type", value: "" },
        { title: "行车速度", name: "speed", value: "" },
        { title: "行驶里程", name: "mileage", value: "" },
        { title: "车辆状态", name: "carStatus", value: "" },
        { title: "开始时间", name: "startTime", value: "" },
        { title: "结束时间", name: "endTime", value: "" },
        { title: "位置信息", name: "actualValue", value: "" },
      ],
    };
  },
  methods: {
    //地图告警查询列表
    async queryList() {
      let params = {
        linkObject: this.linkObject,
      };
      let res = await mapList(params);
      console.log("res", res);
      this.tableData = res.data || [];
    },
    //车辆告警查询列表
    async carQueryList() {
      let params = {
        licensePlateNumber: this.licensePlateNumber,
      };
      let res = await mapCarAlerts(params);
      console.log("res", res);
      this.carTableData = res.data || [];
    },
    //定位 告警处理打开 参数告警
    openhandle(row) {
      this.$emit("changePosition", row);
      this.$emit("alertInfoShow", row);;
    },
    //定位 车辆告警处理打开 车辆告警
    handleCarAlarm(row) {
      // this.$emit("changePosition", row);
      this.$emit("carInfoShow", row);;
    },
    //告警处理
    async confirm(data) {
      if (this.handleType === "params") {
        let res = await handleResults(data);
      } else {
        data.type = data.handleType;
        let res = await carHandleResults(data);
      }
      console.log("res", res);
    },
    //点击待处理
    handleAlarm(data) {
      this.$refs.handleModal.show(data);
    },
  },
};
</script>

<style lang="less" scoped>
.searchield {
  width: 550px;
  background: #ffffff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  .content {
    padding: 0 16px;
    border: 1px solid #ccc;
    margin-bottom: 16px;
    .tips {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: #ffffff;
      font-size: 14px;
      text-align: center;
      color: #ffffff;
      line-height: 18px;
      background: #eb4f1a;
      transform: translateX(4px);
      border-radius: 50%;
    }
    .seach {
      margin: 16px 0;
    }
    .btn {
      margin-bottom: 16px;
    }
    .table {
      height: 224px;
      overflow: auto;
    }
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
/deep/ .el-collapse-item__header {
  font-size: 18px;
  color: #000000;
  border-bottom: none;
}
/deep/ .el-collapse {
  font-size: 18px;
  color: #000000;
  border-top: none;
  border-bottom: none;
}
.table::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*宽度竖滚动条的尺寸*/
  height: 10px; /*高度横滚动条的尺寸*/
}
.table::-webkit-scrollbar-thumb {
  /*滚动条里面的条*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.table::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: #ffffff;
}
// .alertInfo {
//   // max-width: 556px;
//   // margin-left: 800px;
//   // margin-top: -400px;
// }
</style>
