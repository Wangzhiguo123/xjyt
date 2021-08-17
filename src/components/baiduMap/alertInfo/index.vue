<!-- 地图自定义组件 报警厂区查看-->
<!-- 参数说明
      plantArea       -------------------------       全部参数
      plantData       -------------------------       厂区名称
      addressData     -------------------------       厂区下位置名称
 -->
<template>
  <div class="mapTabs">
      <ul>
        <li class="activePlantArea">
          基础信息
        </li>
        <li class="activePlantArea">
          监控画面
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      activeTwo: 2, //激活的列表
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.mapTabs {
  width: 440px;
  background: #fff;
    ul {
      display: flex;
      align-items: center;
      justify-content:flex-start;
      width: auto;
      height: 60px;
      font-size: 16px;
      color: #333333;
      text-align: center;
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
      bottom: -18px;
      right: 0;
      left: 5%;
      width: 90%;
      height: 2px;
      background-color: #3377ff;
    }
}
</style>
