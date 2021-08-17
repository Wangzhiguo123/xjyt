<template>
  <div class="home">
    首页
    <Pages
      :logs="data"
      :table_data="data.tableData"
      :table_title="data.table_title"
      :table_data2="data.table_list"
      :table_list="data.tableData3"
      @every_page="every_page"
      @the_page="the_page"
    />
  </div>
</template>

<script>
import Pages from "@/components/paging.vue";
export default {
  name: "Home",
  components: {
    Pages,
  },
  data() {
    return {
      data: {
        total: 30,
        every_page: 10,
        search: true,
        edits: true,
        submits: true,
        solve: true,
        deletes: true,
        table_list: [
          { prop: "id", label: "id" },
          { prop: "userName", label: "name" },
          { prop: "Date", label: "date" },
        ],
        tableData3: [
          { id: "1", userName: "张三", Date: "2021-10-8" },
          { id: "2", userName: "李四", Date: "2021-10-10" },
          { id: "3", userName: "王五", Date: "2021-10-7" },
          { id: "4", userName: "赵六", Date: "2021-10-3" },
        ],
      },
    };
  },
  mounted() {
    this.getFilmList();
  },
  methods: {
    every_page(data) {
      console.log(data);
    },
    the_page(data, data2) {
      console.log("当前页：" + data);
      console.log("每页显示条数：" + data2);
    },
    async getFilmList() {
      // console.log("this.$http.get", this.$http.get);
      const url = "/film/getList";
      const abc = "/film/getList";
      const res = await this.$http.get(url, { abc });
      console.log(res, 333333333);
    },
  },
};
</script>
