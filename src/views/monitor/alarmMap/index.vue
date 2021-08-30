<!-- 地图告警 -->
<template>
  <div class="alarmMap">
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
      <bm-control class="tabs">
        <mapTabs :plant-area="plantArea"></mapTabs>
      </bm-control>
      <bm-control :offset="{ width: '100px', height: '10px' }">
        <bm-auto-complete v-model="keyword" :sug-style="{ zIndex: 1 }">
          <searchield
            :search-data="searchData"
            @isShow="showChange"
            @changePosition="changeAddress"
            @seeInfo="proQueryByAlertIds"
          ></searchield>
        </bm-auto-complete>
      </bm-control>
      <bm-control class="alertInfo">
        <bm-auto-complete>
          <alertInfo :info-data="infoData" :infoDataTit="infoDataTit"></alertInfo>
        </bm-auto-complete>
      </bm-control>
      <bm-control class="dispatch">
        <bm-auto-complete>
          <dispatch></dispatch>
        </bm-auto-complete>
      </bm-control>
      <!-- <bm-control class="repairOrder">
        <bm-auto-complete>
          <repairOrder></repairOrder>
        </bm-auto-complete>
      </bm-control>-->
    </baidu-map> 
  </div>
</template>

<script>
import api from "@/api/apiList";
import searchield from "@/components/baiduMap/searchield";
import mapTabs from "@/components/baiduMap/mapTabs";
import alertInfo from "@/components/baiduMap/alertInfo";
import dispatch from "@/components/baiduMap/dispatch";
// import repairOrder from "@/components/baiduMap/repairOrder";

export default {
  name: "AlarmMap",
  components: {
    searchield,
    mapTabs,
    alertInfo,
    dispatch,
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
          data:[]
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
      //报警基础信息
      // infoData: [
      //   { title: "[处理状态]", text: "待处理/处理中/已处理" },
      //   { title: "[位置信息]", text: "新疆克拉玛依市百口泉" },
      //   { title: "[告警区块]", text: "采气一厂" },
      //   { title: "[关联对象]", text: "井DXHW179" },
      //   { title: "[报警类型]", text: "参数报警/其他报警" },
      //   { title: "[报警分类]", text: "高高报/高报/低报/低低报" },
      //   { title: "[报警等级]", text: "普通/严重/特别严重" },
      //   { title: "[参数名称]", text: "二级节流后温度" },
      //   { title: "[实际/参考值]", text: "60°/30°" },
      //   { title: "[报警时间]", text: "2021-07-06 18:28:31" },
      //   { title: "[解决方案]", text: "二级节流文档过高处理方案" },
      // ],
      infoData: [
        { title: "[处理状态]" },
        { title: "[位置信息]" },
        { title: "[告警区块]"},
        { title: "[关联对象]"},
        { title: "[报警类型]"},
        { title: "[报警分类]"},
        { title: "[报警等级]"},
        { title: "[参数名称]"},
        { title: "[实际/参考值]"},
        { title: "[报警时间]"},
        { title: "[解决方案]"},
      ],
      infoDataTit:[
        {text: "待处理/处理中/已处理" },
        {text: "新疆克拉玛依市百口泉" },
        {text: "采气一厂" },
        {text: "井DXHW179" },
        {text: "参数报警/其他报警" },
        {text: "高高报/高报/低报/低低报" },
        {text: "普通/严重/特别严重" },
        {text: "二级节流后温度" },
        {text: "60°/30°" },
        {text: "2021-07-06 18:28:31" },
        {text: "二级节流文档过高处理方案" },
      ],
      center: { lng: 0, lat: 0 },
      zoom: 3,
      keyword: "",
    };
  },
  mounted() {
    this.getFilmList();
  },
  methods: {
    //表格显示隐藏
    showChange(value) {
      this.searchData.forEach((item) => {
        if (item.ident === value) {
          item.isShow = !item.isShow;
        }
      });
      console.log("this.searchData", this.searchData);
    },
    //表格定位
    changeAddress(lng, lat) {
      console.log(lng, lat);
      this.center.lng = lng;
      this.center.lat = lat;
    },
    //获取生产监控表格数据
    async getFilmList() {
      console.log('this.searchData[1]',this.searchData[1]);

      let res = await this.$http.get(api.proMonitorAlertInfos);
      this.searchData[1].data = res;
      console.log("res", res);
    },
    //查询警报详情
    async proQueryByAlertIds(data) {
      console.log('proQueryByAlertIds',data)
      let res = await this.$http.get(api.proQueryByAlertIds);
      // this.infoData = res;
      this.infoDataTit = res;
    },
    //地图参数
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 84.86225;
      this.center.lat = 45.5908;
      this.zoom = 15;
    },
    //切换激活
    handleClick(tab, event) {
      console.log(tab, event);
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
.alertInfo {
  margin-left: 640px;
  margin-top: 140px;
}
/deep/ .el-tabs__header {
  margin-bottom: 0;
}
.anchorTL {
  width: 100px;
}
</style>
