<template>
  <div class="alarmMap">
    <breadCrumbHead
      :before-router-list="breadcrumb.beforeRouterList"
      :locale-router="breadcrumb.localeRouter"
    ></breadCrumbHead>
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
          ></searchield>
        </bm-auto-complete>
      </bm-control>
      <bm-control class="alertInfo">
        <bm-auto-complete>
          <alertInfo></alertInfo>
        </bm-auto-complete>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
import api from "@/api/apiList";
import breadCrumbHead from "@/components/breadCrumbHead";
import searchield from "@/components/baiduMap/searchield";
import mapTabs from "@/components/baiduMap/mapTabs";
import alertInfo from "@/components/baiduMap/alertInfo";

export default {
  name: "AlarmMap",
  components: {
    breadCrumbHead,
    searchield,
    mapTabs,
    alertInfo,
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
        },
        {
          type: 2,
          title: "监控单元",
          subTitle: "19",
          ident: "monitoring",
          isShow: false,
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
    async getFilmList() {
       let res = await this.$http.post(api.create);
       console.log('res',res)
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
.alertInfo{
 margin-left: 560px;
 margin-top: 140px;
}
/deep/ .el-tabs__header {
  margin-bottom: 0;
}
.anchorTL {
  width: 100px;
}
</style>
