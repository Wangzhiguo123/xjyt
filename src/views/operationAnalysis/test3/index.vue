<template>
  <div>
    <el-calendar v-model="value">
  <template
    slot="dateCell"
    slot-scope="{date, data}"
    @click="getCalender(date,data)"
    >
    <div class="cd_box"  @click="getCalender(date,data)">
      <div class="cd2">{{ data.day.split('-').slice(2).join('-') }}</div>
    <div class="cd">
      <!-- {{ data.day.split('-').slice(1).join('-') }} -->
      <div v-for="(item,index) in the_date" :key="index" :class="(index+1)%2==0?'green':'red'">
      <div class="name_box" v-if="item.time==data.day">{{item.name}}</div>
    </div>
<!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}} -->
    </div>
    </div>
  </template>
</el-calendar>
<!-- 弹出框 -->
<el-dialog
  title="选人"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <!-- <span>测试添加张三</span> -->
  <!-- 删除已选人 -->

  <el-select v-model="value2" clearable placeholder="请选人">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.label">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dialogVisible: false,//弹出框
      the_time:'',//供弹出框使用的时间
      date:'',
      data:'',
      value:new Date(),
      the_date:[],
      add_edit:[],
      options: [{
          value: '选项1',
          label: '治国'
        }, {
          value: '选项2',
          label: '张三'
        }, {
          value: '选项3',
          label: '李四'
        }, {
          value: '选项4',
          label: '王五'
        }, {
          value: '选项5',
          label: '苏七个'
        }],
        value2: ''
    }
  },
  methods:{
    // 弹出框
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(res => {
            console.log(res)
            done();
          })
          .catch(err => {
            console.log(err)
          });
      },
      // 弹出框提交数据
      dialogSubmit(){
        this.add_edit =[{time:this.the_time,name:this.value2}
        ]
        if(!this.value2){
          return
        }
        console.log(this.add_edit)
        let a = this.the_date.length,
        b= this.add_edit.length;
        for (let i = 0; i < a; i++) {
            for (let j = 0; j < b; j++) 
            {
            //判断添加的数组是否为空了
            if (this.add_edit.length > 0) {
                if (this.the_date[i].name == this.add_edit[j].name && this.the_date[i].time == this.add_edit[j].time) {
                    this.add_edit.splice(j, 1); 
                    b--; 
                    console.log(this.add_edit[j]);//重复
                }
            }
            }
        } 
        // console.log(this.add_edit)
        for (let n = 0; n < this.add_edit.length; n++) {
            this.the_date.push(this.add_edit[n]);
        }
        this.dialogVisible = false
      },
    getCalender(dates,data){
      // console.log(dates)
      this.the_time = data.day
      // this.add_edit = this.the_date.filter(item=>{
      //   return item.time==data.day
      // })
      this.dialogVisible = true
    }
  },
  created(){
    this.the_date=[
        {time:'2021-08-02',name:'张三'},
        {time:'2021-08-04',name:'张三'},
        {time:'2021-08-04',name:'李四'},
        {time:'2021-08-04',name:'王五'},
        ]
    // console.log('value',this.value)
  }

}
</script>

<style>
.is-selected {
    color: #1989FA;
  }
  .cd_box{
    display: flex;
    /* border: 1px solid red; */
    height: 100%;
  }
  .cd{
    height: 100%;
    width: 60%;
    
  }
  .cd2{
    width: 22%;
  }
  .name_box{
    min-width: 30px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
    color: white;
    text-align: center;
  }
  .green,.red{
    border-radius: 4px;
    text-align: center;
  }
  .green{
    background: #FFB52E;
  }
  .red{
    background: red;
  }
</style>
