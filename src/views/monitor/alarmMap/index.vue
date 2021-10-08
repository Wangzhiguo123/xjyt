<!-- 地图告警 -->
<template>
  <div class="alarmMap">
    <baidu-map class="map" :center="center" :zoom="zoom"  @ready="handler">
         <bm-marker :position="{lng: 116.4, lat: 39.9}" @click="mapClick" :dragging="true" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import searchield from "../components/searchield";
import dispatch from "../components/dispatch";
import alertInfo from "../components/params/alertInfo";
import carInfo from "../components/carInfo";
// import repairOrder from "@/components/baiduMap/repairOrder";
export default {
  name: "AlarmMap",
  components: {
    searchield,
    dispatch,
    alertInfo,
    carInfo,
    // repairOrder,
  },
  data() {
    return {
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
      proData: [], //参数告警信息
      center: { lng: 116.404, lat: 39.915 },
      markerPoint: { lng: 116.4, lat: 39.9 },
      zoom: 15,
      keyword: "",
    };
  },
  mounted() {},
  methods: {
    /**
     * @description:参数告警
     * @param {*}
     * @return {*}
     */
    location(data) {
      console.log("data", data);
      this.proData = data;
      this.proData.forEach(item => {
        item.longitude = 116.4;
        item.latitude = 39.9;
      });
    },
    //参数告警图标点击
    mapClick(type, target) {
      console.log(type, target);
      //  this.$refs.alertInfo.exhibition = true;
       this.$refs.alertInfo.show();
      // this.$refs.alertInfo.queryList(row);
    },
    //参数告警基础信息
    alertInfoShow(row) {
      this.$refs.alertInfo.exhibition = true;
      this.$refs.alertInfo.queryList(row);
    },
    //车辆告警基础信息
    carInfoShow(row) {
      this.$refs.carInfoInfo.exhibition = true;
      this.$refs.carInfoInfo.queryList(row);
    },
    //表格定位
    changeAddress(value) {
      this.center.lng = value.latitude;
      this.center.lat = value.longitude;
    },
    //打开报警处理
    handleAlarm(data) {
      this.$refs.searchield.handleAlarm(data);
    },
    //地图参数
    handler({ BMap, map }) {
      console.log(BMap, map);
      // this.center.lng = 84.86225;
      // this.center.lat = 45.5908;
      // this.zoom = 15;
    },
  },
};
</script>
<style lang="less" scoped>
.alarmMap {
  height: 100%;
  width: 100%;
}
.map {
  width: 100%;
  height: 700px;
  .tabs {
    margin-left: 200px;
    margin-top: 20px;
    width: 880px;
  }
}

/deep/ .el-tabs__header {
  margin-bottom: 0;
}
.alertInfo {
  position: fixed !important;
  left: 1000px;
  top: 100px;
  z-index: 0 !important;
}
.searchield {
  // z-index: 0 !important;
}
/deep/.anchorTL {
  // z-index: 0 !important;
}
.carInfoInfo {
  position: fixed !important;
  left: 1000px;
  top: 100px;
  z-index: 0 !important;
}
</style>
