<template>
  <div class="the_box">
      <div class="box_left">
      <div class="the_tile">表单信息</div>
      <!-- 表格1 -->
      <div class="tb1">
          <!-- 标题 -->
          <div>
              <div>百口泉采油生产运行科-申请特车单</div>
              <el-button v-if="orderType=='tcd'" type="primary">特车安排</el-button>
          </div>
          <!-- 文字 -->
          <!-- 特车单 -->
          <!-- <div class="text_box" v-if="orderType=='tcd'">
              <div>
              <span>用车单位</span>
              <div>白口泉马湖作业区1</div>
              </div>
              <div>
              <span>用车时间</span>
              <div>2021年11月5日</div>
              </div>
              <div>
              <span>车辆类型</span>
              <div>电焊车</div>
              </div>
              <div>
              <span>申请数量</span>
              <div>3辆</div>
              </div>
              <div>
              <span>关联集输单元</span>
              <div>5#</div>
              </div>
              <div>
              <span>工作安排</span>
              <div>三等奖贵客光临克隆人开发拉开</div>
              </div>
          </div> -->
          <!-- 维修单 -->
          <div class="text_box" v-if="orderType=='wxd'">
              <div>
              <span>派往单位</span>
              <div>成都</div>
              </div>
              <div>
              <span>开始时间</span>
              <div>2021年3月5日</div>
              </div>
              <div>
              <span>结束时间</span>
              <div>2021年9月9日</div>
              </div>
              <div>
              <span>施工单位</span>
              <div>第三方队</div>
              </div>
              <div>
              <span>施工地点</span>
              <div>日本</div>
              </div>
              <div>
              <span>工作安排</span>
              <div>三等奖贵客光临克隆人开发拉开</div>
              </div>
          </div>
      </div>
      <div class="the_tile">流程信息</div>
      <div class="block">
        <el-timeline>
        <el-timeline-item timestamp="2021-07-22  15:52:52" placement="top">
            <el-card>
            <!-- <h4>更新 Github 模板</h4> -->
            <p class="card_titles">德风科技-用户A 在【2021-07-22 15:52:52】开始处理【制单人】环节</p>
            <div class="cards">
            <div><p>任务历时</p><p>在【7天20小时46分59秒】</p></div>
            <div><p>转办方式</p><p>本部门转办</p></div>
            <div><p>转办人员</p><p>汪治国</p></div>
            <div><p>转办原因</p><p>无</p></div>
            <div><p>结束时间</p><p>2021-07-09 18:00：00</p></div></div>
            </el-card>
        </el-timeline-item>
        </el-timeline>
      </div>
      </div>
      <!-- 右边板块 -->
        <div class="box_right">
        <div class="drawer_title">处理意见</div>
        <el-button type="primary" style="margin:10px">{{orderType=='tcd'?'特车申请单':orderType=='wxd'?'专家协助':''}}</el-button>
        <div class="v">
        <el-radio-group v-model="status">
        <el-radio label="agree">同意</el-radio>
        <el-radio label="reject">不同意</el-radio>
        </el-radio-group>
        </div>
        <div class="v">
        <el-input
        class="the_textarea"
        type="textarea"
        placeholder="请输入内容"
        v-model="processing_opinion"
        :autosize="{ minRows: 6}"
        maxlength="30"
        show-word-limit
        >
        </el-input>
        </div>
        <div class="v ag_btn">
            <el-button class="" type="primary" @click="drawer_agree">提交</el-button>
            <el-button v-if="orderType=='wxd'" class="" @click="drawer_agree(2)">返回</el-button>
        </div>
        </div>
  </div>
</template>

<script>
import { repairDetails,repairSubmit,refuseSubmit } from "@/api/modules/workOrder";
export default {
    data() {
      return {
        orderType:'wxd',
        // wxd:true,//维修单
        // tcd:false,//特车单
        drawer: false,
        status:'',
        processing_opinion:'',
      }
    },
    methods:{
        // Apply(){
        // this.$router.push({
        //     path:'/myOrder'
        //     })
        // },
        async drawer_agree(data){
        if(data==2){
            console.log('返回')
            return
        }
        let theid = {
            repairId:123
        }
        if(this.status=='agree'){
        let all = await repairSubmit(theid)
        console.log(all)
        this.$message({
        message: '提交成功',
        type: 'success',
        duration:'1500'
        });
        console.log('同意')
        // this.drawer = false
        }else if(this.status=='reject'){
        let all = await refuseSubmit(theid)
        console.log(all)
        }else{
        this.$message({
        message: '请填写完相关信息后再提交',
        type: 'warning'
        });
        }
        // if(this.status && this.processing_opinion){
        // this.$message({
        // message: '提交成功',
        // type: 'success',
        // duration:'1500'
        // });
        // console.log('同意')
        // this.drawer = false
        // }else{
        // this.$message({
        // message: '请填写完相关信息后再提交',
        // type: 'warning'
        // });
        // }
        }
    },
    async created(){
    this.$route.query.type?this.orderType = this.$route.query.type:''
    let data = {
        id:123
    }
    let thedata = await repairDetails(data)
    console.log(thedata)
    }

}
</script>

<style lang="less" scoped>
.the_box{
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.the_tile{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
}
.tb1>div:nth-child(1){
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    font-size: 18px;
    align-items: center;
    font-weight: bold;
}
.text_box{
    /* border: 1px solid blue; */
    width: 90%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}
.text_box>div{
    display: flex;
    margin: 5px 0;
    /* border: 1px solid red; */
    width: 50%;
}
.text_box>div>span{
    width: 100px;
    color: #909399;
}
.block{
    padding: 10px;
    width: 80%;
    font-size: 16px;
}
.el-card__body{
    padding: 10px;
}
.el-card{
    min-width: 500px;
    max-width: 100%;
}
.cards>div,.card_titles{
    margin: 10px 0;
}
.cards>div{
    display: flex;
    /* border: 1px solid red; */
}
.cards>div>p:nth-child(1){
    width: 20%;
}
.drawer_title{
    font-size: 30px;
    text-align: center;
    background: #E1F3D8;
    padding: 10px 0;
    font-weight: 400;
    font-family: PingFang SC;
    font-style: Regular;
}
.v{
    margin: 10px;
}
.ag_btn{
   display: flex;
   justify-content: center;
}
.box_left{
  width: 70%;
}
.box_right{
  height: 360px;
  background: white;
  margin: 10px 0;
}
</style>