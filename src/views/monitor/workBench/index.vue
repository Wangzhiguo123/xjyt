<template>
  <div>
    <div class="the_box" v-for="(item,index) in list.data" :key="index">
    <div class="the_tile" v-if="item &&item.dcDocs">{{item.typeName}}</div>
    <!-- {{item.dcDocs}} -->
    <div class="top">
      <div v-for="(v,id) in item.dcDocs" :key="id">
        <i class="icons el-icon-edit-outline"></i>
        <p>{{v.name}}</p>
      </div>

        <!-- <div>
        <i class="icons el-icon-edit-outline"></i>
        <p>申请值班车</p>
      </div>

      <div>
        <i class="icons el-icon-edit-outline"></i>
        <p>派车</p>
      </div>
      <div>
        <i class="icons el-icon-s-cooperation"></i>
        <p>应急抢修</p>
      </div>

      <div>
        <i class="icons el-icon-s-cooperation"></i>
        <p>故障报警</p>
      </div>

      <div>
        <i class="icons el-icon-cpu"></i>
        <p>加密计量</p>
      </div>

      <div>
        <i class="icons el-icon-cpu"></i>
        <p>计量表</p>
      </div>
      <div>
        <i class="icons el-icon-s-order"></i>
        <p>应急物资申请单</p>
      </div> -->
    </div>

    <!-- <div class="the_tile">报警计划</div>
    <div class="top">
      <div>
        <i class="icons el-icon-cpu"></i>
        <p>计量计划</p>
      </div>
      <div>
        <i class="icons el-icon-cpu"></i>
        <p>报警计划</p>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import { ListDoc } from "@/api/modules/workBenchDetails";
export default {
  data(){
    return{
      list:{}
    }
  },
  methods:{

  },
  async created(){
    try{
      this.list = await ListDoc()
      console.log(this.list.data)
    }catch(err){
      console.log(err)
    }
  }

}
</script>

<style lang="less" scoped>
.the_box{
  width: 100%;
  padding: 10px;
}
.the_tile{
    font-size: 18px;
    font-weight: bold;
    // margin: 10px;
}
.top{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}
.top>div{
  margin: 20px;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
.icons{
  font-size: 30px;
}
</style>