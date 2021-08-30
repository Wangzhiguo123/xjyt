<template>
  <div class="home">
    <div class="the_tile">我的工单</div>
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
import { processTransactionPage } from "@/api/modules/Myaffairs";
export default {
  name: "Home",
  components: {
    Pages,
  },
  mounted() {
    this.Tabular();
  },
    data() {
      return {
        originator:'',//发起人
        the_time:'',
        the_title:'',
        the_type:'',
        the_level:'',
        data:{
          orderType:'My',//工单类别
          total:'',
          every_page:'',
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
          {prop: "xh_id", label: "序号"},
          {prop: "processId", label: "事务Id"},
          {prop: "processCode", label: "事务编码"},
          {prop: "processTitle", label: "事务标题"},
          {prop: "processType", label: "事务类型"},
          {prop: "processRank", label: "事务等级"},
          { prop: "statusId", label: "状态"},
          ],
          tableData3:[]
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
    async Tabular() {

    },
  },
 async created(){
    let data ={
      processId:'',
      statusId:'',
      page:'0',
      sieze:'1'
    }
    try{
    let thisData = await processTransactionPage(data)
    console.log(thisData)
    thisData.data.content.forEach((v,index) => {
      v['xh_id']=index+1
    })
    this.data.tableData3=thisData.data.content
    this.data.total=thisData.data.totalPages
    this.data.every_page=thisData.data.size
    }catch(error){
      console.log("err",error)
    }
  }
};
</script>
<style scoped>
.the_tile{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
}
</style>
