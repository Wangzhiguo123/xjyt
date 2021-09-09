<!---告警地图-下拉框---->
<template>
  <div class="selectModel">
    <el-select
      v-model="value"
      filterable
      placeholder="请选择"
      style="width: 160px"
      class="selectInput"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "采气一场",
        },
        {
          value: "选项2",
          label: "百口泉采气厂",
        },
        {
          value: "选项3",
          label: "采气二场",
        }
      ],
      value: "",
    };
  },
};
</script>

<style lang="less" scoped>
.selectModel{
  position:fixed;
  top: 10%;
  right: 20%;
  z-index: 9999;
}
</style>