<template>
  <div class="home">
    <breadCrumbHead
      :before-router-list="breadcrumb.beforeRouterList"
      :locale-router="breadcrumb.localeRouter"
    ></breadCrumbHead>
    22222222222222
    <!-- <delModal ref="delModal">
      22222222
      <div class="remove-group">
        <div class="red-bale" style="padding: 0 20px">
          确认删除该吗?删除后无法查看该调价单数据
        </div>
      </div>
    </delModal> -->
  </div>
</template>

<script>
import breadCrumbHead from "@/components/breadCrumbHead";
// import delModal from "@/components/delModal/index";
export default {
  name: "Home",
  components: {
    breadCrumbHead,
    // delModal,
  },
  data() {
    return {
      // 面包屑配置
      breadcrumb: {
        beforeRouterList: [
          {
            name: "车辆管理",
            router: {
              path: "",
            },
          },
        ],
        localeRouter: "司机维护",
      },
    };
  },
  mounted() {
    this.getFilmList();
    // this.$refs.delModal.show({
    //   title: "测试删除",
    //   confirmCallback: () => {},
    // });
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
