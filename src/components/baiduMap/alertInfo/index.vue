<!-- 地图自定义组件 基础信息与监控画面-->
<!-- 参数说明
      alertInfo       -------------------------       基础信息
 -->
<template>
  <div class="mapTabs" v-show='infoDataTit.alertTime'>
    <ul class="head">
      <li :class="active === 1 ? 'activePlantArea' : ''" @click="changeInfo(1)">
        基础信息
      </li>
      <li :class="active === 2 ? 'activePlantArea' : ''" @click="changeInfo(2)">
        监控画面
      </li>
    </ul>
    <ul class="info">
        <!-- <p  v-for="(item, index) in infoData" :key="index">{{ item.title }}</p>
        <span v-for="(item, index) in infoDataTit" :key="index">{{ item.text }}</span> -->
      <li>
        <p>[位置信息]</p>
        <span>{{infoDataTit.location}}</span>
      </li>
      <li>
        <p>[告警区块]</p>
        <span>{{infoDataTit.alertBlock}}</span>
      </li>
      <li>
        <p>[关联对象]</p>
        <span>{{infoDataTit.linkObject}}</span>
      </li>
      <li>
        <p>[报警类型]</p>
        <span>{{infoDataTit.alertType}}</span>
      </li>
      <li>
        <p>[报警等级]</p>
        <span>{{infoDataTit.alertLevel}}</span>
      </li>
      <li>
        <p>[报警时间]</p>
        <span>{{infoDataTit.alertTime}}</span>
      </li>
      <li>
        <p>[处理状态]</p>
        <span>{{infoDataTit.alertType }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
      active: 2, //激活的列表
    };
  },
  mounted() {},
  methods: {
    changeInfo(num) {
      this.active = num;
    },
  },
};
</script>

<style lang="less" scoped>
.mapTabs {
  width: 440px;
  background: #fff;
  .head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    font-size: 16px;
    color: #333333;
    text-align: center;
    background: #f7f9fc;
    li {
      width: 140px;
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
    width: 100%;
    height: 2px;
    background-color: #3377ff;
  }
  .info {
    li {
      display: flex;
      justify-content: flex-start;
      padding: 10px 0;
      p {
        margin-right: 81px;
        margin-left: 34px;
      }
      span {
        // color: red;
      }
    }
  }
}
</style>
