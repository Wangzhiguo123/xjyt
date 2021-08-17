<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // // 面包屑配置
      // breadcrumb: {
      //   beforeRouterList: [
      //     {
      //       name: "车辆管理",
      //       router: {
      //         path: "",
      //       },
      //     },
      //   ],
      //   localeRouter: "司机维护",
      // },
    };
  },
  mounted() {
    this.getFilmList();
  },
  methods: {
    async getFilmList() {
      console.log("this.$http.get", this.$http.get);
      const url = "/film/getList";
      const abc = "/film/getList";
      const res = await this.$http.get(url, { abc });
      console.log(res, "Ceshi");
    },
  },
};
</script>
