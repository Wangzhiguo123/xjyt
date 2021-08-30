<template>
  <div class="productionWarning">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "productionWarningIndex",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.productionWarning {
  height: 100%;
  max-width: 100%;
  
}
</style>
