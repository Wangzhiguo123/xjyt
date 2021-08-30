<template>
<div class="the_box">
      <div class="the_tile">申请特车单</div>
      <el-form label-width="80px">
  <el-form-item label="标题" class="the_length vs">
    <el-input v-model="title"></el-input>
  </el-form-item>
  <div style="display:flex" class="the_length vs">
    <el-form-item label="用车单位" >
         <el-col :span="20">
        <el-input v-model="carCompany" style="width:200px"></el-input>
        </el-col>
    </el-form-item>
    
  <el-form-item label="用车时间">
    <el-col :span="15">
      <el-date-picker type="date" placeholder="选择日期" v-model="dateTime" style="width: 200px;"></el-date-picker>
    </el-col>
  </el-form-item>
  </div>
  <div class="box"  v-for="(item,index) in form" :key="index">
  <div class="box_left the_length">
  <el-form-item label="车辆类型">
    <el-select v-model="item.carType" placeholder="请选择车辆类型" style="width:200px">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <div style="height:20px"></div>
  <el-form-item label="申请数量">
    <el-select v-model="item.applyNumber" placeholder="0辆" style="width:200px">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <div style="height:40px"></div>
  <el-form-item label="工作安排">
    <el-input type="textarea" v-model="item.workPlan" maxlength="100" placeholder="未输入" show-word-limit style="width:200px"></el-input>
  </el-form-item>
  </div>
  <div class="box_right">
      <div>
      <el-button class="btn" icon="el-icon-delete" @click="deletes(item,index)">删除</el-button>
      </div>
      <div>
      <el-button class="btn" @click="addMore()" v-if="index+1==form.length">添加更多</el-button>
      </div>
  </div>
  </div>

  <div class="bnt_box">
    <el-button>取消</el-button>
    <el-button  @click="onSubmit(1)">保存草稿</el-button>
    <el-button type="primary" @click="onSubmit">提交审核</el-button>
  </div>
</el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        dateTime: '',
        carCompany: '',
        form: [{
          carType: '',
          applyNumber: '',
          workPlan: '',
        },{
          carType: '',
          applyNumber: '',
          workPlan: '',
        }],
        // formsData:[]
      }
    },
    methods: {
      deletes(index,id){
        if(this.form.length>1){
        this.form.splice(id,1)
        }else{
        this.$message({
        message: '最后一项不能删除哦！',
        duration:'1000',
        type: 'warning'
        });
        }
      },
      addMore(){
        this.form.push(
        {
          carType: '',
          applyNumber: '',
          workPlan: '',
        })
        console.log(this.form)
      },
      async onSubmit(the_id){
      if(the_id==2){
        if(!this.form.title){
        this.$message({
        message: '请填写标题',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.form.carCompany){
        this.$message({
        message: '请填写用车单位',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.form.dateTime){
        this.$message({
        message: '请填写时间',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.form.carType){
        this.$message({
        message: '请填写车辆类型',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.form.applyNumber){
        this.$message({
        message: '请填写施申请数量',
        duration:'1000',
        type: 'warning'
        });
        return
      }else if(!this.form.workPlan){
        this.$message({
        message: '请填写工作安排',
        duration:'1000',
        type: 'warning'
        });
        return
      }
      }

      // console.log(this.form)
      let adc ={
        title:this.title,
        carCompany:this.carCompany,
        time:this.dateTime,
        forms:this.form
      }
      console.log(adc)
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
    //   if(the_id==1){
    //     // console.log(the_id)
    //   let res = await create(data);
    //    console.log('保存草稿',res)
    //   if(res.status==200){
    //     this.$message({
    //             message: '草稿保存成功',
    //             type: 'success',
    //             duration:'1500'
    //           });
    //   }else{
    //   this.$message({
    //             message: '保存失败',
    //             type: 'error',
    //             duration:'1500'
    //           });
    //   }
    //   }else{
    //    let res = await maintenanceSubmit(data);
    //    console.log(res)
    //    if(res.status==200){
    //     this.$message({
    //             message: '提交成功',
    //             type: 'success',
    //             duration:'1500'
    //           });
    //   }else{
    //   this.$message({
    //             message: '提交失败',
    //             type: 'error',
    //             duration:'1500'
    //           });
    //   }
    //   }
    }
    }
  }
</script>
<style lang="less" scoped>

.el-form-item{
    margin-bottom: 0;
}
.the_box{
    // background: #E5E5E5;
    // height: 100%;
    // padding-left: 20px;
}
.vs{
    background: white;
    padding: 10px;
    margin: 10px;
}
.box_left{
    background: white;
    padding: 20px 10px;
    margin: 10px;
}
.the_length{
    width: 60%;
}
.box{
    display: flex;
}
.the_tile{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
}
.btn{
    margin: 10px;
    width: 100px;
    text-align: center;
}
.bnt_box{
    padding: 30px;
}
</style>