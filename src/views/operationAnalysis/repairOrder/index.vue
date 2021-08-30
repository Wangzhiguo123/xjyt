<template>
  <div class="home">
    <div class="the_tile">工单管理</div>
    <!-- 表格 -->
    <Pages :logs=data
    :table_data=data.tableData
    :table_title=data.table_title
    :table_data2=data.table_list
    :table_list=data.tableData3
    @every_page="every_page"
    @the_page="the_page"
    />
  </div>
</template>

<script>
import Pages from "@/components/tables/paging.vue"
export default {
  name: "Home",
  components: {
    Pages,
  },
  mounted() {
    this.getFilmList();
  },
    data() {
      return {
        options: [{
        value: '选项1',
        label: '普通'
        }, {
          value: '选项2',
          label: '其他'
        }],
        originator:'',//发起人
        the_time:'',
        the_title:'',
        the_type:'',
        the_level:'',
        data:{
          orderType:'repair',//工单类别
          'total':30,
          'every_page':10,
          search:true,
          edits:true,
          submits:true,
          solve:true,
          deletes:true,
           originator_options: [{//发起人
          value: '选项1',
          label: '普通'
          }, {
          value: '选项2',
          label: '管理员'
          }],
          type_options: [{//类别
          value: '选项1',
          label: '普通'
          }, {
          value: '选项2',
          label: '其他'
          }],
          level_options: [{//等级
          value: '选项1',
          label: '普通'
          }, {
          value: '选项2',
          label: '高级'
          }],
          title_options: [{//标题
          value: '选项1',
          label: '标题1'
          }, {
          value: '选项2',
          label: '标题2'
          }],
          table_list:[
          {prop: "id", label: "序号"},
          {prop: "number", label: "编号"},
          {prop: "title", label: "标题"},
          {prop: "types", label: "工单类型"},
          {prop: "level", label: "工单等级"},
          {prop: "originator", label: "发起人"},
          {prop: "crateTime", label: "创建时间"},
          { prop: "status", label: "状态"},
          ],
          tableData3:[
          {id: "1",number:"XJ271822",title:"工单标题",types:"维修单",level:"非常重要",originator:"治国",crateTime:"2021-10-1",status:"1"},
          {id: "1",number:"XJ271822",title:"工单标题",types:"维修单",level:"非常重要",originator:"治国",crateTime:"2021-10-1",status:"1"},
          {id: "1",number:"XJ271822",title:"工单标题",types:"维修单",level:"非常重要",originator:"治国",crateTime:"2021-10-1",status:"1"},
          {id: "1",number:"XJ271822",title:"工单标题",types:"维修单",level:"非常重要",originator:"治国",crateTime:"2021-10-1",status:"1"}
          ],
        }
      };
    },
  methods: {
    every_page(data){
      console.log(data)
    },
    the_page(data,data2){
      console.log('当前页：'+data)
      console.log('每页显示条数：'+data2)
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
<style scoped>
.the_tile{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
}
</style>
