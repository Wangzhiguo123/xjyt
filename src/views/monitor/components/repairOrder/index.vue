<!--维修工单-->
<template>
  <div class="repairOrder">
    <el-dialog
      title="派遣工单"
      :visible.sync="centerDialogVisible"
      width="60%"
      :modal-append-to-body="false"
    >
      <!-- :model="ruleForm" :rules="rules" -->
      <div class="the_tile">维修单</div>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input
            v-model="the_tile"
            placeholder=""
            style="width: 60%; margin-right: 20px"
          ></el-input>
          <el-select
            v-model="types"
            clearable
            style="width: 120px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="施工单位" prop="name">
          <el-input
            v-model="constructions"
            style="width: 180px"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="派往单位" prop="name">
          <el-select
            v-model="company"
            clearable
            style="width: 180px"
            placeholder="选择派往单位"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="name" style="width: 50%">
              <el-date-picker
                v-model="start_time"
                style="width: 180px"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="name" style="width: 50%">
              <el-date-picker
                v-model="end_time"
                style="width: 180px"
                align="right"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions2"
              >
              </el-date-picker> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="工作安排" prop="name">
          <el-input
            v-model="plan"
            type="textarea"
            :rows="2"
            style="width: 60%"
            placeholder="未输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="关联设备" prop="name">
          <el-select
            v-model="company"
            clearable
            style="width: 180px"
            placeholder="选择派往单位"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 提交数据 -->
      <div class="input_box">
        <div class="titles"></div>
        <el-button>取消</el-button>
        <!-- @click="submits" -->
        <el-button>保存草稿</el-button>
        <el-button type="primary">提交审核</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      input: "",
      options: [
        {
          value: "选项1",
          label: "普通",
        },
        {
          value: "选项2",
          label: "其他",
        },
      ],
      types: "", //类别
      the_tile: "", //标题
      company: "", //外派单位
      constructions: "", //施工单位
      place: "", //施工地点
      plan: "", //工作安排
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < this.start_time;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      start_time:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      end_time: "",
    };
  },
};
</script>

<style lang="less" scoped>
.repairOrder {
}
/deep/ .el-dialog__header {
  background: #f7f9fc;
  .el-dialog__title {
    color: #3377ff;
  }
}
</style>
