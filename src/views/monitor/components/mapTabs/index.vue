<!-- 地图自定义组件 报警厂区查看-->
<!-- 参数说明
      plantArea       -------------------------       全部参数
      plantData       -------------------------       厂区名称
      addressData     -------------------------       厂区下位置名称
 -->
<template>
  <div class="mapTabs">
    <div class="tabsCrad">
      <ul>
        <li
          v-for="(item, index) in plantArea[0].plantData"
          :key="index"
          :class="[activeTwo === index ? 'activePlantArea' : '']"
        >
          {{ item.title }}
          <div v-show="activeTwo === index" class="content">
            <p class="triangle"></p>
            <ul class="ulList">
              <li
                v-for="(item, index) in plantArea[1].addressData"
                :key="index"
                @click="selectLi"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plantArea: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeName: "first",
      active: 0, //激活的列表
      activeTwo: 0, //激活的列表
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //选择的li
    selectLi() {
      this.active = 2;
    },
  },
};
</script>

<style lang="less" scoped>
.mapTabs {
  .tabsCrad {
    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: auto;
      height: 60px;
      background: #fff;
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
  .content {
    position: absolute;
    margin: 20px 0px 0 -100px;
    .triangle {
      width: 0;
      height: 0;
      margin-left: 146px;
      margin-top: 5px;
      margin-bottom: -5px;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 30px solid #fff;
    }
    .ulList {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 336px;
      font-size: 18px;
      height: 60px;
      color: #333333;
      background: #fff;
      .activeLi {
        color: #3377ff;
      }
    }
  }
}
</style>
