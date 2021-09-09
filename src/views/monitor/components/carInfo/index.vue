<!-- 地图自定义组件 基础信息与监控画面-->
<!-- 参数说明
      alertInfo       -------------------------       基础信息
 -->
<template>
  <div class="mapTabs" v-show="exhibition">
    <header class="title">
      <div class="text">
        <img :src="imgUrl" alt="" />
        <span class="oneClass">采气一厂</span>/
        <span class="tweClass">新疆克拉玛依市百口泉</span>
      </div>
      <div class="font" @click="hide">
        <i class="el-icon-close"></i>
      </div>
    </header>
    <ul class="head">
      <li :class="active === 1 ? 'activePlantArea' : ''" @click="changeInfo(1)">
        基础信息
      </li>
      <li :class="active === 2 ? 'activePlantArea' : ''" @click="changeInfo(2)">
        派单信息
      </li>
    </ul>
    <ul class="info" v-show="active === 1">
      <li v-for="(item, index) in infoData" :key="index">
        <p>[{{ item.title }}]</p>
        <span>{{ item.value }}</span>
      </li>
    </ul>
    <div v-show="active === 2 && cameraData.length < 1" class="info">
      <div class="errorContent">
        <p><i class="el-icon-circle-close ico" />未关联摄像头</p>
        <p>请及时关联摄像头信息</p>
      </div>
    </div>
    <div v-show="active === 2 && cameraData.length > 0" class="videoContent">
      <video
        class="video"
        controls
        v-for="(sub, index) in cameraData"
        :key="index"
      >
        <source :src="sub.connectionAddress" type="video/mp4" />
      </video>
    </div>
    <!-- 关联摄像头 -->
    <camera ref="camera"></camera>
  </div>
</template>

<script>
import { camerasPage } from "@/api/modules/productionMonitoring";
import camera from "../camera";
export default {
  components: {
    camera,
    // handleModal,
  },
  props: {
    infoData: {
      type: Array,
      default() {
        return [];
      },
    },
    infoDataTit: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      active: 1, //激活的列表
      exhibition: false, //是否展示
      cameraData: [], //列表数据
      imgUrl: require("@/assets/images/address.png"),
      searchList: {}, //列表的数据
    };
  },
  mounted() {},
  methods: {
    //隐藏
    hide() {
      this.exhibition = false;
    },
    //切换激活
    changeInfo(num) {
      this.active = num;
    },
    //告警处理
    handleModal() {
      this.$parent.handleAlarm(this.searchList);
    },
    //关联摄像头
    relation() {
      this.$refs.camera.show(this.cameraData);
    },
    //点击待处理
    handle() {
      // this.$refs.handleModal.show(data);
    },
    //参数告警基础信息查询
    async queryList(params) {
      this.searchList = params;
      let res = await camerasPage(params);
      this.infoData.forEach((item) => {
        for (const key in res.data) {
          if (key === item.name) {
            item.value = res.data[key];
          }
        }
      });
      this.cameraData = res.data.cameras || [];
    },
  },
};
</script>

<style lang="less" scoped>
.mapTabs {
  height: 512px;
  width: 555px;
  background: #fff;
  .title {
    padding: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
    .font {
      font-size: 20px;
    }
    .text {
      transform: translateY(-4px);
      img {
        transform: translateY(6px);
      }
    }
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    font-size: 16px;
    color: #333333;
    text-align: center;
    margin-left: 10px;
    li {
      width: 140px;
      text-align: left;
    }
  }
  .activePlantArea {
    color: #3377ff;
    position: relative;
  }
  .activePlantArea::before {
    content: ""; // 必须
    position: absolute;
    bottom: -21px;
    right: 0;
    width: 60%;
    left: -6%;
    height: 2px;
    background-color: #3377ff;
  }
  .info {
    border-top: 1px solid #ccc;
    height: 320px;
    li {
      display: flex;
      justify-content: flex-start;
      padding-top: 16px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      p {
        margin-right: 81px;
        margin-left: 34px;
      }
    }
  }
  .errorContent {
    margin-top: 10%;
    margin-left: 10%;
    width: 395px;
    height: 71px;
    opacity: 1;
    background: #fff1f0;
    border: 1px solid #ffccc7;
    border-radius: 2px;
    font-size: 16px;
    padding: 10px 16px;
    :first-child {
      margin-top: 10px;
      margin-left: 25%;
      .ico {
        color: #ff4d4f;
        font-size: 18px;
      }
    }
    :last-child {
      color: rgba(0, 0, 0, 0.65);
      margin: 7px auto;
      text-align: center;
    }
  }
  .relation {
    margin-top: 20px;
    margin-right: 12px;
    text-align: right;
    // position: absolute;
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
