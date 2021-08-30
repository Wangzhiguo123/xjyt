<template>
  <div class="home">
    <div class="the_tile">字典管理</div>
    <!-- 表格 -->
    <Pages 
    ref="Pages"
    :logs=data
    :table_data=data.tableData
    :table_title=data.table_title
    :table_data2=data.table_list
    :table_list=data.tableData3
    @every_page="every_page"
    @the_page="the_page"
    @actions="d_action"
    />
  </div>
</template>

<script>
import Pages from "@/components/tables/paging.vue"
import { processTransactionPage,Create,Deletes,Updates } from "@/api/modules/dictionary";
export default {
  name: "Home",
  components: {
    Pages,
  },
  mounted() {
    // this.Tabular();
  },
    data() {
      return {
        originator:'',//发起人
        the_time:'',
        the_title:'',
        the_type:'',
        the_level:'',
        data:{
          orderType:'dictionary',//字典类别
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
          {prop: "parentId", label: "parentId"},
          {prop: "code", label: "code"},
          {prop: "typeId", label: "typeId"},
          {prop: "name", label: "name"},
          { prop: "createdBy", label: "createdBy"},
          ],
          tableData3:[]
        }
      };
    },
  methods: {
    // 新增/删除/修改
    async d_action(type,newdata,index){
      if(type=='dictionary_add'){
        let datas = await Create(newdata)
        console.log(datas)
        if(datas){
          this.$refs.Pages.the_actions('add')
          this.Tabular()
        }
      }if(type=='dictionary_del'){
        let thisData = newdata[index].typeId
        try{
          await Deletes(thisData)
          // this.Tabular()
          this.$refs.Pages.the_actions('del',newdata,index)
        }catch(err){
          console.log("err", err);
        }
      }if(type=='dictionary_edit'){
        try{
          await Updates(newdata)
          this.Tabular()
          // this.$refs.Pages.the_actions('del',newdata,index)
        }catch(err){
          console.log("err", err);
        }
      }
    },
    every_page(data){
      console.log(data)
    },
    the_page(data,data2){
      console.log('当前页：'+data)
      console.log('每页显示条数：'+data2)
    },
    async Tabular() {
      let data ={
      processId:'',
      statusId:'',
      page:'0',
      sieze:'1'
    }
    try{
    let thisData = await processTransactionPage(data)
    // console.log(thisData.data.content)
    thisData.data.content.forEach((v,index) => {
      v['xh_id']=index+1
    })
    this.data.tableData3=thisData.data.content
    this.data.total=thisData.data.totalPages
    this.data.every_page=thisData.data.size
    }catch(err){
      console.log(err)
    }
    },
  },
  created(){
   this.Tabular()
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
