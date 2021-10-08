<!-- 地图自定义组件 input选择搜索框及下来表格-->

<template>
  <div class="searchield">
    <!-- <section>
      <el-collapse accordion v-model="activeName">
        <el-collapse-item class="content" name="1">
          <template slot="title">
            生产监控警报 <span class="tips">{{ tableData.length }}</span>
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
              <el-button type="primary" plain @click="viewAll('pro')"
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
                    <p v-show="scoped.row.status=='01'" style="color:#EB4F1A;cursor:pointer" @click="handleAlarm(scoped.row, 'pro')">待处理</p>

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
                    <p style="color:#1982ED;cursor:pointer" @click="openhandle(scoped.row)">受理</p>
                  </div></template
                ></el-table-column
              >
            </tableCom>
          </div>
        </el-collapse-item>
        <el-collapse-item class="content" name="2">
          <template slot="title">
            视频监控告警 <span class="tips">{{ videoTableData.length }}</span>
          </template>
          <div>
            <el-input
              placeholder="请输入搜索关键词"
              suffix-icon="el-icon-search"
              v-model="linkObject"
              class="seach"
              @blur="alertsQueryList"
            >
            </el-input>
            <div class="btn">
              <el-button type="primary" plain @click="viewAll('video')"
                >查看全部</el-button
              >
              <el-button type="primary" plain @click="alertsQueryList"
                >刷新</el-button
              >
            </div>
            <tableCom
              :table-data="videoTableData"
              :column-data="videoColumnCon"
              style="width: 100%"
              :columnCheck="false"
              :show-pagination="false"
              @query-data="alertsQueryList"
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
                    <p @click="videoOpen(scoped.row)">视频告警</p>
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
                    <span style="color:#1982ED;cursor:pointer" @click="videoOpen(scoped.row)">处理</span>
                  </div></template
                ></el-table-column
              >
            </tableCom>
          </div>
        </el-collapse-item>
        <el-collapse-item class="content" name="3">
          <template slot="title">
            运行车辆告警 <span class="tips">{{ carTableData.length }}</span>
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
              <el-button type="primary" plain @click="viewAll('car')"
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
                    <span style="color:#1982ED;cursor:pointer" @click="trajectoryOpen(scoped.row)">车辆轨迹&emsp;</span>
                    <span style="color:#1982ED;cursor:pointer" @click="handleAlarm(scoped.row, 'car')"
                      >告警处理</span
                    >
                  </div></template
                ></el-table-column
              >
            </tableCom>
          </div>
        </el-collapse-item>
      </el-collapse>
    </section> -->
    <el-radio-group class="giveAlarm" v-model="radio">
      <el-row>
        <el-col :span="24"
          ><el-radio @change="proRadioChange" label="1"
            >生产监控告警<span class="tips">{{
              tableData.length
            }}</span></el-radio
          >
        </el-col>
        <el-col :span="24"
          ><el-radio @change="proRadioChange" label="2"
            >视频监控告警<span class="tips">{{
              tableData.length
            }}</span></el-radio
          >
        </el-col>
        <el-col :span="24"
          ><el-radio @change="proRadioChange" label="3"
            >车辆监控告警<span class="tips">{{
              tableData.length
            }}</span></el-radio
          >
        </el-col>
      </el-row>
    </el-radio-group>

    <handle-modal
      ref="handleModal"
      @confirm="confirm"
      :handleType="handleType"
    ></handle-modal>
    <div>
      <!-- <ThemePicker></ThemePicker> -->
    </div>
    <!-- 车辆轨迹 -->
    <trajectory ref="trajectory"></trajectory>
    <videoAlert
      class="videoAlert"
      ref="videoAlert"
      @handleAlarm="handleAlarm"
    ></videoAlert>
  </div>
</template>

<script>
import tableCom from "@/components/tableCom";
import ThemePicker from "@/components/ThemePicker";
import handleModal from "../handleModal";
import trajectory from "../trajectory";
import videoAlert from "../videoAlert";
// import alertInfo from "../alertInfo";
// import carInfo from "../carInfo";
import { proColumnCon, videoColumnCon, carColumnCon } from "./config";
import {
  mapList,
  handleResults,
  mapCarAlerts,
  carHandleResults,
  handleConfigsHandle,
  alertsPage,
} from "@/api/modules/productionMonitoring";
export default {
  props: {
  },
  components: {
    tableCom,
    handleModal,
    ThemePicker,
    trajectory,
    videoAlert,
    // alertInfo,
    // carInfo,
  },
  data() {
    return {
      radio: "1",
      linkObject: "", //地图搜索的数据
      licensePlateNumber: "", //车辆搜索的数据
      activeName: ["1"], //默认展开行
      tableData: [], // 参数告警用户list
      carTableData: [], // 车辆告警用户list
      videoTableData: [], // 车辆告警用户list
      proColumnCon, //生产告警表头
      videoColumnCon, //视频告警表头
      carColumnCon, //车辆告警表头
      handleType: "", //处理类型
      paramsData: [
        { title: "告警区块", name: "actualValue", value: "22" },
        { title: "告警对象", name: "actualValue", value: "" },
        { title: "位置信息", name: "actualValue", value: "" },
        { title: "告警类型", name: "actualValue", value: "" },
        { title: "告警分类", name: "actualValue", value: "" },
        { title: "参数名称", name: "actualValue", value: "" },
        { title: "实际值", name: "actualValue", value: "" },
        { title: "最高限值", name: "actualValue", value: "" },
        { title: "最低限值", name: "actualValue", value: "" },
        { title: "报警时间", name: "actualValue", value: "" },
        { title: "告警等级", name: "actualValue", value: "" },
        { title: "处理状态", name: "actualValue", value: "" },
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
    /**
     * @description:生产监控告警选中
     * @param {*}
     * @return {*}
     */
    async proRadioChange(value) {
      if (value === "1") {
        //参数告警查询列表
        let params = {
          linkObject: this.linkObject,
        };
        let res = await mapList(params);
        if (res.status === 200) {
          this.$emit("location", res.data);
        }
      }
    },
    /**
     * @description:参数告警查询列表
     * @param {*}
     * @return {*}
     */
    async proQueryList() {
      let params = {
        linkObject: this.linkObject,
      };
      let res = await mapList(params);
      if (res.status === 200) {
        this.tableData = res.data || [];
      }
    },
    /**
     * @description:车辆告警查询列表
     * @param {*}
     * @return {*}
     */
    async carQueryList() {
      let params = {
        licensePlateNumber: this.licensePlateNumber,
      };
      let res = await mapCarAlerts(params);
      this.carTableData = res.data || [];
    },

    //跳转全部
    viewAll(value) {
      if (value === "pro") {
        this.$router.push("/parameterAlarm");
        return;
      }
      if (value === "video") {
        this.$router.push("/videoSurveillance/basicsInfo");
        return;
      }
      if (value === "car") {
        this.$router.push("/runningVehicle/typeManagement");
        return;
      }
    },
    //车辆轨迹打开
    trajectoryOpen() {
      this.$refs.trajectory.trajectoryVisible = true;
    },

    //视频监控查询列表
    async alertsQueryList() {
      let params = {
        licensePlateNumber: this.licensePlateNumber,
        processState: 0,
      };
      let res = await alertsPage(params);
      this.videoTableData = res.data.content || [];
    },
    //定位 告警处理打开 参数告警
    openhandle(row) {
      this.$emit("changePosition", row);
      this.handleType = "pro";
      this.$emit("alertInfoShow", row);
    },
    //视频告警
    videoOpen(row) {
      this.handleType = "video";
      this.$refs.videoAlert.show(row);
    },
    //定位 车辆告警处理打开 车辆告警
    handleCarAlarm(row) {
      this.handleType = "car";
      this.$emit("carInfoShow", row);
    },
    //点击待处理
    handleAlarm(data, ident) {
      console.log(ident);
      if (ident) {
        this.handleType = ident;
      }
      this.$refs.handleModal.show(data, ident);
    },
    //告警处理
    async confirm(data) {
      console.log("this.handleType", this.handleType, data);
      if (this.handleType === "pro") {
        let res = await handleResults(data);
        this.queryList();
      }
      if (this.handleType === "video") {
        console.log("data", data);
        data.type = data.handleType;
        let params = {
          handleUserId: 8371,
          name: "测试",
          descriptions: data.remarks,
          alertId: data.alertId,
        };
        let res = await handleConfigsHandle(params);
        this.$refs.videoAlert.hide();
        this.alertsQueryList();
      }
      if (this.handleType === "car") {
        data.type = data.handleType;
        let res = await carHandleResults(data);
      }
      this.carQueryList();
    },
  },
};
</script>

<style lang="less" scoped>
.searchield {
  width: 550px;
  // background: #ffffff;
  // padding: 16px;
  // border-radius: 4px;
  // box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  // .content {
  //   padding: 0 16px;
  //   border: 1px solid #ccc;
  //   margin-bottom: 16px;
  .giveAlarm {
    font-size: 28px;
    .tips {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: #ffffff;
      font-size: 14px;
      text-align: center;
      color: #ffffff;
      line-height: 20px;
      background: #eb4f1a;
      transform: translateX(4px);
      border-radius: 50%;
    }
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
  // }
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
  // border-bottom: none;
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
// /deep/.el-radio__label {
//   font-size: 20px;
//   letter-spacing: 4px;
//   color: #565656;
// }
</style>
