<template>
  <div>
    <!-- 搜索输入框 -->
    <div class="select_box" v-if="logs.orderType=='end'||logs.orderType=='dictionary'||logs.orderType=='My'||logs.orderType=='dictionaryDetail'||logs.orderType=='workBench'||logs.orderType=='workBenchDetails'||logs.orderType=='year'">
    发起人&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="originator" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.originator_options"
      :key="item.value"
      :label="item.label"
      :value="item.label">
    </el-option>
  </el-select>

    <span class="demonstration">时间&nbsp;&nbsp;&nbsp;</span>
    <el-date-picker
      class="times"
      v-model="the_time"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

    类别&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="the_type" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.type_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
     等级&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="the_level" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.level_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
     标题&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="the_title" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.title_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <div class="sel_btn">
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
      <el-button @click="openTC">新增</el-button>
    </div>
    </div>

    <!-- 单独的新增按钮 -->
    <div class="sel_btn2" v-if="logs.orderType=='flight'">
      <!-- <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button> -->
      <el-button type="primary" @click="openTC">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="table_list"
      :border="the_border"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <template v-for="(item, index) in table_data">
		    	<el-table-column
          :key="index"
					:prop="item.name"
					:label="item.title"
					:align="item.align || 'center'"
					:show-overflow-tooltip="item.overHidden || true">
					<template slot-scope="scope">
			            <slot
			            	v-if="item.slot"
			            	:name="scope.column.property"
			            	:row="scope.row"
			            	:$index="scope.$index"
						/>
			            <span v-else>{{ scope.row[scope.column.property] }}</span> // 这里的property自己打印出来看看就明白了
					</template>
				</el-table-column>
			</template> -->
      <el-table-column v-if="select" type="selection" width="55">
      </el-table-column>
      <el-table-column
        v-for="item in table_data2"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column v-if="the_action" fixed="right" label="操作" width="140">
        <div slot-scope="adc">
          <!-- 我的工单 -->
          <!-- <el-button
            v-if="logs.edits && logs.orderType=='My'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 3)"
            >编辑</el-button
          > -->
          <el-button
            v-if="logs.edits && logs.orderType=='My'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 3)"
            >审核</el-button
          >
          <el-button
            v-if="logs.solve"
            type="text"
            size="small"
            @click="handleClick(adc.row, 4)"
            >编辑</el-button
          >
          <el-button
            v-if="logs.deletes"
            type="text"
            size="small"
            @click.native.prevent="deleteRow(adc.$index, table_list, 5)"
            >删除</el-button
          >
          <!-- 办结 -->
          <el-button
            v-if="logs.search && logs.orderType=='end'||logs.orderType=='dictionary'||logs.orderType=='workBench'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 1)"
            >查看</el-button
          >
          <el-button
            v-if="logs.submits && logs.orderType=='end'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 2)"
            >评价</el-button
          >
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="every_page"
        layout="prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 用于新增 -->
  <el-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false">
  <div v-if="logs.orderType=='dictionary'">
  <div class="drawer_input">
  <div>Code:</div>
  <el-input
  v-model="add.code"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  
  <div class="drawer_input">
  <div>Name:</div>
  <el-input
  v-model="add.name"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>ParentId:</div>
  <el-input
  v-model="add.parentId "
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>TypeId:</div>
  <el-input
   v-model="add.typeId"
  placeholder="请输入内容"
  :disabled="edits"
  clearable>
  </el-input>
  </div>
</div>
<div v-if="logs.orderType=='dictionaryDetail'">
  <div class="drawer_input">
  <div>Value:</div>
  <el-input
  v-model="detail.value"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>Code:</div>
  <el-input
  v-model="detail.code"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
</div>
<div v-if="logs.orderType=='workBench'">
  <div class="drawer_input">
  <div>Name:</div>
  <el-input
  v-model="work.name"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>parentId:</div>
  <el-input
  v-model="work.parentId"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>statusId:</div>
  <el-input
  v-model="work.statusId"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
</div>
<div v-if="logs.orderType=='workBenchDetails'">
  <div class="drawer_input">
  <div>Name:</div>
  <el-input
  v-model="workdetails.name"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>statusId:</div>
  <el-input
  v-model="workdetails.statusId"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>iconPath:</div>
  <el-input
  v-model="workdetails.iconPath"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
</div>
<div v-if="logs.orderType=='year'">
  <div class="drawer_input">
  <div>samplingFile:</div>
  <el-input
  v-model="addData.samplingFile "
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>samplingFileDetails:</div>
  <el-input
  v-model="addData.samplingFileDetails"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>samplingTitle:</div>
  <el-input
  v-model="addData.samplingTitle"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
  <div class="drawer_input">
  <div>samplingYear:</div>
  <el-input
  v-model="addData.samplingYear"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
</div>

<div v-if="logs.orderType=='flight'">
  <div class="drawer_input" v-for="(item,index) in logs.select" :key="index">
  <div style="width:50%">{{item.title}}:</div>
  <el-input
  v-model="logs.newdata[item.title]"
  placeholder="请输入内容"
  clearable>
  </el-input>
  </div>
</div>

   <el-button type="primary" style="margin:30px" @click="add_submit">提交</el-button>
</el-drawer>
  </div>
</template>
<script>
export default {
  props: {
    logs: Object,
    table_data: [Array, String, Number, Object],
    table_data2: [Array, String, Number, Object],
    table_list: [Array, String, Number, Object],
    table_title: [Array, Object],
  },
  data() {
    return {
      add:{
      parentId:'',
      typeId:'',
      name:'',
      code:'',
      },
      detail:{
      value:'',
      code:'',
      typeId:this.$route.query.typeId
      },
      work:{
      name:'',
      parentId:'',
      statusId:''
      },
      workdetails:{
        docId:'',
        name:'',
        statusId:'',
        iconPath:''
      },
      addData:{
        samplingFile:'',
        samplingFileDetails:'',
        samplingId:'',
        
      },
      edits:false,//编辑？
      drawer:false,
      originator:'',//发起人
      the_time:'',
      the_title:'',
      the_type:'',
      the_level:'',
      select: true, //多选
      the_action: true, //操作
      datas: 5,
      currentPage: 1,
      total: 0,
      every_page: 0,
      pageData: [],
      tableData: [],
      the_border: false,
      loading:true,
      theTypeid:''
    };
  },
  watch:{
    'table_list':function(news,old){
      // console.log('发生改变',news)
      this.getData(news)
    }
    // 'logs':function(news,olds){
    //   console.log(news)
    // }
  },
  created() {
    // console.log(this.table_data)
    // console.log(this.logs);
    console.log(this.logs.newdata)
    this.tableData = this.table_data;
    this.total = this.logs.total ? this.logs.total : 0;
    this.every_page = this.logs.every_page ? this.logs.every_page : 10;
  },
  methods: {
    //打开新增弹窗
    openTC(){
      this.edits=false
      this.add={
      parentId:'',
      typeId:'',
      name:'',
      code:'',
      }
      this.workdetails={
        // docId:'',
        name:'',
        statusId:'',
        iconPath:''
      }
      for(let value in this.logs.newdata){
        delete this.logs.newdata[value]
      }
      console.log(this.logs.newdata)
      this.drawer = true
      // this.add
    },
    // 新增/编辑
    add_submit(){
      console.log(this.logs.newdata)
      if(!this.edits){
      if(this.logs.orderType=='dictionary'){
        this.$emit("actions",'dictionary_add', this.add);
      }else if(this.logs.orderType=='workBench'){
        this.$emit("actions",'dictionary_add', this.work);
      }else if(this.logs.orderType=='workBenchDetails'){
        // console.log(this.$route.query.typeId)
        this.workdetails.typeId= this.$route.query.typeId
        // console.log(this.workdetails)
        this.$emit("actions",'dictionary_add', this.workdetails);
      }else if(this.logs.orderType=='year'){
        this.$emit("actions",'dictionary_add', this.addData);
      }else{
        this.$emit("actions",'dictionary_add', this.detail);
      }
      }
      if(this.edits){
        if(this.logs.orderType=='dictionary'){
          this.$emit("actions",'dictionary_edit', this.add);
        }else if(this.logs.orderType=='workBench'){
          this.work.typeId= this.theTypeid
          this.$emit("actions",'dictionary_edit', this.work);
        }else if(this.logs.orderType=='workBenchDetails'){
          this.workdetails.typeId= this.theTypeid
          this.$emit("actions",'dictionary_edit', this.workdetails);
        }else if(this.logs.orderType=='year'){
        this.$emit("actions",'dictionary_edit', this.addData);
        }else{
          this.$emit("actions",'dictionary_edit', this.detail);
        }
      }
    },
    the_actions(data,rows,index){
      if(data=='add'){
        this.drawer=false
      }else if(data=='del'){
        console.log(rows)
        rows.splice(index, 1);
      }
      // console.log('ok',data)
    },
    getData(data){
      this.table_list=data
      this.loading=false
    },
    // 删除
    deleteRow(index, rows, actions) {
      // console.log(index,rows)
      this.$emit("actions",'dictionary_del', rows,index)
      // rows.splice(index, 1);
    },
    //   查看/评价/提交/修改
    handleClick(row, actions) {
      console.log(row)
      this.theTypeid= row.typeId
      // console.log(row,actions);
      if(actions==3){
        // this.$router.push({path:'/work_order',query: {type:'tcd'}})
      }else if(actions==1){//查看
      if(this.logs.orderType=='dictionary'){
        this.$router.push({path:'transferredOrder/details',query: row})
      }else if(this.logs.orderType=='workBench'){
        this.$router.push({path:'/workbenchDetails',query: row})
      }
      }else if(actions==4){
        console.log('编辑')
        this.edits=true
        this.drawer=true
        console.log(row,actions)
       this.add.parentId=row.parentId
       this.add.typeId=row.typeId
       this.add.name=row.name
       this.add.code=row.code
       if(this.logs.orderType=='dictionaryDetail'){
          this.detail.dictionaryId=row.dictionaryId
           this.detail.value=row.value
           this.detail.code=row.code
      }else if(this.logs.orderType=='workBench'){
         this.work.name=row.name
         this.work.parentId=row.parentId
         this.work.statusId=row.statusId
         this.work.typeName=row.typeName
      }else if(this.logs.orderType=='workBenchDetails'){
         this.workdetails.docId=row.docId
         this.workdetails.name=row.name
         this.workdetails.statusId=row.statusId
         this.workdetails.iconPath=row.iconPath
      }else if(this.logs.orderType=='year'){
         this.addData.samplingFile=row.samplingFile
         this.addData.samplingFileDetails =row.samplingFileDetails
         this.addData.samplingId=row.samplingId
         this.addData.samplingTitle=row.samplingTitle
         this.addData.samplingYear=row.samplingYear
      }
        }
    },
    // 多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      // 每页xx条
      this.$emit("every_page", `${val}`);
      this.every_page = `${val}`;
    },
    handleCurrentChange(val) {
      // 当前页
      this.$emit("the_page", `${val}`, this.every_page);
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
.select_box{
  margin: 20px;
}
.sel_btn{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.sel_btn2{
    margin-top: 20px;
    margin-left: 20px;
}
.times{
  width: 200px;
}
.selects{
  width: 120px;
  margin-right: 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  margin-top: 10px;
}
.drawer_input{
  display: flex;
  margin: 20px 10px;
  align-items: center;
}
.drawer_input>div:nth-child(1){
  width: 80px
}
</style>
