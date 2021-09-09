<template>
  <div class="home">
    <div class="the_tile">班组管理</div>
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
import { processTransactionPage,Create,Deletes,Updates,Workers } from "@/api/modules/flight/team";
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
          orderType:'flight',//字典类别
          total:0,
          every_page:1,
          the_page:1,
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
          select:[
          {title:'name',type:'input'},
          {title:'users',type:'box',
          users:[
           { 
           userId:'',
           userName:'',
           }
          ]},
          ],
          newdata:{
          name:'',
          teamId:'',
          users:[
           { 
           userId:8,
           userName:'',
           }
          ]
          },
          table_list:[
          {prop: "xh_id", label: "序号"},
          {prop: "name", label: "班组名称"},
          {prop: "users", label: "班组成员"},
          {prop: "rule", label: "轮班规则"},
          ],
          tableData3:[]
        }
      };
    },
  methods: {
    // 新增/删除/修改
    async d_action(type,newdata,index){
      // console.log(type,newdata)
      // return
      if(type=='dictionary_add'){
        let datas = await Create(newdata)
        // console.log(datas)
        if(datas){
          this.$refs.Pages.the_actions('add')
          this.Tabular()
        }
      }if(type=='dictionary_del'){
        let thisData = newdata[index].teamId
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
          this.$refs.Pages.the_actions('add')
          this.Tabular()
          // this.$refs.Pages.the_actions('del',newdata,index)
        }catch(err){
          console.log("err", err);
        }
      }
    },
    every_page(data){
      // console.log(data)
    },
    the_page(data,data2){
      console.log('当前页：'+data)
      console.log('每页显示条数：'+data2)
      this.Tabular(data)
    },
    async Tabular(gets) {
      let data ={
      // typeId:'',
      // name:'',
      // parentId:'',
      // statusId:'',
      page:0,
      size:10
    };
    if(gets){
      data.page=gets-1
    }
    try{
    let thisData = await processTransactionPage(data)
    // console.log(thisData.data.content)
    // let workers = await Workers()
    // console.log(workers)
    // console.log(thisData)
    thisData.data.content.forEach((v,index) => {
      v['xh_id']=index+1
    })
    this.data.tableData3=thisData.data.content
    this.data.total=thisData.data.totalPages
    this.data.every_page=thisData.data.size
    // this.data.the_page=thisData.data.number+1
    // console.log(this.data.the_page)
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
