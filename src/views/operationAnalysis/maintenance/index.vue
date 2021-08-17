<template>
<!-- 我的工单-维修单详情 -->
  <div>
    <div class="the_tile">维修单</div>
    <div class="input_box">
    <div class="titles">*标题</div>
    <el-input v-model="the_tile" placeholder="" style="width:60%;margin-right:20px"></el-input>
    <el-select v-model="types" clearable style="width:120px" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.label">
    </el-option>
  </el-select>
      </div>
    <div class="input_box">
    <div class="titles">*派往单位</div>
    <el-select v-model="company" clearable style="width:180px" placeholder="选择派往单位">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.label">
    </el-option>
  </el-select>
      </div>
    <div class="input_box">
    <div class="titles">*开始时间</div>
    <div class="the_time">
    <div>
    <el-date-picker
      style="width: 180px;"
      v-model="start_time"
      value-format="yyyy-MM-dd"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
    <div class="end_time_box">
    <div class="titles">结束时间</div>
    <div>
    <el-date-picker
    style="width: 180px;"
      v-model="end_time"
      align="right"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
  </div>
    </div>
    </div>
      </div>
      <div class="input_box">
        <div class="titles">*施工单位</div><el-input style="width:180px" v-model="constructions" placeholder="请输入内容"></el-input>
      </div>
      <div class="input_box">
        <div class="titles">*施工地点</div><el-input style="width:180px" v-model="place"></el-input>
      </div>
      <div class="input_box">
        <div class="titles">*工作安排</div>
        <el-input
        type="textarea"
        :rows="2"
        style="width:60%;"
        placeholder="未输入"
        v-model="plan">
        </el-input>
      </div>

      <!-- 提交数据 -->
      <div class="input_box">
      <div class="titles"></div>
      <el-button>取消</el-button>
      <el-button @click="submits(1)">保存草稿</el-button>
      <el-button type="primary" @click="submits(2)">提交审核</el-button>
      </div>
      
  </div>
</template>

<script>
import api from "@/api/apiList";
export default {
data() {
    return {
      input: '',
      options: [{
          value: '选项1',
          label: '普通'
        }, {
          value: '选项2',
          label: '其他'
        }],
        types:'',//类别
        the_tile:'',//标题
        company: '',//外派单位
        constructions:'',//施工单位
        place:'',//施工地点
        plan:'',//工作安排
        pickerOptions: {
        //   disabledDate:(time)=> {
        //     if (this.end_time !='') {
        //     return time.getTime() > this.end_time;
        //             }
        //   },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions2: {
          disabledDate:(time)=> {
            return time.getTime() < this.start_time;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        start_time:new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
        end_time:''
    }
  },
  methods:{
    async submits(the_id){
      if(the_id==2){
        if(!this.the_tile){
        this.$message({
        message: '请填写标题',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.company){
        this.$message({
        message: '请填写派往单位',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.start_time){
        this.$message({
        message: '请填写开始时间',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.constructions){
        this.$message({
        message: '请填写施工单位',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.place){
        this.$message({
        message: '请填写施工地点',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.plan){
        this.$message({
        message: '请填写工作安排',
        duration:'1000',
        type: 'warning'
        });
        return
      }
      }
      let data ={
        // types:this.types,//类别
        title:this.the_tile,//标题
        stationedDept:this.company,//外派单位
        constructionUnit:this.constructions,//施工单位
        constructionAddress:this.place,//施工地点
        remark:this.plan,//工作安排
        startDatetime:this.start_time,//开始时间
        endDatetime :this.end_time//结束时间
      }
      // this.$axios.get('/about_me',{}).then(res=>{
      //   console.log(res)
      //   }); 
      if(the_id==1){
      let res = await this.$http.post(api.create,data);
       console.log(res)
      if(res.status==200){
        this.$message({
                message: '草稿保存成功',
                type: 'success',
                duration:'1500'
              });
      }else{
      this.$message({
                message: '保存失败',
                type: 'error',
                duration:'1500'
              });
      }
      }else{
       let res = await this.$http.post(api.maintenanceSubmit,data);
       console.log(res)
       if(res.status==200){
        this.$message({
                message: '提交成功',
                type: 'success',
                duration:'1500'
              });
      }else{
      this.$message({
                message: '提交失败',
                type: 'error',
                duration:'1500'
              });
      }
      }
    }
  },
  created(){
  }
}
</script>

<style>
.the_tile{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
}
.input_box{
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.time{
    justify-content: space-between;
}
.the_time{
width: 60%;
}
.the_time,.end_time_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.time>div{
    display: flex;
    align-items: center;
}
.titles{
    margin-right: 20px;
    width: 60px;
    text-align: right;
}
.el-input{
    width: 200x;
}
</style>