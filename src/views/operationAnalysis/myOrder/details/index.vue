<!-- 监控单元信息查询 -->
<template>
  <div class="myOrderDetails">
    <breadCrumbHead
      :before-router-list="breadcrumb.beforeRouterList"
      :locale-router="breadcrumb.localeRouter"
    ></breadCrumbHead>
    <section class="content">
      <div class="title">
        <span></span>
        <h3>我的工单</h3>
      </div>
      <div class="tabs">
        <p class="active">详情</p>
      </div>
    </section>
    <section class="content">
      <el-row>
        <el-col :span="14">
          <div class="title">
            <span></span>
            <h3>表单信息</h3>
          </div>
          <div class="formInfo">
            <el-row class="top">
              <el-col :span="18"
                ><h2>百口泉采油厂生产运行科-特车申请单</h2></el-col
              >
              <el-col :span="6" :push="2"
                ><div>
                  <el-button type="primary">派车安排</el-button>
                </div></el-col
              >
              <el-col :span="8" class="titInfo">
                <p>用车单位</p>
                <p>百口泉玛湖1作业区</p>
              </el-col>
              <el-col :span="8" :offset="2" class="titInfo">
                <p>用车时间</p>
                <p>2021 年 11 月 9：00</p>
              </el-col>
              <el-col :span="8" class="titInfo">
                <p>车辆类型</p>
                <p>百口泉玛湖1作业区</p>
              </el-col>
              <el-col :span="8" :offset="2" class="titInfo">
                <p>申请数量</p>
                <p>2021 年 11 月 9：00</p>
              </el-col>
              <el-col :span="8" class="titInfo lasttitInfo">
                <p>工作安排</p>
                <p>百口泉玛湖1作业区</p>
              </el-col>
            </el-row>
            <el-form class="form" :model="formInline" :inline="true">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="所属组织">
                    <el-input
                      v-model="formInline.user"
                      placeholder="审批人"
                      class="formActive"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8"
                  ><el-form-item label="联系方式">
                    <el-input
                      v-model="formInline.user"
                      placeholder="审批人"
                      clearable
                    ></el-input> </el-form-item
                ></el-col>

                <el-col :span="7"
                  ><el-form-item label="车牌号码">
                    <el-input
                      v-model="formInline.user"
                      placeholder="审批人"
                      clearable
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="1" class="del">X</el-col>
                <el-col :span="8"
                  ><el-form-item label="驾驶司机">
                    <el-input
                      v-model="formInline.user"
                      placeholder="审批人"
                      clearable
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="8"
                  ><el-form-item label="联系方式">
                    <el-input
                      placeholder="请选择日期"
                      v-model="formInline.user"
                      clearable
                    >
                      <i
                        slot="suffix"
                        class="el-input__icon el-icon-search"
                      ></i>
                    </el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :push="16" :span="12">
                <el-button type="primary" style="margin-right: 40px"
                  >保存</el-button
                >
                <el-button type="info">重置</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8" class="right"
          ><el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>处理意见</span>
            </div>
            <div>
              <el-radio-group v-model="resource">
                <el-radio label="同意"></el-radio>
                <el-radio label="不同意"></el-radio
              ></el-radio-group>
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 6 }"
                placeholder="请输入处理意见"
                style="marginTop:20px"
              >
              </el-input>
            </div> </el-card
        ></el-col>
      </el-row>
    </section>
    <modal></modal>
  </div>
</template>

<script>
// import api from "@/api/apiList";
import breadCrumbHead from "@/components/breadCrumbHead";
import modal from './modal'
import { proWells } from "@/api/modules/productionMonitoring";
export default {
  name: "myOrderDetails",
  components: {
    breadCrumbHead,
    modal
  },
  data() {
    return {
          resource: '',
      // 面包屑配置
      breadcrumb: {
        beforeRouterList: [
          {
            name: "生产调度",
            router: {
              path: "",
            },
          },
        ],
        localeRouter: "我的工单详情",
      },
      formInline: {
        user: "",
        region: "",
        value1: "",
      },
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.myOrderDetails {
  
  height: 100%;
  width: 100%;
  .content {
    padding-left: 30px;
    margin-top: 10px;
    .title {
      font-weight: 400px;
      color: #000000;
      font-size: 14px;
      padding-top: 10px;
      position: relative;
      span {
        display: inline-block;
        background: #3377ff;
        width: 4px;
        height: 22px;
        position: absolute;
        left: -10px;
        bottom: -2px;
      }
    }
    .tabs {
      width: 100%;
      height: 60px;
      background: #fff;
      margin: 10px -10px;
      .active {
        color: #3377ff;
        font-size: 18px;
        position: relative;
        width: 80px;
        line-height: 40px;
      }
    }
    .active::before {
      content: ""; // 必须
      position: absolute;
      bottom: -21px;
      right: 0;
      height: 2px;
      width: 100%;
      background-color: #3377ff;
    }
    .formInfo {
      background: #fff;
      width: auto;
      height: auto;
      margin-top: 16px;
      padding-top: 16px;
      padding-left: 20px;
      padding-right: 10px;
      padding-bottom: 20px;
      margin-left: -10px;
      
      .top {
        border-bottom: 1px solid #409eff;
      }
      h2 {
        font-size: 18px;
      }
      .titInfo {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 18px;
        font-size: 14px;
        :nth-child(1) {
          color: #c0c4cc;
        }
      }
      .lasttitInfo {
        margin-top: 50px;
        margin-bottom: 10px;
      }
      .form {
        margin-top: 18px;

        border: 1px solid #dcdfe6;
        padding: 10px;
        margin-bottom: 10px;
        padding-bottom: 0;
        .del {
          width: 20px;
          height: 20px;
          border: 1px solid #ccc;
          line-height: 20px;
          text-align: center;
          border-radius: 50%;
        }
      }
      .formActive {
      }
    }
    .right {
      margin-left: 40px;
      color: #000;

      // border-left:4px solid #C0C4CC;
      // height: 100%;
    }
  }
}
/deep/.el-input__inner {
  // background: #409EFF;
  width: 140px;
}
/deep/ .el-card__header {
  font-size: 30px;
  padding-left: 30%;
}
</style>
