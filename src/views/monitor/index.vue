<template>
  <div class="monitor">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
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
