<!-- 告警统计 -->
<template>
  <div>
    <div>告警统计</div>
  </div>
</template>

<script>
export default {
  name: "AlarmStatistics",
  components: {
  },
  data() {
    return {
      breadcrumb: {
        beforeRouterList: [
          {
            name: "生产监控",
            router: {
              path: "",
            },
          },
        ],
        localeRouter: "告警统计",
      },
    };
  },
};
</script>

<style lang="less" scoped>
</style>