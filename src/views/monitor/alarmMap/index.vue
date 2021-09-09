<!-- 地图告警 -->
<template>
  <div class="alarmMap">
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
      <!-- <bm-control class="tabs">
        <mapTabs :plant-area="plantArea"></mapTabs>
      </bm-control> -->
      <!-- 左侧表格 -->
      <bm-control :offset="{ width: '100px', height: '10px' }">
        <bm-auto-complete v-model="keyword" :sug-style="{ zIndex: 1 }">
          <searchield
            ref="searchield"
            class="searchield"
            :search-data="searchData"
            @alertInfoShow="alertInfoShow"
            @carInfoInfoShow="carInfoInfoShow"
            @changePosition="changeAddress"
          ></searchield>
        </bm-auto-complete>
      </bm-control>
      <!-- 搜索条 -->
      <bm-control class="select">
        <bm-auto-complete>
          <selectModel ref="select"></selectModel>
        </bm-auto-complete>
      </bm-control>
      <!-- 参数告警基础信息 -->
      <bm-control class="alertInfo">
        <bm-auto-complete>
          <alertInfo
            class="alertInfo"
            ref="alertInfo"
            :info-data="paramsData"
            @handleAlarm="handleAlarm"
          ></alertInfo>
        </bm-auto-complete>
      </bm-control>
      <!-- 车辆告警基础信息 -->
      <bm-control class="carInfo">
        <bm-auto-complete>
          <carInfo
            class="carInfoInfo"
            ref="carInfoInfo"
            :info-data="carData"
          ></carInfo>
        </bm-auto-complete>
      </bm-control>

      <!-- <bm-control class="dispatch">
        <bm-auto-complete>
          <dispatch></dispatch>
        </bm-auto-complete>
      </bm-control> -->
      <!-- <bm-control class="repairOrder">
        <bm-auto-complete>
          <repairOrder></repairOrder>
        </bm-auto-complete>
      </bm-control>-->
    </baidu-map>
  </div>
</template>

<script>
import searchield from "../components/searchield";
import mapTabs from "../components/mapTabs";
import dispatch from "../components/dispatch";
import selectModel from "../components/selectModel";
import alertInfo from "../components/alertInfo";
import carInfo from "../components/carInfo";
// import repairOrder from "@/components/baiduMap/repairOrder";
export default {
  name: "AlarmMap",
  components: {
    searchield,
    mapTabs,
    dispatch,
    selectModel,
    alertInfo,
    carInfo,
    // repairOrder,
  },
  data() {
    return {
      // 面包屑配置
      breadcrumb: {
        beforeRouterList: [
          {
            name: "生产警告",
            router: {
              path: "",
            },
          },
        ],
        localeRouter: "告警地图",
      },
      //子组件参数
      searchData: [
        {
          type: 1,
          title: "生产监控警报",
          subTitle: "搜索作业区、车辆、作业单元",
          ident: "one",
        },
        {
          type: 2,
          title: "生产监控警报",
          subTitle: "",
          ident: "production",
          isShow: false,
          data: [],
        },
        { type: 3, title: "气井", subTitle: "10", ident: "three" },
        { type: 3, title: "集气站", subTitle: "8", ident: "three" },
        { type: 3, title: "处理站", subTitle: "1", ident: "three" },
        {
          type: 2,
          title: "运输车辆",
          subTitle: "",
          ident: "vehicle",
          isShow: false,
        },
      ],
      //厂区组件参数
      plantArea: [
        {
          plantData: [
            { title: "采气一场", name: "first" },
            { title: "采油二场", name: "one" },
            { title: "风场作业区", name: "twe" },
            { title: "呼图壁储气区", name: "three" },
            { title: "昌吉储运", name: "four" },
            { title: "百口泉采油厂", name: "five" },
            { title: "吉庆油田作业区", name: "six" },
          ],
        },
        {
          addressData: [
            { title: "玛河" },
            { title: "盆5" },
            { title: "克75" },
            { title: "克拉美丽" },
          ],
        },
      ],
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
      center: { lng: 0, lat: 0 },
      zoom: 3,
      keyword: "",
    };
  },
  mounted() {},
  methods: {
    //参数告警基础信息
    alertInfoShow (row) {
      this.$refs.alertInfo.exhibition = true;
      this.$refs.alertInfo.queryList(row);
    },
    //车辆告警基础信息
    carInfoInfoShow (row) {
      this.$refs.carInfoInfo.exhibition = true;
      this.$refs.carInfoInfo.queryList(row);
    },
    //表格定位
    changeAddress(value) {
      this.center.lng = value.lng;
      this.center.lat = value.lat;
    },
    //打开报警处理
    handleAlarm(data){
      this.$refs.searchield.handleAlarm(data);
    },
    //地图参数
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 84.86225;
      this.center.lat = 45.5908;
      this.zoom = 15;
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
  margin-left: 400px;
  z-index: 0 !important;
}
/deep/.anchorTL{
  z-index: 0 !important;
}
.carInfoInfo {
  margin-top: 60px;
  margin-left: 700px;
}
</style>
